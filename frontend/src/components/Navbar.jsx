import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { List, X, LockSimple, CaretDown } from "@phosphor-icons/react";

const FRAMEWORK_LINKS = [
  { label: "Operational Library", href: "/knowledge-center" },
  { label: "AUTO Method", href: "/auto-method" },
  {
    label: "Standards",
    href: "/standards",
    subItems: [
      { label: "Audit Domains", href: "/standards#audit-domains" },
      { label: "16 Deadly Sins", href: "/standards/16-deadly-sins" },
      { label: "Compliance System", href: "/standards" },
    ],
  },
  { label: "Compliance Library", href: "/compliance-library" },
  { label: "LaunchPath Standard", href: "/launchpath-standard" },
];

const GROUND0_SUB = [
  { label: "Enter Ground 0", href: "/ground-0-briefing" },
];

const ACCESS_LINKS = [
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);

  const openMenu = (name) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  };
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

  const isActive = (href) => {
    if (!href || href.startsWith("http")) return false;
    const path = href.split("#")[0];
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

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

  const dropdownPanel = {
    position: "absolute", top: "calc(100% + 4px)", left: 0,
    background: "#0b1628",
    border: "1px solid rgba(212,144,10,0.15)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
    minWidth: 200, zIndex: 300,
    padding: "0.375rem 0",
  };

  const dropdownItem = (href) => ({
    display: "block", padding: "0.6rem 1.1rem",
    fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 400,
    color: isActive(href) ? "#FFFFFF" : "rgba(255,255,255,0.68)",
    textDecoration: "none",
    borderLeft: isActive(href) ? "2px solid #d4900a" : "2px solid transparent",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  });

  const ground0Active = isActive("/ground-0-briefing");

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

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0", flex: 1, justifyContent: "flex-end" }} className="desktop-nav">
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginRight: "2rem" }}>

            {/* Framework links */}
            {FRAMEWORK_LINKS.map(l => (
              l.subItems ? (
                <div key={l.label} style={{ position: "relative" }}
                  onMouseEnter={() => openMenu(l.label)}
                  onMouseLeave={closeMenu}
                >
                  <span style={{
                    ...linkStyle(l.href),
                    cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    userSelect: "none",
                    color: (isActive(l.href) || openDropdown === l.label) ? "var(--text)" : "var(--text-muted)",
                  }}>
                    {l.label}
                    <CaretDown size={10} style={{ opacity: 0.6 }} />
                  </span>
                  {openDropdown === l.label && (
                    <div style={dropdownPanel}
                      onMouseEnter={() => openMenu(l.label)}
                      onMouseLeave={closeMenu}
                    >
                      {l.subItems.map(sub => (
                        <Link key={sub.href} to={sub.href}
                          style={dropdownItem(sub.href)}
                          onMouseEnter={e => { e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderLeftColor = "#d4900a"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = isActive(sub.href) ? "#FFFFFF" : "rgba(255,255,255,0.68)"; e.currentTarget.style.borderLeftColor = isActive(sub.href) ? "#d4900a" : "transparent"; }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.label} to={l.href}
                  style={linkStyle(l.href)}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? "var(--text)" : "var(--text-muted)")}
                >
                  {l.label}
                </Link>
              )
            ))}

            {/* Ground 0 — gold CTA with dropdown */}
            <div style={{ position: "relative" }}
              onMouseEnter={() => openMenu("Ground 0")}
              onMouseLeave={closeMenu}
            >
              <Link
                to="/ground-0-briefing"
                data-testid="nav-ground0-btn"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.874rem", fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: ground0Active ? "#0b1628" : "#0b1628",
                  background: ground0Active ? "#d4900a" : "#d4900a",
                  border: "1px solid #d4900a",
                  padding: "0.4rem 1rem",
                  textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: "0.3rem",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                Ground 0
                <CaretDown size={10} style={{ opacity: 0.7 }} />
              </Link>
              {openDropdown === "Ground 0" && (
                <div style={{ ...dropdownPanel, left: "50%", transform: "translateX(-50%)" }}
                  onMouseEnter={() => openMenu("Ground 0")}
                  onMouseLeave={closeMenu}
                >
                  {GROUND0_SUB.map(sub => (
                    <Link key={sub.href} to={sub.href}
                      style={dropdownItem(sub.href)}
                      onMouseEnter={e => { e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderLeftColor = "#d4900a"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = isActive(sub.href) ? "#FFFFFF" : "rgba(255,255,255,0.68)"; e.currentTarget.style.borderLeftColor = isActive(sub.href) ? "#d4900a" : "transparent"; }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.12)", marginRight: "2rem", flexShrink: 0 }} />

          {/* Zone 2: Access links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {/* REACH Diagnostic — standalone prominent link */}
            <Link to="/reach-diagnostic"
              data-testid="nav-reach-btn"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.874rem", fontWeight: 600,
                letterSpacing: "0.04em",
                color: isActive("/reach-diagnostic") ? "#d4900a" : "rgba(212,144,10,0.80)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                borderBottom: isActive("/reach-diagnostic") ? "1px solid #d4900a" : "1px solid transparent",
                paddingBottom: "2px",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#d4900a"; }}
              onMouseLeave={e => { e.currentTarget.style.color = isActive("/reach-diagnostic") ? "#d4900a" : "rgba(212,144,10,0.80)"; }}
            >
              REACH Diagnostic
            </Link>
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
                textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,144,10,0.1)")}
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
        height: "2px", width: `${scrollPct}%`,
        background: "linear-gradient(90deg, var(--gold-primary), var(--gold-light))",
        transition: "width 0.08s linear", zIndex: 2,
      }} />

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#000F1F", borderTop: "1px solid var(--divider-dark)",
          padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.6)",
            marginBottom: "1rem",
          }}>FRAMEWORK</p>

          {FRAMEWORK_LINKS.map(l => (
            <div key={l.label}>
              <Link to={l.href} onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1.008rem",
                  color: isActive(l.href) ? "#FFFFFF" : "var(--text-muted)",
                  textDecoration: "none", padding: "0.75rem 0",
                  borderBottom: l.subItems ? "none" : "1px solid rgba(255,255,255,0.06)",
                  display: "block",
                }}
              >{l.label}</Link>
              {l.subItems && l.subItems.map(sub => (
                <Link key={sub.href} to={sub.href} onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.88rem",
                    color: isActive(sub.href) ? "#d4900a" : "rgba(255,255,255,0.5)",
                    textDecoration: "none", padding: "0.5rem 0 0.5rem 1.25rem",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "block",
                  }}
                >— {sub.label}</Link>
              ))}
            </div>
          ))}

          <Link to="/ground-0-briefing" onClick={() => setOpen(false)}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", fontWeight: 600,
              color: "#d4900a", textDecoration: "none", padding: "0.75rem 0",
              borderBottom: "none",
            }}
          >Ground 0</Link>
          {GROUND0_SUB.map(sub => (
            <Link key={sub.href} to={sub.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.88rem",
                color: isActive(sub.href) ? "#d4900a" : "rgba(255,255,255,0.5)",
                textDecoration: "none", padding: "0.5rem 0 0.5rem 1.25rem",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "block",
              }}
            >— {sub.label}</Link>
          ))}

          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "1.25rem 0 1rem" }} />

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.6)",
            marginBottom: "1rem",
          }}>ACCESS</p>
          <Link to="/reach-diagnostic" onClick={() => setOpen(false)}
            data-testid="mobile-nav-reach-btn"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.008rem", fontWeight: 600,
              color: "#d4900a", textDecoration: "none", padding: "0.75rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)", display: "block",
            }}
          >REACH Diagnostic</Link>
          {ACCESS_LINKS.map(l => (
            <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.008rem",
                color: "var(--text-muted)", textDecoration: "none", padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >{l.label}</Link>
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
