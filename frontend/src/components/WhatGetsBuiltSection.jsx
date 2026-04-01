const GOLD  = "#C8933F";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const SANS  = "'Inter', sans-serif";
const SERIF = "'Newsreader', 'Playfair Display', serif";
const BODY  = "rgba(244,241,235,0.80)";

const BUILT_ITEMS = [
  { code: "01", item: "Driver qualification records brought into order" },
  { code: "02", item: "Drug and alcohol compliance installed in working form" },
  { code: "03", item: "HOS and record discipline made more visible" },
  { code: "04", item: "Maintenance documentation strengthened" },
  { code: "05", item: "Authority and insurance records kept in clearer condition" },
  { code: "06", item: "Responsibilities made more defined" },
  { code: "07", item: "Major gaps surfaced before pressure finds them first" },
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
          WHAT GETS BUILT<br />IN THE FIRST 90 DAYS
        </h2>

        {/* Mid Version Body */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 680, marginBottom: "0.875rem" }}>
          In the first 90 days, LaunchPath helps carriers install working systems for driver qualification, drug and alcohol compliance, HOS records, vehicle maintenance, and authority and insurance documentation.
        </p>
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: "rgba(244,241,235,0.60)", lineHeight: 1.85, maxWidth: 680, marginBottom: "3rem" }}>
          The goal is not more information. The goal is a guarded operation with clearer records, stronger controls, and less preventable exposure.
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

        {/* Day 1 vs Day 90 mini-band */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: "2.5rem", border: "1px solid rgba(200,147,63,0.14)" }} className="wgb-day-grid">
          {[
            {
              label: "DAY 1",
              accent: "rgba(192,57,43,0.60)",
              bg: "rgba(192,57,43,0.04)",
              border: "2px solid rgba(192,57,43,0.30)",
              copy: "The authority may be active, but the operation can still be exposed. Files may be incomplete. Controls may be weak. Responsibilities may be unclear. The carrier is moving, but not fully guarded.",
            },
            {
              label: "DAY 90",
              accent: "rgba(61,153,112,0.80)",
              bg: "rgba(61,153,112,0.04)",
              border: "2px solid rgba(61,153,112,0.25)",
              copy: "The operation is no longer being run from memory, panic, or assumption. Core records are more organized. Major gaps have been surfaced. Required controls are more visible. The guard is being installed in working form.",
            },
          ].map(({ label, accent, bg, border, copy }) => (
            <div key={label} style={{ padding: "1.5rem", background: bg, borderLeft: border }}>
              <p style={{ fontFamily: MONO, fontSize: "0.525rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, margin: "0 0 0.75rem" }}>{label}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.888rem", color: "rgba(244,241,235,0.62)", lineHeight: 1.75, margin: 0 }}>{copy}</p>
            </div>
          ))}
        </div>

        {/* FMCSA bridge line */}
        <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: "rgba(200,147,63,0.60)", lineHeight: 1.85, maxWidth: 620, margin: "0 0 1.5rem", borderLeft: "2px solid rgba(200,147,63,0.25)", paddingLeft: "1rem" }}>
          LaunchPath helps new carriers install the basic safety management controls FMCSA looks for in a New Entrant safety audit, so the authority is backed by structure, not guesswork.
        </p>

        {/* Closing note */}
        <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: "rgba(138,150,168,0.75)", lineHeight: 1.85, maxWidth: 600, fontStyle: "italic", margin: 0 }}>
          This is not a certification. It is a build. The authority is stronger than it was before the installation began. That is the measure.
        </p>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 600px) {
          .wgb-day-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
