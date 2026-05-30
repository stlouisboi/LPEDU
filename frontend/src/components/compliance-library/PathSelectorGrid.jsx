import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BG = '#FAF8F4';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

export default function PathSelectorGrid({ onBuyBundle, bundleLoading }) {
  const PATHS = [
    {
      id: 1,
      situation: 'Just activated authority, unsure of your compliance exposure.',
      label: null,
      cta: 'TAKE THE REACH DIAGNOSTIC — FREE →',
      ctaStyle: 'outlined',
      href: '/reach-diagnostic',
      testid: 'path-reach-cta',
    },
    {
      id: 2,
      situation: 'Know your gaps. Confident in self-installation.',
      label: 'RECOMMENDED FOR MOST CARRIERS',
      cta: bundleLoading === 'loading' ? 'PROCESSING...' : 'DOCUMENT SYSTEM BUNDLE — $499 →',
      ctaStyle: 'filled',
      onClick: onBuyBundle,
      testid: 'path-bundle-cta',
      recommended: true,
    },
    {
      id: 3,
      situation: 'Want every audit domain covered in one pass.',
      label: null,
      cta: 'VIEW THE COMPLETE LIBRARY — $699 →',
      ctaStyle: 'outlined',
      href: '/products/library',
      testid: 'path-library-cta',
    },
    {
      id: 4,
      situation: 'Want it built, verified, and confirmed audit-ready.',
      sublabel: 'ADMISSION-GATED · BEGINS AT GROUND 0',
      cta: 'REQUEST GROUND 0 BRIEFING →',
      ctaStyle: 'dark',
      href: '/ground-0-briefing',
      testid: 'path-ground0-cta',
    },
  ];

  return (
    <section data-testid="cl-path-selector" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, textAlign: 'center', marginBottom: '1.5rem' }}>
          NOT SURE WHICH PATH FITS YOUR OPERATION?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', border: `1px solid ${BORDER}` }} className="cl-path-grid">
          {PATHS.map((path) => (
            <div
              key={path.id}
              style={{
                padding: '1.75rem',
                borderRight: path.id % 2 !== 0 ? `1px solid ${BORDER}` : 'none',
                borderBottom: path.id <= 2 ? `1px solid ${BORDER}` : 'none',
                background: path.recommended ? 'rgba(139,115,85,0.04)' : BG,
                position: 'relative',
              }}>
              {path.recommended && (
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', background: GOLD, color: '#FAF8F4', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                  RECOMMENDED FOR MOST CARRIERS
                </span>
              )}
              {path.label && !path.recommended && (
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', background: GOLD, color: '#FAF8F4', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                  {path.label}
                </span>
              )}
              <p style={{ fontFamily: SANS, fontSize: '1rem', color: 'rgba(28,43,58,0.85)', lineHeight: 1.65, marginBottom: path.sublabel ? '0.5rem' : '1.25rem' }}>
                {path.situation}
              </p>
              {path.sublabel && (
                <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.25rem' }}>
                  {path.sublabel}
                </p>
              )}
              {path.onClick ? (
                <button
                  data-testid={path.testid}
                  onClick={path.onClick}
                  disabled={bundleLoading === 'loading'}
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', border: 'none', padding: '0.875rem 1.5rem', cursor: bundleLoading === 'loading' ? 'wait' : 'pointer', display: 'block', width: '100%', textAlign: 'center', borderRadius: 0, opacity: bundleLoading === 'loading' ? 0.6 : 1 }}>
                  {path.cta}
                </button>
              ) : (
                <Link
                  href={path.href}
                  data-testid={path.testid}
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: path.ctaStyle === 'dark' ? NAVY : 'transparent', color: path.ctaStyle === 'dark' ? '#FAF8F4' : NAVY, border: `1px solid ${path.ctaStyle === 'dark' ? NAVY : BORDER}`, padding: '0.875rem 1.5rem', textDecoration: 'none', display: 'block', textAlign: 'center', borderRadius: 0, transition: 'background 0.15s, color 0.15s' }}>
                  {path.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.cl-path-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
