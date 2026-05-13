import { useResumeStore } from '@/store/useResumeStore';

export default function MinimalistTemplate() {
  const { personalInfo, experience, education, skills, projects, customization, sectionOrder } = useResumeStore();

  const getSpacingClass = () => {
    switch (customization.spacing) {
      case 'compact': return 'space-y-3';
      case 'spacious': return 'space-y-8';
      case 'normal':
      default: return 'space-y-5';
    }
  };

  const renderSection = (section: string) => {
    switch (section) {
      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="mb-6 flex flex-col md:flex-row">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 w-full md:w-1/4 shrink-0 mb-3 md:mb-0 export-block">
              Experience
            </h2>
            <div className={`w-full md:w-3/4 ${getSpacingClass()}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="export-block">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-base font-bold text-gray-900">{exp.company}</h3>
                    <span className="text-sm text-gray-500">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className="text-sm italic text-gray-700 mb-2">{exp.position}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-6 flex flex-col md:flex-row">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 w-full md:w-1/4 shrink-0 mb-3 md:mb-0 export-block">
              Education
            </h2>
            <div className={`w-full md:w-3/4 ${getSpacingClass()}`}>
              {education.map((edu) => (
                <div key={edu.id} className="export-block">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-base font-bold text-gray-900">{edu.institution}</h3>
                    <span className="text-sm text-gray-500">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="text-sm italic text-gray-700 mb-2">{edu.degree}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="mb-6 flex flex-col md:flex-row">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 w-full md:w-1/4 shrink-0 mb-3 md:mb-0 export-block">
              Skills
            </h2>
            <div className="w-full md:w-3/4 flex flex-wrap gap-x-4 gap-y-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-sm text-gray-800">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-gray-400 ml-1">·</span>
                </span>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-6 flex flex-col md:flex-row">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 w-full md:w-1/4 shrink-0 mb-3 md:mb-0 export-block">
              Projects
            </h2>
            <div className={`w-full md:w-3/4 ${getSpacingClass()}`}>
              {projects.map((proj) => (
                <div key={proj.id} className="export-block">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-base font-bold text-gray-900">{proj.name}</h3>
                    {proj.link && (
                      <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                        {proj.link}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed mt-1">{proj.description}</p>
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
    <div className={`p-10 md:p-14 max-w-4xl mx-auto bg-white text-gray-900 ${customization.fontFamily}`}>
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl tracking-tight text-gray-900 mb-3" style={{ fontWeight: 300 }}>
          <span className="font-bold">{personalInfo.fullName?.split(' ')[0] || 'Your'}</span> {personalInfo.fullName?.split(' ').slice(1).join(' ') || 'Name'}
        </h1>
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6" style={{ color: customization.primaryColor }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-gray-500 uppercase tracking-wider">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:text-gray-900 transition-colors">
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="hover:text-gray-900 transition-colors">
              {personalInfo.phone}
            </a>
          )}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>•</span>}
          {personalInfo.website && (
            <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
              {personalInfo.website}
            </a>
          )}
        </div>

        {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] text-gray-400 uppercase tracking-[0.15em] mt-4 pt-4 border-t border-gray-50 max-w-md mx-auto">
            {personalInfo.socialLinks.map((link) => (
              <a 
                key={link.id} 
                href={`https://${link.url.replace(/^https?:\/\//, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors flex items-center gap-1.5"
              >
                <span className="font-bold" style={{ color: customization.primaryColor }}>{link.platform}</span>
                <span className="opacity-60 lowercase truncate max-w-[80px]">{link.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[1] || link.url.split('/').pop()}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-10 flex flex-col md:flex-row border-t border-b border-gray-100 py-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 w-full md:w-1/4 shrink-0 mb-3 md:mb-0">
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 w-full md:w-3/4">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Dynamic Sections */}
      <div className="space-y-6">
        {sectionOrder.map(renderSection)}
      </div>
    </div>
  );
}
