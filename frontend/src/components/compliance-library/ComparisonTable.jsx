import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BG = '#FAF8F4';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

const CHECK = <span style={{ color: '#166534', fontWeight: 700 }}>✓</span>;
const DASH  = <span style={{ color: 'rgba(28,43,58,0.3)' }}>—</span>;

const ROWS = [
  { label: 'Domain compliance packets',          indiv: '1 per purchase', lib: 'All 8 components',  bundle: 'All 5',       standard: 'All 5' },
  { label: 'Folder architecture / structure',    indiv: DASH,             lib: DASH,               bundle: CHECK,         standard: CHECK },
  { label: '0–30–60–90 Implementation calendar', indiv: DASH,             lib: DASH,               bundle: CHECK,         standard: CHECK },
  { label: 'Master compliance checklist',        indiv: DASH,             lib: DASH,               bundle: CHECK,         standard: CHECK },
  { label: 'Video curriculum (17+ hrs)',         indiv: DASH,             lib: DASH,               bundle: DASH,          standard: CHECK },
  { label: 'Verification checkpoints (×5)',      indiv: DASH,             lib: DASH,               bundle: DASH,          standard: CHECK },
  { label: 'Direct Q&A access (90-day window)',  indiv: DASH,             lib: DASH,               bundle: DASH,          standard: CHECK },
  { label: 'Audit-readiness confirmation',       indiv: DASH,             lib: DASH,               bundle: DASH,          standard: CHECK },
  { label: 'Entry requirement',                  indiv: 'None',           lib: 'None',             bundle: 'None',        standard: 'Ground 0 required' },
  { label: 'Price',                              indiv: '$59–$169 each',  lib: '$699',             bundle: '$499',        standard: 'Disclosed at Ground 0', priceRow: true },
];

const COL_HEADERS = [
  { title: 'INDIVIDUAL PACKETS',       sub: '',       recommended: false },
  { title: 'COMPLETE LIBRARY',          sub: '$699',   recommended: false },
  { title: 'DOCUMENT SYSTEM BUNDLE',    sub: '$499',   recommended: true  },
  { title: 'LAUNCHPATH STANDARD',       sub: '',       recommended: false },
];

