import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { List, X, LockSimple } from "@phosphor-icons/react";

// Left zone: Framework pages (conceptual progression)
const FRAMEWORK_LINKS = [
  { label: "Knowledge Center", href: "/knowledge-center" },
  { label: "Standards", href: "/products" },
  { label: "AUTO Method", href: "/auto-method" },
  { label: "LaunchPath Standard", href: "/operating-standard" },
  { label: "REACH Assessment", href: "/reach-diagnostic" },
  { label: "Partners", href: "/partners" },
];

// Right zone: Access pages
const ACCESS_LINKS = [
  { label: "About", href: "/about" },
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
    whiteSpace: "nowrap",
  });

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(0,26,51,0.97)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--divider-dark)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 1.5rem",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1.5rem",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
            alt="LaunchPath"
            style={{ height: 28 }}
          />
        </Link>

        {/* Desktop nav — two zones */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0", flex: 1, justifyContent: "flex-end" }} className="desktop-nav">

          {/* Zone 1: Framework links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginRight: "2rem" }}>
            {FRAMEWORK_LINKS.map(l => (
              <Link key={l.label} to={l.href}
                style={linkStyle(l.href)}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? "var(--text)" : "var(--text-muted)")}
              >
                {l.label}
              </Link>
            ))}

            {/* Ground 0 — styled as gold entry CTA */}
            <Link
              to="/ground-0-briefing"
              data-testid="nav-ground0-btn"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.874rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: isActive("/ground-0-briefing") ? "#002244" : "#C5A059",
                background: isActive("/ground-0-briefing") ? "#C5A059" : "transparent",
                border: "1px solid rgba(197,160,89,0.5)",
                padding: "0.4rem 1rem",
                textDecoration: "none",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#C5A059";
                e.currentTarget.style.color = "#002244";
              }}
              onMouseLeave={e => {
                if (!isActive("/ground-0-briefing")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#C5A059";
                }
              }}
            >
              Ground 0
            </Link>
          </div>

          {/* Divider between zones */}
          <div style={{
            width: 1,
            height: 24,
            background: "rgba(255,255,255,0.12)",
            marginRight: "2rem",
            flexShrink: 0,
          }} />

          {/* Zone 2: Access links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {ACCESS_LINKS.map(l => (
              <Link key={l.label} to={l.href}
                style={linkStyle(l.href)}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? "var(--text)" : "var(--text-muted)")}
              >
                {l.label}
              </Link>
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
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(197,160,89,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <LockSimple size={12} weight="bold" />
              Operator Portal
            </Link>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button className="mobile-btn" data-testid="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: "0.25rem", flexShrink: 0 }}
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
          display: "flex", flexDirection: "column", gap: "0",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.6)",
            marginBottom: "1rem",
          }}>
            FRAMEWORK
          </p>
          {FRAMEWORK_LINKS.map(l => (
            <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.008rem",
                color: isActive(l.href) ? "#FFFFFF" : "var(--text-muted)",
                textDecoration: "none", padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/ground-0-briefing" onClick={() => setOpen(false)}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", fontWeight: 600,
              color: "#C5A059", textDecoration: "none", padding: "0.75rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            Ground 0
          </Link>

          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "1.25rem 0 1rem" }} />

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.6)",
            marginBottom: "1rem",
          }}>
            ACCESS
          </p>
          {ACCESS_LINKS.map(l => (
            <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.008rem",
                color: "var(--text-muted)", textDecoration: "none", padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/portal"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              fontFamily: "'Inter', sans-serif", fontSize: "0.874rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--gold-primary)", border: "1px solid var(--gold-primary)",
              padding: "0.875rem", textDecoration: "none", marginTop: "0.75rem",
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
        @media (max-width: 1100px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
