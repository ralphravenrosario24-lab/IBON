export type ProjectCategory = 
  | 'ALL'
  | 'CYBERSECURITY'
  | 'RESEARCH'
  | 'PUBLICATIONS'
  | 'GRAPHIC DESIGN'
  | 'WEB DESIGN'
  | 'PROGRAMMING';

export type CertCategory =
  | 'ALL'
  | 'CYBERSECURITY'
  | 'PROGRAMMING'
  | 'WEB DEVELOPMENT'
  | 'DESIGN'
  | 'OTHER';

export interface Project {
  id: string;
  title: string;
  category: 'CYBERSECURITY' | 'RESEARCH' | 'PUBLICATIONS' | 'GRAPHIC DESIGN' | 'WEB DESIGN' | 'PROGRAMMING';
  thumbnail: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  date: string;
  year: string;
  role: string;
  technologies: string[];
  skills: string[];
  tags: string[];
  status: 'Completed' | 'In Progress' | 'Active Research' | 'Active Defense' | 'Published' | string;
  featured: boolean;
  documentUrl?: string;
  documentName?: string;
  documentType?: 'PDF' | 'DOCX' | 'LINK' | 'PAPER' | string;
  links: {
    officialWebsite?: string;
    github?: string;
    research?: string;
    publication?: string;
    liveDemo?: string;
    documentUrl?: string;
    documentName?: string;
  };
  process?: string;
  outcome?: string;
  order: number;
}

export interface SkillItem {
  name: string;
  level: 'Core Knowledge' | 'Advanced' | 'Practicing' | 'Exploring' | 'Proficient';
  tools?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  position: string;
  organization: string;
  location: string;
  date: string;
  current: boolean;
  description: string[];
  skills: string[];
  logoUrl?: string;
  externalLink?: string;
  order: number;
}

export interface ResearchItem {
  id: string;
  title: string;
  category: string;
  date: string;
  role: string;
  description: string;
  methodology: string;
  findings: string;
  images?: string[];
  documentUrl?: string;
  officialSource?: string;
  externalLink?: string;
  publicationLink?: string;
  type: 'Research' | 'Publication' | 'Technical Paper';
}

export interface Certification {
  id: string;
  courseTitle: string;
  certificateTitle: string;
  provider: string;
  completionDate: string;
  credentialId: string;
  category: 'CYBERSECURITY' | 'PROGRAMMING' | 'WEB DEVELOPMENT' | 'DESIGN' | 'COMPUTER SYSTEMS' | 'NETWORKING' | 'COMMUNICATION' | 'OTHER';
  skills: string[];
  certificateImage?: string;
  certificatePdf?: string;
  verificationLink?: string;
  featured: boolean;
}

export interface ResumeData {
  lastUpdated: string;
  pdfUrl?: string;
  summary: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    details: string;
    gpaOrFocus?: string;
  }[];
  coreCompetencies: string[];
}

export interface ProfileData {
  name: string;
  brandTagline: string;
  heroHeadline: string;
  heroStatementSeen: string;
  heroStatementUnseen: string;
  heroSubheadline: string;
  bio: string[];
  avatarUrl: string;
  currentlyExploring: string[];
  systemStatus: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  profile: ProfileData;
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  research: ResearchItem[];
  certifications: Certification[];
  resume: ResumeData;
  messages?: ContactMessage[];
}
