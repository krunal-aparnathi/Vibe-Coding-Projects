import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  level: string; // e.g., Beginner, Intermediate, Expert
};

export type Project = {
  id: string;
  name: string;
  description: string;
  link: string;
};

export type SocialLink = {
  id: string;
  platform: string; // e.g., LinkedIn, GitHub, LeetCode, etc.
  url: string;
};

export type PersonalInfo = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  socialLinks: SocialLink[];
};

export type Customization = {
  template: 'Modern' | 'Creative' | 'Executive' | 'Minimalist' | 'Academic';
  primaryColor: string;
  fontFamily: string;
  spacing: 'compact' | 'normal' | 'spacious';
};

export type ResumeState = {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customization: Customization;
  sectionOrder: string[];
  view: 'selection' | 'builder';
};

export type ResumeActions = {
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (newOrder: Experience[]) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (newOrder: Education[]) => void;
  
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (newOrder: Skill[]) => void;
  
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (newOrder: Project[]) => void;
  
  updateCustomization: (data: Partial<Customization>) => void;
  reorderSections: (newOrder: string[]) => void;
  setView: (view: 'selection' | 'builder') => void;
  
  addSocialLink: () => void;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => void;
  removeSocialLink: (id: string) => void;
};

const initialState: ResumeState = {
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    summary: 'A passionate software engineer with 5+ years of experience in building scalable web applications. Proficient in React, Node.js, and cloud technologies.',
    socialLinks: [
      { id: uuidv4(), platform: 'LinkedIn', url: 'linkedin.com/in/johndoe' },
      { id: uuidv4(), platform: 'GitHub', url: 'github.com/johndoe' },
    ],
  },
  experience: [
    {
      id: uuidv4(),
      company: 'Tech Innovators Inc.',
      position: 'Senior Frontend Developer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Led the frontend team in developing a new enterprise dashboard using React and Redux. Improved application performance by 30%.',
    }
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      startDate: 'Aug 2015',
      endDate: 'May 2019',
      description: 'Graduated with Honors. Coursework included Data Structures, Algorithms, and Web Development.',
    }
  ],
  skills: [
    { id: uuidv4(), name: 'JavaScript / TypeScript', level: 'Expert' },
    { id: uuidv4(), name: 'React / Next.js', level: 'Expert' },
    { id: uuidv4(), name: 'Node.js', level: 'Intermediate' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform using Next.js, Stripe, and PostgreSQL. Processed over $10k in transactions in the first month.',
      link: 'github.com/johndoe/ecommerce',
    }
  ],
  customization: {
    template: 'Modern',
    primaryColor: '#3b82f6', // Tailwind blue-500
    fontFamily: 'font-sans',
    spacing: 'normal',
  },
  sectionOrder: ['experience', 'education', 'skills', 'projects'],
  view: 'selection',
};

export const useResumeStore = create<ResumeState & ResumeActions>()(
  persist(
    (set) => ({
      ...initialState,
      updatePersonalInfo: (data) => set((state) => ({ personalInfo: { ...state.personalInfo, ...data } })),
      
      addExperience: () => set((state) => ({ 
        experience: [...state.experience, { id: uuidv4(), company: '', position: '', startDate: '', endDate: '', description: '' }] 
      })),
      updateExperience: (id, data) => set((state) => ({
        experience: state.experience.map((exp) => exp.id === id ? { ...exp, ...data } : exp)
      })),
      removeExperience: (id) => set((state) => ({
        experience: state.experience.filter((exp) => exp.id !== id)
      })),
      reorderExperience: (newOrder) => set({ experience: newOrder }),
      
      addEducation: () => set((state) => ({
        education: [...state.education, { id: uuidv4(), institution: '', degree: '', startDate: '', endDate: '', description: '' }]
      })),
      updateEducation: (id, data) => set((state) => ({
        education: state.education.map((edu) => edu.id === id ? { ...edu, ...data } : edu)
      })),
      removeEducation: (id) => set((state) => ({
        education: state.education.filter((edu) => edu.id !== id)
      })),
      reorderEducation: (newOrder) => set({ education: newOrder }),

      addSkill: () => set((state) => ({
        skills: [...state.skills, { id: uuidv4(), name: '', level: 'Intermediate' }]
      })),
      updateSkill: (id, data) => set((state) => ({
        skills: state.skills.map((skill) => skill.id === id ? { ...skill, ...data } : skill)
      })),
      removeSkill: (id) => set((state) => ({
        skills: state.skills.filter((skill) => skill.id !== id)
      })),
      reorderSkills: (newOrder) => set({ skills: newOrder }),

      addProject: () => set((state) => ({
        projects: [...state.projects, { id: uuidv4(), name: '', description: '', link: '' }]
      })),
      updateProject: (id, data) => set((state) => ({
        projects: state.projects.map((proj) => proj.id === id ? { ...proj, ...data } : proj)
      })),
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter((proj) => proj.id !== id)
      })),
      reorderProjects: (newOrder) => set({ projects: newOrder }),

      updateCustomization: (data) => set((state) => ({ customization: { ...state.customization, ...data } })),
      reorderSections: (newOrder) => set({ sectionOrder: newOrder }),
      setView: (view) => set({ view }),

      addSocialLink: () => set((state) => ({
        personalInfo: {
          ...state.personalInfo,
          socialLinks: [...(state.personalInfo.socialLinks || []), { id: uuidv4(), platform: '', url: '' }]
        }
      })),
      updateSocialLink: (id, data) => set((state) => ({
        personalInfo: {
          ...state.personalInfo,
          socialLinks: (state.personalInfo.socialLinks || []).map((link) => link.id === id ? { ...link, ...data } : link)
        }
      })),
      removeSocialLink: (id) => set((state) => ({
        personalInfo: {
          ...state.personalInfo,
          socialLinks: (state.personalInfo.socialLinks || []).filter((link) => link.id !== id)
        }
      })),
    }),
    {
      name: 'resume-storage', // local storage key
    }
  )
);
