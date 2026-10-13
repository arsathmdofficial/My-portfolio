export interface Project {
  id: string;
  title: string;
  role: string;
  category: 'ai' | 'fullstack' | 'games';
  shortDesc: string;
  longDesc: string;
  bulletPoints: string[];
  techStack: string[];
  image: string;
  hasInteractiveDemo: boolean;
  demoType?: 'mentro' | 'mentro_partner' | 'fittrack' | 'snake' | 'carrom' | 'calculator';
  metrics?: string;
  architectureHighlights?: string[];
  developmentStatus: string;
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  highlight: string;
  iconName?: string;
}

export interface SkillCategory {
  title: string;
  categoryKey: 'frontend' | 'backend' | 'database' | 'ai' | 'tools';
  skills: SkillItem[];
}

export interface ExperienceItem {
  role: string;
  type: string;
  period: string;
  summary: string;
  bullets: string[];
  technologies: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  college: string;
  location: string;
  category: string;
  disciplines: string[];
  description: string;
  verificationBadge: string;
}

export interface AchievementItem {
  title: string;
  colleges: string[];
  events: string[];
  description: string;
  certificates: CertificateItem[];
}

export interface EducationItem {
  degree: string;
  status: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
}
