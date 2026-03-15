import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function InsurancePacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-005 | INSURANCE & AUTHORITY PACKET"
      title="Insurance & Authority Packet"
      subtitle="FMCSA Authority & Insurance Filing Operating Standard (Document System)"
      price="$127"
      tagline="A complete authority and insurance document system for FMCSA-regulated carriers — not a filing checklist, a full operating standard for keeping your authority active and your filings accurate."
      positioning={[
        "[Copy to be provided. Follows the standard architecture: what this is and what it is not — first two sentences draw the distinction from authority filing services and generic insurance checklists.]",
        "[Second paragraph establishes depth: what an experienced safety manager builds for MCS-150 accuracy, BOC-3 compliance, and insurance filing verification vs. what most new carriers receive from their process agent.]",
      ]}
      whatsInside={[
        "Authority & Insurance Regulatory Brief — MCS-150 requirements, BOC-3 obligations, and insurance filing accuracy",
        "MCS-150 Accuracy Checklist — every field that triggers a new entrant flag when incorrect",
        "Insurance Filing Verification Template — confirming your carrier name, USDOT number, and coverage match exactly",
        "BOC-3 Process Agent Documentation — the required filing and carrier copy",
        "Authority Monitoring Log — tracking your operating authority status and renewal dates",
        "Folder Structure — digital directory for authority and insurance files",
      ]}
      whoItsFor={[
        "New authorities who need to verify their MCS-150 is accurate before the monitoring period begins",
        "Carriers whose insurance filings don't match their registered carrier name exactly",
        "Owner-operators who need documentation of their BOC-3 and current insurance filings",
        "Carriers who received an authority or insurance finding in their new entrant audit",
      ]}
      whatItReplaces={[
        "Authority filing services that handle paperwork but don't build the documentation system",
        "Generic insurance checklists that cover coverage but not FMCSA filing accuracy",
        "Paying a process agent to explain what your BOC-3 actually requires",
        "Discovering an MCS-150 discrepancy during an audit",
      ]}
      nextStepText="The Insurance & Authority Packet covers one of five compliance domains. The New Carrier Document System bundles all five with a 0–30–90 day implementation guide — the complete DIY operating standard for new authorities."
      nextStepHref="/products/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    />
  );
}
