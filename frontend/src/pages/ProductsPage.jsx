import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";

const LADDER = [
  {
    tier: "Free",
    label: "Knowledge Center",
    desc: "Regulatory briefs, compliance explainers, and the complete checklist series. The foundation — no purchase required.",
    href: "/knowledge-center",
    cta: "Access Free →",
    gold: false,
  },
  {
    tier: "$97–$127",
    label: "Individual Packets",
    desc: "Five domain-specific operating standards. New Entrant, Drug & Alcohol, HOS & Dispatch, Maintenance, Insurance & Authority. Each one is a complete compliance system for its domain.",
    href: "#packets",
    cta: "View Packets →",
    gold: false,
  },
  {
    tier: "$497",
    label: "New Carrier Document System",
    desc: "All five packets unified. Includes the 0–30–90 Day Implementation Guide and the master folder structure. The complete DIY path for a new authority.",
    href: "/products/new-carrier-document-system",
    cta: "View Bundle →",
    gold: true,
  },
  {
    tier: "$2,500",
    label: "LaunchPath Standard",
    desc: "The guided path. A dedicated coach, a verified implementation sequence, live compliance monitoring, and the full document system — included. For carriers who want professional oversight through the 90-day window.",
    href: "/ground-0-briefing",
    cta: "Begin Ground 0 →",
    gold: false,
  },
];

const PACKETS = [
  { code: "LP-PKT-001", title: "New Entrant Packet", price: "$97", href: "/products/new-entrant-packet", desc: "The 18-month monitoring period framework, DQ file system, and new entrant audit preparation." },
  { code: "LP-PKT-002", title: "Drug & Alcohol Packet", price: "$127", href: "/products/drug-alcohol-packet", desc: "Part 382 compliance structure — enrollment documentation, clearinghouse logs, and supervisor training records." },
  { code: "LP-PKT-003", title: "HOS & Dispatch Packet", price: "$127", href: "/products/hos-packet", desc: "Part 395 operating standard — ELD compliance, dispatch logs, and hours documentation." },
  { code: "LP-PKT-004", title: "Maintenance & Unit File Packet", price: "$127", href: "/products/maintenance-packet", desc: "Part 396 compliance — per-VIN unit files, inspection documentation, and maintenance logs." },
  { code: "LP-PKT-005", title: "Insurance & Authority Packet", price: "$127", href: "/products/insurance-packet", desc: "Authority accuracy, BOC-3 compliance, and insurance filing verification." },
];

export default function ProductsPage() {
  const gold = "#C5A059";

  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#001530", borderBottom: `3px solid ${gold}`, padding: "72px 24px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem",
            }}>LP-SYS-PRODUCTS | DOCUMENT SYSTEM LIBRARY</p>
            <h1 style={{
              fontFamily: "'Manrope', sans-serif", fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF",
              lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem",
            }}>The LaunchPath Product Line</h1>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
              color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 580,
            }}>
              Five domain-specific operating standards and one complete bundle — the DIY path to a compliant new-authority operation, priced above commodity kits and below consulting.
            </p>
          </FadeIn>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>

        {/* Commercial Ladder */}
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.75)",
            marginBottom: "1.5rem",
          }}>The Commercial Ladder</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(197,160,89,0.1)", marginBottom: "4rem" }}>
            {LADDER.map((tier, i) => (
              <div key={i} style={{
                background: tier.gold ? "#001530" : "#020408",
                borderLeft: tier.gold ? `3px solid ${gold}` : "3px solid transparent",
                padding: "1.75rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "2rem", flexWrap: "wrap",
              }} className="ladder-row">
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: gold }}>{tier.tier}</span>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#FFFFFF" }}>{tier.label}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{tier.desc}</p>
                </div>
                <Link to={tier.href} style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: tier.gold ? "#001530" : gold,
                  background: tier.gold ? gold : "transparent",
                  border: `1px solid ${tier.gold ? gold : "rgba(197,160,89,0.4)"}`,
                  padding: "0.75rem 1.5rem", textDecoration: "none",
                  whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >{tier.cta}</Link>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Individual Packets */}
        <FadeIn delay={100}>
          <p id="packets" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.75)",
            marginBottom: "1.5rem",
          }}>Individual Packets — $97–$127</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(197,160,89,0.1)", marginBottom: "4rem" }}>
            {PACKETS.map((p, i) => (
              <div key={i} style={{
                background: "#020408", padding: "1.5rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "2rem", flexWrap: "wrap",
              }} className="ladder-row">
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(197,160,89,0.6)", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>{p.code}</p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", marginBottom: "0.4rem" }}>{p.title}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", color: "rgba(255,255,255,0.55)" }}>{p.price}</span>
                  <Link to={p.href} style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8rem",
                    letterSpacing: "0.1em", textTransform: "uppercase", color: gold,
                    border: `1px solid rgba(197,160,89,0.4)`, padding: "0.625rem 1.25rem",
                    textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(197,160,89,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >View →</Link>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bundle CTA */}
        <FadeIn delay={160}>
          <div style={{
            background: "#001530", border: `1px solid rgba(197,160,89,0.2)`,
            borderTop: `3px solid ${gold}`, padding: "2.5rem",
          }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Best Value</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.75rem" }}>New Carrier Document System — $497</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 580 }}>
              All five packets plus the 0–30–90 Day Implementation Guide and unified folder structure. The complete DIY path — $108 less than buying separately.
            </p>
            <Link to="/products/new-carrier-document-system" style={{
              display: "inline-block", background: gold, color: "#001530",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.875rem 2rem", textDecoration: "none",
            }}>View Bundle →</Link>
          </div>
        </FadeIn>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .ladder-row { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
}
