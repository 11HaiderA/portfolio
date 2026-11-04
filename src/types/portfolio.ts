export interface ProfileData {
  name: string;
  monogram: string;
  role: string;
  heroHeading: string;
  heroSubheading: string;
  aboutIntro: string;
  aboutPillars: {
    title: string;
    description: string;
    highlight: string;
  }[];
  contactHeading: string;
  contactSubheading: string;
  email: string;
  whatsappNumber: string;
  whatsappUrl: string;
  githubUrl?: string;
  location?: string;
  availability: string;
}

export type ExperienceType = 
  | 'Internship'
  | 'Development Project'
  | 'Contract'
  | 'Open Source'
  | 'Academic Work'
  | 'Full-Time';

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  type: ExperienceType;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  keyOutcomes?: string[];
  link?: {
    label: string;
    url: string;
  };
}

export type ProjectStatus = 'Completed' | 'In Development' | 'Concept';

export type SchematicType = 'pairup' | 'freeblock' | 'matchsticks' | 'errordna';

export interface ProjectScreenshot {
  url: string;
  title: string;
  caption?: string;
  type: 'splash' | 'menu' | 'gameplay' | 'overview';
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  status: ProjectStatus;
  shortDescription: string;
  fullOverview: string;
  problemOrGoal: string;
  keyFeatures: string[];
  myContribution: string;
  technologies: string[];
  challengesAndSolutions: {
    challenge: string;
    solution: string;
  }[];
  schematicType: SchematicType;
  image?: string;
  screenshots?: ProjectScreenshot[];
  githubUrl?: string;
  liveDemoUrl?: string;
  apkDownloadUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    focus: string;
  }[];
}
