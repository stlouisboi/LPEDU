import React from "react";
import { Lock, CheckCircle, Clock, Warning, Circle, CircleDashed } from "@phosphor-icons/react";
import { CURRICULUM } from "../../data/portalData";

export default function PortalSidebar({ selectedId, hasCohortAccess, gateStatuses, onSelect, isModuleLocked, getModuleStatus, isAllCoreDone }) {
  return (
    <aside
      style={{
        width: 300,
        flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: "2rem 0",
      }}
      className="portal-sidebar"
    >
      {/* Operator Tools quick-access */}
      <div style={{ padding: "0 1.5rem 1.75rem", marginBottom: "1.75rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: "0.875rem" }}>
          OPERATOR TOOLS
        </p>
        {[
          { code: "LP-TOOL-001", label: "TCO Calculator", href: "/tools/tco-calculator", free: true },
          { code: "LP-TOOL-002", label: "Load Profitability Analyzer", href: "/tools/load-analyzer", free: false },
        ].map((tool) => (
          <a
            key={tool.code}
            href={tool.href}
            data-testid={`portal-tool-${tool.code.toLowerCase()}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", padding: "0.625rem 0.75rem", marginBottom: "0.375rem", background: "rgba(212,144,10,0.06)", border: "1px solid rgba(212,144,10,0.14)", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,144,10,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(212,144,10,0.06)")}
          >
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4900a", margin: "0 0 2px" }}>{tool.code}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.3 }}>{tool.label}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
              {tool.free && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22c55e", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)", padding: "0.15rem 0.45rem" }}>FREE</span>
              )}
              <span style={{ color: "#d4900a", fontSize: "0.8rem" }}>→</span>
            </div>
          </a>
        ))}
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
          padding: "0 1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        YOUR IMPLEMENTATION JOURNEY
      </p>

      {CURRICULUM.map((mod) => {
        const isActive = selectedId === mod.id;
        const locked = isModuleLocked(mod);
        const status = getModuleStatus(mod.id);
        const isConditionalLocked = mod.type === "recovery" && locked;

        const icon = (() => {
          if (mod.id === "ground-0") return <CheckCircle size={13} color="#22c55e" weight="fill" />;
          if (locked && isConditionalLocked) return <CircleDashed size={13} color="rgba(251,146,60,0.35)" />;
          if (locked) return <Lock size={11} color="rgba(212,144,10,0.45)" />;
          if (status === "approved" || status === "complete") return <CheckCircle size={13} color="#22c55e" weight="fill" />;
          if (status === "pending_review") return <Clock size={13} color="#f59e0b" />;
          if (status === "revisions_needed") return <Warning size={13} color="#ef4444" />;
          if (status === "conditional") return <CircleDashed size={13} color="#f97316" />;
          return <Circle size={13} color="rgba(255,255,255,0.22)" />;
        })();

        const typeColor = (() => {
          if (mod.id === "ground-0") return "#22c55e";
          if (mod.type === "audit") return "#ef4444";
          if (mod.type === "core") return "rgba(212,144,10,0.75)";
          if (mod.type === "recovery") return "rgba(251,146,60,0.7)";
          if (mod.type === "extension") return "rgba(129,140,248,0.7)";
          return "rgba(255,255,255,0.3)";
        })();

        return (
          <button
            key={mod.id}
            data-testid={`sidebar-module-${mod.id}`}
            onClick={() => onSelect(mod.id)}
            style={{
              width: "100%",
              background: isActive ? "rgba(212,144,10,0.08)" : "none",
              border: "none",
              borderLeft: isActive ? "3px solid #d4900a" : "3px solid transparent",
              cursor: "pointer",
              padding: "0.875rem 1.5rem",
              textAlign: "left",
              transition: "background 0.15s, border-color 0.15s",
              opacity: isConditionalLocked ? 0.5 : 1,
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "none"; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
              <div style={{ marginTop: "0.15rem", flexShrink: 0 }}>{icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.714rem", color: "#FFFFFF", letterSpacing: "0.06em" }}>
                    {mod.code}
                  </span>
                  {isActive && (
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4900a", flexShrink: 0 }}>
                      ← HERE
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.35, marginBottom: "0.3rem" }}>
                  {mod.label}
                </p>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: typeColor }}>
                  {mod.typeLabel}
                </span>
                {hasCohortAccess && !locked && mod.id !== "ground-0" && (() => {
                  const badge = (text, color, bg, border) => (
                    <span style={{ display: "inline-block", marginTop: "0.3rem", marginLeft: "0.25rem", fontFamily: "'Inter',sans-serif", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color, background: bg, border: `1px solid ${border}`, padding: "0.1rem 0.375rem" }}>
                      {text}
                    </span>
                  );
                  if (status === "pending_review") return badge("UNDER REVIEW", "#f59e0b", "rgba(245,158,11,0.1)", "rgba(245,158,11,0.3)");
                  if (status === "revisions_needed") return badge("REVISIONS NEEDED", "#ef4444", "rgba(239,68,68,0.1)", "rgba(239,68,68,0.3)");
                  if (status === "approved") return badge("APPROVED ✓", "#22c55e", "rgba(34,197,94,0.08)", "rgba(34,197,94,0.25)");
                  if (status === "conditional") return badge("CONDITIONAL", "#f97316", "rgba(249,115,22,0.1)", "rgba(249,115,22,0.25)");
                  if (status === "complete") return badge("COMPLETE ✓", "#22c55e", "rgba(34,197,94,0.08)", "rgba(34,197,94,0.2)");
                  return null;
                })()}
              </div>
            </div>
          </button>
        );
      })}

      {/* Journey Progress Summary */}
      {hasCohortAccess && (() => {
        const completedCount = CURRICULUM.filter((m) => {
          if (m.id === "ground-0") return true;
          const s = gateStatuses[m.id]?.status;
          return s === "approved" || s === "complete";
        }).length;
        const registryIssued = isAllCoreDone();
        return (
          <div data-testid="journey-progress-summary" style={{ margin: "1.25rem 1rem 0", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.1rem", paddingBottom: "0.75rem", paddingLeft: "0.5rem" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.35rem" }}>
              Progress: <strong style={{ color: "rgba(255,255,255,0.65)" }}>{completedCount} of 10</strong> modules
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", color: registryIssued ? "#22c55e" : "rgba(255,255,255,0.28)" }}>
              Verified Registry ID: {registryIssued ? <strong>Issued ✓</strong> : "Pending"}
            </p>
          </div>
        );
      })()}
    </aside>
  );
}
