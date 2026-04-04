import { useState, useEffect } from "react";
import { RefreshCw, Send } from "lucide-react";
import AdminNavBar from "../components/AdminNavBar";

const API  = process.env.REACT_APP_BACKEND_URL;
const NAVY = "#060d19";
const GOLD = "#C5A059";
const MONO = "'JetBrains Mono','IBM Plex Mono',monospace";
const SANS = "'Inter',sans-serif";

const SEQ_LABELS = {
  reach_correction: "WAIT / NO-GO Correction",
  sins_nurture: "16 Sins Lead Nurture",
  pre_op_checklist: "Pre-Op Checklist Welcome",
};
const SEQ_COLORS = {
  reach_correction: "#C0392B",
  sins_nurture: GOLD,
  pre_op_checklist: "#4A90B8",
};

export default function AdminSequencesPage() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [processResult, setProcessResult] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/sequences`, { credentials: "include" });
      const d   = await res.json();
      setData(d);
    } finally {
      setLoading(false);
    }
  }

  async function runProcess() {
    setProcessing(true);
    setProcessResult(null);
    try {
      const res = await fetch(`${API}/api/sequences/process`, { method: "POST", credentials: "include" });
      const d   = await res.json();
      setProcessResult(d);
      await load();
    } finally {
      setProcessing(false);
    }
  }

  useEffect(() => { load(); }, []);

  const stats = data?.stats || {};
  const seqs  = data?.sequences || [];

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: "#fff" }}>
      <AdminNavBar />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", color: "rgba(197,160,89,0.55)", textTransform: "uppercase", margin: "0 0 0.5rem" }}>
              EMAIL SEQUENCES · LP-SEQ
            </p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.75rem", color: "#fff", margin: "0 0 0.35rem" }}>
              Drip Sequences
            </h1>
            <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.40)", margin: 0 }}>
              Flow 4: WAIT/NO-GO Correction &nbsp;·&nbsp; Flow 5: 16 Deadly Sins Nurture &nbsp;·&nbsp; Flow 6: Pre-Op Checklist
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button data-testid="sequences-refresh-btn" onClick={load}
              style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", padding: "0.75rem 1.25rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <RefreshCw size={12} /> Refresh
            </button>
            <button data-testid="sequences-process-btn" onClick={runProcess} disabled={processing}
              style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "#0b1628", background: processing ? "rgba(197,160,89,0.40)" : GOLD, border: "none", padding: "0.75rem 1.5rem", cursor: processing ? "default" : "pointer", display: "flex", alignItems: "center", gap: "0.5rem", transition: "background 0.2s" }}>
              <Send size={12} /> {processing ? "Processing..." : "Send Pending Now"}
            </button>
          </div>
        </div>

        {/* Process result */}
        {processResult && (
          <div style={{ background: processResult.sent > 0 ? "rgba(61,153,112,0.10)" : "rgba(255,255,255,0.04)", border: `1px solid ${processResult.sent > 0 ? "rgba(61,153,112,0.30)" : "rgba(255,255,255,0.10)"}`, padding: "0.875rem 1.25rem", marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: processResult.sent > 0 ? "#3d9970" : "rgba(255,255,255,0.45)", margin: 0 }}>
              {processResult.sent > 0 ? `${processResult.sent} email(s) sent.` : "No emails due right now."} {processResult.errors?.length > 0 ? `${processResult.errors.length} error(s).` : ""}
            </p>
          </div>
        )}

        {/* Stats strip */}
        <div style={{ display: "flex", gap: "1px", marginBottom: "2rem", background: "rgba(255,255,255,0.06)" }}>
          {[
            { label: "Total Enrolled", value: stats.total ?? "—" },
            { label: "Active", value: stats.active ?? "—" },
            { label: "Completed", value: stats.completed ?? "—" },
            { label: "Flow 4 (Correction)", value: stats.reach_correction ?? "—", color: "#C0392B" },
            { label: "Flow 5 (Nurture)", value: stats.sins_nurture ?? "—", color: GOLD },
            { label: "Flow 6 (Pre-Op)", value: stats.pre_op_checklist ?? "—", color: "#4A90B8" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "#0B1525", padding: "1rem 1.25rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.555rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(197,160,89,0.50)", textTransform: "uppercase", margin: "0 0 0.375rem" }}>{s.label}</p>
              <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.924rem", color: s.color || "#fff", margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Sequence legend */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "2rem" }}>
          {[
            { type: "reach_correction", flow: "Flow 4", trigger: "REACH WAIT or NO-GO result", steps: "5 emails — Day 0, 2, 5, 9, 14", cta: "Ground 0 → REACH re-entry" },
            { type: "sins_nurture",     flow: "Flow 5", trigger: "16 Deadly Sins checklist opt-in", steps: "5 emails — Day 0, 2, 4, 7, 11", cta: "Doctrine → Ground 0 → REACH" },
            { type: "pre_op_checklist", flow: "Flow 6", trigger: "Pre-op checklist form submit", steps: "3 emails — Day 0, 3, 7", cta: "Compliance Library → Program" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#0B1525", padding: "1.25rem 1.5rem", borderTop: `2px solid ${SEQ_COLORS[s.type]}` }}>
              <p style={{ fontFamily: MONO, fontSize: "0.555rem", fontWeight: 700, letterSpacing: "0.18em", color: `${SEQ_COLORS[s.type]}80`, textTransform: "uppercase", margin: "0 0 0.375rem" }}>{s.flow}</p>
              <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.924rem", color: "#fff", margin: "0 0 0.5rem" }}>{SEQ_LABELS[s.type]}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", margin: "0 0 0.25rem" }}><strong style={{ color: "rgba(255,255,255,0.65)" }}>Trigger:</strong> {s.trigger}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", margin: "0 0 0.25rem" }}><strong style={{ color: "rgba(255,255,255,0.65)" }}>Schedule:</strong> {s.steps}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.45)", margin: 0 }}><strong style={{ color: "rgba(255,255,255,0.65)" }}>CTA path:</strong> {s.cta}</p>
            </div>
          ))}
        </div>

        {/* Enrolled list */}
        {loading ? (
          <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "3rem 0" }}>Loading...</p>
        ) : seqs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase" }}>No sequences enrolled yet</p>
          </div>
        ) : (
          <div data-testid="sequences-table">
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "1px" }}>
              {["Email", "Sequence", "Progress", "Status"].map(h => (
                <div key={h} style={{ background: "#0A1422", padding: "0.625rem 1rem" }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.555rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(197,160,89,0.50)", textTransform: "uppercase", margin: 0 }}>{h}</p>
                </div>
              ))}
            </div>
            {seqs.map((seq, i) => {
              const sent  = seq.emails?.filter(e => e.sent).length || 0;
              const total = seq.emails?.length || 0;
              const color = SEQ_COLORS[seq.sequence_type] || GOLD;
              return (
                <div key={i} data-testid={`seq-row-${i}`} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.04)", marginBottom: "1px" }}>
                  <div style={{ background: "#0B1525", padding: "0.875rem 1rem" }}>
                    <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "#fff", margin: 0 }}>{seq.email}</p>
                    <p style={{ fontFamily: MONO, fontSize: "0.555rem", color: "rgba(255,255,255,0.30)", margin: "0.2rem 0 0", letterSpacing: "0.08em" }}>enrolled {seq.enrolled_at ? new Date(seq.enrolled_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}</p>
                  </div>
                  <div style={{ background: "#0B1525", padding: "0.875rem 1rem" }}>
                    <p style={{ fontFamily: MONO, fontSize: "0.580rem", color: `${color}99`, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>{SEQ_LABELS[seq.sequence_type] || seq.sequence_type}</p>
                  </div>
                  <div style={{ background: "#0B1525", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                      <div style={{ width: `${(sent / total) * 100}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>
                    <p style={{ fontFamily: MONO, fontSize: "0.619rem", color: "rgba(255,255,255,0.45)", margin: 0, flexShrink: 0 }}>{sent}/{total}</p>
                  </div>
                  <div style={{ background: "#0B1525", padding: "0.875rem 1rem" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.580rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: seq.completed ? "#3d9970" : color, background: seq.completed ? "rgba(61,153,112,0.10)" : `${color}12`, padding: "0.25rem 0.625rem" }}>
                      {seq.completed ? "COMPLETE" : "ACTIVE"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
