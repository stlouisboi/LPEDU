import { Link } from '../compat/Link';

const JBMONO = "'JetBrains Mono', monospace";
const GOLD   = "#C5A059";

const LABEL_STYLE = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.714rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  marginBottom: "0.625rem",
};

const BODY_STYLE = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.938rem",
  color: "rgba(245,245,245,0.72)",
  lineHeight: 1.82,
  margin: "0 0 1.5rem",
};

const PANEL_BG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/rdc6bq8q_16deadly-sins-panel.png";

export default function FailureAnalysisSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fa-warn-blink {
          0%, 45% { opacity: 1; box-shadow: 0 0 8px 2px #c0392b; }
          50%, 95% { opacity: 0; box-shadow: none; }
          100% { opacity: 1; box-shadow: 0 0 8px 2px #c0392b; }
        }
        @keyframes fa-warn-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .fa-warn-dot-wrap {
          position: relative;
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fa-warn-dot-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #c0392b;
          animation: fa-warn-ring 1.4s ease-out infinite;
        }
        .fa-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 880px) {
          .fa-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        .fa-rail {
          position: relative;
          height: 1px;
          background: rgba(139,47,47,0.40);
          margin: 2rem 0;
        }
        .fa-rail::before, .fa-rail::after {
          content: '';
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 6px; height: 6px;
          border: 1px solid rgba(192,57,43,0.55);
          background: #070c14;
        }
        .fa-rail::before { left: 0; }
        .fa-rail::after  { right: 0; }
      `}} />

      <section
        id="sixteen-sins"
        data-testid="failure-analysis-section"
        style={{
          background: `linear-gradient(rgba(5,8,14,0.87) 0%, rgba(5,8,14,0.92) 100%), url("${PANEL_BG}") center/cover no-repeat`,
          borderTop: "2px solid rgba(192,57,43,0.55)",
          borderBottom: "2px solid rgba(192,57,43,0.55)",
          padding: "6rem 1.5rem",
          position: "relative",
          boxShadow: "inset 0 4px 30px rgba(139,0,0,0.25), inset 0 -4px 30px rgba(139,0,0,0.25)",
        }}
      >
        {/* Corner HUD brackets */}
        {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
          <div key={i} style={{
            position: "absolute", width: 20, height: 20, pointerEvents: "none",
            borderTop: i < 2 ? "2px solid rgba(192,57,43,0.55)" : "none",
            borderBottom: i >= 2 ? "2px solid rgba(192,57,43,0.55)" : "none",
            borderLeft: (i === 0 || i === 2) ? "2px solid rgba(192,57,43,0.55)" : "none",
            borderRight: (i === 1 || i === 3) ? "2px solid rgba(192,57,43,0.55)" : "none",
            ...pos, margin: 12,
          }} />
        ))}
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Critical Failure HUD ID plate */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", background: "linear-gradient(180deg,#200808,#120404)", border: "1px solid rgba(192,57,43,0.55)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 2px 2px 12px rgba(0,0,0,0.7), 0 0 20px rgba(192,57,43,0.15)", padding: "0.45rem 0.875rem", marginBottom: "2.5rem" }}>
            <div className="fa-warn-dot-wrap"><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e83a2a", boxShadow: "0 0 6px rgba(232,58,42,0.8)", animation: "fa-warn-blink 1.0s step-end infinite", position: "relative", zIndex: 1 }} /></div>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,90,70,0.90)" }}>CRITICAL FAILURE</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", color: "rgba(192,57,43,0.35)" }}>|</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(192,57,43,0.80)" }}>LP-CASE-001</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", color: "rgba(192,57,43,0.35)" }}>|</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(192,57,43,0.80)" }}>16 EXPOSURE PATTERNS</span>
          </div>

          <div className="fa-grid">

            {/* ── LEFT: Case narrative ── */}
            <div>
              <h2 className="data-stream" style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: "#c0392b", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
                The $19,246 Oversight
              </h2>

              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)", paddingBottom: "1.25rem", marginBottom: "1.75rem", borderBottom: "1px solid rgba(139,47,47,0.20)" }}>
                2-Truck Independent (Dry Van)&nbsp;&nbsp;·&nbsp;&nbsp;7 Months Active&nbsp;&nbsp;·&nbsp;&nbsp;
                <span style={{ color: "#8b2f2f" }}>Authority Revoked</span>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(245,245,245,0.30)" }}>The Incident</p>
                <p style={BODY_STYLE}>A clean roadside inspection triggered a New Entrant Safety Audit. Insurance filings were current. DOT numbers were in order. The carrier expected a routine review.</p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(200,60,60,0.70)" }}>The Failure</p>
                <p style={BODY_STYLE}>During the audit, the investigator requested the Medical Examiner's Certificate for a driver hired in Month 2. The carrier had it. It was dated two days <em>after</em> the driver's first dispatch.</p>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(200,60,60,0.70)" }}>The Result</p>
                <p style={{ ...BODY_STYLE, marginBottom: 0 }}>Under <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85em", color: "rgba(245,245,245,0.55)" }}>49 CFR § 385.321</span>, dispatching an unqualified driver is an automatic failure. The authority was revoked 15 days later.</p>
              </div>

              {/* Warning HUD — Total Exposure */}
              <div style={{ position: "relative", background: "rgba(139,47,47,0.10)", border: "1px solid rgba(139,47,47,0.40)", borderLeft: "3px solid #c0392b", padding: "1.25rem 1.5rem", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.40), 0 0 20px rgba(192,57,43,0.08)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, #c0392b, transparent)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div className="fa-warn-dot-wrap"><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c0392b", animation: "fa-warn-blink 1.4s step-end infinite", position: "relative", zIndex: 1 }} /></div>
                  <p style={{ ...LABEL_STYLE, color: "rgba(200,60,60,0.65)", margin: 0 }}>TOTAL EXPOSURE — CRITICAL</p>
                </div>
                <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#c0392b", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "0.625rem" }}>$19,246</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(245,245,245,0.48)", lineHeight: 1.7, margin: 0 }}>Loss of revenue, insurance policy cancellation, reapplication fees, and six weeks of downtime.</p>
              </div>
            </div>

            {/* ── RIGHT: Analysis ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              <div style={{ background: "linear-gradient(170deg,rgba(255,255,255,0.016) 0%,rgba(0,0,0,0.25) 100%)", border: "1px solid rgba(245,245,245,0.07)", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.55)", padding: "1.75rem" }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(245,245,245,0.35)", marginBottom: "1.25rem" }}>AUTO Failure Vector</p>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", paddingBottom: "1rem", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "#3d9970", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>→</span>
                  <div>
                    <p style={{ ...LABEL_STYLE, color: "#3d9970", marginBottom: "0.25rem" }}>Around — Intact</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(245,245,245,0.55)", lineHeight: 1.65, margin: 0 }}>Insurance was current. All external filings in order.</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "#c0392b", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>✗</span>
                  <div>
                    <p style={{ ...LABEL_STYLE, color: "#c0392b", marginBottom: "0.25rem" }}>Through — Failed</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(245,245,245,0.55)", lineHeight: 1.65, margin: 0 }}>Compliance backbone not installed. Driver Qualification File incomplete.</p>
                  </div>
                </div>

                <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(245,245,245,0.35)", lineHeight: 1.6, fontStyle: "italic" }}>
                  One missing document. One unqualified driver. Automatic failure.
                </div>
              </div>

              <div style={{ background: "rgba(197,160,89,0.05)", border: "1px solid rgba(197,160,89,0.18)", borderLeft: "3px solid rgba(197,160,89,0.55)", padding: "1.75rem", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.40)" }}>
                <p style={{ ...LABEL_STYLE, color: GOLD, marginBottom: "1rem" }}>What the Standard Installs</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.90rem", color: "rgba(245,245,245,0.65)", lineHeight: 1.78, margin: 0 }}>
                  The Driver Qualification File system in Module 3 requires Medical Examiner's Certificate verification <em>before</em> dispatch authorization. The DQ File Checklist blocks this failure at the source.
                </p>
              </div>

              <Link
                to="/standards/16-deadly-sins"
                data-testid="failure-patterns-link"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.55)", textDecoration: "none", transition: "color 0.15s", display: "inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(197,160,89,0.55)"; }}
              >
                View more failure patterns →
              </Link>

            </div>
          </div>

        </div>  {/* close maxWidth inner */}
      </section>
    </>
  );
}


