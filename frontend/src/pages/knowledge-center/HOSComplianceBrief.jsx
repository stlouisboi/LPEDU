import KnowledgeCenterBriefTemplate from "../../components/KnowledgeCenterBriefTemplate";

const DATA = {
  code: "LP-BRF-02",
  cfr: "49 CFR Part 395",
  title: "Hours of Service Brief",
  subtitle: "What Your Logs Actually Have to Prove",
  decisionHeadline: "A driver who drives tired is a liability. A carrier whose logs can't prove otherwise is a target.",
  readTime: "10-minute brief",
  cta: {
    context: "The HOS & ELD Packet gives you the forms, logs, and policies your operation needs — pre-built and audit-ready.",
    primary: { text: "Get the HOS & ELD Packet →", to: "/compliance-library" },
  },
  executiveSummary: {
    intent: "This is what an owner must understand before building a log management system that will survive an audit.",
    cohortNote: "HOS system installation — including ELD enrollment, log review, and supporting document retention — is covered in the LaunchPath Standard cohort.",
    points: [
      "49 CFR Part 395 governs every hour a regulated driver spends in a commercial vehicle. Non-compliance is detectable in ELD data, fuel receipts, and GPS — not just in the logs themselves.",
      "FMCSA can audit log records going back 6 months. A pattern of violations — even minor ones — triggers escalation, driver OOS orders, and civil penalties.",
      "The owner's job is not to know HOS regulations line-by-line. The owner's job is to build a system that generates compliant, retrievable records regardless of which driver is dispatching.",
    ],
  },
  leverage: {
    body: "Under 49 CFR Part 395, every regulated carrier is responsible for ensuring accurate records of duty status for all covered drivers. The ELD mandate eliminated most paper-log defenses — the data is now objective. Auditors cross-reference log data against fuel receipts, toll records, and GPS coordinates. A driver who moves the truck while showing 'off-duty' is a documented violation. A carrier whose drivers do this regularly is a carrier with a systemic compliance failure — not an individual driver problem.",
    ownerDecisions: [
      "ELD-enrolled vs. unverified drivers — Does every regulated driver in your fleet show up in your ELD system, or are there 'ghost' drivers dispatching on paper or shared profiles?",
      "Manager review vs. passive trust — Is someone reviewing HOS logs at least weekly, or do you only discover violations when a roadside officer finds them first?",
      "Supporting documents retained vs. discarded — Are fuel receipts, toll records, and dispatch confirmations being retained for 6 months, or are they disappearing with each pay cycle?",
      "Single ELD point-of-failure vs. redundant procedure — Does your operation have a malfunction procedure that every driver can execute when the device fails on the road?",
    ],
  },
  riskGrid: [
    { domain: "Exceeding Drive-Time Limits", fineRange: "$1,000–$16,000 per violation", downtime: "Driver OOS until reset requirement met; loads delayed or reassigned", remediation: "$3,000–$8,000 in compliance overhaul and potential shipper penalties" },
    { domain: "Missing or Incomplete Logs", fineRange: "$1,000–$10,000 per record period", downtime: "Audit finding; possible pattern-of-violation escalation", remediation: "$2,500–$5,000 in log reconstruction and compliance review" },
    { domain: "False or Manipulated Logs", fineRange: "$5,000–$16,000+ per occurrence", downtime: "Driver disqualification; carrier rating downgrade; possible fraud referral", remediation: "$10,000–$25,000+ in legal defense and rating recovery" },
    { domain: "ELD Malfunction Non-Compliance", fineRange: "$1,000–$10,000", downtime: "Driver OOS if no paper log backup at roadside inspection", remediation: "$1,500–$4,000 to implement proper malfunction procedures" },
    { domain: "No 30-Min Break Violations", fineRange: "$1,000–$5,000 per occurrence", downtime: "Driver OOS at inspection; load disruption", remediation: "$1,000–$3,000 in driver retraining and policy reinforcement" },
  ],
  costComparison: {
    clean: "4–6 hours to enroll all drivers in ELD, establish a weekly log review process, and set up supporting document retention. Cost: ELD subscription + process setup. One-time.",
    remediation: "After an audit finding or OOS order: log reconstruction, driver retraining, and corrective action documentation. Cost: $5,000–$20,000+. Recurring risk.",
  },
  maturityDomains: [
    {
      code: "LP-GRD-03",
      name: "Log Guard — HOS System",
      items: [
        "Every regulated driver is enrolled in a compliant ELD system before first dispatch",
        "Manager reviews HOS logs at minimum weekly — anomalies are flagged and addressed",
        "Supporting documents (fuel, toll, dispatch receipts) are retained for 6 months minimum",
        "ELD malfunction procedure is documented — drivers have been trained on paper log backup",
      ],
    },
    {
      code: "LP-SYS-01",
      name: "Authority Protection — HOS Context",
      items: [
        "Carrier can identify which drivers are subject to Part 395 requirements",
        "Short-haul exemption applicability (100 air-mile radius) has been formally evaluated",
        "HOS policy is in writing and has been reviewed by all covered drivers",
      ],
    },
    {
      code: "LP-GRD-01",
      name: "Driver Guard — HOS Compliance",
      items: [
        "Driver is aware of their applicable HOS rule set (property-carrying, passenger, etc.)",
        "Driver has been trained on ELD device operation including malfunction procedures",
        "No pattern of HOS violations in the last 6 months of log records",
      ],
    },
    {
      code: "LP-SYS-04",
      name: "Cash-Flow Oxygen — HOS Risk",
      items: [
        "Operating budget accounts for potential HOS-related OOS delay costs",
        "Load commitments are structured to allow legally required rest periods",
        "Dispatch practices do not create implicit pressure to violate drive-time limits",
      ],
    },
  ],
  binderTabs: [
    {
      code: "LP-GRD-03",
      name: "Log Guard",
      description: "6-month accessible log archive. Cross-referenceable against supporting documents.",
      items: [
        "ELD vendor agreement and driver enrollment confirmation",
        "Last 6 months of HOS logs — organized by driver, accessible within 60 seconds",
        "Supporting documents: fuel receipts, toll records, dispatch confirmations retained by date",
        "ELD malfunction log and any paper backup records used during outages",
        "HOS violation log with corrective actions documented",
      ],
    },
    {
      code: "LP-SYS-01",
      name: "HOS Policy",
      description: "Written policy and driver acknowledgment on file.",
      items: [
        "Written HOS policy signed by all covered drivers",
        "Exemption evaluation documentation (short-haul, construction, etc. if applicable)",
        "Training records for ELD device and HOS rules",
      ],
    },
    {
      code: "LP-GRD-01",
      name: "Driver Compliance Records",
      description: "Per-driver HOS history and violation tracking.",
      items: [
        "Individual driver log review summaries — weekly manager sign-off",
        "Any OOS orders related to HOS — copies and resolution documentation",
        "Pattern-of-violation correspondence from FMCSA (if any)",
      ],
    },
  ],
};

export default function HOSComplianceBrief() {
  return <KnowledgeCenterBriefTemplate data={DATA} />;
}
