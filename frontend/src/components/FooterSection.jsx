export default function FooterSection() {
  const NAV_ITEMS = [
    { label: "Knowledge Center", href: "/knowledge-center", external: false },
    { label: "AUTO Method", href: "https://www.launchpathedu.com/auto-method", external: true },
    { label: "AUTO Diagnostic", href: "/auto-diagnostic", external: false },
    { label: "Ground 0 Briefing", href: "https://www.launchpathedu.com/ground-0-briefing", external: true },
    { label: "About", href: "/about", external: false },
  ];

  const linkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "1.12rem",
    color: "#BBBBBB",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  return (
    <footer data-testid="footer-section" style={{
      background: "#001A33",
      borderTop: "1px solid var(--divider-dark)",
      padding: "4rem 1.5rem 2.5rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "4rem",
          marginBottom: "3.5rem",
          alignItems: "start",
        }} className="footer-grid">

          {/* Left column */}
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
              alt="LaunchPath Transportation EDU"
              style={{ height: 26, marginBottom: "1.25rem", display: "block" }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "#BBBBBB", lineHeight: 1.5, marginBottom: "0.4rem" }}>
              Accuracy Over Hype.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "#BBBBBB", lineHeight: 1.5 }}>
              Systems Over Shortcuts.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.896rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "#BBBBBB",
              marginBottom: "1.25rem",
            }}>
              Navigation
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {NAV_ITEMS.map(item => (
                item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#BBBBBB"}
                  >{item.label}</a>
                ) : (
                  <a key={item.label} href={item.href}
                    style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#BBBBBB"}
                  >{item.label}</a>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div style={{
          borderTop: "1px solid var(--divider-dark)",
          paddingTop: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.875rem",
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "#BBBBBB" }}>
            &copy; {new Date().getFullYear()} LaunchPath Transportation EDU. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.952rem", color: "#AAAAAA", lineHeight: 1.7, maxWidth: 800 }}>
            LaunchPath is an educational program. Content does not constitute legal, tax, financial, or compliance advice. Verify all information with appropriate professionals and regulatory agencies before making business decisions.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.918rem", color: "#AAAAAA" }}>
            Current as of March 2026. Verified against ecfr.gov.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </footer>
  );
}
