import KnowledgeCenterBriefTemplate from "../../components/KnowledgeCenterBriefTemplate";
import useSEO from "../../hooks/useSEO";

const DATA = {
  code: "LP-BRF-06",
  cfr: "49 CFR Parts 365, 390, 392",
  title: "Authority Reinstatement Brief",
  subtitle: "What Recovery Actually Requires",
  decisionHeadline: "Reinstatement is not a form. It is a documented proof that the condition that caused revocation no longer exists.",
  readTime: "8-minute brief",
  cta: {
    context: "If you've been through authority issues, you already know what the system costs when it's not installed correctly. Ground 0 is where the installation starts — six lessons, free.",
    primary: { text: "Start Ground 0 →", to: "/reach-diagnostic" },
    secondary: { text: "Request an Operator Readiness Call →", to: "/admission" },
  },
  executiveSummary: {
    intent: "This is what an owner must understand before assuming that authority reinstatement is simply a matter of filing paperwork and waiting.",
    cohortNote: "Carriers who have experienced authority action and are rebuilding their compliance infrastructure are eligible for a Readiness Call before LaunchPath Standard enrollment is considered.",
    points: [
      "Authority revocation does not suspend your DOT number — it ends your operating rights until you have demonstrated, in writing, that the condition causing revocation has been corrected. Filing the application is not the same as demonstrating correction.",
      "FMCSA maintains a record of every authority action against your DOT number. Carriers with prior revocations face higher scrutiny during the new entrant audit, even after reinstatement.",
      "The gap between revocation and reinstatement is not downtime — it is compounding damage. Broker credibility, insurance underwriting, and shipper relationships deteriorate faster than authority status recovers.",
    ],
  },
  leverage: {
    body: "Under 49 CFR Parts 365 and 390, FMCSA has authority to revoke, suspend, or deny operating authority for carriers who fail to maintain compliance across financial responsibility, safety fitness, or registration requirements. Reinstatement requires demonstrating that the specific condition causing revocation — whether an insurance lapse, audit failure, or registration deficiency — has been fully corrected. Carriers who attempt reinstatement without first correcting the underlying system failure will face a second revocation within months of resuming operations.",
    ownerDecisions: [
      "Corrective action vs. application filing — Have you identified and documented the root cause of the revocation before filing for reinstatement? Filing without correction wastes the reinstatement cycle and signals to FMCSA that the carrier does not understand what went wrong.",
      "System rebuild vs. paperwork patch — Is your reinstatement plan building the compliance system that failed, or filling out forms while the same conditions persist?",
      "Broker re-credentialing timeline vs. instant load acceptance — Do you understand that reinstatement of authority does not automatically restore your DAT/Truckstop credibility, shipper contracts, or broker relationships? Those require separate, deliberate recovery steps.",
      "New entrant period restart vs. continuation — Reinstatement may restart your new entrant audit clock. Are you prepared to pass the audit that triggered or accompanied your first revocation?",
    ],
  },
  riskGrid: [
    { domain: "Insurance Lapse (Primary Cause)", fineRange: "Authority revocation + filing fees", downtime: "Minimum 15–30 days to reinstate after corrective insurance filing", remediation: "$3,000–$8,000 in broker fees, FMCSA filing costs, and broker re-credentialing" },
    { domain: "Audit Failure Without Corrective Action", fineRange: "Authority revocation + possible civil penalty", downtime: "30–90 days to complete corrective action plan and obtain reinstatement", remediation: "$5,000–$20,000+ in compliance rebuild, consulting, and legal review" },
    { domain: "Registration Lapse (UCR, BOC-3, MCS-150)", fineRange: "$500–$10,000 per deficiency", downtime: "Authority suspended until each deficiency is corrected and verified by FMCSA", remediation: "$500–$2,000 in registration fees and processing; risk of additional scrutiny" },
    { domain: "Operating During Revocation", fineRange: "$10,000–$16,000 per occurrence", downtime: "Civil penalty + possible criminal referral for repeat violations", remediation: "Legal defense required — costs variable and potentially unlimited" },
  ],
  costComparison: {
    clean: "Building a compliant system before the first 18-month audit: 6–8 hours of setup + Standard enrollment. No revocation. No reinstatement. No compounding damage.",
    remediation: "Post-revocation reinstatement + compliance rebuild: $8,000–$30,000+ in filing fees, legal support, lost freight revenue, and broker re-credentialing. Timeline: 30–180 days minimum.",
  },
  maturityDomains: [
    {
      code: "LP-SYS-01",
      name: "Authority Protection — Reinstatement Context",
      items: [
        "Owner knows the specific regulatory section that triggered the revocation",
        "Root cause analysis is documented — not just the symptom, but the system failure that enabled it",
        "Corrective action is complete and documented before reinstatement application is filed",
        "FMCSA SAFER has been checked to confirm authority status before resuming any operations",
      ],
    },
    {
      code: "LP-SYS-02",
      name: "Insurance Continuity — Post-Reinstatement",
      items: [
        "New insurance policy is active and MCS-90 endorsement has been filed with FMCSA",
        "Broker has confirmed filing date and FMCSA receipt confirmation",
        "45-day pre-renewal alert is in place — the lapse that caused revocation cannot repeat",
      ],
    },
    {
      code: "LP-SYS-03",
      name: "Compliance Backbone — Rebuilt",
      items: [
        "The compliance domain that failed has been fully rebuilt — not patched",
        "Written policies and procedures are in place for every domain that was deficient",
        "A third-party compliance review has been completed before resuming operations (recommended)",
      ],
    },
    {
      code: "LP-SYS-04",
      name: "Cash-Flow Oxygen — Recovery Budget",
      items: [
        "Operating reserve accounts for reinstatement costs and delayed revenue during the gap",
        "Load pipeline is being rebuilt through appropriate broker re-credentialing process",
        "Insurance premium increase post-revocation has been modeled in the operating budget",
      ],
    },
  ],
  binderTabs: [
    {
      code: "LP-SYS-01",
      name: "Revocation Record",
      description: "Documentation of what happened and what was corrected. FMCSA may request this.",
      items: [
        "FMCSA revocation notice — original, with date and stated reason",
        "Root cause analysis — owner-written statement identifying the system failure",
        "Corrective action documentation — what was fixed, when, and by whom",
        "Reinstatement application confirmation — FMCSA receipt of filing",
        "Authority status confirmation — FMCSA SAFER printout post-reinstatement",
      ],
    },
    {
      code: "LP-SYS-02",
      name: "Insurance Reinstatement",
      description: "New insurance filing evidence. The original gap cannot recur.",
      items: [
        "New policy declarations page — effective dates, coverage amounts",
        "MCS-90 endorsement — filed with FMCSA, broker filing confirmation attached",
        "FMCSA SAFER insurance status screenshot — post-reinstatement",
        "Broker commitment letter — 45-day advance notice before any future cancellation",
      ],
    },
    {
      code: "LP-SYS-03",
      name: "Compliance Rebuild",
      description: "Documentation of every domain that was rebuilt post-revocation.",
      items: [
        "Written policies for all five compliance domains — current version, adopted date",
        "Driver qualification files rebuilt and verified — all drivers",
        "D&A program documents — consortium, DER, written policy",
        "HOS system enrollment confirmation — ELD vendor, all drivers",
        "Maintenance records — annual inspections current for all units",
      ],
    },
  ],
};

export default function UCRRegistrationBrief() {
  useSEO({
    title: "LP-BRF-06: Authority Reinstatement Brief | LaunchPath",
    description: "What recovery actually requires after authority revocation. Reinstatement brief for motor carriers under 49 CFR Parts 365, 390, 392.",
  });
  return <KnowledgeCenterBriefTemplate data={DATA} />;
}
