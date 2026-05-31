import { useState, useEffect, useCallback } from "react";
import AdminNavBar from "../components/AdminNavBar";

const API  = process.env.REACT_APP_BACKEND_URL;
const GOLD = "#C8A96E";
const DARK = "#0a0f1a";
const MONO = "'JetBrains Mono','Courier New',monospace";
const SANS = "'Inter',sans-serif";

const TIER_CONFIG = {
  expired:  { label: "EXPIRED",  color: "rgba(148,163,184,0.55)", bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.18)" },
  critical: { label: "CRITICAL", color: "rgba(248,113,113,0.90)", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.30)" },
  high:     { label: "HIGH",     color: "rgba(245,158,11,0.90)",  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.30)"  },
  moderate: { label: "MODERATE", color: "rgba(251,191,36,0.85)",  bg: "rgba(251,191,36,0.06)",  border: "rgba(251,191,36,0.22)"  },
  low:      { label: "LOW",      color: "rgba(52,211,153,0.80)",  bg: "rgba(52,211,153,0.06)",  border: "rgba(52,211,153,0.22)"  },
};

function TierBadge({ tier }) {
  const cfg = TIER_CONFIG[tier] || TIER_CONFIG.low;
  return (
    <span style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, padding: "2px 8px", whiteSpace: "nowrap" }}>
      {cfg.label}
    </span>
  );
}

