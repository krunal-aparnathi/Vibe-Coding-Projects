import { useResumeStore } from '@/store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Terminal, Link, Code2 } from 'lucide-react';

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('github')) return <Terminal className="w-4 h-4" />;
  if (p.includes('linkedin')) return <Link className="w-4 h-4" />;
  if (p.includes('leetcode') || p.includes('code') || p.includes('hacker')) return <Code2 className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
};

export default function CreativeTemplate() {
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
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 export-block">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: customization.primaryColor }}>💼</span>
              Experience
            </h2>
            <div className={`relative border-l-2 ml-4 pl-6 ${getSpacingClass()}`} style={{ borderColor: customization.primaryColor }}>
              {experience.map((exp) => (
                <div key={exp.id} className="relative export-block">
                  <div className="absolute w-3 h-3 rounded-full -left-[1.65rem] top-1.5 bg-white border-2" style={{ borderColor: customization.primaryColor }}></div>
                  <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-2 mt-1">
                    <span className="font-semibold" style={{ color: customization.primaryColor }}>{exp.company}</span>
                    <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1 sm:mt-0">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 export-block">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: customization.primaryColor }}>🎓</span>
              Education
            </h2>
            <div className={`relative border-l-2 ml-4 pl-6 ${getSpacingClass()}`} style={{ borderColor: customization.primaryColor }}>
              {education.map((edu) => (
                <div key={edu.id} className="relative export-block">
                  <div className="absolute w-3 h-3 rounded-full -left-[1.65rem] top-1.5 bg-white border-2" style={{ borderColor: customization.primaryColor }}></div>
                  <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-2 mt-1">
                    <span className="font-semibold" style={{ color: customization.primaryColor }}>{edu.institution}</span>
                    <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1 sm:mt-0">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 export-block">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: customization.primaryColor }}>🛠️</span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="px-4 py-2 text-white rounded-lg shadow-sm" style={{ backgroundColor: customization.primaryColor }}>
                  <span className="font-medium">{skill.name}</span>
                  <span className="opacity-80 text-xs ml-2">({skill.level})</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 export-block">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: customization.primaryColor }}>🚀</span>
              Projects
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
              {projects.map((proj) => (
                <div key={proj.id} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50 border-gray-200 export-block">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{proj.name}</h3>
                  {proj.link && (
                    <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} className="text-sm font-medium hover:underline mb-2 inline-block" style={{ color: customization.primaryColor }}>
                      {proj.link}
                    </a>
                  )}
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{proj.description}</p>
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
    <div className={`flex flex-col md:flex-row h-full w-full ${customization.fontFamily}`}>
      {/* Left Sidebar for Creative Template */}
      <div className="w-full md:w-1/3 p-8 text-white relative" style={{ backgroundColor: customization.primaryColor }}>
        {/* Subtle pattern or overlay could go here */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="relative z-10">
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black mb-2 tracking-tight leading-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-lg font-medium opacity-90 uppercase tracking-widest text-blue-100">
              {personalInfo.jobTitle || 'Job Title'}
            </p>
          </header>

          <div className="space-y-6 mt-12 text-sm font-medium">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="block group">
                <h4 className="text-xs uppercase tracking-wider opacity-70 mb-1 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email
                </h4>
                <p className="group-hover:translate-x-1 transition-transform">{personalInfo.email}</p>
              </a>
            )}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone}`} className="block group">
                <h4 className="text-xs uppercase tracking-wider opacity-70 mb-1 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone
                </h4>
                <p className="group-hover:translate-x-1 transition-transform">{personalInfo.phone}</p>
              </a>
            )}
            {personalInfo.location && (
              <div className="block">
                <h4 className="text-xs uppercase tracking-wider opacity-70 mb-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Location
                </h4>
                <p>{personalInfo.location}</p>
              </div>
            )}
            {personalInfo.website && (
              <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="block group">
                <h4 className="text-xs uppercase tracking-wider opacity-70 mb-1 flex items-center gap-2">
                  <Globe className="w-3 h-3" /> Website
                </h4>
                <p className="group-hover:translate-x-1 transition-transform truncate">{personalInfo.website}</p>
              </a>
            )}
            
            {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
              <div className="pt-6 border-t border-white/20">
                <h4 className="text-xs uppercase tracking-wider opacity-70 mb-4">Profiles</h4>
                <div className="space-y-4">
                  {personalInfo.socialLinks.map((link) => (
                    <a 
                      key={link.id} 
                      href={`https://${link.url.replace(/^https?:\/\//, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        {getSocialIcon(link.platform)}
                      </div>
                      <div>
                        <p className="text-xs opacity-70">{link.platform}</p>
                        <p className="text-sm font-bold group-hover:translate-x-1 transition-transform truncate w-32">
                          {link.url.split('/').pop()}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-full md:w-2/3 p-8 md:p-12 bg-white">
        {personalInfo.summary && (
          <section className="mb-10 relative">
            <div className="absolute -left-4 -top-4 text-6xl opacity-10" style={{ color: customization.primaryColor }}>&quot;</div>
            <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap italic pl-4 border-l-4" style={{ borderColor: customization.primaryColor }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className="space-y-8">
          {sectionOrder.map(renderSection)}
        </div>
      </div>
    </div>
  );
}
