import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { List, X, LockSimple } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Knowledge Center", href: "/knowledge-center", external: false },
  { label: "AUTO Method", href: "/auto-method", external: false },
  { label: "REACH Assessment", href: "/reach-assessment", external: false },
  { label: "Ground 0", href: "/ground-0-briefing", external: false },
  { label: "About", href: "/about", external: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollPct((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => !href.startsWith("http") && (location.pathname === href || location.pathname.startsWith(href + "/"));

  const linkStyle = (href) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.98rem",
    fontWeight: 500,
    color: isActive(href) ? "var(--text)" : "var(--text-muted)",
    textDecoration: "none",
    transition: "color 0.2s",
    letterSpacing: "0.01em",
    borderBottom: isActive(href) ? "1px solid var(--gold-primary)" : "1px solid transparent",
    paddingBottom: "2px",
  });

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(0,26,51,0.97)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--divider-dark)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 1.5rem",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
            alt="LaunchPath"
            style={{ height: 28 }}
          />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={linkStyle(l.href)}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = isActive(l.href) ? "var(--text)" : "var(--text-muted)"}
              >{l.label}</a>
            ) : (
              <Link key={l.label} to={l.href}
                style={linkStyle(l.href)}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = isActive(l.href) ? "var(--text)" : "var(--text-muted)"}
              >{l.label}</Link>
            )
          ))}

          <Link to="/portal"
            data-testid="nav-portal-btn"
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "'Inter', sans-serif", fontSize: "0.874rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--gold-primary)",
              background: "transparent",
              border: "1px solid var(--gold-primary)",
              padding: "0.45rem 1rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(197,160,89,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <LockSimple size={12} weight="bold" />
            Operator Portal
          </Link>
        </nav>

        <button className="mobile-btn" data-testid="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: "0.25rem" }}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Scroll progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: "2px",
        width: `${scrollPct}%`,
        background: "linear-gradient(90deg, var(--gold-primary), var(--gold-light))",
        transition: "width 0.08s linear",
        zIndex: 2,
      }} />

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#000F1F",
          borderTop: "1px solid var(--divider-dark)",
          padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "1.25rem",
        }}>
          {NAV_LINKS.map(l => (
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", textDecoration: "none" }}
              >{l.label}</a>
            ) : (
              <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", color: "var(--text-muted)", textDecoration: "none" }}
              >{l.label}</Link>
            )
          ))}
          <Link to="/portal"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              fontFamily: "'Inter', sans-serif", fontSize: "0.874rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--gold-primary)", border: "1px solid var(--gold-primary)",
              padding: "0.75rem", textDecoration: "none",
            }}
            onClick={() => setOpen(false)}
          >
            <LockSimple size={12} weight="bold" />
            Operator Portal
          </Link>
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
