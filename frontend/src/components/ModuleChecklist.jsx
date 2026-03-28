import React, { useState, useEffect, useCallback } from "react";
import { CheckSquare, Square, ArrowRight, Clock } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;

/**
 * ModuleChecklist — Renders the completion checklist for a module.
 * Persists checked state to backend. Gates the submit/complete action.
 *
 * Props:
 *  moduleId       - e.g. "module-1"
 *  moduleCode     - e.g. "MOD-1"
 *  checklist      - array of {id, text}
 *  isGateModule   - bool (true → shows "Submit for Review", false → shows "Mark Complete")
 *  gateType       - e.g. "dqf_gate" | "integrity_audit" (used when isGateModule)
 *  gateStatus     - current gate/progress status string
 *  onGateSubmit   - (attestation) => void  — for gate modules
 *  onModuleComplete - () => void           — for non-gate modules
 */
export default function ModuleChecklist({
  moduleId,
  moduleCode,
  checklist,
  isGateModule,
  gateType,
  gateStatus,
  onGateSubmit,
  onModuleComplete,
}) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null); // item_id being saved
  const [submitting, setSubmitting] = useState(false);

  const fetchChecklist = useCallback(() => {
    if (!moduleId) return;
    fetch(`${API}/api/portal/module/${moduleId}/checklist`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { setCheckedItems(d.checked_items || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [moduleId]);

  useEffect(() => { fetchChecklist(); }, [fetchChecklist]);

  const handleToggle = async (itemId, checked) => {
    // Optimistic update
    setCheckedItems((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    );
    setSaving(itemId);
    try {
      await fetch(`${API}/api/portal/module/${moduleId}/checklist`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: itemId, checked }),
      });
    } catch {
      // Revert on error
      setCheckedItems((prev) =>
        !checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
      );
    }
    setSaving(null);
  };

  const allChecked = checklist?.length > 0 && checklist.every((item) => checkedItems.includes(item.id));

  const handleAction = async () => {
    if (!allChecked || submitting) return;
    setSubmitting(true);
    if (isGateModule && onGateSubmit) {
      await onGateSubmit("Self-certified: all checklist items complete");
    } else if (!isGateModule && onModuleComplete) {
      await onModuleComplete();
    }
    setSubmitting(false);
  };

  // Already submitted states — show status screen only
  const submitted = ["pending_review", "approved", "complete", "revisions_needed", "conditional"].includes(gateStatus);
  if (submitted && gateStatus !== "revisions_needed") return null; // Parent handles these states

  if (!checklist?.length) return null;

  const checkedCount = checklist.filter((item) => checkedItems.includes(item.id)).length;

  const submitLabel = isGateModule
    ? gateStatus === "revisions_needed" ? "RE-SUBMIT FOR CUSTODIAN REVIEW" : "SUBMIT FOR STATION CUSTODIAN REVIEW"
    : "CONFIRM — MODULE INSTALLED";

  return (
    <div
      data-testid={`module-checklist-${moduleId}`}
      style={{
        marginTop: "2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "2rem",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "0.714rem", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(212,144,10,0.8)",
          marginBottom: "0.25rem",
        }}>
          {moduleCode} — COMPLETION CHECKLIST
        </p>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "0.857rem",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.5,
        }}>
          {isGateModule
            ? "All items required before Station Custodian review can begin."
            : "All items required before marking this module complete."}
        </p>
      </div>

      {/* Checklist items */}
      {loading ? (
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          LOADING...
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {checklist.map((item) => {
            const checked = checkedItems.includes(item.id);
            const isSaving = saving === item.id;
            return (
              <label
                key={item.id}
                data-testid={`checklist-item-${item.id}`}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  cursor: isSaving ? "wait" : "pointer",
                  background: checked ? "rgba(34,197,94,0.03)" : "rgba(255,255,255,0.01)",
                  border: "1px solid transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { if (!checked) e.currentTarget.style.background = "rgba(255,255,255,0.01)"; }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => handleToggle(item.id, e.target.checked)}
                  style={{ display: "none" }}
                />
                <div style={{ flexShrink: 0, marginTop: "0.15rem" }}>
                  {checked
                    ? <CheckSquare size={16} color="#22c55e" weight="fill" />
                    : <Square size={16} color="rgba(255,255,255,0.25)" />
                  }
                </div>
                <span style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.857rem",
                  color: checked ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.82)",
                  lineHeight: 1.6,
                  textDecoration: checked ? "line-through" : "none",
                  transition: "color 0.15s",
                }}>
                  {item.text}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {/* Progress + Action */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "1rem",
        marginTop: "1.25rem",
        padding: "1rem 1rem",
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: allChecked ? "#22c55e" : "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
            {allChecked ? "CHECKLIST COMPLETE" : `STATUS: ${checkedCount} OF ${checklist.length} ITEMS`}
          </p>
          {!allChecked && (
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.3)" }}>
              Complete all items above to enable submission
            </p>
          )}
        </div>

        <button
          data-testid={`module-action-btn-${moduleId}`}
          onClick={handleAction}
          disabled={!allChecked || submitting}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0.75rem 1.5rem",
            background: allChecked ? (isGateModule ? "#d4900a" : "#22c55e") : "rgba(255,255,255,0.07)",
            color: allChecked ? "#000F1F" : "rgba(255,255,255,0.22)",
            border: "none",
            cursor: !allChecked || submitting ? "default" : "pointer",
            opacity: submitting ? 0.7 : 1,
            transition: "background 0.2s",
          }}
        >
          {submitting ? (
            <><Clock size={12} /> SUBMITTING...</>
          ) : (
            <>{submitLabel} {allChecked && <ArrowRight size={12} />}</>
          )}
        </button>
      </div>

      {/* Gate info */}
      {isGateModule && !submitted && (
        <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.15)", borderLeft: "3px solid rgba(212,144,10,0.5)" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            <strong style={{ color: "rgba(212,144,10,0.8)" }}>Station Custodian review</strong> — Reviewed within 2 business days. You will be notified by email when the review is complete.
          </p>
        </div>
      )}
    </div>
  );
}
