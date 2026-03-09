import { useState } from "react";

const STATUS_ITEMS = [
  { label: "SYSTEM_STATUS_MONITOR", value: null, color: "#8899aa" },
  { label: "AUTHORITY", value: "ACTIVE", color: "#4ade80" },
  { label: "REGISTRY", value: "SYNCED", color: "#4ade80" },
  { label: "INTEGRITY", value: "100%", color: "#4ade80" },
  { label: "UPLINK", value: "STABLE", color: "#4ade80" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {/* Status bar */}
      <div style={{
        background: "#060e1a",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0.35rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        overflowX: "auto",
        fontSize: "0.65rem",
      }}>
        {STATUS_ITEMS.map((item) => (
          <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", whiteSpace: "nowrap" }}>
            {item.value && (
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: item.color, display: "inline-block",
                boxShadow: `0 0 6px ${item.color}`,
              }} />
            )}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", color: "#8899aa" }}>
              {item.value ? `${item.label}: ` : item.label}
              {item.value && <span style={{ color: item.color }}>{item.value}</span>}
            </span>
          </span>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", color: "#8899aa", whiteSpace: "nowrap" }}>
          CFR_SYNC: 2026_V4.2
        </span>
      </div>

      {/* Main nav */}
      <nav style={{
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border)",
        padding: "0 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
            alt="LaunchPath"
            style={{ height: 32 }}
          />
        </a>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {["KNOWLEDGE CENTER", "AUTO DIAGNOSTIC", "GROUND 0 BRIEFING", "AUTO METHOD", "ABOUT"].map((item) => (
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
          <a
            href="https://www.launchpathedu.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              color: "#ffffff",
              textDecoration: "none",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "0.4rem 1rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "#ffffff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}
          >
            ENTER
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          data-testid="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#ffffff",
            padding: "0.4rem 0.6rem",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
        >
          &#9776;
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
          {["KNOWLEDGE CENTER", "AUTO DIAGNOSTIC", "GROUND 0 BRIEFING", "AUTO METHOD", "ABOUT"].map((item) => (
            <a
              key={item}
              href="https://www.launchpathedu.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "#8899aa",
                textDecoration: "none",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
