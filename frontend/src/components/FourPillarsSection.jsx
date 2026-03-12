import { useState } from "react";
import FadeIn from "./FadeIn";

const PILLARS = [
  {
    code: "LP-SYS-01",
    num: "01",
    name: "Authority Protection",
    detail: "Federal filing continuity, FMCSA operating authority maintenance, and structured audit-readiness protocol for the new entrant review period.",
    output: "Audit-Ready Authority",
    without: "A single documentation gap — one missing DQ file, one lapsed medical certificate — can trigger a conditional rating that freezes operations within 30 days.",
  },
  {
    code: "LP-SYS-02",
    num: "02",
    name: "Insurance Continuity",
    detail: "BMC-91 filing compliance, continuous coverage verification, policy gap prevention, and cargo insurance alignment with freight contract requirements.",
    output: "Zero Coverage Gaps",
    without: "Insurance non-renewal after an audit finding is the most common cause of authority revocation. Most carriers don't lose authority directly — they lose insurance, and authority follows.",
  },
  {
    code: "LP-SYS-03",
    num: "03",
    name: "Compliance Backbone",
    detail: "HOS documentation, D&A program enrollment, driver qualification file management, and vehicle inspection and maintenance record systems.",
    output: "Full CSA Compliance",
    without: "Investigators don't audit one area. They pull records across all four. A clean HOS file means nothing if your D&A program is incomplete. Failure in one area exposes all the others.",
  },
  {
    code: "LP-SYS-04",
    num: "04",
    name: "Cash-Flow Oxygen",
    detail: "Freight rate floor calculations, cost-per-mile control systems, factoring structure, and financial runway management through the first 90 operating days.",
    output: "Positive Cash Position",
    without: "Carriers who cannot maintain cash-flow discipline become non-compliant within 60 days — not from negligence, but from financial pressure that forces operational shortcuts.",
  },
];

function PillarCard({ pillar, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-testid={`pillar-${idx + 1}`}
      style={{
        background: hovered ? "#002244" : "#001530",
        padding: "2.5rem 2rem",
        borderTop: "3px solid #C5A059",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(197,160,89,0.1), 0 4px 20px rgba(0,0,0,0.35)"
          : "none",
        transition: "background 0.25s ease, transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
        height: "100%",
        boxSizing: "border-box",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Faded background number */}
      <div style={{
        position: "absolute",
        top: "-0.5rem",
        right: "1rem",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 800,
        fontSize: "6.5rem",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        color: hovered ? "rgba(197,160,89,0.09)" : "rgba(197,160,89,0.055)",
        transition: "color 0.3s ease",
      }}>
        {pillar.num}
      </div>

      {/* Code */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.672rem",
        color: "#C5A059",
        letterSpacing: "0.1em",
        marginBottom: "0.75rem",
        position: "relative",
        zIndex: 1,
      }}>
        {pillar.code}
      </p>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
        fontSize: "1.12rem",
        color: "#FFFFFF",
        marginBottom: "0.875rem",
        lineHeight: 1.25,
        position: "relative",
        zIndex: 1,
      }}>
        {pillar.name}
      </h3>

      {/* Detail */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.896rem",
        color: "rgba(255,255,255,0.68)",
        lineHeight: 1.65,
        marginBottom: "1.25rem",
        position: "relative",
        zIndex: 1,
      }}>
        {pillar.detail}
      </p>

      {/* Without it */}
      <div style={{
        paddingTop: "0.875rem",
        borderTop: "1px solid rgba(248,113,113,0.12)",
        position: "relative",
        zIndex: 1,
        marginBottom: "1.25rem",
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.784rem",
          fontWeight: 600,
          color: "rgba(248,113,113,0.75)",
          marginBottom: "0.375rem",
          letterSpacing: "0.02em",
        }}>
          Without it:
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.784rem",
          color: "rgba(255,255,255,0.48)",
          lineHeight: 1.6,
        }}>
          {pillar.without}
        </p>
      </div>

      {/* Output */}
      <div style={{
        paddingTop: "0.875rem",
        borderTop: "1px solid rgba(197,160,89,0.14)",
        position: "relative",
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.616rem",
          letterSpacing: "0.12em",
          color: "rgba(197,160,89,0.72)",
          textTransform: "uppercase",
        }}>
          OUTPUT: {pillar.output}
        </p>
      </div>
    </div>
  );
}

export default function FourPillarsSection() {
  return (
    <section data-testid="four-pillars-section" style={{
      background: "#001530",
      padding: "72px 24px",
      borderBottom: "1px solid rgba(197,160,89,0.15)",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#C5A059",
            marginBottom: "0.625rem",
          }}>
            SYSTEM ARCHITECTURE
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
          }}>
            Four Pillar Standard
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.7,
            marginBottom: "2.75rem",
            maxWidth: 540,
          }}>
            The LaunchPath Standard installs four operational systems. Each addresses a documented failure category. Together, they form the complete protection architecture.
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: "rgba(197,160,89,0.12)",
        }} className="pillars-grid">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.code} delay={i * 70}>
              <PillarCard pillar={pillar} idx={i} />
            </FadeIn>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) { .pillars-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
