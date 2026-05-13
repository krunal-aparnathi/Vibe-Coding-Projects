'use client';

import BuilderForm from '@/components/builder/BuilderForm';
import ResumePreviewer from '@/components/preview/ResumePreviewer';
import ExportToolbar from '@/components/ExportToolbar';
import TemplateSelector from '@/components/TemplateSelector';
import { useResumeStore } from '@/store/useResumeStore';
import { Layers, Layout } from 'lucide-react';

export default function Home() {
  const view = useResumeStore((state) => state.view);
  const setView = useResumeStore((state) => state.setView);

  // Fallback to 'selection' if view is not set (e.g., first time or old state)
  const currentView = view || 'selection';

  if (currentView === 'selection') {
    return <TemplateSelector />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="h-16 shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg cursor-pointer" onClick={() => setView('selection')}>
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:inline-block">
            ResumePro <span className="text-blue-600">Architect</span>
          </span>
          <button
            onClick={() => setView('selection')}
            className="ml-4 flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Layout className="w-4 h-4" />
            <span>Change Template</span>
          </button>
        </div>
        <ExportToolbar />
      </nav>

      {/* Main Content Area (Split Screen) */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Side: Builder Form */}
        <div className="w-full md:w-1/2 lg:w-5/12 h-[50vh] md:h-full relative z-10 shadow-xl md:shadow-none bg-white dark:bg-gray-900 overflow-y-auto">
          <BuilderForm />
        </div>

        {/* Right Side: Live Preview */}
        <div className="w-full md:w-1/2 lg:w-7/12 h-[50vh] md:h-full relative bg-gray-100 dark:bg-gray-800">
          <ResumePreviewer />
        </div>
      </main>
    </div>
  );
}