export default function ComparisonTable({ onBuyBundle, bundleLoading }) {
  const isLoading = bundleLoading === 'loading';

  return (
    <section data-testid="cl-comparison-table" style={{ background: BG, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: 'clamp(3rem,6vw,5rem) 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: '2rem', fontWeight: 700 }}>
          LP-DOC-002 · HOW THE FOUR PATHS COMPARE
        </p>

        {/* Desktop table */}
        <div className="cl-comparison-desktop" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${BORDER}` }}>
            <thead>
              <tr style={{ background: NAVY }}>
                <th style={{ padding: '1rem', textAlign: 'left', width: '30%', borderRight: `1px solid rgba(250,248,244,0.1)` }} />
                {COL_HEADERS.map((col, ci) => (
                  <th key={ci} style={{ padding: '1rem', textAlign: 'center', borderRight: ci < 3 ? `1px solid rgba(250,248,244,0.1)` : 'none', background: col.recommended ? 'rgba(139,115,85,0.15)' : undefined, borderTop: col.recommended ? `2px solid ${GOLD}` : undefined, position: 'relative' }}>
                    {col.recommended && (
                      <span style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', background: GOLD, color: '#FAF8F4', padding: '0.15rem 0.5rem', display: 'inline-block', marginBottom: '0.375rem' }}>RECOMMENDED</span>
                    )}
                    <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FAF8F4', display: 'block' }}>{col.title}</div>
                    {col.sub && <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '1.1rem', color: GOLD, marginTop: '0.2rem' }}>{col.sub}</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid ${BORDER}`, background: ri % 2 === 0 ? BG : CARD }}>
                  <td style={{ padding: '0.875rem 1rem', fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(28,43,58,0.88)', borderRight: `1px solid ${BORDER}`, fontWeight: row.priceRow ? 700 : 400 }}>{row.label}</td>
                  {[row.indiv, row.lib, row.bundle, row.standard].map((val, ci) => (
                    <td key={ci} style={{ padding: '0.875rem 1rem', textAlign: 'center', fontFamily: SANS, fontSize: '0.875rem', borderRight: ci < 3 ? `1px solid ${BORDER}` : 'none', background: ci === 2 ? 'rgba(139,115,85,0.04)' : undefined, fontWeight: (row.priceRow && ci === 2) ? 700 : 400, color: row.priceRow ? (ci === 2 ? NAVY : 'rgba(28,43,58,0.82)') : 'rgba(28,43,58,0.85)' }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: `1px solid ${BORDER}` }}>
                <td style={{ padding: '1.25rem 1rem' }} />
                <td style={{ padding: '1.25rem 1rem', textAlign: 'center', borderRight: `1px solid ${BORDER}` }}>
                  <a href="#component-library" style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.45)', textDecoration: 'underline' }}>Browse domains →</a>
                </td>
                <td style={{ padding: '1.25rem 1rem', textAlign: 'center', borderRight: `1px solid ${BORDER}` }}>
                  <Link href="/products/library" data-testid="compare-library-link" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: NAVY, border: `1px solid ${BORDER}`, padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-block', borderRadius: 0 }}>
                    VIEW THE LIBRARY →
                  </Link>
                </td>
                <td style={{ padding: '1.25rem 1rem', textAlign: 'center', background: 'rgba(139,115,85,0.04)', borderRight: `1px solid ${BORDER}` }}>
                  <button
                    data-testid="compare-bundle-buy-btn"
                    onClick={onBuyBundle}
                    disabled={isLoading}
                    style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', border: 'none', padding: '0.5rem 1.25rem', cursor: isLoading ? 'wait' : 'pointer', borderRadius: 0 }}>
                    {isLoading ? '...' : 'INSTALL THE BUNDLE →'}
                  </button>
                </td>
                <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                  <Link href="/ground-0-briefing" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: NAVY, border: `1px solid ${BORDER}`, padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-block', borderRadius: 0 }}>
                    BEGIN GROUND 0 →
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="cl-comparison-mobile" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
          {[
            { title: 'INDIVIDUAL PACKETS', vals: ['1 per purchase', DASH, DASH, DASH, DASH, DASH, DASH, DASH, 'None', '$59–$169 each'], cta: null, recommended: false },
            { title: 'COMPLETE LIBRARY',   vals: ['All 8 components', DASH, DASH, DASH, DASH, DASH, DASH, DASH, 'None', '$699'], cta: { label: 'VIEW THE LIBRARY →', href: '/products/library', isLink: true }, recommended: false },
            { title: 'DOCUMENT SYSTEM BUNDLE', vals: ['All 5', CHECK, CHECK, CHECK, DASH, DASH, DASH, DASH, 'None', '$499'], cta: { label: isLoading ? '...' : 'INSTALL THE BUNDLE →', onClick: onBuyBundle }, recommended: true },
            { title: 'LAUNCHPATH STANDARD', vals: ['All 5', CHECK, CHECK, CHECK, CHECK, CHECK, CHECK, CHECK, 'Ground 0 required', 'Disclosed at Ground 0'], cta: { label: 'BEGIN GROUND 0 →', href: '/ground-0-briefing', isLink: true }, recommended: false },
          ].map((col, ci) => (
            <div key={ci} style={{ border: col.recommended ? `2px solid ${GOLD}` : `1px solid ${BORDER}`, background: col.recommended ? 'rgba(139,115,85,0.03)' : BG }}>
              <div style={{ background: col.recommended ? GOLD : NAVY, padding: '0.75rem 1rem' }}>
                {col.recommended && <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', color: NAVY, marginBottom: '0.2rem' }}>RECOMMENDED</div>}
                <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: col.recommended ? NAVY : '#FAF8F4' }}>{col.title}</span>
              </div>
              <div style={{ padding: '1rem' }}>
                {ROWS.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: ri < ROWS.length - 1 ? `1px solid ${BORDER}` : 'none', gap: '0.5rem' }}>
                    <span style={{ fontFamily: SANS, fontSize: '0.8rem', color: 'rgba(28,43,58,0.82)', lineHeight: 1.4 }}>{row.label}</span>
                    <span style={{ fontFamily: MONO, fontSize: '0.8rem', color: NAVY, fontWeight: 600, textAlign: 'right', flexShrink: 0 }}>{col.vals[ri]}</span>
                  </div>
                ))}
                {col.cta && (
                  <div style={{ marginTop: '1rem' }}>
                    {col.cta.isLink ? (
                      <Link href={col.cta.href} style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', padding: '0.75rem 1rem', textDecoration: 'none', display: 'block', textAlign: 'center', borderRadius: 0 }}>{col.cta.label}</Link>
                    ) : (
                      <button onClick={col.cta.onClick} disabled={isLoading} style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer', display: 'block', width: '100%', textAlign: 'center', borderRadius: 0 }}>{col.cta.label}</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.cl-comparison-desktop{display:none!important}.cl-comparison-mobile{display:flex!important}}`}</style>
    </section>
  );
}
