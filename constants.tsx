
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
  // --- AUTHORITY CATEGORY ---
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
  },
  {
    id: "auth-2",
    title: "BOC-3 Filing: Why Process Agents are Mandatory",
    slug: "boc-3-filing-process-agents",
    category: "Authority",
    excerpt: "The BOC-3 form is a critical piece of the authority puzzle. We explain why the FMCSA requires process agents in every state you operate in.",
    content: "<p>A process agent is a representative upon whom court papers may be served in any proceeding brought against a motor carrier. You must have one in every state where you have authority to operate.</p>",
    publishedAt: "2024-12-15",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3923f0?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['BOC-3', 'Legal', 'Authority']
  },
  {
    id: "auth-3",
    title: "The 21-Day Protest Period: What Happens During the Wait?",
    slug: "fmcsa-21-day-protest-period",
    category: "Authority",
    excerpt: "After applying for your MC number, there is a mandatory waiting period. Learn what the FMCSA is doing and why you can't start hauling yet.",
    content: "<p>The protest period is a public notice period where other carriers or the public can theoretically 'protest' your application. While rare, this period is legally required and cannot be bypassed.</p>",
    publishedAt: "2024-11-20",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Waiting Period', 'FMCSA', 'Process']
  },
  {
    id: "auth-4",
    title: "Unified Carrier Registration (UCR) 2025 Deadlines",
    slug: "ucr-registration-deadlines-2025",
    category: "Authority",
    excerpt: "Don't let a simple registration fee shut down your truck. We break down the 2025 UCR fee brackets and compliance deadlines.",
    content: "<p>UCR is a base-state system for registering interstate motor carriers. The fees are based on the number of commercial motor vehicles you operate.</p>",
    publishedAt: "2025-01-05",
    author: "Compliance Specialist John",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e78b?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['UCR', 'Fees', 'Registration']
  },

  // --- AUDIT CATEGORY ---
  {
    id: "audit-1",
    title: "The Top 5 Fail Points in New Entrant Safety Audits",
    slug: "top-5-audit-fail-points",
    category: "Audit",
    excerpt: "1 in 5 carriers fail their first audit. We analyze the data to show you exactly which violations cause 'Automatic Failure' results.",
    content: "<p>Auditors look for specific 'Critical' and 'Acute' violations. The most common fail is missing drug testing records or lack of a consortium enrollment.</p>",
    publishedAt: "2025-01-12",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1450101496173-ee41526384c6?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Audit', 'Safety', 'FMCSA']
  },
  {
    id: "audit-2",
    title: "Remote Audits vs. On-Site: What to Expect in 2025",
    slug: "remote-vs-onsite-fmcsa-audits",
    category: "Audit",
    excerpt: "Most new entrant audits are now handled via the FMCSA portal. Learn how to upload documents correctly and interact with your auditor online.",
    content: "<p>The Off-Site Safety Audit is the new standard. You will receive a notice to upload specific DQ files, ELD logs, and maintenance records to the portal.</p>",
    publishedAt: "2024-12-01",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Remote Audit', 'Technology', 'FMCSA']
  },
  {
    id: "audit-3",
    title: "The 'Automatic Fail' List: Audit Triggers You Must Avoid",
    slug: "automatic-audit-fail-triggers",
    category: "Audit",
    excerpt: "Certain violations trigger an immediate 'Unsatisfactory' rating. We list the 16 fatal mistakes that get your authority revoked instantly.",
    content: "<p>Failing to implement a random controlled substances testing program is the #1 automatic fail for owner-operators.</p>",
    publishedAt: "2024-11-15",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Revocation', 'Rules', 'Audit']
  },
  {
    id: "audit-4",
    title: "How to Perform a 'Mock Audit' on Your Own Files",
    slug: "how-to-perform-mock-safety-audit",
    category: "Audit",
    excerpt: "Don't wait for the DOT to find your mistakes. Use this internal checklist to verify your compliance backbone before the official notice arrives.",
    content: "<p>A mock audit involves picking 3 random days of ELD logs and checking them against toll receipts or fuel cards to ensure 'Form and Manner' accuracy.</p>",
    publishedAt: "2024-10-25",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Preparation', 'Templates', 'Self-Audit']
  },

  // --- CLEARINGHOUSE CATEGORY ---
  {
    id: "ch-1",
    title: "Owner-Operator Clearinghouse Checklist",
    slug: "clearinghouse-checklist-owner-operators",
    category: "Clearinghouse",
    excerpt: "If you are the driver and the owner, you have dual responsibilities in the Drug & Alcohol Clearinghouse. Here is your setup guide.",
    content: "<p>You must register as an employer AND designate a C-TPA (Consortium/Third Party Administrator) to manage your random testing pool.</p>",
    publishedAt: "2025-01-08",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Clearinghouse', 'Drug Testing', 'Consortium']
  },
  {
    id: "ch-2",
    title: "Full Queries vs. Limited Queries: When to Use Each",
    slug: "full-vs-limited-clearinghouse-queries",
    category: "Clearinghouse",
    excerpt: "Understand the different types of searches required by the FMCSA and how much they cost your business.",
    content: "<p>Full queries are required during the hiring process. Limited queries must be performed at least once every 12 months for every driver.</p>",
    publishedAt: "2024-12-10",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1450101496173-ee41526384c6?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Queries', 'Compliance', 'Reporting']
  },
  {
    id: "ch-3",
    title: "Reporting Violations: Your Legal Duty as a Carrier",
    slug: "reporting-violations-clearinghouse",
    category: "Clearinghouse",
    excerpt: "What happens when a driver fails a test? Learn the strict timeline and procedure for reporting drug and alcohol violations.",
    content: "<p>Employers must report actual knowledge of a violation, including 'refusal to test' events, within 3 business days.</p>",
    publishedAt: "2024-11-05",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e78b?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Violations', 'Reporting', 'Legal']
  },
  {
    id: "ch-4",
    title: "The Return-to-Duty Process Explained",
    slug: "return-to-duty-process-fmcsa",
    category: "Clearinghouse",
    excerpt: "If a driver is prohibited from operating, how do they get back on the road? We look at the SAP evaluation and follow-up testing requirements.",
    content: "<p>The Return-to-Duty (RTD) process is rigorous and must be overseen by a qualified Substance Abuse Professional (SAP).</p>",
    publishedAt: "2024-10-15",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['RTD', 'Driver Safety', 'Process']
  },

  // --- INSURANCE CATEGORY ---
  {
    id: "ins-1",
    title: "Non-Trucking Liability vs. Primary Liability",
    slug: "non-trucking-vs-primary-liability-insurance",
    category: "Insurance",
    excerpt: "One of the most confusing parts of trucking insurance. We break down which policy covers you when you are 'under dispatch' vs 'personal use'.",
    content: "<p>Primary Liability is required by the FMCSA for all active authority holders. Non-trucking liability (Bobtail) only covers the truck when not moving freight.</p>",
    publishedAt: "2025-01-11",
    author: "Insurance Expert Sarah",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Insurance', 'Finance', 'Liability']
  },
  {
    id: "ins-2",
    title: "Why New Authorities Struggle with High Premiums",
    slug: "why-new-authority-insurance-is-expensive",
    category: "Insurance",
    excerpt: "The first year is the most expensive. Learn the factors insurance companies use to set your rate and how to lower them over time.",
    content: "<p>Risk is highest in the first 2 years. Factors include driver age, location, and the 'radius of operation' you disclose to the agent.</p>",
    publishedAt: "2024-12-20",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Premiums', 'Business', 'Risk']
  },
  {
    id: "ins-3",
    title: "Cargo Insurance: Matching Your Policy to Your Load",
    slug: "cargo-insurance-requirements",
    category: "Insurance",
    excerpt: "Most brokers require $100,000 in cargo coverage. But did you know some freight types have specific exclusions? Don't get caught uncovered.",
    content: "<p>Certain high-value or 'target' commodities like electronics or alcohol may require specific riders or have higher deductibles.</p>",
    publishedAt: "2024-11-28",
    author: "Insurance Expert Sarah",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Cargo', 'Brokers', 'Policy']
  },
  {
    id: "ins-4",
    title: "The Hidden Costs of Insurance Lapses",
    slug: "costs-of-insurance-lapses",
    category: "Insurance",
    excerpt: "A single day without insurance can lead to authority suspension. We look at the 'Form K' filing process and how to avoid the 'Authority Revoked' status.",
    content: "<p>When insurance is canceled, the company files a notice with the FMCSA. You have a very short window to file new proof before suspension.</p>",
    publishedAt: "2024-10-30",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Lapse', 'Suspension', 'FMCSA']
  },

  // --- HOS CATEGORY ---
  {
    id: "hos-1",
    title: "The 14-Hour Clock: Mastering Your Duty Day",
    slug: "mastering-the-14-hour-rule",
    category: "HOS",
    excerpt: "Unlike the driving clock, the 14-hour clock never stops once it starts. Learn how to manage your loading and unloading times to maximize profit.",
    content: "<p>The 14-hour rule is a hard limit. Once you begin any work, your clock is ticking, regardless of whether you are driving or sitting in a dock.</p>",
    publishedAt: "2025-01-09",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['HOS', 'Clock', 'Operations']
  },
  {
    id: "hos-2",
    title: "30-Minute Break Requirements for 2025",
    slug: "30-minute-break-rule-hos",
    category: "HOS",
    excerpt: "The rules changed in 2020 to allow more flexibility. We explain what counts as a valid break and when you must take it.",
    content: "<p>You must take a 30-minute break after 8 cumulative hours of driving time. This break can now be taken 'On-Duty Not Driving'.</p>",
    publishedAt: "2024-12-12",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1512418490979-92798ccc13fb?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Breaks', 'Safety', 'Rules']
  },
  {
    id: "hos-3",
    title: "The 150 Air-Mile Exemption: Do You Qualify?",
    slug: "150-air-mile-exemption-explained",
    category: "HOS",
    excerpt: "Many box truck owner-operators can avoid ELD requirements using the short-haul exemption. Learn the strict criteria to use this 'Local' status.",
    content: "<p>To qualify, you must stay within a 150 air-mile radius of your work reporting location and return there within 14 hours.</p>",
    publishedAt: "2024-11-18",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d419?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Short Haul', 'Exemptions', 'ELD']
  },
  {
    id: "hos-4",
    title: "Adverse Driving Conditions: When to Add 2 Hours",
    slug: "adverse-driving-conditions-hos-rule",
    category: "HOS",
    excerpt: "Snow, ice, or unexpected crashes can eat your clock. Learn the legal way to extend your driving and duty time by 2 hours during emergencies.",
    content: "<p>The exception only applies to conditions that could not have been known at the time the run began.</p>",
    publishedAt: "2024-10-20",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1518306727298-4c17e1bf6942?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Weather', 'Emergency', 'Clock']
  },

  // --- ELD CATEGORY ---
  {
    id: "eld-1",
    title: "Choosing Your First ELD: Motive vs. Samsara vs. KeepTruckin",
    slug: "choosing-best-eld-for-box-trucks",
    category: "ELD",
    excerpt: "Not all ELDs are created equal. We compare the top United States vendors based on cost, ease of use, and audit reporting reliability.",
    content: "<p>Motive (formerly KeepTruckin) and Samsara are the industry leaders. Consider the 'Hardware-as-a-service' model vs buying the device outright.</p>",
    publishedAt: "2025-01-07",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['ELD', 'Vendors', 'Tech']
  },
  {
    id: "eld-2",
    title: "The Pre-2000 Engine Exemption: Does Your Truck Need an ELD?",
    slug: "pre-2000-engine-eld-exemption",
    category: "ELD",
    excerpt: "If your truck's engine was manufactured before 2000, you might be exempt from the ELD mandate. Learn how to verify your VIN with the DOT.",
    content: "<p>The exemption is based on the <em>engine</em> manufacture date, not necessarily the chassis year. Documentation is key here.</p>",
    publishedAt: "2024-12-05",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1586191582056-a15cd3bb3612?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Vintage Trucks', 'Exemptions', 'ELD']
  },
  {
    id: "eld-3",
    title: "Personal Conveyance: The #1 Logbook Mistake",
    slug: "personal-conveyance-eld-rules",
    category: "ELD",
    excerpt: "Auditors are cracking down on improper use of 'Personal Conveyance' (PC). Learn the legal definitions of 'Personal Use' to avoid a violation.",
    content: "<p>PC cannot be used to advance the load or toward the next pickup point. It must be for purely personal reasons like finding food or lodging.</p>",
    publishedAt: "2024-11-10",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1512418490979-92798ccc13fb?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['PC', 'Audit', 'Logs']
  },
  {
    id: "eld-4",
    title: "What to Do When Your ELD Device Malfunctions",
    slug: "eld-malfunction-procedures",
    category: "ELD",
    excerpt: "You have exactly 8 days to fix a broken ELD. Learn the mandatory procedures for paper logs and notifying the FMCSA in writing.",
    content: "<p>A malfunction requires the driver to maintain paper logs and the carrier to repair or replace the device within 8 days.</p>",
    publishedAt: "2024-10-12",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Malfunction', 'Paper Logs', 'Emergency']
  },

  // --- MAINTENANCE CATEGORY ---
  {
    id: "maint-1",
    title: "The Systematic Maintenance File: US Requirements",
    slug: "systematic-maintenance-file-dot",
    category: "Maintenance",
    excerpt: "Part 396.3 requires a 'Systematic' approach. We show you the exact folders and inspection reports auditors demand to see.",
    content: "<p>A carrier must keep records of every inspection, repair, and maintenance performed on each vehicle for at least one year.</p>",
    publishedAt: "2025-01-04",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Maintenance', 'Files', 'Audit']
  },
  {
    id: "maint-2",
    title: "Annual Inspections: Who Can Legally Perform Them?",
    slug: "periodic-annual-inspections-dot",
    category: "Maintenance",
    excerpt: "You can't just have a friend look at your truck. Learn the qualifications for a 'Periodic Inspector' and the mandatory checklist.",
    content: "<p>An inspector must understand the criteria in Appendix G and have at least one year of training or experience.</p>",
    publishedAt: "2024-12-14",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Inspection', 'Annual', 'Safety']
  },
  {
    id: "maint-3",
    title: "DVIR: The Daily Driver Vehicle Inspection Report",
    slug: "dvir-requirements-2025",
    category: "Maintenance",
    excerpt: "Pre-trip and post-trip inspections are the first line of defense. Learn when you are required to create a written report and when you are not.",
    content: "<p>As of recent rule changes, drivers are only required to complete a written DVIR if a defect is found or reported.</p>",
    publishedAt: "2024-11-22",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1581092162384-8987c17b492a?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['DVIR', 'Drivers', 'Daily']
  },
  {
    id: "maint-4",
    title: "Out-of-Service (OOS) Criteria: What Grounds a Truck?",
    slug: "out-of-service-maintenance-criteria",
    category: "Maintenance",
    excerpt: "Brakes, tires, and lighting are the most common OOS violations. We look at the CVSA North American Standard Out-of-Service Criteria.",
    content: "<p>If a truck is placed Out-of-Service, it cannot be moved until the safety defects are repaired. Moving it leads to massive fines.</p>",
    publishedAt: "2024-10-18",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1590333746438-d81ff1548b22?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['OOS', 'Roadside', 'Violation']
  },

  // --- COMPLIANCE CATEGORY ---
  {
    id: "comp-1",
    title: "Building the Perfect Driver Qualification (DQ) File",
    slug: "building-perfect-dq-file",
    category: "Compliance",
    excerpt: "Every driver (even you) must have a DQ file. This post provides the 9 essential documents that must be inside to pass an audit.",
    content: "<p>The DQ file is your primary proof of safety management. It must include the application, MVR, medical certificate, and road test.</p>",
    publishedAt: "2025-01-02",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3923f0?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['DQ File', 'Drivers', 'Compliance']
  },
  {
    id: "comp-2",
    title: "SMS Scores: How the DOT Grades Your Carrier",
    slug: "understanding-sms-csa-scores",
    category: "Compliance",
    excerpt: "The Safety Management System (SMS) uses algorithm-driven percentiles to target carriers for audits. Learn how to monitor and fix your score.",
    content: "<p>Your scores are calculated across 7 BASICs (Behavior Analysis and Safety Improvement Categories).</p>",
    publishedAt: "2024-12-18",
    author: "Regulatory Expert Sarah",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['SMS', 'CSA', 'Data']
  },
  {
    id: "comp-3",
    title: "The Medical Certificate: Registry and Verification",
    slug: "medical-certificate-compliance-dot",
    category: "Compliance",
    excerpt: "Drivers must be medically examined by a doctor on the National Registry. We explain the verification steps every carrier must take.",
    content: "<p>A carrier must verify that the examiner is on the registry and retain a copy of that verification in the DQ file.</p>",
    publishedAt: "2024-11-12",
    author: "Safety Specialist John",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Medical', 'Drivers', 'Verification']
  },
  {
    id: "comp-4",
    title: "DataQs: Challenging Unfair Roadside Violations",
    slug: "how-to-use-dataqs-fmcsa",
    category: "Compliance",
    excerpt: "Sometimes the DOT gets it wrong. DataQs is the official United States portal for challenging inspection data. Learn when and how to file an RDR.",
    content: "<p>The Request for Data Review (RDR) is how you remove inaccurate violations from your carrier profile.</p>",
    publishedAt: "2024-10-10",
    author: "Admin John",
    image: "https://images.unsplash.com/photo-1450101496173-ee41526384c6?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['DataQs', 'Legal', 'Inspections']
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
