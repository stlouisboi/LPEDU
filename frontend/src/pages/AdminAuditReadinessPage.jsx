import React, { useState, useEffect, useCallback } from "react";
import { ShieldCheck, Mail, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { DOMAIN_ORDER, DOMAIN_LABELS, DOMAIN_CRITICAL, COLOR_STYLES, formatDate, formatMonthLabel } from "../components/auditConfig";

const API = process.env.REACT_APP_BACKEND_URL;

const OVERRIDE_OPTS = ["", "GREEN", "YELLOW", "RED"];

function ColorBadge({ color }) {
  const s = COLOR_STYLES[color] || null;
  if (!s || !color) return <span style={{ fontFamily: "monospace", fontSize: "0.524rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>—</span>;
  return (
    <span style={{ fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: s.labelColor, background: s.bg, border: `1px solid ${s.border}`, padding: "2px 7px" }}>
      {color}
    </span>
  );
}

function MiniDot({ color }) {
  const s = COLOR_STYLES[color] || COLOR_STYLES[null];
  return (
    <div style={{ width: 22, height: 22, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center" }} title={color || "NOT STARTED"}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot }} />
    </div>
  );
}

function CarrierRow({ carrier, onVerifyDomain, onSendEmail }) {
  const [open, setOpen] = useState(false);
  const [scState, setScState] = useState({});
  const [pendingNotes, setPendingNotes] = useState({});
  const [pendingOverrides, setPendingOverrides] = useState({});
  const [saving, setSaving] = useState({});
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Build sc state map from domainResults
  useEffect(() => {
    const map = {};
    (carrier.domainResults || []).forEach(dr => {
      map[dr.domain] = {
        verified: dr.sc_verified || false,
        verifiedAt: dr.sc_verifiedAt || null,
        note: dr.sc_note || "",
        colorOverride: dr.sc_colorOverride || null,
      };
    });
    setScState(map);
  }, [carrier]);

  async function handleVerify(domain, verified) {
    setSaving(p => ({ ...p, [domain]: true }));
    try {
      await onVerifyDomain(carrier.latestCheckId, domain, {
        verified,
        note: pendingNotes[domain] ?? scState[domain]?.note ?? "",
        color_override: pendingOverrides[domain] !== undefined ? pendingOverrides[domain] : scState[domain]?.colorOverride ?? null,
      });
      setScState(p => ({
        ...p,
        [domain]: { ...p[domain], verified, verifiedAt: verified ? new Date().toISOString() : p[domain]?.verifiedAt },
      }));
    } finally {
      setSaving(p => ({ ...p, [domain]: false }));
    }
  }

  async function handleSaveNote(domain) {
    setSaving(p => ({ ...p, [`note_${domain}`]: true }));
    try {
      await onVerifyDomain(carrier.latestCheckId, domain, {
        verified: scState[domain]?.verified ?? false,
        note: pendingNotes[domain] ?? "",
        color_override: pendingOverrides[domain] !== undefined ? pendingOverrides[domain] : scState[domain]?.colorOverride ?? null,
      });
      setScState(p => ({ ...p, [domain]: { ...p[domain], note: pendingNotes[domain] ?? "" } }));
    } finally {
      setSaving(p => ({ ...p, [`note_${domain}`]: false }));
    }
  }

  async function handleSendEmail() {
    setEmailSending(true);
    try {
      await onSendEmail(carrier.userId);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } finally {
      setEmailSending(false);
    }
  }

  const drMap = {};
  (carrier.domainResults || []).forEach(dr => { drMap[dr.domain] = dr; });
  const overallColor = carrier.overallResult?.color;

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.08)", marginBottom: "2px" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0.875rem 1.25rem", gap: "0.875rem", textAlign: "left" }}
        aria-expanded={open}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: 0 }}>{carrier.name}</p>
            <p style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>{carrier.email}</p>
            {carrier.isStale && <AlertTriangle size={12} color="#fbbf24" />}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
            <ColorBadge color={overallColor} />
            {carrier.latestCheckMonth && (
              <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
                {formatMonthLabel(carrier.latestCheckMonth)}
              </span>
            )}
            <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
              {carrier.totalChecks} check{carrier.totalChecks !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {DOMAIN_ORDER.map(dk => <MiniDot key={dk} color={drMap[dk]?.color || null} />)}
        </div>
        {open ? <ChevronUp size={14} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.3)" />}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1rem 1.25rem" }}>
          {/* Send email */}
          <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              data-testid={`send-email-${carrier.userId}`}
              onClick={handleSendEmail}
              disabled={emailSending || !overallColor}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: emailSent ? "rgba(34,197,94,0.12)" : "rgba(197,160,89,0.1)", border: `1px solid ${emailSent ? "rgba(34,197,94,0.3)" : "rgba(197,160,89,0.22)"}`, color: emailSent ? "rgba(34,197,94,0.9)" : "rgba(197,160,89,0.85)", fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer" }}
            >
              <Mail size={12} />
              {emailSending ? "Sending..." : emailSent ? "Sent" : "Send Monthly Email"}
            </button>
            {carrier.isStale && (
              <p style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(251,191,36,0.65)", margin: 0 }}>
                Last check is 45+ days old
              </p>
            )}
          </div>

          {/* Domain rows */}
          {DOMAIN_ORDER.map(dk => {
            const dr = drMap[dk] || {};
            const sc = scState[dk] || {};
            const pendingNote = pendingNotes[dk] ?? sc.note ?? "";
            const pendingOverride = pendingOverrides[dk] !== undefined ? pendingOverrides[dk] : sc.colorOverride ?? "";

            return (
              <div key={dk} style={{ marginBottom: "2px", padding: "0.875rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", flexWrap: "wrap" }}>
                  {/* Domain info */}
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                      <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>{DOMAIN_LABELS[dk]}</p>
                      {DOMAIN_CRITICAL[dk] && (
                        <span style={{ fontFamily: "monospace", fontSize: "0.44rem", letterSpacing: "0.1em", color: "rgba(239,68,68,0.6)", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", padding: "1px 4px", textTransform: "uppercase" }}>CRITICAL</span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <ColorBadge color={dr.color} />
                      {dr.scorePercent != null && (
                        <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>{dr.scorePercent}%</span>
                      )}
                    </div>
                    {/* SC Override */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <label style={{ fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>SC Override:</label>
                      <select
                        value={pendingOverride}
                        onChange={e => setPendingOverrides(p => ({ ...p, [dk]: e.target.value || null }))}
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontFamily: "monospace", fontSize: "0.524rem", padding: "2px 4px", cursor: "pointer" }}
                      >
                        {OVERRIDE_OPTS.map(o => <option key={o} value={o}>{o || "None"}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Verify toggle */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem", flexShrink: 0 }}>
                    <button
                      data-testid={`verify-toggle-${dk}-${carrier.userId}`}
                      onClick={() => handleVerify(dk, !sc.verified)}
                      disabled={saving[dk]}
                      style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: sc.verified ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", border: sc.verified ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)", color: sc.verified ? "rgba(34,197,94,0.9)" : "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.4rem 0.75rem", cursor: "pointer" }}
                    >
                      <ShieldCheck size={11} />
                      {saving[dk] ? "..." : sc.verified ? `Verified ${sc.verifiedAt ? formatDate(sc.verifiedAt) : ""}` : "Mark Verified"}
                    </button>
                  </div>
                </div>

                {/* Note field */}
                <div style={{ marginTop: "0.625rem", display: "flex", gap: "0.5rem" }}>
                  <input
                    placeholder="Station Custodian note (visible to carrier)..."
                    value={pendingNote}
                    onChange={e => setPendingNotes(p => ({ ...p, [dk]: e.target.value }))}
                    style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.81rem", padding: "0.375rem 0.625rem", outline: "none" }}
                    aria-label={`Note for ${DOMAIN_LABELS[dk]}`}
                  />
                  <button
                    onClick={() => handleSaveNote(dk)}
                    disabled={saving[`note_${dk}`]}
                    style={{ background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.18)", color: "rgba(197,160,89,0.75)", fontFamily: "monospace", fontSize: "0.476rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.375rem 0.625rem", cursor: "pointer" }}
                  >
                    {saving[`note_${dk}`] ? "..." : "Save"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminAuditReadinessPage() {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/admin/audit-readiness`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      setCarriers(await res.json());
    } catch {
      setError("Could not load audit readiness data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleVerifyDomain(checkId, domain, payload) {
    const res = await fetch(`${API}/api/admin/audit-readiness/check/${checkId}/domain/${domain}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update");
  }

  async function handleSendEmail(userId) {
    const res = await fetch(`${API}/api/admin/audit-readiness/${userId}/send-email`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to send email");
  }

  const filtered = carriers.filter(c =>
    !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-testid="admin-audit-readiness" style={{ padding: "2rem 0" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.25rem" }}>
            STATION CUSTODIAN — AUDIT READINESS
          </p>
          <h2 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.25rem" }}>
            Carrier Readiness Overview
          </h2>
          <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            {carriers.length} carrier{carriers.length !== 1 ? "s" : ""} · Verify domains, add notes, send monthly email
          </p>
        </div>
        <button onClick={load} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer" }}>
          Refresh
        </button>
      </div>

      <input
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: 360, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.875rem", padding: "0.5rem 0.875rem", outline: "none", marginBottom: "1.25rem", boxSizing: "border-box" }}
        aria-label="Search carriers"
      />

      {loading && <p style={{ fontFamily: "monospace", fontSize: "0.619rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.16em" }}>Loading...</p>}
      {error && <p style={{ color: "rgba(239,68,68,0.7)", fontSize: "0.875rem" }}>{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.875rem", color: "rgba(255,255,255,0.35)" }}>
          {search ? "No carriers match your search." : "No audit readiness checks yet. Carriers appear here after their first check."}
        </p>
      )}

      {!loading && filtered.map(c => (
        <CarrierRow key={c.userId} carrier={c} onVerifyDomain={handleVerifyDomain} onSendEmail={handleSendEmail} />
      ))}
    </div>
  );
}
