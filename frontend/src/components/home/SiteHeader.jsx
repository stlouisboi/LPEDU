import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '../../compat/Link';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_PRIMARY = [
  { label: 'Standard',    href: '/ground-0-briefing' },
  { label: 'Documents',   href: '/compliance-library' },
  { label: 'Diagnostic',  href: '/reach-diagnostic' },
  { label: 'Knowledge',   href: '/knowledge-center' },
  { label: 'Tools',       href: '/tools' },
  { label: 'Cases',       href: '/case-studies' },
];

const NAV_TOOLS = [
  { label: '16 Deadly Sins',    href: '/standards/16-deadly-sins' },
  { label: 'Audit Window',      href: '/tools' },
  { label: 'Tools Hub',         href: '/tools' },
  { label: 'About Vince',       href: '/about' },
];

const MONO = "'JetBrains Mono','Courier New',monospace";
const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BG   = '#FAF8F4';
const BORDER = 'rgba(28,43,58,0.10)';

export default function SiteHeader({ activePath = '/' }) {
  const [open, setOpen]         = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => activePath === href;

  return (
    <>
      <style suppressHydrationWarning>{`
        .lp-nav-link {
          font-family: ${MONO};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(28,43,58,0.52);
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 2px solid transparent;
          transition: color 0.18s, border-color 0.18s;
          white-space: nowrap;
        }
        .lp-nav-link:hover { color: ${NAVY}; border-color: ${GOLD}; }
        .lp-nav-link.active { color: ${NAVY}; border-color: ${NAVY}; }
        .lp-tools-trigger {
          font-family: ${MONO};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(28,43,58,0.52);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding-bottom: 3px;
          border-bottom: 2px solid transparent;
          transition: color 0.18s, border-color 0.18s;
        }
        .lp-tools-trigger:hover { color: ${NAVY}; border-bottom-color: ${GOLD}; }
        .lp-tools-open { color: ${NAVY}; border-bottom-color: ${NAVY}; }
        .lp-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: ${BG};
          border: 1px solid ${BORDER};
          border-top: 2px solid ${NAVY};
          box-shadow: 0 8px 32px rgba(28,43,58,0.12);
          min-width: 200px;
          z-index: 200;
          padding: 0.375rem 0;
        }
        .lp-dropdown-item {
          display: block;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(28,43,58,0.6);
          text-decoration: none;
          padding: 0.625rem 1.25rem;
          transition: background 0.12s, color 0.12s;
        }
        .lp-dropdown-item:hover { background: rgba(200,169,110,0.08); color: ${NAVY}; }
        .lp-btn-outline {
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${NAVY};
          border: 1px solid rgba(28,43,58,0.3);
          padding: 0.5rem 1.1rem;
          text-decoration: none;
          transition: border-color 0.18s, color 0.18s;
          white-space: nowrap;
        }
        .lp-btn-outline:hover { border-color: ${NAVY}; color: ${NAVY}; }
        .lp-btn-primary {
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: ${NAVY};
          color: ${BG};
          padding: 0.5rem 1.25rem;
          text-decoration: none;
          border: 1px solid ${NAVY};
          transition: background 0.18s, color 0.18s;
          white-space: nowrap;
        }
        .lp-btn-primary:hover { background: ${GOLD}; color: ${NAVY}; border-color: ${GOLD}; }
        @media (max-width: 1024px) {
          .lp-desktop-nav { display: none !important; }
          .lp-mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: BG,
        borderTop: `3px solid ${NAVY}`,
        borderBottom: `1px solid ${BORDER}`,
        height: 72,
        display: 'flex', alignItems: 'center',
        boxShadow: scrolled ? '0 2px 20px rgba(28,43,58,0.10)' : 'none',
        transition: 'box-shadow 0.25s',
      }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 1.75rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Image
              src="/launchpath-logo.png"
              alt="LaunchPath"
              width={152}
              height={44}
              style={{ objectFit: 'contain', objectPosition: 'left center', display: 'block' }}
              priority
            />
          </Link>

          {/* Separator */}
          <div style={{ width: 1, height: 28, background: BORDER, flexShrink: 0 }} className="lp-desktop-nav" />

          {/* Primary nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flex: 1 }} className="lp-desktop-nav">
            {NAV_PRIMARY.map(n => (
              <Link
                key={n.href}
                to={n.href}
                className={`lp-nav-link${isActive(n.href) ? ' active' : ''}`}
              >
                {n.label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div style={{ position: 'relative' }} onMouseLeave={() => setToolsOpen(false)}>
              <button
                className={`lp-tools-trigger${toolsOpen ? ' lp-tools-open' : ''}`}
                onMouseEnter={() => setToolsOpen(true)}
                onClick={() => setToolsOpen(v => !v)}
                aria-haspopup="true"
                aria-expanded={toolsOpen}
              >
                Tools
                <ChevronDown size={11} style={{ opacity: 0.6, transform: toolsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {toolsOpen && (
                <div className="lp-dropdown" role="menu">
                  {NAV_TOOLS.map(t => (
                    <Link
                      key={t.href}
                      to={t.href}
                      className="lp-dropdown-item"
                      onClick={() => setToolsOpen(false)}
                      role="menuitem"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right separator */}
          <div style={{ width: 1, height: 28, background: BORDER, flexShrink: 0 }} className="lp-desktop-nav" />

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', flexShrink: 0 }} className="lp-desktop-nav">
            <Link to="/portal" className="lp-btn-outline" data-testid="header-portal-btn">
              Portal
            </Link>
            <Link to="/ground-0-briefing" className="lp-btn-primary" data-testid="header-admission-btn">
              Request Admission
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: NAVY, padding: '0.25rem' }}
            className="lp-mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: 'fixed', top: 72, left: 0, right: 0, background: BG, borderBottom: `1px solid ${BORDER}`, zIndex: 49, padding: '1.5rem' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {NAV_PRIMARY.map(n => (
              <Link key={n.href} to={n.href} onClick={() => setOpen(false)} style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: NAVY, textDecoration: 'none' }}>
                {n.label}
              </Link>
            ))}
            <div style={{ height: 1, background: BORDER }} />
            {NAV_TOOLS.map(n => (
              <Link key={n.href} to={n.href} onClick={() => setOpen(false)} style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.55)', textDecoration: 'none' }}>
                {n.label}
              </Link>
            ))}
            <div style={{ height: 1, background: BORDER }} />
            <Link to="/portal" onClick={() => setOpen(false)} style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: NAVY, textDecoration: 'none' }}>
              Portal
            </Link>
            <Link to="/ground-0-briefing" onClick={() => setOpen(false)} style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: NAVY, color: BG, padding: '0.75rem 1rem', textDecoration: 'none', textAlign: 'center', marginTop: 4 }}>
              Request Admission
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
