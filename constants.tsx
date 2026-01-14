import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Truck, 
  AlertCircle, 
  Clock, 
  Wrench,
  Search,
  BookOpen,
  Route
} from 'lucide-react';
import { BlogPost, RoadmapStep, SiteSettings, CourseModule, Testimonial } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: "LaunchPath™",
  tagline: "Accuracy Over Hype.™",
  heroTitle: "Build Your Trucking Business on The Four Pillars of Survival",
  heroSubtitle: "Compliance-first systems for new owner-operators. Navigate your first 90 days and survive the critical 18-month New Entrant phase.",
  primaryColor: "#1e3a5f",
  secondaryColor: "#d4af37",
  metaDescription: "Professional carrier compliance education for new owner-operators. Focus on the Four Pillars: Authority, Insurance, Compliance, and Cash-Flow.",
  logoUrl: "https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/logo.png", 
  showVeteranBadge: true,
  showDisabledVeteranBadge: true,
  contact: {
    email: "support@launchpath.com",
    phone: "1-800-DOT-COMP",
    address: "700 Compliance Way, Charlotte, NC 28202",
    hours: "Mon-Fri: 9am - 6pm EST"
  },
  social: {
    facebook: "https://facebook.com/launchpath",
    twitter: "https://twitter.com/launchpath",
    linkedin: "https://linkedin.com/company/launchpath",
    instagram: "https://instagram.com/launchpath",
    youtube: "https://youtube.com/@launchpath"
  },
  checkoutUrls: {
    selfPaced: "",
    mastery: "",
    elite: ""
  },
  seo: {
    titleFormat: "{{pageTitle}} | LaunchPath™",
    twitterCard: "summary_large_image"
  }
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Marcus J.',
    role: 'Owner-Operator, MJ Logistics',
    content: 'LaunchPath was the difference between keeping my authority and losing everything. Their DQ file templates alone saved me during my first roadside inspection.'
  },
  {
    id: '2',
    author: 'Sarah Chen',
    role: 'Carrier Manager, NorthStar Hauling',
    content: 'The most comprehensive compliance training I have ever seen. They don’t just tell you the rules; they show you how to implement them without the headache.'
  },
  {
    id: '3',
    author: 'David Rodriguez',
    role: 'Box Truck Entrepreneur',
    content: 'I was overwhelmed by DOT requirements until I found the 90-Day Success Roadmap. Now, I feel confident and audit-ready every single morning.'
  }
];

export const COURSE_MODULES: CourseModule[] = [
  { id: 0, title: "The Mindset Module", description: "The foundation of your business. Go/No-Go decision framework, authority risk assessment, and operational reality check.", lessons: 6 },
  { id: 1, title: "Business & Authority Setup", description: "Laying the legal foundation. DOT vs MC, interstate registration, and proper carrier identity setup.", lessons: 8 },
  { id: 2, title: "Insurance Survival", description: "Navigating the highest expense. Coverage types, cancellation triggers, and claim management strategies.", lessons: 5 },
  { id: 3, title: "Compliance Backbone", description: "The technical system. DQ files, Clearinghouse, HOS/ELD, and maintenance logs.", lessons: 10 },
  { id: 4, title: "New Entrant Audit Preparation", description: "Surviving the federal investigation. Step-by-step document preparation and audit conduct.", lessons: 7 },
  { id: 5, title: "Load Discipline & Cash Flow", description: "Managing the Money Loop. Solvent operations during the 30-60 day payment gap.", lessons: 6 },
  { id: 6, title: "Stabilization & Long-Term Success", description: "Operating clean after approval. Annual filings, CSA score monitoring, and scaling with integrity.", lessons: 4 }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "auth-1",
    title: "USDOT vs. MC Number: Do You Really Need Both?",
    slug: "usdot-vs-mc-number-differences",
    category: "Authority",
    excerpt: "Understanding the difference between safety registration (USDOT) and operating authority (MC). Not every carrier needs both, but getting it wrong stops your business before it starts.",
    content: "<h2>The Safety vs. Business Distinction</h2><p>In the United States, the FMCSA uses two primary identifiers. The <strong>USDOT Number</strong> is your safety footprint—it tracks your inspections, crashes, and audit results. Every commercial vehicle over 10,001 lbs involved in interstate commerce needs one.</p><p>The <strong>MC Number</strong> (Motor Carrier authority) is different. It is about the <em>business</em> of hauling for hire. If you are a 'For-Hire' carrier moving freight for others across state lines, you need an MC number. If you only move your own goods, you are a private carrier and usually only need the USDOT number.</p>",
    publishedAt: "2025-01-10",
    author: "Vince",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Authority', 'FMCSA', 'Setup']
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    phase: "Phase I: The Foundation",
    title: "The 90-Day Containment Window",
    description: "Setting the systems that determine if you survive the first 18 months of federal scrutiny.",
    timeline: "Weeks 1-12",
    difficulty: "Critical",
    details: [
      "Obtaining your USDOT & MC Number (21-day protest period)",
      "BOC-3 Process Agent filing and UCR registration",
      "Building the Compliance Backbone (DQ Files, Randoms, HOS)",
      "Solving the Cash-Flow Oxygen problem"
    ],
    mistakes: [
      "Filing authority without an insurance strategy",
      "Hauling loads before DQ files are complete",
      "Ignoring the New Entrant Audit clock"
    ],
    tools: [
      "FMCSA Portal",
      "BOC-3 Process Agent",
      "UCR Registration System",
      "Drug & Alcohol Clearinghouse"
    ]
  }
];