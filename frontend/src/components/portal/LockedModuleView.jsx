import React from "react";
import { Lock } from "@phosphor-icons/react";

// ── EnrollCTA ─────────────────────────────────────────────────────────────────
export function EnrollCTA({ onCheckout, paymentState }) {
  return (
    <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", padding: "1.75rem", maxWidth: 560 }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.7)", marginBottom: "0.5rem" }}>UNLOCK THIS MODULE</p>
      <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF", letterSpacing: "-0.01em", marginBottom: "0.625rem" }}>Part of the LaunchPath Standard</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        All 9 implementation modules, cohort delivery, and facilitator support. $2,500 one-time enrollment.
      </p>
      {paymentState === "error" && (
        <p style={{ color: "#ff6b6b", fontSize: "0.857rem", marginBottom: "0.875rem", fontFamily: "'Inter',sans-serif" }}>Something went wrong. Please try again.</p>
      )}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <button
          data-testid="request-cohort-btn"
          onClick={onCheckout}
          disabled={paymentState === "loading"}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "#d4900a", color: "#000F1F", border: "none", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: paymentState === "loading" ? "wait" : "pointer", opacity: paymentState === "loading" ? 0.8 : 1 }}
        >
          {paymentState === "loading" ? "Preparing…" : "Request Cohort Placement"}
        </button>
        <a href="/reach-diagnostic" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.55)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.857rem", padding: "0.75rem 1.25rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}>
          Run REACH Diagnostic →
        </a>
      </div>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.30)", marginTop: "0.875rem", fontStyle: "italic" }}>
        Admission subject to assessment and cohort availability.
      </p>
    </div>
  );
}

// ── LockedModuleView ──────────────────────────────────────────────────────────
export default function LockedModuleView({ moduleInfo, type, onCheckout, paymentState }) {
  const isRecovery = type === "recovery";
  const isExtension = type === "extension";
  const accentColor  = isRecovery ? "rgba(251,146,60,0.85)"  : isExtension ? "rgba(129,140,248,0.85)"  : "#d4900a";
  const accentBg     = isRecovery ? "rgba(251,146,60,0.07)"  : isExtension ? "rgba(99,102,241,0.07)"   : "rgba(212,144,10,0.05)";
  const accentBorder = isRecovery ? "rgba(251,146,60,0.22)"  : isExtension ? "rgba(99,102,241,0.22)"   : "rgba(212,144,10,0.16)";

  if (!moduleInfo) return (
    <div data-testid="locked-module-view">
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>COHORT MODULE — LOCKED</p>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>This module is part of the LaunchPath Standard.</h1>
      <EnrollCTA onCheckout={onCheckout} paymentState={paymentState} />
    </div>
  );

  return (
    <div data-testid="locked-module-view">
      {/* Lock bar */}
      <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.18)", borderLeft: "3px solid #d4900a", padding: "0.875rem 1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Lock size={13} color="#d4900a" weight="bold" />
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", margin: 0 }}>
            Cohort module — requires LaunchPath Standard enrollment to unlock.
          </p>
        </div>
        <a href="/admission" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", background: "#d4900a", color: "#000F1F", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.5rem 1.125rem", textDecoration: "none", whiteSpace: "nowrap" }}>
          Request Admission →
        </a>
      </div>

      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
        LP-{moduleInfo.code} | {moduleInfo.title.toUpperCase()}
      </p>

      {(isRecovery || isExtension) && (
        <div style={{ display: "inline-block", background: accentBg, border: `1px solid ${accentBorder}`, padding: "0.25rem 0.875rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", color: accentColor, textTransform: "uppercase", margin: 0 }}>
            {isRecovery ? "RECOVERY MODULE — OPTIONAL" : "STANDARD EXTENSION — INCLUDED IN ENROLLMENT"}
          </p>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "#FFFFFF", letterSpacing: "-0.02em", margin: 0 }}>
          {moduleInfo.title}
        </h1>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0 }}>
          {moduleInfo.lessonCount} LESSONS · {moduleInfo.duration}
        </span>
      </div>

      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.78, maxWidth: 580, marginBottom: "2.5rem" }}>
        {moduleInfo.description}
      </p>

      {/* Lesson structure — visible, content locked */}
      <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem", maxWidth: 560, marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", margin: 0 }}>
            LESSON STRUCTURE — {moduleInfo.lessonCount} UNITS
          </p>
          <Lock size={11} color="rgba(212,144,10,0.55)" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {moduleInfo.topics.map((topic, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(212,144,10,0.75)", flexShrink: 0, paddingTop: "0.18rem", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.55 }}>
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>

      <EnrollCTA onCheckout={onCheckout} paymentState={paymentState} />
    </div>
  );
}
