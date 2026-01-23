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
  heroTitle: "Build Your Carrier on the Compliance Operating Standard",
  heroSubtitle: "A disciplined 90-day sequence for new owner-operators. Navigate the critical early phase and meet federal audit expectations with order and certainty.",
  primaryColor: "#1e3a5f",
  secondaryColor: "#d4af37",
  metaDescription: "Professional carrier compliance operating standard for new owner-operators. Focus on the Four Pillars: Authority, Insurance, Compliance, and Cash-Flow.",
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
    content: 'LaunchPath was the difference between keeping my authority and losing everything. Their DQ file logic helped me meet expectations during my first roadside inspection.'
  },
  {
    id: '2',
    author: 'Sarah Chen',
    role: 'Carrier Manager, NorthStar Hauling',
    content: 'The most comprehensive compliance training I have ever seen. They don’t just tell you the rules; they show you how to implement the standard without the headache.'
  },
  {
    id: '3',
    author: 'David Rodriguez',
    role: 'Box Truck Entrepreneur',
    content: 'I was overwhelmed by DOT requirements until I found the 90-Day Operating Standard. Now, I feel confident and audit-ready every single morning.'
  }
];

export const COURSE_MODULES: CourseModule[] = [
  { 
    id: 0, 
    title: "Ground 0: The Discipline Standard", 
    description: "The prerequisite foundation. Identify if you have the administrative discipline required to operate before filing authority.", 
    lessons: 6, 
    duration: "2 Hours", 
    resourcesCount: 3, 
    toolsCount: 2,
    pillar: "Authority",
    difficulty: "Foundation",
    reachTest: "If you fail to define your 'Why' and risk profile here, you will lose your investment before you even buy a truck."
  },
  { 
    id: 1, 
    title: "Business & Authority Setup", 
    description: "Laying the legal foundation. DOT vs MC strategy and proper carrier identity configuration.", 
    lessons: 8, 
    duration: "4 Hours", 
    resourcesCount: 5, 
    toolsCount: 3,
    pillar: "Authority",
    difficulty: "Foundation",
    reachTest: "Incorrect filing status or missing BOC-3s can lead to an immediate 21-day authority suspension."
  },
  { 
    id: 2, 
    title: "Insurance Survival", 
    description: "Navigating your highest expense. Avoid cancellation triggers and manage coverage like a professional.", 
    lessons: 5, 
    duration: "3 Hours", 
    resourcesCount: 4, 
    toolsCount: 2,
    pillar: "Insurance",
    difficulty: "Critical",
    reachTest: "One insurance cancellation due to non-disclosure can make your authority uninsurable for 3 years."
  },
  { 
    id: 3, 
    title: "Compliance Backbone", 
    description: "The technical standard. Building DQ files, Clearinghouse accounts, and HOS policies that meet inspection expectations.", 
    lessons: 10, 
    duration: "6 Hours", 
    resourcesCount: 12, 
    toolsCount: 5,
    pillar: "Compliance",
    difficulty: "Critical",
    reachTest: "Missing one pre-employment drug test results in an automatic 'Unsatisfactory' safety rating."
  },
  { 
    id: 4, 
    title: "New Entrant Audit Preparation", 
    description: "Meeting federal expectations. Step-by-step prep for the 48-hour audit window.", 
    lessons: 7, 
    duration: "4 Hours", 
    resourcesCount: 8, 
    toolsCount: 4,
    pillar: "Compliance",
    difficulty: "Critical",
    warning: "80% FAILURE RATE WITHOUT A SYSTEM",
    reachTest: "Failing your New Entrant Audit results in permanent authority revocation and a business restart."
  },
  { 
    id: 5, 
    title: "Load Discipline & Cash Flow", 
    description: "Managing the Money Loop. Solvent operations during the 30-60 day payment gap.", 
    lessons: 6, 
    duration: "3 Hours", 
    resourcesCount: 5, 
    toolsCount: 3,
    pillar: "Cash-Flow",
    isCritical: true,
    difficulty: "Critical",
    reachTest: "Cash-flow mismanagement is the #1 reason carriers with active loads go bankrupt in their first year."
  },
  { 
    id: 6, 
    title: "Stabilization & Long-Term Success", 
    description: "Scaling with integrity. Annual filings, CSA score monitoring, and fleet expansion strategies.", 
    lessons: 4, 
    duration: "2 Hours", 
    resourcesCount: 3, 
    toolsCount: 2,
    pillar: "Authority",
    difficulty: "Advanced",
    reachTest: "Ignoring your CSA scores after the first year will eventually spike your insurance by 400%."
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