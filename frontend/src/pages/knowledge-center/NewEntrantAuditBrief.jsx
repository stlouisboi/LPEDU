import KnowledgeCenterBriefTemplate from "../../components/KnowledgeCenterBriefTemplate";
import useSEO from "../../hooks/useSEO";

const DATA = {
  code: "LP-BRF-01",
  cfr: "49 CFR Part 385, Subpart D",
  title: "New Entrant Safety Audit Brief",
  subtitle: "What Your Compliance Files Actually Have to Prove",
  decisionHeadline: "How you design your first 30 days decides whether a $25,000 audit bill is even possible.",
  readTime: "12-minute brief",
  cta: {
    context: "Before your audit window opens, find out where you stand. The Compliance Gap Assessment tells you which of the five audit domains are installed and which are exposed.",
    primary: { text: "Take the Compliance Gap Assessment →", to: "/reach-diagnostic" },
  },
  executiveSummary: {
    intent: "This is what an owner must understand before deciding how to build their compliance system.",
    cohortNote: "System installation happens in sequence through the LaunchPath Standard cohort. Admission requires an Operator Readiness Call.",
    points: [
      "FMCSA conducts a mandatory new entrant safety audit within 9–18 months of authority issuance. Missing the audit or failing without a corrective action plan triggers authority revocation.",
      "The audit examines five compliance domains simultaneously: Driver Qualification, Drug & Alcohol, Hours of Service, Vehicle Maintenance, and Financial Responsibility. One critical failure is sufficient to fail the audit.",
      "Carriers who survive are not the most compliant — they are the most organized. The auditor cannot see what you have. They can only see what you can produce.",
    ],
  },
  leverage: {
    body: "Under 49 CFR Part 385, Subpart D, FMCSA has statutory authority to audit any new entrant carrier within 12 months of beginning operations. The audit is not announced far in advance — you may receive 30 days' notice or less. The five audit domains map directly to the LaunchPath Standard. A carrier with an installed system can pass this audit with an hour of preparation. A carrier without one is building from scratch during the audit window — at triple the cost.",
    ownerDecisions: [
      "Centralized vs. scattered records — Will your compliance files live in one auditable binder, or scattered across email threads, vendor portals, insurance agent desks, and glove boxes?",
      "Proactive installation vs. reactive remediation — Will you build the system before the audit notice arrives, or rebuild it under pressure after — at 3–5× the cost?",
      "Single-point-of-failure admin vs. owner-visible system — Can you hand an auditor the binder yourself in under 60 seconds, or does it require finding someone else first?",
      "Standard compliance vs. compliance theater — Does your paperwork show an installed operating system, or just good intentions and partial documentation?",
    ],
  },
  riskGrid: [
    { domain: "No D&A Testing Program", fineRange: "$1,000–$16,000 per violation", downtime: "Immediate driver OOS, dispatch halted until remediated", remediation: "$2,500–$6,000 to build compliant program from scratch" },
    { domain: "Driver Qualification Failures", fineRange: "$1,000–$16,000 per driver", downtime: "Failed audit; possible authority revocation if uncorrected", remediation: "$3,000–$8,000 in retroactive documentation and corrective filings" },
    { domain: "Operating Without Min. Insurance", fineRange: "$10,000+ per occurrence", downtime: "Immediate shutdown order; loads stranded", remediation: "Authority revocation + new application required" },
    { domain: "HOS Violations", fineRange: "$1,000–$16,000 per violation", downtime: "Driver OOS orders; load delays; shipper relationship damage", remediation: "$5,000–$15,000 in compliance overhaul and potential back-pay" },
    { domain: "Maintenance Record Gaps", fineRange: "$500–$16,000 per unit", downtime: "Unit placed OOS at next roadside inspection", remediation: "Variable by unit condition; repair backlog + documentation reconstruction" },
  ],
  costComparison: {
    clean: "6–8 hours to build the system before the audit window opens. Cost: preparation time + Standard enrollment. Predictable. One-time.",
    remediation: "2–4 weeks of disrupted operations + legal fees + corrective action plan documentation. Cost: $10,000–$25,000+. Unpredictable. Ongoing.",
  },
  maturityDomains: [
    {
      code: "LP-SYS-01",
      name: "Authority Protection",
      items: [
        "Owner can verify active authority status in FMCSA SAFER within 60 seconds",
        "All authority registrations (MC, DOT, UCR, BOC-3) are current and on file",
        "Expiration tracking system is active and alerting before deadlines",
        "MCS-150 biennial update has been filed on schedule",
      ],
    },
    {
      code: "LP-SYS-02",
      name: "Insurance Continuity",
      items: [
        "Current insurance declarations on file and linked to active operating authority",
        "MCS-90 endorsement present where required by cargo type",
        "Coverage amounts meet 49 CFR Part 387 minimums for current operations",
        "Insurance continuity plan exists for renewal periods and coverage gaps",
      ],
    },
    {
      code: "LP-SYS-03",
      name: "Compliance Backbone",
      items: [
        "Written D&A policy exists and has been acknowledged by all covered drivers",
        "Pre-employment drug test and Clearinghouse query completed for every CDL hire",
        "Random testing pool enrollment is active through a DOT-compliant consortium",
        "Annual limited Clearinghouse queries have been completed for all employed CDL drivers",
      ],
    },
    {
      code: "LP-SYS-04",
      name: "Cash-Flow Oxygen",
      items: [
        "Operating reserve covers minimum 60 days of fixed costs without freight revenue",
        "Revenue is not dependent on a single broker, load type, or freight relationship",
        "Regulatory fine and corrective-action costs have been modeled in the operating budget",
      ],
    },
    {
      code: "LP-GRD-01",
      name: "Driver Guard",
      items: [
        "Driver qualification file is complete for each active driver",
        "MVR pulled at hire and annually — results reviewed and retained",
        "Medical certificates are current with expiration dates tracked",
        "CDL validity has been verified and is being monitored",
      ],
    },
    {
      code: "LP-GRD-02",
      name: "Drug Guard",
      items: [
        "Consortium enrolled, contract signed, and test types confirmed",
        "Pre-employment test completed before each CDL driver's first dispatch",
        "Random testing selections are handled through the certified consortium",
        "DER (Designated Employer Representative) named and documented in writing",
      ],
    },
    {
      code: "LP-GRD-03",
      name: "Log Guard",
      items: [
        "All regulated drivers are enrolled in a compliant ELD system",
        "HOS review process exists — at minimum, weekly manager review of logs",
        "Supporting documents are retained (fuel, tolls, dispatch, receipts — 6 months)",
        "ELD malfunction procedure is documented and drivers have been trained on it",
      ],
    },
    {
      code: "LP-GRD-04",
      name: "Shop Guard",
      items: [
        "All CMVs have a current annual inspection on file (within 12 months)",
        "Pre/post-trip inspection reports completed and retained for minimum 90 days",
        "Defect repair documentation links each repair order to the reported defect",
        "DVIR system is in use and accessible to all drivers before dispatch",
      ],
    },
  ],
  binderTabs: [
    {
      code: "LP-SYS-01",
      name: "Authority Protection",
      description: "Active authority documentation. Owner can verify status within 60 seconds.",
      items: [
        "MC number and DOT number — printed and accessible without a computer login",
        "UCR registration confirmation for current year",
        "BOC-3 filing acknowledgment from process agent",
        "MCS-150 most recent filing with FMCSA confirmation",
        "Insurance policy declarations with active effective dates",
      ],
    },
    {
      code: "LP-SYS-02",
      name: "Insurance Continuity",
      description: "Financial responsibility documentation. Coverage must be verifiable in real time.",
      items: [
        "Insurance declarations showing current coverage amounts",
        "MCS-90 endorsement (where required by cargo type)",
        "Broker certificate of insurance (if broker-required)",
        "Cargo and physical damage policy confirmation",
        "Renewal calendar with 60-day advance alert",
      ],
    },
    {
      code: "LP-GRD-01",
      name: "Driver Guard",
      description: "Driver qualification file for each active driver. One tab per driver.",
      items: [
        "CDL copy — front and back, confirmed valid",
        "Medical examiner's certificate — current, expiration date flagged",
        "MVR from hire date and most recent annual pull",
        "Pre-employment drug test result from certified lab",
        "FMCSA Clearinghouse full query confirmation (hire) and annual limited queries",
        "Signed driver's certification of prior violations (49 CFR § 391.27)",
      ],
    },
    {
      code: "LP-GRD-02",
      name: "Drug Guard",
      description: "D&A program documentation. Policy, consortium, and testing records.",
      items: [
        "Written D&A policy — signed acknowledgment from each covered driver",
        "Consortium agreement — current contract, test types confirmed",
        "Random testing selection records for current year",
        "DER designation letter — named individual, contact information",
        "Clearinghouse registration confirmation",
      ],
    },
    {
      code: "LP-GRD-03",
      name: "Log Guard",
      description: "HOS system and log records. Must be retrievable within 60 seconds.",
      items: [
        "ELD vendor agreement — system enrolled, drivers assigned",
        "Last 6 months of HOS logs accessible and organized by driver",
        "Supporting documents retained: fuel, toll, and dispatch receipts",
        "ELD malfunction/malfunction procedure — documented and tested",
      ],
    },
    {
      code: "LP-GRD-04",
      name: "Shop Guard",
      description: "Maintenance and inspection records. One sub-tab per unit.",
      items: [
        "Current annual inspection report — date, inspector, VIN, pass/fail",
        "Last 90 days of pre/post-trip driver inspection reports (DVIRs)",
        "Repair orders linked to reported defects — chain of custody from defect to fix",
        "Tire and brake service records (auditors look for patterns of deferred maintenance)",
      ],
    },
  ],
};

export default function NewEntrantAuditBrief() {
  useSEO({
    title: "LP-BRF-01: New Entrant Safety Audit Brief | LaunchPath",
    description: "What FMCSA will check in your first 18 months and how to pass on the first attempt. Mandatory compliance system audit brief for new motor carriers.",
  });
  return <KnowledgeCenterBriefTemplate data={DATA} />;
}
