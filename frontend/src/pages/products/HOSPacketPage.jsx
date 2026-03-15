import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function HOSPacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-003 | HOS & DISPATCH PACKET"
      title="HOS & Dispatch Compliance Packet"
      subtitle="FMCSA Part 395 Hours of Service Operating Standard (Document System)"
      price="$127"
      tagline="The document system for Hours of Service compliance and dispatch standards under 49 CFR Part 395."
      positioning={[
        "This is not an ELD provider or dispatch software. It is a document system built to install the operational standards, dispatch discipline, and recordkeeping framework that FMCSA expects when they review your Hours of Service compliance in a safety audit.",
        "Having an ELD in the truck is not the same as having a compliant HOS system. This packet closes the gap between the device and the documented standard.",
      ]}
      whatsInside={[
        "Hours of Service Rules Brief — Property Carrier Focus: A plain-language explanation of the core HOS limits for property carriers — 11-hour driving limit, 14-hour on-duty window, 30-minute rest break, 60/70-hour weekly cycle, and 10-hour off-duty requirement. Covers short-haul exemption conditions, required supporting documents, and the automatic failure items that will end operating authority. Citations current as of publication.",
        "Dispatch Standards Checklist — What Not to Ask a Driver to Do: Every carrier dispatch obligation under 49 CFR 392.6 and 395.3. Pre-dispatch hour verification, load scheduling standards, prohibited dispatch instructions, and post-delivery load file documentation. The carrier is responsible for dispatch decisions — not just the driver.",
        "ELD Usage Checklist — Required Data, Edits, Annotations: Device registration verification, required data fields, annotation procedures, edit protocols, and malfunction reporting requirements. Covers carrier obligations under 49 CFR 395.22 and 395.26 — including what happens when the ELD malfunctions and what the driver and carrier are each required to do.",
        "Daily and Weekly Compliance Review Checklist: A repeatable review process for owner-operators and small fleet managers. Daily post-shift review steps (5–10 minutes) and a weekly compliance review (20–30 minutes) that catches HOS drift before it becomes an audit finding.",
      ]}
      whoItsFor={[
        "Owner-operators and small fleets (1–5 trucks) operating under 49 CFR Part 395",
        "Carriers setting up ELD compliance infrastructure for the first time",
        "Dispatch operations that have not formalized what they can and cannot ask a driver to do",
        "Carriers whose HOS records were flagged or incomplete during a New Entrant Safety Audit",
      ]}
      whatItReplaces={[
        "Discovering your ELD device is not on the FMCSA registered list during an audit",
        "Dispatching loads without a process to verify available driver hours",
        "Having no written record of what your dispatch operation is and is not permitted to do",
        "Realizing your supporting documents do not match your ELD data after an investigator points it out",
      ]}
      nextStepText="The HOS & Dispatch Compliance Packet covers one of five compliance domains. The New Carrier Document System bundles all five with a 0–30–90 day implementation guide — the complete DIY operating standard for new authorities."
      nextStepHref="/standards/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    />
  );
}
