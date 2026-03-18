import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

const SINS_TEASER = [
  {
    num: "02",
    name: "The Ghost Driver",
    desc: "Dispatching before a pre-employment drug test result is filed.",
  },
  {
    num: "05",
    name: "Clearinghouse Silence",
    desc: "Failing to run mandatory Clearinghouse queries on every driver.",
  },
  {
    num: "08",
    name: "Pencil-Whipping Inspections",
    desc: "Signing DVIRs without inspecting the equipment.",
  },
  {
    num: "16",
    name: "Audit Defiance",
    desc: "Failing to respond to a New Entrant Safety Audit within the response window.",
  },
];

export default function MidPageStatement() {
  return (
    <section
      data-testid="mid-page-statement"
      style={{
        background: "#000508",
        borderTop: "1px solid rgba(212,144,10,0.2)",
        borderBottom: "1px solid rgba(212,144,10,0.2)",
        padding: "104px 24px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn y={24}>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.82)",
            marginBottom: "2rem",
          }}>
            LP-SYS-RECORD | FAILURE ANALYSIS
          </p>

          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.85rem, 4.5vw, 3rem)",
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            There are 16 documented failure patterns<br />
            <span style={{ color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>in new carrier compliance.</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.85,
            maxWidth: 620,
            marginBottom: "3rem",
          }}>
            The LaunchPath system is built around 16 operational behaviors that most commonly end new carrier operating authority. They are not freak accidents. They are predictable, preventable, and almost always administrative.
          </p>

        </FadeIn>

        {/* Sin teasers */}
        <FadeIn delay={60}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            marginBottom: "2.5rem",
          }}>
            {SINS_TEASER.map((sin) => (
              <div key={sin.num} style={{
                background: "#0B1927",
                borderLeft: "3px solid rgba(216,90,48,0.6)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
              }}>
                <span style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.78rem",
                  color: "rgba(216,90,48,0.88)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  flexShrink: 0,
                  marginTop: "0.1rem",
                  minWidth: 58,
                }}>[SIN {sin.num}]</span>
                <div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#D85A30",
                    marginBottom: "0.2rem",
                  }}>{sin.name}</p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.76)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}>{sin.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.70)",
              lineHeight: 1.7,
              maxWidth: 420,
              margin: 0,
            }}>
              Every one of these is preventable. The LaunchPath system installs the controls that prevent them.
            </p>
            <Link
              to="/standards/16-deadly-sins"
              data-testid="view-16-sins-link"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#d4900a",
                textDecoration: "none",
                border: "1px solid rgba(212,144,10,0.35)",
                padding: "0.65rem 1.5rem",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(212,144,10,0.06)";
                e.currentTarget.style.borderColor = "rgba(212,144,10,0.65)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(212,144,10,0.35)";
              }}
            >
              View All 16 Deadly Sins →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
