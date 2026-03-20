import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";
const heading = "'Playfair Display', serif";

const STATUS_COLORS = {
  pending:       { color: "#64748B", label: "PENDING"       },
  submitted:     { color: "#7DD3FC", label: "SUBMITTED"     },
  verified:      { color: "#22C55E", label: "VERIFIED"      },
  needs_changes: { color: "#F87171", label: "NEEDS_CHANGES" },
};

function SignalBadge({ signal, integrity, pulse }) {
  const color = signal >= 90 ? "#d4900a" : signal >= 60 ? "#22c55e" : "#f87171";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      border: `1px solid ${color}33`,
      background: `${color}0D`,
      padding: "0.25rem 0.625rem",
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 4px ${color}` }} />
      <span style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", color }}>
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
          fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
          letterSpacing: "0.12em", color: "rgba(212,144,10,0.75)",
          textTransform: "uppercase", minWidth: 120,
        }}>
          {task.carrierId?.slice(0, 18)}...
        </span>

        {/* Task ID */}
        <span style={{
          fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
          letterSpacing: "0.12em", color: "rgba(125,211,252,0.85)",
          textTransform: "uppercase", minWidth: 80,
        }}>
          {task.taskId}
        </span>

        {/* Task name */}
        <span style={{
          fontFamily: sans, fontSize: "var(--text-sm)", fontWeight: 600,
          color: "rgba(255,255,255,0.88)", flex: 1, minWidth: 160,
        }}>
          {task.name}
        </span>

        {/* Submitted at */}
        <span style={{
          fontFamily: mono, fontSize: "0.714rem",
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
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
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
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
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
              width: "100%", fontFamily: sans, fontSize: "var(--text-sm)",
              background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.25)",
              color: "#FFFFFF", padding: "0.625rem 0.875rem",
              outline: "none", boxSizing: "border-box", marginBottom: "0.5rem",
            }}
          />
          <button
            onClick={() => { onRemediate(task.carrierId, task.taskId, note); setShowNoteInput(false); setNote(""); }}
            disabled={!note.trim()}
            style={{
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
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
  const [activeTab, setActiveTab] = useState("registry");

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
          <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.18em", color: "rgba(212,144,10,0.6)", textTransform: "uppercase" }}>
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
        borderBottom: "1px solid rgba(212,144,10,0.16)",
        padding: "1.5rem 2rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(212,144,10,0.65)", marginBottom: "0.25rem",
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
              <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                LAST_SYNC: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
            <button
              data-testid="coach-refresh-btn"
              onClick={fetchData}
              style={{
                fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                background: "rgba(212,144,10,0.08)", border: "1px solid rgba(212,144,10,0.25)",
                color: "#d4900a", padding: "0.45rem 0.875rem", cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(212,144,10,0.15)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(212,144,10,0.08)"}
            >
              [REFRESH_REGISTRY]
            </button>
            <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
              OPERATOR: {user?.name?.toUpperCase().slice(0, 20)}
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* Tab Nav */}
        <div style={{ display: "flex", gap: 0, marginBottom: "2.5rem", borderBottom: "1px solid rgba(212,144,10,0.15)" }}>
          {[["registry", "REGISTRY"], ["deliverables", "DELIVERABLES"]].map(([id, label]) => (
            <button key={id} data-testid={`tab-${id}`} onClick={() => setActiveTab(id)} style={{
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", padding: "0.75rem 1.5rem", background: "transparent",
              border: "none", borderBottom: activeTab === id ? "2px solid #d4900a" : "2px solid transparent",
              color: activeTab === id ? "#d4900a" : "rgba(255,255,255,0.38)",
              cursor: "pointer", transition: "color 0.2s", marginBottom: "-1px",
            }}>{label}</button>
          ))}
        </div>

        {activeTab === "registry" && (<>

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
            <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", color: "#7DD3FC", textTransform: "uppercase" }}>
              {submittedQueue.length} ARTIFACT{submittedQueue.length !== 1 ? "S" : ""} AWAITING VERIFICATION
            </p>
          </div>
        )}

        {/* ── COHORT SIGNAL OVERVIEW ── */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
            <p style={{
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(212,144,10,0.85)",
            }}>
              COHORT_SIGNAL_OVERVIEW
            </p>
            <div style={{ flex: 1, height: 1, background: "rgba(212,144,10,0.15)" }} />
            <span style={{ fontFamily: mono, fontSize: "0.762rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {carriers.length} CARRIER{carriers.length !== 1 ? "S" : ""}
            </span>
          </div>

          {carriers.length === 0 ? (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "2rem", textAlign: "center" }}>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
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
                  <span key={h} style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>
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
                  <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", color: "rgba(212,144,10,0.75)", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.carrierId}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    {c.name}
                  </span>
                  <span><SignalBadge signal={c.signal} integrity={c.integrity} pulse={c.pulse} /></span>
                  <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>
                    {c.verifiedTasks}/{c.totalTasks} VERIFIED
                  </span>
                  <span style={{
                    fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: c.submittedTasks > 0 ? "#7DD3FC" : "rgba(255,255,255,0.28)",
                  }}>
                    {c.submittedTasks}
                  </span>
                  <span style={{
                    fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
                    color: c.integrity >= 80 ? "#22C55E" : c.integrity >= 50 ? "#d4900a" : "#F87171",
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
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: submittedQueue.length > 0 ? "#7DD3FC" : "rgba(255,255,255,0.38)",
            }}>
              SUBMISSION_QUEUE — AWAITING_VERIFICATION
            </p>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            <span style={{
              fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
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
              <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                QUEUE_EMPTY
              </p>
              <p style={{ fontFamily: sans, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.3)" }}>
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
                  <span key={h} style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>
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

        </>)}

        {activeTab === "deliverables" && <DeliverablesAdmin API={process.env.REACT_APP_BACKEND_URL} mono={mono} />}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .carrier-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── Deliverables Admin Panel ──────────────────────────────────────────────────
const CATEGORIES = [
  { value: "hos", label: "HOS Compliance Packet" },
  { value: "maintenance", label: "Maintenance Packet" },
  { value: "insurance", label: "Insurance & Authority Packet" },
  { value: "drug_alcohol", label: "Drug & Alcohol Packet" },
  { value: "new_entrant", label: "New Entrant Packet" },
  { value: "general", label: "General / All Cohort" },
];

function DeliverablesAdmin({ API, mono }) {
  const [pdfs, setPdfs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [form, setForm] = useState({ display_name: "", description: "", category: "general" });
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    const r = await fetch(`${API}/api/admin/pdfs`, { credentials: "include" });
    if (r.ok) setPdfs(await r.json());
  }, [API]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError(""); setUploadSuccess("");
    const file = fileRef.current?.files?.[0];
    if (!file) { setUploadError("Please select a PDF file."); return; }
    if (!form.display_name.trim()) { setUploadError("Display name is required."); return; }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("display_name", form.display_name);
    fd.append("description", form.description);
    fd.append("category", form.category);
    setUploading(true);
    try {
      const r = await fetch(`${API}/api/admin/pdfs/upload`, { method: "POST", credentials: "include", body: fd });
      if (!r.ok) { const d = await r.json(); throw new Error(d.detail || "Upload failed"); }
      setUploadSuccess("PDF uploaded successfully.");
      setForm({ display_name: "", description: "", category: "general" });
      if (fileRef.current) fileRef.current.value = "";
      load();
    } catch (err) { setUploadError(err.message); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this PDF from the portal?")) return;
    await fetch(`${API}/api/admin/pdfs/${id}`, { method: "DELETE", credentials: "include" });
    load();
  };

  const formatSize = (bytes) => bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

  const labelStyle = { fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)", display: "block", marginBottom: "0.4rem" };
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "0.6rem 0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", borderRadius: 2, boxSizing: "border-box" };

  return (
    <div>
      {/* Upload form */}
      <div style={{ background: "#000A14", border: "1px solid rgba(212,144,10,0.15)", padding: "2rem", marginBottom: "2rem" }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "1.5rem" }}>
          UPLOAD NEW DELIVERABLE
        </p>
        <form onSubmit={handleUpload}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={labelStyle}>Display Name *</label>
              <input data-testid="pdf-display-name" style={inputStyle} value={form.display_name} onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))} placeholder="HOS Compliance Packet" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select data-testid="pdf-category" style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of this document..." />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>PDF File *</label>
            <input data-testid="pdf-file-input" ref={fileRef} type="file" accept=".pdf" style={{ ...inputStyle, padding: "0.45rem 0.75rem", cursor: "pointer" }} />
          </div>
          {uploadError && <p style={{ color: "#E8590F", fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>{uploadError}</p>}
          {uploadSuccess && <p style={{ color: "#4CAF50", fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>{uploadSuccess}</p>}
          <button data-testid="pdf-upload-btn" type="submit" disabled={uploading} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: uploading ? "rgba(212,144,10,0.3)" : "#d4900a", color: "#0b1628", border: "none", padding: "0.75rem 1.75rem", cursor: uploading ? "not-allowed" : "pointer" }}>
            {uploading ? "UPLOADING..." : "UPLOAD PDF →"}
          </button>
        </form>
      </div>

      {/* PDF library */}
      <div>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "1.25rem" }}>
          DELIVERABLE LIBRARY — {pdfs.length} FILE{pdfs.length !== 1 ? "S" : ""}
        </p>
        {pdfs.length === 0 ? (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "2.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}>NO DELIVERABLES UPLOADED YET</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {pdfs.map(pdf => (
              <div key={pdf.id} style={{ background: "#000A14", border: "1px solid rgba(255,255,255,0.07)", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>{pdf.display_name}</p>
                  {pdf.description && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>{pdf.description}</p>}
                  <div style={{ display: "flex", gap: "1.25rem" }}>
                    <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4900a" }}>{CATEGORIES.find(c => c.value === pdf.category)?.label || pdf.category}</span>
                    <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{formatSize(pdf.size)}</span>
                    <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{pdf.download_count} DOWNLOADS</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(pdf.id)} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "transparent", border: "1px solid rgba(232,89,48,0.3)", color: "rgba(232,89,48,0.7)", padding: "0.45rem 0.875rem", cursor: "pointer" }}>REMOVE</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
