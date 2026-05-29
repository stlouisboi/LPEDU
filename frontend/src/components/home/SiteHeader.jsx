import { useState } from 'react';
import { Link } from '../../compat/Link';
import { Menu, X, Shield } from 'lucide-react';

const NAV = [
  { label: 'REACH Diagnostic', href: '/reach-diagnostic' },
  { label: '16 Sins', href: '/standards/16-deadly-sins' },
  { label: 'About Vince', href: '/about' },
  { label: 'Library', href: '/knowledge-center' },
  { label: 'Portal', href: '/portal' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' };

export default function SiteHeader({ activePath = '/' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#FAF8F4', borderBottom: '1px solid rgba(28,43,58,0.12)', height: 72, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, background: '#1C2B3A', border: '1px solid #8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 14, color: '#FAF8F4' }}>LP</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 14, color: '#1C2B3A', lineHeight: 1.1 }}>LAUNCHPATH</div>
              <div style={{ ...mono, fontSize: 8, color: '#6B7280' }}>Safety Standard</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="lp-desktop-nav">
            {NAV.map(n => (
              <Link key={n.href} to={n.href} style={{ ...mono, color: activePath === n.href ? '#1C2B3A' : '#6B7280', textDecoration: 'none', borderBottom: activePath === n.href ? '2px solid #8B7355' : '2px solid transparent', paddingBottom: 2 }}>{n.label}</Link>
            ))}
          </nav>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="lp-desktop-nav">
            <Link to="/portal" style={{ ...mono, color: '#1C2B3A', border: '1px solid rgba(28,43,58,0.25)', padding: '0.5rem 1rem', textDecoration: 'none', borderRadius: 0 }}>Verify Files</Link>
            <Link to="/ground-0-briefing" data-testid="header-admission-btn" style={{ ...mono, background: '#1C2B3A', color: '#FAF8F4', padding: '0.5rem 1.1rem', textDecoration: 'none', borderRadius: 0 }}>Request Admission</Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#1C2B3A' }} className="lp-mobile-menu-btn" aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: 'fixed', top: 72, left: 0, right: 0, background: '#FAF8F4', borderBottom: '1px solid rgba(28,43,58,0.15)', zIndex: 49, padding: '1.5rem' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {NAV.map(n => (
              <Link key={n.href} to={n.href} onClick={() => setOpen(false)} style={{ ...mono, fontSize: 12, color: '#1C2B3A', textDecoration: 'none' }}>{n.label}</Link>
            ))}
            <Link to="/ground-0-briefing" onClick={() => setOpen(false)} style={{ ...mono, background: '#1C2B3A', color: '#FAF8F4', padding: '0.75rem 1rem', textDecoration: 'none', textAlign: 'center', marginTop: 8 }}>Request Admission</Link>
          </nav>
        </div>
      )}

      <style>{`
        @media(max-width:768px){.lp-desktop-nav{display:none!important}.lp-mobile-menu-btn{display:flex!important}}
      `}</style>
    </>
  );
}
