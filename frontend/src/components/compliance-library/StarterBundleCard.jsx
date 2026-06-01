import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BG = '#FAF8F4';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

export default function StarterBundleCard({ onBuy, loading, error }) {
  const isLoading = loading === 'loading';

  return (
    <section data-testid="cl-starter-bundle" style={{ background: BG, borderBottom: `1px solid ${BORDER}`, padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
          <div style={{ borderBottom: `1px solid rgba(255,255,255,0.1)`, overflow: 'hidden' }}>
            <img
              src="/images/products/starter-stack.webp"
              alt="LaunchPath Starter Stack"
              style={{ width: '100%', height: 240, objectFit: 'contain', display: 'block', background: '#1C2B3A' }}
            />
          </div>
          <div style={{ padding: '2.25rem' }}>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.625rem', fontWeight: 700 }}>
            STARTER BUNDLE — ENTRY POINT
          </p>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.25rem,2.5vw,1.75rem)', color: NAVY, letterSpacing: '-0.015em', marginBottom: '0.625rem' }}>
            LaunchPath Starter Stack
          </h3>
          <p style={{ fontFamily: SANS, fontSize: '1rem', color: 'rgba(28,43,58,0.82)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            The three foundational diagnostic and prep tools — bundled at a third below individual acquisition cost.
          </p>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(28,43,58,0.4)', marginBottom: '1.25rem' }}>
            $357 individual value. Save 39%. Not a substitute for the LaunchPath Standard.
          </p>
          <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '2.5rem', color: NAVY, lineHeight: 1, marginBottom: '1.5rem' }}>$219</div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href="/products/starter-stack"
              data-testid="cl-starter-details-link"
              style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: NAVY, border: `1px solid ${BORDER}`, padding: '0.875rem 1.5rem', textDecoration: 'none', borderRadius: 0 }}>
              What's Inside →
            </Link>
            <button
              data-testid="cl-starter-buy-btn"
              onClick={onBuy}
              disabled={isLoading}
              style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', border: 'none', padding: '0.875rem 1.5rem', cursor: isLoading ? 'wait' : 'pointer', borderRadius: 0, opacity: isLoading ? 0.6 : 1 }}>
              {isLoading ? 'PROCESSING...' : 'GET THE STACK — $219 →'}
            </button>
          </div>
          {error && <p style={{ fontFamily: MONO, fontSize: 9, color: '#ef4444', marginTop: '0.5rem' }}>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
