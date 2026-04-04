import React from "react";

export default function ModuleOverviewCard({ moduleInfo, type }) {
  const mono = "'Inter', sans-serif";
  if (!moduleInfo) return null;

  const isRecovery = type === "recovery";
  const isExtension = type === "extension";
  const accentColor  = isRecovery ? "rgba(251,146,60,0.85)"  : isExtension ? "rgba(129,140,248,0.85)"  : "#d4900a";
  const accentBg     = isRecovery ? "rgba(251,146,60,0.07)"  : isExtension ? "rgba(99,102,241,0.07)"   : "rgba(212,144,10,0.05)";
  const accentBorder = isRecovery ? "rgba(251,146,60,0.22)"  : isExtension ? "rgba(99,102,241,0.22)"   : "rgba(212,144,10,0.16)";

  return (
    <div data-testid="module-overview-card">
      <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        LP-{moduleInfo.code} | {moduleInfo.title.toUpperCase()}
      </p>

      {(isRecovery || isExtension) && (
        <div style={{ display: "inline-block", background: accentBg, border: `1px solid ${accentBorder}`, padding: "0.25rem 0.875rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", color: accentColor, textTransform: "uppercase", margin: 0 }}>
            {isRecovery ? "RECOVERY MODULE — OPTIONAL" : "STANDARD EXTENSION — INCLUDED IN ENROLLMENT"}
          </p>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
        <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", letterSpacing: "-0.02em", margin: 0 }}>
          {moduleInfo.title}
        </h1>
        <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0 }}>
          {moduleInfo.lessonCount} LESSONS · {moduleInfo.duration}
        </span>
      </div>

      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.78, maxWidth: 580, marginBottom: "2.5rem" }}>
        {moduleInfo.description}
      </p>

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem", maxWidth: 560 }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
          KEY TOPICS — {moduleInfo.lessonCount} IMPLEMENTATION UNITS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {moduleInfo.topics.map((topic, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
              <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(212,144,10,0.55)", flexShrink: 0, paddingTop: "0.18rem", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.73)", lineHeight: 1.55 }}>
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div style={{ width: 7, height: 7, background: "rgba(212,144,10,0.45)", borderRadius: "50%", flexShrink: 0 }} />
        <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>
          COHORT DELIVERY SEQUENCE — YOUR FACILITATOR WILL ACTIVATE THIS MODULE
        </p>
      </div>
    </div>
  );
}
