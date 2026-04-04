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
        position: "relative",
        background: `linear-gradient(rgba(8,13,24,0.85) 0%, rgba(8,13,24,0.90) 100%), url("${OWNER_WHEEL_BG}") center 30%/cover no-repeat`,
        borderTop: "1px solid rgba(200,147,63,0.15)",
        borderBottom: "1px solid rgba(200,147,63,0.15)",
        padding: "6rem 1.5rem",
        overflow: "hidden",
        boxShadow: "inset 0 6px 24px rgba(0,0,0,0.70), inset 0 -6px 24px rgba(0,0,0,0.70)",
      }}
    >
      {/* Blueprint line grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(197,160,89,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.04) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />
      {/* CRT scan-line overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
      }} />
      {/* Corner screws — recessed panel aesthetic */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
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
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "1.5rem", maxWidth: 720 }}>
          A carrier gets authority. They start moving. The paperwork looks mostly done. The operation feels close enough. Then pressure shows up.
        </p>

        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "1.5rem", maxWidth: 720 }}>
          A file is incomplete. A required program was never fully installed. A maintenance record is missing. Insurance continuity gets shaky. Nothing looked urgent until it was expensive.
        </p>

        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "1.5rem", maxWidth: 720 }}>
          Most early failures do not come from one dramatic event. They come from small unguarded gaps that were allowed to stay in place too long. Month 6. Month 9. Month 14. By then the insurance is cancelled. The authority is revoked. The restart costs $40,000.
        </p>

        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.9, marginBottom: "3rem", maxWidth: 720, fontStyle: "italic" }}>
          Failure here is structural, not personal. The guard either exists or it doesn't.
        </p>

        {/* Doctrine callout */}
        <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: "1.5rem", marginBottom: "3rem", maxWidth: 680 }}>
          <p style={{ fontFamily: SANS, fontSize: "1.064rem", fontStyle: "italic", color: GOLD, lineHeight: 1.8, margin: 0 }}>
            LaunchPath was built to stop that pattern — before the gaps become damage, before the records become evidence, before the pressure finds what is missing.
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
