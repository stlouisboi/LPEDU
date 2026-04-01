const GOLD  = "#C8933F";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";
const BODY  = "rgba(244,241,235,0.78)";

const FOR_ITEMS = [
  "you want to protect your authority early — before pressure teaches you what should have been installed",
  "you are willing to face what is missing without softening the answer",
  "you want structure, not guesswork — files, records, controls, and sequence",
  "you want to build the operation right before scaling it",
  "you are serious enough to follow a standard, not improvise around one",
];

const NOT_FOR_ITEMS = [
  "you want someone to make you feel ready without checking the gaps",
  "you are looking for hype, speed, or easy answers",
  "you do not want to deal with the paperwork, discipline, or sequence this takes",
  "you want growth before structure",
];

const EMERGENCY_BG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/4923lix7_lp-std-002-emergency.png";

export default function NotForSection() {
  return (
    <section
      id="not-for"
      data-testid="not-for-section"
      style={{
        background: `linear-gradient(rgba(14,24,41,0.90) 0%, rgba(14,24,41,0.94) 100%), url("${EMERGENCY_BG}") center 40%/cover no-repeat`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(200,147,63,0.20)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Label */}
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", marginBottom: "1.75rem" }}>
          ADMISSION CRITERIA
        </p>

        {/* Headline */}
        <h2 className="data-stream" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.75rem, 4.5vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "1.25rem" }}>
          THIS IS NOT FOR EVERYONE.
        </h2>

        {/* Opening */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.8, maxWidth: 680, marginBottom: "3rem" }}>
          LaunchPath is for carriers who want order, not shortcuts.
        </p>

        {/* Two-column qualifier layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "3rem" }}>

          {/* FOR YOU IF */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 3, height: 20, background: GOLD, flexShrink: 0 }} />
              <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, margin: 0 }}>
                IT IS FOR YOU IF
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {FOR_ITEMS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", padding: "0.875rem 0", borderBottom: i < FOR_ITEMS.length - 1 ? "1px solid rgba(200,147,63,0.08)" : "none" }}>
                  <span style={{ color: GOLD, fontFamily: MONO, fontSize: "0.857rem", flexShrink: 0, marginTop: "0.1rem", fontWeight: 700 }}>✓</span>
                  <span style={{ fontFamily: SANS, fontSize: "0.952rem", color: BODY, lineHeight: 1.72 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NOT FOR YOU IF */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 3, height: 20, background: "rgba(192,57,43,0.70)", flexShrink: 0 }} />
              <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(192,57,43,0.70)", margin: 0 }}>
                IT IS NOT FOR YOU IF
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {NOT_FOR_ITEMS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", padding: "0.875rem 0", borderBottom: i < NOT_FOR_ITEMS.length - 1 ? "1px solid rgba(192,57,43,0.08)" : "none" }}>
                  <span style={{ color: "rgba(192,57,43,0.70)", fontFamily: MONO, fontSize: "0.857rem", flexShrink: 0, marginTop: "0.1rem", fontWeight: 700 }}>✕</span>
                  <span style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(244,241,235,0.60)", lineHeight: 1.72 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Closing line */}
        <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(138,150,168,0.80)", lineHeight: 1.8, maxWidth: 600, margin: 0 }}>
          If you are not sure where you stand, REACH answers that question without softening the result.
        </p>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 640px) {
          #not-for .not-for-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
