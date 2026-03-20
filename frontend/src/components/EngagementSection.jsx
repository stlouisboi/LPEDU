import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

const TIMELINE = [
  { code: "01–02", name: "Authority & Insurance Verification", desc: "Confirm filings, verify coverage, establish baseline" },
  { code: "03–04", name: "Driver Qualification Files", desc: "Build complete DQ files for every driver" },
  { code: "05–06", name: "Drug & Alcohol Program", desc: "Consortium enrollment, policy documentation, Clearinghouse" },
  { code: "07–08", name: "Hours of Service & ELD", desc: "Log compliance, supporting documents, violation response" },
  { code: "09–10", name: "Maintenance & Vehicle Files", desc: "Unit files, DVIR process, inspection tracking" },
  { code: "11–12", name: "System Verification", desc: "Cross-check all documentation, identify gaps" },
  { code: "13", name: "Audit Readiness Confirmation", desc: "Final review, readiness status issued", isLast: true },
];

const DELIVERABLES = [
  "Complete compliance documentation system (30+ forms and templates)",
  "Verified milestone tracking throughout the 90 days",
  "Direct access to Station Custodian for implementation questions",
  "Audit-ready status before the New Entrant window closes",
];

export default function EngagementSection() {
  return (
    <section
      data-testid="engagement-section"
      style={{
        background: "#080f1e",
        borderTop: "1px solid rgba(212,144,10,0.18)",
        borderBottom: "1px solid rgba(212,144,10,0.18)",
        padding: "104px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <FadeIn>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.616rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.65)",
            marginBottom: "1.25rem",
          }}>
            LP-STD-001 | THE ENGAGEMENT
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "var(--text-2xl)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}>
            What Working Together Looks Like
          </h2>

          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "1.064rem",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.75,
            maxWidth: 620,
            marginBottom: "0.875rem",
          }}>
            The LaunchPath Standard is a 90-day implementation you complete — designed to make your authority audit-ready and insurable before the New Entrant window closes.
          </p>

          <p style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            fontSize: "1.064rem",
            color: "rgba(255,255,255,0.52)",
            lineHeight: 1.75,
            maxWidth: 620,
            marginBottom: "3.5rem",
          }}>
            This is not a course you watch. It's a system you install yourself — with structured guidance from someone who's built compliance programs for 25 years.
          </p>
        </FadeIn>

        {/* Timeline header */}
        <FadeIn delay={80}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.616rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.65)",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(212,144,10,0.12)",
          }}>
            THE 90-DAY IMPLEMENTATION SEQUENCE
          </p>
        </FadeIn>

        {/* Timeline rows */}
        <div style={{ marginBottom: "4rem" }}>
          {TIMELINE.map((item, i) => (
            <FadeIn key={i} delay={90 + i * 50}>
              <div
                className="timeline-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "130px 1fr",
                  gap: "2rem",
                  padding: "1.25rem 0",
                  borderBottom: item.isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
                  alignItems: "start",
                }}
              >
                <div>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.56rem",
                    color: "rgba(212,144,10,0.72)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.2rem",
                  }}>
                    {item.isLast ? "WEEK" : "WEEKS"}
                  </span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "1.064rem",
                    color: "#d4900a",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}>
                    {item.code}
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.008rem",
                    color: "#FFFFFF",
                    marginBottom: "0.25rem",
                    lineHeight: 1.3,
                  }}>
                    {item.name}
                  </p>
                  <p style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontSize: "0.896rem",
                    color: "rgba(255,255,255,0.48)",
                    lineHeight: 1.55,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom: Deliverables + How to Start */}
        <FadeIn delay={200}>
          <div
            className="engagement-bottom-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(212,144,10,0.12)",
            }}
          >
            {/* What You Get */}
            <div>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.616rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(212,144,10,0.65)",
                marginBottom: "1.5rem",
              }}>
                WHAT YOU GET
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {DELIVERABLES.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.784rem",
                      color: "#d4900a",
                      marginTop: "0.2rem",
                      flexShrink: 0,
                    }}>→</span>
                    <span style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      fontSize: "1.008rem",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.65,
                    }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Start */}
            <div>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.616rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(212,144,10,0.65)",
                marginBottom: "1.5rem",
              }}>
                HOW TO START
              </p>
              <p style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontWeight: 700,
                fontSize: "0.896rem",
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "0.875rem",
              }}>
                Engagement is by application only.
              </p>
              <p style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}>
                Ground 0 is the qualification phase — a free orientation that shows you exactly what the Standard installs. Complete Ground 0, then request admission to the next cohort.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button
                  data-testid="engagement-readiness-test-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    background: "#d4900a",
                    color: "#000F1F",
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.896rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "1rem 2rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    minHeight: 48,
                  }}
                  onClick={() => window.location.href = "/reach-diagnostic"}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
                >
                  Run the Authority Readiness Test →
                </button>
                <Link
                  to="/ground-0-briefing"
                  data-testid="engagement-cta-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.84rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.5rem 0",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  Begin Ground 0 →
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>

      <style>{`
        @media (max-width: 700px) {
          .engagement-bottom-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .timeline-row { grid-template-columns: 80px 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
