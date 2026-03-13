import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const mono = "'JetBrains Mono', 'Courier New', monospace";
const sans = "'Inter', sans-serif";
const heading = "'Manrope', sans-serif";

const STATUS_COLORS = {
  pending:       { color: "#64748B", label: "PENDING"       },
  submitted:     { color: "#7DD3FC", label: "SUBMITTED"     },
  verified:      { color: "#22C55E", label: "VERIFIED"      },
  needs_changes: { color: "#F87171", label: "NEEDS_CHANGES" },
};

function SignalBadge({ signal, integrity, pulse }) {
  const color = signal >= 90 ? "#C5A059" : signal >= 60 ? "#22c55e" : "#f87171";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      border: `1px solid ${color}33`,
      background: `${color}0D`,
      padding: "0.25rem 0.625rem",
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 4px ${color}` }} />
      <span style={{ fontFamily: mono, fontSize: "0.504rem", fontWeight: 700, letterSpacing: "0.1em", color }}>
        {signal}%
      </span>
    </div>
  );
}

function SubmittedTaskRow({ task, onVerify, onRemediate, loadingTaskId }) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");
  const isLoading = loadingTaskId === `${task.carrierId}:${task.taskId}`;

  const timeAgo = (iso) => {
    if (!iso) return "";
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "1rem 1.5rem",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "1rem",
        flexWrap: "wrap",
      }}>
        {/* Carrier ID */}
        <span style={{
          fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
          letterSpacing: "0.12em", color: "rgba(197,160,89,0.75)",
          textTransform: "uppercase", minWidth: 120,
        }}>
          {task.carrierId?.slice(0, 18)}...
        </span>

        {/* Task ID */}
        <span style={{
          fontFamily: mono, fontSize: "0.56rem", fontWeight: 700,
          letterSpacing: "0.12em", color: "rgba(125,211,252,0.85)",
          textTransform: "uppercase", minWidth: 80,
        }}>
          {task.taskId}
        </span>

        {/* Task name */}
        <span style={{
          fontFamily: sans, fontSize: "0.875rem", fontWeight: 600,
          color: "rgba(255,255,255,0.88)", flex: 1, minWidth: 160,
        }}>
          {task.name}
        </span>

        {/* Submitted at */}
        <span style={{
          fontFamily: mono, fontSize: "0.504rem",
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase", flexShrink: 0,
        }}>
          {timeAgo(task.submittedAt)}
        </span>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button
            data-testid={`coach-verify-${task.taskId.toLowerCase()}`}
            onClick={() => onVerify(task.carrierId, task.taskId)}
            disabled={isLoading}
            style={{
              fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
              color: "#22C55E", padding: "0.35rem 0.75rem",
              cursor: isLoading ? "wait" : "pointer", opacity: isLoading ? 0.6 : 1,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = "rgba(34,197,94,0.2)"; }}
            onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.background = "rgba(34,197,94,0.1)"; }}
          >
            [VERIFY]
          </button>
          <button
            data-testid={`coach-remediate-${task.taskId.toLowerCase()}`}
            onClick={() => setShowNoteInput((x) => !x)}
            style={{
              fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
              color: "#F87171", padding: "0.35rem 0.75rem",
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(248,113,113,0.16)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(248,113,113,0.08)"}
          >
            [REMEDIATE]
          </button>
        </div>
      </div>

      {/* Remediation note input */}
      {showNoteInput && (
        <div style={{ marginTop: "0.875rem", maxWidth: 480 }}>
          <input
            data-testid={`coach-note-${task.taskId.toLowerCase()}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="State the specific deficiency requiring correction..."
            style={{
              width: "100%", fontFamily: sans, fontSize: "0.875rem",
              background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.25)",
              color: "#FFFFFF", padding: "0.625rem 0.875rem",
              outline: "none", boxSizing: "border-box", marginBottom: "0.5rem",
            }}
          />
          <button
            onClick={() => { onRemediate(task.carrierId, task.taskId, note); setShowNoteInput(false); setNote(""); }}
            disabled={!note.trim()}
            style={{
              fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.35)",
              color: "#F87171", padding: "0.4rem 0.875rem",
              cursor: note.trim() ? "pointer" : "not-allowed",
              opacity: note.trim() ? 1 : 0.5,
            }}
          >
            SEND REMEDIATION →
          </button>
        </div>
      )}
    </div>
  );
}

