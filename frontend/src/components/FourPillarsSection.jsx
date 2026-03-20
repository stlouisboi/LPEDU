import { useState } from "react";
import FadeIn from "./FadeIn";

const PILLARS = [
  {
    code: "LP-SYS-01",
    num: "01",
    name: "Authority Protection",
    detail: "Federal filing continuity, authority maintenance, and structured audit-readiness controls. Missing filings, weak documentation, or unmanaged gaps can quickly turn authority into exposure.",
    output: "Avoids a conditional safety rating from a single missing DQ file or lapsed medical certificate.",
    without: "A single documentation gap — one missing DQ file, one lapsed medical certificate — can trigger a conditional rating that freezes operations within 30 days.",
  },
  {
    code: "LP-SYS-02",
    num: "02",
    name: "Insurance Continuity",
    detail: "BMC-91 filing integrity, continuous coverage verification, and policy gap prevention. When insurance posture weakens, authority stability weakens with it.",
    output: "Avoids insurance non-renewal — the leading direct trigger for authority revocation.",
    without: "Insurance non-renewal after an audit finding is the most common cause of authority revocation. Most carriers don't lose authority directly — they lose insurance, and authority follows.",
  },
  {
    code: "LP-SYS-03",
    num: "03",
    name: "Compliance Backbone",
    detail: "Hours-of-service records, drug and alcohol program enrollment, driver qualification file management, and vehicle inspection documentation. Investigators do not review one clean area in isolation — they review the operating system as a whole.",
    output: "Avoids audit failure from cross-area record gaps — a clean HOS file does not protect an incomplete D&A program.",
    without: "Investigators don't audit one area. They pull records across all four. A clean HOS file means nothing if your D&A program is incomplete. Failure in one area exposes all the others.",
  },
  {
    code: "LP-SYS-04",
    num: "04",
    name: "Cash-Flow Oxygen",
    detail: "Rate floor discipline, cost-per-mile control, and financial runway protection. When cash flow tightens, compliance decisions collapse under pressure. Financial control is an operating safeguard — not a separate business concern.",
    output: "Avoids the financial pressure that forces compliance shortcuts and non-compliance within 60 days.",
    without: "Carriers who cannot maintain cash-flow discipline become non-compliant within 60 days — not from negligence, but from financial pressure that forces operational shortcuts.",
  },
];

function PillarCard({ pillar, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-testid={`pillar-${idx + 1}`}
      style={{
        background: hovered ? "#0b1628" : "#0b1628",
        padding: "3rem 2.5rem",
        borderTop: "3px solid #d4900a",
        borderLeft: hovered ? "1px solid rgba(212,144,10,0.25)" : "1px solid rgba(212,144,10,0.08)",
        borderRight: hovered ? "1px solid rgba(212,144,10,0.25)" : "1px solid rgba(212,144,10,0.08)",
        borderBottom: hovered ? "1px solid rgba(212,144,10,0.25)" : "1px solid rgba(212,144,10,0.08)",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(212,144,10,0.1), 0 4px 20px rgba(0,0,0,0.35)"
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
        fontFamily: "'Playfair Display', serif",
        fontWeight: 800,
        fontSize: "8rem",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        color: hovered ? "rgba(212,144,10,0.09)" : "rgba(212,144,10,0.055)",
        transition: "color 0.3s ease",
      }}>
        {pillar.num}
      </div>

      {/* Code */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.762rem",
        color: "#d4900a",
        letterSpacing: "0.1em",
        marginBottom: "0.75rem",
        position: "relative",
        zIndex: 1,
      }}>
        {pillar.code}
      </p>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
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
        fontSize: "var(--text-sm)",
        color: "rgba(255,255,255,0.82)",
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
          fontSize: "0.857rem",
          fontWeight: 600,
          color: "rgba(248,113,113,0.92)",
          marginBottom: "0.375rem",
          letterSpacing: "0.02em",
        }}>
          If absent:
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.857rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.6,
        }}>
          {pillar.without}
        </p>
      </div>

      {/* Output — loss aversion */}
      <div style={{
        paddingTop: "0.875rem",
        borderTop: "1px solid rgba(212,144,10,0.14)",
        position: "relative",
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.857rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "rgba(212,144,10,0.92)",
          lineHeight: 1.55,
        }}>
          {pillar.output}
        </p>
      </div>
    </div>
  );
}

export default function FourPillarsSection() {
  return (
    <section data-testid="four-pillars-section" style={{
      background: "#0b1628",
      padding: "104px 24px",
      borderBottom: "1px solid rgba(212,144,10,0.15)",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#d4900a",
            marginBottom: "0.625rem",
          }}>
            LP-SYS-001 — THE FOUR PILLAR STANDARD
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "var(--text-2xl)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
          }}>
            Four Pillars. Six Installed Domains. One Audit-Ready Authority.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.7,
            marginBottom: "2.75rem",
            maxWidth: 620,
          }}>
            Every motor carrier authority depends on four operating systems to survive the New Entrant period. You install all four — in sequence, with documented proof, structured controls, and operational accountability at each stage.
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: "rgba(212,144,10,0.12)",
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
