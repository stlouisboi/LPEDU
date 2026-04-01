const GOLD  = "#C8933F";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";
const BODY  = "rgba(244,241,235,0.80)";

const BUILT_ITEMS = [
  { code: "01", item: "Required records more organized — driver files, maintenance logs, program documentation" },
  { code: "02", item: "Major gaps surfaced — the operation is not running on assumption anymore" },
  { code: "03", item: "Protective pillars installed in sequence — authority protection, insurance, compliance backbone, cash-flow" },
  { code: "04", item: "Clearer operating responsibilities — who owns what, when, and how" },
  { code: "05", item: "Stronger file discipline — documents are where they should be, in the format required" },
  { code: "06", item: "Less preventable exposure — the most common failure patterns have been addressed" },
  { code: "07", item: "Stronger audit-readiness posture — not finished, but no longer undefended" },
];

export default function WhatGetsBuiltSection() {
  return (
    <section
      data-testid="what-gets-built-section"
      style={{
        background: "#041020",
        backgroundImage: "radial-gradient(rgba(200,147,63,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        borderTop: "1px solid rgba(200,147,63,0.15)",
        borderBottom: "1px solid rgba(200,147,63,0.15)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Label */}
        <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", marginBottom: "1.25rem" }}>
          LP-BUILD-TRACK — 90-DAY INSTALLATION WINDOW
        </p>

        {/* Headline */}
        <h2 className="data-stream" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "1.5rem" }}>
          WHAT GETS BUILT<br />IN THE FIRST 90 DAYS.
        </h2>

        {/* Body */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 680, marginBottom: "0.875rem" }}>
          By the end of the build, the goal is not confidence talk. The goal is structure.
        </p>
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 680, marginBottom: "3rem" }}>
          Files are more organized. Controls are more visible. Responsibilities are clearer. Weak points are easier to spot. The authority is not being run from memory, panic, or assumption.
        </p>

        {/* Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(200,147,63,0.14)", marginBottom: "3rem" }}>
          {BUILT_ITEMS.map((b, i) => (
            <div
              key={b.code}
              data-testid={`built-item-${i}`}
              style={{
                display: "flex", gap: "1.5rem", alignItems: "flex-start",
                padding: "1.25rem 1.5rem",
                borderBottom: i < BUILT_ITEMS.length - 1 ? "1px solid rgba(200,147,63,0.10)" : "none",
                background: i % 2 === 0 ? "rgba(200,147,63,0.02)" : "transparent",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.12em", color: GOLD, flexShrink: 0, paddingTop: "0.2rem" }}>
                {b.code}
              </span>
              <span style={{ fontFamily: SANS, fontSize: "0.952rem", color: BODY, lineHeight: 1.7 }}>
                {b.item}
              </span>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: "rgba(138,150,168,0.75)", lineHeight: 1.85, maxWidth: 600, fontStyle: "italic", margin: 0 }}>
          This is not a certification. It is a build. The authority is stronger than it was before the installation began. That is the measure.
        </p>

      </div>
    </section>
  );
}
