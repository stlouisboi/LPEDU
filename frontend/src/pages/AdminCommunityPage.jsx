import React, { useState, useEffect, useCallback } from "react";
import AdminNavBar from "../components/AdminNavBar";
import { CheckCircle, Trash, ToggleLeft, ToggleRight, ArrowRight } from "@phosphor-icons/react";

const API = process.env.REACT_APP_BACKEND_URL;

export default function AdminCommunityPage() {
  const [tab, setTab] = useState("announcements");
  const [authOk, setAuthOk] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then((r) => r.json())
      .then((u) => setAuthOk(u?.email === "vince@launchpathedu.com"))
      .catch(() => setAuthOk(false));
  }, []);

  if (authOk === null) return <div style={{ background: "#0d1c30", minHeight: "100vh" }}><AdminNavBar /></div>;
  if (!authOk) return (
    <div style={{ background: "#0d1c30", minHeight: "100vh", color: "#fff" }}>
      <AdminNavBar />
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <p>Access denied. Admin only.</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#0d1c30", minHeight: "100vh", color: "#fff", fontFamily: "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif" }}>
      <AdminNavBar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Header */}
        <p style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.5rem" }}>
          ADMIN · COMMUNITY HUB
        </p>
        <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2.25rem)", fontWeight: 700, color: "#fff", marginBottom: "2rem" }}>
          Community & Q&A Management
        </h1>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0" }}>
          {[
            { key: "announcements", label: "Announcements" },
            { key: "qa", label: "Lesson Q&A" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.857rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "0.625rem 1.25rem", background: "none", border: "none",
                borderBottom: tab === key ? "2px solid #d4900a" : "2px solid transparent",
                color: tab === key ? "#d4900a" : "rgba(255,255,255,0.45)",
                cursor: "pointer", transition: "color 0.15s", marginBottom: "-1px",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "announcements" && <AnnouncementsTab />}
        {tab === "qa" && <QATab />}
      </div>
    </div>
  );
}

