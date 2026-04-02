/**
 * AuditBinderDownload — replaces the old PreOpChecklistGate email form.
 * Shows "The Complete Audit Binder Series" block with a direct PDF download.
 */

const MONO = "'IBM Plex Mono', 'Courier New', monospace";
const SERIF = "'Newsreader', 'Playfair Display', serif";
const SANS = "'Inter', sans-serif";
const PDF_URL = "/downloads/LaunchPath_Complete_Audit_Binder_Series.pdf";

export default function PreOpChecklistGate() {
  return (
    <div
      data-testid="audit-binder-download"
      style={{
        background: "#e9e3d9",
        padding: "2.5rem 2.5rem",
        margin: "2.75rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2.5rem",
        flexWrap: "wrap",
      }}
    >
      {/* Left: label + title + domains */}
      <div style={{ flex: "1 1 300px" }}>
        <p style={{
          fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700,
          letterSpacing: "0.20em", textTransform: "uppercase",
          color: "rgba(0,15,31,0.40)", marginBottom: "1rem",
        }}>
          The Complete Audit Binder Series
        </p>

        <h3 style={{
          fontFamily: SERIF, fontWeight: 700,
          fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
          color: "#0B1927", lineHeight: 1.25, marginBottom: "1rem",
        }}>
          All 6 compliance checklists in one printable PDF
        </h3>

        <p style={{
          fontFamily: SANS, fontSize: "0.95rem",
          color: "rgba(0,15,31,0.55)", lineHeight: 1.85,
        }}>
          New Entrant — HOS — Drug &amp; Alcohol —<br />
          Maintenance — Insurance — Authority Registrations
        </p>
      </div>

      {/* Right: download button */}
      <div style={{ flexShrink: 0 }}>
        <a
          href={PDF_URL}
          download="LaunchPath_Complete_Audit_Binder_Series.pdf"
          data-testid="download-checklists-btn"
          style={{
            display: "inline-block",
            background: "#b5861a",
            color: "#ffffff",
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: "0.857rem",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            padding: "1.25rem 2rem",
            textDecoration: "none",
            transition: "background 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#9b7115"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#b5861a"; }}
        >
          Download All Checklists
        </a>
      </div>
    </div>
  );
}

