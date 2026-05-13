'use client';

import { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Check, ArrowRight, Sparkles, Layout, Palette, Type } from 'lucide-react';

const templates = [
  {
    id: 'Modern',
    name: 'Modern Professional',
    description: 'Clean, balanced, and perfect for tech and business roles.',
    preview: (
      <div className="w-full h-full bg-white flex flex-col p-3 gap-2 overflow-hidden border border-gray-100">
        <div className="h-6 w-3/4 bg-blue-600 rounded-sm mb-1" />
        <div className="h-2 w-1/2 bg-gray-200 rounded-sm" />
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
          <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
          <div className="h-1.5 w-2/3 bg-gray-100 rounded-sm" />
        </div>
        <div className="mt-2 border-t pt-2 space-y-1.5">
          <div className="h-1.5 w-1/3 bg-blue-100 rounded-sm" />
          <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
          <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
        </div>
      </div>
    )
  },
  {
    id: 'Creative',
    name: 'Creative Dynamic',
    description: 'Bold sidebar and modern accents for designers and creatives.',
    preview: (
      <div className="w-full h-full bg-white flex overflow-hidden border border-gray-100">
        <div className="w-1/3 h-full bg-blue-600 p-2 flex flex-col gap-2">
          <div className="h-4 w-full bg-white/20 rounded-sm" />
          <div className="h-1.5 w-3/4 bg-white/10 rounded-sm" />
          <div className="mt-auto space-y-1">
            <div className="h-1 w-full bg-white/10 rounded-sm" />
            <div className="h-1 w-full bg-white/10 rounded-sm" />
          </div>
        </div>
        <div className="w-2/3 p-3 space-y-2">
          <div className="h-2 w-1/2 bg-gray-200 rounded-sm" />
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
            <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
            <div className="h-1.5 w-3/4 bg-gray-100 rounded-sm" />
          </div>
          <div className="h-2 w-1/2 bg-gray-200 rounded-sm pt-2" />
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
            <div className="h-1.5 w-2/3 bg-gray-100 rounded-sm" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'Minimalist',
    name: 'Minimalist Sleek',
    description: 'Ultra-clean design that lets your content speak for itself.',
    preview: (
      <div className="w-full h-full bg-white flex flex-col p-4 gap-3 overflow-hidden border border-gray-100">
        <div className="text-center space-y-1">
          <div className="h-4 w-1/2 bg-gray-800 mx-auto rounded-sm" />
          <div className="h-1.5 w-1/3 bg-gray-400 mx-auto rounded-sm" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
          <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
          <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
        </div>
      </div>
    )
  },
  {
    id: 'Executive',
    name: 'Executive Classic',
    description: 'Traditional and authoritative layout for seasoned professionals.',
    preview: (
      <div className="w-full h-full bg-white flex flex-col p-4 gap-2 overflow-hidden border border-gray-100">
        <div className="border-b-2 border-gray-900 pb-2 mb-2">
          <div className="h-4 w-2/3 bg-gray-900 rounded-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="h-2 w-full bg-gray-200 rounded-sm" />
          <div className="h-2 w-full bg-gray-200 rounded-sm" />
        </div>
        <div className="space-y-3">
          <div className="h-2 w-1/4 bg-gray-400 rounded-sm" />
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
            <div className="h-1.5 w-full bg-gray-100 rounded-sm" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'Academic',
    name: 'Academic CV',
    description: 'Structured for detailed histories, research, and publications.',
    preview: (
      <div className="w-full h-full bg-white flex flex-col p-4 gap-2 overflow-hidden border border-gray-100">
        <div className="h-3 w-1/2 bg-gray-800 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-1/4 h-2 bg-gray-200 rounded-sm" />
              <div className="w-3/4 space-y-1">
                <div className="h-2 w-full bg-gray-100 rounded-sm" />
                <div className="h-1.5 w-full bg-gray-50 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

export default function TemplateSelector() {
  const [mounted, setMounted] = useState(false);
  const updateCustomization = useResumeStore((state) => state.updateCustomization);
  const setView = useResumeStore((state) => state.setView);
  const currentTemplate = useResumeStore((state) => state.customization.template);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSelect = (templateId: 'Modern' | 'Creative' | 'Executive' | 'Minimalist' | 'Academic') => {
    updateCustomization({ template: templateId });
    setView('builder');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-800">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Design Your <span className="text-blue-600">Professional</span> Future
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Choose a stunning template to get started. You can always change your mind and switch designs later.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <div 
              key={template.id}
              onClick={() => handleSelect(template.id as any)}
              className={`group relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 cursor-pointer overflow-hidden flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-${index * 100}`}
              style={{ 
                borderColor: currentTemplate === template.id ? '#3b82f6' : 'transparent',
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Template Preview Box */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 flex items-center justify-center overflow-hidden">
                <div className="w-full aspect-[1/1.41] relative transform group-hover:scale-[1.02] transition-transform duration-500 shadow-lg">
                  {template.preview}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(template.id as any);
                      }}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 z-20"
                    >
                      Use Template <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  {currentTemplate === template.id && (
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">ATS-Friendly</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Optimized for applicant tracking systems.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Fully Customizable</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Colors, fonts, and spacing are all yours to tweak.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl text-violet-600 dark:text-violet-400">
              <Type className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Real-time Preview</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">See changes instantly as you type.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
