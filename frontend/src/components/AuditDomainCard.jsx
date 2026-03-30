import React, { useState } from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { DOMAIN_LABELS, DOMAIN_CRITICAL, DOMAIN_COPY, COLOR_STYLES, formatDate } from "./auditConfig";

function getEffectiveColor(domainResult) {
  if (!domainResult) return null;
  return domainResult.sc_colorOverride || domainResult.color || null;
}

export function AuditDomainCard({ domain, domainResult, isCritical, isStale, lastUpdatedLabel }) {
  const [open, setOpen] = useState(false);
  const dr = domainResult || {};
  const selfColor = dr.color || null;
  const sty = COLOR_STYLES[selfColor] || COLOR_STYLES[null];
  const bodyText = selfColor && DOMAIN_COPY[domain]?.[selfColor];
  const nsItems = dr.notSureVerifyLines || [];
  const scVerified = dr.sc_verified || false;
  const scDate = dr.sc_verifiedAt ? formatDate(dr.sc_verifiedAt) : null;
  const scNote = dr.sc_note || null;

  return (
    <div
      data-testid={`audit-domain-card-${domain}`}
      style={{ background: sty.bg, border: `1px solid ${sty.border}`, borderLeft: `3px solid ${sty.leftBorder}`, marginBottom: "2px", transition: "border-color 0.2s" }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "1rem 1.25rem", gap: "0.75rem", textAlign: "left" }}
        aria-expanded={open}
        aria-label={`${DOMAIN_LABELS[domain]} domain detail`}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>
              {DOMAIN_LABELS[domain]}
            </p>
            {isCritical && (
              <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(239,68,68,0.6)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "1px 5px" }}>CRITICAL</span>
            )}
            {isStale && lastUpdatedLabel && (
              <span style={{ fontFamily: "monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,191,36,0.65)", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.18)", padding: "1px 5px" }}>
                Last updated {lastUpdatedLabel} — confirm still current
              </span>
            )}
          </div>
        </div>

        {/* REPORTED + VERIFIED indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {/* Self-reported */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "rgba(0,0,0,0.25)", border: `1px solid ${sty.border}`, padding: "0.3rem 0.6rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: sty.dot, boxShadow: selfColor ? `0 0 5px ${sty.dot}` : "none" }} />
            <span style={{ fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: sty.labelColor }}>
              REPORTED: {selfColor || "NOT STARTED"}
            </span>
          </div>
          {/* SC Verified */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.35rem",
            background: scVerified ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.03)",
            border: scVerified ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.08)",
            padding: "0.3rem 0.6rem",
          }}>
            {scVerified ? (
              <>
                <ShieldCheck size={10} color="#22c55e" />
                <span style={{ fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(34,197,94,0.85)" }}>
                  VERIFIED {scDate ? `✓ ${scDate}` : "✓"}
                </span>
              </>
            ) : (
              <span style={{ fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                NOT YET VERIFIED
              </span>
            )}
          </div>
          {/* Chevron */}
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", opacity: 0.4 }}>
            <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
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
              {nsItems.map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "0.625rem", background: "rgba(251,191,36,0.04)", border: "1px solid rgba(251,191,36,0.15)", borderLeft: "2px solid rgba(251,191,36,0.4)", padding: "0.6rem 0.875rem", marginBottom: "4px" }}>
                  <AlertCircle size={13} color="#fbbf24" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.81rem", color: "rgba(252,211,77,0.85)", lineHeight: 1.6, margin: 0 }}>
                    Verify: {line}
                  </p>
                </div>
              ))}
            </div>
          )}
          {scNote && (
            <div style={{ marginTop: "0.875rem", background: "rgba(197,160,89,0.05)", border: "1px solid rgba(197,160,89,0.15)", padding: "0.75rem 1rem" }}>
              <p style={{ fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.6)", margin: "0 0 0.375rem" }}>STATION CUSTODIAN NOTE</p>
              <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{scNote}</p>
            </div>
          )}
          {!selfColor && (
            <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.857rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: "0.875rem 0 0" }}>
              Complete the Monthly Audit Readiness Check to see your status for this domain.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
