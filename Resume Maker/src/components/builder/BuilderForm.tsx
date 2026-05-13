'use client';

import { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CustomizerSidebar from './CustomizerSidebar';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  { id: 'personal', title: 'Personal Details', component: PersonalInfoForm },
  { id: 'experience', title: 'Experience', component: ExperienceForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'projects', title: 'Projects', component: ProjectsForm },
  { id: 'customizer', title: 'Customization', component: CustomizerSidebar },
];

export default function BuilderForm() {
  const [expandedSection, setExpandedSection] = useState<string>('personal');

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto space-y-4 pb-24">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Resume Builder</h1>
        
        {sections.map((section) => {
          const isExpanded = expandedSection === section.id;
          const Component = section.component;

          return (
            <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-all shadow-sm">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">{section.title}</span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {isExpanded && (
                <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700">
                  <Component />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
