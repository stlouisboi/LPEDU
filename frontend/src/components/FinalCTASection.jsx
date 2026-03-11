import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

export default function FinalCTASection() {
  return (
    <section data-testid="final-cta-section" style={{
      background: "#001530",
      padding: "8rem 1.5rem",
      borderBottom: "1px solid rgba(197,160,89,0.2)",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.5rem", color: "var(--gold-primary)" }}>
            Admission
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "3rem",
            lineHeight: 1.2,
          }}>
            Start where every operator begins.
          </h2>
        </FadeIn>

        <FadeIn delay={80}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            {[
              "LaunchPath does not admit every applicant.",
              "Some are advised to wait. Others are advised not to proceed at all.",
              "Both are correct outcomes when they prevent financial harm.",
            ].map((line, i) => (
              <p key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.12rem",
                color: "var(--text)",
                lineHeight: 1.75,
              }}>{line}</p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={140}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "1.064rem",
            color: "var(--text-subtle)",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}>
            If this feels expensive, you are likely not ready.<br />
            If it feels reasonable, you are already thinking like an operator.
          </p>
        </FadeIn>

        <FadeIn delay={180}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <Link
              to="/readiness"
              data-testid="final-cta-btn"
              style={{
                display: "inline-block",
                background: "var(--gold-primary)",
                color: "var(--bg-onyx)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "1.008rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1.1rem 2.5rem",
                textDecoration: "none",
                transition: "background 0.2s",
                minHeight: 52,
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--gold-light)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--gold-primary)"}
            >
              Begin Ground 0 Briefing
            </Link>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
              fontSize: "0.896rem",
              color: "var(--text-subtle)",
            }}>
              Ground 0 is the opening module of the LaunchPath Standard.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
