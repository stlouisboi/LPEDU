import KnowledgeCenterBriefTemplate from "../../components/KnowledgeCenterBriefTemplate";

const DATA = {
  code: "LP-BRF-03",
  cfr: "49 CFR Parts 382 & 40",
  title: "Drug & Alcohol Program Brief",
  subtitle: "What a Real Compliance Program Actually Proves",
  decisionHeadline: "A carrier without a D&A program does not have a compliance gap. It has an enforcement target.",
  readTime: "9-minute brief",
  cta: {
    context: "Your D&A program must be active before your first dispatch. The D&A Program Packet has everything you need to install it correctly.",
    primary: { text: "Get the D&A Program Packet →", to: "/compliance-library" },
  },
  executiveSummary: {
    intent: "This is what an owner must understand before deciding whether their D&A program will survive an audit — or a court.",
    cohortNote: "D&A program installation, including Clearinghouse registration, consortium enrollment, and written policy adoption, is completed in the LaunchPath Standard cohort.",
    points: [
      "49 CFR Part 382 requires every carrier operating CDL vehicles in interstate commerce to have a formal drug and alcohol testing program. This is not optional and it is not waivable.",
      "The FMCSA Drug & Alcohol Clearinghouse is a federal database that every carrier must register in before querying, hiring, or retaining a CDL driver. Skipping the query is a documented violation even if the driver is clean.",
      "Auditors look for the program structure — policy, consortium, DER, query records — not just whether tests were run. A carrier with test results but no written policy has documented evidence of partial compliance, which is treated as non-compliance.",
    ],
  },
  leverage: {
    body: "Under 49 CFR Part 382, every employer of CDL drivers in safety-sensitive functions must implement a written D&A program compliant with Part 40 laboratory and collection procedures. The Clearinghouse — effective January 2020 — adds a federal tracking layer: pre-employment full queries, annual limited queries, and documentation of driver consent are all enforceable requirements. FMCSA can request your program documentation during a new entrant audit, an investigation, or a post-accident review. If you cannot produce it, you do not have it.",
    ownerDecisions: [
      "In-house DER vs. consortium-managed — Who in your company is the Designated Employer Representative? Is that person trained, documented, and reachable when a result comes in at 2 AM?",
      "Clearinghouse-enrolled vs. uninformed — Have you registered your company in the Clearinghouse? Have you run a full query on every CDL driver you employ? Annual limited queries on returning drivers?",
      "Written policy vs. verbal policy — Does your D&A policy exist in writing, signed by each covered driver? A verbal policy is not a policy under Part 382.",
      "DOT-compliant testing vs. general employment screen — Is your consortium running a Part 40 panel through a certified lab and MRO? A general employer drug screen does not satisfy the DOT requirement.",
    ],
  },
  riskGrid: [
    { domain: "No D&A Program at All", fineRange: "$1,000–$16,000 per audit finding", downtime: "Immediate OOS order for any CDL driver dispatched; operations halted", remediation: "$2,500–$6,000 to build a compliant program retroactively" },
    { domain: "No Pre-Employment Test or Clearinghouse Query", fineRange: "$1,000–$16,000 per driver", downtime: "Driver must be removed from service until test and query are completed", remediation: "$1,500–$4,000 per affected driver in documentation reconstruction" },
    { domain: "No Written Policy or DER", fineRange: "$5,000–$11,000", downtime: "Audit failure; corrective action plan required within 45–90 days", remediation: "$2,000–$5,000 in compliance consulting and retroactive documentation" },
    { domain: "No Random Testing Pool", fineRange: "$1,000–$11,000 per year not enrolled", downtime: "Cannot document compliance for the period; audit finding", remediation: "$1,500–$3,000 to enroll retroactively and document for current period" },
    { domain: "Using a Driver with Known Positive Result", fineRange: "$10,000–$16,000+", downtime: "Driver disqualification; potential FMCSA investigation of carrier", remediation: "Legal defense + SAP process + potential authority action — cost variable" },
  ],
  costComparison: {
    clean: "3–5 hours to register in Clearinghouse, contract a consortium, adopt a written policy, and run pre-employment tests. Cost: consortium fee + test costs. One-time setup.",
    remediation: "After a violation finding: retroactive documentation, legal review, and corrective action plan filing. Cost: $5,000–$15,000+ depending on severity. Ongoing exposure.",
  },
  maturityDomains: [
    {
      code: "LP-GRD-02",
      name: "Drug Guard — Testing Program",
      items: [
        "Company is registered in the FMCSA Drug & Alcohol Clearinghouse",
        "Consortium is contracted — DOT-compliant panel, certified lab, MRO, and collection sites",
        "Pre-employment drug test completed before every CDL driver's first safety-sensitive dispatch",
        "Full Clearinghouse query run at hire; annual limited queries run for all employed CDL drivers",
        "Random testing selections are being made through the certified consortium on schedule",
      ],
    },
    {
      code: "LP-SYS-03",
      name: "Compliance Backbone — D&A Policy",
      items: [
        "Written D&A policy exists and has been reviewed by legal or qualified compliance professional",
        "Policy has been acknowledged in writing by every covered driver",
        "DER (Designated Employer Representative) is named in writing with documented contact information",
        "Supervisor reasonable-suspicion training is complete and documented",
      ],
    },
    {
      code: "LP-GRD-01",
      name: "Driver Guard — D&A Records",
      items: [
        "D&A test results are retained in driver qualification files — minimum 5 years",
        "Clearinghouse query consent documentation is on file for each driver",
        "Return-to-duty and follow-up testing records on file for any driver with prior violations",
      ],
    },
  ],
  binderTabs: [
    {
      code: "LP-GRD-02",
      name: "Drug Guard",
      description: "Complete D&A program documentation. Policy, consortium, and all test records.",
      items: [
        "Written D&A policy — version-controlled, current date, signed by owner and all covered drivers",
        "Consortium contract — current agreement, test types enumerated, effective dates",
        "DER designation letter — named individual, role, contact information",
        "Clearinghouse registration confirmation",
        "Pre-employment test results for each CDL driver",
        "Clearinghouse full query at hire and annual limited query records",
        "Random selection records for current and prior year",
        "Supervisor reasonable-suspicion training certificate (if applicable)",
      ],
    },
    {
      code: "LP-SYS-03",
      name: "Compliance Backbone",
      description: "Policy infrastructure. The foundation that makes the program legally defensible.",
      items: [
        "D&A policy acknowledgment log — driver name, date signed, policy version",
        "Any return-to-duty or follow-up testing records",
        "MRO contact information and verification method",
        "Collection site locations used by your drivers",
      ],
    },
  ],
};

export default function DrugAlcoholBrief() {
  return <KnowledgeCenterBriefTemplate data={DATA} />;
}
