
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  image: string;
}

export type BlogCategory = 
  | 'Authority' 
  | 'Audit' 
  | 'Clearinghouse' 
  | 'Insurance' 
  | 'HOS' 
  | 'ELD' 
  | 'Maintenance';

export interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  phoneNumber: string;
}

export interface RoadmapStep {
  id: number;
  phase: string;
  title: string;
  description: string;
  timeline: string;
  difficulty: 'Foundation' | 'Moderate' | 'Critical' | 'Advanced';
  details: string[];
  mistakes: string[];
  tools: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  GUEST = 'GUEST'
}

export interface User {
  role: UserRole;
  isLoggedIn: boolean;
}
