const COLS = [
  {
    heading: "Foundation",
    links: ["Home", "About", "What's Included", "Contact"],
    hrefs: ["/", "/about", "/", "/contact"],
  },
  {
    heading: "System",
    links: ["AUTO Method", "Knowledge Center", "Resources", "TCO Calculator"],
    hrefs: ["/auto-method", "/knowledge-center", "/resources", "/tools/tco-calculator"],
  },
  {
    heading: "Access",
    links: ["AUTO Diagnostic", "Ground 0 Briefing", "Admission", "Operator Portal"],
    hrefs: ["/auto-diagnostic", "/ground-0-briefing", "/admission", "/portal"],
  },
  {
    heading: "Governance",
    links: ["Privacy Policy", "Terms of Service", "FMCSA Official"],
    hrefs: ["/privacy", "/terms", "https://www.fmcsa.dot.gov"],
  },
];

export default function FooterSection() {
  return (
    <footer data-testid="footer-section" style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--border)",
      padding: "4rem 1.5rem 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3, 1fr)", gap: "3rem", marginBottom: "4rem" }} className="footer-grid">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
              alt="LaunchPath" style={{ height: 26, marginBottom: "1.25rem", display: "block" }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--text-subtle)", lineHeight: 1.75, maxWidth: 280 }}>
              A documented operational Standard for new motor carrier authorities. Accuracy over hype. Systems over shortcuts.
            </p>
          </div>

          {COLS.map(col => (
            <div key={col.heading}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "1.25rem" }}>
                {col.heading}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((link, i) => (
                  <a key={link}
                    href={col.hrefs[i].startsWith("http") ? col.hrefs[i] : `https://www.launchpathedu.com${col.hrefs[i]}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--text-subtle)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--text)"}
                    onMouseLeave={e => e.target.style.color = "var(--text-subtle)"}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text-subtle)", letterSpacing: "0.08em" }}>
            CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "var(--text-subtle)" }}>
            &copy; {new Date().getFullYear()} LaunchPath Transportation EDU
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
