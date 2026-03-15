import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function MaintenancePacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-004 | MAINTENANCE & UNIT FILE PACKET"
      title="Maintenance & Unit File Packet"
      subtitle="FMCSA Part 396 Vehicle Maintenance Operating Standard (Document System)"
      price="$127"
      tagline="A complete vehicle maintenance and unit file document system for FMCSA-regulated carriers — not an inspection log, a full maintenance operating standard in document form."
      positioning={[
        "[Copy to be provided. Follows the standard architecture: what this is and what it is not — first two sentences draw the distinction from generic maintenance logs and annual inspection checklists.]",
        "[Second paragraph establishes depth: what an experienced safety manager builds per VIN for Part 396 compliance vs. what most carriers keep in a glove compartment.]",
      ]}
      whatsInside={[
        "Part 396 Regulatory Brief — the inspection, repair, and maintenance record-keeping requirements by VIN",
        "Unit File Template — the required document elements for every vehicle in the fleet",
        "Annual Inspection Checklist — the FMCSA-required elements and third-party inspection documentation",
        "Preventative Maintenance (PM) Schedule — recurring maintenance log by VIN",
        "No-Activity Log Template — documentation for periods with no maintenance events",
        "Folder Structure — digital directory organized by VIN for audit-ready retrieval",
      ]}
      whoItsFor={[
        "New carriers building their first unit file system",
        "Owner-operators who need a documented maintenance history per vehicle",
        "Carriers who received a maintenance or inspection finding in an audit",
        "Fleets scaling from 1 to 5+ trucks who need a system that grows without restructuring",
      ]}
      whatItReplaces={[
        "Paper maintenance logs that don't meet FMCSA's record-keeping requirements",
        "Generic vehicle checklists that cover inspection but not the full unit file standard",
        "Paying a safety consultant to build what this packet contains",
        "Scrambling to locate vehicle records during a roadside inspection or audit",
      ]}
      nextStepText="The Maintenance & Unit File Packet covers one of five compliance domains. The New Carrier Document System bundles all five with a 0–30–90 day implementation guide — the complete DIY operating standard for new authorities."
      nextStepHref="/standards/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    />
  );
}
