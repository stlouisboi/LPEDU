import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import AdminNavBar from "../components/AdminNavBar";

const API  = process.env.REACT_APP_BACKEND_URL;
const NAVY = "#060d19";
const GOLD = "#C5A059";
const MONO = "'JetBrains Mono','IBM Plex Mono',monospace";
const SANS = "'Inter',sans-serif";

export default function AdminSinsLeadsPage() {
  const [leads, setLeads]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/admin/sins-leads`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setLeads(data.leads || []);
        setTotal(data.total || 0);
      } catch {
        setError("Could not load checklist leads.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function exportCSV() {
    const rows = [["Email", "Source", "Captured At"], ...leads.map(l => [l.email, l.source, l.captured_at])];
    const csv  = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = "sins-leads.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: "#fff" }}>
      <AdminNavBar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", color: "rgba(197,160,89,0.55)", textTransform: "uppercase", margin: "0 0 0.5rem" }}>
              LEAD CAPTURE · LP-LEAD-001
            </p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.75rem", color: "#fff", margin: "0 0 0.35rem" }}>
              16 Deadly Sins — Checklist Downloads
            </h1>
            <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.40)", margin: 0 }}>
              Email captures from the 16 Deadly Sins self-audit checklist gate
            </p>
          </div>
          <button
            data-testid="sins-leads-export-btn"
            onClick={exportCSV}
            disabled={leads.length === 0}
            style={{
              fontFamily: SANS, fontWeight: 700, fontSize: "0.762rem", letterSpacing: "0.10em",
              textTransform: "uppercase", color: "#0b1628", background: leads.length ? GOLD : "rgba(197,160,89,0.30)",
              border: "none", padding: "0.75rem 1.5rem", cursor: leads.length ? "pointer" : "default",
              display: "flex", alignItems: "center", gap: "0.5rem", transition: "background 0.2s",
            }}
          >
            <Download size={13} /> Export CSV
          </button>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", gap: "1px", marginBottom: "2rem", background: "rgba(255,255,255,0.06)" }}>
          {[
            { label: "Total Leads", value: total },
            { label: "Email Sequence", value: "16 Deadly Sins Downloads" },
            { label: "Lead Source", value: "sins_checklist_download" },
            { label: "Document", value: "LP_16DeadlySins_Checklist_SelfAssessment.pdf" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "#0B1525", padding: "1rem 1.25rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.555rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(197,160,89,0.50)", textTransform: "uppercase", margin: "0 0 0.375rem" }}>{s.label}</p>
              <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.924rem", color: "#fff", margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Email sequence notice */}
        <div style={{ background: "rgba(197,160,89,0.06)", border: "1px solid rgba(197,160,89,0.20)", borderLeft: `3px solid ${GOLD}`, padding: "1rem 1.25rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.600rem", fontWeight: 700, letterSpacing: "0.16em", color: GOLD, textTransform: "uppercase", margin: "0 0 0.35rem" }}>
            EMAIL SEQUENCE STATUS
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.65 }}>
            Leads are added to MailerLite with <code style={{ fontFamily: MONO, fontSize: "0.762rem", color: GOLD, background: "rgba(197,160,89,0.10)", padding: "0.1rem 0.3rem" }}>lead_group: "16 Deadly Sins Downloads"</code>. No automated email sequence is currently configured in MailerLite — create a MailerLite automation triggered by this group to send follow-up emails.
          </p>
        </div>

        {/* Lead table */}
        {loading ? (
          <p style={{ fontFamily: MONO, fontSize: "0.762rem", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "3rem 0" }}>Loading leads...</p>
        ) : error ? (
          <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "#ef4444", textAlign: "center", padding: "3rem 0" }}>{error}</p>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase" }}>No leads captured yet</p>
          </div>
        ) : (
          <div data-testid="sins-leads-table">
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "1px" }}>
              {["Email", "Source", "Captured"].map(h => (
                <div key={h} style={{ background: "#0A1422", padding: "0.625rem 1rem" }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.555rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(197,160,89,0.50)", textTransform: "uppercase", margin: 0 }}>{h}</p>
                </div>
              ))}
            </div>
            {/* Rows */}
            {leads.map((lead, i) => (
              <div
                key={i}
                data-testid={`sins-lead-row-${i}`}
                style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.04)", marginBottom: "1px" }}
              >
                <div style={{ background: "#0B1525", padding: "0.875rem 1rem" }}>
                  <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "#fff", margin: 0 }}>{lead.email}</p>
                </div>
                <div style={{ background: "#0B1525", padding: "0.875rem 1rem" }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.619rem", color: "rgba(197,160,89,0.65)", letterSpacing: "0.08em", margin: 0 }}>{lead.source || "—"}</p>
                </div>
                <div style={{ background: "#0B1525", padding: "0.875rem 1rem" }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                    {lead.captured_at ? new Date(lead.captured_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