export default function CoachRegistryPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [data, setData] = useState({ carriers: [], submittedQueue: [] });
  const [loading, setLoading] = useState(true);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API = process.env.REACT_APP_BACKEND_URL;

  const fetchData = useCallback(async () => {
    try {
      const resp = await fetch(`${API}/api/coach/carriers`, { credentials: "include" });
      if (resp.status === 403) { navigate("/portal"); return; }
      if (resp.ok) {
        const json = await resp.json();
        setData(json);
        setLastUpdated(new Date());
      }
    } catch { /* silent */ }
    setLoading(false);
  }, [API, navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await fetch(`${API}/api/auth/me`, { credentials: "include" });
        if (!resp.ok) { navigate("/portal"); return; }
        const userData = await resp.json();
        if (userData.email !== "vince@launchpathedu.com") { navigate("/portal"); return; }
        setUser(userData);
        setAuthChecked(true);
      } catch { navigate("/portal"); }
    };
    checkAuth();
  }, [API, navigate]);

  useEffect(() => {
    if (authChecked) fetchData();
  }, [authChecked, fetchData]);

  const handleVerify = async (carrierId, taskId) => {
    const key = `${carrierId}:${taskId}`;
    setLoadingTaskId(key);
    try {
      await fetch(`${API}/api/tasks/${taskId}/verify`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ carrierId }),
      });
      await fetchData();
    } catch { /* silent */ }
    setLoadingTaskId(null);
  };

  const handleRemediate = async (carrierId, taskId, coachNote) => {
    setLoadingTaskId(`${carrierId}:${taskId}`);
    try {
      await fetch(`${API}/api/tasks/${taskId}/remediate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ carrierId, coachNote }),
      });
      await fetchData();
    } catch { /* silent */ }
    setLoadingTaskId(null);
  };

  if (!authChecked || loading) {
    return (
      <div style={{ fontFamily: sans, background: "#020617", minHeight: "100vh", color: "#FFF" }}>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ fontFamily: mono, fontSize: "0.616rem", letterSpacing: "0.18em", color: "rgba(197,160,89,0.6)", textTransform: "uppercase" }}>
            INITIALIZING_REGISTRY...
          </p>
        </div>
      </div>
    );
  }

  const { carriers, submittedQueue } = data;

  return (
    <div style={{ fontFamily: sans, background: "#020617", minHeight: "100vh", color: "#FFF" }}>
      <Navbar />

      {/* Registry header */}
      <div style={{
        background: "#000A14",
        borderBottom: "1px solid rgba(197,160,89,0.16)",
        padding: "1.5rem 2rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{
              fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(197,160,89,0.65)", marginBottom: "0.25rem",
            }}>
              LPOS v1.0 | LP-CMD-001 | COACH_REGISTRY
            </p>
            <h1 style={{
              fontFamily: heading, fontWeight: 900, fontSize: "1.75rem",
              color: "#FFFFFF", letterSpacing: "-0.025em", textTransform: "uppercase", margin: 0,
            }}>
              Cohort Command Center
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {lastUpdated && (
              <p style={{ fontFamily: mono, fontSize: "0.448rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                LAST_SYNC: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
            <button
              data-testid="coach-refresh-btn"
              onClick={fetchData}
              style={{
                fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.25)",
                color: "#C5A059", padding: "0.45rem 0.875rem", cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(197,160,89,0.15)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(197,160,89,0.08)"}
            >
              [REFRESH_REGISTRY]
            </button>
            <p style={{ fontFamily: mono, fontSize: "0.504rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
              OPERATOR: {user?.name?.toUpperCase().slice(0, 20)}
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* Submission queue alert */}
        {submittedQueue.length > 0 && (
          <div style={{
            background: "rgba(125,211,252,0.04)",
            border: "1px solid rgba(125,211,252,0.2)",
            borderLeft: "3px solid #7DD3FC",
            padding: "0.875rem 1.25rem",
            marginBottom: "2rem",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7DD3FC", boxShadow: "0 0 6px rgba(125,211,252,0.6)", flexShrink: 0 }} />
            <p style={{ fontFamily: mono, fontSize: "0.616rem", fontWeight: 700, letterSpacing: "0.14em", color: "#7DD3FC", textTransform: "uppercase" }}>
              {submittedQueue.length} ARTIFACT{submittedQueue.length !== 1 ? "S" : ""} AWAITING VERIFICATION
            </p>
          </div>
        )}

        {/* ── COHORT SIGNAL OVERVIEW ── */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
            <p style={{
              fontFamily: mono, fontSize: "0.616rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(197,160,89,0.85)",
            }}>
              COHORT_SIGNAL_OVERVIEW
            </p>
            <div style={{ flex: 1, height: 1, background: "rgba(197,160,89,0.15)" }} />
            <span style={{ fontFamily: mono, fontSize: "0.448rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {carriers.length} CARRIER{carriers.length !== 1 ? "S" : ""}
            </span>
          </div>

          {carriers.length === 0 ? (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "2rem", textAlign: "center" }}>
              <p style={{ fontFamily: mono, fontSize: "0.616rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                NO_CARRIERS_REGISTERED
              </p>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Table header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 80px 100px 80px 80px",
                padding: "0.625rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                gap: "1rem",
              }}>
                {["CARRIER_ID", "NAME", "SIGNAL", "TASKS", "SUBMITTED", "INTEGRITY"].map((h) => (
                  <span key={h} style={{ fontFamily: mono, fontSize: "0.448rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>
                    {h}
                  </span>
                ))}
              </div>

              {carriers.map((c) => (
                <div
                  key={c.carrierId}
                  data-testid={`carrier-row-${c.carrierId.slice(0, 12)}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 80px 100px 80px 80px",
                    padding: "0.875rem 1.5rem",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    alignItems: "center",
                    gap: "1rem",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontFamily: mono, fontSize: "0.504rem", letterSpacing: "0.1em", color: "rgba(197,160,89,0.75)", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.carrierId}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    {c.name}
                  </span>
                  <span><SignalBadge signal={c.signal} integrity={c.integrity} pulse={c.pulse} /></span>
                  <span style={{ fontFamily: mono, fontSize: "0.56rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>
                    {c.verifiedTasks}/{c.totalTasks} VERIFIED
                  </span>
                  <span style={{
                    fontFamily: mono, fontSize: "0.56rem", fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: c.submittedTasks > 0 ? "#7DD3FC" : "rgba(255,255,255,0.28)",
                  }}>
                    {c.submittedTasks}
                  </span>
                  <span style={{
                    fontFamily: mono, fontSize: "0.56rem", fontWeight: 700,
                    color: c.integrity >= 80 ? "#22C55E" : c.integrity >= 50 ? "#C5A059" : "#F87171",
                  }}>
                    {c.integrity}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── SUBMISSION QUEUE ── */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
            <p style={{
              fontFamily: mono, fontSize: "0.616rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: submittedQueue.length > 0 ? "#7DD3FC" : "rgba(255,255,255,0.38)",
            }}>
              SUBMISSION_QUEUE — AWAITING_VERIFICATION
            </p>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            <span style={{
              fontFamily: mono, fontSize: "0.504rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: submittedQueue.length > 0 ? "#7DD3FC" : "rgba(255,255,255,0.28)",
              padding: "0.2rem 0.5rem",
              border: `1px solid ${submittedQueue.length > 0 ? "rgba(125,211,252,0.3)" : "rgba(255,255,255,0.1)"}`,
            }}>
              {submittedQueue.length}
            </span>
          </div>

          {submittedQueue.length === 0 ? (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "2.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: mono, fontSize: "0.616rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                QUEUE_EMPTY
              </p>
              <p style={{ fontFamily: sans, fontSize: "0.875rem", color: "rgba(255,255,255,0.3)" }}>
                No tasks pending verification.
              </p>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(125,211,252,0.12)" }}>
              {/* Queue header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 100px 2fr 100px 1fr",
                padding: "0.625rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                gap: "1rem",
              }}>
                {["CARRIER_ID", "TASK_ID", "TASK_NAME", "SUBMITTED", "ACTIONS"].map((h) => (
                  <span key={h} style={{ fontFamily: mono, fontSize: "0.448rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>
                    {h}
                  </span>
                ))}
              </div>
              {submittedQueue.map((task, i) => (
                <SubmittedTaskRow
                  key={`${task.carrierId}-${task.taskId}-${i}`}
                  task={task}
                  onVerify={handleVerify}
                  onRemediate={handleRemediate}
                  loadingTaskId={loadingTaskId}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .carrier-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
