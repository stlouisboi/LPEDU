
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
  heroTitle: "Build Your Trucking Business the Right Way — From Day One",
  heroSubtitle: "Compliance-first education for new owner-operators. Surviving your first 90 days and passed new entrant audits.",
  primaryColor: "#1e3a5f",
  secondaryColor: "#d4af37",
  metaDescription: "Professional carrier compliance education for new box truck owner-operators. Surviving your first 90 days and passing your new entrant audit.",
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
  { id: 0, title: "Foundation & Business Decision", description: "Is this business right for you? For-hire vs private carrier decision. Authority risk & reality assessment. Go/No-Go decision framework.", lessons: 4 },
  { id: 1, title: "Authority Types & Regulatory Identity", description: "DOT vs MC authority. Interstate vs intrastate operations. Carrier vs broker distinction. Why box trucks aren't exempt.", lessons: 6 },
  { id: 2, title: "FMCSA Compliance Systems", description: "Driver Qualification Files. Drug & Alcohol Clearinghouse. Hours of Service & ELD. Maintenance documentation. Required policies.", lessons: 7 },
  { id: 3, title: "Insurance, Risk & Operational Exposure", description: "Auto, cargo, and liability insurance. Why new authority is expensive. Claim consequences and monitoring.", lessons: 5 },
  { id: 4, title: "New Entrant Safety Audit Preparation", description: "What the audit is and when it happens. Conduct and requested documents. Common failure points and response strategies.", lessons: 5 },
  { id: 5, title: "Operating Clean After Approval", description: "Ongoing compliance habits. Annual filings (UCR, MCS-150). CSA score monitoring. Red flags that trigger investigations.", lessons: 4 }
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
    author: "Compliance Specialist John",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Authority', 'FMCSA', 'Setup']
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    phase: "Phase I: The Foundation",
    title: "Legal Setup & Authority",
    description: "Laying the legal foundation for your motor carrier before you even think about turning a key.",
    timeline: "Weeks 1-4",
    difficulty: "Foundation",
    details: [
      "Obtaining your USDOT & MC Number (21-day protest period)",
      "Process Agents (BOC-3) Filing",
      "Unified Carrier Registration (UCR)",
      "Drug & Alcohol Clearinghouse owner-operator enrollment"
    ],
    mistakes: [
      "Starting work before authority is active",
      "Using a residential address for public DOT records (privacy risk)",
      "Forgetting to register as an employer in the Clearinghouse"
    ],
    tools: ["FMCSA Portal", "BOC-3 Provider", "Clearinghouse Login"]
  }
];

export const FEATURES = [
  {
    title: "Authority & Registration",
    desc: "Understand when you need a USDOT number, MC authority, and how to avoid registration mistakes that delay or shut down operations.",
    icon: <Truck className="w-6 h-6 text-authority-blue" />
  },
  {
    title: "Insurance & Financial Responsibility",
    desc: "Learn what coverage is legally required, what brokers actually expect, and how insurance lapses destroy authority.",
    icon: <ShieldCheck className="w-6 h-6 text-authority-blue" />
  },
  {
    title: "New Entrant Audit Readiness",
    desc: "Know what FMCSA looks for, what causes automatic failure, and how to prepare before the audit notice arrives.",
    icon: <FileText className="w-6 h-6 text-authority-blue" />
  },
  {
    title: "Driver Qualification Files",
    desc: "Build and maintain compliant driver files — including when the driver is you.",
    icon: <AlertCircle className="w-6 h-6 text-authority-blue" />
  },
  {
    title: "Hours of Service & ELD Rules",
    desc: "Understand when HOS rules apply, which exemptions are real, and how to avoid logbook and ELD violations.",
    icon: <Clock className="w-6 h-6 text-authority-blue" />
  },
  {
    title: "Maintenance & Safety Systems",
    desc: "Learn what inspection and maintenance records auditors request and how to keep them audit-ready.",
    icon: <Wrench className="w-6 h-6 text-authority-blue" />
  }
];
