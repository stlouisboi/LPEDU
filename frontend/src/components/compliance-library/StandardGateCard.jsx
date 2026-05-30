import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

export default function StandardGateCard() {
  return (
    <section data-testid="cl-standard-gate" style={{ background: NAVY, borderTop: `1px solid rgba(250,248,244,0.08)`, borderBottom: `1px solid rgba(250,248,244,0.08)`, padding: '3.5rem 1.5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.75rem' }}>
          LP-STD-001 · GUIDED IMPLEMENTATION
        </p>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#FAF8F4', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          The LaunchPath Standard
        </h3>
        <p style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(250,248,244,0.85)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 560 }}>
          Not ready to self-install? The LaunchPath Standard is a guided 90-day implementation — but it requires Ground 0 completion first. That is where this starts.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 340 }}>
          <Link
            href="/ground-0-briefing"
            data-testid="cl-standard-ground0-cta"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: GOLD, color: '#FAF8F4', padding: '1.1rem 2rem', textDecoration: 'none', textAlign: 'center', borderRadius: 0, display: 'block', minHeight: 56 }}>
            BEGIN GROUND 0 →
          </Link>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.35)', textAlign: 'center' }}>
            Free. No purchase required. Takes 20 minutes.
          </p>
          <Link
            href="/standard"
            data-testid="cl-standard-details-link"
            style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.45)', textDecoration: 'underline', textAlign: 'center' }}>
            View full engagement details →
          </Link>
        </div>
      </div>
    </section>
  );
}
