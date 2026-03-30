import React, { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const DOMAINS = [
  {
    key: "dq", label: "Driver Qualification",
    questions: [
      { id: "q1", text: "Do you have a complete DQ file for every active driver — application, MVR, medical certificate, road test, and Clearinghouse query all on file?" },
      { id: "q2", text: "Have you run an annual Clearinghouse query for every driver within the past 12 months?" },
    ],
  },
  {
    key: "da", label: "Drug & Alcohol",
    questions: [
      { id: "q3", text: "Are you enrolled with a registered C/TPA and is your random testing pool currently active?" },
      { id: "q4", text: "Does every driver have a signed D&A policy acknowledgment on file, and was a pre-employment drug test completed before their first dispatch?" },
    ],
  },
  {
    key: "hos", label: "HOS / ELD",
    questions: [
      { id: "q5", text: "Is your ELD registered with an FMCSA-approved provider and is the instruction card in every cab?" },
      { id: "q6", text: "Do you have 6 months of complete driver logs and supporting documents (BOLs, fuel receipts) on file?" },
    ],
  },
  {
    key: "vm", label: "Vehicle Maintenance",
    questions: [
      { id: "q7", text: "Does every vehicle have a current annual inspection within the past 365 days?" },
      { id: "q8", text: "Do you have DVIRs on file for every day each vehicle was operated in the past 90 days?" },
    ],
  },
  {
    key: "ia", label: "Insurance & Authority",
    critical: true,
    questions: [
      { id: "q9",  text: "Does SAFER currently show 'Active' insurance with your exact legal name matching your policy?" },
      { id: "q10", text: "Is your MCS-150 current — filed within the past two years or since your last operational change?" },
    ],
  },
  {
    key: "ar", label: "Audit Response",
    critical: true,
    questions: [
      { id: "q11", text: "Have you reviewed and responded to all FMCSA correspondence, portal messages, and audit notices within required deadlines?" },
    ],
  },
];

const ANSWER_OPTS = ["YES", "NO", "NOT SURE"];
const ANSWER_COLORS = { YES: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", text: "rgba(34,197,94,0.9)" }, NO: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)", text: "rgba(239,68,68,0.9)" }, "NOT SURE": { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.3)", text: "rgba(251,191,36,0.9)" } };

export default function AuditCheckInFlow({ initialAnswers = {}, onSubmit, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [saving, setSaving] = useState(false);

  const domain = DOMAINS[step];
  const isLast = step === DOMAINS.length - 1;
  const domainAnswered = domain.questions.every(q => answers[q.id]);
  const totalAnswered = Object.keys(answers).length;

  function setAnswer(qid, val) {
    setAnswers(prev => ({ ...prev, [qid]: val }));
  }

  async function handleNext() {
    // Submit this domain
    const domainAnswers = {};
    domain.questions.forEach(q => { if (answers[q.id]) domainAnswers[q.id] = answers[q.id]; });

    setSaving(true);
    try {
      await onSubmit(domainAnswers, domain.key, isLast);
    } finally {
      setSaving(false);
    }

    if (!isLast) setStep(s => s + 1);
  }

  return (
    <div data-testid="audit-checkin-flow" style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: 560, background: "#000F1F", border: "1px solid rgba(197,160,89,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 2px" }}>
              MONTHLY AUDIT READINESS CHECK
            </p>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", margin: 0 }}>
              {step + 1} of {DOMAINS.length} domains
            </p>
          </div>
          <button onClick={onClose} aria-label="Close check-in" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: "0.25rem", lineHeight: 1 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height: "100%", background: "#d4900a", width: `${((step + 1) / DOMAINS.length) * 100}%`, transition: "width 0.35s" }} />
        </div>

        {/* Domain content */}
        <div style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4900a", margin: 0 }}>
              {domain.label}
            </p>
            {domain.critical && (
              <span style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.12em", color: "rgba(239,68,68,0.7)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "1px 5px", textTransform: "uppercase" }}>CRITICAL</span>
            )}
          </div>

          {domain.questions.map(q => {
            const current = answers[q.id];
            const prev = initialAnswers[q.id];
            return (
              <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.95rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.72, marginBottom: "0.875rem" }}>
                  {q.text}
                </p>
                {prev && prev !== current && (
                  <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.524rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.28)", marginBottom: "0.5rem" }}>
                    LAST ANSWER: {prev}
                  </p>
                )}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {ANSWER_OPTS.map(opt => {
                    const selected = current === opt;
                    const ac = ANSWER_COLORS[opt];
                    return (
                      <button
                        key={opt}
                        data-testid={`answer-${q.id}-${opt.replace(" ","-")}`}
                        onClick={() => setAnswer(q.id, opt)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: selected ? ac.bg : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selected ? ac.border : "rgba(255,255,255,0.1)"}`,
                          color: selected ? ac.text : "rgba(255,255,255,0.45)",
                          fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace",
                          fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.16em",
                          textTransform: "uppercase", cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer nav */}
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: step === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.45)", fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: step === 0 ? "default" : "pointer", padding: 0 }}
          >
            <ArrowLeft size={12} /> Back
          </button>

          <button
            data-testid={isLast ? "checkin-submit" : "checkin-next"}
            onClick={handleNext}
            disabled={!domainAnswered || saving}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: domainAnswered ? "#d4900a" : "rgba(255,255,255,0.06)",
              color: domainAnswered ? "#000F1F" : "rgba(255,255,255,0.25)",
              border: "none", cursor: domainAnswered ? "pointer" : "default",
              fontFamily: "'Inter',sans-serif", fontWeight: 700,
              fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "0.625rem 1.25rem", transition: "background 0.2s",
            }}
          >
            {saving ? "Saving..." : isLast ? (
              <><CheckCircle size={14} /> Submit Check-in</>
            ) : (
              <>Next: {DOMAINS[step + 1]?.label} <ArrowRight size={12} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
