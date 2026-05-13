'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function ExportToolbar() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'png' | 'jpeg'>('pdf');

  const applySmartBreaks = (element: HTMLElement, pxPageHeight: number) => {
    const blocks = Array.from(element.querySelectorAll('.export-block')) as HTMLElement[];
    const elementRect = element.getBoundingClientRect();

    blocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const relativeTop = blockRect.top - elementRect.top;
      const blockHeight = blockRect.height;

      // Position within the current page
      const posInPage = relativeTop % pxPageHeight;

      // Check if block is split across pages (with a small 5px buffer)
      if (posInPage + blockHeight > pxPageHeight + 5 && blockHeight < pxPageHeight * 0.8) {
        // It's being split, but can fit on one page. Push it to next page.
        // We use 0.8 to avoid pushing extremely large blocks that would take most of the page anyway
        const paddingNeeded = pxPageHeight - posInPage;
        const spacer = document.createElement('div');
        spacer.style.height = `${paddingNeeded}px`;
        spacer.className = 'pdf-export-spacer';
        block.parentNode?.insertBefore(spacer, block);
      }
    });
  };

  const removeSmartBreaks = (element: HTMLElement) => {
    const spacers = element.querySelectorAll('.pdf-export-spacer');
    spacers.forEach((s) => s.remove());
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('resume-preview-container');
      if (!element) throw new Error('Resume preview container not found');

      // Add a slight delay to ensure fonts/images are loaded
      await new Promise((resolve) => setTimeout(resolve, 500));

      const options = {
        pixelRatio: 2, // 2 is enough for clear text and better performance
        backgroundColor: '#ffffff',
      };

      if (exportFormat === 'pdf') {
        const elementRect = element.getBoundingClientRect();
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        
        // Match the margins used later in the script
        const marginX = 0;
        const marginTop = 0;
        const marginBottom = 0;
        const innerWidth = pdfWidth - (marginX * 2);
        const innerHeight = pdfHeight - (marginTop + marginBottom);

        // Calculate page height in DOM pixels
        const pxPageHeight = innerHeight * (elementRect.width / innerWidth);

        // Apply temporary spacers to prevent cutting off sections
        applySmartBreaks(element, pxPageHeight);

        // Capture image of the modified DOM
        const imgData = await toPng(element, options);
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => (img.onload = resolve));

        // Calculate how much of the image (in px) fits in one PDF "inner" area
        const pxWidth = img.width;
        const pxInnerHeight = (innerHeight * pxWidth) / innerWidth;
        
        let pxOffset = 0;
        let pageNum = 1;

        // Use a small threshold (2px) to prevent tiny slivers of extra pages
        while (pxOffset + 2 < img.height) {
          if (pageNum > 1) pdf.addPage();

          // Create a canvas to crop the current "page" from the full image
          const canvas = document.createElement('canvas');
          canvas.width = pxWidth;
          canvas.height = pxInnerHeight;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const sliceHeight = Math.min(pxInnerHeight, img.height - pxOffset);
            // Draw only the slice we need
            ctx.drawImage(
              img, 
              0, pxOffset, pxWidth, sliceHeight, // Source
              0, 0, pxWidth, sliceHeight         // Destination
            );

            const pageImgData = canvas.toDataURL('image/png');
            pdf.addImage(pageImgData, 'PNG', marginX, marginTop, innerWidth, innerHeight);

            // Add links for this specific chunk
            const links = element.querySelectorAll('a');
            const elementRect = element.getBoundingClientRect();
            // Scale between DOM pixels and PDF mm
            const scale = innerWidth / elementRect.width;

            links.forEach((link) => {
              const rect = link.getBoundingClientRect();
              
              // Calculate DOM-relative coordinates in px
              const domX = rect.left - elementRect.left;
              const domY = rect.top - elementRect.top;
              
              // Convert current slice offset from "canvas px" back to "DOM px"
              // Since canvas px = DOM px * options.pixelRatio
              const domOffset = pxOffset / options.pixelRatio;
              const domInnerHeight = pxInnerHeight / options.pixelRatio;

              // Check if the link is within the current slice
              if (domY >= domOffset && domY < domOffset + domInnerHeight) {
                const pdfX = marginX + (domX * scale);
                const pdfY = marginTop + ((domY - domOffset) * scale);
                const pdfW = rect.width * scale;
                const pdfH = rect.height * scale;

                let url = link.getAttribute('href') || '';
                if (url && !url.startsWith('http')) url = 'https://' + url;

                pdf.link(pdfX, pdfY, pdfW, pdfH, { url });
              }
            });
          }

          pxOffset += pxInnerHeight;
          pageNum++;
        }

        // Clean up spacers
        removeSmartBreaks(element);

        pdf.save('resume.pdf');
      } else {
        // Force A4 height for image exports to ensure standard proportions
        const originalMinHeight = element.style.minHeight;
        element.style.minHeight = '297mm';

        const imgData = exportFormat === 'jpeg' 
          ? await toJpeg(element, options) 
          : await toPng(element, options);

        // Reset minHeight
        element.style.minHeight = originalMinHeight;

        const link = document.createElement('a');
        link.download = `resume.${exportFormat}`;
        link.href = imgData;
        link.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export resume. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={exportFormat}
        onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'png' | 'jpeg')}
        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2"
        disabled={isExporting}
      >
        <option value="pdf">PDF</option>
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
      </select>
      
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-50"
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        Download
      </button>
    </div>
  );
}
