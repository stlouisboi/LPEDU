import ProductPageTemplate from "../../components/ProductPageTemplate";

export default function DrugAlcoholPacketPage() {
  return (
    <ProductPageTemplate
      label="LP-PKT-002 | DRUG & ALCOHOL PACKET"
      title="Drug & Alcohol Packet"
      subtitle="FMCSA Part 382 Compliance Operating Standard (Document System)"
      price="$127"
      tagline="A complete Drug & Alcohol program document system for FMCSA-regulated carriers — not a policy template, a full compliance operating standard in document form."
      positioning={[
        "[Copy to be provided. Follows the standard architecture: what this is and what it is not — first two sentences draw the distinction from generic D&A policy templates and consortium enrollment guides.]",
        "[Second paragraph establishes depth: what an experienced safety manager builds for Part 382 compliance vs. what most carriers piece together from consortium onboarding packets.]",
      ]}
      whatsInside={[
        "Part 382 Regulatory Brief — the testing requirements, clearinghouse obligations, and supervisor training mandates",
        "D&A Program Checklist — pre-employment, random, post-accident, reasonable suspicion, and return-to-duty documentation",
        "Clearinghouse Query Log — template for recording required pre-employment and annual queries",
        "Supervisor Training Record — documentation that Part 382 supervisor training was completed",
        "Folder Structure — digital directory for D&A program files",
      ]}
      whoItsFor={[
        "New authorities who need to build their D&A program from the ground up",
        "Carriers enrolled in a C/TPA who have never built the surrounding documentation structure",
        "Owner-operators who need to document their own pre-employment and clearinghouse history",
        "Carriers who received a D&A-related finding in their new entrant audit",
      ]}
      whatItReplaces={[
        "Consortium onboarding packets that cover enrollment but not documentation",
        "Generic D&A policy templates that don't address FMCSA's specific record-keeping requirements",
        "Paying a safety consultant to build what this packet contains",
        "Scrambling to reconstruct D&A records during an audit",
      ]}
      nextStepText="The Drug & Alcohol Packet covers one of five compliance domains. The New Carrier Document System bundles all five with a 0–30–90 day implementation guide — the complete DIY operating standard for new authorities."
      nextStepHref="/products/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    />
  );
}
