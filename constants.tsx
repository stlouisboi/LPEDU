
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
  heroTitle: "Protect Your Authority With Order and Certainty.",
  heroSubtitle: "Compliance-first systems for new motor carriers. Navigate the first 90 days and satisfy the critical 18-month New Entrant phase.",
  primaryColor: "#1e3a5f",
  secondaryColor: "#d4af37",
  metaDescription: "Professional carrier compliance education for new owner-operators. Focus on the Four Pillars: Authority, Insurance, Compliance, and Cash-Flow.",
  logoUrl: "https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/logo.png", 
  googleAnalyticsId: "G-LP-VET-2025",
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
    content: 'LaunchPath provided the documentation infrastructure required to verify my safety footprint during my first roadside inspection.'
  },
  {
    id: '2',
    author: 'Sarah Chen',
    role: 'Carrier Manager, NorthStar Hauling',
    content: 'A rigorous compliance standard. These are not tips; they are the actual implementation protocols required for institutional stability.'
  },
  {
    id: '3',
    author: 'David Rodriguez',
    role: 'Box Truck Entrepreneur',
    content: 'I moved from administrative uncertainty to an audit-ready posture by following the 90-Day Operating Standard.'
  }
];

export const COURSE_MODULES: CourseModule[] = [
  { 
    id: 0, 
    title: "Ground 0: The Discipline Standard", 
    description: "Operating Asset: Preliminary framework verification. Evaluates carrier discipline before authority filing.", 
    lessons: 6, 
    duration: "Protocol Assessment", 
    resourcesCount: 3, 
    toolsCount: 2,
    pillar: "Authority",
    difficulty: "Foundation",
    reachTest: "Failure to define a rigorous risk profile here will result in loss of investment before operational commencement."
  },
  { 
    id: 1, 
    title: "Authority Protection Protocols", 
    description: "Operating Asset: Legal architecture for carrier identity. Documentation infrastructure for MC/DOT configuration.", 
    lessons: 8, 
    duration: "Structural Setup", 
    resourcesCount: 5, 
    toolsCount: 3,
    pillar: "Authority",
    difficulty: "Foundation",
    reachTest: "Incorrect filing status or missing BOC-3s results in immediate 21-day authority suspension."
  },
  { 
    id: 2, 
    title: "Insurance Continuity Systems", 
    description: "Operating Asset: Risk mitigation files. Standards for maintaining primary liability and cargo coverage continuity.", 
    lessons: 5, 
    duration: "Risk Management", 
    resourcesCount: 4, 
    toolsCount: 2,
    pillar: "Insurance",
    difficulty: "Critical",
    reachTest: "One insurance cancellation due to non-disclosure can make an authority uninsurable for 36 months."
  },
  { 
    id: 3, 
    title: "Compliance Backbone Installation", 
    description: "Operating Asset: Technical Safety Files. Installation of DQ files, Clearinghouse governance, and HOS protocols.", 
    lessons: 10, 
    duration: "Technical Implementation", 
    resourcesCount: 12, 
    toolsCount: 5,
    pillar: "Compliance",
    difficulty: "Critical",
    reachTest: "Missing one pre-employment drug test results in an automatic 'Unsatisfactory' federal safety rating."
  },
  { 
    id: 4, 
    title: "Cash-Flow Oxygen Protocols", 
    description: "Operating Asset: Financial solvency files. Documentation of operational reserves and payment cycle management.", 
    lessons: 6, 
    duration: "Fiscal Stewardship", 
    resourcesCount: 5, 
    toolsCount: 3,
    pillar: "Cash-Flow",
    isCritical: true,
    difficulty: "Critical",
    reachTest: "Fiscal mismanagement is the primary driver of carrier bankruptcy during the first 12 months of operation."
  },
  { 
    id: 5, 
    title: "Audit Readiness Standards", 
    description: "Operating Asset: New Entrant investigation response kit. Preparation for the 48-hour federal audit window.", 
    lessons: 7, 
    duration: "Audit Verification", 
    resourcesCount: 8, 
    toolsCount: 4,
    pillar: "Compliance",
    difficulty: "Critical",
    warning: "80% FAIL RATE WITHOUT A SYSTEM",
    reachTest: "Failing the New Entrant Audit results in permanent authority revocation and mandatory business restart."
  },
  { 
    id: 6, 
    title: "Stabilization & Scale Protocols", 
    description: "Operating Asset: Advanced growth files. Standards for fleet expansion and multi-unit governance.", 
    lessons: 4, 
    duration: "Operational Continuity", 
    resourcesCount: 3, 
    toolsCount: 2,
    pillar: "Authority",
    difficulty: "Advanced",
    reachTest: "Ignoring CSA score monitoring after the first year often leads to a 400% increase in premium costs."
  }
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
