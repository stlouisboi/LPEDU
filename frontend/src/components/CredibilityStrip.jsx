import { Link } from '../compat/Link';

const JBMONO  = "'JetBrains Mono', monospace";
const SERIF   = "'Newsreader', 'Playfair Display', serif";
const SANS    = "'Inter', sans-serif";
const GOLD    = "#C5A059";
const NAVY    = "#002244";
const PHOTO   = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/apm4exp9_Vince.png";

export default function CredibilityStrip() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .cred-section {
          background: #041020;
          background-image:
            linear-gradient(rgba(197,160,89,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.025) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .cred-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 5rem;
          align-items: start;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (max-width: 720px) {
          .cred-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .cred-id-card { max-width: 240px !important; }
        }

        @keyframes cred-led-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px ${GOLD}, 0 0 12px rgba(197,160,89,0.55); }
          50%       { opacity: 0.35; box-shadow: 0 0 2px ${GOLD}; }
        }
        .cred-auth-led {
          animation: cred-led-pulse 3s ease-in-out infinite;
        }
        /* Metallic sheen animation on the card */
        @keyframes cred-sheen {
          0%   { transform: translateX(-120%) skewX(-15deg); opacity: 0; }
          40%  { opacity: 0.18; }
          100% { transform: translateX(220%) skewX(-15deg); opacity: 0; }
        }
        .cred-id-card {
          position: relative;
          background: linear-gradient(170deg, #0c1e38 0%, #060f1e 100%);
          border: 1px solid rgba(197,160,89,0.30);
          box-shadow:
            inset 0 2px 6px rgba(0,0,0,0.60),
            inset 0 0 0 1px rgba(197,160,89,0.06),
            0 12px 40px rgba(0,0,0,0.55);
          overflow: hidden;
        }
        .cred-id-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, ${GOLD} 0%, rgba(197,160,89,0.40) 100%);
        }
        .cred-id-card::after {
          content: '';
          position: absolute;
          top: 0; left: -120%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
          transform: skewX(-15deg);
          animation: cred-sheen 2.8s ease-in-out 1.2s forwards;
          pointer-events: none; z-index: 5;
        }
        /* Metallic rivets */
        .cred-rivets {
          display: flex; justify-content: space-between;
          padding: 0 0.75rem; position: absolute;
          top: 44px; left: 0; right: 0;
          pointer-events: none; z-index: 4;
        }
        .cred-rivet {
          width: 7px; height: 7px; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4), #8a7a5a 60%, #5a4a2a);
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.15);
        }

        /* Short gold divider */
        .cred-name-divider {
          width: 64px;
          height: 1px;
          background: linear-gradient(90deg, ${GOLD}, transparent);
          margin: 1rem 0 1.5rem;
        }
      `}} />

      <section
        data-testid="credibility-strip"
        className="cred-section"
        style={{
          borderTop: "1px solid rgba(197,160,89,0.20)",
          borderBottom: "1px solid rgba(197,160,89,0.20)",
          padding: "6rem 1.5rem",
        }}
      >
        <div className="cred-layout">

          {/* ── LEFT: Clearance ID card ── */}
          <div className="cred-id-card">
            {/* Metallic rivets */}
            <div className="cred-rivets">
              <div className="cred-rivet" />
              <div className="cred-rivet" />
            </div>

            {/* Header bar */}
            <div style={{ padding: "0.625rem 1rem", borderBottom: "1px solid rgba(197,160,89,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: JBMONO, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)" }}>AUTHORIZED PERSONNEL</span>
              <div className="cred-auth-led" style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, boxShadow: `0 0 5px ${GOLD}` }} />
            </div>

            {/* Photo */}
            <div style={{ overflow: "hidden", background: "#030c18" }}>
              <img
                src={PHOTO}
                alt="Vince Lawrence — Station Custodian, LaunchPath Transportation EDU, FMCSA compliance specialist"
                width={238}
                height={326}
                style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(15%) contrast(1.05)", transition: "transform 0.4s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>

            {/* Footer */}
            <div style={{ padding: "0.875rem 1rem", borderTop: "1px solid rgba(197,160,89,0.15)", background: "linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.45))" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                <p style={{ fontFamily: JBMONO, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.50)", margin: 0 }}>CUSTODIAN-ID: VL-001</p>
                <div style={{ display: "flex", gap: 3 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 10, background: i === 2 ? GOLD : "rgba(197,160,89,0.25)" }} />)}
                </div>
              </div>
              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.05rem", color: "#F5F5F5", margin: 0, lineHeight: 1.2 }}>Vince Lawrence</p>
            </div>
          </div>

          {/* ── RIGHT: Authority content ── */}
          <div>

            {/* Section identifier */}
            <p style={{ fontFamily: JBMONO, fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(197,160,89,0.45)", margin: "0 0 1.25rem" }}>
              LP-FOUNDER-001
            </p>

            {/* Section heading */}
            <p style={{ fontFamily: SANS, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.65)", margin: "0 0 1rem", maxWidth: 460, lineHeight: 1.6 }}>
              BUILT BY SOMEONE WHO HAS WATCHED THIS BREAK IN THE REAL WORLD
            </p>

            {/* Name */}
            <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#F5F5F5", letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>
              Vince Lawrence
            </h2>

            {/* Short gold divider */}
            <div className="cred-name-divider" />

            {/* Mid Version founder copy */}
            <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(245,245,245,0.72)", lineHeight: 1.85, margin: "0 0 2rem", maxWidth: 520 }}>
              LaunchPath was built by Vince Lawrence, a U.S. Navy veteran and OSHA-certified safety professional with 25+ years in leadership, safety-based operations, and regulated environments. The system was built from real exposure to how operations break when structure comes late and controls stay weak.
            </p>

            {/* Credential grid — 2×2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem 1.5rem", marginBottom: "2.25rem" }}>
              {[
                { code: "LP-CRED-01", label: "U.S. Navy Veteran" },
                { code: "LP-CRED-02", label: "OSHA-Certified Safety Professional" },
                { code: "LP-CRED-03", label: "25+ Years in Leadership and Safety-Based Operations" },
                { code: "LP-CRED-04", label: "Founder, LaunchPath Transportation EDU" },
              ].map(({ code, label }) => (
                <div key={code} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, flexShrink: 0, boxShadow: `0 0 4px ${GOLD}`, marginTop: "0.35rem" }} />
                  <div>
                    <p style={{ fontFamily: JBMONO, fontSize: "0.525rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(197,160,89,0.50)", textTransform: "uppercase", margin: 0 }}>{code}</p>
                    <p style={{ fontFamily: SANS, fontSize: "0.825rem", fontWeight: 600, color: "rgba(245,245,245,0.78)", margin: 0, lineHeight: 1.4 }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Signature line */}
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.15rem", color: GOLD, lineHeight: 1.65, margin: "0 0 1.75rem", maxWidth: 480 }}>
              I don't do your compliance. I built the system so you can do it yourself.
            </p>

            {/* Link to founder page */}
            <Link
              to="/founder"
              data-testid="credibility-founder-link"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.45)", textDecoration: "none", transition: "color 0.15s", display: "inline-flex", alignItems: "center", minHeight: "44px" }}
              onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(197,160,89,0.45)"; }}
            >
              Read the full story →
            </Link>

          </div>
        </div>
      </section>
    </>
  );
}
