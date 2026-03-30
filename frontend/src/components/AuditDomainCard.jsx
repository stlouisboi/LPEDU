import React, { useState } from "react";
import { CheckCircle, Clock, AlertCircle, ShieldCheck } from "lucide-react";

const COLOR_STYLES = {
  GREEN:  { bg: "rgba(34,197,94,0.06)",  border: "rgba(34,197,94,0.25)",  leftBorder: "#22c55e", labelColor: "rgba(34,197,94,0.8)",  dot: "#22c55e" },
  YELLOW: { bg: "rgba(251,191,36,0.05)", border: "rgba(251,191,36,0.22)", leftBorder: "#fbbf24", labelColor: "rgba(251,191,36,0.8)", dot: "#fbbf24" },
  RED:    { bg: "rgba(239,68,68,0.05)",  border: "rgba(239,68,68,0.25)",  leftBorder: "#ef4444", labelColor: "rgba(239,68,68,0.8)",  dot: "#ef4444" },
  null:   { bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.08)", leftBorder: "rgba(255,255,255,0.12)", labelColor: "rgba(255,255,255,0.3)", dot: "rgba(255,255,255,0.2)" },
};

const DOMAIN_COPY = {
  dq: { GREEN: "Every active driver has a complete, current DQ file and annual Clearinghouse query on record.", YELLOW: "Files exist but one element is uncertain. Check the action items below and confirm before next dispatch.", RED: "A driver is operating without a complete DQ file or without a Clearinghouse query. Automatic audit failure under 49 CFR Part 391. Fix before next dispatch." },
  da: { GREEN: "C/TPA enrollment active, random pool running, pre-employment tests and signed policies on file.", YELLOW: "Program exists but one element is uncertain. Verify the item flagged below.", RED: "No C/TPA enrollment, no pre-employment test, or no written policy. Every driver is retroactively at risk." },
  hos: { GREEN: "ELD registered and in-cab. Logs complete. Supporting documents filed by trip.", YELLOW: "Device registered but log documentation has gaps. Pull 6 months and verify.", RED: "ELD not registered with FMCSA or logs are missing. Roadside OOS order is the immediate consequence." },
  vm: { GREEN: "Every vehicle has a current annual inspection and DVIRs on file for every operating day.", YELLOW: "Annual inspections current but DVIR documentation has gaps. Pull and file the past 90 days.", RED: "A vehicle is past its annual inspection date or no DVIR process exists. Vehicle OOS per unit." },
  ia: { GREEN: "SAFER shows Active with exact legal name match. MCS-150 is current.", YELLOW: "Insurance active but MCS-150 timing is uncertain. Verify due date in the FMCSA portal.", RED: "SAFER does not show Active or name does not match. Authority revocation process can begin within days. Fix this before anything else on this dashboard." },
  ar: { GREEN: "All FMCSA correspondence answered within required deadlines. No open items.", YELLOW: "Portal messages may be unreviewed. Log in and check for any pending correspondence.", RED: "An audit notice or FMCSA communication has not been responded to. Automatic Unsatisfactory rating begins. This overrides every other item on this dashboard." },
};

const NOT_SURE_ACTIONS = {
  q1: "Verify that every active driver has all 12 required DQ file elements on file before next dispatch.",
  q2: "Verify annual Clearinghouse queries are current for all drivers. Required annually under 49 CFR 382.701.",
  q3: "Confirm your C/TPA enrollment is active and your driver is in the random testing pool.",
  q4: "Verify pre-employment drug test result is on file before this driver's next dispatch.",
  q5: "Locate your ELD registration confirmation and verify instruction card is physically present in every cab.",
  q6: "Pull 6 months of ELD logs and confirm supporting documents (BOLs, fuel receipts) are filed by trip.",
  q7: "Check annual inspection date on certificate. Must be within 365 days. Schedule immediately if overdue.",
  q8: "Pull DVIRs for the past 90 days. Any operating day without a DVIR on file is a violation.",
  q9: "Check SAFER now at safer.fmcsa.dot.gov. Verify 'Active' status and exact legal name match.",
  q10: "Log into portal.fmcsa.dot.gov and confirm your MCS-150 due date. File if within 60 days.",
  q11: "Log into FMCSA portal and review all correspondence. Any unanswered notice is an open liability.",
};

