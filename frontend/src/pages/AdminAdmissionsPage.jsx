import { useState, useEffect, useCallback } from "react";
import FooterSection from "../components/FooterSection";
import AdminNavBar from "../components/AdminNavBar";

const gold = "#C5A059";
const goldDim = "rgba(197,160,89,0.75)";
const navy = "#001A33";
const dark = "#080f1e";
const card = "#0D1929";
const mono = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const body = "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif";
const condensed = "'Newsreader', 'Playfair Display', serif";

const STATUS_CONFIG = {
  pending_review: { label: "Pending Review", color: "#fb923c", bg: "rgba(251,146,60,0.10)" },
  approved:       { label: "Enrolled",       color: "#4ade80", bg: "rgba(74,222,128,0.10)" },
  rejected:       { label: "Declined",       color: "#f87171", bg: "rgba(248,113,113,0.10)" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending_review;
  return (
    <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: cfg.color, background: cfg.bg, padding: "0.25rem 0.6rem" }}>
      {cfg.label}
    </span>
  );
}

function LaneTag({ lane }) {
  return (
    <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(197,160,89,0.70)", background: "rgba(197,160,89,0.07)", padding: "0.2rem 0.5rem" }}>
      {lane === "box_truck" ? "Box Truck" : "Semi"}
    </span>
  );
}

