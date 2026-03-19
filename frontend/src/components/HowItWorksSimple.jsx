import { Link } from "react-router-dom";

const PHASES = [
  {
    phase: "PHASE 1",
    label: "DIAGNOSE",
    weeks: "Weeks 0–2",
    desc: "Complete the Ground 0 diagnostic. Get a findings brief on where you stand and what's missing.",
  },
  {
    phase: "PHASE 2",
    label: "BUILD",
    weeks: "Weeks 3–8",
    desc: "You build your driver files, policies, drug program, HOS system, and maintenance records — following the installation sequence.",
  },
  {
    phase: "PHASE 3",
    label: "VERIFY",
    weeks: "Weeks 9–12",
    desc: "You leave with a verified audit packet, insurer narrative, and 90-day operating plan.",
  },
];

export default function HowItWorksSimple() {
  return (
    <>
      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 720px) {
          .hiw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        data-testid="how-it-works-simple"
        style={{
          background: "#090f16",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Section label */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.60rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.50)",
            marginBottom: "2rem",
          }}>
            LP-STD-001 | THE 90-DAY ENGAGEMENT
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            marginBottom: "3rem",
          }}>
            Three Phases. Twelve Weeks. One Verified Outcome.
          </h2>

          {/* Phase cards */}
          <div className="hiw-grid">
            {PHASES.map((p, i) => (
              <div
                key={i}
                data-testid={`phase-card-${i + 1}`}
                style={{
                  background: "#0c1420",
                  borderTop: "2px solid rgba(212,144,10,0.35)",
                  padding: "2rem 1.75rem",
                }}
              >
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.60rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(212,144,10,0.50)",
                  marginBottom: "0.5rem",
                }}>
                  {p.phase}
                </p>

                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.75rem",
                  color: "#d4900a",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}>
                  {p.label}
                </p>

                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}>
                  {p.weeks}
                </p>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.938rem",
                  color: "rgba(255,255,255,0.68)",
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Link */}
          <Link
            to="/operating-standard"
            data-testid="see-standard-link"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "rgba(212,144,10,0.80)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(212,144,10,0.25)",
              paddingBottom: "2px",
              letterSpacing: "0.02em",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#d4900a"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.80)"; }}
          >
            See the full Standard →
          </Link>

        </div>
      </section>
    </>
  );
}
