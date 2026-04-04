import React from "react";

export default function ReachRedirectView() {
  return (
    <div data-testid="g0-reach-redirect-view" style={{ maxWidth: 580 }}>
      <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        LP-MOD-G0 | WISDOM MODULE COMPLETE
      </p>
      <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#FFFFFF", marginBottom: "0.875rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        Ground 0 is complete.
      </h2>
      <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, maxWidth: 520, marginBottom: "2.5rem" }}>
        The wisdom module is established. Posture, stewardship, and consequence-awareness are framed.
      </p>
      <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", borderLeft: "3px solid rgba(212,144,10,0.50)", padding: "1.5rem 1.75rem", marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>
          YOUR NEXT STEP
        </p>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
          Readiness outcomes — GO, WAIT, and NO-GO — are determined by <strong style={{ color: "#FFFFFF" }}>REACH</strong>, the LaunchPath qualification engine. If you have not completed the REACH Assessment, complete it now to receive your outcome.
        </p>
        <a
          href="/reach-diagnostic"
          data-testid="g0-reach-cta"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#d4900a", color: "#000F1F", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 0.2s", minHeight: 48 }}
          onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
          onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
        >
          Complete the REACH Assessment &rarr;
        </a>
      </div>
      <a
        href="/admission"
        data-testid="g0-admission-secondary"
        style={{ display: "inline-block", color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.80)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
      >
        Already cleared by REACH? Request admission &rarr;
      </a>
    </div>
  );
}
