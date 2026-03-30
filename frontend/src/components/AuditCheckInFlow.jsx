import React, { useState } from "react";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { QUESTION_BANK, DOMAIN_ORDER, DOMAIN_LABELS, DOMAIN_CRITICAL, DOMAIN_HELPER_TEXT, getQuestionsForDomain } from "./auditConfig";

const ANSWER_OPTS = [
  { value: "YES",      label: "Yes — in place",          color: { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.3)",  text: "rgba(34,197,94,0.9)" } },
  { value: "NO",       label: "No — not in place",       color: { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.3)",  text: "rgba(239,68,68,0.9)" } },
  { value: "NOT_SURE", label: "Not sure — need to verify", color: { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.3)", text: "rgba(251,191,36,0.9)" } },
];

export default function AuditRunCheckScreen({ onSubmit, onCancel }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [validationErr, setValidationErr] = useState(false);

  const currentDomain = DOMAIN_ORDER[step];
  const isLastStep = step === DOMAIN_ORDER.length - 1;
  const domainQuestions = getQuestionsForDomain(currentDomain);
  const allAnswered = domainQuestions.every(q => answers[q.id]);

  function setAnswer(qid, val) {
    setAnswers(prev => ({ ...prev, [qid]: val }));
    setValidationErr(false);
  }

  function handleBack() {
    if (step > 0) setStep(s => s - 1);
  }

  function handleNext() {
    if (!allAnswered) { setValidationErr(true); return; }
    setValidationErr(false);
    setStep(s => s + 1);
  }

  async function handleSubmit() {
    if (!allAnswered) { setValidationErr(true); return; }
    setSaving(true);
    try {
      const answerList = QUESTION_BANK.map(q => ({
        questionId: q.id,
        domain: q.domain,
        answer: answers[q.id] || "NO",
      }));
      await onSubmit(answerList, notes);
    } finally {
      setSaving(false);
    }
  }

  const progress = ((step + 1) / DOMAIN_ORDER.length) * 100;

  return (
    <section data-testid="audit-run-check-screen" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.25rem" }}>
            MONTHLY AUDIT READINESS CHECK
          </p>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", margin: 0 }}>
            Step {step + 1} of {DOMAIN_ORDER.length} — {DOMAIN_LABELS[currentDomain]}
          </p>
        </div>
        <button
          onClick={onCancel}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: 0 }}
        >
          Cancel
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", marginBottom: "2rem" }}>
        <div style={{ height: "100%", background: "#d4900a", width: `${progress}%`, transition: "width 0.35s" }} />
      </div>

      {/* Domain content */}
      <div style={{ maxWidth: 580 }}>
        {/* Domain title + critical badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", margin: 0 }}>
            {DOMAIN_LABELS[currentDomain]}
          </p>
          {DOMAIN_CRITICAL[currentDomain] && (
            <span style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.12em", color: "rgba(239,68,68,0.7)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "1px 5px", textTransform: "uppercase" }}>CRITICAL</span>
          )}
        </div>

        {/* Helper text */}
        <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.857rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 1.5rem" }}>
          {DOMAIN_HELPER_TEXT[currentDomain]}
        </p>

        {/* Questions */}
        {domainQuestions.map(q => {
          const current = answers[q.id];
          return (
            <div key={q.id} style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.95rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.72, marginBottom: "0.875rem" }}>
                {q.prompt}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {ANSWER_OPTS.map(opt => {
                  const selected = current === opt.value;
                  return (
                    <button
                      key={opt.value}
                      data-testid={`answer-${q.id}-${opt.value}`}
                      onClick={() => setAnswer(q.id, opt.value)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.625rem",
                        padding: "0.625rem 1rem", textAlign: "left",
                        background: selected ? opt.color.bg : "rgba(255,255,255,0.02)",
                        border: `1px solid ${selected ? opt.color.border : "rgba(255,255,255,0.08)"}`,
                        color: selected ? opt.color.text : "rgba(255,255,255,0.5)",
                        fontFamily: "var(--font-body,'Source Sans 3',sans-serif)",
                        fontSize: "0.875rem", cursor: "pointer", transition: "all 0.15s",
                      }}
                    >
                      <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${selected ? opt.color.border : "rgba(255,255,255,0.2)"}`, background: selected ? opt.color.bg : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: opt.color.text }} />}
                      </div>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Notes field on last step */}
        {isLastStep && (
          <div style={{ marginTop: "1.5rem" }}>
            <label style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", display: "block", marginBottom: "0.5rem" }}>
              Monthly Notes (optional)
            </label>
            <textarea
              data-testid="check-notes-field"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add anything you want to remember about this month's files, gaps, renewals, or follow-up items."
              rows={3}
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.875rem", padding: "0.625rem 0.875rem", outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
        )}

        {/* Validation error */}
        {validationErr && (
          <p style={{ fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.12em", color: "rgba(239,68,68,0.75)", margin: "0.75rem 0 0", textTransform: "uppercase" }}>
            Answer each question before moving to the next section.
          </p>
        )}
      </div>

      {/* Footer nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={handleBack}
          disabled={step === 0}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: step === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.45)", fontFamily: "monospace", fontSize: "0.619rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: step === 0 ? "default" : "pointer", padding: 0 }}
        >
          <ArrowLeft size={12} /> Back
        </button>

        {isLastStep ? (
          <button
            data-testid="checkin-submit"
            onClick={handleSubmit}
            disabled={saving}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#d4900a", color: "#000F1F", border: "none", cursor: saving ? "default" : "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.625rem 1.25rem" }}
          >
            {saving ? "Submitting..." : <><CheckCircle size={14} /> Submit Check</>}
          </button>
        ) : (
          <button
            data-testid="checkin-next"
            onClick={handleNext}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: allAnswered ? "#d4900a" : "rgba(255,255,255,0.06)", color: allAnswered ? "#000F1F" : "rgba(255,255,255,0.25)", border: "none", cursor: allAnswered ? "pointer" : "default", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.625rem 1.25rem" }}
          >
            Next: {DOMAIN_LABELS[DOMAIN_ORDER[step + 1]]} <ArrowRight size={12} />
          </button>
        )}
      </div>
    </section>
  );
}
