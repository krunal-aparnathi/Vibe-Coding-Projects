import { useResumeStore } from '@/store/useResumeStore';

export default function ExecutiveTemplate() {
  const { personalInfo, experience, education, skills, projects, customization, sectionOrder } = useResumeStore();

  const getSpacingClass = () => {
    switch (customization.spacing) {
      case 'compact': return 'space-y-4';
      case 'spacious': return 'space-y-8';
      case 'normal':
      default: return 'space-y-6';
    }
  };

  const renderSection = (section: string) => {
    switch (section) {
      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-b-2 border-gray-800 mb-4 pb-1 export-block">
              Professional Experience
            </h2>
            <div className={getSpacingClass()}>
              {experience.map((exp) => (
                <div key={exp.id} className="export-block">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-md font-bold text-gray-900 uppercase">{exp.company}</h3>
                    <span className="text-sm font-semibold text-gray-700 italic">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-700 mb-2 italic" style={{ color: customization.primaryColor }}>{exp.position}</div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-b-2 border-gray-800 mb-4 pb-1 export-block">
              Education
            </h2>
            <div className={getSpacingClass()}>
              {education.map((edu) => (
                <div key={edu.id} className="export-block">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-md font-bold text-gray-900 uppercase">{edu.institution}</h3>
                    <span className="text-sm font-semibold text-gray-700 italic">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-700 mb-2 italic" style={{ color: customization.primaryColor }}>{edu.degree}</div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-b-2 border-gray-800 mb-4 pb-1 export-block">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm text-gray-800 flex justify-between items-center border-b border-gray-100 pb-1">
                  <span className="font-semibold uppercase tracking-wider">{skill.name}</span>
                  <span className="text-xs italic text-gray-500">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-b-2 border-gray-800 mb-4 pb-1 export-block">
              Key Initiatives
            </h2>
            <div className={getSpacingClass()}>
              {projects.map((proj) => (
                <div key={proj.id} className="export-block">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-md font-bold text-gray-900 uppercase">{proj.name}</h3>
                    {proj.link && (
                      <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} className="text-xs font-semibold hover:underline italic" style={{ color: customization.primaryColor }}>
                        {proj.link}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-12 md:p-16 bg-white shadow-inner min-h-full ${customization.fontFamily}`}>
      {/* Formal Border */}
      <div className="border-4 border-double p-8 h-full" style={{ borderColor: customization.primaryColor }}>
        {/* Header */}
        <header className="mb-12 text-center border-b-2 pb-8 border-gray-100">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-4 uppercase tracking-[0.1em]">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xl font-bold italic mb-6 uppercase tracking-widest" style={{ color: customization.primaryColor }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-bold text-gray-600 uppercase tracking-tighter">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:text-gray-900 transition-colors">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && <span className="text-gray-300">|</span>}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone}`} className="hover:text-gray-900 transition-colors">
                {personalInfo.phone}
              </a>
            )}
            {personalInfo.location && <span className="text-gray-300">|</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span className="text-gray-300">|</span>}
            {personalInfo.website && (
              <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                {personalInfo.website}
              </a>
            )}
          </div>

          {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mt-6 pt-6 border-t border-gray-50">
              {personalInfo.socialLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={`https://${link.url.replace(/^https?:\/\//, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors border-b-2 border-transparent hover:border-gray-900 pb-0.5"
                >
                  <span className="text-gray-800 font-black">{link.platform}</span>
                  <span className="ml-2 font-medium opacity-50 lowercase tracking-normal">/{link.url.split('/').pop()}</span>
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Executive Summary */}
        {personalInfo.summary && (
          <section className="mb-10 text-center">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-4">
              Executive Profile
            </h2>
            <p className="text-md leading-relaxed text-gray-800 font-medium italic max-w-3xl mx-auto">
              &quot;{personalInfo.summary}&quot;
            </p>
          </section>
        )}

        {/* Dynamic Sections */}
        <div className="space-y-4">
          {sectionOrder.map(renderSection)}
        </div>
      </div>
    </div>
  );
}
