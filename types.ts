export interface Resource {
  id: string;
  name: string;
  description: string;
  category: 'Templates' | 'Checklists' | 'Worksheets' | 'Guides';
  type: 'PDF' | 'XLSX' | 'DOCX' | 'External';
  size: string;
  url: string;
  driveId?: string;
  requiresEmail: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ResourceLead {
  id: string;
  name: string;
  email: string;
  resourceId: string;
  resourceName: string;
  timestamp: string;
}

export interface FormSettings {
  title: string;
  submitButtonText: string;
  successMessage: string;
  enableNotifications: boolean;
  notificationEmail: string;
  emailSubjectTemplate: string;
  redirectUrl?: string;
}

export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

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
  status: 'draft' | 'published';
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
}

export type BlogCategory = 
  | 'Authority' 
  | 'Audit' 
  | 'Clearinghouse' 
  | 'Insurance' 
  | 'HOS' 
  | 'ELD' 
  | 'Maintenance'
  | 'Compliance';

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  metaDescription: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  showVeteranBadge: boolean;
  showDisabledVeteranBadge: boolean;
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  social: {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  checkoutUrls?: {
    selfPaced: string;
    mastery: string;
    elite: string;
  };
  seo: {
    titleFormat: string;
    ogImage?: string;
    twitterCard: 'summary' | 'summary_large_image';
    schemaMarkup?: string;
  };
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

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  resourcesCount: number;
  toolsCount: number;
  pillar: 'Authority' | 'Insurance' | 'Compliance' | 'Cash-Flow';
  reachTest: string;
  isCritical?: boolean;
  warning?: string;
  difficulty: 'Foundation' | 'Moderate' | 'Critical' | 'Advanced';
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

export interface HomepageContent {
  hero: {
    headline: string;
    subheadline: string;
    imageUrl: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
  };
  mission: {
    headline: string;
    content: string;
    imageUrl: string;
  };
  stats: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export interface GeneratedVideo {
  id: string;
  prompt: string;
  url: string;
  aspectRatio: '16:9' | '9:16';
  createdAt: string;
  moduleId?: number;
  storagePath?: string;
}