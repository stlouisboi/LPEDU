import React from "react";
import { Lock, CheckCircle, Clock, Warning, Circle, CircleDashed } from "@phosphor-icons/react";
import { CURRICULUM } from "../../data/portalData";

const mono = "'JetBrains Mono', monospace";
const inter = "'Inter', sans-serif";

const STATUS_CONFIG = {
  approved:         { label: "APPROVED",         color: "#22c55e",              bg: "rgba(34,197,94,0.05)",   border: "rgba(34,197,94,0.22)"   },
  complete:         { label: "COMPLETE",          color: "#22c55e",              bg: "rgba(34,197,94,0.05)",   border: "rgba(34,197,94,0.22)"   },
  pending_review:   { label: "UNDER REVIEW",      color: "#f59e0b",              bg: "rgba(245,158,11,0.05)", border: "rgba(245,158,11,0.22)"  },
  revisions_needed: { label: "REVISIONS NEEDED",  color: "#ef4444",              bg: "rgba(239,68,68,0.05)",  border: "rgba(239,68,68,0.22)"   },
  conditional:      { label: "CONDITIONAL",       color: "#f97316",              bg: "rgba(249,115,22,0.05)", border: "rgba(249,115,22,0.22)"  },
  not_started:      { label: "NOT STARTED",       color: "rgba(255,255,255,0.22)", bg: "transparent",         border: "rgba(255,255,255,0.07)" },
  locked:           { label: "LOCKED",            color: "rgba(255,255,255,0.20)", bg: "transparent",         border: "rgba(255,255,255,0.06)" },
};

const TYPE_COLOR = {
  core:      "rgba(200,169,110,0.70)",
  audit:     "#ef4444",
  recovery:  "rgba(251,146,60,0.70)",
  extension: "rgba(129,140,248,0.70)",
};

export default function ModuleStatusGrid({ hasCohortAccess, gateStatuses, isModuleLocked, getModuleStatus, isAllCoreDone, onSelect, selectedId }) {
  const totalModules = 10;
  const completedCount = CURRICULUM.filter((m) => {
    if (m.id === "ground-0") return true;
    const s = gateStatuses[m.id]?.status;
    return s === "approved" || s === "complete";
  }).length;
  const registryIssued = isAllCoreDone();

  return (
    <div data-testid="module-status-grid" style={{ marginBottom: "2rem" }}>

      {/* ── Grid Header ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "1rem",
        marginBottom: "1rem", paddingBottom: "0.75rem",
        borderBottom: "1px solid rgba(200,169,110,0.12)",
      }}>
        <p style={{
          fontFamily: mono, fontSize: "0.571rem", fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(200,169,110,0.60)", margin: 0,
        }}>
          LP-SYS-CUR-001 · PROGRAM OVERVIEW
        </p>
        <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,0.08)" }} />
        <p style={{
          fontFamily: mono, fontSize: "0.476rem", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: registryIssued ? "#22c55e" : "rgba(255,255,255,0.25)", margin: 0,
        }}>
          {completedCount}/{totalModules} INSTALLED
        </p>
      </div>

      {/* ── Module Tiles ── */}
      <div
        className="module-status-grid-inner"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.625rem" }}
      >
        {CURRICULUM.map((mod) => {
          const locked = isModuleLocked(mod);
          const rawStatus = mod.id === "ground-0" ? "complete" : getModuleStatus(mod.id);
          const isActive = selectedId === mod.id;
          const isConditionalLocked = mod.type === "recovery" && locked;

          const statusKey = locked ? "locked" : rawStatus;
          const statusCfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.not_started;
          const typeColor = mod.id === "ground-0" ? "#22c55e" : (TYPE_COLOR[mod.type] || "rgba(255,255,255,0.30)");

          const icon = (() => {
            if (mod.id === "ground-0")             return <CheckCircle size={12} color="#22c55e" weight="fill" />;
            if (locked && isConditionalLocked)      return <CircleDashed size={12} color="rgba(251,146,60,0.35)" />;
            if (locked)                             return <Lock size={11} color="rgba(200,169,110,0.40)" />;
            if (rawStatus === "approved" || rawStatus === "complete") return <CheckCircle size={12} color="#22c55e" weight="fill" />;
            if (rawStatus === "pending_review")     return <Clock size={12} color="#f59e0b" />;
            if (rawStatus === "revisions_needed")   return <Warning size={12} color="#ef4444" />;
            if (rawStatus === "conditional")        return <CircleDashed size={12} color="#f97316" />;
            return <Circle size={12} color="rgba(255,255,255,0.20)" />;
          })();

          return (
            <button
              key={mod.id}
              data-testid={`grid-module-${mod.id}`}
              onClick={() => onSelect(mod.id)}
              style={{
                background: isActive ? "rgba(200,169,110,0.06)" : "rgba(255,255,255,0.015)",
                border: isActive
                  ? "1px solid rgba(200,169,110,0.40)"
                  : "1px solid rgba(255,255,255,0.06)",
                borderTop: isActive
                  ? "2px solid #C8A96E"
                  : `2px solid ${statusCfg.border}`,
                padding: "0.875rem 1rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "background 0.15s, border-color 0.15s",
                opacity: isConditionalLocked ? 0.45 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                  e.currentTarget.style.borderColor = "rgba(200,169,110,0.18)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }
              }}
            >
              {/* Code + Icon row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <p style={{
                  fontFamily: mono, fontSize: "0.524rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: locked ? "rgba(200,169,110,0.30)" : "rgba(200,169,110,0.55)",
                  margin: 0,
                }}>
                  {mod.code}
                </p>
                <span style={{ flexShrink: 0, marginLeft: "0.25rem" }}>{icon}</span>
              </div>

              {/* Module name */}
              <p style={{
                fontFamily: inter, fontSize: "0.800rem", fontWeight: 600,
                color: locked ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.90)",
                lineHeight: 1.3, marginBottom: "0.5rem",
              }}>
                {mod.label}
              </p>

              {/* Type badge + Status badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.25rem", flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: mono, fontSize: "0.452rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: locked ? "rgba(255,255,255,0.20)" : typeColor,
                }}>
                  {mod.typeLabel}
                </span>
                <span style={{
                  fontFamily: mono, fontSize: "0.452rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: statusCfg.color,
                  background: statusCfg.bg,
                  border: `1px solid ${statusCfg.border}`,
                  padding: "0.1rem 0.325rem",
                  whiteSpace: "nowrap",
                }}>
                  {statusCfg.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .module-status-grid-inner { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </div>
  );
}
