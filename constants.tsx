
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
import { BlogPost, RoadmapStep, SiteSettings } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: "LaunchPath",
  heroTitle: "Build Your Trucking Business the Right Way — From Day One",
  heroSubtitle: "Compliance-first education for new and aspiring owner-operators who want to get set up correctly, survive their new entrant audit, and keep their authority active long-term.",
  contactEmail: "guidance@launchpath.com",
  phoneNumber: "(888) 555-ROAD"
};

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
    image: "https://picsum.photos/seed/audit/800/400"
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
    image: "https://picsum.photos/seed/truck/800/400"
  },
  {
    id: "3",
    title: "Setting Up Your Driver Qualification Files Correctly",
    slug: "driver-qualification-files",
    category: "Authority",
    excerpt: "Even if you are a single driver-owner, you must maintain a file for yourself. Here is the checklist.",
    content: "Content goes here. Step-by-step guide to DQ files...",
    publishedAt: "2024-05-01",
    author: "Safety Specialist John",
    image: "https://picsum.photos/seed/driver/800/400"
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
    timeline: "Weeks 4-6",
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
    timeline: "Week 6 - Launch",
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
    timeline: "Months 1-12",
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
    icon: <Truck className="w-6 h-6 text-steel-blue" />
  },
  {
    title: "Insurance & Financial Responsibility",
    desc: "Learn what coverage is legally required, what brokers actually expect, and how insurance lapses destroy authority.",
    icon: <ShieldCheck className="w-6 h-6 text-steel-blue" />
  },
  {
    title: "New Entrant Audit Readiness",
    desc: "Know what FMCSA looks for, what causes automatic failure, and how to prepare before the audit notice arrives.",
    icon: <FileText className="w-6 h-6 text-steel-blue" />
  },
  {
    title: "Driver Qualification Files",
    desc: "Build and maintain compliant driver files — including when the driver is you.",
    icon: <AlertCircle className="w-6 h-6 text-steel-blue" />
  },
  {
    title: "Hours of Service & ELD Rules",
    desc: "Understand when HOS rules apply, which exemptions are real, and how to avoid logbook and ELD violations.",
    icon: <Clock className="w-6 h-6 text-steel-blue" />
  },
  {
    title: "Maintenance & Safety Systems",
    desc: "Learn what inspection and maintenance records auditors request and how to keep them audit-ready.",
    icon: <Wrench className="w-6 h-6 text-steel-blue" />
  }
];
