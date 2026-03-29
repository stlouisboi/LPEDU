import { useState, useEffect, useCallback } from "react";
import { Link } from '../compat/Link';
import AdminNavBar from "../components/AdminNavBar";
import PasswordInput from "../components/PasswordInput";

const API = process.env.REACT_APP_BACKEND_URL;
const gold = "#C5A059";
const navy = "#001A33";
const dark = "#080f1e";
const card = "#0D1929";
const mono = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const body = "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif";
const display = "'Newsreader', 'Playfair Display', serif";

// ── Module / lesson definitions ───────────────────────────────────────────────
const ALL_MODULES = [
  {
    id: "ground-0", code: "G0", title: "Ground 0: The Wisdom Module",
    description: "Free diagnostic and preview layer. 6 lessons, ~90 minutes. Establishes compliance framework, Four Pillars, and the GO/WAIT/NO-GO qualification decision.",
    lessons: [
      { id: "G0-1", title: "Welcome to LaunchPath", duration: "~8 min" },
      { id: "G0-2", title: "The Four Pillars of Survival", duration: "~15 min" },
      { id: "G0-3", title: "Lane Selection", duration: "~18 min" },
      { id: "G0-4", title: "Personal Readiness Check", duration: "~20 min" },
      { id: "G0-5", title: "Risk Tolerance Assessment", duration: "~15 min" },
      { id: "G0-6", title: "The Go/No-Go Decision", duration: "~14 min" },
    ],
  },
  {
    id: "module-1", code: "MOD-1", title: "Driver Qualification File",
    description: "HARD GATE — Station Custodian verifies DQF completion before Module 2 begins. 8 lessons, ~120 min.",
    lessons: [
      { id: "1-1", title: "Your Business Foundation", duration: "~8 min" },
      { id: "1-2", title: "Business Entity Selection", duration: "~12 min" },
      { id: "1-3", title: "Filing for DOT/MC Authority", duration: "~18 min" },
      { id: "1-4", title: "BOC-3 and Process Agent", duration: "~10 min" },
      { id: "1-5", title: "UCR and State Registrations", duration: "~12 min" },
      { id: "1-6", title: "Insurance — First Look", duration: "~15 min" },
      { id: "1-7", title: "Driver Qualification File (GATE)", duration: "~15 min" },
      { id: "1-8", title: "Business Banking & Chart of Accounts", duration: "~10 min" },
    ],
  },
  {
    id: "module-2", code: "MOD-2", title: "Authority & Insurance",
    description: "Insurance lapse is the most common cause of authority suspension. 7 lessons, ~105 min.",
    lessons: [
      { id: "2-1", title: "The Five Required Coverage Types", duration: "~18 min" },
      { id: "2-2", title: "First-Year Insurance Budget Reality", duration: "~22 min" },
      { id: "2-3", title: "Insurance Cancellation Triggers", duration: "~12 min" },
      { id: "2-4", title: "SMS Scores and Insurance Impact", duration: "~15 min" },
      { id: "2-5", title: "Accident Response Protocol", duration: "~18 min" },
      { id: "2-6", title: "Claims Management", duration: "~10 min" },
      { id: "2-7", title: "Renewal Strategy", duration: "~10 min" },
    ],
  },
  {
    id: "module-3", code: "MOD-3", title: "The 16 Deadly Sins",
    description: "Exposure & Refuge framework. 16 documented FMCSA violation categories. 8 lessons, ~115 min.",
    lessons: [
      { id: "3-1", title: "Introduction — What the 16 Sins Actually Represent", duration: "~12 min" },
      { id: "3-2", title: "Drug & Alcohol Exposure (Sins 1–5)", duration: "~18 min" },
      { id: "3-3", title: "Driver Qualification Exposure (Sins 6–9)", duration: "~18 min" },
      { id: "3-4", title: "Insurance & Financial Exposure (Sins 10–11)", duration: "~12 min" },
      { id: "3-5", title: "Vehicle Maintenance Exposure (Sins 12, 14, 15)", duration: "~15 min" },
      { id: "3-6", title: "Hours of Service Exposure (Sins 13, 16)", duration: "~15 min" },
      { id: "3-7", title: "The Complete Exposure Map", duration: "~15 min" },
      { id: "3-8", title: "From Exposure to Refuge — What Comes Next", duration: "~10 min" },
    ],
  },
  {
    id: "module-4", code: "MOD-4", title: "Drug & Alcohol Program",
    description: "Federal D&A compliance program installation — consortium, Clearinghouse, written policy. ~7 lessons, ~110 min. VERIFY titles vs. script files.",
    lessons: [
      { id: "4-1", title: "Federal D&A Program Requirements", duration: "~18 min" },
      { id: "4-2", title: "Consortium Selection and Enrollment", duration: "~15 min" },
      { id: "4-3", title: "Drug & Alcohol Clearinghouse", duration: "~20 min" },
      { id: "4-4", title: "Testing Procedures and Documentation", duration: "~16 min" },
      { id: "4-5", title: "Owner-Operator Special Considerations", duration: "~12 min" },
      { id: "4-6", title: "Written Policy and Program Maintenance", duration: "~12 min" },
      { id: "4-7", title: "Verify against script file", duration: "TBD" },
    ],
  },
  {
    id: "module-5", code: "MOD-5", title: "Hours of Service & Dispatch",
    description: "HOS compliance framework and dispatch records system. ~7 lessons, ~100 min. VERIFY titles vs. script files.",
    lessons: [
      { id: "5-1", title: "Federal HOS Rules — The Framework", duration: "~15 min" },
      { id: "5-2", title: "The 11/14/60-70 Hour Limits", duration: "~15 min" },
      { id: "5-3", title: "Short-Haul Exemptions", duration: "~15 min" },
      { id: "5-4", title: "ELD Requirements and Exemptions", duration: "~15 min" },
      { id: "5-5", title: "Paper Log Compliance", duration: "~12 min" },
      { id: "5-6", title: "Dispatch Records and Evidence Trail", duration: "~14 min" },
      { id: "5-7", title: "Verify against script file", duration: "TBD" },
    ],
  },
  {
    id: "module-6", code: "MOD-6", title: "Integrity Audit",
    description: "CREDENTIAL GATE — Clean audit triggers Verified Registry ID. Full four-pillar review. ~6 lessons, ~90 min. VERIFY titles vs. script files.",
    lessons: [
      { id: "6-1", title: "What the Integrity Audit Reviews", duration: "~15 min" },
      { id: "6-2", title: "Preparing Your Documentation Package", duration: "~15 min" },
      { id: "6-3", title: "The Four-Pillar Review Process", duration: "~18 min" },
      { id: "6-4", title: "Audit Conduct and Response Protocol", duration: "~15 min" },
      { id: "6-5", title: "Ratings, Results, and What They Mean", duration: "~12 min" },
      { id: "6-6", title: "Verify against script file", duration: "TBD" },
    ],
  },
  {
    id: "module-7", code: "MOD-7", title: "Post-Audit Recovery", type: "recovery",
    description: "CONDITIONAL — Activated only by conditional audit outcome at Module 6. ~5 lessons, ~75 min.",
    lessons: [
      { id: "7-1", title: "Understanding What Happened", duration: "~15 min" },
      { id: "7-2", title: "Corrective Action Plans", duration: "~18 min" },
      { id: "7-3", title: "Rebuilding the Compliance Backbone", duration: "~18 min" },
      { id: "7-4", title: "Authority Repair and Reinstatement", duration: "~12 min" },
      { id: "7-5", title: "Long-Term Stability After Disruption", duration: "~12 min" },
    ],
  },
  {
    id: "module-8", code: "MOD-8", title: "ELD Compliance", type: "extension",
    description: "EXTENSION — Included in enrollment, outside Verified Registry ID framework. ~5 lessons, ~70 min.",
    lessons: [
      { id: "8-1", title: "ELD Mandate Scope and Applicability", duration: "~15 min" },
      { id: "8-2", title: "Exemption Criteria", duration: "~15 min" },
      { id: "8-3", title: "Malfunction and Data Transfer Protocols", duration: "~15 min" },
      { id: "8-4", title: "Carrier-Driver Responsibilities", duration: "~12 min" },
      { id: "8-5", title: "Verify against script file", duration: "TBD" },
    ],
  },
  {
    id: "module-9", code: "MOD-9", title: "Hazmat Decisions", type: "extension",
    description: "EXTENSION — Included in enrollment, outside Verified Registry ID framework. ~5 lessons, ~65 min.",
    lessons: [
      { id: "9-1", title: "Hazmat Threshold Awareness", duration: "~15 min" },
      { id: "9-2", title: "Inadvertent Exposure — When You Don't Know You're Carrying", duration: "~15 min" },
      { id: "9-3", title: "Placard Requirements and Decision Framework", duration: "~15 min" },
      { id: "9-4", title: "When to Engage a Compliance Specialist", duration: "~10 min" },
      { id: "9-5", title: "Verify against script file", duration: "TBD" },
    ],
  },
];

