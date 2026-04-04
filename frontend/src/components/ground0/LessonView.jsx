import React from "react";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";

export default function LessonView({ lesson, lessonIndex, totalLessons, completedLessons, selectedOption, onSelectOption, onContinue, onBack, onJumpTo, isEmbedded, urlMap }) {
  const isLastLesson = lessonIndex === totalLessons - 1;
  const canContinue = lesson.assessmentOptions === null || selectedOption !== null;

  return (
    <div data-testid={`lesson-view-${lesson.number}`}>
      {/* Progress stepper */}
      <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "2rem" }}>
        {Array.from({ length: totalLessons }).map((_, idx) => {
          const isComplete = completedLessons.includes(idx);
          const isCurrent = idx === lessonIndex;
          return (
            <React.Fragment key={idx}>
              <button
                data-testid={`step-${idx + 1}`}
                onClick={() => { if (isComplete || idx <= lessonIndex) onJumpTo(idx); }}
                style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: isComplete ? "#22c55e" : isCurrent ? "transparent" : "transparent",
                  border: isComplete ? "2px solid #22c55e" : isCurrent ? "2px solid #d4900a" : "2px solid rgba(255,255,255,0.18)",
                  color: isComplete ? "#0b1628" : isCurrent ? "#d4900a" : "rgba(255,255,255,0.35)",
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.714rem",
                  cursor: (isComplete || idx <= lessonIndex) ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {isComplete ? <CheckCircle size={14} weight="bold" /> : idx + 1}
              </button>
              {idx < totalLessons - 1 && (
                <div style={{ flex: 1, height: 2, background: completedLessons.includes(idx) ? "#22c55e" : "rgba(255,255,255,0.1)" }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Lesson header */}
      <p style={{ fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.5rem" }}>
        {lesson.code} &nbsp;·&nbsp; {lesson.duration}
      </p>
      <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#FFFFFF", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        {lesson.title}
      </h2>

      {/* Video — Vimeo embed if URL set, else placeholder */}
      {urlMap[lesson.number]?.vimeo_url ? (
        <div style={{ width: "100%", aspectRatio: "16/9", maxHeight: 360, marginBottom: "2rem", background: "#000" }}>
          <iframe
            src={`${urlMap[lesson.number].vimeo_url}${urlMap[lesson.number].vimeo_url.includes('?') ? '&' : '?'}autoplay=0&byline=0&portrait=0&title=0`}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={lesson.title}
          />
        </div>
      ) : (
        <div
          data-testid={`video-placeholder-${lesson.number}`}
          style={{
            width: "100%", aspectRatio: "16 / 9", maxHeight: 360,
            background: "linear-gradient(135deg, #060e1a 0%, #0d1c30 60%, #0a1828 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            marginBottom: "2rem", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(212,144,10,0.06) 0%, transparent 70%)" }} />
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            border: "2px solid rgba(212,144,10,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "1rem", position: "relative",
          }}>
            <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "18px solid rgba(212,144,10,0.7)", marginLeft: 4 }} />
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(212,144,10,0.65)", textTransform: "uppercase", position: "relative" }}>
            Video — Available on Vimeo
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", marginTop: "0.35rem", position: "relative" }}>
            URL coming soon
          </p>
        </div>
      )}

      {/* Key Points */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1rem" }}>
          KEY POINTS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {lesson.keyPoints.map((point, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
              <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, color: "rgba(212,144,10,0.5)", flexShrink: 0, paddingTop: "0.22rem", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Standard Bridge — Install Track Connection (Lessons 0.2, 0.3) */}
      {lesson.standardBridge && (
        <div style={{ background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.15)", borderLeft: "3px solid rgba(212,144,10,0.5)", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1.25rem" }}>
            THE INSTALL TRACK CONNECTION
          </p>
          {lesson.standardBridge.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: i < lesson.standardBridge.length - 1 ? "0.875rem" : 0 }}>
              {para}
            </p>
          ))}
        </div>
      )}

      {/* GO / WAIT Decision Context — Lesson 0.6 */}
      {(lesson.goBridge || lesson.waitBridge) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
          {lesson.goBridge && (
            <div style={{ background: "rgba(34,197,94,0.03)", border: "1px solid rgba(34,197,94,0.15)", borderLeft: "3px solid rgba(34,197,94,0.4)", padding: "1.5rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(34,197,94,0.65)", marginBottom: "1.25rem" }}>
                GO DOES NOT MEAN PERFECT
              </p>
              {lesson.goBridge.map((para, i) => (
                <p key={i} style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: i < lesson.goBridge.length - 1 ? "0.875rem" : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          )}
          {lesson.waitBridge && (
            <div style={{ background: "rgba(251,191,36,0.03)", border: "1px solid rgba(251,191,36,0.15)", borderLeft: "3px solid rgba(251,191,36,0.4)", padding: "1.5rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(251,191,36,0.55)", marginBottom: "1.25rem" }}>
                DEFINING YOUR EXIT CONDITION IS NOT PESSIMISM
              </p>
              {lesson.waitBridge.map((para, i) => (
                <p key={i} style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: i < lesson.waitBridge.length - 1 ? "0.875rem" : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PDF Download */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "0.75rem" }}>
          REFERENCE DOCUMENT
        </p>
        {urlMap[lesson.number]?.pdf_url ? (
          <a
            href={urlMap[lesson.number].pdf_url}
            target="_blank" rel="noreferrer"
            data-testid={`pdf-download-${lesson.number}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "transparent", border: "1px solid rgba(212,144,10,0.35)", color: "#d4900a", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.75rem 1.25rem", textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download {lesson.pdfLabel}
          </a>
        ) : (
          <button
            data-testid={`pdf-download-${lesson.number}`}
            disabled
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.75rem 1.25rem", cursor: "not-allowed" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {lesson.pdfLabel} — Coming Soon
          </button>
        )}
      </div>

      {/* Self Assessment */}
      {lesson.assessmentQuestion && lesson.assessmentOptions && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", marginBottom: "1rem" }}>
            SELF-ASSESSMENT
          </p>
          <p style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.87)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            {lesson.assessmentQuestion}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {lesson.assessmentOptions.map((option, i) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={i}
                  data-testid={`assessment-option-${lessonIndex}-${i}`}
                  onClick={() => onSelectOption(option)}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "0.875rem",
                    background: isSelected ? "rgba(212,144,10,0.07)" : "transparent",
                    border: isSelected ? "1px solid rgba(212,144,10,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    borderLeft: isSelected ? "3px solid #d4900a" : "3px solid transparent",
                    padding: "0.875rem 1.125rem",
                    cursor: "pointer", textAlign: "left", width: "100%",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderLeft = "3px solid transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; } }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.667rem", fontWeight: 700, color: isSelected ? "#d4900a" : "rgba(255,255,255,0.28)", flexShrink: 0, paddingTop: "0.22rem", letterSpacing: "0.12em" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontFamily: "var(--font-body, 'Source Sans 3', sans-serif)", fontSize: "0.924rem", color: isSelected ? "rgba(255,255,255,0.93)" : "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <button
          data-testid="g0-back-btn"
          onClick={onBack}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif",
            fontSize: "0.857rem", fontWeight: 600, padding: "0.75rem 1.25rem",
            cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#FFFFFF"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
          ← Back
        </button>
        <button
          data-testid="g0-continue-btn"
          onClick={onContinue}
          disabled={!canContinue}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: canContinue ? "#d4900a" : "rgba(212,144,10,0.25)",
            color: canContinue ? "#0b1628" : "rgba(255,255,255,0.3)",
            border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: "0.924rem", letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "0.875rem 1.75rem", cursor: canContinue ? "pointer" : "not-allowed",
            transition: "background 0.2s", minHeight: 48,
          }}
          onMouseEnter={e => { if (canContinue) e.currentTarget.style.background = "#e8a520"; }}
          onMouseLeave={e => { if (canContinue) e.currentTarget.style.background = "#d4900a"; }}
        >
          {isLastLesson ? "Complete Module 6" : "Continue"} <ArrowRight size={14} />
        </button>
      </div>

      {lesson.assessmentOptions && !selectedOption && (
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.619rem", color: "rgba(255,255,255,0.28)", marginTop: "0.875rem", textAlign: "right", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          SELECT AN ANSWER ABOVE TO CONTINUE
        </p>
      )}
    </div>
  );
}
