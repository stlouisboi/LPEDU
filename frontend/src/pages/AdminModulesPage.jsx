import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_BACKEND_URL;
const gold = "#C5A059";
const navy = "#001A33";
const dark = "#080f1e";
const card = "#0D1929";
const mono = "'Inter', sans-serif";
const display = "'Playfair Display', serif";

// ── Module / lesson definitions ───────────────────────────────────────────────
const ALL_MODULES = [
  {
    id: "ground-0", code: "G0", title: "Ground 0: The Wisdom Module",
    description: "A six-lesson assessment module that measures real-world operator readiness before placement into the LaunchPath Standard.",
    lessons: [
      { id: "G0-1", title: "The Reality of Motor Carrier Authority", duration: "~12 min" },
      { id: "G0-2", title: "The 90-Day Survival Window", duration: "~15 min" },
      { id: "G0-3", title: "The AUTO Risk Model", duration: "~18 min" },
      { id: "G0-4", title: "The Four Pillars of Survival", duration: "~14 min" },
      { id: "G0-5", title: "The 16 Deadly Sins", duration: "~20 min" },
      { id: "G0-6", title: "The GO / WAIT / NO-GO Decision", duration: "~16 min" },
    ],
  },
  {
    id: "module-1", code: "MOD-1", title: "Business & Authority Setup",
    description: "Install your legal and regulatory foundation before the first truck moves.",
    lessons: [
      { id: "1-1", title: "The Authority Decision", duration: "~22 min" },
      { id: "1-2", title: "Choosing Your Entity Structure", duration: "~18 min" },
      { id: "1-3", title: "Filing USDOT & Operating Authority", duration: "~20 min" },
      { id: "1-4", title: "UCR, BOC-3, and MCS-150", duration: "~16 min" },
      { id: "1-5", title: "Insurance Certificates & Authority Activation", duration: "~14 min" },
      { id: "1-6", title: "Reading Your SAFER Web Profile", duration: "~12 min" },
      { id: "1-7", title: "Module 1 Complete — Authority Installed", duration: "~10 min" },
    ],
  },
  {
    id: "module-2", code: "MOD-2", title: "Insurance Survival",
    description: "Understand exactly what coverage FMCSA requires and how certificate failures appear at audit.",
    lessons: [
      { id: "2-1", title: "Primary liability minimums by operation type", duration: "~20 min" },
      { id: "2-2", title: "Cargo insurance structures and coverage gaps", duration: "~20 min" },
      { id: "2-3", title: "BMC-91/91X filing mechanics", duration: "~20 min" },
      { id: "2-4", title: "Common violations and how they appear in audits", duration: "~20 min" },
      { id: "2-5", title: "Renewal timing and lapse protection strategies", duration: "~20 min" },
      { id: "2-6", title: "Building safety history to reduce premiums", duration: "~20 min" },
    ],
  },
  {
    id: "module-3", code: "MOD-3", title: "The 16 Deadly Sins",
    description: "A structured walkthrough of the 16 most cited FMCSA violation categories.",
    lessons: [
      { id: "3-1", title: "Hours of Service violations (Part 395)", duration: "~22 min" },
      { id: "3-2", title: "Driver Qualification file failures (Part 391)", duration: "~22 min" },
      { id: "3-3", title: "Controlled Substances & Alcohol testing (Part 382)", duration: "~22 min" },
      { id: "3-4", title: "Vehicle maintenance and inspection records (Part 396)", duration: "~22 min" },
      { id: "3-5", title: "Financial responsibility / insurance lapse", duration: "~22 min" },
      { id: "3-6", title: "Hazardous materials missteps", duration: "~22 min" },
      { id: "3-7", title: "Accident register and recordkeeping failures", duration: "~22 min" },
      { id: "3-8", title: "Operating beyond authority scope", duration: "~22 min" },
    ],
  },
  {
    id: "module-4", code: "MOD-4", title: "New Entrant Audit Prep",
    description: "Prepare your operation for the FMCSA New Entrant Safety Audit.",
    lessons: [
      { id: "4-1", title: "Audit triggers and the 12-month new entrant timeline", duration: "~25 min" },
      { id: "4-2", title: "The Safety Audit examination checklist", duration: "~25 min" },
      { id: "4-3", title: "Document control system setup", duration: "~25 min" },
      { id: "4-4", title: "Driver file requirements and verification", duration: "~25 min" },
      { id: "4-5", title: "Responding to Conditional safety ratings", duration: "~25 min" },
      { id: "4-6", title: "Corrective Action Plan development", duration: "~25 min" },
    ],
  },
  {
    id: "module-5", code: "MOD-5", title: "Cash-Flow Oxygen",
    description: "Build the financial operating systems that keep a new motor carrier solvent through the first year.",
    lessons: [
      { id: "5-1", title: "Load-to-overhead ratio analysis", duration: "~20 min" },
      { id: "5-2", title: "Invoice factoring vs. direct billing", duration: "~20 min" },
      { id: "5-3", title: "Fuel surcharge and cost exposure management", duration: "~20 min" },
      { id: "5-4", title: "Tax reserve discipline for new carriers", duration: "~20 min" },
      { id: "5-5", title: "Broker credit vetting and payment terms", duration: "~20 min" },
      { id: "5-6", title: "Building toward cash flow stability", duration: "~20 min" },
    ],
  },
  {
    id: "module-6", code: "MOD-6", title: "Operational Discipline",
    description: "Install the daily, weekly, and monthly operational rhythms that define a compliant carrier.",
    lessons: [
      { id: "6-1", title: "Pre/post-trip inspection protocols", duration: "~20 min" },
      { id: "6-2", title: "ELD and HOS log discipline", duration: "~20 min" },
      { id: "6-3", title: "Maintenance record cadence and filing", duration: "~20 min" },
      { id: "6-4", title: "Driver Vehicle Inspection Report (DVIR) management", duration: "~20 min" },
      { id: "6-5", title: "Incident reporting timelines and procedures", duration: "~20 min" },
      { id: "6-6", title: "Monthly self-audit routine", duration: "~20 min" },
    ],
  },
  {
    id: "module-7", code: "MOD-7", title: "Post-Audit Recovery", type: "recovery",
    description: "For carriers who have received a Conditional or Unsatisfactory safety rating.",
    lessons: [
      { id: "7-1", title: "Understanding your safety rating and what it means", duration: "~22 min" },
      { id: "7-2", title: "Building your Corrective Action Plan", duration: "~22 min" },
      { id: "7-3", title: "Document reconstruction and evidence preparation", duration: "~22 min" },
      { id: "7-4", title: "Rebuttal submission and timeline for rating improvement", duration: "~22 min" },
    ],
  },
  {
    id: "module-8", code: "MOD-8", title: "ELD Compliance", type: "extension",
    description: "Everything a regulated carrier needs to know about Electronic Logging Device compliance.",
    lessons: [
      { id: "8-1", title: "ELD mandate applicability and exemptions", duration: "~21 min" },
      { id: "8-2", title: "Approved device selection criteria", duration: "~21 min" },
      { id: "8-3", title: "Driver training and adoption requirements", duration: "~21 min" },
      { id: "8-4", title: "ELD malfunction and exception protocols", duration: "~21 min" },
      { id: "8-5", title: "Common ELD audit violations and remedies", duration: "~21 min" },
    ],
  },
  {
    id: "module-9", code: "MOD-9", title: "Hazmat Decisions", type: "extension",
    description: "A structured decision framework for carriers considering hazardous materials.",
    lessons: [
      { id: "9-1", title: "Hazmat classification and definition boundaries", duration: "~22 min" },
      { id: "9-2", title: "PHMSA registration requirements and thresholds", duration: "~22 min" },
      { id: "9-3", title: "Placarding rules and shipper responsibilities", duration: "~22 min" },
      { id: "9-4", title: "Emergency Response Information requirements", duration: "~22 min" },
      { id: "9-5", title: "Carrier training documentation", duration: "~22 min" },
      { id: "9-6", title: "Hazmat liability exposure for non-specialist carriers", duration: "~22 min" },
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
          <input style={inp} type="password" placeholder="Password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
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
              <span style={{ fontFamily: mono, fontSize: "0.924rem", fontWeight: 500, color: "rgba(255,255,255,0.80)" }}>{lesson.title}</span>
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

  // Check if already logged in
  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.email === "vince@launchpathedu.com") setAuthed(true); })
      .catch(() => {});
  }, []);

  if (!authed) return <AdminLoginGate onSuccess={() => setAuthed(true)} />;

  const selected = ALL_MODULES.find(m => m.id === selectedId);

  const typeTag = (m) => {
    if (m.type === "recovery") return <span style={{ fontFamily: mono, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(251,146,60,0.75)", background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.20)", padding: "0.1rem 0.4rem", marginLeft: "0.5rem" }}>RECOVERY</span>;
    if (m.type === "extension") return <span style={{ fontFamily: mono, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(129,140,248,0.75)", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.20)", padding: "0.1rem 0.4rem", marginLeft: "0.5rem" }}>EXTENSION</span>;
    return null;
  };

  return (
    <div style={{ minHeight: "100vh", background: dark, display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: navy, borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0.875rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: gold }}>LAUNCHPATH ADMIN</p>
          <Link to="/admin/admissions" style={{ fontFamily: mono, fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Admissions →</Link>
        </div>
        <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.50)" }}>MODULE EDITOR</p>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <aside style={{ width: 260, flexShrink: 0, background: "#060d18", borderRight: "1px solid rgba(255,255,255,0.07)", overflowY: "auto", padding: "1.5rem 0" }}>
          <p style={{ fontFamily: mono, fontSize: "0.619rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "0 1.25rem", marginBottom: "0.75rem" }}>MODULES</p>
          {ALL_MODULES.map(m => (
            <button
              key={m.id}
              data-testid={`module-nav-${m.id}`}
              onClick={() => setSelectedId(m.id)}
              style={{ width: "100%", background: selectedId === m.id ? "rgba(197,160,89,0.08)" : "none", border: "none", borderLeft: `3px solid ${selectedId === m.id ? gold : "transparent"}`, cursor: "pointer", padding: "0.75rem 1.25rem", textAlign: "left", transition: "background 0.12s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <span style={{ fontFamily: mono, fontSize: "0.857rem", fontWeight: selectedId === m.id ? 700 : 500, color: selectedId === m.id ? "#FFFFFF" : "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>{m.title}</span>
                {typeTag(m)}
              </div>
              <span style={{ fontFamily: mono, fontSize: "0.619rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>LP-{m.code} · {m.lessons.length} lessons</span>
            </button>
          ))}
        </aside>

        {/* Editor */}
        {selected && <ModuleEditor key={selected.id} module={selected} />}
      </div>
    </div>
  );
}
