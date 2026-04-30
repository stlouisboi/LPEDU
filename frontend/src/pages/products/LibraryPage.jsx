import ProductPageTemplate from "../../components/ProductPageTemplate";
import FadeIn from "../../components/FadeIn";

const CONTENTS = [
  {
    sku: "LP-PKT-SINS",
    label: "DIAGNOSTICS",
    name: "16 Deadly Sins Risk Map",
    desc: "A 38-page self-audit covering the 16 compliance failures that cause the most authority suspensions. Identify your highest-exposure gaps before FMCSA does.",
    price: "$59",
  },
  {
    sku: "LP-PKT-DQ",
    label: "DOMAIN 2 · DRIVER QUALIFICATION",
    name: "DQ File Builder Kit",
    desc: "The complete CFR Part 391 Driver Qualification file architecture for every driver on your roster.",
    price: "$129",
  },
  {
    sku: "LP-RES-004",
    label: "AUDIT PREP",
    name: "Safety Audit Prep Pack",
    desc: "18-month audit window timeline, monthly mock audit protocol, 48-hour response sequence, and 30-day Conditional Recovery Sprint.",
    price: "$169",
  },
  {
    sku: "LP-PKT-001",
    label: "DOMAIN 1 · AUTHORITY & NEW ENTRANT",
    name: "New Entrant Compliance Packet",
    desc: "Your full 18-month new entrant roadmap from authority activation through the New Entrant Safety Audit window.",
    price: "$139",
  },
  {
    sku: "LP-PKT-002",
    label: "DOMAIN 3 · DRUG & ALCOHOL",
    name: "Drug & Alcohol Compliance Packet",
    desc: "Complete Part 382 documentation — written policy, testing protocols, and Clearinghouse integration.",
    price: "$129",
  },
  {
    sku: "LP-PKT-003",
    label: "DOMAIN 4 · HOS & DISPATCH",
    name: "HOS & Dispatch Compliance Packet",
    desc: "ELD compliance standards, dispatch discipline, and HOS recordkeeping documentation per Part 395.",
    price: "$119",
  },
  {
    sku: "LP-PKT-004",
    label: "DOMAIN 5 · VEHICLE MAINTENANCE",
    name: "Maintenance & Unit File Packet",
    desc: "Unit file architecture, PM schedules, and defect tracking documentation per Part 396.",
    price: "$119",
  },
  {
    sku: "LP-PKT-005",
    label: "DOMAIN 6 · INSURANCE CONTINUITY",
    name: "Insurance & Authority Packet",
    desc: "Filing verification, renewal calendar, and authority monitoring framework that keeps your authority active.",
    price: "$109",
  },
];

const SANS = "'Inter', Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const GOLD = "#d4900a";

