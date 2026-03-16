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

      {/* Ambient background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(197,160,89,0.11) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          animation: "dotDrift 22s linear infinite",
        }} />
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.2) 50%, transparent 100%)",
          animation: "scanLine 9s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)",
        }} />
      </div>

      {/* Main grid */}
      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          alignItems: "start",
        }}
      >

        {/* ── LEFT COLUMN ── */}
        <div style={{ padding: "100px 44px 80px 56px" }}>

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
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.75,
            maxWidth: 480,
            marginBottom: 36,
          }}>
            Most carriers focus on loads first. FMCSA is already watching.{" "}
            <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
              What you build in the first 90 days decides what FMCSA finds between Month 9 and Month 18.
            </span>
            {" "}Authority failure is rarely caused by lack of effort — it is caused by missing operational infrastructure.
          </p>

          {/* Proof strip */}
          <div
            className="proof-strip"
            style={{
              display: "flex",
              border: "0.5px solid rgba(197,160,89,0.22)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 40,
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

          {/* CTA row */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <Link
              to="/ground-0-briefing"
              data-testid="hero-primary-cta"
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
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.48)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
            >
              See what the standard installs →
            </Link>
          </div>

        </div>

        {/* ── RIGHT COLUMN (280px) ── */}
        <div style={{
          borderLeft: "0.5px solid rgba(197,160,89,0.14)",
          padding: "100px 28px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>

          {/* Label 1 */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            fontWeight: 500,
            color: "rgba(197,160,89,0.6)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: 0,
          }}>THE COST OF BEING UNDERBUILT</p>

          {/* Risk card */}
          <div style={{
            background: "rgba(0,0,0,0.32)",
            borderRadius: 6,
            padding: "15px 16px",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.78)",
              margin: "0 0 6px",
            }}>Audit failure + remediation</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.36)",
              lineHeight: 1.5,
              margin: "0 0 10px",
            }}>
              Deficiency findings, corrective action window, potential authority revocation
            </p>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 21,
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
          }}>versus</p>

          {/* Solution card */}
          <div style={{
            background: "rgba(197,160,89,0.08)",
            border: "0.5px solid rgba(197,160,89,0.26)",
            borderRadius: 6,
            padding: "15px 16px",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "#C5A059",
              margin: "0 0 6px",
            }}>LaunchPath Standard</p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.5,
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
            margin: 0,
          }}>WHAT THE STANDARD INSTALLS</p>

          {/* Domain list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {DOMAINS.map((d) => (
              <div key={d.num} style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
              }}>
                <span style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: 10,
                  color: "rgba(197,160,89,0.5)",
                  width: 20,
                  flexShrink: 0,
                }}>{d.num}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.58)",
                }}>{d.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > div:first-child {
            padding: 64px 28px 56px !important;
          }
          .hero-grid > div:last-child { display: none !important; }
          .hero-headline-line { font-size: 40px !important; }
          .proof-strip { max-width: 100% !important; }
        }
        @media (min-width: 681px) and (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr 220px !important;
          }
          .hero-grid > div:first-child {
            padding: 80px 32px 64px 40px !important;
          }
          .hero-grid > div:last-child {
            padding: 80px 20px 64px !important;
          }
          .hero-headline-line { font-size: 46px !important; }
        }
      `}</style>
    </section>
  );
}
