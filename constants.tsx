
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
  tagline: "Compliance-First Guidance for New Entrant Carriers",
  heroTitle: "Build Your Trucking Business the Right Way — From Day One",
  heroSubtitle: "Compliance-first education for new and aspiring owner-operators who want to get set up correctly, survive their new entrant audit, and keep their authority active long-term.",
  primaryColor: "#1e3a5f",
  secondaryColor: "#d4af37",
  metaDescription: "Professional carrier compliance education for new box truck owner-operators. Surviving your first 90 days and passing your new entrant audit.",
  showVeteranBadge: true,
  contact: {
    email: "guidance@launchpath.com",
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
  { id: 0, title: "Carrier Orientation & Professional Mindset", description: "Laying the ethical foundation. Transitioning from 'driver' to 'carrier owner'.", lessons: 4 },
  { id: 1, title: "Authority & Business Infrastructure", description: "USDOT, MC, BOC-3, and the legal setup of your motor carrier.", lessons: 6 },
  { id: 2, title: "Insurance & Fiscal Responsibility", description: "Liability, cargo, and financial filings required to keep your authority active.", lessons: 5 },
  { id: 3, title: "The Drug & Alcohol Clearinghouse", description: "Mandatory enrollment, query requirements, and consortium setup.", lessons: 5 },
  { id: 4, title: "Driver Qualification (DQ) Mastery", description: "Building and maintaining compliant files for yourself and your drivers.", lessons: 7 },
  { id: 5, title: "Hours of Service & ELD Management", description: "The Part 395 rules, exemptions, and electronic logging device management.", lessons: 8 },
  { id: 6, title: "Maintenance & Inspection Systems", description: "Implementing systematic maintenance and required periodic inspections.", lessons: 6 },
  { id: 7, title: "The New Entrant Safety Audit", description: "Step-by-step preparation to ensure a 'Pass' rating in your first 12 months.", lessons: 5 }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "The New Entrant Audit: What to Expect in Your First 12 Months",
    slug: "new-entrant-audit-guide",
    category: "Audit",
    excerpt: "The FMCSA Safety Audit is not an interrogation; it's a verification. Learn exactly what documents you need to have ready.",
    content: "Content goes here. Detailed explanation of the new entrant audit process...",
    publishedAt: "2024-05-15",
    author: "Safety Specialist John",
    image: "https://picsum.photos/seed/audit/800/400",
    status: 'published',
    tags: ['Audit', 'FMCSA', 'New Entrant']
  },
  {
    id: "2",
    title: "Understanding Cargo Insurance vs. General Liability",
    slug: "trucking-insurance-basics",
    category: "Insurance",
    excerpt: "Don't get caught with the wrong policy. We break down the absolute minimums and recommended coverages for box trucks.",
    content: "Content goes here. In-depth look at insurance requirements...",
    publishedAt: "2024-05-10",
    author: "Insurance Expert Sarah",
    image: "https://picsum.photos/seed/truck/800/400",
    status: 'published',
    tags: ['Insurance', 'Finance', 'Compliance']
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
  },
  {
    id: 2,
    phase: "Phase II: Risk Mitigation",
    title: "Insurance & Fiscal Compliance",
    description: "Protecting your assets and meeting federal minimums to move freight legally.",
    timeline: "Weeks 4-8",
    difficulty: "Critical",
    details: [
      "Primary Auto Liability ($750k Federal min / $1M Industry standard)",
      "Cargo Insurance (Industry standard $100k)",
      "Heavy Vehicle Use Tax (Form 2290)",
      "State-specific IRP & IFTA registration (for non-exempt vehicles)"
    ],
    mistakes: [
      "Under-insuring for the type of freight you pull",
      "Missing the 2290 tax deadline (results in registration suspension)",
      "Applying for authority before getting insurance quotes"
    ],
    tools: ["Insurance Agent", "IRS e-file", "State DMV/DOT Portal"]
  },
  {
    id: 3,
    phase: "Phase III: The Shield",
    title: "The Compliance System",
    description: "Installing the administrative backbone that protects you during DOT inspections and audits.",
    timeline: "Weeks 8-12",
    difficulty: "Moderate",
    details: [
      "Comprehensive Driver Qualification (DQ) Files",
      "Maintenance Management Systems & Periodic Inspections",
      "Hours of Service (HOS) & ELD Policy implementation",
      "Accident Register & Claims Management"
    ],
    mistakes: [
      "Waiting until the audit notice to build files",
      "Relying on memory instead of documented systems",
      "Not knowing the difference between 'Intrastate' and 'Interstate' rules"
    ],
    tools: ["DQ File Template", "Maintenance Logbook", "ELD Provider"]
  },
  {
    id: 4,
    phase: "Phase IV: Continuity",
    title: "Audit Readiness & Operations",
    description: "Operating with excellence and preparing for the mandatory New Entrant Safety Audit.",
    timeline: "Months 3-12",
    difficulty: "Advanced",
    details: [
      "Internal 'Mock Audit' performance",
      "Quarterly safety self-evaluations",
      "Driver training and continuous education",
      "Scaling with safety-first hiring practices"
    ],
    mistakes: [
      "Ignoring roadside inspection violations",
      "Failing to respond to FMCSA data requests",
      "Letting insurance policies lapse even for one day"
    ],
    tools: ["Safety Audit Checklist", "SMS/CSA Score Monitor", "LaunchPath Advisor"]
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
