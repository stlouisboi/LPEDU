import React, { useState, useEffect } from "react";

const CATEGORY_LABELS = {
  hos: "HOS Compliance Packet",
  maintenance: "Maintenance Packet",
  insurance: "Insurance & Authority Packet",
  drug_alcohol: "Drug & Alcohol Packet",
  new_entrant: "New Entrant Packet",
  general: "General / All Cohort",
};

export default function DeliverablesPortal({ API }) {
  const [pdfs, setPdfs] = useState([]);
  const [downloading, setDownloading] = useState(null);
  const mono = "'Inter', sans-serif";

  useEffect(() => {
    fetch(`${API}/api/portal/pdfs`, { credentials: "include" })
      .then(r => r.ok ? r.json() : [])
      .then(setPdfs)
      .catch(() => {});
  }, [API]);

  if (pdfs.length === 0) return null;

  const handleDownload = async (pdf) => {
    setDownloading(pdf.id);
    try {
      const r = await fetch(`${API}/api/portal/pdfs/${pdf.id}/download`, { credentials: "include" });
      if (!r.ok) throw new Error("Download failed");
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = pdf.original_filename || `${pdf.display_name}.pdf`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch {}
    finally { setDownloading(null); }
  };

  return (
    <section style={{ borderTop: "1px solid rgba(212,144,10,0.15)", padding: "2.5rem 2.5rem 3rem", marginTop: "1rem" }}>
      <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.82)", marginBottom: "1.5rem" }}>
        DELIVERABLES — {pdfs.length} FILE{pdfs.length !== 1 ? "S" : ""}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {pdfs.map(pdf => (
          <div key={pdf.id} data-testid={`deliverable-${pdf.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.14)", borderLeft: "3px solid #d4900a", padding: "1rem 1.25rem", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "#fff", margin: "0 0 3px" }}>{pdf.display_name}</p>
              {pdf.description && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", margin: "0 0 5px" }}>{pdf.description}</p>}
              <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)" }}>
                {CATEGORY_LABELS[pdf.category] || pdf.category}
              </span>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.30)", margin: "4px 0 0" }}>
                This asset is designed to be used in your daily operation — not stored.
              </p>
            </div>
            <button
              data-testid={`download-${pdf.id}`}
              onClick={() => handleDownload(pdf)}
              disabled={downloading === pdf.id}
              style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: downloading === pdf.id ? "rgba(212,144,10,0.3)" : "#d4900a", color: "#0b1628", border: "none", padding: "0.65rem 1.25rem", cursor: downloading === pdf.id ? "not-allowed" : "pointer", flexShrink: 0 }}
            >{downloading === pdf.id ? "DOWNLOADING..." : "DOWNLOAD →"}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
