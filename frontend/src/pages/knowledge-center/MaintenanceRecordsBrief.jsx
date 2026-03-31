import KnowledgeCenterBriefTemplate from "../../components/KnowledgeCenterBriefTemplate";

const DATA = {
  code: "LP-BRF-04",
  cfr: "49 CFR Part 396",
  title: "Maintenance Records Brief",
  subtitle: "What Your Unit Files Actually Have to Prove",
  decisionHeadline: "An inspection violation can park your truck. Missing maintenance records can park your authority.",
  readTime: "9-minute brief",
  cta: {
    context: "Not sure if your maintenance records would survive an audit? Run the Compliance Gap Assessment first — then we'll show you what to build.",
    primary: { text: "Run the Compliance Gap Assessment →", to: "/reach-diagnostic" },
    secondary: { text: "Go directly to the Maintenance & Equipment Packet →", to: "/compliance-library" },
  },
  executiveSummary: {
    intent: "This is what an owner must understand before deciding how to build a maintenance record system that survives both roadside inspections and FMCSA audits.",
    cohortNote: "Maintenance record system design — including DVIR implementation, annual inspection filing, and repair documentation — is structured in the LaunchPath Standard cohort.",
    points: [
      "49 CFR Part 396 requires carriers to maintain systematic maintenance records for every commercial motor vehicle in their fleet. The key word is systematic — a stack of receipts is not a system.",
      "FMCSA auditors cross-reference roadside inspection reports against your maintenance records. If you have inspection violations but no repair documentation, you have documented evidence that you operated an unsafe vehicle.",
      "The most common audit finding in vehicle maintenance is not that repairs weren't made — it is that they weren't documented. The repair that isn't in writing didn't happen.",
    ],
  },
  leverage: {
    body: "Under 49 CFR Part 396, every motor carrier must systematically inspect, repair, and maintain all CMVs subject to its control. The regulation requires an annual or periodic inspection, pre/post-trip driver inspection reports (DVIRs), and documentation that all defects have been repaired before the vehicle returns to service. FMCSA enforcement data consistently shows that maintenance violations are among the most common audit findings — not because operators aren't fixing their trucks, but because they aren't documenting the fixes in a retrievable, linked system.",
    ownerDecisions: [
      "Annual inspection on file vs. operating out-of-cycle — Is every unit you operate covered by a current annual inspection completed by a qualified inspector? Do you know the expiration date for each unit?",
      "DVIR system in place vs. no driver inspection process — Are your drivers completing pre and post-trip inspections every day? Are defects being reported in writing? Are repairs being documented and linked?",
      "Repair documentation linked vs. orphaned receipts — Does your maintenance file show a chain of custody from reported defect → repair order → completion? Or are receipts just filed by date with no connection to the defect that triggered them?",
      "Unit file per CMV vs. fleet-wide binder — Does each vehicle have its own file with its complete maintenance history? Can you hand an auditor a binder for a specific VIN within 60 seconds?",
    ],
  },
  riskGrid: [
    { domain: "No Annual Inspection on File", fineRange: "$1,000–$16,000 per unit", downtime: "Unit placed OOS at next roadside inspection until current inspection obtained", remediation: "$300–$800 per unit for inspection + filing; inspection scheduling disruption" },
    { domain: "Operating OOS Vehicle After Defect", fineRange: "$5,000–$16,000 per occurrence", downtime: "Unit OOS, potential driver disqualification, shipper penalties", remediation: "$5,000–$15,000+ in legal defense and corrective documentation" },
    { domain: "Missing DVIR Records", fineRange: "$1,000–$10,000", downtime: "Audit finding; corrective action plan required", remediation: "$2,000–$5,000 in retroactive procedure implementation and driver retraining" },
    { domain: "Repair Documentation Gaps", fineRange: "$500–$10,000 per deficiency", downtime: "Audit finding; inability to demonstrate corrective action for prior violations", remediation: "$1,500–$4,000 in documentation reconstruction per unit" },
    { domain: "No Systematic Maintenance Program", fineRange: "$1,000–$11,000", downtime: "Failed audit; possible Conditional safety rating", remediation: "$5,000–$20,000 to build compliant program retroactively with consulting support" },
  ],
  costComparison: {
    clean: "4–6 hours to set up a DVIR system, confirm annual inspections are current, and organize unit files by VIN. Cost: filing materials + process setup. One-time.",
    remediation: "After an audit finding: unit-by-unit reconstruction of maintenance history, legal review, and corrective action plan. Cost: $5,000–$20,000+. Potential Conditional rating affecting insurance costs.",
  },
  maturityDomains: [
    {
      code: "LP-GRD-04",
      name: "Shop Guard — Maintenance System",
      items: [
        "Every CMV has a current annual inspection on file — date, inspector, VIN, pass/fail",
        "Expiration dates for annual inspections are tracked and renewals are scheduled in advance",
        "Pre/post-trip DVIR system is in use — drivers are completing reports before each trip",
        "Defect repair documentation links each repair order directly to the reported DVIR defect",
      ],
    },
    {
      code: "LP-SYS-01",
      name: "Authority Protection — Maintenance Context",
      items: [
        "Carrier knows how many CMVs are subject to Part 396 requirements",
        "Maintenance records are organized by VIN — not by date or receipt pile",
        "Owner can retrieve the complete maintenance file for any unit within 60 seconds",
      ],
    },
    {
      code: "LP-SYS-04",
      name: "Cash-Flow Oxygen — Maintenance Budget",
      items: [
        "Annual inspection cost is included in the operating budget for each unit",
        "Preventive maintenance schedule exists — not reactive-only repair model",
        "Tire, brake, and lighting maintenance is budgeted and scheduled — not deferred until failure",
      ],
    },
  ],
  binderTabs: [
    {
      code: "LP-GRD-04",
      name: "Shop Guard",
      description: "One sub-section per CMV. Organized by VIN. Auditor-ready.",
      items: [
        "Unit identifier sheet: VIN, year, make, model, license plate, current odometer",
        "Current annual inspection report — inspector credentials, date, pass/fail determination",
        "Last 90 days of pre/post-trip inspection reports (DVIRs) — filed chronologically",
        "Open defect register — any reported defect not yet resolved with estimated timeline",
        "Repair orders — linked to DVIR defect reports, chronologically filed",
        "Tire and brake service records — date, mileage, service performed",
      ],
    },
    {
      code: "LP-SYS-01",
      name: "Fleet Registry",
      description: "Master equipment list. Shows FMCSA what units are under your authority.",
      items: [
        "Complete fleet list: all CMVs registered under your DOT number",
        "Current status of each unit: active, stored, leased-out, disposed",
        "Annual inspection expiration calendar — 12-month forward view by unit",
      ],
    },
  ],
};

export default function MaintenanceRecordsBrief() {
  return <KnowledgeCenterBriefTemplate data={DATA} />;
}