// ── Login Gate ───────────────────────────────────────────────────────────────
function AdminLoginGate({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, setState] = useState("idle"); // idle | loading | error
  const API = process.env.REACT_APP_BACKEND_URL;

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)",
    color: "#FFFFFF", fontFamily: body, fontSize: "1rem",
    padding: "0.875rem 1.125rem", outline: "none",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      const resp = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error("Invalid credentials");
      const data = await resp.json();
      if (data.user?.email !== "vince@launchpathedu.com") {
        setState("error");
        return;
      }
      onSuccess();
    } catch {
      setState("error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "112px 24px 80px" }}>
      <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: goldDim, marginBottom: "1.25rem" }}>
        LP-ADM-001 | STATION CUSTODIAN
      </p>
      <h1 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2rem" }}>
        Admin Access
      </h1>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: goldDim, marginBottom: "0.5rem" }}>
            Email
          </label>
          <input
            data-testid="admin-email-input"
            type="email" required autoComplete="username"
            value={form.email}
            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="vince@launchpathedu.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
        <div>
          <label style={{ display: "block", fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: goldDim, marginBottom: "0.5rem" }}>
            Password
          </label>
          <input
            data-testid="admin-password-input"
            type="password" required autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
        {state === "error" && (
          <p style={{ fontFamily: body, fontSize: "var(--text-sm)", color: "#f87171", fontStyle: "italic" }}>
            Invalid credentials or insufficient access.
          </p>
        )}
        <button
          data-testid="admin-login-btn"
          type="submit"
          disabled={state === "loading"}
          style={{
            minHeight: 48, background: gold, color: navy,
            border: "none", fontFamily: body, fontWeight: 700,
            fontSize: "var(--text-sm)", letterSpacing: "0.08em", textTransform: "uppercase",
            cursor: state === "loading" ? "wait" : "pointer",
            opacity: state === "loading" ? 0.7 : 1, transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { if (state !== "loading") e.currentTarget.style.background = "#D4B87A"; }}
          onMouseLeave={(e) => { if (state !== "loading") e.currentTarget.style.background = gold; }}
        >
          {state === "loading" ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// ── Admin Dashboard ──────────────────────────────────────────────────────────
export default function AdminAdmissionsPage() {
  const [authState, setAuthState] = useState("checking"); // checking | authed | unauthed
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);
  const API = process.env.REACT_APP_BACKEND_URL;

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API}/api/admin/admission-requests`, { credentials: "include" });
      if (resp.status === 403) { setAuthState("unauthed"); setLoading(false); return; }
      if (!resp.ok) throw new Error();
      setRequests(await resp.json());
      setAuthState("authed");
    } catch {
      setRequests([]);
    }
    setLoading(false);
  }, [API]);

  // Auth check on mount
  useEffect(() => {
    const check = async () => {
      try {
        const resp = await fetch(`${API}/api/auth/me`, { credentials: "include" });
        if (!resp.ok) { setAuthState("unauthed"); return; }
        const data = await resp.json();
        if (data.user?.email === "vince@launchpathedu.com") {
          setAuthState("authed");
          fetchRequests();
        } else {
          setAuthState("unauthed");
          setLoading(false);
        }
      } catch {
        setAuthState("unauthed");
        setLoading(false);
      }
    };
    check();
  }, [API, fetchRequests]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`${API}/api/admin/admission-requests/${id}/status?status=${status}`, {
        method: "PATCH",
        credentials: "include",
      });
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    } catch {}
    setUpdating(null);
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const counts = {
    all: requests.length,
    pending_review: requests.filter((r) => r.status === "pending_review").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/api/auth/logout`, { method: "POST", credentials: "include" });
    } catch {}
    setAuthState("unauthed");
    setRequests([]);
  };

  const TABS = [
    { key: "all",            testid: "filter-all",      label: "All" },
    { key: "pending_review", testid: "filter-pending",  label: "Pending" },
    { key: "approved",       testid: "filter-enrolled", label: "Enrolled" },
    { key: "rejected",       testid: "filter-declined", label: "Declined" },
  ];

  return (
    <div style={{ background: dark, minHeight: "100vh", color: "#FFFFFF", fontFamily: body }}>
      <AdminNavBar />

      {/* Auth checking */}
      {authState === "checking" && (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "112px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Verifying access...</p>
        </div>
      )}

      {/* Login gate */}
      {authState === "unauthed" && (
        <AdminLoginGate onSuccess={() => { setAuthState("authed"); fetchRequests(); }} />
      )}

      {/* Admin dashboard */}
      {authState === "authed" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 80px" }}>

          {/* Header */}
          <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: goldDim, marginBottom: "0.5rem" }}>
                LP-ADM-001 | STATION CUSTODIAN
              </p>
              <h1 style={{ fontFamily: condensed, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0.75rem" }}>
                Admission Requests
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 560 }}>
                Operators who completed Ground 0 and requested admission. Payment of $2,500 triggers automatic enrollment.
              </p>
            </div>
            <button
              data-testid="admin-logout-btn"
              onClick={handleLogout}
              style={{
                fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "0.625rem 1.25rem", background: "transparent",
                color: "rgba(255,255,255,0.40)", border: "1px solid rgba(255,255,255,0.12)",
                cursor: "pointer", flexShrink: 0, transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.40)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              Sign Out
            </button>
          </div>

          {/* Stats strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2px", marginBottom: "2rem" }}>
            {[
              { label: "Total",         value: counts.all,            color: gold },
              { label: "Pending",       value: counts.pending_review, color: "#fb923c" },
              { label: "Enrolled",      value: counts.approved,       color: "#4ade80" },
              { label: "Declined",      value: counts.rejected,       color: "#f87171" },
            ].map((s) => (
              <div key={s.label} style={{ background: card, padding: "1.25rem 1.5rem" }}>
                <p style={{ fontFamily: condensed, fontWeight: 700, fontSize: "1.75rem", color: s.color, marginBottom: "0.2rem", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "2px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                data-testid={tab.testid}
                onClick={() => setFilter(tab.key)}
                style={{
                  fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "0.625rem 1.25rem",
                  background: filter === tab.key ? gold : card,
                  color: filter === tab.key ? navy : "rgba(255,255,255,0.55)",
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {tab.label} ({counts[tab.key]})
              </button>
            ))}
            <button
              onClick={fetchRequests}
              style={{
                fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "0.625rem 1.25rem", background: "transparent",
                color: "rgba(197,160,89,0.55)", border: "1px solid rgba(197,160,89,0.25)",
                cursor: "pointer", marginLeft: "auto",
              }}
            >
              Refresh
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>Loading...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ background: card, padding: "3rem", textAlign: "center" }}>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>No records</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 210px 140px 110px 130px 170px", background: "#0a1220", padding: "0.75rem 1.25rem", gap: "1rem" }}>
                {["Carrier / Contact", "Compliance Status", "Submitted", "Lane", "Status", "Actions"].map((h) => (
                  <p key={h} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", margin: 0 }}>{h}</p>
                ))}
              </div>

              {filtered.map((req) => (
                <div
                  key={req.id}
                  data-testid={`admission-row-${req.id}`}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 210px 140px 110px 130px 170px",
                    background: card, padding: "1rem 1.25rem", gap: "1rem", alignItems: "center",
                    borderLeft: req.status === "approved" ? "3px solid rgba(74,222,128,0.5)"
                               : req.status === "rejected" ? "3px solid rgba(248,113,113,0.3)"
                               : "3px solid rgba(251,146,60,0.4)",
                  }}
                >
                  <div>
                    <p style={{ fontFamily: body, fontWeight: 600, fontSize: "var(--text-sm)", color: "#FFFFFF", marginBottom: "0.2rem" }}>{req.carrier_name}</p>
                    <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(197,160,89,0.65)" }}>{req.email}</p>
                    {req.dot_mc_number && <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.35)" }}>{req.dot_mc_number}</p>}
                  </div>

                  <p style={{ fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{req.compliance_status}</p>

                  <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.40)" }}>
                    {req.submission_date ? new Date(req.submission_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </p>

                  <div><LaneTag lane={req.lane} /></div>

                  <div data-testid={`status-badge-${req.id}`}><StatusBadge status={req.status} /></div>

                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {req.status !== "approved" && (
                      <button
                        data-testid={`approve-btn-${req.id}`}
                        disabled={updating === req.id}
                        onClick={() => updateStatus(req.id, "approved")}
                        style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.35rem 0.75rem", background: "rgba(74,222,128,0.10)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)", cursor: "pointer" }}
                      >
                        Approve
                      </button>
                    )}
                    {req.status !== "rejected" && (
                      <button
                        data-testid={`reject-btn-${req.id}`}
                        disabled={updating === req.id}
                        onClick={() => updateStatus(req.id, "rejected")}
                        style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.35rem 0.75rem", background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.20)", cursor: "pointer" }}
                      >
                        Decline
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <FooterSection />
    </div>
  );
}
