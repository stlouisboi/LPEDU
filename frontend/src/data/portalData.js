export const CURRICULUM = [
  { id: "ground-0", code: "GROUND 0", label: "The Wisdom Module",            locked: false, type: "foundation", typeLabel: "FREE FOUNDATION",        lessonCount: 6  },
  { id: "module-1", code: "MODULE 1", label: "Driver Qualification File",    locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 8, gate: "HARD GATE"       },
  { id: "module-2", code: "MODULE 2", label: "Authority & Insurance",        locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 7  },
  { id: "module-3", code: "MODULE 3", label: "The 16 Deadly Sins",           locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 8  },
  { id: "module-4", code: "MODULE 4", label: "Drug & Alcohol Program",       locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 7  },
  { id: "module-5", code: "MODULE 5", label: "Hours of Service & Dispatch",  locked: true,  type: "core",       typeLabel: "CORE IMPLEMENTATION",    lessonCount: 7  },
  { id: "module-6", code: "MODULE 6", label: "Integrity Audit",              locked: true,  type: "audit",      typeLabel: "AUDIT GATE",             lessonCount: 6, gate: "CREDENTIAL GATE" },
  { id: "module-7", code: "MODULE 7", label: "Post-Audit Recovery",          locked: true,  type: "recovery",   typeLabel: "POST-AUDIT RECOVERY",    lessonCount: 5  },
  { id: "module-8", code: "MODULE 8", label: "ELD Compliance",               locked: true,  type: "extension",  typeLabel: "STANDARD EXTENSION",     lessonCount: 5  },
  { id: "module-9", code: "MODULE 9", label: "Hazmat Decisions",             locked: true,  type: "extension",  typeLabel: "STANDARD EXTENSION",     lessonCount: 5  },
];

