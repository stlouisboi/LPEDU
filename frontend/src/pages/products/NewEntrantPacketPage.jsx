import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function NewEntrantPacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-001 | NEW ENTRANT PACKET"
      title="New Entrant Packet"
      subtitle="FMCSA New-Authority Operating Standard (Document System)"
      price="$97"
      tagline="A complete new-authority document system for FMCSA new entrants — not an audit kit, a full operating standard in paper form."
      positioning={[
        "This is not an 'audit folder' or a generic new-entrant download. It is a focused document system for new authorities: a complete new-entrant operating standard in document form that a carrier can install without a consultant.",
        "Most $150–$550 DIY audit kits stop at folders and basic instructions. This packet goes further. It gives you the structure, briefs, and checklists that an experienced safety manager would build for a one-to-three-truck carrier trying to keep its authority out of trouble in the first 12–18 months.",
      ]}
      whatsInside={[
        "New Entrant Regulatory Brief — what the 18-month monitoring period actually measures and when your Administrative Anniversary begins",
        "Driver Qualification Checklist — every required file element for owner-operators and hired drivers",
        "New Entrant Audit Preparation Checklist — mapped to FMCSA's 49 documented failure patterns",
        "Violation Response Templates — written responses for the most common new entrant findings",
        "Folder Structure — digital directory labeled to FMCSA document categories",
      ]}
      whoItsFor={[
        "New motor carrier authorities in the first 18 months of operation",
        "Owner-operators building their first compliant DQ file",
        "Carriers who received a warning letter and need a structured response",
        "Operators who want to understand the audit framework before an investigator explains it to them",
      ]}
      whatItReplaces={[
        "Compliance consultants charging $150–$300/hour to build what this packet contains",
        "Generic audit prep kits that cover folders but not operating standards",
        "Scrambling to locate documents after receiving an audit notice",
        "Guesswork about what FMCSA investigators actually look for",
      ]}
      nextStepText="The New Entrant Packet is one of five domain-specific operating standards. The New Carrier Document System bundles all five into a unified implementation sequence — covering every compliance domain a new authority faces in the first 90 days."
      nextStepHref="/products/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    />
  );
}
