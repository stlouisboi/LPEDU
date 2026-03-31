import KnowledgeCenterBriefTemplate from "../../components/KnowledgeCenterBriefTemplate";

const DATA = {
  code: "LP-BRF-05",
  cfr: "49 CFR Part 387",
  title: "Insurance Continuity Brief",
  subtitle: "What Your Filings Actually Have to Prove",
  decisionHeadline: "Your insurance card doesn't protect your authority. Your FMCSA insurance filing does.",
  readTime: "8-minute brief",
  cta: {
    context: "Insurance lapses are the most common cause of authority suspension. Find out if your filings are current before a lapse finds you first.",
    primary: { text: "Run the Insurance Continuity Check →", to: "/reach-diagnostic" },
  },
  executiveSummary: {
    intent: "This is what an owner must understand before assuming their insurance agent is managing their FMCSA compliance.",
    cohortNote: "Insurance continuity architecture — including required filings, continuity planning, and coverage verification — is structured in the LaunchPath Standard cohort.",
    points: [
      "49 CFR Part 387 requires motor carriers to maintain minimum levels of financial responsibility filed directly with FMCSA — not just held with an insurer. The filing is what protects your operating authority.",
      "A lapse in your FMCSA insurance filing — even for 24 hours — can trigger automatic authority revocation. Insurance that exists in your file cabinet is not the same as insurance that is filed with FMCSA.",
      "Carriers who lose authority due to insurance lapses do not just lose one day of revenue. They lose their authority, their MC number, their shipper relationships, and their broker credibility — all of which take months to recover.",
    ],
  },
  leverage: {
    body: "Under 49 CFR Part 387, motor carriers for hire must maintain minimum levels of financial responsibility — $750,000 for property, more for hazmat — and file the MCS-90 endorsement with FMCSA. The carrier's insurer is required to notify FMCSA 30 days before canceling the policy, but carriers who wait for their insurer to manage this relationship are operating on borrowed time. Insurers cancel for non-payment, underwriting changes, and policy restructuring — and FMCSA does not negotiate reinstatement timelines.",
    ownerDecisions: [
      "FMCSA-filed vs. agent-managed — Does your insurance agent confirm the MCS-90 filing with FMCSA after each renewal, or do you assume they handle it? Assumptions end operating authority.",
      "Continuity plan vs. no coverage gap plan — What happens when your policy renews? Is your broker bound to notify you of cancellation risk 45+ days in advance, or do you find out when the revocation notice arrives?",
      "Coverage verification vs. paper coverage — Have you verified your coverage status in FMCSA SAFER in the last 30 days? Or are you trusting a card that may not reflect current filing status?",
      "Required minimums vs. operational exposure — Are your coverage amounts sufficient for the cargo types you carry? A gap between the cargo value and your policy limit is a personal liability, not just a regulatory risk.",
    ],
  },
  riskGrid: [
    { domain: "Insurance Filing Lapse", fineRange: "Authority revocation (immediate)", downtime: "Operations halted until authority is reinstated — days to months", remediation: "$3,000–$10,000+ in authority reinstatement fees, legal support, and broker re-credentialing" },
    { domain: "Coverage Below Part 387 Minimums", fineRange: "$10,000+ per occurrence", downtime: "Shutdown order if discovered during audit or post-accident review", remediation: "Policy restructuring + potential civil liability exposure from underinsured incidents" },
    { domain: "No MCS-90 Endorsement on File", fineRange: "$5,000–$10,000", downtime: "Authority at risk; FMCSA may revoke pending corrective filing", remediation: "$1,000–$3,000 to obtain endorsement and file retroactively with agent coordination" },
    { domain: "Post-Accident Coverage Dispute", fineRange: "Unlimited personal liability potential", downtime: "Operations may continue but legal/financial exposure is immediate", remediation: "$25,000–$250,000+ in legal defense costs if coverage is disputed" },
  ],
  costComparison: {
    clean: "2–4 hours to verify FMCSA filing status, confirm MCS-90 endorsement, set renewal reminders, and establish a 45-day pre-renewal checklist. Cost: process design time only.",
    remediation: "After an authority revocation due to insurance lapse: new application, reinstatement fees, broker re-credentialing, load disruptions. Cost: $5,000–$15,000+ and months of downtime.",
  },
  maturityDomains: [
    {
      code: "LP-SYS-02",
      name: "Insurance Continuity",
      items: [
        "Insurance filing status has been verified in FMCSA SAFER within the last 30 days",
        "MCS-90 endorsement is on file with FMCSA and matches current policy terms",
        "Coverage amounts meet or exceed 49 CFR Part 387 minimums for all cargo types carried",
        "Policy renewal calendar includes 45-day advance alert before expiration",
        "Insurance broker has confirmed FMCSA filing procedure for each renewal cycle",
      ],
    },
    {
      code: "LP-SYS-01",
      name: "Authority Protection — Insurance Context",
      items: [
        "Operating authority is listed as active in FMCSA SAFER — verified directly, not assumed",
        "Carrier understands the difference between holding insurance and having insurance filed with FMCSA",
        "A contingency plan exists for immediate coverage replacement if current insurer issues cancellation notice",
      ],
    },
    {
      code: "LP-SYS-04",
      name: "Cash-Flow Oxygen — Insurance Budget",
      items: [
        "Annual premium is in the operating budget — not treated as a surprise renewal cost",
        "Coverage increases for new equipment or cargo types are budgeted before the load is accepted",
        "A minimum 60-day cash reserve exists to bridge an insurance disruption without losing equipment",
      ],
    },
  ],
  binderTabs: [
    {
      code: "LP-SYS-02",
      name: "Insurance Continuity",
      description: "Current coverage documentation. FMCSA filing status verifiable within 60 seconds.",
      items: [
        "Insurance declarations page — current policy, effective dates, coverage amounts",
        "MCS-90 endorsement — attached to policy, FMCSA filing confirmation",
        "Broker confirmation letter — most recent renewal cycle, filing date",
        "FMCSA SAFER screenshot — insurance status, date verified",
        "Renewal calendar — next expiration date, 45-day pre-renewal trigger noted",
        "Cargo and physical damage policy (if separate from liability)",
      ],
    },
    {
      code: "LP-SYS-01",
      name: "Authority Status",
      description: "Operating authority confirmation. MC and DOT status cross-referenced with insurance.",
      items: [
        "FMCSA SAFER printout showing active authority status",
        "MC number, DOT number, and authority grant date",
        "Insurance filing history — all filings associated with your MC number",
      ],
    },
  ],
};

export default function InsuranceContinuityBrief() {
  return <KnowledgeCenterBriefTemplate data={DATA} />;
}
