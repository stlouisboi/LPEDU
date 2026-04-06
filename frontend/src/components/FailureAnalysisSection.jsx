import { Link } from '../compat/Link';

const JBMONO = "'JetBrains Mono', monospace";
const SANS   = "'Inter', sans-serif";
const SERIF  = "'Newsreader', 'Playfair Display', serif";
const GOLD   = "#C5A059";
const RED    = "#c0392b";

const PANEL_BG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/rdc6bq8q_16deadly-sins-panel.png";

export default function FailureAnalysisSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fa-warn-blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100%     { opacity: 1; }
        }
        @keyframes fa-warn-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .fa-warn-dot-wrap {
          position: relative; width: 10px; height: 10px;
          flex-shrink: 0; display: flex; align-items: center; justify-content: center;
        }
        .fa-warn-dot-wrap::before {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: ${RED}; animation: fa-warn-ring 1.4s ease-out infinite;
        }
      `}} />

      <section
        id="sixteen-sins"
        role="img"
        aria-label="LaunchPath 16 Deadly Sins — FMCSA compliance failures that threaten new motor carrier authority"
        data-testid="failure-analysis-section"
        style={{
          background: `linear-gradient(rgba(5,8,14,0.90) 0%, rgba(5,8,14,0.94) 100%), url("${PANEL_BG}") center/cover no-repeat`,
          borderTop: "2px solid rgba(192,57,43,0.50)",
          borderBottom: "2px solid rgba(192,57,43,0.50)",
          padding: "4.5rem 1.5rem",
          position: "relative",
          boxShadow: "inset 0 3px 20px rgba(139,0,0,0.18), inset 0 -3px 20px rgba(139,0,0,0.18)",
        }}
      >
        {/* Blueprint grid + scan-line atmospheric overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "linear-gradient(rgba(192,57,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,0.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
        }} />

        {/* Corner HUD brackets */}
        {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
          <div key={i} style={{
            position: "absolute", width: 16, height: 16, pointerEvents: "none",
            borderTop:    i < 2  ? "2px solid rgba(192,57,43,0.45)" : "none",
            borderBottom: i >= 2 ? "2px solid rgba(192,57,43,0.45)" : "none",
            borderLeft:   (i === 0 || i === 2) ? "2px solid rgba(192,57,43,0.45)" : "none",
            borderRight:  (i === 1 || i === 3) ? "2px solid rgba(192,57,43,0.45)" : "none",
            ...pos, margin: 10,
          }} />
        ))}

        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* HUD badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", background: "linear-gradient(180deg,#200808,#120404)", border: "1px solid rgba(192,57,43,0.50)", padding: "0.35rem 0.75rem", marginBottom: "2rem" }}>
            <div className="fa-warn-dot-wrap">
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#e83a2a", animation: "fa-warn-blink 1.0s step-end infinite", position: "relative", zIndex: 1 }} />
            </div>
            <span style={{ fontFamily: JBMONO, fontSize: "0.600rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,90,70,0.88)" }}>CRITICAL FAILURE</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.600rem", color: "rgba(192,57,43,0.30)" }}>|</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.600rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(192,57,43,0.75)" }}>LP-CASE-001</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.600rem", color: "rgba(192,57,43,0.30)" }}>|</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.600rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(192,57,43,0.75)" }}>16 EXPOSURE PATTERNS</span>
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: RED, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "0.875rem" }}>
            The $19,246 Oversight
          </h2>

          {/* 3-stat strip */}
          <div style={{ display: "flex", gap: 0, marginBottom: "2rem", flexWrap: "wrap", border: "1px solid rgba(192,57,43,0.18)" }}>
            {[
              { label: "CARRIER TYPE",    value: "2-Truck Independent (Dry Van)", serif: false },
              { label: "TOTAL EXPOSURE",  value: "$19,246",                        serif: true  },
              { label: "OUTCOME",         value: "Authority Revoked — Day 15",     serif: false },
            ].map(({ label, value, serif }, i, arr) => (
              <div
                key={label}
                style={{
                  flex: "1 1 160px", padding: "1rem 1.5rem",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(192,57,43,0.18)" : "none",
                }}
              >
                <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(192,57,43,0.55)", margin: "0 0 0.35rem" }}>{label}</p>
                <p style={{ fontFamily: serif ? SERIF : SANS, fontWeight: serif ? 800 : 600, fontSize: serif ? "clamp(1.5rem, 3vw, 2rem)" : "0.938rem", color: serif ? RED : "rgba(245,245,245,0.82)", letterSpacing: serif ? "-0.03em" : 0, margin: 0, lineHeight: 1.1 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Border */}
          <div style={{ height: 1, background: "rgba(192,57,43,0.18)", marginBottom: "1.75rem" }} />

          {/* Compressed narrative */}
          <p style={{ fontFamily: SANS, fontSize: "0.975rem", color: "rgba(245,245,245,0.72)", lineHeight: 1.82, marginBottom: "1.75rem", maxWidth: 720 }}>
            Insurance was current. DOT filings were in order. A roadside inspection triggered a New Entrant Safety Audit. The investigator requested the Medical Examiner's Certificate for a driver hired in Month 2. The carrier had it — dated two days <em>after</em> the driver's first dispatch. Under{" "}
            <span style={{ fontFamily: JBMONO, fontSize: "0.80em", color: "rgba(245,245,245,0.45)" }}>49 CFR § 385.321</span>,
            {" "}dispatching an unqualified driver is an automatic failure. The authority was revoked 15 days later.
          </p>

          {/* AUTO vector — compact 2 rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem", maxWidth: 580 }}>
            <p style={{ fontFamily: JBMONO, fontSize: "0.575rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.28)", marginBottom: "0.5rem" }}>AUTO FAILURE VECTOR</p>
            {[
              { pass: true,  label: "Around — Intact", detail: "Insurance current. External filings correct." },
              { pass: false, label: "Through — Failed", detail: "DQ file incomplete. Certification dated after dispatch." },
            ].map(({ pass, label, detail }) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.625rem 0.875rem", background: pass ? "rgba(61,153,112,0.06)" : "rgba(192,57,43,0.07)", borderLeft: `2px solid ${pass ? "#3d9970" : RED}` }}>
                <span style={{ fontFamily: SANS, fontSize: "0.714rem", fontWeight: 700, color: pass ? "#3d9970" : RED, flexShrink: 0, marginTop: "0.1rem" }}>{pass ? "→" : "✗"}</span>
                <div>
                  <span style={{ fontFamily: JBMONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: pass ? "#3d9970" : RED }}>{label}</span>
                  <span style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(245,245,245,0.50)", marginLeft: "0.625rem" }}>{detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Italic kicker */}
          <p style={{ fontFamily: SANS, fontSize: "0.906rem", fontStyle: "italic", color: "rgba(245,245,245,0.38)", lineHeight: 1.65, marginBottom: "2rem" }}>
            One missing document. One unqualified driver. Automatic failure.
          </p>

          {/* Doctrinal divider */}
          <div style={{ height: 1, background: "linear-gradient(90deg, rgba(192,57,43,0.30), transparent)", marginBottom: "1.75rem" }} />

          {/* Doctrinal statement + link */}
          <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(200,147,63,0.75)", lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: 600 }}>
            This is one pattern. There are 16 of them. Each one reaches the authority a different way — around the guard, under it, through a missing control, or over a structure that was never strong enough to hold.
          </p>
          <Link
            to="/standards/16-deadly-sins"
            data-testid="failure-patterns-link"
            style={{
              fontFamily: JBMONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: GOLD, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              border: `1px solid ${GOLD}`, padding: "0.65rem 1.25rem",
              transition: "background 0.18s, color 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,147,63,0.12)"; e.currentTarget.style.color = "#e8a958"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
          >
            View the full 16 Deadly Sins breakdown →
          </Link>

        </div>
      </section>
    </>
  );
}


