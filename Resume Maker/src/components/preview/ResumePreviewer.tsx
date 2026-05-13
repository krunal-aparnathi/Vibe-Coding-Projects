'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function ResumePreviewer() {
  const { customization } = useResumeStore();
  const [zoom, setZoom] = useState(0.75);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const handleResetZoom = () => setZoom(0.75);

  const renderTemplate = () => {
    switch (customization.template) {
      case 'Modern':
        return <ModernTemplate />;
      case 'Creative':
        return <CreativeTemplate />;
      case 'Minimalist':
        return <MinimalistTemplate />;
      case 'Executive':
        return <ExecutiveTemplate />;
      case 'Academic':
        return <AcademicTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div className="w-full h-full relative bg-gray-200 dark:bg-gray-800 flex flex-col">
      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 bg-white dark:bg-gray-900 p-2 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
        <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" title="Zoom In">
          <ZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="text-center text-xs font-bold text-gray-400 py-1">
          {Math.round(zoom * 100)}%
        </div>
        <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" title="Zoom Out">
          <ZoomOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="h-px bg-gray-200 dark:bg-gray-700 mx-1 my-1" />
        <button onClick={handleResetZoom} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" title="Reset Zoom">
          <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8 md:p-12 lg:p-16 flex justify-center items-start scrollbar-hide">
        <div 
          className="shadow-2xl bg-white origin-top transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <div 
            id="resume-preview-container"
            className="w-[210mm] min-h-0 bg-white relative"
            style={{
              fontFamily: customization.fontFamily.replace('font-', ''),
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
