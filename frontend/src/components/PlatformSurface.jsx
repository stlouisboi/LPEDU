import { Link } from "react-router-dom";

const ITEMS = [
  {
    label: "16 Deadly Sins",
    role: "The threat model",
    desc: "The 16 operational behaviors that most commonly end new carrier authority — with CFR citations and consequence lines for each.",
    href: "/16-deadly-sins",
    cta: "View →",
    code: "LP-DOC-001",
  },
  {
    label: "AUTO Method",
    role: "Why it fails",
    desc: "The attack-vector framework — risk moves Around, Under, Through, or Over your operation. Maps every direction failure approaches from.",
    href: "/auto-method",
    cta: "View →",
    code: "LP-MOD-AUTO",
  },
  {
    label: "AUTO Diagnostic",
    role: "Your readiness score",
    desc: "15 questions across 5 REACH categories. Produces an Authority Risk Map and a scored readiness result in under 4 minutes.",
    href: "/reach-diagnostic",
    cta: "Run →",
    code: "LP-TOOL-001",
  },
  {
    label: "Knowledge Center",
    role: "Reference library",
    desc: "Operational briefs covering the specific decisions, filings, and systems that determine whether a new authority survives its first year.",
    href: "/knowledge-center",
    cta: "Explore →",
    code: "LP-LIB-001",
  },
  {
    label: "Operating Standard",
    role: "What gets installed",
    desc: "The 90-day implementation sequence — six compliance domains, four guard systems, and a verified audit packet at the end.",
    href: "/operating-standard",
    cta: "View →",
    code: "LP-STD-001",
  },
];

export default function PlatformSurface() {
  return (
    <>
      <style>{`
        .ps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
        }
        @media (max-width: 1100px) {
          .ps-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 680px) {
          .ps-grid { grid-template-columns: 1fr 1fr; }
        }
        .ps-item {
          border-right: 1px solid rgba(212,144,10,0.14);
          padding: 2rem 1.5rem 2rem;
          transition: background 0.18s;
          position: relative;
        }
        .ps-item:last-child { border-right: none; }
        .ps-item:hover { background: rgba(212,144,10,0.05); }
        .ps-cta {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(212,144,10,0.55);
          text-decoration: none;
          transition: color 0.15s;
          display: inline-block;
          margin-top: 1.25rem;
        }
        .ps-cta:hover { color: #d4900a; }
        @media (max-width: 1100px) {
          .ps-item:nth-child(3) { border-right: none; }
        }
        @media (max-width: 680px) {
          .ps-item:nth-child(2n) { border-right: none; }
        }
      `}</style>

      <section
        data-testid="platform-surface"
        style={{
          background: "#060d19",
          borderTop: "2px solid rgba(212,144,10,0.45)",
          borderBottom: "1px solid rgba(212,144,10,0.18)",
        }}
      >
        {/* Header bar */}
        <div style={{
          borderBottom: "1px solid rgba(212,144,10,0.14)",
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.65)",
            margin: 0,
          }}>
            LPOS V1.0 — SYSTEM COMPONENTS
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.10em",
            margin: 0,
          }}>
            5 MODULES ACTIVE
          </p>
        </div>

        {/* Item grid */}
        <div className="ps-grid">
          {ITEMS.map((item) => (
            <div key={item.label} className="ps-item">
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.714rem",
                color: "rgba(212,144,10,0.38)",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}>{item.code}</p>

              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: "0.3rem",
              }}>{item.label}</p>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem",
                fontWeight: 500,
                color: "rgba(212,144,10,0.70)",
                letterSpacing: "0.04em",
                marginBottom: "0.875rem",
                textTransform: "uppercase",
              }}>{item.role}</p>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.857rem",
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.72,
                margin: 0,
              }}>{item.desc}</p>

              <Link to={item.href} className="ps-cta" data-testid={`platform-item-${item.code.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                {item.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
