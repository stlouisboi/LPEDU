import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function MaintenancePacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-004 | MAINTENANCE & UNIT FILE PACKET"
      title="Maintenance & Unit File Packet"
      subtitle="FMCSA Part 396 Vehicle Maintenance Operating Standard (Document System)"
      price="$127"
      tagline="The document system for vehicle maintenance compliance and equipment records under 49 CFR Part 396."
      positioning={[
        "This is not a shop management platform. It is a document system built to install the unit file structure, PM schedule, defect tracking framework, and inspection documentation that FMCSA expects when they review your vehicle maintenance program in a safety audit.",
        "A maintained truck with no records is the same as an unmaintained truck to an FMCSA investigator. The record is the proof. This packet installs the record system.",
      ]}
      whatsInside={[
        "Part 396 Maintenance & Inspection Brief: A plain-language explanation of what Part 396 requires — annual inspection obligations, qualified inspector standards, DVIR requirements, and the systematic PM program requirement. Covers automatic failure items and the retention periods for every maintenance record type. Citations current as of publication.",
        "Unit File Template — What Belongs in Each Truck's File: A complete document inventory for every unit in your fleet, organized by VIN. Annual inspections, PM schedules, DVIR history, repair orders, registration, title, and lease documents — with retention periods and CFR citations for each item.",
        "Preventive Maintenance Schedule Outline and Inspection Checklist: A fillable PM schedule template covering every major maintenance interval — brakes, tires, wheel ends, steering, suspension, lights, engine, 5th wheel, and annual DOT inspection. One schedule per unit, filed in the unit's folder. Includes a pre-trip inspection checklist covering all Appendix G minimum inspection standards.",
        "Defect and Repair Tracking Sheet: A closed-loop defect tracking log that runs from DVIR defect notation through repair certification. Every defect reported must be tracked to resolution before the next dispatch. Includes the required carrier certification language for each repair entry.",
      ]}
      whoItsFor={[
        "Owner-operators and small fleets (1–5 trucks) who have not built a formal unit file system",
        "Carriers setting up vehicle maintenance documentation before their first load or audit",
        "Carriers whose maintenance records were flagged or missing during a New Entrant Safety Audit",
        "Any carrier who relies on verbal maintenance history rather than documented records",
      ]}
      whatItReplaces={[
        "Paying a consultant to tell you what documents belong in a truck file",
        "Building a unit file from scratch when an audit notice arrives",
        "Discovering an open DVIR defect with no repair record when an investigator asks for your maintenance history",
        "Operating units without a current annual inspection on file",
      ]}
      nextStepText="The Maintenance & Unit File Packet covers one of five compliance domains. The New Carrier Document System bundles all five with a 0–30–90 day implementation guide — the complete DIY operating standard for new authorities."
      nextStepHref="/standards/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    />
  );
}
