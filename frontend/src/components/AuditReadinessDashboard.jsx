import React, { useState, useEffect, useCallback } from "react";
import { ClipboardCheck, ArrowRight, History, Play, RefreshCw } from "lucide-react";
import { AuditDomainCard } from "./AuditDomainCard";
import AuditRunCheckScreen from "./AuditCheckInFlow";
import AuditResultsScreen from "./AuditResultsScreen";
import AuditHistoryScreen from "./AuditHistoryScreen";
import { DOMAIN_ORDER, DOMAIN_LABELS, DOMAIN_CRITICAL, formatDate, formatMonthLabel, isStale } from "./auditConfig";

const API = process.env.REACT_APP_BACKEND_URL;

const STATUS_STYLES = {
  GREEN:  { label: "ALL CLEAR",       dot: "#22c55e", color: "rgba(34,197,94,0.85)"  },
  YELLOW: { label: "NEEDS REVIEW",    dot: "#fbbf24", color: "rgba(251,191,36,0.85)" },
  RED:    { label: "ACTION REQUIRED", dot: "#ef4444", color: "rgba(239,68,68,0.85)"  },
};

function TeaserView() {
  return (
    <section data-testid="audit-readiness-teaser" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <ClipboardCheck size={22} color="rgba(197,160,89,0.6)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.375rem" }}>
            MONTHLY AUDIT READINESS CHECK
          </p>
          <h3 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.75rem" }}>
            Know where you stand before the auditor does
          </h3>
          <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.72, margin: "0 0 1.25rem", maxWidth: 520 }}>
            Enrolled Standard carriers run a monthly 11-question self-assessment across six FMCSA compliance domains. Your dashboard shows your self-reported status alongside your Station Custodian verified status — always separately, never merged.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", maxWidth: 420, marginBottom: "1.5rem" }}>
            {DOMAIN_ORDER.map(d => (
              <div key={d} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "0.5rem 0.75rem" }}>
                <p style={{ fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0 }}>{DOMAIN_LABELS[d]}</p>
              </div>
            ))}
          </div>
          <a href="/program" data-testid="audit-enroll-cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#d4900a", color: "#000F1F", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.75rem 1.25rem", textDecoration: "none" }}>
            Unlock Monthly Audit Readiness <ArrowRight size={14} />
          </a>
          <p style={{ fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "0.625rem" }}>
            LAUNCHPATH STANDARD — ENROLLED CARRIERS ONLY
          </p>
        </div>
      </div>
    </section>
  );
}