// ── Announcements Tab ─────────────────────────────────────────────────────────
function AnnouncementsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("normal");
  const [posting, setPosting] = useState(false);
  const [success, setSuccess] = useState("");

  const load = useCallback(() => {
    fetch(`${API}/api/admin/announcements`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { setItems(d.announcements || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!title.trim() || !body.trim()) return;
    setPosting(true);
    try {
      const res = await fetch(`${API}/api/admin/announcements`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), priority }),
      });
      if (res.ok) {
        setTitle(""); setBody(""); setPriority("normal");
        setSuccess("Announcement posted.");
        setTimeout(() => setSuccess(""), 3000);
        load();
      }
    } catch {}
    setPosting(false);
  };

  const handleToggle = async (id) => {
    await fetch(`${API}/api/admin/announcements/${id}/toggle`, { method: "PATCH", credentials: "include" });
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    await fetch(`${API}/api/admin/announcements/${id}`, { method: "DELETE", credentials: "include" });
    load();
  };

  const priorityColor = { normal: "#d4900a", important: "#f59e0b", critical: "#ef4444" };

  return (
    <div>
      {/* Create form */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem", marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>
          NEW ANNOUNCEMENT
        </p>
        <input
          data-testid="ann-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement title..."
          style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "1rem", padding: "0.75rem 1rem", boxSizing: "border-box", outline: "none", marginBottom: "0.75rem" }}
        />
        <textarea
          data-testid="ann-body-input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Announcement body text..."
          rows={3}
          style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", lineHeight: 1.6, padding: "0.75rem 1rem", resize: "vertical", boxSizing: "border-box", outline: "none", marginBottom: "0.75rem" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Priority:</label>
            <select
              data-testid="ann-priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ background: "#001a33", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", padding: "0.375rem 0.75rem", outline: "none" }}
            >
              <option value="normal">Normal</option>
              <option value="important">Important</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <button
            data-testid="ann-post-btn"
            onClick={handleCreate}
            disabled={posting || !title.trim() || !body.trim()}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.625rem 1.25rem", background: title.trim() && body.trim() ? "#d4900a" : "rgba(255,255,255,0.08)", color: title.trim() && body.trim() ? "#000F1F" : "rgba(255,255,255,0.3)", border: "none", cursor: posting || !title.trim() || !body.trim() ? "default" : "pointer", opacity: posting ? 0.7 : 1 }}
          >
            {posting ? "POSTING..." : "POST ANNOUNCEMENT"} {!posting && <ArrowRight size={12} />}
          </button>
          {success && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "#22c55e", display: "flex", alignItems: "center", gap: "0.35rem" }}><CheckCircle size={13} />{success}</span>}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <p style={{ fontSize: "0.762rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>LOADING...</p>
      ) : items.length === 0 ? (
        <p style={{ fontSize: "0.857rem", color: "rgba(255,255,255,0.3)" }}>No announcements yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((ann) => (
            <div key={ann.announcement_id} data-testid={`admin-ann-${ann.announcement_id}`} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.07)`, borderLeft: `3px solid ${ann.is_active ? priorityColor[ann.priority] : "rgba(255,255,255,0.12)"}`, padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "1rem", opacity: ann.is_active ? 1 : 0.5 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: priorityColor[ann.priority] }}>
                    {ann.priority.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.924rem", color: "#fff" }}>{ann.title}</span>
                  {!ann.is_active && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", padding: "0.1rem 0.45rem" }}>INACTIVE</span>}
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{ann.body}</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button
                  data-testid={`toggle-ann-${ann.announcement_id}`}
                  onClick={() => handleToggle(ann.announcement_id)}
                  title={ann.is_active ? "Deactivate" : "Activate"}
                  style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: ann.is_active ? "#22c55e" : "rgba(255,255,255,0.3)", padding: "0.375rem 0.5rem", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  {ann.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
                <button
                  data-testid={`delete-ann-${ann.announcement_id}`}
                  onClick={() => handleDelete(ann.announcement_id)}
                  title="Delete"
                  style={{ background: "none", border: "1px solid rgba(239,68,68,0.2)", color: "rgba(239,68,68,0.5)", padding: "0.375rem 0.5rem", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Q&A Tab ───────────────────────────────────────────────────────────────────
function QATab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState({});
  const [posting, setPosting] = useState(null);
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("all");

  const load = useCallback(() => {
    fetch(`${API}/api/admin/lesson-qa`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { setItems(d.qa || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleReply = async (qaId) => {
    const reply = replies[qaId];
    if (!reply?.trim()) return;
    setPosting(qaId);
    try {
      const res = await fetch(`${API}/api/admin/lesson-qa/${qaId}/reply`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: reply.trim() }),
      });
      if (res.ok) {
        setReplies((prev) => ({ ...prev, [qaId]: "" }));
        setSuccess("Reply posted.");
        setTimeout(() => setSuccess(""), 2500);
        load();
      }
    } catch {}
    setPosting(null);
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch { return ""; }
  };

  const filtered = filter === "unanswered" ? items.filter((i) => !i.reply) : items;

  return (
    <div>
      {/* Filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", alignItems: "center" }}>
        <span style={{ fontSize: "0.714rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Show:</span>
        {["all", "unanswered"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.375rem 0.875rem", background: filter === f ? "rgba(212,144,10,0.12)" : "none", border: `1px solid ${filter === f ? "rgba(212,144,10,0.4)" : "rgba(255,255,255,0.1)"}`, color: filter === f ? "#d4900a" : "rgba(255,255,255,0.4)", cursor: "pointer" }}>
            {f === "unanswered" ? `Unanswered (${items.filter((i) => !i.reply).length})` : `All (${items.length})`}
          </button>
        ))}
        {success && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.762rem", color: "#22c55e", display: "flex", alignItems: "center", gap: "0.35rem", marginLeft: "auto" }}><CheckCircle size={13} />{success}</span>}
      </div>

      {loading ? (
        <p style={{ fontSize: "0.762rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>LOADING...</p>
      ) : filtered.length === 0 ? (
        <p style={{ fontSize: "0.857rem", color: "rgba(255,255,255,0.3)" }}>{filter === "unanswered" ? "No unanswered questions." : "No questions yet."}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map((item) => (
            <div key={item.qa_id} data-testid={`admin-qa-${item.qa_id}`} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${item.reply ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.2)"}`, padding: "1.25rem" }}>
              {/* Meta */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.7)", background: "rgba(212,144,10,0.08)", border: "1px solid rgba(212,144,10,0.15)", padding: "0.1rem 0.45rem" }}>
                  LESSON {item.lesson_id}
                </span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "0.762rem", color: "rgba(255,255,255,0.6)" }}>{item.user_name}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.619rem", color: "rgba(255,255,255,0.25)" }}>{formatDate(item.created_at)}</span>
                {item.reply ? (
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22c55e", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.1rem 0.45rem", marginLeft: "auto" }}>ANSWERED</span>
                ) : (
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f59e0b", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", padding: "0.1rem 0.45rem", marginLeft: "auto" }}>NEEDS REPLY</span>
                )}
              </div>

              {/* Question */}
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.924rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65, marginBottom: item.reply ? "0.875rem" : "1rem" }}>
                {item.question}
              </p>

              {/* Existing reply */}
              {item.reply && (
                <div style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)", borderLeft: "2px solid #22c55e", padding: "0.75rem 1rem", marginBottom: "0.75rem" }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.714rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.375rem" }}>YOUR REPLY</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{item.reply}</p>
                </div>
              )}

              {/* Reply input */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <textarea
                  value={replies[item.qa_id] || ""}
                  onChange={(e) => setReplies((prev) => ({ ...prev, [item.qa_id]: e.target.value }))}
                  placeholder={item.reply ? "Update reply..." : "Write your reply..."}
                  rows={2}
                  style={{ flex: 1, minWidth: 200, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "0.857rem", lineHeight: 1.6, padding: "0.625rem 0.875rem", resize: "none", outline: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(212,144,10,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  data-testid={`reply-qa-${item.qa_id}`}
                  onClick={() => handleReply(item.qa_id)}
                  disabled={posting === item.qa_id || !replies[item.qa_id]?.trim()}
                  style={{ alignSelf: "flex-end", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "0.714rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.5rem 1rem", background: replies[item.qa_id]?.trim() ? "#d4900a" : "rgba(255,255,255,0.06)", color: replies[item.qa_id]?.trim() ? "#000F1F" : "rgba(255,255,255,0.25)", border: "none", cursor: posting === item.qa_id || !replies[item.qa_id]?.trim() ? "default" : "pointer" }}
                >
                  {posting === item.qa_id ? "POSTING..." : item.reply ? "UPDATE" : "REPLY"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
