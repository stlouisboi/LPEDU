import React from "react";
import { ArrowRight } from "@phosphor-icons/react";

const MODULE_ROADMAP = [
  { code: "MOD-1", name: "Driver Qualification File", tag: "HARD GATE", tagColor: "rgba(239,68,68,0.75)", desc: "Build the complete, audit-ready DQF for every operating driver" },
  { code: "MOD-2", name: "Authority & Insurance", tag: null, desc: "Install your authority monitoring and insurance continuity systems" },
  { code: "MOD-3", name: "The 16 Deadly Sins", tag: null, desc: "Map and eliminate the 16 documented FMCSA violation patterns" },
  { code: "MOD-4", name: "Drug & Alcohol Program", tag: null, desc: "Install the federal D&A compliance program and Clearinghouse enrollment" },
  { code: "MOD-5", name: "Hours of Service & Dispatch", tag: null, desc: "Build the HOS compliance framework and dispatch records system" },
  { code: "MOD-6", name: "Integrity Audit", tag: "CREDENTIAL GATE", tagColor: "rgba(212,144,10,0.85)", desc: "Full four-pillar system review — clean audit triggers Verified Registry ID" },
  { code: "MOD-7", name: "Post-Audit Recovery", tag: "CONDITIONAL", tagColor: "rgba(251,146,60,0.75)", desc: "Activated only if your audit produces a conditional outcome" },
  { code: "MOD-8", name: "ELD Compliance", tag: "EXTENSION", tagColor: "rgba(129,140,248,0.75)", desc: "Full ELD mandate, exemption, and malfunction compliance" },
  { code: "MOD-9", name: "Hazmat Decisions", tag: "EXTENSION", tagColor: "rgba(129,140,248,0.75)", desc: "Hazmat threshold awareness and carrier decision framework" },
];

export default function CompleteView({ onRestart, onViewLesson07 }) {
  return (
    <div data-testid="g0-complete-view" style={{ maxWidth: 640, animation: "heroEnter 0.5s ease-out forwards" }}>
      {/* Ceremony Header */}
      <div style={{ borderTop: "3px solid #d4900a", background: "rgba(0,0,0,0.35)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: 0 }}>
          LP-MOD-G0 · GROUND 0 · WISDOM MODULE COMPLETE
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(212,144,10,0.08)", border: "1px solid rgba(212,144,10,0.22)", padding: "0.25rem 0.75rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4900a", boxShadow: "0 0 8px #d4900a" }} />
          <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a" }}>
            GROUND 0 COMPLETE
          </span>
        </div>
      </div>

      {/* Intro Block */}
      <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.14)", borderTop: "none", padding: "2.5rem 2rem" }}>
        <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", marginBottom: "1.25rem", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Wisdom module established.
        </h1>
        <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.82, maxWidth: 520, marginBottom: "1.5rem" }}>
          Ground 0 is complete. The posture, stewardship, and consequence-awareness layer is in place. Your readiness outcome — GO, WAIT, or NO-GO — is determined by REACH, the qualification engine.
        </p>
        <a
          href="/reach-diagnostic"
          data-testid="g0-completion-reach-cta"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "#d4900a", color: "#000F1F", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 0.2s", minHeight: 48 }}
          onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
          onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
        >
          Complete the REACH Assessment <ArrowRight size={14} />
        </a>
      </div>

      {/* Module roadmap + continuation */}
      <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none" }}>
        {/* What you just completed */}
        <div style={{ padding: "1.75rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(34,197,94,0.65)", marginBottom: "1.25rem" }}>
            GROUND 0 — WHAT YOU COMPLETED
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              "Compliance framework and the Four Pillars of Survival — established",
              "Operating lane and risk profile — assessed",
              "Personal readiness across five REACH dimensions — reviewed",
              "AUTO authority-protection framework and the 16 Deadly Sins — mapped",
              "REACH qualification — recommended next step to determine your outcome",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.32)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                  <span style={{ color: "#22c55e", fontSize: "0.5rem", fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.94rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Module roadmap preview */}
        <div style={{ padding: "1.75rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1.25rem" }}>
            THE INSTALLATION SEQUENCE — 9 MODULES
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {MODULE_ROADMAP.map((mod) => (
              <div key={mod.code} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "0.75rem 0.875rem", background: mod.tag === "CREDENTIAL GATE" ? "rgba(212,144,10,0.04)" : "rgba(255,255,255,0.015)", borderLeft: `2px solid ${mod.tag === "HARD GATE" ? "rgba(239,68,68,0.4)" : mod.tag === "CREDENTIAL GATE" ? "rgba(212,144,10,0.5)" : mod.tag === "CONDITIONAL" ? "rgba(251,146,60,0.3)" : mod.tag === "EXTENSION" ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.1)"}` }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.619rem", fontWeight: 700, color: "rgba(212,144,10,0.5)", flexShrink: 0, paddingTop: "0.18rem", letterSpacing: "0.1em", minWidth: 44 }}>{mod.code}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>{mod.name}</span>
                    {mod.tag && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: mod.tagColor, background: "rgba(0,0,0,0.3)", border: `1px solid ${mod.tagColor}`, padding: "0.1rem 0.4rem", flexShrink: 0 }}>{mod.tag}</span>}
                  </div>
                  <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.5, margin: 0 }}>{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single continuation CTA */}
        <div style={{ padding: "1.75rem 2rem" }}>
          <a
            href="/admission"
            data-testid="g0-completion-cta"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#d4900a", color: "#000F1F",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.97rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1.25rem 1.75rem", textDecoration: "none",
              transition: "background 0.2s", width: "100%", boxSizing: "border-box",
              minHeight: 56,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
          >
            <span>Continue to Install the LaunchPath Operating System</span>
            <ArrowRight size={18} />
          </a>
          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginTop: "0.875rem", lineHeight: 1.6 }}>
            NO PAYMENT AT THIS STEP · ADMISSION REVIEWED WITHIN 24 HOURS
          </p>
          {onViewLesson07 && (
            <button
              onClick={onViewLesson07}
              data-testid="g0-view-lesson07-btn"
              style={{ background: "none", border: "none", fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.524rem", color: "rgba(197,160,89,0.45)", cursor: "pointer", letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.5rem 0", marginTop: "0.5rem", display: "block", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(197,160,89,0.80)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(197,160,89,0.45)"}
            >
              REACH GO? VIEW WHAT HAPPENS AFTER GO →
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onRestart}
        data-testid="g0-restart-btn"
        style={{
          background: "none", border: "none", fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          fontSize: "0.524rem", color: "rgba(255,255,255,0.22)", cursor: "pointer",
          letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.5rem 0",
          marginTop: "1.5rem", display: "block", transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.22)"}
      >
        REVIEW GROUND 0 AGAIN →
      </button>
    </div>
  );
}
