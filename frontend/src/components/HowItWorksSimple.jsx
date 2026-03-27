import { Link } from '../compat/Link';

const JBMONO = "'JetBrains Mono', monospace";
const GOLD   = "#C5A059";

const STEPS = [
  { num: "STEP 1", label: "COMPLETE GROUND 0",           desc: "Run the readiness diagnostic. See where your operation stands and what gaps are exposed." },
  { num: "STEP 2", label: "IDENTIFY COMPLIANCE GAPS",    desc: "Receive your findings brief. Understand what's missing and what needs to be built first." },
  { num: "STEP 3", label: "INSTALL THE SYSTEM",          desc: "Build your compliance infrastructure in sequence across the first 90 days of authority." },
  { num: "STEP 4", label: "CONTINUE UNDER THE STANDARD", desc: "Maintain system integrity through the 18-month New Entrant monitoring window with the Continuity Standard." },
];

export default function HowItWorksSimple() {
  return (
    <>
      <style>{`
        .hiw-section {
          background: #040d1a;
          background-image:
            linear-gradient(rgba(197,160,89,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.03) 1px, transparent 1px);
          background-size: 18px 18px;
        }

        .hiw-rail {
          position: relative;
          height: 1px;
          background: rgba(197,160,89,0.18);
          margin: 3rem 0;
        }
        .hiw-rail::before, .hiw-rail::after {
          content: '';
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 6px; height: 6px;
          border: 1px solid rgba(197,160,89,0.45);
          background: #040d1a;
        }
        .hiw-rail::before { left: 0; }
        .hiw-rail::after  { right: 0; }

        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
          margin-bottom: 0;
        }
        @media (max-width: 900px) { .hiw-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .hiw-grid { grid-template-columns: 1fr !important; } }

        .hiw-card {
          border: 1px solid rgba(197,160,89,0.12);
          margin: -1px 0 0 -1px;
          padding: 2rem 1.75rem;
          position: relative;
          background: linear-gradient(170deg, rgba(255,255,255,0.016) 0%, rgba(0,0,0,0.25) 100%);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(197,160,89,0.05);
          overflow: hidden;
        }
        .hiw-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(197,160,89,0.55), transparent);
        }
        .hiw-card:hover { background: linear-gradient(170deg, rgba(197,160,89,0.04) 0%, rgba(0,0,0,0.20) 100%); }

        /* Physical switch indicator */
        .hiw-switch {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 1rem;
        }
        .hiw-switch-track {
          width: 28px; height: 14px;
          background: rgba(197,160,89,0.12);
          border: 1px solid rgba(197,160,89,0.30);
          border-radius: 2px;
          position: relative;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
          flex-shrink: 0;
        }
        .hiw-switch-track::after {
          content: '';
          position: absolute;
          top: 2px; left: 2px;
          width: 8px; height: 8px;
          background: ${GOLD};
          border-radius: 1px;
          box-shadow: 0 0 4px rgba(197,160,89,0.5);
        }
        .hiw-step-num {
          font-family: ${JBMONO};
          font-size: 0.614rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(197,160,89,0.55);
        }
        .hiw-connector {
          position: absolute;
          top: 0; right: -1px;
          width: 1px; height: 100%;
          background: rgba(197,160,89,0.12);
        }
        .hiw-step-bg-num {
          position: absolute;
          bottom: -0.5rem; right: 1rem;
          font-family: ${JBMONO};
          font-size: 4rem;
          font-weight: 700;
          color: rgba(197,160,89,0.04);
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      <section
        data-testid="how-it-works-simple"
        className="hiw-section"
        style={{
          borderTop: "1px solid rgba(197,160,89,0.14)",
          borderBottom: "1px solid rgba(197,160,89,0.14)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(180deg,#0e1f38,#060f1e)", border: "1px solid rgba(197,160,89,0.25)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 2px 2px 6px rgba(0,0,0,0.5)", padding: "0.35rem 0.875rem", marginBottom: "3rem" }}>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.70)" }}>LP-STD-001</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", color: "rgba(197,160,89,0.25)" }}>|</span>
            <span style={{ fontFamily: JBMONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.70)" }}>HOW IT WORKS</span>
          </div>

          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#F5F5F5", letterSpacing: "-0.025em", lineHeight: 1.08, marginBottom: "0.5rem" }}>
            The Installation Sequence
          </h2>

          <div className="hiw-rail" />

          <div className="hiw-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="hiw-card" data-testid={`step-card-${i + 1}`}>
                <div className="hiw-step-bg-num">{i + 1}</div>
                {i < STEPS.length - 1 && <div className="hiw-connector" />}
                <div className="hiw-switch">
                  <div className="hiw-switch-track" />
                  <span className="hiw-step-num">{s.num}</span>
                </div>
                <p style={{ fontFamily: JBMONO, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: GOLD, lineHeight: 1.3, marginBottom: "1rem" }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(245,245,245,0.60)", lineHeight: 1.78, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="hiw-rail" style={{ marginTop: "3rem", marginBottom: "2rem" }} />

          <Link
            to="/operating-standard"
            data-testid="see-standard-link"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(197,160,89,0.80)", textDecoration: "none", borderBottom: "1px solid rgba(197,160,89,0.25)", paddingBottom: "2px", letterSpacing: "0.02em", transition: "color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(197,160,89,0.80)"; }}
          >
            See the full Standard →
          </Link>

        </div>
      </section>
    </>
  );
}
