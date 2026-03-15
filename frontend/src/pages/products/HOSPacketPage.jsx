import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function HOSPacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-003 | HOS & DISPATCH PACKET"
      title="HOS & Dispatch Packet"
      subtitle="FMCSA Part 395 Hours of Service Operating Standard (Document System)"
      price="$127"
      tagline="A complete Hours of Service and dispatch document system for FMCSA-regulated carriers — not an ELD instruction guide, a full HOS operating standard in document form."
      positioning={[
        "[Copy to be provided. Follows the standard architecture: what this is and what it is not — first two sentences draw the distinction from ELD vendor documentation and generic HOS guides.]",
        "[Second paragraph establishes depth: what an experienced safety manager builds for Part 395 compliance vs. what most carriers receive from their ELD provider.]",
      ]}
      whatsInside={[
        "Part 395 Regulatory Brief — the hours rules, exception categories, and ELD mandate requirements",
        "HOS Violation Checklist — the most common log violations and how to document corrections",
        "ELD Malfunction Response Sheet — the required paper log procedure and driver notification template",
        "Dispatch Log Template — BOL filing by trip number with driver HOS tracking",
        "Driver HOS Instruction Card — vehicle-ready reference for drivers on duty/off-duty rules",
        "Folder Structure — digital directory for HOS and dispatch records",
      ]}
      whoItsFor={[
        "New carriers building their first HOS compliance structure",
        "Owner-operators who need documentation beyond what their ELD provides",
        "Carriers who received an HOS violation in a roadside inspection or audit",
        "Dispatchers who need a structured log and filing system",
      ]}
      whatItReplaces={[
        "ELD vendor documentation that covers the device but not the compliance framework",
        "Generic HOS guides that don't address the documentation FMCSA actually reviews",
        "Paying a safety consultant to build dispatch documentation",
        "Reconstructing HOS records after receiving an audit notice",
      ]}
      nextStepText="The HOS & Dispatch Packet covers one of five compliance domains. The New Carrier Document System bundles all five with a 0–30–90 day implementation guide — the complete DIY operating standard for new authorities."
      nextStepHref="/standards/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    />
  );
}
