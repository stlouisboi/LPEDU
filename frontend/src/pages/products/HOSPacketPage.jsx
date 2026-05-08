import ProductPageTemplate from "../../components/ProductPageTemplate";

const IMG = "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/546de6eb252c5e998f89c6565bc7193a3c0c002bff62910ac9e730b31f8d82dc.png";

export default function HOSPacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-003 | HOS & ELD PACKET"
      title="HOS & ELD Packet"
      subtitle="FMCSA Part 395 Hours of Service Operating Standard (Document System)"
      seoTitle="FMCSA Hours of Service Records Template for Motor Carriers | LaunchPath EDU"
      seoDescription="Build audit-ready HOS records for your operation. ELD documentation, driver log architecture, dispatch records, and violation tracking — everything FMCSA checks under 49 CFR Part 395. One-time $119."
      price="$119"
      sku="LP-PKT-003"
      image="/images/products/domain4-hos-dispatch.webp"
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
      nextStepText="Domain 4 is installed. Domain 5 is Vehicle Maintenance — the unit file structure, PM schedules, and defect tracking documentation that Part 396 requires."
      nextStepHref="/standards/maintenance-packet"
      nextStepLabel="Domain 5 · Vehicle Maintenance — $119 →"
      domainStep={4}
    />
  );
}
