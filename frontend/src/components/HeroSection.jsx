import { Link } from "react-router-dom";

const DOMAINS = [
  { num: "01", name: "Authority & Identity" },
  { num: "02", name: "Driver Qualification Files" },
  { num: "03", name: "Drug & Alcohol Program" },
  { num: "04", name: "Hours of Service & Dispatch" },
  { num: "05", name: "Vehicle Maintenance" },
  { num: "06", name: "Insurance & Authority" },
];

const PROOF = [
  { number: "90", label: "Days — Guided implementation" },
  { number: "5",  label: "Domains — Audit coverage" },
  { number: "5",  label: "Checkpoints — Custodian review" },
];

export default function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      style={{
        position: "relative",
        background: "#002244",
        minHeight: 620,
        overflow: "hidden",
      }}
    >
      {/* Gold bar — 3px, full width, pinned top */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: "#C5A059",
        zIndex: 10,
      }} />

      {/* Main grid */}
      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 288px",
          alignItems: "start",
        }}
      >

        {/* ── LEFT COLUMN ── */}
        <div className="hero-left" style={{ padding: "100px 44px 80px 56px" }}>

          {/* Eyebrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
          }}>
            <div style={{ width: 28, height: 1, background: "#C5A059", flexShrink: 0 }} />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C5A059",
              margin: 0,
            }}>NEW MOTOR CARRIER AUTHORITY</p>
          </div>

          {/* Headline */}
          <h1 style={{ margin: 0 }}>
            <span className="hero-headline-line" style={{
              display: "block",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 60,
              fontWeight: 500,
              lineHeight: 1.05,
              color: "#FFFFFF",
              marginBottom: 4,
            }}>
              Your authority is active.
            </span>
            <span className="hero-headline-line" style={{
              display: "block",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 60,
              fontWeight: 500,
              lineHeight: 1.05,
              color: "#C5A059",
            }}>
              Your exposure window just opened.
            </span>
          </h1>

          {/* Gold divider */}
          <div style={{ width: 40, height: 2, background: "#C5A059", margin: "28px 0" }} />

          {/* Body paragraph */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.8,
            maxWidth: 480,
            marginBottom: 36,
          }}>
            Most carriers focus on loads first. FMCSA is already watching.{" "}
            <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
              What you build in the first 90 days shapes what the agency finds between Month 9 and Month 18.
            </span>
            {" "}Authority failure is rarely caused by lack of effort. It is caused by missing operational infrastructure.
          </p>

          {/* CTA row — above proof strip */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 36,
          }}>
            <Link
              to="/ground-0-briefing"
              data-testid="hero-primary-cta"
              className="hero-cta-primary"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "#001833",
                background: "#C5A059",
                padding: "16px 36px",
                height: 52,
                borderRadius: 4,
                textDecoration: "none",
                boxShadow: "0 0 0 3px rgba(197,160,89,0.22)",
                transition: "background 0.2s",
                display: "inline-flex",
                alignItems: "center",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4b572")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C5A059")}
            >
              Begin Ground 0
            </Link>

            <Link
              to="/standards"
              data-testid="hero-secondary-cta"
              className="hero-cta-secondary"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                letterSpacing: "0.01em",
                color: "rgba(255,255,255,0.65)",
                background: "transparent",
                border: "0.5px solid rgba(255,255,255,0.25)",
                padding: "0 20px",
                height: 52,
                borderRadius: 4,
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
                display: "inline-flex",
                alignItems: "center",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              See what gets installed →
            </Link>
          </div>

          {/* Proof strip — below CTAs */}
          <div
            className="proof-strip"
            style={{
              display: "flex",
              border: "0.5px solid rgba(197,160,89,0.22)",
              borderRadius: 6,
              overflow: "hidden",
              maxWidth: 480,
            }}
          >
            {PROOF.map((item, i) => (
              <div key={i} style={{
                flex: 1,
                padding: "16px 18px",
                borderRight: i < PROOF.length - 1 ? "0.5px solid rgba(197,160,89,0.22)" : "none",
              }}>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 26,
                  fontWeight: 500,
                  color: "#C5A059",
                  display: "block",
                  margin: "0 0 4px",
                  lineHeight: 1,
                }}>{item.number}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.4,
                  margin: 0,
                }}>{item.label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT COLUMN (288px) ── */}
        <div
          className="hero-right"
          style={{
            borderLeft: "0.5px solid rgba(197,160,89,0.14)",
            padding: "100px 32px 80px",
            display: "flex",
            flexDirection: "column",
          }}
        >

          {/* Label 1 */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            fontWeight: 500,
            color: "rgba(197,160,89,0.6)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 14px",
          }}>THE COST OF BEING UNDERBUILT</p>

          {/* Risk card */}
          <div style={{
            background: "rgba(0,0,0,0.32)",
            borderRadius: 6,
            padding: "16px 18px",
            marginBottom: 8,
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(255,255,255,0.78)",
              margin: "0 0 5px",
            }}>Audit failure + remediation</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.36)",
              lineHeight: 1.55,
              margin: "0 0 10px",
            }}>
              Deficiency findings, corrective action window, potential authority revocation
            </p>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 24,
              fontWeight: 500,
              color: "#D85A30",
              margin: 0,
              whiteSpace: "nowrap",
            }}>$10,000 – $25,000+</p>
          </div>

          {/* Versus */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.1em",
            textAlign: "center",
            margin: 0,
            padding: "7px 0 9px",
          }}>versus</p>

          {/* Solution card */}
          <div style={{
            background: "rgba(197,160,89,0.08)",
            border: "0.5px solid rgba(197,160,89,0.26)",
            borderRadius: 6,
            padding: "16px 18px",
            marginBottom: 28,
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#C5A059",
              margin: "0 0 5px",
            }}>LaunchPath Standard</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.55,
              margin: "0 0 10px",
            }}>
              90-day guided implementation — all five domains installed, verified, and audit-ready
            </p>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#C5A059",
              margin: 0,
            }}>Costs less than one audit failure</p>
          </div>

          {/* Label 2 */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            fontWeight: 500,
            color: "rgba(197,160,89,0.6)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 14px",
          }}>WHAT THE STANDARD INSTALLS</p>

          {/* Domain list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DOMAINS.map((d) => (
              <div key={d.num} style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}>
                <span style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: 11,
                  color: "rgba(197,160,89,0.55)",
                  width: 22,
                  flexShrink: 0,
                }}>{d.num}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.01em",
                }}>{d.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        /* Mobile — stack, right flows below */
        @media (max-width: 680px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-left {
            padding: 64px 28px 48px !important;
          }
          .hero-headline-line {
            font-size: 40px !important;
          }
          .proof-strip {
            display: none !important;
          }
          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
          .hero-right {
            border-left: none !important;
            border-top: 0.5px solid rgba(197,160,89,0.14) !important;
            padding: 40px 28px 56px !important;
          }
        }
        /* Mid tablet */
        @media (min-width: 681px) and (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr 220px !important;
          }
          .hero-left {
            padding: 80px 32px 64px 40px !important;
          }
          .hero-right {
            padding: 80px 22px 64px !important;
          }
          .hero-headline-line { font-size: 46px !important; }
        }
      `}</style>
    </section>
  );
}
