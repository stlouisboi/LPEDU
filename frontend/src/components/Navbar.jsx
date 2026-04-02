import { Link } from '../compat/Link';
import { usePathname } from 'next/navigation';
;
import { useState, useEffect, useRef } from "react";
import { List, X, LockSimple } from "@phosphor-icons/react";

/* One-time page-load initialization scan */
function InitScan() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const t = setTimeout(() => setVisible(false), 1900); return () => clearTimeout(t); }, []);
  return visible ? <div className="lp-init-scan" /> : null;
}

const FRAMEWORK_LINKS = [
  { label: "LaunchPath Standard", href: "/program" },
  { label: "Compliance Library", href: "/compliance-library" },
  { label: "Knowledge Center", href: "/knowledge-center" },
  { label: "Tools", href: "/tools" },
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
  const pathname = usePathname();

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
    return pathname === path || pathname.startsWith(path + "/");
  };

  const linkStyle = (href) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: isActive(href) ? "#FFFFFF" : "rgba(255,255,255,0.70)",
    textDecoration: "none",
    transition: "color 0.2s",
    letterSpacing: "0.01em",
    borderBottom: isActive(href) ? "1px solid #d4900a" : "1px solid transparent",
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
    fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 400,
    color: isActive(href) ? "#FFFFFF" : "rgba(255,255,255,0.68)",
    textDecoration: "none",
    borderLeft: isActive(href) ? "2px solid #d4900a" : "2px solid transparent",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  });

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(0,26,56,0.98)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(197,160,89,0.18)",
    }}>
      <InitScan />
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 1.5rem",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1.25rem",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
            alt="LaunchPath"
            width={193}
            height={38}
            style={{ height: 38, width: "auto" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0", flex: 1, justifyContent: "flex-end" }} className="desktop-nav">
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginRight: "0.875rem" }}>

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
                    display: "flex", alignItems: "center", gap: "0.25rem",
                    userSelect: "none",
                    color: (isActive(l.href) || openDropdown === l.label) ? "#FFFFFF" : "rgba(255,255,255,0.70)",
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
              ) : l.tooltip ? (
                <div key={l.label} style={{ position: "relative" }}
                  onMouseEnter={() => openMenu(l.label)}
                  onMouseLeave={closeMenu}
                >
                  <Link to={l.href}
                    style={linkStyle(l.href)}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? "#FFFFFF" : "rgba(255,255,255,0.70)")}
                  >
                    {l.label}
                  </Link>
                  {openDropdown === l.label && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                      background: "#0b1628",
                      border: "1px solid rgba(212,144,10,0.30)",
                      borderTop: "2px solid #d4900a",
                      padding: "0.625rem 0.875rem",
                      zIndex: 300,
                      whiteSpace: "nowrap",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
                    }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 600, color: "#d4900a", margin: 0, letterSpacing: "0.04em" }}>{l.tooltip}</p>
                      <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, background: "#0b1628", border: "1px solid rgba(212,144,10,0.30)", borderBottom: "none", borderRight: "none", transform: "translateX(-50%) rotate(45deg)" }} />
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.label} to={l.href}
                  style={linkStyle(l.href)}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? "#FFFFFF" : "rgba(255,255,255,0.70)")}
                >
                  {l.label}
                </Link>
              )
            ))}

          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.12)", marginRight: "0.625rem", flexShrink: 0 }} />

          {/* Zone 2: Access links */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {ACCESS_LINKS.map(l => (
              <Link key={l.label} to={l.href}
                style={linkStyle(l.href)}
                onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive(l.href) ? "#FFFFFF" : "rgba(255,255,255,0.70)")}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/ground-0-briefing"
              data-testid="nav-ground0-btn"
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.22)",
                padding: "0.35rem 0.625rem",
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
            >
              START FREE — GROUND 0
            </Link>
            <Link to="/portal"
              data-testid="nav-portal-btn"
              className="nav-desktop-portal"
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#d4900a",
                background: "transparent",
                border: "1px solid rgba(212,144,10,0.55)",
                padding: "0.35rem 0.625rem",
                textDecoration: "none", transition: "background 0.2s, border-color 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,144,10,0.10)"; e.currentTarget.style.borderColor = "#d4900a"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(212,144,10,0.55)"; }}
            >
              <LockSimple size={11} weight="bold" />
              Portal
            </Link>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button className="mobile-btn" data-testid="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
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
            fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.6)",
            marginBottom: "1rem",
          }}>FRAMEWORK</p>

          {FRAMEWORK_LINKS.map(l => (
            <div key={l.label}>
              <Link to={l.href} onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                  color: isActive(l.href) ? "#FFFFFF" : "var(--text-muted)",
                  textDecoration: "none", padding: "0.75rem 0",
                  borderBottom: l.subItems ? "none" : "1px solid rgba(255,255,255,0.06)",
                  display: "block",
                }}
              >{l.label}</Link>
              {l.subItems && l.subItems.map(sub => (
                <Link key={sub.href} to={sub.href} onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.857rem",
                    color: isActive(sub.href) ? "#d4900a" : "rgba(255,255,255,0.5)",
                    textDecoration: "none", padding: "0.5rem 0 0.5rem 1.25rem",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "block",
                  }}
                >— {sub.label}</Link>
              ))}
            </div>
          ))}

          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "1.25rem 0 1rem" }} />

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.6)",
            marginBottom: "1rem",
          }}>ACCESS</p>
          <Link to="/reach-diagnostic" onClick={() => setOpen(false)}
            data-testid="mobile-nav-reach-btn"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 600,
              color: "#d4900a", textDecoration: "none", padding: "0.75rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)", display: "block",
            }}
          >REACH Diagnostic</Link>
          {ACCESS_LINKS.map(l => (
            <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1rem",
                color: "var(--text-muted)", textDecoration: "none", padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >{l.label}</Link>
          ))}
          <Link to="/portal"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600,
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

      <style dangerouslySetInnerHTML={{__html: `
        .mobile-btn { display: none !important; }
        .nav-desktop-portal { display: flex !important; }
        @media (max-width: 1440px) { .nav-desktop-portal { display: none !important; } }
        @media (max-width: 1100px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}} />
    </header>
  );
}
