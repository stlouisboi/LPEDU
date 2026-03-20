import { Link } from "react-router-dom";

export default function EmergencyWindowSection() {
  return (
    <section style={{
      background: "#060d19",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "5rem 1.5rem",
    }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Code label */}
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.55)",
          marginBottom: "2.5rem",
        }}>
          LP-STD-002 — FOR OPERATORS ALREADY IN THE WINDOW
        </p>

        {/* Quote */}
        <blockquote style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "var(--text-xl)",
          color: "#FFFFFF",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          borderLeft: "3px solid #d4900a",
          paddingLeft: "1.5rem",
          margin: "0 0 2.5rem",
        }}>
          "You already got the letter. It's not over — but the clock just got shorter."
        </blockquote>

        {/* Body */}
        <p style={{
          fontFamily: "'Atkinson Hyperlegible', sans-serif",
          fontSize: "var(--text-base)",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.8,
          marginBottom: "1.25rem",
          maxWidth: 640,
        }}>
          A conditional rating or warning letter gives most carriers 45–60 days to cure findings before authority action begins. That window is real — but only if you use it.
        </p>

        <p style={{
          fontFamily: "'Atkinson Hyperlegible', sans-serif",
          fontSize: "var(--text-base)",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.8,
          marginBottom: "3rem",
          maxWidth: 640,
        }}>
          The carriers who survive this moment are not the ones who panic. They are the ones who get organized fast.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <Link
            to="/ground-0-briefing"
            data-testid="emergency-ground0-cta"
            style={{
              display: "inline-block",
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#060d19",
              background: "#d4900a",
              padding: "1rem 2.25rem",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Begin Ground 0 — Emergency Admission
          </Link>

          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.35)",
            fontStyle: "italic",
            margin: 0,
          }}>
            The Standard was not built for easy situations. It was built for this one.
          </p>
        </div>
      </div>
    </section>
  );
}
