import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";
const heading = "'Playfair Display', serif";

const PHASES = [
  {
    code: "01",
    phase: "PHASE 1",
    label: "DIAGNOSE",
    weeks: "Weeks 0–2",
    desc: "Complete the Ground 0 diagnostic. Get a findings brief on where you stand and what's missing.",
    deliverables: [
      "REACH Assessment",
      "Risk findings brief",
      "Implementation map",
    ],
  },
  {
    code: "02",
    phase: "PHASE 2",
    label: "BUILD",
    weeks: "Weeks 3–8",
    desc: "You build your driver files, policies, drug program, HOS system, and maintenance records — following the installation sequence.",
    deliverables: [
      "30+ compliance forms",
      "Complete DQ files",
      "D&A program setup",
      "HOS/ELD system",
      "Maintenance files",
    ],
  },
  {
    code: "03",
    phase: "PHASE 3",
    label: "VERIFY",
    weeks: "Weeks 9–12",
    desc: "You leave with a verified audit packet, insurer narrative, and 90-day operating plan.",
    deliverables: [
      "Audit-ready documentation",
      "Insurance narrative",
      "Operating runbook",
      "Readiness verification",
    ],
  },
];

function PhaseCard({ item, idx }) {
  return (
    <FadeIn delay={idx * 110}>
      <div
        data-testid={`how-it-works-phase-${idx + 1}`}
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(212,144,10,0.12)",
          borderTop: "3px solid rgba(212,144,10,0.45)",
          padding: "2rem 1.5rem",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Phase label */}
        <p style={{
          fontFamily: mono,
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.65)",
          marginBottom: "0.625rem",
        }}>
          {item.phase}
        </p>

        {/* Phase title */}
        <h3 style={{
          fontFamily: heading,
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "#FFFFFF",
          letterSpacing: "-0.01em",
          marginBottom: "0.35rem",
          lineHeight: 1.2,
        }}>
          {item.label}
        </h3>

        {/* Week range */}
        <p style={{
          fontFamily: mono,
          fontSize: "0.857rem",
          color: "#d4900a",
          letterSpacing: "0.06em",
          marginBottom: "1.25rem",
        }}>
          {item.weeks}
        </p>

        {/* Description */}
        <p style={{
          fontFamily: sans,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
          flexGrow: 1,
        }}>
          {item.desc}
        </p>

        {/* Deliverables */}
        <div>
          <p style={{
            fontFamily: sans,
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.6)",
            marginBottom: "0.625rem",
          }}>
            YOU GET:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {item.deliverables.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: mono,
                  fontSize: "0.714rem",
                  color: "rgba(212,144,10,0.45)",
                  marginTop: "0.2rem",
                  flexShrink: 0,
                }}>→</span>
                <span style={{
                  fontFamily: sans,
                  fontSize: "0.924rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      data-testid="how-it-works-section"
      style={{
        background: "#080f1e",
        borderTop: "1px solid rgba(212,144,10,0.12)",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "104px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Section header */}
        <FadeIn>
          <p style={{
            fontFamily: mono,
            fontSize: "0.714rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.65)",
            marginBottom: "3rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(212,144,10,0.1)",
          }}>
            HOW THE 90-DAY ENGAGEMENT WORKS
          </p>
        </FadeIn>

        {/* Three phase cards with arrow connectors */}
        <div
          className="how-it-works-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 36px 1fr 36px 1fr",
            gap: 0,
            alignItems: "start",
          }}
        >
          {PHASES.map((item, i) => (
            <>
              <PhaseCard key={item.code} item={item} idx={i} />
              {i < 2 && (
                <FadeIn key={`arrow-${i}`} delay={i * 110 + 60}>
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: "3rem",
                    color: "rgba(212,144,10,0.3)",
                    fontFamily: mono,
                    fontSize: "1.25rem",
                  }}>
                    →
                  </div>
                </FadeIn>
              )}
            </>
          ))}
        </div>

        {/* Footer */}
        <FadeIn delay={350}>
          <div style={{
            borderTop: "1px solid rgba(212,144,10,0.1)",
            marginTop: "3.5rem",
            paddingTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: sans,
              fontSize: "1.064rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
            }}>
              Ground 0 starts Phase 1. It's free. Complete it to apply.
            </p>
            <Link
              to="/ground-0-briefing"
              data-testid="how-it-works-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#d4900a",
                color: "#000F1F",
                fontFamily: sans,
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "1rem 2.25rem",
                textDecoration: "none",
                transition: "background 0.2s",
                minHeight: 48,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
            >
              Begin Ground 0 →
            </Link>
          </div>
        </FadeIn>

      </div>

      <style>{`
        @media (max-width: 700px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
          }
          .how-it-works-grid .arrow-connector {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
