import { useResumeStore } from '@/store/useResumeStore';

export default function AcademicTemplate() {
  const { personalInfo, experience, education, skills, projects, customization, sectionOrder } = useResumeStore();

  const getSpacingClass = () => {
    switch (customization.spacing) {
      case 'compact': return 'space-y-4';
      case 'spacious': return 'space-y-10';
      case 'normal':
      default: return 'space-y-8';
    }
  };

  const renderSection = (section: string) => {
    switch (section) {
      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="mb-10">
            <h2 className="text-sm font-black uppercase tracking-widest border-b border-gray-900 mb-6 pb-2 export-block">
              Professional Appointments
            </h2>
            <div className={getSpacingClass()}>
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 export-block">
                  <div className="text-sm font-bold text-gray-600">{exp.startDate} - {exp.endDate}</div>
                  <div>
                    <h3 className="text-md font-bold text-gray-900 leading-tight">{exp.position}</h3>
                    <div className="text-sm font-semibold text-gray-700 mb-3">{exp.company}</div>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed italic">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-10">
            <h2 className="text-sm font-black uppercase tracking-widest border-b border-gray-900 mb-6 pb-2 export-block">
              Education
            </h2>
            <div className={getSpacingClass()}>
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 export-block">
                  <div className="text-sm font-bold text-gray-600">{edu.startDate} - {edu.endDate}</div>
                  <div>
                    <h3 className="text-md font-bold text-gray-900 leading-tight">{edu.degree}</h3>
                    <div className="text-sm font-semibold text-gray-700 mb-3">{edu.institution}</div>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed italic">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="mb-10">
            <h2 className="text-sm font-black uppercase tracking-widest border-b border-gray-900 mb-6 pb-2 export-block">
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <span className="font-bold text-gray-900">{skill.name}</span>
                  <span className="text-gray-500 ml-2">[{skill.level}]</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-10">
            <h2 className="text-sm font-black uppercase tracking-widest border-b border-gray-900 mb-6 pb-2 export-block">
              Research & Projects
            </h2>
            <div className={getSpacingClass()}>
              {projects.map((proj) => (
                <div key={proj.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 export-block">
                  <div className="text-sm font-bold text-gray-600">Project Detail</div>
                  <div>
                    <h3 className="text-md font-bold text-gray-900 mb-1">{proj.name}</h3>
                    {proj.link && (
                      <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} className="text-xs font-medium hover:underline block mb-2" style={{ color: customization.primaryColor }}>
                        {proj.link}
                      </a>
                    )}
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                  </div>
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
    <div className={`p-16 md:p-20 bg-white max-w-5xl mx-auto min-h-full ${customization.fontFamily}`}>
      {/* Header */}
      <header className="mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 border-b-4 border-gray-900 pb-4 inline-block">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl font-medium text-gray-700 mb-8">
          {personalInfo.jobTitle || 'Academic Title / Researcher'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-600 font-mono">
          {personalInfo.email && (
            <div>
              <span className="font-bold uppercase text-[10px] text-gray-400 mr-2">Email:</span>
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <span className="font-bold uppercase text-[10px] text-gray-400 mr-2">Phone:</span>
              <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>
            </div>
          )}
          {personalInfo.location && <div><span className="font-bold uppercase text-[10px] text-gray-400 mr-2">Office:</span> {personalInfo.location}</div>}
          {personalInfo.website && (
            <div>
              <span className="font-bold uppercase text-[10px] text-gray-400 mr-2">URL:</span>
              <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>
            </div>
          )}
          
          {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-2 pt-4 border-t border-gray-50">
              {personalInfo.socialLinks.map((link) => (
                <div key={link.id}>
                  <span className="font-bold uppercase text-[10px] text-gray-400 mr-2">{link.platform}:</span>
                  <a 
                    href={`https://${link.url.replace(/^https?:\/\//, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline italic text-gray-500"
                  >
                    {link.url.split('/').pop()}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Profile Statement */}
      {personalInfo.summary && (
        <section className="mb-16">
          <h2 className="text-sm font-black uppercase tracking-widest border-b border-gray-900 mb-6 pb-2">
            Research Statement
          </h2>
          <p className="text-sm leading-relaxed text-gray-800 text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Dynamic Sections */}
      <div className="space-y-4">
        {sectionOrder.map(renderSection)}
      </div>
    </div>
  );
}
