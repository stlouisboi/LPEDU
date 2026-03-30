import React, { useState, useEffect, useCallback } from "react";
import { ClipboardCheck, Lock, ArrowRight, RefreshCw } from "lucide-react";
import { AuditDomainCard } from "./AuditDomainCard";
import AuditCheckInFlow from "./AuditCheckInFlow";

const API = process.env.REACT_APP_BACKEND_URL;

const DOMAINS = [
  { key: "dq",  label: "Driver Qualification",  critical: false },
  { key: "da",  label: "Drug & Alcohol",         critical: false },
  { key: "hos", label: "HOS / ELD",              critical: false },
  { key: "vm",  label: "Vehicle Maintenance",    critical: false },
  { key: "ia",  label: "Insurance & Authority",  critical: true  },
  { key: "ar",  label: "Audit Response",         critical: true  },
];

const STATUS_STYLES = {
  GREEN:       { label: "ALL CLEAR",    dot: "#22c55e", color: "rgba(34,197,94,0.85)"  },
  YELLOW:      { label: "NEEDS REVIEW", dot: "#fbbf24", color: "rgba(251,191,36,0.85)" },
  RED:         { label: "ACTION REQUIRED", dot: "#ef4444", color: "rgba(239,68,68,0.85)" },
  "NOT STARTED": { label: "NOT STARTED", dot: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.4)" },
  "IN PROGRESS": { label: "IN PROGRESS", dot: "#d4900a", color: "rgba(212,144,10,0.85)" },
};

export default function AuditReadinessDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckin, setShowCheckin] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/audit-readiness`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      setData(await res.json());
    } catch (e) {
      setError("Could not load your audit readiness data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSubmitAnswers(answers, domain, isLast) {
    const res = await fetch(`${API}/api/audit-readiness/answers`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, domain }),
    });
    if (!res.ok) throw new Error("Failed to save");
    const updated = await res.json();
    // Optimistically update local state
    setData(prev => prev ? {
      ...prev,
      domainColors: updated.domainColors,
      overallStatus: updated.overallStatus,
      domainAnswers: { ...(prev.domainAnswers || {}), ...answers },
    } : prev);
    if (isLast) {
      setShowCheckin(false);
      setSubmitSuccess(true);
      await load();
      setTimeout(() => setSubmitSuccess(false), 4000);
    }
  }

  // Non-enrolled teaser
  if (data && !data.enrolled) {
    return (
      <section data-testid="audit-readiness-teaser" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
          <ClipboardCheck size={22} color="rgba(197,160,89,0.6)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.375rem" }}>
              MONTHLY AUDIT READINESS CHECK
            </p>
            <h3 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.75rem", letterSpacing: "-0.01em" }}>
              Know where you stand before the auditor does
            </h3>
            <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.924rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.72, margin: "0 0 1.25rem", maxWidth: 520 }}>
              Enrolled Standard carriers run a monthly 11-question self-assessment across six FMCSA compliance domains. Your dashboard shows your self-reported status alongside your Station Custodian verified status — always separately, never merged.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", maxWidth: 420, marginBottom: "1.5rem" }}>
              {["Driver Qualification", "Drug & Alcohol", "HOS / ELD", "Vehicle Maintenance", "Insurance & Authority", "Audit Response"].map(d => (
                <div key={d} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "0.5rem 0.75rem" }}>
                  <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.476rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
            <a href="/program" data-testid="audit-enroll-cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#d4900a", color: "#000F1F", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.75rem 1.25rem", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
              onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
            >
              Unlock Monthly Audit Readiness <ArrowRight size={14} />
            </a>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.476rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "0.625rem" }}>
              LAUNCHPATH STANDARD — ENROLLED CARRIERS ONLY
            </p>
          </div>
        </div>
      </section>
    );
  }

  const overall = data?.overallStatus || "NOT STARTED";
  const ss = STATUS_STYLES[overall] || STATUS_STYLES["NOT STARTED"];

  const lastCompleted = data?.lastCompleted
    ? new Date(data.lastCompleted).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <section data-testid="audit-readiness-dashboard" style={{ padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
          <ClipboardCheck size={20} color="rgba(197,160,89,0.65)" style={{ flexShrink: 0, marginTop: 3 }} />
          <div>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.25rem" }}>
              MONTHLY AUDIT READINESS CHECK
            </p>
            <h3 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.25rem", letterSpacing: "-0.01em" }}>
              Self-Reported Dashboard
            </h3>
            <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.5 }}>
              Self-reported status is distinct from Station Custodian verification. Both are shown side by side — never merged.
            </p>
          </div>
        </div>

        {/* Overall status + CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 }}>
          {!loading && data && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: ss.dot, boxShadow: `0 0 7px ${ss.dot}` }} />
              <span data-testid="audit-overall-status" style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ss.color }}>
                {ss.label}
              </span>
            </div>
          )}
          {lastCompleted && (
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.476rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)", margin: 0, textTransform: "uppercase" }}>
              Last check-in: {lastCompleted}
            </p>
          )}
          <button
            data-testid="start-checkin-btn"
            onClick={() => setShowCheckin(true)}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#d4900a", color: "#000F1F", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.5rem 1rem", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
          >
            <RefreshCw size={13} />
            {lastCompleted ? "Run Monthly Check-in" : "Start Check-in"}
          </button>
        </div>
      </div>

      {/* Success banner */}
      {submitSuccess && (
        <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderLeft: "3px solid #22c55e", padding: "0.875rem 1.25rem", marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(34,197,94,0.85)", margin: 0 }}>
            Check-in complete — dashboard updated
          </p>
        </div>
      )}

      {/* Loading / error */}
      {loading && (
        <div style={{ padding: "2rem 0", textAlign: "center" }}>
          <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Loading...</p>
        </div>
      )}
      {error && (
        <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.857rem", color: "rgba(239,68,68,0.7)", margin: "0 0 1rem" }}>{error}</p>
      )}

      {/* Domain cards */}
      {!loading && data && (
        <div data-testid="audit-domain-cards">
          {DOMAINS.map(d => (
            <AuditDomainCard
              key={d.key}
              domainKey={d.key}
              label={d.label}
              color={data.domainColors?.[d.key] || null}
              scVerified={data.scVerified?.[d.key]}
              answers={data.domainAnswers || {}}
              updatedAt={data.domainUpdated?.[d.key]}
              isStale={data.staleDomains?.includes(d.key)}
              isCritical={d.critical}
            />
          ))}
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: "1.25rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {[["REPORTED", "Self-reported in monthly check-in"], ["VERIFIED", "Station Custodian reviewed your actual files"]].map(([label, desc]) => (
          <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.476rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.6)", flexShrink: 0, paddingTop: 2 }}>{label}</span>
            <span style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{desc}</span>
          </div>
        ))}
      </div>

      {/* Check-in flow modal */}
      {showCheckin && (
        <AuditCheckInFlow
          initialAnswers={data?.domainAnswers || {}}
          onSubmit={handleSubmitAnswers}
          onClose={() => setShowCheckin(false)}
        />
      )}
    </section>
  );
}
