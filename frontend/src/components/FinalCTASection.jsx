import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

export default function FinalCTASection() {
  return (
    <section data-testid="final-cta-section" style={{
      background: "#060d19",
      padding: "8rem 1.5rem",
      borderTop: "2px solid rgba(212,144,10,0.35)",
      borderBottom: "1px solid rgba(212,144,10,0.15)",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>

        <FadeIn>
          {/* Section code */}
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.60rem",
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.65)",
            marginBottom: "1.5rem",
          }}>
            LPOS V1.0 — GROUND 0 ENTRY
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "var(--text-2xl)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            Ready to Build the System?
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "var(--text-base)",
            color: "rgba(255,255,255,0.68)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            maxWidth: 560,
            margin: "0 auto 3rem",
          }}>
            Ground 0 is the free qualification module. Complete it in 4–6 minutes. No account required. No sales call. Just a clear read on where your operation stands — and what needs to be built first.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          {/* Buttons */}
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}>
            <Link
              to="/ground-0-briefing"
              data-testid="final-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#d4900a",
                color: "#060d19",
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
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

            <Link
              to="/reach-diagnostic"
              data-testid="reach-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "transparent",
                color: "#d4900a",
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                padding: "1.1rem 2.25rem",
                textDecoration: "none",
                border: "1px solid rgba(212,144,10,0.50)",
                transition: "border-color 0.2s, color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#d4900a";
                e.currentTarget.style.color = "#e8a520";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(212,144,10,0.50)";
                e.currentTarget.style.color = "#d4900a";
              }}
            >
              RUN THE REACH DIAGNOSTIC →
            </Link>
          </div>

          {/* Disclaimer */}
          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "var(--text-xs)",
            color: "rgba(255,255,255,0.32)",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
          }}>
            This is not done-for-you compliance. LaunchPath is a video-led implementation program. You do the work. The system shows you what, when, and how.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
