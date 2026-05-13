import { useResumeStore } from '@/store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Terminal, Link, Code2 } from 'lucide-react';

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('github')) return <Terminal className="w-3 h-3" />;
  if (p.includes('linkedin')) return <Link className="w-3 h-3" />;
  if (p.includes('leetcode') || p.includes('code') || p.includes('hacker')) return <Code2 className="w-3 h-3" />;
  return <Globe className="w-3 h-3" />;
};

export default function ModernTemplate() {
  const { personalInfo, experience, education, skills, projects, customization, sectionOrder } = useResumeStore();

  const getSpacingClass = () => {
    switch (customization.spacing) {
      case 'compact': return 'space-y-3';
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
          <div key="experience" className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 export-block" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
              Experience
            </h2>
            <div className={getSpacingClass()}>
              {experience.map((exp) => (
                <div key={exp.id} className="export-block">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-md font-semibold text-gray-700 mb-2">{exp.company}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 export-block" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
              Education
            </h2>
            <div className={getSpacingClass()}>
              {education.map((edu) => (
                <div key={edu.id} className="export-block">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-sm font-medium text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-md font-semibold text-gray-700 mb-2">{edu.institution}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 export-block" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-medium border border-gray-200">
                  {skill.name} <span className="text-gray-500 text-xs ml-1">({skill.level})</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 export-block" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
              Projects
            </h2>
            <div className={getSpacingClass()}>
              {projects.map((proj) => (
                <div key={proj.id} className="export-block">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{proj.name}</h3>
                    {proj.link && (
                      <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} className="text-sm font-medium hover:underline" style={{ color: customization.primaryColor }}>
                        {proj.link}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap mt-1">{proj.description}</p>
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
    <div className={`p-8 md:p-12 ${customization.fontFamily}`}>
      {/* Header */}
      <header className="mb-8 border-b-4 pb-6" style={{ borderColor: customization.primaryColor }}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl font-medium" style={{ color: customization.primaryColor }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600 font-medium">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <Mail className="w-3.5 h-3.5" style={{ color: customization.primaryColor }} />
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <Phone className="w-3.5 h-3.5" style={{ color: customization.primaryColor }} />
              <span>{personalInfo.phone}</span>
            </a>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: customization.primaryColor }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <Globe className="w-3.5 h-3.5" style={{ color: customization.primaryColor }} />
              <span>{personalInfo.website}</span>
            </a>
          )}
        </div>

        {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-gray-500 font-medium border-t border-gray-100 pt-3">
            {personalInfo.socialLinks.map((link) => (
              <a 
                key={link.id} 
                href={`https://${link.url.replace(/^https?:\/\//, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors bg-gray-50 px-2 py-1 rounded"
              >
                {getSocialIcon(link.platform)}
                <span className="font-bold text-gray-700">{link.platform}:</span>
                <span>{link.url.split('/').pop()}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
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