export const MODULE_OVERVIEWS = {
  "module-1": {
    code: "MOD-1", title: "Driver Qualification File", lessonCount: 8, duration: "~120 min",
    description: "Build the complete, audit-ready Driver Qualification File for every operating driver — including the owner-operator. The DQF is the single most cited deficiency in new entrant audits. This module does not end when the video ends; it ends when the file is built, verified, and ready for examination.",
    topics: ["Your Business Foundation — entity structure and compliance architecture", "Business Entity Selection — liability implications for new carriers", "Filing for DOT/MC Authority — USDOT, MC number, and activation sequence", "BOC-3 and Process Agent — required filing most carriers miss", "UCR and State Registrations — annual compliance requirements", "Insurance — First Look — BMC-91/91X filing and authority activation", "Driver Qualification File (GATE) — building the complete, audit-ready DQF", "Business Banking & Chart of Accounts — financial infrastructure setup"],
  },
  "module-2": {
    code: "MOD-2", title: "Authority & Insurance", lessonCount: 7, duration: "~105 min",
    description: "Insurance lapse is the most common cause of authority suspension. This module installs the full insurance continuity system — from first-year budget reality to accident response protocol to renewal strategy.",
    topics: ["The Five Required Coverage Types — what FMCSA mandates and why", "First-Year Insurance Budget Reality — what new carriers actually pay", "Insurance Cancellation Triggers — how lapses happen and how to prevent them", "SMS Scores and Insurance Impact — how your safety score affects premiums", "Accident Response Protocol — the first 24 hours after an incident", "Claims Management — building your claims record correctly", "Renewal Strategy — positioning for better rates after Year 1"],
  },
  "module-3": {
    code: "MOD-3", title: "The 16 Deadly Sins", lessonCount: 8, duration: "~115 min",
    description: "The Exposure & Refuge framework governs this module. Each of the 16 documented FMCSA violation categories is presented as an exposure with a corresponding refuge — the system you install to eliminate it permanently.",
    topics: ["Introduction — What the 16 Sins Actually Represent", "Drug & Alcohol Exposure (Sins 1–5) — testing failures and program gaps", "Driver Qualification Exposure (Sins 6–9) — DQF deficiencies at audit", "Insurance & Financial Exposure (Sins 10–11) — lapses and coverage failures", "Vehicle Maintenance Exposure (Sins 12, 14, 15) — inspection and record failures", "Hours of Service Exposure (Sins 13, 16) — log violations and ELD gaps", "The Complete Exposure Map — all 16 patterns in sequence", "From Exposure to Refuge — what the installation sequence addresses"],
  },
  "module-4": {
    code: "MOD-4", title: "Drug & Alcohol Program", lessonCount: 7, duration: "~110 min",
    description: "Install a fully compliant federal Drug & Alcohol testing program — consortium enrollment, Clearinghouse registration, written policy, and owner-operator special compliance. This is not optional; it's a hard compliance requirement before a commercial driver operates.",
    topics: ["Federal D&A Program Requirements — what Part 382 actually mandates", "Consortium Selection and Enrollment — choosing and joining a qualified C/TPA", "Drug & Alcohol Clearinghouse — registration, queries, and reporting obligations", "Testing Procedures and Documentation — chain of custody and record requirements", "Owner-Operator Special Considerations — self-enrollment and query requirements", "Written Policy and Program Maintenance — building the compliant D&A policy", "Program Verification — confirming your program is audit-ready"],
  },
  "module-5": {
    code: "MOD-5", title: "Hours of Service & Dispatch", lessonCount: 7, duration: "~100 min",
    description: "Build the Hours of Service compliance framework and dispatch record system that protects your operation at roadside inspection and audit. HOS violations are among the most cited in new entrant reviews.",
    topics: ["Federal HOS Rules — the 11/14/60/70 framework and what it means operationally", "The 11/14/60-70 Hour Limits — tracking cycles and resets correctly", "Short-Haul Exemptions — the 150 air-mile rule and qualifying conditions", "ELD Requirements and Exemptions — when ELD is required and when paper logs apply", "Paper Log Compliance — maintaining correct logs for exempt operations", "Dispatch Records and Evidence Trail — building the documentation behind every move", "HOS Self-Audit Routine — monthly review to catch patterns before the auditor does"],
  },
  "module-6": {
    code: "MOD-6", title: "Integrity Audit", lessonCount: 6, duration: "~90 min",
    description: "The Integrity Audit is a full four-pillar system review conducted by the Station Custodian. A clean audit result triggers issuance of the Verified Registry ID credential — the LaunchPath proof of a documented, defensible compliance installation.",
    topics: ["What the Integrity Audit Reviews — the four-pillar examination framework", "Preparing Your Documentation Package — what must be ready before review begins", "The Four-Pillar Review Process — how the Station Custodian evaluates each pillar", "Audit Conduct and Response Protocol — what to expect and how to respond", "Ratings, Results, and What They Mean — clean vs. conditional outcomes", "Credential Issuance — what the Verified Registry ID represents and how it's issued"],
  },
  "module-7": {
    code: "MOD-7", title: "Post-Audit Recovery", lessonCount: 5, duration: "~75 min", type: "recovery",
    description: "Activated only by a conditional outcome at Module 6. This module provides the structured path from a conditional safety rating back to a defensible, stable operating position.",
    topics: ["Understanding What Happened — reading your conditional rating correctly", "Corrective Action Plans — building a CAP that satisfies the reviewer", "Rebuilding the Compliance Backbone — document reconstruction and gap closure", "Authority Repair and Reinstatement — the timeline and process for rating improvement", "Long-Term Stability After Disruption — preventing recurrence and rebuilding evidence"],
  },
  "module-8": {
    code: "MOD-8", title: "ELD Compliance", lessonCount: 5, duration: "~70 min", type: "extension",
    description: "Everything a regulated carrier needs to know about Electronic Logging Device compliance — applicability decisions, malfunction protocols, and carrier-driver responsibilities. Included in enrollment for all operators.",
    topics: ["ELD Mandate Scope and Applicability — who is and isn't required", "Exemption Criteria — short-haul, driveaway-towaway, and pre-2000 vehicle rules", "Malfunction and Data Transfer Protocols — what to do when ELD fails at roadside", "Carrier-Driver Responsibilities — training, documentation, and proper use requirements", "ELD Compliance Verification — confirming your ELD setup is audit-ready"],
  },
  "module-9": {
    code: "MOD-9", title: "Hazmat Decisions", lessonCount: 5, duration: "~65 min", type: "extension",
    description: "A structured decision framework for carriers operating near or within hazardous materials territory — threshold awareness, inadvertent exposure, and when to engage a specialist. Included in enrollment for all operators.",
    topics: ["Hazmat Threshold Awareness — when you are and aren't regulated under PHMSA", "Inadvertent Exposure — when you don't know you're carrying a regulated material", "Placard Requirements and Decision Framework — what triggers placarding obligations", "When to Engage a Compliance Specialist — recognizing the limits of self-compliance", "Hazmat Liability Exposure — what non-specialist carriers face for inadvertent violations"],
  },
};
