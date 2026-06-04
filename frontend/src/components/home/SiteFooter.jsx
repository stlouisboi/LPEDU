import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '../../compat/Link';
import KCArticleReachCTA from '../KCArticleReachCTA';

const mono = { fontFamily: 'JetBrains Mono, monospace' };

const NAV_COLS = [
  {
    label: 'PLATFORM',
    links: [
      { label: 'LaunchPath Standard', href: '/program' },
      { label: 'REACH Diagnostic', href: '/reach-diagnostic' },
      { label: 'Compliance Library', href: '/compliance-library' },
      { label: 'Portal', href: '/portal' },
    ],
  },
  {
    label: 'RESOURCES',
    links: [
      { label: 'Knowledge Center', href: '/knowledge-center' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Tools', href: '/tools' },
    ],
  },
  {
    label: 'STANDARDS',
    links: [
      { label: '16 Deadly Sins', href: '/standards/16-deadly-sins' },
      { label: 'AUTO Method', href: '/standards/auto-method' },
      { label: 'Doctrine', href: '/doctrine' },
    ],
  },
  {
    label: 'COMPANY',
    links: [
      { label: 'About Vince', href: '/about' },
      { label: 'Partners', href: '/partners', highlight: true },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'AUTHORITY',
    external: true,
    links: [
      { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov' },
      { label: '49 CFR (ecfr.gov)', href: 'https://www.ecfr.gov/current/title-49' },
      { label: 'FMCSA Clearinghouse', href: 'https://clearinghouse.fmcsa.dot.gov' },
    ],
  },
];

export default function SiteFooter() {
  const [isKCArticle, setIsKCArticle] = useState(false);
  const [currentDate, setCurrentDate] = useState('2026');

  useEffect(() => {
    const p = window.location.pathname;
    setIsKCArticle(p.startsWith('/knowledge-center/') && p !== '/knowledge-center');
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const d = new Date();
    setCurrentDate(`${months[d.getMonth()]} ${d.getFullYear()}`);
  }, []);

  const linkBase = {
    ...mono,
    fontSize: 11,
    letterSpacing: '0.08em',
    color: 'rgba(250,248,244,0.60)',
    textDecoration: 'none',
    display: 'block',
    lineHeight: 1,
  };

  const linkHighlight = {
    ...mono,
    fontSize: 11,
    letterSpacing: '0.1em',
    color: '#C8A96E',
    textDecoration: 'none',
    display: 'block',
    lineHeight: 1,
    fontWeight: 700,
  };

  return (
    <>
      {isKCArticle && <KCArticleReachCTA />}
      <footer data-testid="site-footer" style={{ background: '#1C2B3A', borderTop: '1px solid rgba(200,169,110,0.15)' }}>

        {/* ── Layer 1: Brand Row ── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} className="lp-footer-brand-row">
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '0.75rem', textDecoration: 'none' }}>
              <Image
                src="/launchpath-logo-white.png"
                alt="LaunchPath"
                width={140}
                height={21}
                style={{ objectFit: 'contain', objectPosition: 'left center', display: 'block', opacity: 0.85 }}
              />
            </Link>
            <p style={{ ...mono, fontSize: 11, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.55)', lineHeight: 1.8, maxWidth: 280 }}>
              Accuracy Over Hype. Systems Over Shortcuts.
            </p>
          </div>
          <Link
            to="/reach-diagnostic"
            data-testid="footer-admission-cta"
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1C2B3A',
              background: '#C8A96E',
              padding: '0.6rem 1.1rem',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: 700,
              marginTop: '0.25rem',
              flexShrink: 0,
            }}
          >
            Request Admission →
          </Link>
        </div>

        {/* ── Layer 2: Navigation Row ── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 2rem 2.25rem' }}>
          <div style={{ borderTop: '1px solid rgba(200,169,110,0.12)', paddingTop: '2rem' }}>
            <nav aria-label="Footer navigation" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }} className="lp-footer-nav-grid">
              {NAV_COLS.map(col => (
                <div key={col.label}>
                  <p style={{
                    ...mono,
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#C8A96E',
                    marginBottom: '1rem',
                    fontWeight: 700,
                  }}>
                    {col.label}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {col.links.map(link =>
                      col.external ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={linkBase}
                          onMouseEnter={e => (e.currentTarget.style.color = '#C8A96E')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,248,244,0.60)')}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          to={link.href}
                          style={link.highlight ? linkHighlight : linkBase}
                        >
                          {link.highlight ? `→ ${link.label}` : link.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Layer 3: Legal & Utility Row ── */}
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.10)', background: 'rgba(0,0,0,0.2)' }}>
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '1.1rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.6rem',
            }}
            className="lp-footer-legal-row"
          >
            {/* Left: Legal */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <Link to="/privacy-policy" style={{ ...mono, fontSize: 10, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.40)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={{ ...mono, fontSize: 10, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.40)', textDecoration: 'none' }}>Terms of Service</Link>
            </div>
            {/* Center: Copyright */}
            <p style={{ ...mono, fontSize: 10, letterSpacing: '0.06em', color: 'rgba(250,248,244,0.35)', textAlign: 'center' }}>
              © 2026 LaunchPath Transportation EDU LLC. All rights reserved.
            </p>
            {/* Right: Utility */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/verify" style={{ ...mono, fontSize: 10, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.40)', textDecoration: 'none' }}>Verify</Link>
              <a href="tel:3363298899" style={{ ...mono, fontSize: 10, letterSpacing: '0.06em', color: 'rgba(250,248,244,0.35)', textDecoration: 'none' }}>(336) 329-8899</a>
              <a href="mailto:vince@launchpathedu.com" style={{ ...mono, fontSize: 10, letterSpacing: '0.06em', color: 'rgba(250,248,244,0.35)', textDecoration: 'none' }}>vince@launchpathedu.com</a>
            </div>
          </div>
          {/* Disclaimer */}
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem 1.25rem' }}>
            <p style={{ ...mono, fontSize: 9.5, letterSpacing: '0.04em', color: 'rgba(250,248,244,0.28)', lineHeight: 1.75 }}>
              LaunchPath is an educational program. Content does not constitute legal, tax, financial, or compliance advice. Verify all information with appropriate professionals and regulatory agencies before making business decisions. Current as of {currentDate}. Verified against ecfr.gov.
            </p>
          </div>
        </div>

      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 960px) {
          .lp-footer-nav-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .lp-footer-nav-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
          .lp-footer-brand-row { flex-direction: column !important; gap: 1.25rem !important; }
          .lp-footer-legal-row { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 380px) {
          .lp-footer-nav-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </>
  );
}
