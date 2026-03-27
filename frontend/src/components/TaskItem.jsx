import { useState } from "react";

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";

const STATUS_CONFIG = {
  pending:       { label: "PENDING",       color: "#64748B", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.2)",  dot: "#64748B",  glow: "rgba(100,116,139,0.4)" },
  submitted:     { label: "SUBMITTED",     color: "#7DD3FC", bg: "rgba(125,211,252,0.06)", border: "rgba(125,211,252,0.2)",  dot: "#7DD3FC",  glow: "rgba(125,211,252,0.5)" },
  verified:      { label: "VERIFIED",      color: "#22C55E", bg: "rgba(34,197,94,0.06)",   border: "rgba(34,197,94,0.22)",   dot: "#22C55E",  glow: "rgba(34,197,94,0.5)"  },
  needs_changes: { label: "NEEDS_CHANGES", color: "#F87171", bg: "rgba(248,113,113,0.06)", border: "rgba(248,113,113,0.22)", dot: "#F87171",  glow: "rgba(248,113,113,0.5)"},
};

const PRIORITY_CONFIG = {
  critical: { label: "CRITICAL", color: "#F87171" },
  high:     { label: "HIGH",     color: "#d4900a" },
  medium:   { label: "MEDIUM",   color: "#94A3B8" },
  low:      { label: "LOW",      color: "#64748B" },
};

export default function TaskItem({ task, onSubmit, loading }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending;
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const isSubmitting = loading === task.taskId;
  const canSubmit = task.status === "pending" || task.status === "needs_changes";

  return (
    <div
      data-testid={`task-item-${task.taskId.toLowerCase()}`}
      style={{
        background: status.bg,
        border: `1px solid ${status.border}`,
        borderLeft: `3px solid ${status.dot}`,
        marginBottom: "2px",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.875rem 1.25rem",
          cursor: "pointer",
          flexWrap: "wrap",
        }}
        onClick={() => setExpanded((x) => !x)}
      >
        {/* Status dot */}
        <div style={{
          width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
          background: status.dot,
          boxShadow: `0 0 5px ${status.glow}`,
        }} />

        {/* Task ID */}
        <span style={{
          fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
          letterSpacing: "0.14em", color: "rgba(212,144,10,0.85)",
          textTransform: "uppercase", flexShrink: 0,
        }}>
          LP/{task.taskId}
        </span>

        {/* Category badge */}
        <span style={{
          fontFamily: mono, fontSize: "0.762rem", fontWeight: 700,
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase", flexShrink: 0,
        }}>
          {task.category?.toUpperCase() || ""}
        </span>

        {/* Priority dot */}
        <span style={{
          fontFamily: mono, fontSize: "0.762rem", fontWeight: 700,
          letterSpacing: "0.1em", color: priority.color,
          textTransform: "uppercase", flexShrink: 0,
        }}>
          ● {priority.label}
        </span>

        {/* Task name — grows */}
        <span style={{
          fontFamily: sans, fontWeight: 600, fontSize: "var(--text-sm)",
          color: task.status === "verified" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.92)",
          flex: 1, minWidth: 120,
          textDecoration: task.status === "verified" ? "none" : "none",
        }}>
          {task.name}
        </span>

        {/* Status label */}
        <span
          data-testid={`task-status-${task.taskId.toLowerCase()}`}
          style={{
            fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.12em", color: status.color,
            textTransform: "uppercase", flexShrink: 0,
            padding: "0.2rem 0.5rem",
            border: `1px solid ${status.border}`,
            background: "transparent",
          }}
        >
          [{`STATUS: ${status.label}`}]
        </span>

        {/* Expand chevron */}
        <span style={{
          fontFamily: mono, fontSize: "0.714rem",
          color: "rgba(255,255,255,0.25)", flexShrink: 0,
          transform: expanded ? "rotate(180deg)" : "none",
          transition: "transform 0.2s",
        }}>▾</span>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{
          padding: "0 1.25rem 1.25rem 2.75rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          {/* Description */}
          <p style={{
            fontFamily: sans, fontSize: "0.857rem",
            color: "rgba(255,255,255,0.52)", lineHeight: 1.75,
            marginTop: "0.875rem", marginBottom: "0.875rem", maxWidth: 520,
          }}>
            {task.description}
          </p>

          {/* Coach note (needs_changes state) */}
          {task.status === "needs_changes" && task.coachNote && (
            <div style={{
              background: "rgba(248,113,113,0.06)",
              border: "1px solid rgba(248,113,113,0.22)",
              padding: "0.875rem 1rem",
              marginBottom: "1rem",
              maxWidth: 520,
            }}>
              <p style={{
                fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.12em", color: "#F87171",
                textTransform: "uppercase", marginBottom: "0.35rem",
              }}>
                COACH_NOTE / REMEDIATION_REQUIRED
              </p>
              <p style={{
                fontFamily: sans, fontSize: "0.857rem",
                color: "rgba(248,113,113,0.9)", lineHeight: 1.65,
              }}>
                "{task.coachNote}"
              </p>
            </div>
          )}

          {/* Verified state */}
          {task.status === "verified" && (
            <p style={{
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.14em", color: "rgba(34,197,94,0.75)",
              textTransform: "uppercase",
            }}>
              ARTIFACT_VERIFIED — INTEGRITY +{" "}
              <span style={{ color: "rgba(34,197,94,0.5)" }}>
                {task.verifiedAt ? new Date(task.verifiedAt).toLocaleDateString() : ""}
              </span>
            </p>
          )}

          {/* Submitted state */}
          {task.status === "submitted" && (
            <p style={{
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.14em", color: "rgba(125,211,252,0.7)",
              textTransform: "uppercase",
            }}>
              AWAITING_COACH_VERIFICATION — PULSE SIGNAL ACTIVE
            </p>
          )}

          {/* Submit / Resubmit button */}
          {canSubmit && (
            <button
              data-testid={`task-submit-${task.taskId.toLowerCase()}`}
              onClick={(e) => { e.stopPropagation(); onSubmit(task.taskId); }}
              disabled={isSubmitting}
              style={{
                marginTop: "0.875rem",
                background: task.status === "needs_changes" ? "rgba(248,113,113,0.12)" : "rgba(125,211,252,0.1)",
                border: `1px solid ${task.status === "needs_changes" ? "rgba(248,113,113,0.35)" : "rgba(125,211,252,0.3)"}`,
                color: task.status === "needs_changes" ? "#F87171" : "#7DD3FC",
                fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.5rem 1rem", cursor: isSubmitting ? "wait" : "pointer",
                opacity: isSubmitting ? 0.6 : 1,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = "0.8"; }}
              onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = "1"; }}
            >
              {isSubmitting
                ? "SUBMITTING..."
                : task.status === "needs_changes"
                  ? "RESUBMIT_FOR_VERIFICATION →"
                  : "SUBMIT_FOR_VERIFICATION →"
              }
            </button>
          )}
        </div>
      )}
    </div>
  );
}
