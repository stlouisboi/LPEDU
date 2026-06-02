import Image from 'next/image';
import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BG = '#FAF8F4';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

const INCLUDES = [
  'New Entrant Compliance Packet',
  'Drug & Alcohol Compliance Packet',
  'HOS & Dispatch Compliance Packet',
  'Maintenance & Unit File Packet',
  'Insurance & Authority Packet',
  'Unified Folder Architecture',
  '0–30–60–90 Day Implementation Calendar',
  'Master Compliance Checklist',
];

export default function FeaturedProductCard({ onBuy, loading, error }) {
  const isLoading = loading === 'loading';

  return (
    <section id="bundle" data-testid="cl-featured-bundle" style={{ background: BG, borderTop: `2px solid ${GOLD}`, borderBottom: `1px solid ${BORDER}` }}>
      {/* Badge strip */}
      <div style={{ background: GOLD, padding: '0.5rem 1.5rem', textAlign: 'center' }}>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FAF8F4', fontWeight: 700 }}>
          RECOMMENDED FOR MOST CARRIERS · LP-BDL-001 · SELF-INSTALLATION
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4rem', alignItems: 'start' }} className="cl-bundle-grid">

          {/* Left */}
          <div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', color: NAVY, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Document System Bundle
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(28,43,58,0.82)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              The complete document system. You install it yourself. Every compliance domain required for the new entrant audit — filed, organized, and structured with a 0–30–60–90 implementation calendar.
            </p>

            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.875rem', fontWeight: 700 }}>
              WHAT'S INCLUDED
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.5rem' }} className="cl-checklist-grid">
              {INCLUDES.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.85)', lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, padding: '2rem' }}>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '3.5rem', color: NAVY, lineHeight: 1, marginBottom: '0.25rem' }}>$499</div>
            <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.75)', marginBottom: '1.75rem' }}>
              INSTANT ACCESS · ONE-TIME · $176 BELOW INDIVIDUAL COST
            </div>

            <button
              data-testid="cl-bundle-buy-btn"
              onClick={onBuy}
              disabled={isLoading}
              style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', border: 'none', padding: '1.25rem 2rem', cursor: isLoading ? 'wait' : 'pointer', display: 'block', width: '100%', textAlign: 'center', borderRadius: 0, marginBottom: '0.5rem', minHeight: 56, opacity: isLoading ? 0.6 : 1 }}>
              {isLoading ? 'PROCESSING...' : 'INSTALL THE BUNDLE — $499 →'}
            </button>
            {error && <p style={{ fontFamily: MONO, fontSize: 9, color: '#ef4444', marginBottom: '0.5rem' }}>{error}</p>}
            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(28,43,58,0.75)', textAlign: 'center', marginBottom: '1.5rem' }}>
              Instant access. 30-day implementation roadmap included.
            </p>

            {/* Cost decision box */}
            <div style={{ background: BG, border: `1px solid ${BORDER}`, padding: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.75rem', fontWeight: 700 }}>THE COST DECISION</p>
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontFamily: SANS, fontSize: '0.8rem', color: 'rgba(28,43,58,0.55)', marginBottom: '0.2rem' }}>Typical remediation after failed audit</div>
                <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '1.5rem', color: '#dc2626' }}>$10,000–$25,000</div>
              </div>
              <div>
                <div style={{ fontFamily: SANS, fontSize: '0.8rem', color: 'rgba(28,43,58,0.55)', marginBottom: '0.2rem' }}>Installing the complete system before the audit</div>
                <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '1.5rem', color: '#166534' }}>$499</div>
              </div>
            </div>

            <a href="#component-library" style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.78)', textDecoration: 'underline', display: 'block', textAlign: 'center' }}>
              Not ready for the full system? Explore individual domains below →
            </a>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.cl-bundle-grid{grid-template-columns:1fr!important;gap:2rem!important}.cl-checklist-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