function EmptyDashboard({ onRunCheck }) {
  return (
    <div data-testid="audit-empty-state" style={{ padding: "2.5rem 1.5rem", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
      <p style={{ fontFamily: "monospace", fontSize: "0.619rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 0.75rem" }}>
        NO CHECK COMPLETED YET
      </p>
      <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "0 0 1.5rem", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        No monthly check has been completed yet. Run your first check to establish your baseline.
      </p>
      <button
        data-testid="start-first-check-btn"
        onClick={onRunCheck}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#d4900a", color: "#000F1F", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.75rem 1.25rem" }}
      >
        <Play size={14} /> Run Your First Check
      </button>
    </div>
  );
}

function DashboardScreen({ dashData, onRunCheck, onViewHistory }) {
  const { latestCheck, totalChecks } = dashData;

  if (!latestCheck) {
    return (
      <div>
        <DashboardHeader dashData={dashData} onRunCheck={onRunCheck} onViewHistory={onViewHistory} />
        <EmptyDashboard onRunCheck={onRunCheck} />
      </div>
    );
  }

  const overall = latestCheck.overallResult || {};
  const overallColor = overall.color;
  const ss = STATUS_STYLES[overallColor];
  const criticalOverride = overall.criticalOverride;
  const checkStale = isStale(latestCheck.submittedAt);
  const monthLabel = formatMonthLabel(latestCheck.checkMonth);
  const submittedLabel = formatDate(latestCheck.submittedAt);

  const drMap = {};
  (latestCheck.domainResults || []).forEach(dr => { drMap[dr.domain] = dr; });

  return (
    <section data-testid="audit-readiness-dashboard" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <DashboardHeader dashData={dashData} onRunCheck={onRunCheck} onViewHistory={onViewHistory} />

      {/* Overall status row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <div>
          {ss && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: ss.dot, boxShadow: `0 0 8px ${ss.dot}` }} />
              <span data-testid="audit-overall-status" style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ss.color }}>
                {ss.label}
              </span>
            </div>
          )}
          <p style={{ fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: "0.25rem 0 0" }}>
            {monthLabel} · Last check: {submittedLabel || "—"}
          </p>
        </div>
        {checkStale && (
          <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", padding: "0.4rem 0.75rem" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,191,36,0.75)", margin: 0 }}>
              Last updated {submittedLabel} — confirm this is still current.
            </p>
          </div>
        )}
      </div>

      {/* Critical override banner */}
      {criticalOverride && (
        <div data-testid="critical-override-banner" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderLeft: "3px solid #ef4444", padding: "0.875rem 1.25rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(239,68,68,0.9)", margin: 0 }}>
            This month was marked Red because a critical issue was identified in Insurance & Authority or Audit Response.
          </p>
        </div>
      )}

      {/* Domain cards */}
      <div data-testid="audit-domain-cards">
        {DOMAIN_ORDER.map(dk => (
          <AuditDomainCard
            key={dk}
            domain={dk}
            domainResult={drMap[dk] || null}
            isCritical={DOMAIN_CRITICAL[dk]}
            isStale={checkStale}
            lastUpdatedLabel={submittedLabel}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ marginTop: "1.25rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          ["REPORTED", "Self-reported in monthly check-in"],
          ["VERIFIED", "Station Custodian reviewed your actual files"],
        ].map(([label, desc]) => (
          <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.476rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.6)", flexShrink: 0, paddingTop: 2 }}>{label}</span>
            <span style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function DashboardHeader({ dashData, onRunCheck, onViewHistory }) {
  const { totalChecks } = dashData;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
        <ClipboardCheck size={20} color="rgba(197,160,89,0.65)" style={{ flexShrink: 0, marginTop: 3 }} />
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.25rem" }}>
            MONTHLY AUDIT READINESS CHECK
          </p>
          <h3 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "clamp(1.1rem,2vw,1.35rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.25rem" }}>
            Self-Reported Dashboard
          </h3>
          <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.5 }}>
            Self-reported status is distinct from Station Custodian verification. Both shown separately — never merged.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
        {totalChecks > 0 && (
          <button
            data-testid="view-history-btn"
            onClick={onViewHistory}
            style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", fontFamily: "monospace", fontSize: "0.619rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer" }}
          >
            <History size={12} /> History
          </button>
        )}
        <button
          data-testid="start-checkin-btn"
          onClick={onRunCheck}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#d4900a", color: "#000F1F", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.5rem 1rem" }}
        >
          <RefreshCw size={13} /> Run this month's check
        </button>
      </div>
    </div>
  );
}

export default function AuditReadinessDashboard() {
  const [screen, setScreen] = useState("dashboard");
  const [dashData, setDashData] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/audit-readiness`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      setDashData(await res.json());
    } catch {
      setError("Could not load your audit readiness data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  async function handleViewHistory() {
    try {
      const res = await fetch(`${API}/api/audit-readiness/history`, { credentials: "include" });
      if (!res.ok) throw new Error();
      setHistoryList(await res.json());
      setScreen("history");
    } catch {
      setError("Could not load history.");
    }
  }

  async function handleSubmitCheck(answers, notes) {
    const res = await fetch(`${API}/api/audit-readiness`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, notes }),
    });
    if (!res.ok) throw new Error("Failed to submit check");
    const result = await res.json();
    setCurrentResult(result);
    setScreen("results");
    loadDashboard();
  }

  function handleViewHistoryResult(check) {
    setCurrentResult(check);
    setScreen("results");
  }

  if (loading) {
    return (
      <section style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.619rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.857rem", color: "rgba(239,68,68,0.7)" }}>{error}</p>
      </section>
    );
  }

  if (dashData && !dashData.enrolled) return <TeaserView />;

  if (screen === "run-check") {
    return (
      <AuditRunCheckScreen
        onSubmit={handleSubmitCheck}
        onCancel={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "results" && currentResult) {
    return (
      <AuditResultsScreen
        result={currentResult}
        onBack={() => setScreen("dashboard")}
        onViewHistory={handleViewHistory}
      />
    );
  }

  if (screen === "history") {
    return (
      <AuditHistoryScreen
        history={historyList}
        onBack={() => setScreen("dashboard")}
        onViewResult={handleViewHistoryResult}
      />
    );
  }

  return <DashboardScreen dashData={dashData || { enrolled: true, latestCheck: null, totalChecks: 0 }} onRunCheck={() => setScreen("run-check")} onViewHistory={handleViewHistory} />;
}
