import { Link } from '../../compat/Link';

export default function FooterCTASection() {
  return (
    <div className="lp-blueprint-light" style={{ background: '#1C2B3A', padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.5rem' }}>LP-COH-002 · JULY 2026</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', color: '#FAF8F4', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Your operating authority is either protected or it isn't.
        </h2>
        <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '1rem', color: 'rgba(250,248,244,0.82)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 500, margin: '0 auto 2.5rem' }}>
          Request a Ground Zero Briefing. Vince will review your USDOT telemetry and tell you exactly where your exposure is.
        </p>
        <Link to="/ground-0-briefing" data-testid="footer-cta-btn" style={{ display: 'inline-block', background: '#C8A96E', color: '#1C2B3A', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', textDecoration: 'none', fontWeight: 700, borderRadius: 0 }}>
          Request Ground 0 Briefing →
        </Link>
      </div>
    </div>
  );
}
