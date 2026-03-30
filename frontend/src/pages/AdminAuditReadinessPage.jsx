import React, { useState, useEffect, useCallback } from "react";
import { ShieldCheck, Mail, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;

const DOMAINS = [
  { key: "dq",  label: "Driver Qualification",  critical: false },
  { key: "da",  label: "Drug & Alcohol",         critical: false },
  { key: "hos", label: "HOS / ELD",              critical: false },
  { key: "vm",  label: "Vehicle Maintenance",    critical: false },
  { key: "ia",  label: "Insurance & Authority",  critical: true  },
  { key: "ar",  label: "Audit Response",         critical: true  },
];

const COLOR_DOT = {
  GREEN:  { bg: "rgba(34,197,94,0.12)",  color: "rgba(34,197,94,0.9)",  border: "rgba(34,197,94,0.3)"  },
  YELLOW: { bg: "rgba(251,191,36,0.1)",  color: "rgba(251,191,36,0.9)", border: "rgba(251,191,36,0.3)" },
  RED:    { bg: "rgba(239,68,68,0.1)",   color: "rgba(239,68,68,0.9)",  border: "rgba(239,68,68,0.3)"  },
};

const OVERRIDE_OPTS = [null, "GREEN", "YELLOW", "RED"];

function formatDate(ts) {
  if (!ts) return "—";
  try { return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
  catch { return "—"; }
}

function StatusBadge({ status }) {
  const s = COLOR_DOT[status];
  if (!s) return <span style={{ fontFamily: "monospace", fontSize: "0.524rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}>NOT STARTED</span>;
  return (
    <span style={{ fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: "2px 7px" }}>
      {status}
    </span>
  );
}

function CarrierRow({ carrier, onVerifyDomain, onSendEmail }) {
  const [open, setOpen] = useState(false);
  const [verifyState, setVerifyState] = useState(carrier.scVerified || {});
  const [pendingNotes, setPendingNotes] = useState({});
  const [pendingOverrides, setPendingOverrides] = useState({});
  const [saving, setSaving] = useState({});
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleVerify(domainKey, verified) {
    setSaving(prev => ({ ...prev, [domainKey]: true }));
    try {
      await onVerifyDomain(carrier.userId, domainKey, {
        verified,
        note: pendingNotes[domainKey] ?? verifyState[domainKey]?.note ?? "",
        override: pendingOverrides[domainKey] ?? verifyState[domainKey]?.override ?? null,
      });
      setVerifyState(prev => ({
        ...prev,
        [domainKey]: { ...prev[domainKey], verified, date: verified ? new Date().toISOString() : prev[domainKey]?.date },
      }));
    } finally {
      setSaving(prev => ({ ...prev, [domainKey]: false }));
    }
  }

  async function handleSaveNote(domainKey) {
    setSaving(prev => ({ ...prev, [`note_${domainKey}`]: true }));
    try {
      await onVerifyDomain(carrier.userId, domainKey, {
        verified: verifyState[domainKey]?.verified ?? false,
        note: pendingNotes[domainKey] ?? "",
        override: pendingOverrides[domainKey] ?? verifyState[domainKey]?.override ?? null,
      });
      setVerifyState(prev => ({
        ...prev,
        [domainKey]: { ...prev[domainKey], note: pendingNotes[domainKey] ?? "" },
      }));
    } finally {
      setSaving(prev => ({ ...prev, [`note_${domainKey}`]: false }));
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

  const hasStale = carrier.staleDomains?.length > 0;

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.08)", marginBottom: "2px" }}>
      {/* Carrier header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0.875rem 1.25rem", gap: "0.875rem", textAlign: "left" }}
        aria-expanded={open}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: 0 }}>{carrier.name}</p>
            <p style={{ fontFamily: "monospace", fontSize: "0.524rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>{carrier.email}</p>
            {hasStale && <AlertTriangle size={12} color="#fbbf24" />}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
            <StatusBadge status={carrier.overallStatus} />
            {carrier.lastCompleted && (
              <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
                Last: {formatDate(carrier.lastCompleted)}
              </span>
            )}
          </div>
        </div>
        {/* Domain mini badges */}
        <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {DOMAINS.map(d => {
            const c = carrier.domainColors?.[d.key];
            const s = COLOR_DOT[c];
            const isStale = carrier.staleDomains?.includes(d.key);
            return (
              <div key={d.key} style={{ width: 24, height: 24, background: s?.bg || "rgba(255,255,255,0.03)", border: `1px solid ${s?.border || "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }} title={`${d.label}: ${c || "NOT STARTED"}`}>
                {isStale && <div style={{ position: "absolute", top: -2, right: -2, width: 6, height: 6, borderRadius: "50%", background: "#fbbf24" }} />}
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: s?.color || "rgba(255,255,255,0.15)" }} />
              </div>
            );
          })}
        </div>
        {open ? <ChevronUp size={14} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.3)" />}
      </button>

      {/* Expanded domain detail */}
      {open && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1rem 1.25rem" }}>
          {/* Send email button */}
          <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              data-testid={`send-email-${carrier.userId}`}
              onClick={handleSendEmail}
              disabled={emailSending || !carrier.overallStatus || carrier.overallStatus === "NOT STARTED"}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: emailSent ? "rgba(34,197,94,0.15)" : "rgba(197,160,89,0.12)", border: `1px solid ${emailSent ? "rgba(34,197,94,0.3)" : "rgba(197,160,89,0.25)"}`, color: emailSent ? "rgba(34,197,94,0.9)" : "rgba(197,160,89,0.85)", fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer", transition: "all 0.2s" }}
            >
              <Mail size={12} />
              {emailSending ? "Sending..." : emailSent ? "Email Sent" : "Send Monthly Email"}
            </button>
            {hasStale && (
              <p style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(251,191,36,0.65)", margin: 0, letterSpacing: "0.1em" }}>
                {carrier.staleDomains.length} domain(s) not updated in 45+ days
              </p>
            )}
          </div>

          {/* Domain rows */}
          {DOMAINS.map(d => {
            const color = carrier.domainColors?.[d.key];
            const updated = carrier.domainUpdated?.[d.key];
            const sc = verifyState[d.key] || {};
            const isStale = carrier.staleDomains?.includes(d.key);
            const s = COLOR_DOT[color];
            const pendingNote = pendingNotes[d.key] ?? sc.note ?? "";
            const pendingOverride = pendingOverrides[d.key] !== undefined ? pendingOverrides[d.key] : sc.override ?? null;

            return (
              <div key={d.key} style={{ marginBottom: "2px", padding: "0.875rem", background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.06)` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", flexWrap: "wrap" }}>
                  {/* Domain info */}
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                      <p style={{ fontFamily: "monospace", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>{d.label}</p>
                      {d.critical && <span style={{ fontFamily: "monospace", fontSize: "0.44rem", letterSpacing: "0.12em", color: "rgba(239,68,68,0.6)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "1px 4px" }}>CRITICAL</span>}
                      {isStale && <AlertTriangle size={10} color="#fbbf24" />}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <StatusBadge status={color} />
                      <span style={{ fontFamily: "monospace", fontSize: "0.476rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
                        Updated: {formatDate(updated)}
                      </span>
                    </div>
                    {/* Override */}
                    <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <label style={{ fontFamily: "monospace", fontSize: "0.476rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>SC Override:</label>
                      <select
                        value={pendingOverride || ""}
                        onChange={e => setPendingOverrides(prev => ({ ...prev, [d.key]: e.target.value || null }))}
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontFamily: "monospace", fontSize: "0.524rem", padding: "2px 4px", letterSpacing: "0.1em", cursor: "pointer" }}
                      >
                        {OVERRIDE_OPTS.map(o => <option key={o ?? "none"} value={o ?? ""}>{o || "None"}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* SC Verified toggle */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem", flexShrink: 0 }}>
                    <button
                      data-testid={`verify-toggle-${d.key}-${carrier.userId}`}
                      onClick={() => handleVerify(d.key, !sc.verified)}
                      disabled={saving[d.key]}
                      style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: sc.verified ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", border: sc.verified ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)", color: sc.verified ? "rgba(34,197,94,0.9)" : "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.4rem 0.75rem", cursor: "pointer", transition: "all 0.2s" }}
                    >
                      <ShieldCheck size={11} />
                      {saving[d.key] ? "..." : sc.verified ? `Verified ${sc.date ? formatDate(sc.date) : ""}` : "Mark Verified"}
                    </button>
                  </div>
                </div>

                {/* Note field */}
                <div style={{ marginTop: "0.625rem", display: "flex", gap: "0.5rem" }}>
                  <input
                    placeholder="Station Custodian note (visible to carrier)..."
                    value={pendingNote}
                    onChange={e => setPendingNotes(prev => ({ ...prev, [d.key]: e.target.value }))}
                    style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.81rem", padding: "0.375rem 0.625rem", outline: "none" }}
                    aria-label={`Note for ${d.label}`}
                  />
                  <button
                    onClick={() => handleSaveNote(d.key)}
                    disabled={saving[`note_${d.key}`]}
                    style={{ background: "rgba(197,160,89,0.1)", border: "1px solid rgba(197,160,89,0.2)", color: "rgba(197,160,89,0.75)", fontFamily: "monospace", fontSize: "0.476rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.375rem 0.625rem", cursor: "pointer" }}
                  >
                    {saving[`note_${d.key}`] ? "..." : "Save"}
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

  async function handleVerifyDomain(userId, domain, payload) {
    const res = await fetch(`${API}/api/admin/audit-readiness/${userId}/domain/${domain}`, {
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
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace", fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.7)", margin: "0 0 0.25rem" }}>
            STATION CUSTODIAN — AUDIT READINESS
          </p>
          <h2 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.25rem", letterSpacing: "-0.01em" }}>
            Carrier Readiness Overview
          </h2>
          <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            {carriers.length} carrier{carriers.length !== 1 ? "s" : ""} · Set SC verified status, add notes, send monthly email
          </p>
        </div>
        <button onClick={load} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer" }}>
          Refresh
        </button>
      </div>

      {/* Search */}
      <input
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: 360, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.875rem", padding: "0.5rem 0.875rem", outline: "none", marginBottom: "1.25rem", boxSizing: "border-box" }}
        aria-label="Search carriers"
      />

      {/* Loading / error */}
      {loading && <p style={{ fontFamily: "monospace", fontSize: "0.619rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.16em" }}>Loading...</p>}
      {error && <p style={{ color: "rgba(239,68,68,0.7)", fontSize: "0.875rem" }}>{error}</p>}

      {/* Carrier list */}
      {!loading && !error && filtered.length === 0 && (
        <p style={{ fontFamily: "var(--font-body,'Source Sans 3',sans-serif)", fontSize: "0.875rem", color: "rgba(255,255,255,0.35)" }}>
          {search ? "No carriers match your search." : "No audit readiness records yet. Carriers appear here after completing their first check-in."}
        </p>
      )}

      {!loading && filtered.map(c => (
        <CarrierRow key={c.userId} carrier={c} onVerifyDomain={handleVerifyDomain} onSendEmail={handleSendEmail} />
      ))}
    </div>
  );
}
