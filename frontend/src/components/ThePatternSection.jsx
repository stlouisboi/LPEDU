import { Link } from '../compat/Link';

const GOLD  = "#C8933F";
const NAVY  = "#1B2A47";
const DEEP  = "#111D33";
const SLATE = "#8A96A8";
const BODY  = "rgba(244,241,235,0.82)";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";

const OWNER_WHEEL_BG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/5anp3im9_hero-owner-wheel.png";

export default function ThePatternSection() {
  return (
    <section
      id="the-pattern"
      data-testid="the-pattern-section"
      style={{
        background: `linear-gradient(rgba(8,13,24,0.85) 0%, rgba(8,13,24,0.90) 100%), url("${OWNER_WHEEL_BG}") center 30%/cover no-repeat`,
        borderTop: "1px solid rgba(200,147,63,0.15)",
        borderBottom: "1px solid rgba(200,147,63,0.15)",
        padding: "6rem 1.5rem",
        boxShadow: "inset 0 6px 24px rgba(0,0,0,0.70), inset 0 -6px 24px rgba(0,0,0,0.70)",
      }}
    >
      {/* Corner screws — recessed panel aesthetic */}
      <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
        {[{top:0,left:0},{top:0,right:0}].map((pos,i) => (
          <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18), #3a3a3a 60%, #1a1a1a)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.06)", ...pos, marginTop: "-1.5rem" }} />
        ))}

        {/* Label */}
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", marginBottom: "1.75rem" }}>
          THE PATTERN
        </p>

        {/* Headline */}
        <h2 className="data-stream" style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "2.5rem" }}>
          I'VE WATCHED THIS FAIL<br />200 TIMES.
        </h2>

        {/* Body copy */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "1.5rem", maxWidth: 760 }}>
          New carriers don't fail because they can't drive or can't find freight. They fail because the system was never installed.
        </p>

        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "1.5rem", maxWidth: 760 }}>
          No one showed them that an incomplete Driver Qualification file is an automatic audit failure. That a Drug &amp; Alcohol program that doesn't meet federal specs disqualifies every driver in it retroactively. That maintenance records aren't optional — they're the proof.
        </p>

        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "1.5rem", maxWidth: 760 }}>
          These aren't edge cases. They're the same 16 failure patterns, repeating in month 6, month 9, month 14.
        </p>

        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "1.5rem", maxWidth: 760 }}>
          By then the insurance is cancelled. The authority is revoked. The restart costs $40,000.
        </p>

        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "3rem", maxWidth: 760, fontStyle: "italic" }}>
          Failure here is structural, not personal. The system either exists or it doesn't.
        </p>

        {/* Ground 0 callout — first mention */}
        <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: "1.5rem", marginBottom: "3rem", maxWidth: 680 }}>
          <p style={{ fontFamily: SANS, fontSize: "1.064rem", fontStyle: "italic", color: GOLD, lineHeight: 1.8, margin: 0 }}>
            Ground 0 was built to stop that — before you file, before you spend, before the clock starts.
          </p>
        </div>

        {/* Link to 16 Deadly Sins */}
        <a
          href="#sixteen-sins"
          data-testid="sixteen-sins-link"
          style={{ fontFamily: MONO, fontSize: "0.806rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#e8a958"}
          onMouseLeave={e => e.currentTarget.style.color = GOLD}
        >
          SEE THE 16 EXPOSURE PATTERNS →
        </a>

      </div>  {/* close inner relative div */}
    </section>
  );
}
