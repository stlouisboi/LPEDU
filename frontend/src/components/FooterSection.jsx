export default function FooterSection() {
  return (
    <footer
      data-testid="footer-section"
      style={{
        background: "#060e1a",
        borderTop: "1px solid var(--border)",
        padding: "3rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
            alt="LaunchPath"
            style={{ height: 28, marginBottom: "0.75rem", display: "block" }}
          />
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#8899aa", letterSpacing: "0.08em", margin: 0 }}>
            ACCURACY OVER HYPE. SYSTEMS OVER SHORTCUTS.
          </p>
        </div>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {["KNOWLEDGE CENTER", "GROUND 0 BRIEFING", "AUTO DIAGNOSTIC", "ABOUT"].map(item => (
            <a
              key={item}
              href="https://www.launchpathedu.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "#8899aa",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "#ffffff"}
              onMouseLeave={e => e.target.style.color = "#8899aa"}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "#8899aa", letterSpacing: "0.08em" }}>
          LaunchPath Transportation EDU<br />
          90-Day Compliance System
        </div>
      </div>
    </footer>
  );
}
