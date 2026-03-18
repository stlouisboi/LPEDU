import ProductPageTemplate from "../../components/ProductPageTemplate";
import FadeIn from "../../components/FadeIn";

const WHO_NOT_FOR = [
  "Operators looking for someone to handle their filings for them.",
  "Carriers who want a shortcut around building real compliance systems.",
  "Anyone who believes compliance is optional until an investigator arrives.",
];

const WHAT_NOT_REPLACES = [
  "Legal counsel for regulatory disputes.",
  "A qualified safety manager for a growing fleet.",
  "The LaunchPath Standard for carriers who want guided implementation with professional oversight.",
];

export default function NewEntrantPacketPage() {
  const gold = "#C5A059";

  return (
    <ProductPageTemplate
      label="LP-PKT-001 | NEW ENTRANT COMPLIANCE PACKET"
      title="New Entrant Compliance Packet"
      subtitle="FMCSA New-Authority Operating Standard — Document System"
      price="$97"
      tagline="The document system for new FMCSA motor carrier authorities — from first filing through the New Entrant Safety Audit."
      positioning={[
        "This is not an audit prep kit. It is a document system — built to install a functional compliance infrastructure in a new carrier operation before the first audit notice arrives.",
        "The New Entrant Compliance Packet covers the single most critical compliance domain for any carrier in the 18-month FMCSA New Entrant Safety Assurance Program: authority identity, pre-launch filings, and audit-ready record organization.",
      ]}
      whatsInside={[
        "New Entrant Safety Audit Brief — A plain-language explanation of what the New Entrant Safety Audit is, when it happens, what FMCSA investigators are looking for across six compliance domains, and the automatic failure items that end operating authority — regardless of how well everything else is organized.",
        "Pre-Launch Compliance Checklist — Every filing, registration, and record that must be in place before your carrier moves a single load. Organized by domain — authority and identity, insurance filings, driver files, drug and alcohol, hours of service, and maintenance — with CFR citations. If an item is incomplete, your authority is not fully operational.",
        "New Entrant Audit Prep Checklist & Documentation Index — The document request list mapped to what an FMCSA investigator will ask for. Use it when an audit notice arrives — or use it quarterly to verify your records are audit-ready before any notice comes.",
        "Unified Folder Structure Map — The digital filing architecture for new carrier compliance records. Every document referenced in this packet has a designated folder location. Set this up before you move a single file.",
      ]}
      whoItsFor={[
        "Carriers in the 18-month New Entrant monitoring period who have not yet organized their compliance records.",
        "Owner-operators setting up compliance infrastructure before their first load.",
        "Small fleets (1–5 trucks) without a dedicated safety manager.",
        "Carriers who have received a New Entrant Safety Audit notice and need to organize immediately.",
      ]}
      whatItReplaces={[
        "A compliance consultant charging $150–$300 per hour to tell you what documents you need.",
        "A generic audit prep download that gives you folders without regulatory context.",
        "Guesswork in the weeks before an audit.",
      ]}
      nextStepText="This packet is one of five domain-specific document systems in the LaunchPath New Carrier Document System ($497 bundle). The bundle includes all five packets, a unified folder structure, and a 0–30–90 day implementation guide. Carriers enrolled in the LaunchPath Standard receive the complete document system at no additional cost."
      nextStepHref="/standards/new-carrier-document-system"
      nextStepLabel="View the New Carrier Document System ($497) →"
      gumroadUrl="https://launchpathedu.gumroad.com/l/NewEntrantCompliancePacket"
      mockupId="new-entrant"
    >
      {/* What This Replaces — closing note */}
      <FadeIn delay={165}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
          color: "rgba(255,255,255,0.75)", lineHeight: 1.75,
          marginBottom: "3.5rem", fontStyle: "italic",
        }}>
          This packet gives you the structure, the checklist, and the filing architecture in one document system — organized so you can install it yourself.
        </p>
      </FadeIn>

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

      {/* What This Does Not Replace */}
      <FadeIn delay={180}>
        <div style={{ height: 1, background: "rgba(197,160,89,0.1)", margin: "0 0 3.5rem" }} />
        <section style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.75)",
            marginBottom: "1.5rem",
          }}>What This Does Not Replace</p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {WHAT_NOT_REPLACES.map((item, i) => (
              <li key={i} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
                color: "rgba(255,255,255,0.68)", lineHeight: 1.7,
                paddingLeft: "1.25rem", position: "relative",
              }}>
                <span style={{ position: "absolute", left: 0, color: "rgba(255,255,255,0.2)" }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Format & Regulatory Standard */}
      <FadeIn delay={185}>
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
                color: "rgba(255,255,255,0.6)", lineHeight: 1.65, letterSpacing: "0.04em",
              }}>49 CFR Parts 385, 390, 391, 382, 395, 396<br />(citations current as of publication)</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Already operating callout */}
      <FadeIn delay={190}>
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
            If you have received an audit notice or failed your New Entrant Safety Audit, this packet applies to you. The window to correct deficiencies is narrow. Start with the audit prep checklist on page 5.
          </p>
        </div>
      </FadeIn>
    </ProductPageTemplate>
  );
}