// ── Login Gate (same pattern as AdminAdmissionsPage) ──────────────────────────
function AdminLoginGate({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, setState] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      const resp = await fetch(`${API}/api/auth/login`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (data.ok && data.user?.email === "vince@launchpathedu.com") {
        onSuccess(data.user);
      } else {
        setState("error");
      }
    } catch { setState("error"); }
  };

  const inp = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", fontFamily: mono, fontSize: "1rem", padding: "0.875rem 1.125rem", outline: "none" };

  return (
    <div style={{ minHeight: "100vh", background: dark, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 380, background: card, border: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem" }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: "0.75rem" }}>LAUNCHPATH ADMIN</p>
        <h2 style={{ fontFamily: display, fontSize: "1.75rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "2rem" }}>Module Editor</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input style={inp} type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          <PasswordInput style={inp} placeholder="Password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
          {state === "error" && <p style={{ fontFamily: mono, fontSize: "0.857rem", color: "#f87171" }}>Invalid credentials or access denied.</p>}
          <button type="submit" disabled={state === "loading"} style={{ background: gold, color: navy, fontFamily: mono, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.875rem", border: "none", cursor: "pointer" }}>
            {state === "loading" ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── URL input ─────────────────────────────────────────────────────────────────
function UrlField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ flex: 1 }}>
      <p style={{ fontFamily: mono, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", margin: "0 0 4px" }}>{label}</p>
      <input
        type="url" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || "https://"}
        style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#FFFFFF", fontFamily: mono, fontSize: "0.857rem", padding: "0.5rem 0.75rem", outline: "none", transition: "border-color 0.15s" }}
        onFocus={e => (e.currentTarget.style.borderColor = gold)}
        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
      />
    </div>
  );
}

// ── Module Editor pane ────────────────────────────────────────────────────────
function ModuleEditor({ module }) {
  const [description, setDescription] = useState(module.description || "");
  const [lessonUrls, setLessonUrls] = useState(
    () => Object.fromEntries(module.lessons.map(l => [l.id, { vimeo_url: "", pdf_url: "" }]))
  );
  const [saveState, setSaveState] = useState("idle");
  const [lastSaved, setLastSaved] = useState(null);

  // Load saved content for this module
  useEffect(() => {
    setDescription(module.description || "");
    setLessonUrls(Object.fromEntries(module.lessons.map(l => [l.id, { vimeo_url: "", pdf_url: "" }])));
    setSaveState("idle");

    fetch(`${API}/api/admin/module-content/${module.id}`, { credentials: "include" })
      .then(r => r.json())
      .then(d => {
        const content = d.content || {};
        if (content.description) setDescription(content.description);
        const map = Object.fromEntries(module.lessons.map(l => [l.id, { vimeo_url: "", pdf_url: "" }]));
        (content.lessons || []).forEach(l => { if (map[l.lesson_id]) map[l.lesson_id] = { vimeo_url: l.vimeo_url || "", pdf_url: l.pdf_url || "" }; });
        setLessonUrls(map);
        if (content.updated_at) setLastSaved(new Date(content.updated_at).toLocaleString());
      })
      .catch(() => {});
  }, [module]);

  const setUrl = (lessonId, field, val) => setLessonUrls(prev => ({ ...prev, [lessonId]: { ...prev[lessonId], [field]: val } }));

  const handleSave = async () => {
    setSaveState("saving");
    try {
      const payload = {
        description,
        lessons: module.lessons.map(l => ({ lesson_id: l.id, ...lessonUrls[l.id] })),
      };
      const resp = await fetch(`${API}/api/admin/module-content/${module.id}`, {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Save failed");
      setSaveState("saved");
      setLastSaved(new Date().toLocaleString());
      setTimeout(() => setSaveState("idle"), 2500);
    } catch { setSaveState("error"); setTimeout(() => setSaveState("idle"), 2500); }
  };

  const typeColor = module.type === "recovery" ? "rgba(251,146,60,0.8)" : module.type === "extension" ? "rgba(129,140,248,0.8)" : gold;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "2.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: typeColor, marginBottom: "0.5rem" }}>
          LP-{module.code} | {module.type ? module.type.toUpperCase() + " MODULE" : "IMPLEMENTATION MODULE"}
        </p>
        <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.75rem", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "0.375rem" }}>{module.title}</h2>
        <p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(255,255,255,0.35)" }}>{module.lessons.length} lessons</p>
      </div>

      {/* Description */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.625rem" }}>MODULE DESCRIPTION</p>
        <textarea
          value={description} onChange={e => setDescription(e.target.value)} rows={3}
          style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#FFFFFF", fontFamily: mono, fontSize: "0.924rem", padding: "0.75rem", outline: "none", resize: "vertical", lineHeight: 1.6 }}
        />
      </div>

      {/* Lessons */}
      <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
        LESSONS — {module.lessons.length} UNITS
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "2rem" }}>
        {module.lessons.map((lesson, i) => (
          <div key={lesson.id} data-testid={`lesson-row-${lesson.id}`} style={{ background: card, padding: "1rem 1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: mono, fontSize: "0.619rem", fontWeight: 700, color: "rgba(197,160,89,0.55)", letterSpacing: "0.1em", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontFamily: body, fontSize: "0.924rem", fontWeight: 500, color: "rgba(255,255,255,0.80)" }}>{lesson.title}</span>
              <span style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", marginLeft: "auto", flexShrink: 0 }}>{lesson.duration}</span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <UrlField label="Vimeo URL" value={lessonUrls[lesson.id]?.vimeo_url || ""} onChange={v => setUrl(lesson.id, "vimeo_url", v)} placeholder="https://vimeo.com/..." />
              <UrlField label="PDF Download URL" value={lessonUrls[lesson.id]?.pdf_url || ""} onChange={v => setUrl(lesson.id, "pdf_url", v)} placeholder="https://..." />
            </div>
          </div>
        ))}
      </div>

      {/* Save */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <button
          data-testid="module-save-btn"
          onClick={handleSave} disabled={saveState === "saving"}
          style={{ background: saveState === "saved" ? "#16a34a" : saveState === "error" ? "#b91c1c" : gold, color: saveState === "saved" || saveState === "error" ? "#FFFFFF" : navy, fontFamily: mono, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.875rem 2rem", border: "none", cursor: "pointer", transition: "background 0.2s" }}
        >
          {saveState === "saving" ? "Saving…" : saveState === "saved" ? "✓ Saved" : saveState === "error" ? "Error — Try Again" : "Save Changes"}
        </button>
        {lastSaved && <p style={{ fontFamily: mono, fontSize: "0.762rem", color: "rgba(255,255,255,0.30)" }}>Last saved: {lastSaved}</p>}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminModulesPage() {
  const [authed, setAuthed] = useState(false);
  const [selectedId, setSelectedId] = useState("ground-0");
  const [visibilityMap, setVisibilityMap] = useState({}); // module_id → true/false
  const [togglingId, setTogglingId] = useState(null);

  // Check if already logged in
  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.email === "vince@launchpathedu.com") setAuthed(true); })
      .catch(() => {});
  }, []);

  // Load all visibility states once authed
  useEffect(() => {
    if (!authed) return;
    Promise.all(
      ALL_MODULES.map(m =>
        fetch(`${API}/api/admin/module-content/${m.id}`, { credentials: "include" })
          .then(r => r.json())
          .then(d => ({ id: m.id, visible: d.content?.visible !== false }))
          .catch(() => ({ id: m.id, visible: true }))
      )
    ).then(results => {
      const map = {};
      results.forEach(r => { map[r.id] = r.visible; });
      setVisibilityMap(map);
    });
  }, [authed]);

  const handleToggleVisibility = async (e, moduleId) => {
    e.stopPropagation();
    setTogglingId(moduleId);
    try {
      const resp = await fetch(`${API}/api/admin/module-content/${moduleId}/visibility`, {
        method: "PATCH", credentials: "include",
      });
      const data = await resp.json();
      if (data.ok) setVisibilityMap(prev => ({ ...prev, [moduleId]: data.visible }));
    } catch {}
    setTogglingId(null);
  };

  if (!authed) return <AdminLoginGate onSuccess={() => setAuthed(true)} />;

  const selected = ALL_MODULES.find(m => m.id === selectedId);

  const typeTag = (m) => {
    if (m.type === "recovery") return <span style={{ fontFamily: mono, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(251,146,60,0.75)", background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.20)", padding: "0.1rem 0.4rem", marginLeft: "0.5rem" }}>RECOVERY</span>;
    if (m.type === "extension") return <span style={{ fontFamily: mono, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(129,140,248,0.75)", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.20)", padding: "0.1rem 0.4rem", marginLeft: "0.5rem" }}>EXTENSION</span>;
    return null;
  };

  return (
    <div style={{ minHeight: "100vh", background: dark, display: "flex", flexDirection: "column" }}>
      <AdminNavBar />

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <aside style={{ width: 260, flexShrink: 0, background: "#060d18", borderRight: "1px solid rgba(255,255,255,0.07)", overflowY: "auto", padding: "1.5rem 0" }}>
          <p style={{ fontFamily: mono, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "0 1.25rem", marginBottom: "0.5rem" }}>MODULES</p>
          <p style={{ fontFamily: mono, fontSize: "0.571rem", color: "rgba(255,255,255,0.20)", padding: "0 1.25rem", marginBottom: "0.75rem" }}>Eye icon = visible in portal</p>
          {ALL_MODULES.map(m => {
            const isVisible = visibilityMap[m.id] !== false;
            const isToggling = togglingId === m.id;
            return (
              <button
                key={m.id}
                data-testid={`module-nav-${m.id}`}
                onClick={() => setSelectedId(m.id)}
                style={{ width: "100%", background: selectedId === m.id ? "rgba(197,160,89,0.08)" : "none", border: "none", borderLeft: `3px solid ${selectedId === m.id ? gold : "transparent"}`, cursor: "pointer", padding: "0.75rem 1.25rem", textAlign: "left", transition: "background 0.12s" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <span style={{ fontFamily: mono, fontSize: "0.857rem", fontWeight: selectedId === m.id ? 700 : 500, color: selectedId === m.id ? "#FFFFFF" : (isVisible ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)"), lineHeight: 1.3, flex: 1 }}>{m.title}</span>
                  {typeTag(m)}
                  {/* Visibility toggle */}
                  <span
                    data-testid={`module-visibility-toggle-${m.id}`}
                    role="button"
                    title={isVisible ? "Visible — click to hide" : "Hidden — click to show"}
                    onClick={(e) => handleToggleVisibility(e, m.id)}
                    style={{
                      flexShrink: 0,
                      color: isToggling ? gold : (isVisible ? "rgba(197,160,89,0.7)" : "rgba(255,255,255,0.18)"),
                      fontSize: "0.85rem",
                      lineHeight: 1,
                      padding: "0.2rem",
                      transition: "color 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = gold; }}
                    onMouseLeave={e => { e.currentTarget.style.color = isVisible ? "rgba(197,160,89,0.7)" : "rgba(255,255,255,0.18)"; }}
                  >
                    {isToggling ? "…" : isVisible ? "●" : "○"}
                  </span>
                </div>
                <span style={{ fontFamily: mono, fontSize: "0.619rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>LP-{m.code} · {m.lessons.length} lessons</span>
              </button>
            );
          })}
        </aside>

        {/* Editor */}
        {selected && <ModuleEditor key={selected.id} module={selected} />}
      </div>
    </div>
  );
}
