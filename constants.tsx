
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
  heroSubtitle: "Institutional compliance systems for CDL and Non-CDL motor carriers. Navigate the first 90 days and satisfy the 18-month New Entrant phase.",
  primaryColor: "#1e3a5f",
  secondaryColor: "#d4af37",
  metaDescription: "Professional carrier compliance education for CDL and Non-CDL owner-operators. The institutional standard for Authority, Insurance, Compliance, and Cash-Flow.",
  logoUrl: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fblue_logo.png?alt=media&token=57100c1c-e867-4f10-9d2a-30e9d641b8cf", 
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
    linkedin: "https://linkedin.com/company/launchpath",
    youtube: "https://youtube.com/@launchpath",
    tiktok: "https://tiktok.com/@launchpath"
  },
  checkoutUrls: {
    selfPaced: "",
    mastery: "",
    elite: ""
  },
  seo: {
    titleFormat: "{{pageTitle}} | LaunchPath™ CDL & Non-CDL Operating Standard",
    twitterCard: "summary_large_image"
  }
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Marcus J.',
    role: 'Class A Owner-Operator, MJ Logistics',
    content: 'LaunchPath provided the Class A documentation infrastructure required to verify my safety footprint during my first roadside inspection.'
  },
  {
    id: '2',
    author: 'Sarah Chen',
    role: 'CDL Fleet Manager, NorthStar Hauling',
    content: 'A rigorous compliance standard. These are not tips; they are the actual implementation protocols required for institutional fleet stability.'
  },
  {
    id: '3',
    author: 'David Rodriguez',
    role: 'Non-CDL Box Truck Operator',
    content: 'I moved from administrative uncertainty to an audit-ready posture by following the 90-Day Operating Standard for my box truck entity.'
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
    excerpt: "Regulatory Directive: Distinguishing between safety registration and commercial operating authority to prevent equipment seizure.",
    content: `
      <p style="font-size: 14px; color: #64748b; font-style: italic; margin-bottom: 30px;">Subtitle: How to Not Get Your Truck Impounded in Week One.</p>

      <h3>I. THE ADMINISTRATIVE ALPHABET SOUP</h3>
      <p>In the world of trucking, the FMCSA loves a good acronym. But for a new carrier, the "alphabet soup" of registrations can feel like a coordinated effort to keep you from actually making money. The biggest point of confusion is usually the USDOT Number and the MC Number.</p>
      
      <p>Think of this as the difference between a Driver's License and a Business Permit. One says you're safe enough to be on the road; the other says you're legally allowed to get paid for it. <b>Confusion here is the primary vector for authority revocation before your first 90-day cycle is complete.</b></p>

      <h3>II. THE USDOT NUMBER: YOUR UNIVERSAL SAFETY DNA</h3>
      <p>Your USDOT Number is like a permanent record for your truck. It’s the identifier the FMCSA uses to track your <b>"Safety DNA"</b>—accidents, inspections, and that one time you forgot to secure a load.</p>
      <ul>
        <li><b>Who Needs It:</b> Basically everyone. If your truck is over 10,001 lbs and you’re crossing state lines, you need one.</li>
        <li><b>The Vibe:</b> It’s a tracking device. It doesn't give you permission to bill anyone; it just gives the DOT a place to file your <b>16 Deadly Sins</b>.</li>
      </ul>

      <h3>III. THE MC NUMBER: YOUR "FOR-HIRE" GOLDEN TICKET</h3>
      <p>The MC Number (Operating Authority) is where the money is. This is the government giving you the green light to haul someone else’s property for cash. Without this, <b>you aren't a business—you're just a guy with a very expensive, very large hobby.</b></p>

      <h3>IV. EXECUTIVE COMPARISON MATRIX</h3>
      <div style="overflow-x: auto; margin: 30px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; border: 1px solid #e2e8f0;">
          <thead>
            <tr style="background-color: #1e3a5f; color: white;">
              <th style="padding: 15px; border: 1px solid #334155;">FEATURE</th>
              <th style="padding: 15px; border: 1px solid #334155;">USDOT NUMBER</th>
              <th style="padding: 15px; border: 1px solid #334155;">MC NUMBER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">Translation</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">"I'm a safe operator."</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">"I'm a paid professional."</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">Requirement</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">Interstate Commerce.</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">For-Hire Freight.</td>
            </tr>
            <tr>
              <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">Analogy</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">Your Social Security Number.</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">Your Business License.</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">Pillar Impact</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">Tracks your <b>Compliance Backbone</b>.</td>
              <td style="padding: 15px; border: 1px solid #e2e8f0;">Protects <b>Authority Protection</b>.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote style="background: #fefce8; border-left: 5px solid #C6922A; padding: 20px; margin: 30px 0;">
        <h4 style="margin-top: 0; color: #854d0e; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Executive Callout: The "Private Carrier" Trap</h4>
        <p style="margin-bottom: 0;">If you haul your own tools to a job site, you're a private carrier. If you haul a pallet for a neighbor for $50, you just committed an unauthorized for-hire operation. <b>Accuracy Over Hype: Get both or stay home.</b></p>
      </blockquote>

      <h3>V. PRE-TRIP RISK INSPECTION: "WINGIN' IT"</h3>
      <p>If you try to operate a for-hire business with only a DOT number, you’re basically inviting the FMCSA to audit you out of existence. Note the following failure vectors:</p>
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 15px; padding-left: 30px; position: relative;">
          <span style="position: absolute; left: 0; color: #ef4444;">[ ]</span>
          <b>The "Tow-Away" Special:</b> Your truck gets parked by state enforcement, and your driver gets a very long, very expensive Uber ride home.
        </li>
        <li style="margin-bottom: 15px; padding-left: 30px; position: relative;">
          <span style="position: absolute; left: 0; color: #ef4444;">[ ]</span>
          <b>The Insurance Blacklist:</b> Your insurance company hates surprises. If you don't have an MC number, <b>they might treat your claim like a suggestion rather than a contract.</b> This terminates your <b>Insurance Continuity</b>.
        </li>
        <li style="margin-bottom: 15px; padding-left: 30px; position: relative;">
          <span style="position: absolute; left: 0; color: #ef4444;">[ ]</span>
          <b>Broker Rejection:</b> Professional brokers won't even look at you. Operating without an MC number is <b>the fastest way to starve your Cash-Flow Oxygen.</b>
        </li>
      </ul>

      <p style="font-size: 10px; color: #94a3b8; margin-top: 50px; border-top: 1px solid #e2e8f0; pt-20;">END OF TECHNICAL BRIEF — REFERENCE LP-AUTH-V2.1</p>
    `,
    publishedAt: "2025-01-10",
    author: "Vince Lawrence",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Authority', 'FMCSA', 'Setup', 'Pillars']
  },
  {
    id: "maint-1",
    title: "Navigating Truck Maintenance: From Breakdown Fixes to Disciplined Stewardship",
    slug: "navigating-truck-maintenance-disciplined-stewardship",
    category: "Maintenance",
    excerpt: "Technical Directive: Moving from reactive repairs to a disciplined preventive maintenance program is the foundation of carrier longevity and safety compliance.",
    content: `
      <h3>I. STEWARDSHIP DISTINCTION: MAINTENANCE VS. REPAIR</h3>
      <p>Many new motor carriers quietly assume maintenance and repair are interchangeable. In the pursuit of freight revenue, they slip into a “fix it when it fails” pattern. This mindset treats maintenance as an initialization to business—when in reality, it is the <b>Compliance</b> foundation of it.</p>
      
      <div style="background: #f1f5f9; padding: 25px; border-radius: 15px; margin: 20px 0; border: 1px solid #e2e8f0;">
        <h4 style="margin-top:0; font-size: 12px; letter-spacing: 0.1em; color: #1e3a5f;">OPERATIONAL MATRIX</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 10px;"><b>REPAIR:</b> Reactive behavior triggered by equipment failure. Result: Unplanned downtime and <b>Cash-Flow</b> depletion.</li>
          <li><b>MAINTENANCE:</b> Proactive stewardship triggered by time or mileage. Result: Predictable uptime and <b>Authority</b> protection.</li>
        </ul>
      </div>

      <h3>II. RISK PROFILE: THE "REPAIR MODE" VECTOR</h3>
      <p>Operating reactively places your schedule and <b>Cash-Flow</b> under the control of the equipment, not the executive. A failure in transit is rarely just the cost of a component. It carries cumulative exposure:</p>
      <ul>
        <li>Roadside service premiums and heavy-duty towing fees.</li>
        <li>Forfeited revenue due to missed delivery windows.</li>
        <li>Heightened probability of Out-of-Service (OOS) orders during roadside inspections.</li>
      </ul>
      <p>Missed service intervals and disjointed documentation are primary findings in failed federal <b>Compliance</b> audits.</p>

      <h3>III. PREVENTIVE MAINTENANCE ARCHITECTURE</h3>
      <p>Orderly operation requires a shift in cognitive discipline. Preventive maintenance focuses on <b>predictability</b>—scheduling service based on technical data rather than warning lights.</p>
      <ul>
        <li><b>Legal Validity:</b> Pre-trip and post-trip inspections are treated as legal certifications, not administrative chores.</li>
        <li><b>Systemic Consistency:</b> Preventive maintenance is less about mechanical perfection and more about documented reliability.</li>
      </ul>

      <blockquote style="background: #1e3a5f; color: white; padding: 30px; border-left: 10px solid #C6922A; border-radius: 0 20px 20px 0; margin: 40px 0;">
        <h4 style="color: #C6922A; margin-top: 0; text-transform: uppercase; font-size: 14px; letter-spacing: 0.2em;">Executive Financial Alert: The Maintenance Escrow</h4>
        <p style="font-size: 18px; margin-bottom: 0;"><b>DO NOT TREAT GROSS REVENUE AS TAKE-HOME PAY.</b> Stable operations treat maintenance as a fixed operating expense. Successful carriers utilize a dedicated <b>Maintenance Escrow</b> funded at a minimum rate of <b>$0.15 per mile</b>. This protocol prevents normal wear-and-tear from escalating into a terminal business crisis.</p>
      </blockquote>

      <h3>IV. REGULATORY MINIMUMS (FMCSA COMPLIANCE)</h3>
      <p><b>Compliance</b> is non-negotiable for a carrier intending to preserve its <b>Authority</b>. Regulators require verifiable proof of a systematic inspection program for every asset in the fleet. Mandatory records include:</p>
      <ul>
        <li><b>Asset Identification:</b> VIN, make, model, year, and company ID.</li>
        <li><b>Service Ledger:</b> Dates and detailed descriptions of all inspections, repairs, and maintenance.</li>
        <li><b>Structure Evidence:</b> Proof that the carrier follows a defined, recurring maintenance schedule.</li>
      </ul>

      <h3>V. STEWARDSHIP PERSPECTIVE</h3>
      <p>Transportation is a marathon. Carriers that survive the 18-month New Entrant window are rarely those chasing spot rates with worn equipment. They are the carriers that prioritize <b>Order</b>, <b>Stewardship</b>, and <b>Systematic Process</b>. When you fund your escrow every mile and execute your maintenance program with discipline, you protect your safety record, your equipment, your <b>Authority</b>, and your future.</p>
      
      <p style="font-size: 10px; color: #94a3b8; margin-top: 50px; border-top: 1px solid #e2e8f0; pt-20;">END OF TECHNICAL BRIEF — REFERENCE LP-MAINT-V1.2</p>
    `,
    publishedAt: "2025-01-25",
    author: "Vince Lawrence",
    image: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2FTruck%20Maintenace%20Blog.png?alt=media&token=39afb41c-297a-4968-961c-bdaec93b3fbb",
    status: 'published',
    tags: ['Maintenance', 'FMCSA', 'Stewardship', 'Compliance']
  },
  {
    id: "audit-1",
    title: "The 48-Hour New Entrant Window: Are You Ready?",
    slug: "new-entrant-audit-readiness",
    category: "Audit",
    excerpt: "When the FMCSA calls for your safety audit, you typically have 48 hours to upload your documentation. This is not the time to start building your files.",
    content: "<h2>The Clock is Ticking</h2><p>New motor carriers are under a microscopic lens for the first 18 months. The New Entrant Safety Audit is the 'final exam' of this period. If you fail, your authority is revoked, and you must start the entire process over—including a new MC number and potentially higher insurance premiums.</p><p>Key items auditors look for: proof of controlled substance testing, current MCS-150 updates, and a complete Driver Qualification (DQ) file for every operator.</p>",
    publishedAt: "2025-01-15",
    author: "Vince",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Audit', 'Safety', 'FMCSA']
  },
  {
    id: "insurance-1",
    title: "Avoiding the Insurance 'Ghosting' Trap",
    slug: "avoiding-insurance-cancellation",
    category: "Insurance",
    excerpt: "Insurance companies are dropping new carriers at record rates. Learn the 3 red flags that trigger an immediate policy cancellation.",
    content: "<h2>Continuity is Key</h2><p>For a new carrier, an insurance cancellation is often a death sentence. Most providers will not touch a carrier that has had a policy revoked within the last 3 years. To avoid this: 1. Disclose all driver records upfront. 2. Never allow a payment to lapse. 3. Maintain active safety policies from Day 1.</p>",
    publishedAt: "2025-01-20",
    author: "Vince",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800",
    status: 'published',
    tags: ['Insurance', 'Risk', 'Continuity']
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