const DOMAIN_QUESTIONS = { dq: ["q1","q2"], da: ["q3","q4"], hos: ["q5","q6"], vm: ["q7","q8"], ia: ["q9","q10"], ar: ["q11"] };
const CRITICAL = ["ia", "ar"];

function formatDate(ts) {
  if (!ts) return null;
  try { return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
  catch { return null; }
}

export function AuditDomainCard({ domainKey, label, color, scVerified, answers, updatedAt, isStale, isCritical }) {
  const [open, setOpen] = useState(false);
  const sty = COLOR_STYLES[color] || COLOR_STYLES[null];
  const scData = scVerified || {};
  const bodyText = color && DOMAIN_COPY[domainKey]?.[color];
  const nsItems = (DOMAIN_QUESTIONS[domainKey] || []).filter(q => answers?.[q] === "NOT SURE");
  const updatedFmt = formatDate(updatedAt);

  return (
    <div
      data-testid={`audit-domain-card-${domainKey}`}
      style={{ background: sty.bg, border: `1px solid ${sty.border}`, borderLeft: `3px solid ${sty.leftBorder}`, marginBottom: "2px", transition: "border-color 0.2s" }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "1rem 1.25rem", gap: "0.75rem", textAlign: "left" }}
        aria-expanded={open}
        aria-label={`${label} domain detail`}
      >
        {/* Domain label */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>
              {label}
            </p>
            {isCritical && (
              <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(239,68,68,0.6)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "1px 5px" }}>CRITICAL</span>
            )}
            {isStale && updatedFmt && (
              <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,191,36,0.6)", background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", padding: "1px 5px" }}>
                Last updated {updatedFmt} — confirm still current
              </span>
            )}
          </div>
        </div>

        {/* Two indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {/* Self-reported */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "rgba(0,0,0,0.25)", border: `1px solid ${sty.border}`, padding: "0.3rem 0.6rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: sty.dot, boxShadow: color ? `0 0 5px ${sty.dot}` : "none" }} />
            <span style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: sty.labelColor }}>
              REPORTED: {color || "NOT STARTED"}
            </span>
          </div>
          {/* SC Verified */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: scData.verified ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.03)", border: scData.verified ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.08)", padding: "0.3rem 0.6rem" }}>
            {scData.verified ? (
              <>
                <ShieldCheck size={10} color="#22c55e" />
                <span style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(34,197,94,0.8)" }}>
                  VERIFIED {scData.date ? formatDate(scData.date) : ""}
                </span>
              </>
            ) : (
              <span style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                NOT YET VERIFIED
              </span>
            )}
          </div>
          {/* Chevron */}
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", opacity: 0.4 }}>
            <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {bodyText && (
            <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.72, margin: "0.875rem 0 0" }}>
              {bodyText}
            </p>
          )}
          {nsItems.length > 0 && (
            <div style={{ marginTop: "0.875rem" }}>
              {nsItems.map(q => (
                <div key={q} style={{ display: "flex", gap: "0.625rem", background: "rgba(251,191,36,0.04)", border: "1px solid rgba(251,191,36,0.15)", borderLeft: "2px solid rgba(251,191,36,0.4)", padding: "0.6rem 0.875rem", marginBottom: "4px" }}>
                  <AlertCircle size={13} color="#fbbf24" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.81rem", color: "rgba(252,211,77,0.85)", lineHeight: 1.6, margin: 0 }}>
                    Verify: {NOT_SURE_ACTIONS[q]}
                  </p>
                </div>
              ))}
            </div>
          )}
          {scData.note && (
            <div style={{ marginTop: "0.875rem", background: "rgba(197,160,89,0.05)", border: "1px solid rgba(197,160,89,0.15)", padding: "0.75rem 1rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.524rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.6)", margin: "0 0 0.375rem" }}>STATION CUSTODIAN NOTE</p>
              <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{scData.note}</p>
            </div>
          )}
          {!color && (
            <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.857rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: "0.875rem 0 0" }}>
              Complete the Monthly Audit Readiness Check to see your status for this domain.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
