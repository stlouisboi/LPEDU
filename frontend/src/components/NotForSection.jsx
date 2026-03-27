const GOLD  = "#C8933F";
const NAVY  = "#1B2A47";
const BODY  = "rgba(244,241,235,0.78)";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";

const STATEMENTS = [
  "LaunchPath is not for carriers waiting for the first violation to act.",
  "LaunchPath is not for operators who want someone else to manage compliance on their behalf.",
  "LaunchPath is not for carriers running on optimism instead of documented systems.",
  "LaunchPath is not for anyone who believes federal auditors will overlook incomplete files.",
];

const EMERGENCY_BG = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/4923lix7_lp-std-002-emergency.png";

export default function NotForSection() {
  return (
    <section
      id="not-for"
      data-testid="not-for-section"
      style={{
        background: `linear-gradient(rgba(14,24,41,0.88) 0%, rgba(14,24,41,0.92) 100%), url("${EMERGENCY_BG}") center 40%/cover no-repeat`,
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
        <h2 className="data-stream" style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.75rem, 4.5vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "3rem" }}>
          THIS IS NOT FOR EVERYONE.
        </h2>

        {/* Four statements — System Rails */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "3rem" }}>
          {STATEMENTS.map((s, i) => (
            <div key={i} style={{ position: "relative", paddingBottom: i < STATEMENTS.length - 1 ? 0 : undefined }}>
              {/* Statement row */}
              <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
                {/* Rail + node column */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24, flexShrink: 0, paddingTop: "1.25rem" }}>
                  {/* Node */}
                  <div style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${GOLD}`, background: "rgba(200,147,63,0.15)", boxShadow: `0 0 6px rgba(200,147,63,0.35)`, flexShrink: 0, zIndex: 2 }} />
                  {/* Rail line down */}
                  {i < STATEMENTS.length - 1 && (
                    <div style={{ width: 1.5, flex: 1, background: `linear-gradient(180deg, ${GOLD} 0%, rgba(200,147,63,0.15) 100%)`, minHeight: 32 }} />
                  )}
                </div>
                {/* Statement */}
                <div style={{ borderLeft: `2px solid rgba(200,147,63,0.30)`, paddingLeft: "1.25rem", paddingTop: "1rem", paddingBottom: "1rem", flex: 1 }}>
                  <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.8, margin: 0 }}>
                    {s}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom terminal node */}
          <div style={{ display: "flex", gap: 0, alignItems: "center", paddingLeft: 7 }}>
            <div style={{ width: 10, height: 10, background: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
          </div>
        </div>

        {/* Closing line — Ground 0 second mention, no CTA */}
        <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(138,150,168,0.85)", lineHeight: 1.8, maxWidth: 680, margin: 0 }}>
          If you are not sure which category you are in, Ground 0 answers that question before you commit to anything.
        </p>

      </div>
    </section>
  );
}
