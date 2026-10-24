import os
import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog
from PIL import Image, ImageTk
import pythoncom
import win32com.client
import json
import datetime

PRESETS_FILE = "document_presets.json"
DEFAULT_PRESETS = [
    "1-Photo", "2-Sign", "3-Admission Form", "4-LC",
    "5.1-12th Result 1st Try - Original", "5.2-12th Result 2nd Try - Original",
    "5.3-12th Result 3rd Try - Original", "5.4-12th Result Final Try - Online or Original",
    "6.1-10th Result 1st Try - Original", "6.2-10th Result 2nd Try - Original",
    "6.3-10th Result 3rd Try - Original", "6.4-10th Result Final Try - Original",
    "7- Aadhar Card", "8-Thalassemia", "9-Caste", "10-Non-Creamy",
    "11-Migration", "12-PEC", "13-Edu-GAP", "14-FEC"
]

class ScannerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Smart Scanner App -  Krunal Aparnathi")
        self.root.geometry("1200x800")  # Responsive default size
        self.root.configure(bg="#f0f2f5")

        self.full_name = None
        self.save_dir = None
        self.preset_name = ""
        self.batch_images = []

        self.presets = self.load_presets()
        self.preset_buttons = {}

        self.main_frame = tk.Frame(root, bg="#f0f2f5")
        self.main_frame.pack(fill=tk.BOTH, expand=True)

        self.left_panel = tk.Frame(self.main_frame, bg="#ffffff", padx=20, pady=20, relief=tk.RIDGE, bd=2)
        self.left_panel.pack(side=tk.LEFT, fill=tk.Y)

        self.right_panel = tk.Frame(self.main_frame, bg="#e9edf0", padx=20, pady=20)
        self.right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)


        #select folder button
        self.select_folder_button = tk.Button(
        self.left_panel,
        text="Select Existing Folder",
        command=self.select_existing_folder,
        bg="#ff9800",
        fg="white",
        font=("Segoe UI", 10, "bold"))
        self.select_folder_button.pack(pady=5, fill=tk.X)


        #another window to crop photos and signatures
        self.open_crop_tool_button = tk.Button(self.left_panel, text="Open Crop Tool", command=self.open_crop_tool, bg="#795548", fg="white", font=("Segoe UI", 10, "bold"))
        self.open_crop_tool_button.pack(pady=5, fill=tk.X)



        tk.Label(self.left_panel, text="Full Name:", font=("Segoe UI", 10), bg="#ffffff").pack(anchor='w')
        self.name_entry = tk.Entry(self.left_panel, width=35, font=("Segoe UI", 10))
        self.name_entry.pack(pady=5)

        self.set_name_button = tk.Button(self.left_panel, text="Set Name & Folder", command=self.set_name, bg="#4caf50", fg="white", font=("Segoe UI", 10, "bold"))
        self.set_name_button.pack(pady=5, fill=tk.X)

        self.refresh_button = tk.Button(self.left_panel, text="Refresh", command=self.refresh_all, bg="#f44336", fg="white", font=("Segoe UI", 10, "bold"))
        self.refresh_button.pack(pady=5, fill=tk.X)

        self.preset_frame = tk.Frame(self.left_panel, bg="#ffffff")
        self.preset_frame.pack(pady=10, fill=tk.BOTH, expand=True)
        tk.Label(self.preset_frame, text="Document Type Presets:", font=("Segoe UI", 10, "bold"), bg="#ffffff").pack(anchor='w')

        self.canvas = tk.Canvas(self.preset_frame, bg="#f7f9fc", highlightthickness=0)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        self.scrollbar = tk.Scrollbar(self.preset_frame, orient="vertical", command=self.canvas.yview)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.canvas.configure(yscrollcommand=self.scrollbar.set)

        self.scrollable_frame = tk.Frame(self.canvas, bg="#f7f9fc")
        self.canvas.create_window((0, 0), window=self.scrollable_frame, anchor="nw")

        self.scrollable_frame.bind(
            "<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all"))
        )

        self.add_preset_entry = tk.Entry(self.preset_frame, width=30, font=("Segoe UI", 10))
        self.add_preset_entry.pack(pady=3)

        self.add_preset_button = tk.Button(self.preset_frame, text="Add Preset", command=self.add_preset, bg="#2196f3", fg="white", font=("Segoe UI", 10, "bold"))
        self.add_preset_button.pack(pady=2, fill=tk.X)

        self.render_presets()

        self.save_format = tk.StringVar(value="PDF")
        self.radio_frame = tk.Frame(self.left_panel, bg="#ffffff")
        self.radio_frame.pack(pady=5, fill=tk.X)
        tk.Label(self.radio_frame, text="Save As:", font=("Segoe UI", 10, "bold"), bg="#ffffff").pack(anchor='w')
        tk.Radiobutton(self.radio_frame, text="PDF", variable=self.save_format, value="PDF", bg="#ffffff").pack(anchor='w')
        tk.Radiobutton(self.radio_frame, text="Image", variable=self.save_format, value="Image", bg="#ffffff").pack(anchor='w')

        self.scan_button = tk.Button(self.left_panel, text="Start Batch Scan", command=self.start_batch_scan, state=tk.DISABLED, bg="#3f51b5", fg="white", font=("Segoe UI", 10, "bold"))
        self.scan_button.pack(pady=10, fill=tk.X)

        self.single_scan_button = tk.Button(self.left_panel, text="Scan Single Image", command=self.scan_single_image, state=tk.DISABLED, bg="#009688", fg="white", font=("Segoe UI", 10, "bold"))
        self.single_scan_button.pack(pady=5, fill=tk.X)

        self.canvas_preview = tk.Canvas(self.right_panel, bg='gray', relief=tk.RIDGE, bd=2)
        self.canvas_preview.pack(fill=tk.BOTH, expand=True)

        self.canvas.bind_all("<MouseWheel>", self.on_mouse_wheel)

    def load_presets(self):
        if os.path.exists(PRESETS_FILE):
            with open(PRESETS_FILE, "r") as f:
                return json.load(f)
        return DEFAULT_PRESETS.copy()

    def save_presets(self):
        with open(PRESETS_FILE, "w") as f:
            json.dump(self.presets, f)

    #open another window for crop documents
    def open_crop_tool(self):
        from crop_tool import CropTool  # Ensure the file is named crop_tool.py
        CropTool(self.root)

    

    #save to existing folder
    def select_existing_folder(self):
        folder = filedialog.askdirectory(title="Select Existing Folder")
        if folder:
            self.save_dir = os.path.dirname(folder)
            self.full_name = os.path.basename(folder)
            self.name_entry.delete(0, tk.END)
            self.name_entry.insert(0, self.full_name)
            self.scan_button.config(state=tk.NORMAL)
            self.single_scan_button.config(state=tk.NORMAL)
            messagebox.showinfo("Folder Selected", f"Now scanning for: {self.full_name}")

    def set_name(self):
        name = self.name_entry.get().strip()
        if not name:
            messagebox.showwarning("Input Error", "Please enter a full name.")
            return

        self.full_name = name
        self.save_dir = filedialog.askdirectory(title="Choose Folder to Save Scans")

        if self.save_dir:
            self.scan_button.config(state=tk.NORMAL)
            self.single_scan_button.config(state=tk.NORMAL)
            messagebox.showinfo("Ready", f"Now scanning for: {self.full_name}")
        else:
            messagebox.showwarning("Folder Required", "You must select a save location.")

    def render_presets(self):
        for widget in self.scrollable_frame.winfo_children():
            widget.destroy()

        self.preset_buttons.clear()
        for preset in self.presets:
            btn = tk.Button(self.scrollable_frame, text=preset, command=lambda p=preset: self.set_preset(p), anchor='w', bg="#ffffff", relief=tk.FLAT, font=("Segoe UI", 9))
            btn.pack(pady=1, fill=tk.X)
            btn.bind("<Button-3>", lambda e, p=preset: self.right_click_delete(p))
            self.preset_buttons[preset] = btn

    def add_preset(self):
        new_preset = self.add_preset_entry.get().strip()
        if not new_preset:
            messagebox.showwarning("Empty Preset", "Please enter a preset name.")
            return
        if new_preset in self.presets:
            messagebox.showinfo("Already Exists", "This preset already exists.")
            return
        self.presets.append(new_preset)
        self.save_presets()
        self.render_presets()
        self.add_preset_entry.delete(0, tk.END)

    def right_click_delete(self, preset):
        confirm = messagebox.askyesno("Delete Preset", f"Delete preset '{preset}'?")
        if confirm:
            self.presets.remove(preset)
            self.save_presets()
            self.render_presets()

    def set_preset(self, preset):
        self.preset_name = preset
        messagebox.showinfo("Preset Selected", f"Preset set to: {preset}")

    def start_batch_scan(self):
        self.batch_images = []
        self.batch_scan_loop()

    def scan_single_image(self):
        try:
            pythoncom.CoInitialize()
            wia_dialog = win32com.client.Dispatch("WIA.CommonDialog")
            image = wia_dialog.ShowAcquireImage(
                FormatID="{B96B3CAB-0728-11D3-9D7B-0000F81EF32E}",
                DeviceType=1, Intent=1, Bias=0, AlwaysSelectDevice=False
            )
            if image:
                image_path = os.path.join(os.environ["TEMP"], "temp_single_scan.jpg")
                if os.path.exists(image_path):
                    os.remove(image_path)
                image.SaveFile(image_path)

                pil_img = Image.open(image_path).convert("RGB")
                self.batch_images = [pil_img]
                self.preview_image(pil_img)
                self.handle_save()
            else:
                messagebox.showwarning("Scan Cancelled", "No image was scanned.")
        except Exception as e:
            messagebox.showerror("Scan Failed", str(e))

    def batch_scan_loop(self):
        try:
            pythoncom.CoInitialize()
            wia_dialog = win32com.client.Dispatch("WIA.CommonDialog")
            image = wia_dialog.ShowAcquireImage(
                FormatID="{B96B3CAB-0728-11D3-9D7B-0000F81EF32E}",
                DeviceType=1, Intent=1, Bias=0, AlwaysSelectDevice=False
            )

            if image:
                image_path = os.path.join(os.environ["TEMP"], "temp_batch_image.jpg")
                if os.path.exists(image_path):
                    os.remove(image_path)
                image.SaveFile(image_path)

                pil_img = Image.open(image_path).convert("RGB")
                self.batch_images.append(pil_img)
                self.preview_image(pil_img)

                cont = messagebox.askyesno("Scan More?", "Do you want to scan another page?")
                if cont:
                    self.batch_scan_loop()
                else:
                    self.handle_save()
            else:
                messagebox.showwarning("Scan Cancelled", "No image was scanned.")
        except Exception as e:
            messagebox.showerror("Scan Failed", str(e))

    def get_unique_filename(self, folder, base_name, ext):
        path = os.path.join(folder, base_name + ext)
        counter = 1
        while os.path.exists(path):
            path = os.path.join(folder, f"{base_name} ({counter}){ext}")
            counter += 1
        return path

    def handle_save(self):
        folder = os.path.join(self.save_dir, self.full_name)
        os.makedirs(folder, exist_ok=True)
        if not self.batch_images:
            return

        is_single_sided = len(self.batch_images) == 1

        if self.save_format.get() == "PDF":
            self.save_as_pdf(folder, is_single_sided)
        else:
            self.save_as_images(folder, is_single_sided)
        self.clear_preview()

    def save_as_pdf(self, folder, is_single_sided):
        base = f"{self.preset_name} - {self.full_name}"
        path = self.get_unique_filename(folder, base, ".pdf")

        try:
            if is_single_sided:
                self.batch_images[0].save(path)
            else:
                self.batch_images[0].save(path, save_all=True, append_images=self.batch_images[1:])
            messagebox.showinfo("Saved", f"Saved PDF:\n{path}")
        except Exception as e:
            messagebox.showerror("Save Failed", str(e))

    def save_as_images(self, folder, is_single_sided):
        try:
            for i, img in enumerate(self.batch_images, start=1):
                if is_single_sided:
                    base = f"{self.preset_name} - {self.full_name}"
                else:
                    base = f"{self.preset_name} - {self.full_name} - Page {i}"
                path = self.get_unique_filename(folder, base, ".jpg")
                img.save(path)
            messagebox.showinfo("Saved", f"Saved {len(self.batch_images)} images.")
        except Exception as e:
            messagebox.showerror("Save Error", str(e))

    def preview_image(self, pil_img):
        img = pil_img.copy()
        img.thumbnail((700, 900))
        self.tk_img = ImageTk.PhotoImage(img)
        self.canvas_preview.delete("all")
        self.canvas_preview.create_image(0, 0, anchor=tk.NW, image=self.tk_img)

    def clear_preview(self):
        self.canvas_preview.delete("all")
        self.batch_images.clear()

    def refresh_all(self):
        self.name_entry.delete(0, tk.END)
        self.full_name = None
        self.save_dir = None
        self.preset_name = ""
        self.batch_images.clear()
        self.clear_preview()
        self.scan_button.config(state=tk.DISABLED)
        self.single_scan_button.config(state=tk.DISABLED)
        messagebox.showinfo("Refreshed", "Ready to scan another person's documents.")

    def on_mouse_wheel(self, event):
        if event.delta > 0:
            self.canvas.yview_scroll(-1, "units")
        else:
            self.canvas.yview_scroll(1, "units")

if __name__ == "__main__":
    root = tk.Tk()
    app = ScannerApp(root)
    root.mainloop()