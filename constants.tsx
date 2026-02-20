
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
  metaDescription: "LaunchPath is a 90-day compliance system for new motor carriers. Build audit-ready documentation and protect your authority. Accuracy over hype.",
  logoUrl: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fblue_logo.png?alt=media&token=57100c1c-e867-4f10-9d2a-30e9d641b8cf", 
  faviconUrl: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2Ffavicon.png?alt=media&token=83091176-34eb-44eb-8ce4-6871f0f48e2c",
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
    title: "Ground 0: THE DISCIPLINE STANDARD", 
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
    title: "AUTHORITY PROTECTION PROTOCOLS", 
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
    title: "INSURANCE CONTINUITY SYSTEMS", 
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
    title: "COMPLIANCE BACKBONE INSTALLATION", 
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
    title: "CASH-FLOW OXYGEN PROTOCOLS", 
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
    title: "AUDIT READINESS STANDARDS", 
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
    title: "STABILIZATION & SCALE PROTOCOLS", 
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
    id: "deadly-sins-carrier-failure",
    title: "THE 16 DEADLY SINS OF CARRIER FAILURE: A TAXONOMY OF EXPOSURE",
    slug: "16-deadly-sins-carrier-failure",
    category: "Compliance",
    excerpt: "Institutional Analysis: High-priority violations that trigger automatic federal audit failure. Identify the patterns of Undercapitalization, Money Loop, and Documentary Disorder before they manifest.",
    content: `
      <div style="background: #002244; color: #ffffff; padding: 40px; border-radius: 30px; margin-bottom: 40px; border-left: 10px solid #C5A059;">
        <h3 style="color: #C5A059; margin-top: 0; font-family: Montserrat, sans-serif; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px;">Master Diagnostic Bulletin</h3>
        <p style="font-size: 20px; font-weight: 700; line-height: 1.6; margin-bottom: 0;">
          "The Federal Motor Carrier Safety Administration (FMCSA) uses a specific hierarchy of violations to determine if a carrier is fundamentally unsafe. In the LaunchPath standard, we call these the 16 Deadly Sins—violations that do not allow for remediation during an audit. They are automatic failures."
        </p>
      </div>

      <h3>I. THE ANATOMY OF SYSTEMIC COLLAPSE</h3>
      <p>Failure in the motor carrier space is rarely random. It is almost always the result of a predictable sequence of events that begins with the erosion of the Four Pillars. When an authority fails, it typically leaves a trail of what investigators define as 'Critical' or 'Acute' violations. However, for the new carrier, the collapse often starts with three conceptual 'Sins' that lead to federal detection.</p>
      
      <h4>1. Undercapitalization (The Financial Sin)</h4>
      <p>Undercapitalization is the primary catalyst for all other failures. When a carrier enters the market without 90 days of operational reserves, they lose the ability to make safety-first decisions. Maintenance is deferred (49 CFR § 396), insurance premiums are put at risk (49 CFR Part 387), and load selection is driven by desperation rather than margin analysis.</p>

      <h4>2. The Money Loop (The Operational Sin)</h4>
      <p>The Money Loop occurs when a carrier uses revenue from Load B to pay for the fuel for Load A. This state of constant catch-up creates a 'blindness' to real operating costs. Carriers in the Money Loop rarely know their break-even RPM. This Sin leads directly to HOS falsification (49 CFR § 395.8) as drivers are pressured to keep equipment moving at all costs to satisfy debt cycles.</p>

      <h4>3. Documentary Disorder (The Administrative Sin)</h4>
      <p>Documentary Disorder is the failure to maintain a 'Clinical' registry of evidence. Federal auditors do not care about your 'intent' to be safe; they only care about the evidence of refuge. Missing a single pre-employment drug test result (49 CFR § 382.301) or having fragmented Driver Qualification files (49 CFR § 391.51) signal a total loss of institutional control.</p>

      <div style="background: #C5A059; color: #002244; padding: 50px; border-radius: 40px; margin: 60px 0; text-align: center; border: 4px solid #002244; box-shadow: 0 30px 60px rgba(0,0,0,0.1);">
        <h3 style="font-family: Montserrat, sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; font-size: 32px;">STOP OPERATING ON INTUITION.</h3>
        <p style="font-size: 20px; font-weight: 700; max-width: 600px; margin: 0 auto 40px; line-height: 1.5;">
          The primary cure for Undercapitalization and the Money Loop is clinical math. Identify your real costs before they identify your failure.
        </p>
        <a href="/tools/tco-calculator" style="background: #002244; color: #ffffff; padding: 25px 50px; border-radius: 20px; text-decoration: none; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; font-size: 14px; box-shadow: 0 15px 40px rgba(0,34,68,0.4); display: inline-block; border-bottom: 6px solid #000;">
          Launch TCO Economic Engine
        </a>
      </div>

      <h3>II. MAPPING THE 16 DEADLY SINS TO FEDERAL STATUTES</h3>
      <p>The FMCSA's New Entrant Safety Assurance Program targets specific high-priority violations. If an auditor reaches any of these during the 48-hour audit window, your authority is marked for immediate revocation.</p>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; border: 1px solid #e2e8f0; margin: 40px 0;">
        <thead>
          <tr style="background-color: #002244; color: white;">
            <th style="padding: 15px; border: 1px solid #334155;">SIN CATEGORY</th>
            <th style="padding: 15px; border: 1px solid #334155;">FEDERAL STATUTE</th>
            <th style="padding: 15px; border: 1px solid #334155;">IMPACT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">Substance Abuse</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0;">
              <div style="display: flex; align-items: center; justify-content: space-between; position: relative;">
                <span>49 CFR § 382.301</span>
                <button class="reach-trigger" data-reach="Is there a verified negative lab result on file for every driver that predates their first load for your authority?">REACH</button>
                <div class="reach-tooltip hidden">"Is there a verified negative lab result on file for every driver that predates their first load for your authority?"</div>
              </div>
            </td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #ef4444; font-weight: 800;">TERMINAL FAIL</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">Driver Qualification</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0;">
              <div style="display: flex; align-items: center; justify-content: space-between; position: relative;">
                <span>49 CFR § 391.51</span>
                <button class="reach-trigger" data-reach="If an auditor pulls a driver file at random, can you produce all 12 required items (Application, MVR, Med-Cert, etc.) in under 5 minutes?">REACH</button>
                <div class="reach-tooltip hidden">"If an auditor pulls a driver file at random, can you produce all 12 required items (Application, MVR, Med-Cert, etc.) in under 5 minutes?"</div>
              </div>
            </td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #ef4444; font-weight: 800;">TERMINAL FAIL</td>
          </tr>
          <tr>
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">HOS Falsification</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0;">
              <div style="display: flex; align-items: center; justify-content: space-between; position: relative;">
                <span>49 CFR § 395.8</span>
                <button class="reach-trigger" data-reach="Does your ELD dashboard currently have 'Unassigned Driving Time' that has not been reconciled and signed by a driver?">REACH</button>
                <div class="reach-tooltip hidden">"Does your ELD dashboard currently have 'Unassigned Driving Time' that has not been reconciled and signed by a driver?"</div>
              </div>
            </td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #ef4444; font-weight: 800;">CRIMINAL DEFAULT</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: bold;">Insurance Lapse</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0;">
              <div style="display: flex; align-items: center; justify-content: space-between; position: relative;">
                <span>49 CFR Part 387</span>
                <button class="reach-trigger" data-reach="Is your insurance filing status currently listed as 'Active' on the SAFER system, and do you have the next 60 days of premium funded?">REACH</button>
                <div class="reach-tooltip hidden">"Is your insurance filing status currently listed as 'Active' on the SAFER system, and do you have the next 60 days of premium funded?"</div>
              </div>
            </td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #ef4444; font-weight: 800;">REVOCATION</td>
          </tr>
        </tbody>
      </table>

      <h3>III. ELIMINATING THE EXPOSURE VECTOR</h3>
      <p>The distance between a driver and a carrier executive is measured by the systems they trust. A driver trusts their skill; an executive trusts their infrastructure. To move beyond the 16 Deadly Sins, you must stop handling compliance as an elective task and start managing it as an engineered guard.</p>

      <p>By establishing the LaunchPath Operating Standard within your first 90 days, you install a 'Compliance Backbone' that satisfies investigators before they ever knock on your door. Order precedes revenue. Discipline precedes expansion. Wisdom precedes the riches.</p>

      <div style="text-align: center; margin-top: 60px; padding-top: 40px; border-top: 1px solid #e2e8f0;">
        <p style="font-family: Montserrat, sans-serif; font-style: italic; font-size: 24px; color: #002244; font-weight: 800; max-width: 600px; margin: 0 auto;">
          "If you are waiting for the audit to start building your files, you have already failed."
        </p>
        <p style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; color: #C5A059; margin-top: 20px;">— Vince Lawrence, System Custodian</p>
      </div>

      <div style="margin-top: 60px; display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <p style="font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px; color: #64748b;">Next Recommended Action:</p>
        <a href="/exposure-matrix" style="background: #1e3a5f; color: white; padding: 20px 40px; border-radius: 15px; text-decoration: none; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; box-shadow: 0 10px 30px rgba(30,58,95,0.3);">Analyze the Exposure Matrix</a>
      </div>
    `,
    publishedAt: "2025-02-15",
    author: "Vince Lawrence",
    image: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2FBLOG%20POST%2F90%20day%20stabilization.jpg?alt=media&token=f934937c-51f4-4981-99fe-bde29b177b9a",
    status: 'published',
    tags: ['16 Deadly Sins', 'Audit', 'FMCSA', 'Exposure']
  },
  {
    id: "briefing-four-pillars",
    title: "THE MATH OF SURVIVAL: WHY CASH-FLOW OXYGEN IS THE FOUNDATION OF OPERATING AUTHORITY",
    slug: "math-of-survival-four-pillars",
    category: "Compliance",
    excerpt: "Technical Briefing: An institutional analysis of why the interdependence of cash flow and compliance determines carrier longevity. Features core data on operating costs and regulatory risk.",
    content: `
      <div style="background: #002244; color: #ffffff; padding: 40px; border-radius: 30px; margin-bottom: 40px; border-left: 10px solid #C5A059;">
        <h3 style="color: #C5A059; margin-top: 0; font-family: Montserrat, sans-serif; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px;">Lead Safety Editor Industry Briefing</h3>
        <p style="font-size: 20px; font-weight: 700; line-height: 1.6; margin-bottom: 0;">
          "The decision to pursue a motor carrier authority is an honorable ambition, but it is one guarded by a mathematical reality that does not forgive disorder. In this briefing, we analyze the clinical interdependence of the Four Pillars and why stewardship precedes revenue."
        </p>
      </div>

      <h3>I. THE MARKET REALITY: A LOW BARRIER TO ENTRY, A HIGH BARRIER TO ENDURANCE</h3>
      <p>To pursue the status of a motor carrier is to engage in one of the most vital sectors of the American economy. It represents the height of the entrepreneurial spirit—the desire to move from the status of a driver to that of an executive. However, as any veteran of manufacturing leadership or military logistics will attest, the distance between an initial filing and a sustainable operation is bridged not by effort alone, but by the clinical application of systems.</p>
      
      <p>The market currently demonstrates a low barrier to entry but a historically high barrier to endurance. In 2023 alone, the Federal Motor Carrier Safety Administration (FMCSA) issued over 159,000 new DOT numbers. This volume indicates that the industry does not lack for individuals with the capital or the desire to participate in the freight economy. Yet, the data regarding survival is sobering. Statistics regarding motor carrier industry health show that between 33% and 45% of new motor carriers registered between 2018 and 2021 are now inactive.</p>

      <blockquote style="background: #f8fafc; border-left: 5px solid #1e3a5f; padding: 30px; margin: 40px 0;">
        <h4 style="margin-top: 0; color: #1e3a5f; font-family: Montserrat, sans-serif; text-transform: uppercase; font-size: 12px; letter-spacing: 0.2em; margin-bottom: 15px;">Executive Insight: The Attrition Constant</h4>
        <p style="margin-bottom: 0; font-size: 18px; font-weight: 600; color: #1e3a5f;">The FMCSA issued over 159,000 new DOT numbers in 2023, yet federal data confirms that nearly half of all entrants from the previous three years have already ceased operations. The market lacks survivors who possess institutional infrastructure.</p>
      </blockquote>

      <h3>II. SYSTEM FAILURES: THE MECHANICS OF COLLAPSE</h3>
      <p>The collapse of a new authority typically follows a predictable sequence, beginning with the exhaustion of what we define as "Cash-Flow Oxygen." The fiscal reality of interstate commerce is industrial in scale, and for the new owner-operator, the scale of revenue can be deceptive. A single truck can generate significant gross figures, yet the underlying costs are relentless.</p>
      
      <p>Current industry reports indicate that the average monthly operating cost per truck ranges from $10,300 to $18,800 depending on equipment age, insurance profile, and fuel efficiency. When an operator moves into the market without a 90-day cash reserve, they are forced into a state of reactive management. In this state, maintenance is deferred, insurance premiums are stressed, and load selection is driven by desperation rather than margin analysis. This lack of fiscal stewardship is the leading cause of the "Money Loop" collapse, where the business consumes its own capital to stay in motion until the equipment or the authority fails.</p>

      <h3>III. DATA INTERPRETATION: THE INTERDEPENDENCE OF THE FOUR PILLARS</h3>
      <p>The stabilization of a carrier requires the installation of the Four Pillars of the Operating Standard: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen. These are not separate administrative tasks; they are a single, interlocking system of engineering controls.</p>
      
      <ul>
        <li><b>Authority Protection:</b> The legal right to operate and the asset at the center of the structure.</li>
        <li><b>Insurance Continuity:</b> The financial shield required to move freight and protect that asset.</li>
        <li><b>Compliance Backbone:</b> The documentary evidence of safety required to satisfy federal investigators.</li>
        <li><b>Cash-Flow Oxygen:</b> The capital required to keep the other three pillars alive.</li>
      </ul>

      <p>Understanding the interdependence of these pillars is the hallmark of a carrier executive. For example, a lapse in the Compliance Backbone—such as failing to maintain clinical Driver Qualification files—leads to a failed New Entrant Safety Audit. A failed audit triggers a catastrophic loss of Insurance Continuity, as underwriters move to cancel or non-renew a carrier with an "Unsatisfactory" or "Conditional" rating. The resulting premium spike eventually suffocates the Cash-Flow Oxygen. <a href="/learning-path" style="color: #1e3a5f; font-weight: 800; text-decoration: underline;">Review the Four Pillars of the Operating Standard here</a> to understand how internal alignment prevents terminal exposure.</p>

      <blockquote style="background: #f8fafc; border-left: 5px solid #1e3a5f; padding: 30px; margin: 40px 0;">
        <h4 style="margin-top: 0; color: #1e3a5f; font-family: Montserrat, sans-serif; text-transform: uppercase; font-size: 12px; letter-spacing: 0.2em; margin-bottom: 15px;">Executive Insight: The TCO Diagnostic</h4>
        <p style="margin-bottom: 0; font-size: 18px; font-weight: 600; color: #1e3a5f;">The TCO (True Cost of Ownership) Calculator is the primary diagnostic tool for maintaining Cash-Flow Oxygen. Without an executive-level view of your math, you are operating on intuition rather than infrastructure.</p>
      </blockquote>

      <h3>IV. THE PATH FORWARD: STRATEGIC RESTRAINT AS WISDOM</h3>
      <p>The data analysis of the 18-month New Entrant phase reveals a pattern of predictable risk. The FMCSA monitors new carriers with heightened scrutiny, looking specifically for "16 Deadly Sins"—the high-priority violations that trigger automatic audit failure. When a carrier operates without a "Compliance Backbone," they are essentially playing a game of probability with their life's work.</p>
      
      <p>The average FMCSA fine currently stands at nearly $6,000, with serious violations involving hazardous materials or systemic drug and alcohol testing failures peaking at over $79,000. For a new business, these are not mere administrative hurdles; they are terminal events that consume more capital than the cost of a high-quality equipment down payment. The $2,500 investment required for formal Admission to the LaunchPath system is not an expense; it is a rational policy against the $79,000 risk of total failure.</p>

      <p>In conclusion, those who honor the path of preparation and install the necessary systems within the 90-day stabilization window will find that they have not just built a job, but established an institution. Wisdom is the principal thing; therefore, get wisdom. And with all thy getting, get understanding. Establishing your operating standard is the most significant investment you will make in the life of your authority.</p>

      <div style="margin-top: 60px; display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <p style="font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px; color: #64748b;">Next Clinical Procedure:</p>
        <a href="/auto-diagnostic" style="background: #1e3a5f; color: white; padding: 20px 40px; border-radius: 15px; text-decoration: none; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; box-shadow: 0 10px 30px rgba(30,58,95,0.3);">Take the AUTO Diagnostic™</a>
      </div>
      
      <p style="font-size: 10px; color: #94a3b8; margin-top: 80px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 40px;">
        END OF BRIEFING // DATA SOURCES: FMCSA MOTOR CARRIER INDUSTRY STATISTICS (2023), INDUSTRY TCO REPORTS.
      </p>
    `,
    publishedAt: "2025-02-05",
    author: "Vince Lawrence",
    image: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2FBLOG%20POST%2FMath%20of%20survial.jpg?alt=media&token=b682b2ef-0a99-44df-9f9a-a644214c32f5",
    status: 'published',
    tags: ['Four Pillars', 'Stewardship', 'Math', 'Survival']
  },
  {
    id: "audit-1",
    title: "THE 48-HOUR NEW ENTRANT WINDOW: ARE YOU READY?",
    slug: "new-entrant-audit-readiness",
    category: "Audit",
    excerpt: "The New Entrant Safety Audit is the 'final exam' for your first 18 months. Failure results in immediate authority revocation. Are your files guarded?",
    content: `
      <div style="background: #002244; color: #ffffff; padding: 40px; border-radius: 30px; margin-bottom: 40px; border-left: 10px solid #C5A059;">
        <h3 style="color: #C5A059; margin-top: 0; font-family: Montserrat, sans-serif; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px;">The Safety Architect Perspective</h3>
        <p style="font-size: 20px; font-weight: 700; line-height: 1.6; margin-bottom: 0;">
          "In my 25 years of manufacturing leadership and 5 years as an OSHA-certified safety coordinator, I used a principle called the <b>Reach Test</b>. If a hazard could be reached during normal operations, the system failed. The FMCSA audit is the industry's Reach Test. If they can reach a defect in your files in 48 hours, your authority is dead."
        </p>
      </div>

      <h3>I. THE FINAL EXAM OF THE NEW ENTRANT PHASE</h3>
      <p>In the world of interstate commerce, the FMCSA doesn't just take your word for it. The first 18 months of your operation is a probationary period known as the New Entrant phase. The "final exam" of this period is the Safety Audit.</p>
      
      <p>When the notification arrives, you typically have <b>exactly 48 hours</b> to upload your digital records to the federal portal. This is not a request; it is a directive. It is the clinical assessment of your <b>Compliance Backbone</b>.</p>

      <h3>II. THE COST OF FAILURE: TERMINAL EXPOSURE</h3>
      <p>Failure in a New Entrant Audit isn't just a "fix-it" ticket. It is a terminal event for most carriers. The consequences are explicit and non-negotiable:</p>
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 12px; padding-left: 30px; position: relative;"><span style="position: absolute; left: 0; color: #ef4444;">●</span><b>Immediate Authority Revocation:</b> Your MC number is terminated.</li>
        <li style="margin-bottom: 12px; padding-left: 30px; position: relative;"><span style="position: absolute; left: 0; color: #ef4444;">●</span><b>Administrative Restart:</b> You must start the filing process from zero, including new fees and waiting periods.</li>
        <li style="margin-bottom: 12px; padding-left: 30px; position: relative;"><span style="position: absolute; left: 0; color: #ef4444;">●</span><b>Insurance Volatility:</b> Underwriters treat a failed audit as a critical risk factor, often leading to 300% premium spikes or total non-renewal.</li>
      </ul>

      <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 30px; border-radius: 20px; margin: 40px 0; color: #002244;">
        <h4 style="margin-top: 0; color: #002244; font-family: Montserrat, sans-serif; text-transform: uppercase; font-size: 12px; letter-spacing: 0.2em; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">The Mandatory Documentation List</h4>
        <ul style="margin-bottom: 0; color: #334155; font-weight: 600;">
          <li style="margin-bottom: 15px;"><b>Proof of Controlled Substance Testing:</b> Evidence of pre-employment negatives and active consortium enrollment.</li>
          <li style="margin-bottom: 15px;"><b>Current MCS-150 Updates:</b> Verification that your carrier identity matches your operational reality.</li>
          <li style="margin-bottom: 15px;"><b>Complete Driver Qualification (DQ) Files:</b> A clinical record for every operator including MVRs, medical certs, and applications.</li>
        </ul>
      </div>

      <h3>III. ELIMINATING THE REACHABLE HAZARD</h3>
      <p>If you are waiting for the audit notification to start building your files, you have already failed the Reach Test. The LaunchPath Operating Standard installs the documentation infrastructure <i>before</i> you book your first load, ensuring that when the 48-hour clock starts, you are simply providing evidence of an already established system.</p>

      <div style="text-align: center; margin-top: 60px; padding-top: 40px; border-top: 1px solid #e2e8f0;">
        <p style="font-family: Montserrat, sans-serif; font-style: italic; font-size: 24px; color: #002244; font-weight: 800; max-width: 600px; margin: 0 auto;">
          “By wisdom a house is built, and by understanding it is established; by knowledge the rooms are filled with all precious and pleasant riches.”
        </p>
        <p style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; color: #C5A059; margin-top: 20px;">— Vince Lawrence, System Custodian</p>
      </div>
    `,
    publishedAt: "2025-01-28",
    author: "Vince Lawrence",
    image: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2FBLOG%20POST%2F48%20hour%20new%20entrant.jpg?alt=media&token=f547b070-6556-4c48-889b-4a9f82364a9f",
    status: 'published',
    tags: ['Audit', 'FMCSA', 'Compliance', 'Reach Test']
  },
  {
    id: "auth-1",
    title: "USDOT VS. MC NUMBER: DO YOU REALLY NEED BOTH?",
    slug: "usdot-vs-mc-number-differences",
    category: "Authority",
    excerpt: "Regulatory Directive: Distinguishing between safety registration and commercial operating authority to prevent equipment seizure.",
    seoTitle: "USDOT vs MC Number: Do You Really Need Both? | LaunchPath",
    seoDescription: "Regulatory Directive: Distinguishing between safety registration and commercial operating authority to prevent equipment seizure. Learn if you need both USDOT and MC numbers for your trucking business.",
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
    image: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2FMC%20and%20DOT%20number.png?alt=media&token=7c24b499-79c5-4ea8-94ab-c835fa5f6a09",
    status: 'published',
    tags: ['Authority', 'FMCSA', 'Setup', 'Pillars']
  },
  {
    id: "maint-1",
    title: "NAVIGATING TRUCK MAINTENANCE: FROM BREAKDOWN FIXES TO DISCIPLINED STEWARDSHIP",
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
        <h4 style="color: #C6922A; margin-top: 0; text-transform: uppercase; font-size: 14px; letter-spacing: 0.2em;">Executive Financial Alert: THE MAINTENANCE ESCROW</h4>
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
      <p>Transportation is a marathon. Carriers that survive the 18-month New Entrant window are rarely those chasing spot rates with worn equipment. They are the carriers that prioritize <b>Order</b>, <b>Stewardship</b>, and <b>SystemATIC PROCESS</b>. When you fund your escrow every mile and execute your maintenance program with discipline, you protect your safety record, your equipment, your <b>Authority</b>, and your future.</p>
      
      <p style="font-size: 10px; color: #94a3b8; margin-top: 50px; border-top: 1px solid #e2e8f0; pt-20;">END OF TECHNICAL BRIEF — REFERENCE LP-MAINT-V1.2</p>
    `,
    publishedAt: "2025-01-25",
    author: "Vince Lawrence",
    image: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2FTruck%20Maintenace%20Blog.png?alt=media&token=39afb41c-297a-4968-961c-bdaec93b3fbb",
    status: 'published',
    tags: ['Maintenance', 'FMCSA', 'Stewardship', 'Compliance']
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
