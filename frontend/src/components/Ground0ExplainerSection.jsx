import { Link } from "react-router-dom";

export default function Ground0ExplainerSection() {
  return (
    <section
      data-testid="ground0-explainer-section"
      style={{
        background: "#0a1120",
        borderTop: "1px solid rgba(212,144,10,0.18)",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.55)",
          marginBottom: "0.5rem",
        }}>
          LP-G0-001 — GROUND 0 ENTRY
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.40)",
          marginBottom: "2rem",
        }}>
          THE WISDOM MODULE
        </p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          color: "#FFFFFF",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: "1.75rem",
        }}>
          What is Ground <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>0</span>?
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.8,
          marginBottom: "1.25rem",
          maxWidth: 640,
        }}>
          Ground 0 is the readiness briefing and entry filter for carriers in the first 90 days of authority. Built on the Wisdom Framework — preparation beats reaction.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.8,
          marginBottom: "1.25rem",
          maxWidth: 640,
        }}>
          It shows what the audit will expect, where your operation is exposed, and whether the Standard is the right fit.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.8,
          marginBottom: "1.25rem",
          maxWidth: 640,
        }}>
          Complete it in 4–6 minutes. No account required. No sales call.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.8,
          marginBottom: "3rem",
          maxWidth: 640,
          fontStyle: "italic",
        }}>
          You'll leave with a clear picture of where you stand — and what needs to be built first.
        </p>

        <Link
          to="/ground-0-briefing"
          data-testid="ground0-explainer-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "#d4900a",
            color: "#060d19",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "var(--text-sm)",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            padding: "1.1rem 2.25rem",
            textDecoration: "none",
            transition: "background 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
          onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
        >
          INITIATE GROUND 0 →
        </Link>

      </div>
    </section>
  );
}
