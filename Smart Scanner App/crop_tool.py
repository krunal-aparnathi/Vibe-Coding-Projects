import os
import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog, Toplevel, ttk
from PIL import Image, ImageTk
import json
import fitz  # PyMuPDF

class CropTool:
    def __init__(self, parent):
        self.window = Toplevel(parent)
        self.window.title("Document Crop Tool")
        self.window.geometry("1000x700")
        self.window.minsize(800, 600)

        
        self.image = None
        self.tk_image = None
        self.crop_presets = []
        self.crop_rect = None
        self.rect_id = None
        self.zoom_level = 1.0
        self.pan_x = 0
        self.pan_y = 0
        self.start_x = self.start_y = 0
        self.is_dragging = False




        # Toolbar Frame
        self.top_frame = tk.Frame(self.window, bg="#f0f0f0", padx=5, pady=5)
        self.top_frame.pack(fill=tk.X)

        btn_style = {"bg": "#4CAF50", "fg": "white", "font": ("Segoe UI", 10, "bold"), "padx": 10, "pady": 3}

        tk.Button(self.top_frame, text="Open Image or PDF", command=self.open_image, **btn_style).pack(side=tk.LEFT, padx=5)
        tk.Button(self.top_frame, text="Simulate Scan", command=self.simulate_scan, **btn_style).pack(side=tk.LEFT, padx=5)
        tk.Button(self.top_frame, text="Add Crop Preset", command=self.add_crop_preset, **btn_style).pack(side=tk.LEFT, padx=5)
        tk.Button(self.top_frame, text="Save Crop", command=self.save_crop, **btn_style).pack(side=tk.LEFT, padx=5)

        self.preset_var = tk.StringVar()
        self.preset_combo = ttk.Combobox(self.top_frame, textvariable=self.preset_var, state="readonly", font=("Segoe UI", 10))
        self.preset_combo.pack(side=tk.LEFT, padx=5)
        self.preset_combo.bind("<<ComboboxSelected>>", self.on_preset_select)

        self.canvas = tk.Canvas(self.window, bg='gray', cursor="crosshair")
        self.canvas.pack(fill=tk.BOTH, expand=True)
        self.canvas.bind("<ButtonPress-1>", self.start_crop)
        self.canvas.bind("<B1-Motion>", self.do_crop)
        self.canvas.bind("<ButtonRelease-1>", self.finish_crop)
        self.canvas.bind("<MouseWheel>", self.zoom_image)
        self.canvas.bind("<KeyPress>", self.key_crop_move)
        self.canvas.focus_set()

        self.load_crop_presets()

    def load_crop_presets(self):
        try:
            with open("crop_presets.json", "r") as f:
                self.crop_presets = json.load(f)
        except:
            self.crop_presets = []
        self.update_preset_menu()

    def update_preset_menu(self):
        preset_names = [p["name"] for p in self.crop_presets]
        self.preset_combo["values"] = preset_names

    def add_crop_preset(self):
        if not self.crop_rect or not self.image:
            messagebox.showwarning("No Crop Area", "Draw a crop area first.")
            return
        name = simpledialog.askstring("Preset Name", "Enter name for this crop preset")
        if not name:
            return
        iw, ih = self.image.width, self.image.height
        x1, y1, x2, y2 = self.crop_rect
        preset = {
            "name": name,
            "coords": [
                x1 / iw,
                y1 / ih,
                x2 / iw,
                y2 / ih
            ]
        }
        self.crop_presets.append(preset)
        with open("crop_presets.json", "w") as f:
            json.dump(self.crop_presets, f)
        self.update_preset_menu()


    def open_image(self):
        path = filedialog.askopenfilename(filetypes=[("Image or PDF Files", "*.png;*.jpg;*.jpeg;*.pdf")])
        if not path:
            return
        ext = os.path.splitext(path)[1].lower()
        try:
            if ext == ".pdf":
                doc = fitz.open(path)
                if doc.page_count > 1:
                    page_num = simpledialog.askinteger("Select Page", f"Enter page number (1 to {doc.page_count}):", minvalue=1, maxvalue=doc.page_count)
                    if page_num is None:
                        return
                    page = doc[page_num - 1]
                else:
                    page = doc[0]

                # Lower DPI to reduce memory load (try 100 or 150)
                pix = page.get_pixmap(dpi=100)
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

                # Optional resize if image is extremely large
                max_size = 3000  # Limit max width/height
                if img.width > max_size or img.height > max_size:
                    scale = min(max_size / img.width, max_size / img.height)
                    new_size = (int(img.width * scale), int(img.height * scale))
                    img = img.resize(new_size, Image.ANTIALIAS)

            else:
                img = Image.open(path).convert("RGB")

            self.image = img
            self.zoom_level = 1.0
            self.pan_x = self.pan_y = 0
            self.display_image()
        except MemoryError:
            messagebox.showerror("Memory Error", "The image is too large to load. Try reducing the DPI or image size.")
        except Exception as e:
            messagebox.showerror("Error", str(e))


    def simulate_scan(self):
        messagebox.showinfo("Scan", "Pretending to scan a document...")
        self.open_image()

    def display_image(self):
        if self.image:
            w, h = int(self.image.width * self.zoom_level), int(self.image.height * self.zoom_level)
            resized = self.image.resize((w, h))
            self.tk_image = ImageTk.PhotoImage(resized)
            self.canvas.delete("all")
            self.canvas.create_image(self.pan_x, self.pan_y, anchor="nw", image=self.tk_image)
            self.highlight_preset_crop()

    def start_crop(self, event):
        x = self.canvas.canvasx(event.x)
        y = self.canvas.canvasy(event.y)

        if self.rect_id:
            x1, y1, x2, y2 = self.canvas.coords(self.rect_id)
            if x1 < x < x2 and y1 < y < y2:
                self.is_dragging = True
                self.drag_offset_x = x - x1
                self.drag_offset_y = y - y1
                return

        self.start_x = x
        self.start_y = y
        self.rect_id = self.canvas.create_rectangle(x, y, x, y, outline="red", width=2)

    def do_crop(self, event):
        x = self.canvas.canvasx(event.x)
        y = self.canvas.canvasy(event.y)
        if self.is_dragging and self.crop_rect:
            width = (self.crop_rect[2] - self.crop_rect[0]) * self.zoom_level
            height = (self.crop_rect[3] - self.crop_rect[1]) * self.zoom_level
            x1 = x - self.drag_offset_x
            y1 = y - self.drag_offset_y
            x2 = x1 + width
            y2 = y1 + height
            self.canvas.coords(self.rect_id, x1, y1, x2, y2)
        else:
            self.canvas.coords(self.rect_id, self.start_x, self.start_y, x, y)

    def finish_crop(self, event):
        self.is_dragging = False
        coords = self.canvas.coords(self.rect_id)
        x1 = int((coords[0] - self.pan_x) / self.zoom_level)
        y1 = int((coords[1] - self.pan_y) / self.zoom_level)
        x2 = int((coords[2] - self.pan_x) / self.zoom_level)
        y2 = int((coords[3] - self.pan_y) / self.zoom_level)
        self.crop_rect = (min(x1, x2), min(y1, y2), max(x1, x2), max(y1, y2))

    def on_preset_select(self, event):
        name = self.preset_var.get()
        for preset in self.crop_presets:
            if preset["name"] == name:
                self.set_crop(preset)
                break

    def set_crop(self, preset):
        if not self.image:
            return
        iw, ih = self.image.width, self.image.height
        rx1, ry1, rx2, ry2 = preset["coords"]
        self.crop_rect = (
            int(rx1 * iw),
            int(ry1 * ih),
            int(rx2 * iw),
            int(ry2 * ih)
        )
        self.highlight_preset_crop()


    def highlight_preset_crop(self):
        if self.crop_rect and self.tk_image:
            x1 = self.crop_rect[0] * self.zoom_level + self.pan_x
            y1 = self.crop_rect[1] * self.zoom_level + self.pan_y
            x2 = self.crop_rect[2] * self.zoom_level + self.pan_x
            y2 = self.crop_rect[3] * self.zoom_level + self.pan_y
            if self.rect_id:
                self.canvas.delete(self.rect_id)
            self.rect_id = self.canvas.create_rectangle(x1, y1, x2, y2, outline="blue", width=2)

    def zoom_image(self, event):
        old_zoom = self.zoom_level
        if event.delta > 0:
            self.zoom_level *= 1.1
        else:
            self.zoom_level /= 1.1

        mouse_x = self.canvas.canvasx(event.x)
        mouse_y = self.canvas.canvasy(event.y)
        scale = self.zoom_level / old_zoom
        self.pan_x = mouse_x - scale * (mouse_x - self.pan_x)
        self.pan_y = mouse_y - scale * (mouse_y - self.pan_y)
        self.display_image()

    def key_crop_move(self, event):
        if not self.crop_rect:
            return

        x1, y1, x2, y2 = self.crop_rect
        dx, dy = 0, 0
        if event.keysym == "Up":
            dy = -1
        elif event.keysym == "Down":
            dy = 1
        elif event.keysym == "Left":
            dx = -1
        elif event.keysym == "Right":
            dx = 1
        else:
            return

        self.crop_rect = (x1 + dx, y1 + dy, x2 + dx, y2 + dy)
        self.highlight_preset_crop()

    def save_crop(self):
        if not self.crop_rect or not self.image:
            messagebox.showwarning("No Crop", "No crop region defined or image loaded.")
            return
        x1, y1, x2, y2 = self.crop_rect
        cropped = self.image.crop((x1, y1, x2, y2))
        save_path = filedialog.asksaveasfilename(defaultextension=".jpg", filetypes=[("JPEG Image", "*.jpg")])
        if save_path:
            cropped.save(save_path)
            messagebox.showinfo("Saved", f"Cropped image saved to {save_path}")


if __name__ == "__main__":
    root = tk.Tk()
    root.withdraw()
    CropTool(root)
    root.mainloop()
