import { Link } from '../compat/Link';
import FadeIn from "./FadeIn";

const STAGES = [
  {
    step: "01",
    name: "Ground 0 Briefing",
    desc: "Complete the orientation module before admission is considered.",
  },
  {
    step: "02",
    name: "AUTO Diagnostic",
    desc: "Complete the REACH readiness assessment. Receive GO, WAIT, or NO-GO result.",
  },
  {
    step: "03",
    name: "Admission Decision",
    desc: "GO carriers request cohort placement. Not all applicants are admitted.",
  },
  {
    step: "04",
    name: "90-Day Implementation",
    desc: "Admitted carriers enter the cohort and begin the standard.",
  },
];

export default function NextStepSection() {
  return (
    <section data-testid="next-step-section" style={{
      background: "#0d1c30",
      padding: "7rem 1.5rem",
      borderBottom: "1px solid rgba(212,144,10,0.2)",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.25rem", color: "var(--gold-primary)" }}>
            The Process
          </p>
          <h2 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "4rem",
          }}>
            The sequence is fixed.<br />There are no shortcuts.
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", marginBottom: "3rem", position: "relative" }}>
          {/* Vertical connector line */}
          <div style={{
            position: "absolute",
            left: "1.2rem",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "var(--divider-dark)",
            zIndex: 0,
          }} />

          {STAGES.map((s, i) => (
            <FadeIn key={s.step} delay={i * 80}>
              <div data-testid={`sequence-step-${s.step}`} style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 1fr",
                gap: "2rem",
                padding: "1.75rem 0",
                position: "relative",
                zIndex: 1,
              }}>
                <div style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-onyx)",
                  border: "1px solid var(--gold-primary)",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.762rem",
                    fontWeight: 700,
                    color: "var(--gold-primary)",
                    letterSpacing: "0.05em",
                  }}>{s.step}</span>
                </div>

                <div style={{ paddingTop: "0.35rem" }}>
                  <h3 style={{
                    fontFamily: "'Newsreader', 'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "var(--text)",
                    marginBottom: "0.4rem",
                  }}>{s.name}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                  }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={360}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.064rem",
            color: "var(--text-subtle)",
            lineHeight: 1.7,
            marginBottom: "3rem",
            fontStyle: "italic",
          }}>
            LaunchPath does not offer open enrollment. Admission is by assessment and review only.
          </p>

          <Link
            to="/reach-diagnostic"
            data-testid="sequence-cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--gold-primary)",
              color: "var(--bg-onyx)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "1rem 2rem",
              textDecoration: "none",
              transition: "background 0.2s",
              minHeight: 52,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--gold-light)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--gold-primary)"}
          >
            Take the REACH Diagnostic
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
