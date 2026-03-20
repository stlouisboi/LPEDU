import { useNavigate } from "react-router-dom";

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";
const heading = "'Playfair Display', serif";

const PILLARS = [
  { code: "R", name: "Resources" },
  { code: "E", name: "Experience" },
  { code: "A", name: "Authority Readiness" },
  { code: "C", name: "Commitment" },
  { code: "H", name: "Operational Discipline" },
];

export default function AuthorityReadinessTestSection() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: "#000A14",
        borderTop: "1px solid rgba(212,144,10,0.12)",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* System label */}
        <p style={{
          fontFamily: mono,
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.65)",
          marginBottom: "1.25rem",
        }}>
          LPOS v1.0 | LP-DX-001 | DIAGNOSTIC_ENGINE
        </p>

        {/* Section title */}
        <h2 style={{
          fontFamily: heading,
          fontWeight: 900,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "#FFFFFF",
          letterSpacing: "-0.025em",
          textTransform: "uppercase",
          lineHeight: 1.1,
          marginBottom: "1.75rem",
        }}>
          Authority Readiness Test
        </h2>

        {/* Divider */}
        <div style={{
          width: 40,
          height: 2,
          background: "#d4900a",
          marginBottom: "2rem",
        }} />

        {/* Body copy */}
        <p style={{
          fontFamily: sans,
          fontSize: "1.125rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.8,
          marginBottom: "1.25rem",
          maxWidth: 640,
        }}>
          Before running freight, every carrier should answer one question:
        </p>

        <p style={{
          fontFamily: heading,
          fontWeight: 800,
          fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
          color: "#FFFFFF",
          lineHeight: 1.55,
          marginBottom: "2.5rem",
          maxWidth: 600,
        }}>
          Is your operation strong enough to survive the first 90 days after receiving authority?
        </p>

        <p style={{
          fontFamily: sans,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.75,
          marginBottom: "2.5rem",
          maxWidth: 560,
        }}>
          The REACH Diagnostic measures operational readiness across five critical areas:
        </p>

        {/* Pillar list */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "3.5rem",
        }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(212,144,10,0.1)",
                borderLeft: "3px solid rgba(212,144,10,0.4)",
                animation: `fadeSlideIn 0.4s ease both`,
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <span style={{
                fontFamily: mono,
                fontWeight: 700,
                fontSize: "1rem",
                color: "#d4900a",
                minWidth: 20,
              }}>
                {p.code}
              </span>
              <span style={{
                fontFamily: sans,
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          data-testid="run-reach-diagnostic-btn"
          onClick={() => navigate("/reach-diagnostic")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "#d4900a",
            border: "none",
            color: "#020617",
            fontFamily: mono,
            fontWeight: 700,
            fontSize: "0.857rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "1rem 2rem",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e8a520";
            e.currentTarget.style.transform = "translateX(3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#d4900a";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          RUN THE AUTHORITY READINESS TEST →
        </button>

        {/* Footnote */}
        <p style={{
          fontFamily: mono,
          fontSize: "0.448rem",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
          marginTop: "1.5rem",
        }}>
          DIAGNOSTIC_ENGINE / LPOS v1.0 — Takes 4–6 minutes. No account required.
        </p>

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
