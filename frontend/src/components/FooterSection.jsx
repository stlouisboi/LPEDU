export default function FooterSection() {
  const PLATFORM = [
    { label: "LaunchPath Standard", href: "/program" },
    { label: "REACH Diagnostic", href: "/reach-diagnostic" },
    { label: "Compliance Library", href: "/compliance-library" },
  ];

  const RESOURCES = [
    { label: "Operational Library", href: "/knowledge-center" },
    { label: "AUTO Method", href: "/auto-method" },
    { label: "About", href: "/about" },
    { label: "Operator Portal", href: "/portal" },
  ];

  const AUTHORITY = [
    { label: "FMCSA SAFER", href: "https://safer.fmcsa.dot.gov", external: true },
    { label: "49 CFR (ecfr.gov)", href: "https://www.ecfr.gov/current/title-49", external: true },
    { label: "FMCSA Clearinghouse", href: "https://clearinghouse.fmcsa.dot.gov", external: true },
  ];

  const colHead = {
    fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700,
    letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a",
    marginBottom: "1.1rem",
  };

  const linkStyle = {
    fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)",
    color: "#BBBBBB", textDecoration: "none", transition: "color 0.2s", display: "block",
  };

  const ColLinks = ({ items }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
      {items.map(item => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          style={linkStyle}
          onMouseEnter={e => e.currentTarget.style.color = "#d4900a"}
          onMouseLeave={e => e.currentTarget.style.color = "#BBBBBB"}
        >
          {item.label}
        </a>
      ))}
    </div>
  );

  return (
    <footer data-testid="footer-section" style={{
      background: "#0d1c30",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "4rem 1.5rem 2.5rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "3.5rem",
          alignItems: "start",
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <img
              src="/white_logo.png"
              alt="LaunchPath Transportation EDU"
              width={183}
              height={36}
              style={{ height: 36, width: "auto", marginBottom: "1.25rem", display: "block" }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "#BBBBBB", lineHeight: 1.6 }}>
              Accuracy Over Hype.<br />Systems Over Shortcuts.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p style={colHead}>Platform</p>
            <ColLinks items={PLATFORM} />
          </div>

          {/* Resources */}
          <div>
            <p style={colHead}>Resources</p>
            <ColLinks items={RESOURCES} />
          </div>

          {/* Authority */}
          <div>
            <p style={colHead}>Authority</p>
            <ColLinks items={AUTHORITY} />
          </div>
        </div>

        {/* Legal */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "#BBBBBB" }}>
            &copy; {new Date().getFullYear()} LaunchPath Transportation EDU. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "#888", lineHeight: 1.7, maxWidth: 800 }}>
            LaunchPath is an educational program. Content does not constitute legal, tax, financial, or compliance advice. Verify all information with appropriate professionals and regulatory agencies before making business decisions.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "#666" }}>
            Current as of March 2026. Verified against ecfr.gov.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}} />
    </footer>
  );
}
