import ProductPageTemplate from "../../components/ProductPageTemplate";
import FadeIn from "../../components/FadeIn";

const WHO_NOT_FOR = [
  "Non-CDL carriers not subject to Part 382 testing requirements.",
  "Carriers looking for a C/TPA to administer their program — this packet documents the program, it does not run it.",
  "Anyone who believes a consortium enrollment card is sufficient documentation.",
];

export default function DrugAlcoholPacketPage() {
  const gold = "#C5A059";

  return (
    <ProductPageTemplate
      label="LP-PKT-002 | DRUG & ALCOHOL COMPLIANCE PACKET"
      title="Drug & Alcohol Compliance Packet"
      subtitle="Part 382 Compliance Operating Standard — Document System"
      price="$127"
      tagline="The document system for installing a compliant 49 CFR Part 382 program."
      positioning={[
        "This is not a consortium enrollment service. It is a document system — built to install the written policy, recordkeeping framework, and testing documentation that FMCSA requires when they review your Drug and Alcohol program during a New Entrant Safety Audit.",
        "Enrollment in a C/TPA gets you into the random testing pool. This packet documents that your program actually exists and functions — which is what the audit reviews.",
      ]}
      whatsInside={[
        "Part 382 Regulatory Brief — Who Is Covered and What FMCSA Requires — A plain-language explanation of which carriers are subject to Part 382, all six required testing types with triggering conditions and timing requirements, FMCSA Clearinghouse obligations, and the automatic failure items that end operating authority regardless of anything else.",
        "Program Setup Checklist — Every step required to install a compliant D&A program — C/TPA enrollment, pre-employment testing, Clearinghouse registration and query process, post-accident testing protocol, reasonable suspicion protocol, and return-to-duty procedures. With CFR citations.",
        "Written Policy Outline and Driver Handout Template — A ten-section policy outline covering every element required under 49 CFR 382.601, with a driver handout checklist specifying the minimum contents required by regulation. The policy must exist in writing. This is the framework to build it.",
        "Recordkeeping Checklist and Testing Trigger Log — A retention schedule for every D&A record type with required retention periods and designated file locations. Plus a trigger log format for documenting every test event — the running record an investigator reviews to verify your program is active.",
      ]}
      whoItsFor={[
        "CDL carriers subject to 49 CFR Part 382 who have not yet installed a documented D&A program.",
        "Owner-operators who need to join a consortium and document their program correctly.",
        "Small fleets setting up their first formal D&A program before their first load.",
        "Carriers whose D&A records were flagged or incomplete during a New Entrant Safety Audit.",
      ]}
      whatItReplaces={[
        "Paying a compliance consultant to tell you what records to keep.",
        "Relying on your C/TPA to tell you what FMCSA actually reviews.",
        "Discovering your policy was never put in writing during an audit.",
      ]}
      nextStepText="This packet is one of five domain-specific document systems in the LaunchPath New Carrier Document System ($497 bundle). The bundle includes all five packets, a unified folder structure, and a 0–30–90 day implementation guide. Carriers enrolled in the LaunchPath Standard receive the complete document system at no additional cost."
      nextStepHref="/products/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="#"
    >
      {/* Who This Is Not For */}
      <FadeIn delay={170}>
        <div style={{ height: 1, background: "rgba(197,160,89,0.1)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.75)",
            marginBottom: "1.5rem",
          }}>Who This Is Not For</p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {WHO_NOT_FOR.map((item, i) => (
              <li key={i} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
                color: "rgba(255,255,255,0.88)", lineHeight: 1.7,
                paddingLeft: "1.25rem", position: "relative",
              }}>
                <span style={{ position: "absolute", left: 0, color: "rgba(248,113,113,0.7)" }}>×</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Format & Regulatory Standard */}
      <FadeIn delay={180}>
        <div style={{ height: 1, background: "rgba(197,160,89,0.1)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)",
                marginBottom: "0.5rem",
              }}>Format</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                color: "rgba(255,255,255,0.75)", lineHeight: 1.65,
              }}>PDF — immediate download upon purchase.<br />Print-ready. Checkbox layout throughout.</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)",
                marginBottom: "0.5rem",
              }}>Regulatory Standard</p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem",
                color: "rgba(255,255,255,0.75)", lineHeight: 1.65, letterSpacing: "0.04em",
              }}>49 CFR Part 382, 49 CFR Part 40</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Already operating callout */}
      <FadeIn delay={185}>
        <div style={{
          background: "rgba(197,160,89,0.06)", border: "1px solid rgba(197,160,89,0.2)",
          borderLeft: `3px solid ${gold}`, padding: "1.5rem 1.75rem", marginBottom: "3.5rem",
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase", color: gold, marginBottom: "0.75rem",
          }}>Already operating and behind on compliance?</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.88)", lineHeight: 1.75,
          }}>
            If your D&A records were flagged in an audit or you have never had a written policy in place, the window to correct it is narrow. Start with the automatic failure items on page 4.
          </p>
        </div>
      </FadeIn>
    </ProductPageTemplate>
  );
}