function EmailFlag({ sent, sentAt, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ width: 20, height: 20, background: sent ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${sent ? "rgba(52,211,153,0.35)" : "rgba(255,255,255,0.10)"}`, display: "flex", alignItems: "center", justifyContent: "center" }} title={sent && sentAt ? `Sent ${sentAt.slice(0,10)}` : "Not sent"}>
        <span style={{ fontFamily: MONO, fontSize: "0.55rem", color: sent ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.2)" }}>
          {sent ? "✓" : "–"}
        </span>
      </div>
      <span style={{ fontFamily: MONO, fontSize: "0.44rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{label}</span>
    </div>
  );
}

function CarrierRow({ c }) {
  const cfg = TIER_CONFIG[c.urgency] || TIER_CONFIG.low;
  return (
    <div
      data-testid={`audit-window-row-${c.email}`}
      style={{ display: "grid", gridTemplateColumns: "1fr 120px 110px 140px 90px", gap: "0 1rem", alignItems: "center", padding: "0.875rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", borderLeft: `2px solid ${cfg.border}`, background: c.urgency === "critical" ? "rgba(248,113,113,0.03)" : "transparent" }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: SANS, fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name || "—"}</p>
        <p style={{ fontFamily: MONO, fontSize: "0.524rem", color: "rgba(255,255,255,0.35)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.email}</p>
      </div>
      <div>
        <p style={{ fontFamily: MONO, fontSize: "0.476rem", color: "rgba(255,255,255,0.28)", margin: "0 0 2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>GRANT DATE</p>
        <p style={{ fontFamily: MONO, fontSize: "0.619rem", color: "rgba(255,255,255,0.65)", margin: 0 }}>{c.authority_grant_date}</p>
      </div>
      <div>
        <p style={{ fontFamily: MONO, fontSize: "0.476rem", color: "rgba(255,255,255,0.28)", margin: "0 0 2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>DAYS LEFT</p>
        <p style={{ fontFamily: MONO, fontSize: "0.857rem", fontWeight: 700, color: cfg.color, margin: 0 }}>{c.days_remaining <= 0 ? "CLOSED" : c.days_remaining}</p>
      </div>
      <div>
        <TierBadge tier={c.urgency} />
        <p style={{ fontFamily: MONO, fontSize: "0.44rem", color: "rgba(255,255,255,0.22)", margin: "4px 0 0", letterSpacing: "0.06em" }}>closes {c.window_end}</p>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        <EmailFlag sent={c.moderate_sent} sentAt={c.moderate_sent_at} label="MOD" />
        <EmailFlag sent={c.high_sent}     sentAt={c.high_sent_at}     label="HI" />
        <EmailFlag sent={c.critical_sent} sentAt={c.critical_sent_at} label="CRIT" />
      </div>
    </div>
  );
}

export default function AdminAuditWindowsPage() {
  const [authState, setAuthState] = useState("checking");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Auth check
  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(r => r.json())
      .then(d => setAuthState(d.email === "vince@launchpathedu.com" ? "authed" : "unauthed"))
      .catch(() => setAuthState("unauthed"));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/admin/audit-windows`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      setData(await res.json());
    } catch {
      setError("Could not load audit window data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authState === "authed") load(); }, [authState, load]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API}/api/auth/login`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loginForm) });
      if (!res.ok) throw new Error("bad");
      const d = await res.json();
      if (d.email === "vince@launchpathedu.com") setAuthState("authed");
      else setLoginError("Access denied.");
    } catch {
      setLoginError("Invalid credentials.");
    }
  }

  if (authState === "checking") {
    return <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontFamily: MONO, fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em" }}>LOADING...</p></div>;
  }

  if (authState === "unauthed") {
    return (
      <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleLogin} style={{ background: "#0e1621", border: "1px solid rgba(197,160,89,0.18)", padding: "2.5rem", width: 340 }}>
          <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, margin: "0 0 1.5rem" }}>ADMIN — AUDIT WINDOWS</p>
          <input type="email" placeholder="Email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} required style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFF", fontSize: "1rem", padding: "0.875rem 1.125rem", outline: "none", marginBottom: "0.75rem", fontFamily: SANS }} />
          <input type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} required style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFF", fontSize: "1rem", padding: "0.875rem 1.125rem", outline: "none", marginBottom: "1rem", fontFamily: SANS }} />
          {loginError && <p style={{ color: "rgba(248,113,113,0.8)", fontFamily: MONO, fontSize: "0.524rem", letterSpacing: "0.12em", margin: "0 0 0.75rem" }}>{loginError}</p>}
          <button type="submit" style={{ width: "100%", background: GOLD, color: "#001B36", fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "1rem", border: "none", cursor: "pointer" }}>SIGN IN</button>
        </form>
      </div>
    );
  }

  const carriers = data?.carriers || [];
  const filtered = carriers.filter(c => {
    if (filter !== "all" && c.urgency !== filter) return false;
    if (search) { const q = search.toLowerCase(); return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q); }
    return true;
  });

  const counts = {
    all: carriers.length,
    critical: carriers.filter(c => c.urgency === "critical").length,
    high: carriers.filter(c => c.urgency === "high").length,
    moderate: carriers.filter(c => c.urgency === "moderate").length,
    low: carriers.filter(c => c.urgency === "low").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: "#f4f7fb" }}>
      <AdminNavBar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, margin: "0 0 0.25rem" }}>STATION CUSTODIAN — AUDIT WINDOW TRACKER</p>
            <h2 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "clamp(1.1rem,2vw,1.6rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.25rem" }}>New Entrant Audit Windows</h2>
            <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
              {carriers.length} carrier{carriers.length !== 1 ? "s" : ""} with authority grant date set · Reminder emails auto-fire at moderate / high / critical thresholds
            </p>
          </div>
          <button onClick={load} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)", fontFamily: MONO, fontSize: "0.524rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.5rem 0.875rem", cursor: "pointer" }}>
            Refresh
          </button>
        </div>

        {/* Tier filters */}
        <div style={{ display: "flex", gap: "0.375rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {[{ key: "all", label: "ALL" }, { key: "critical", label: "CRITICAL" }, { key: "high", label: "HIGH" }, { key: "moderate", label: "MODERATE" }, { key: "low", label: "LOW" }].map(({ key, label }) => {
            const active = filter === key;
            const cfg = TIER_CONFIG[key] || { color: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.25)", bg: "rgba(255,255,255,0.06)" };
            return (
              <button key={key} onClick={() => setFilter(key)} style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: active ? cfg.color : "rgba(255,255,255,0.35)", background: active ? (key === "all" ? "rgba(255,255,255,0.06)" : cfg.bg) : "transparent", border: active ? `1px solid ${key === "all" ? "rgba(255,255,255,0.18)" : cfg.border}` : "1px solid rgba(255,255,255,0.08)", padding: "0.4rem 0.875rem", cursor: "pointer" }}>
                {label} ({counts[key] ?? 0})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", maxWidth: 340, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.7)", fontFamily: SANS, fontSize: "0.875rem", padding: "0.5rem 0.875rem", outline: "none", marginBottom: "1.5rem", boxSizing: "border-box" }} aria-label="Search carriers" />

        {/* Legend */}
        <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1rem", flexWrap: "wrap", padding: "0.5rem 1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          {["MOD → 120–240 days", "HI → 60–120 days", "CRIT → <60 days"].map(t => (
            <span key={t} style={{ fontFamily: MONO, fontSize: "0.476rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>{t}</span>
          ))}
          <span style={{ fontFamily: MONO, fontSize: "0.476rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(52,211,153,0.55)", marginLeft: "auto" }}>✓ = reminder sent</span>
        </div>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 110px 140px 90px", gap: "0 1rem", padding: "0.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {["CARRIER", "GRANT DATE", "DAYS LEFT", "URGENCY", "REMINDERS"].map(h => (
            <span key={h} style={{ fontFamily: MONO, fontSize: "0.476rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{h}</span>
          ))}
        </div>

        {loading && <p style={{ fontFamily: MONO, fontSize: "0.619rem", color: "rgba(255,255,255,0.30)", letterSpacing: "0.16em", padding: "1.5rem 1.25rem" }}>Loading...</p>}
        {error && <p style={{ color: "rgba(239,68,68,0.7)", fontSize: "0.875rem", padding: "1rem 1.25rem" }}>{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "rgba(255,255,255,0.35)", padding: "1.5rem 1.25rem" }}>
            {search || filter !== "all" ? "No carriers match current filters." : "No carriers with authority_grant_date set yet."}
          </p>
        )}
        {!loading && !error && filtered.map(c => <CarrierRow key={c.email} c={c} />)}
      </div>
    </div>
  );
}
