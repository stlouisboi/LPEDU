import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

const CONDITIONS = [
  "Authority is active or scheduled to activate.",
  "The operator intends to run the business as a compliant carrier, not a temporary experiment.",
  "The operator is prepared to install operational systems rather than rely on shortcuts.",
];

export default function FinalCTASection() {
  return (
    <section data-testid="final-cta-section" style={{
      background: "#001530",
      padding: "8rem 1.5rem",
      borderBottom: "1px solid rgba(197,160,89,0.2)",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.5rem", color: "var(--gold-primary)", textAlign: "center" }}>
            Admission
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1.75rem",
            lineHeight: 1.2,
            textAlign: "center",
          }}>
            LaunchPath is not an open enrollment program.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.064rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            textAlign: "center",
            maxWidth: 580,
            margin: "0 auto 3rem",
          }}>
            It is designed for operators who intend to build a compliant, durable motor carrier operation from the start.
          </p>
        </FadeIn>

        <FadeIn delay={60}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.7)",
            marginBottom: "1.5rem",
          }}>
            Before entering the system, operators should confirm three conditions:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "3rem" }}>
            {CONDITIONS.map((cond, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                padding: "1.25rem 0",
                borderBottom: i < CONDITIONS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <div style={{
                  width: 20, height: 20, minWidth: 20,
                  border: "1px solid rgba(197,160,89,0.5)",
                  marginTop: "0.1rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 8, height: 8, background: "#C5A059" }} />
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.008rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                }}>
                  {cond}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
          }}>
            Operators who meet these conditions can proceed to Ground 0, the first installation phase of the LaunchPath Operating Standard.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "1.008rem",
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
              to="/ground-0-briefing"
              data-testid="final-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
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
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-light)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--gold-primary)")}
            >
              Begin Ground 0 Briefing
            </Link>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
              fontSize: "0.896rem",
              color: "var(--text-subtle)",
              textAlign: "center",
            }}>
              Ground 0 is the first installation phase of the LaunchPath Operating Standard. No charge.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
