import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import AdminNavBar from "../components/AdminNavBar";

const API = process.env.REACT_APP_BACKEND_URL;
const NAVY = "#002244";
const GOLD = "#C5A059";
const MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";

const STATUS_CONFIG = {
  pending:     { label: "PENDING REVIEW", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  approved:    { label: "APPROVED",       color: "#22c55e", bg: "rgba(34,197,94,0.08)"  },
  declined:    { label: "ACTION REQ.",    color: "#ef4444", bg: "rgba(239,68,68,0.08)"  },
  conditional: { label: "CONDITIONAL",    color: "#f97316", bg: "rgba(249,115,22,0.08)" },
};

const GATE_LABELS = {
  dqf_gate:        "Driver Qualification File Gate (MOD-1)",
  integrity_audit: "Integrity Audit Gate (MOD-6)",
};

function ReviewCard({ review, onDecide }) {
  const [expanded, setExpanded] = useState(false);
  const [decision, setDecision] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cfg = STATUS_CONFIG[review.status] || STATUS_CONFIG.pending;
  const isIntegrity = review.gate_type === "integrity_audit";

  async function handleSubmit() {
    if (!decision) { setError("Select a decision."); return; }
    if (decision === "declined" && !notes.trim()) { setError("Notes are required when declining."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/admin/gate-reviews/${review.review_id}/decide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ decision, custodian_notes: notes }),
      });
      if (!res.ok) throw new Error("Request failed");
      onDecide(review.review_id, decision);
    } catch {
      setError("Failed to submit decision. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      data-testid={`gate-review-${review.review_id}`}
      style={{ border: `1px solid rgba(255,255,255,0.07)`, borderLeft: `3px solid ${cfg.color}`, background: cfg.bg, marginBottom: "0.75rem" }}
    >
      {/* Header row */}
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", cursor: "pointer" }}
        onClick={() => setExpanded(e => !e)}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: cfg.color, background: "rgba(0,0,0,0.3)", padding: "0.15rem 0.5rem" }}>
              {cfg.label}
            </span>
            <span style={{ fontFamily: SANS, fontSize: "0.857rem", fontWeight: 600, color: "#fff" }}>
              {review.user_name || "Operator"}
            </span>
            <span style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.45)" }}>
              {review.user_email}
            </span>
          </div>
          <div style={{ fontFamily: MONO, fontSize: "0.619rem", color: "rgba(197,160,89,0.6)", marginTop: "0.35rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {GATE_LABELS[review.gate_type] || review.gate_type} · Submitted {new Date(review.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
        {expanded ? <ChevronUp size={14} color="rgba(255,255,255,0.4)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.4)" />}
      </div>

      {expanded && (
        <div style={{ padding: "0 1.25rem 1.25rem" }}>
          {/* Attestation */}
          <div style={{ background: "rgba(0,0,0,0.25)", padding: "0.875rem 1rem", marginBottom: "1rem" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.619rem", color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.375rem" }}>OPERATOR ATTESTATION</p>
            <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{review.attestation}</p>
          </div>

          {/* Previous notes if reviewed */}
          {review.custodian_notes && (
            <div style={{ background: "rgba(0,0,0,0.2)", padding: "0.75rem 1rem", marginBottom: "1rem", borderLeft: `2px solid ${cfg.color}` }}>
              <p style={{ fontFamily: MONO, fontSize: "0.619rem", color: cfg.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.375rem" }}>PREVIOUS CUSTODIAN NOTE</p>
              <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.65)" }}>{review.custodian_notes}</p>
            </div>
          )}

          {/* Decision form — only for pending reviews */}
          {review.status === "pending" && (
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.619rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>STATION CUSTODIAN DECISION</p>

              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
                {["approved", isIntegrity ? "conditional" : null, "declined"].filter(Boolean).map(opt => (
                  <button
                    key={opt}
                    data-testid={`decision-${opt}`}
                    onClick={() => setDecision(opt)}
                    style={{
                      fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "0.5rem 1rem", cursor: "pointer", border: "1px solid",
                      borderColor: decision === opt ? (opt === "approved" ? "#22c55e" : opt === "conditional" ? "#f97316" : "#ef4444") : "rgba(255,255,255,0.15)",
                      background: decision === opt ? (opt === "approved" ? "rgba(34,197,94,0.15)" : opt === "conditional" ? "rgba(249,115,22,0.15)" : "rgba(239,68,68,0.15)") : "transparent",
                      color: opt === "approved" ? "#22c55e" : opt === "conditional" ? "#f97316" : "#ef4444",
                    }}
                  >
                    {opt === "approved" ? "✓ Approve" : opt === "conditional" ? "⚡ Conditional" : "✗ Decline"}
                  </button>
                ))}
              </div>

              <textarea
                data-testid="custodian-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={decision === "declined" ? "Required: explain what needs to be corrected..." : "Optional: add a note for the operator..."}
                rows={3}
                style={{
                  width: "100%", boxSizing: "border-box", fontFamily: SANS, fontSize: "0.857rem",
                  background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)", padding: "0.75rem", resize: "vertical",
                  outline: "none", marginBottom: "0.75rem",
                }}
              />

              {error && <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "#ef4444", marginBottom: "0.5rem" }}>{error}</p>}

              <button
                data-testid="submit-decision"
                onClick={handleSubmit}
                disabled={loading || !decision}
                style={{
                  fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "0.625rem 1.5rem", cursor: loading ? "default" : "pointer",
                  background: decision ? GOLD : "rgba(255,255,255,0.1)", color: decision ? NAVY : "rgba(255,255,255,0.3)",
                  border: "none", opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Submitting..." : "Confirm Decision"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminGateReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/gate-reviews?status_filter=${filter}`, { credentials: "include" });
      if (res.ok) setReviews(await res.json());
    } catch {}
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  function handleDecide(reviewId, decision) {
    setReviews(prev => prev.map(r => r.review_id === reviewId ? { ...r, status: decision } : r));
  }

  const pendingCount = reviews.filter(r => r.status === "pending").length;

  return (
    <div style={{ minHeight: "100vh", background: "#080f1e", color: "#fff", fontFamily: "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif" }}>
      <AdminNavBar />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.75rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>
            STATION CUSTODIAN · LP-ADMIN
          </p>
          <h1 style={{ fontFamily: "'Newsreader','Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Gate Reviews
          </h1>
          <p style={{ fontFamily: "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            Review operator submissions at MOD-1 (Driver Qualification File) and MOD-6 (Integrity Audit). Approval unlocks the next module.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.375rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem" }}>
          {[["pending", `PENDING${pendingCount > 0 ? ` (${pendingCount})` : ""}`], ["approved", "APPROVED"], ["declined", "DECLINED"], ["conditional", "CONDITIONAL"], ["all", "ALL"]].map(([val, label]) => (
            <button
              key={val}
              data-testid={`filter-${val}`}
              onClick={() => setFilter(val)}
              style={{
                fontFamily: MONO, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.375rem 0.875rem", cursor: "pointer", border: "1px solid",
                borderColor: filter === val ? GOLD : "rgba(255,255,255,0.1)",
                background: filter === val ? "rgba(197,160,89,0.1)" : "transparent",
                color: filter === val ? GOLD : "rgba(255,255,255,0.4)",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={fetchReviews}
            style={{ marginLeft: "auto", fontFamily: MONO, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.375rem 0.875rem", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)" }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Reviews list */}
        {loading ? (
          <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>LOADING REVIEWS...</p>
        ) : reviews.length === 0 ? (
          <div style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "3rem 2rem", textAlign: "center" }}>
            <CheckCircle size={24} color="rgba(34,197,94,0.4)" style={{ marginBottom: "0.75rem" }} />
            <p style={{ fontFamily: SANS, fontSize: "0.924rem", color: "rgba(255,255,255,0.4)" }}>No {filter === "all" ? "" : filter} reviews at this time.</p>
          </div>
        ) : (
          reviews.map(r => <ReviewCard key={r.review_id} review={r} onDecide={handleDecide} />)
        )}
      </div>
    </div>
  );
}