export default function LibraryPage() {
  return (
    <ProductPageTemplate
      label="LP-LIB-001 | COMPLETE DIY LIBRARY"
      title="Complete LaunchPath DIY Library"
      subtitle="Every compliance document LaunchPath produces for new motor carriers — all eight assets, organized, and available in a single acquisition."
      price="$699"
      sku="LP-LIB-001"
      image="/images/products/complete-diy-library.webp"
      ctaLabel="ACCESS THE FULL LIBRARY — $699 →"
      valuePoints={[
        "All five domain compliance packets — authority, driver qualification, drug & alcohol, HOS, maintenance, and insurance continuity.",
        "The 16 Deadly Sins Risk Map — identify your highest-exposure gaps before FMCSA does.",
        "The Safety Audit Prep Pack — 48-hour response sequence, monthly mock audit, and conditional recovery sprint included.",
      ]}
      tagline="The complete DIY compliance system for new motor carriers who want every document in one acquisition — before FMCSA asks for any of them."
      positioning={[
        "This is the full LaunchPath document library — eight compliance resources covering every FMCSA audit domain plus diagnostics and audit prep. It is the complete self-installation path for carriers who have assessed their exposure and are confident in self-directed implementation.",
        "The Complete Library does not include guided installation, verification checkpoints, or Station Custodian access. Those are features of the LaunchPath Standard. If you want documents plus a structured self-install calendar at lower cost, the Document System Bundle ($499) covers the five domain packets with the folder architecture, implementation calendar, and master checklist.",
      ]}
      whatsInside={[
        "16 Deadly Sins Risk Map (LP-PKT-SINS) — Self-audit covering the 16 compliance failures that cause the most authority suspensions.",
        "DQ File Builder Kit (LP-PKT-DQ) — CFR Part 391 Driver Qualification file architecture for every driver on your roster.",
        "Safety Audit Prep Pack (LP-RES-004) — 18-month timeline, monthly mock audit, 48-hour response sequence, and 30-day Conditional Recovery Sprint.",
        "New Entrant Compliance Packet (LP-PKT-001) — Full 18-month new entrant roadmap from authority activation through the audit window.",
        "Drug & Alcohol Compliance Packet (LP-PKT-002) — Part 382 program documentation: written policy, testing protocols, Clearinghouse integration.",
        "HOS & Dispatch Compliance Packet (LP-PKT-003) — ELD compliance standards, dispatch discipline, and HOS recordkeeping per Part 395.",
        "Maintenance & Unit File Packet (LP-PKT-004) — Unit files, PM schedules, and defect tracking per Part 396.",
        "Insurance & Authority Packet (LP-PKT-005) — Filing verification, renewal calendar, and monitoring framework.",
      ]}
      whoItsFor={[
        "New motor carriers who have completed the REACH Diagnostic and understand their full compliance exposure.",
        "Carriers who want every compliance domain covered in a single acquisition and are prepared to self-install.",
        "Owner-operators with prior compliance experience who can implement without guided oversight.",
        "Carriers who prefer a single comprehensive acquisition over domain-by-domain installation.",
      ]}
      whatItReplaces={[
        "Acquiring each domain packet individually at retail pricing — $972 total, $273 above the Library price.",
        "A compliance consultant providing periodic document reviews and audit prep at $500–$1,500 per engagement.",
        "Generic trucking compliance templates without FMCSA-specific structure or new entrant context.",
      ]}
      nextStepText="The Complete Library is the full DIY path. If you want the same documents installed with structured oversight — five verification checkpoints, a Station Custodian confirming installation at each stage, and an audit-readiness confirmation at completion — that is the LaunchPath Standard. It begins at Ground 0."
      nextStepHref="/ground-0-briefing"
      nextStepLabel="Explore the LaunchPath Standard →"
    >
      {/* Contents breakdown */}
      <FadeIn delay={160}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(212,144,10,0.60)", marginBottom: "0.375rem" }}>
            RETAIL VALUE — $972
          </p>
          <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: GOLD, marginBottom: "1.5rem" }}>
            LIBRARY PRICE — $699 &nbsp;·&nbsp; SAVE $273
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {CONTENTS.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "0.875rem 1rem", background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.015)", borderLeft: `2px solid rgba(212,144,10,0.30)` }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "0.25rem" }}>{item.label}</p>
                  <p style={{ fontFamily: SANS, fontSize: "0.875rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>{item.name}</p>
                  <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.55 }}>{item.desc}</p>
                </div>
                <span style={{ fontFamily: MONO, fontSize: "0.857rem", fontWeight: 700, color: "rgba(255,255,255,0.40)", textDecoration: "line-through", flexShrink: 0, marginTop: "0.25rem" }}>{item.price}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1rem", background: "rgba(212,144,10,0.06)", borderLeft: `2px solid ${GOLD}`, marginTop: "2px" }}>
            <span style={{ fontFamily: SANS, fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>Complete Library</span>
            <span style={{ fontFamily: MONO, fontSize: "1rem", fontWeight: 700, color: GOLD }}>$699</span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={175}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 0 3.5rem" }} />
        <div style={{ background: "rgba(212,144,10,0.05)", border: "1px solid rgba(212,144,10,0.18)", padding: "1.5rem", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.75rem" }}>
            NOT SURE IF YOU NEED THE FULL LIBRARY?
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>
            If you only need the five domain compliance packets with a unified folder architecture and 0–30–60–90 day implementation calendar, the{" "}
            <a href="/products/bundle" style={{ color: GOLD, textDecoration: "none" }}>Document System Bundle ($499)</a>{" "}
            covers the core system at $176 below individual domain cost — and $200 below the Library price. The Library adds diagnostics and audit prep on top of the domain system.
          </p>
        </div>
      </FadeIn>
    </ProductPageTemplate>
  );
}
