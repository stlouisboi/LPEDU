import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Method", href: "https://www.launchpathedu.com/auto-method", external: true },
  { label: "Diagnostic", href: "https://www.launchpathedu.com/auto-diagnostic", external: true },
  { label: "Ground 0", href: "https://www.launchpathedu.com/ground-0-briefing", external: true },
  { label: "Knowledge", href: "/knowledge-center", external: false },
  { label: "About", href: "/about", external: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href) => location.pathname === href || location.pathname.startsWith(href + "/");

  const linkStyle = (href) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: isActive(href) ? "var(--text)" : "var(--text-muted)",
    textDecoration: "none",
    transition: "color 0.2s",
    letterSpacing: "0.01em",
    borderBottom: isActive(href) ? "1px solid var(--orange)" : "1px solid transparent",
    paddingBottom: "2px",
  });

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(2,4,8,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 1.5rem",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
            alt="LaunchPath"
            style={{ height: 28 }}
          />
        </Link>

        {/* Desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={linkStyle(l.href)}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = isActive(l.href) ? "var(--text)" : "var(--text-muted)"}
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.label} to={l.href}
                style={linkStyle(l.href)}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = isActive(l.href) ? "var(--text)" : "var(--text-muted)"}
              >
                {l.label}
              </Link>
            )
          ))}
          <a href="https://www.launchpathedu.com" target="_blank" rel="noopener noreferrer" data-testid="nav-enter-btn"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem", fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
              background: "var(--orange)",
              padding: "0.5rem 1.25rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
          >
            Portal
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button className="mobile-btn" data-testid="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: "0.25rem" }}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "var(--bg-2)",
          borderTop: "1px solid var(--border)",
          padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "1.25rem",
        }}>
          {NAV_LINKS.map(l => (
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", textDecoration: "none" }}
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.label} to={l.href}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            )
          ))}
          <a href="https://www.launchpathedu.com" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#fff", background: "var(--orange)",
              padding: "0.75rem 1.25rem", textDecoration: "none",
              textAlign: "center",
            }}
          >
            Portal
          </a>
        </div>
      )}

      <style>{`
        .mobile-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
