import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const gold = "#C5A059";
const mono = "'IBM Plex Mono', monospace";
const navy = "#001A33";
const dark = "#080f1e";
const card = "#0D1929";

const STATUS_CONFIG = {
  pending_review: { label: "Pending Review", color: "#fb923c", bg: "rgba(251,146,60,0.10)" },
  approved:       { label: "Enrolled",       color: "#4ade80", bg: "rgba(74,222,128,0.10)" },
  rejected:       { label: "Declined",       color: "#f87171", bg: "rgba(248,113,113,0.10)" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending_review;
  return (
    <span style={{
      fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: cfg.color, background: cfg.bg,
      padding: "0.25rem 0.6rem",
    }}>
      {cfg.label}
    </span>
  );
}

function LaneTag({ lane }) {
  const label = lane === "box_truck" ? "Box Truck" : "Semi";
  return (
    <span style={{
      fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: "rgba(197,160,89,0.70)", background: "rgba(197,160,89,0.07)",
      padding: "0.2rem 0.5rem",
    }}>
      {label}
    </span>
  );
}

export default function AdminAdmissionsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);
  const API = process.env.REACT_APP_BACKEND_URL;

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API}/api/admin/admission-requests`);
      if (!resp.ok) throw new Error();
      setRequests(await resp.json());
    } catch {
      setRequests([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`${API}/api/admin/admission-requests/${id}/status?status=${status}`, { method: "PATCH" });
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

  return (
    <div style={{ background: dark, minHeight: "100vh", color: "#FFFFFF", fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(197,160,89,0.75)", marginBottom: "0.5rem" }}>
            LP-ADM-001 | STATION CUSTODIAN
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FFFFFF",
            lineHeight: 1.1, marginBottom: "0.75rem",
          }}>
            Admission Requests
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
            Operators who have completed Ground 0 and requested admission to the LaunchPath Standard.
            Payment of $2,500 triggers automatic enrollment.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2px", marginBottom: "2rem" }}>
          {[
            { label: "Total", value: counts.all },
            { label: "Pending Review", value: counts.pending_review, color: "#fb923c" },
            { label: "Enrolled", value: counts.approved, color: "#4ade80" },
            { label: "Declined", value: counts.rejected, color: "#f87171" },
          ].map((s) => (
            <div key={s.label} style={{ background: card, padding: "1.25rem 1.5rem" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.75rem", color: s.color || gold, marginBottom: "0.2rem", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: mono, fontSize: "0.504rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "2px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All" },
            { key: "pending_review", label: "Pending" },
            { key: "approved", label: "Enrolled" },
            { key: "rejected", label: "Declined" },
          ].map((tab) => (
            <button
              key={tab.key}
              data-testid={`filter-${tab.key}`}
              onClick={() => setFilter(tab.key)}
              style={{
                fontFamily: mono, fontSize: "0.56rem", fontWeight: 700,
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
              fontFamily: mono, fontSize: "0.56rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0.625rem 1.25rem", background: "transparent",
              color: "rgba(197,160,89,0.55)", border: `1px solid rgba(197,160,89,0.25)`,
              cursor: "pointer", marginLeft: "auto",
            }}
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.40)" }}>
            <p style={{ fontFamily: mono, fontSize: "0.616rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ background: card, padding: "3rem", textAlign: "center" }}>
            <p style={{ fontFamily: mono, fontSize: "0.616rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>
              No records found
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {/* Header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 200px 160px 120px 120px 160px",
              background: "#0a1220",
              padding: "0.75rem 1.25rem",
              gap: "1rem",
            }}>
              {["Carrier / Contact", "Compliance Status", "Submitted", "Lane", "Status", "Actions"].map((h) => (
                <p key={h} style={{ fontFamily: mono, fontSize: "0.504rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: 0 }}>
                  {h}
                </p>
              ))}
            </div>

            {filtered.map((req) => (
              <div
                key={req.id}
                data-testid={`admission-row-${req.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 200px 160px 120px 120px 160px",
                  background: card,
                  padding: "1rem 1.25rem",
                  gap: "1rem",
                  alignItems: "center",
                  borderLeft: req.status === "approved" ? "3px solid rgba(74,222,128,0.5)" : req.status === "rejected" ? "3px solid rgba(248,113,113,0.3)" : "3px solid rgba(251,146,60,0.4)",
                }}
              >
                {/* Carrier */}
                <div>
                  <p style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#FFFFFF", marginBottom: "0.2rem" }}>
                    {req.carrier_name}
                  </p>
                  <p style={{ fontFamily: mono, fontSize: "0.504rem", color: "rgba(197,160,89,0.65)" }}>{req.email}</p>
                  {req.dot_mc_number && (
                    <p style={{ fontFamily: mono, fontSize: "0.504rem", color: "rgba(255,255,255,0.35)" }}>
                      {req.dot_mc_number}
                    </p>
                  )}
                </div>

                {/* Compliance Status */}
                <p style={{ fontSize: "0.784rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
                  {req.compliance_status}
                </p>

                {/* Date */}
                <p style={{ fontFamily: mono, fontSize: "0.56rem", color: "rgba(255,255,255,0.45)" }}>
                  {req.submission_date ? new Date(req.submission_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </p>

                {/* Lane */}
                <div><LaneTag lane={req.lane} /></div>

                {/* Status */}
                <div><StatusBadge status={req.status} /></div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {req.status !== "approved" && (
                    <button
                      data-testid={`approve-btn-${req.id}`}
                      disabled={updating === req.id}
                      onClick={() => updateStatus(req.id, "approved")}
                      style={{
                        fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        padding: "0.35rem 0.75rem", background: "rgba(74,222,128,0.10)",
                        color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)",
                        cursor: "pointer",
                      }}
                    >
                      Approve
                    </button>
                  )}
                  {req.status !== "rejected" && (
                    <button
                      data-testid={`reject-btn-${req.id}`}
                      disabled={updating === req.id}
                      onClick={() => updateStatus(req.id, "rejected")}
                      style={{
                        fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        padding: "0.35rem 0.75rem", background: "rgba(248,113,113,0.08)",
                        color: "#f87171", border: "1px solid rgba(248,113,113,0.20)",
                        cursor: "pointer",
                      }}
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

      <FooterSection />
    </div>
  );
}
