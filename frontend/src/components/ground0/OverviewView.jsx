import React from "react";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";

export default function OverviewView({ lessons, completedLessons, onBegin, isEmbedded }) {
  return (
    <div>
      {!isEmbedded && (
        <p style={{ fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
          LP-MOD-G0 | GROUND 0 — FREE ACCESS
        </p>
      )}
      <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: isEmbedded ? "clamp(1.5rem, 2.5vw, 2rem)" : "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", marginBottom: "0.75rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
        Ground 0: The Wisdom Module
      </h1>
      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 540, marginBottom: isEmbedded ? "1.5rem" : "2.5rem" }}>
        Six lessons. Approximately 90 minutes. No charge. This is the free orientation module — the wisdom layer of the LaunchPath system.
      </p>

      {/* Module list */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem" }}>
        {lessons.map((lesson, idx) => {
          const isComplete = completedLessons.includes(idx);
          const isLocked = lesson.requiresAuth;
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: idx < lessons.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: isComplete ? "rgba(34,197,94,0.04)" : "transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.762rem", color: isComplete ? "#22c55e" : "#d4900a", minWidth: 36, letterSpacing: "0.06em" }}>
                  {lesson.number}
                </span>
                <div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.924rem", color: isComplete ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.93)", display: "block" }}>
                    {lesson.title}
                  </span>
                  {isLocked && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(212,144,10,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Account required
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.45)" }}>{lesson.duration}</span>
                {isComplete && <CheckCircle size={16} color="#22c55e" weight="fill" />}
              </div>
            </div>
          );
        })}
      </div>

      <button
        data-testid="g0-begin-btn"
        onClick={onBegin}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "#d4900a", color: "#0b1628", border: "none",
          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem",
          letterSpacing: "0.06em", textTransform: "uppercase",
          padding: "1rem 2rem", cursor: "pointer", transition: "background 0.2s",
          minHeight: 52,
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
        onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
      >
        {completedLessons.length > 0 ? "Continue Ground 0" : "Begin Ground 0"} <ArrowRight size={16} />
      </button>

      {completedLessons.length > 0 && (
        <p style={{ fontSize: "0.762rem", color: "rgba(255,255,255,0.4)", marginTop: "0.875rem" }}>
          {completedLessons.length} of {lessons.length} lessons completed
        </p>
      )}
    </div>
  );
}
