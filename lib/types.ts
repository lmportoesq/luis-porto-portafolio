export interface Project {
  id: string;
  name: string;
  description: string;
  features: string[];
  technologies: string[];
  demoUrl?: string;
  demoVideo?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  whatsappUrl: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    whatsapp: string;
  };
}
