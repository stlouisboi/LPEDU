import { Link } from '../../compat/Link';

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

export default function LibraryCTASection() {
  return (
    <section style={{ background: '#1C2B3A', padding: 'clamp(4rem,7vw,6rem) 1.5rem', borderTop: '1px solid rgba(250,248,244,0.08)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4rem', alignItems: 'center' }} className="lp-hero-grid">
        {/* Left */}
        <div>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.75rem' }}>
            NOT SURE WHERE TO START?
          </p>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', color: '#FAF8F4', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Run the FREE readiness diagnostic first.
          </h2>
          <p style={{ ...sans, fontSize: '1rem', color: 'rgba(250,248,244,0.55)', lineHeight: 1.8, maxWidth: 480 }}>
            The REACH Diagnostic maps your current operation against the five audit systems and tells you which briefs are most urgent for your situation.
          </p>
        </div>
        {/* Right — CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link
            to="/reach-diagnostic"
            data-testid="kc-run-diagnostic-btn"
            style={{ ...mono, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#8B7355', color: '#FAF8F4', padding: '1.1rem 2rem', textDecoration: 'none', textAlign: 'center', borderRadius: 0 }}>
            RUN DIAGNOSTIC →
          </Link>
          <Link
            to="/reach-diagnostic"
            data-testid="kc-gap-quiz-cta"
            style={{ ...mono, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(250,248,244,0.6)', border: '1px solid rgba(250,248,244,0.2)', padding: '1.1rem 2rem', textDecoration: 'none', textAlign: 'center', borderRadius: 0, transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(250,248,244,0.4)'; e.currentTarget.style.color = '#FAF8F4'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,248,244,0.2)'; e.currentTarget.style.color = 'rgba(250,248,244,0.6)'; }}>
            5-QUESTION GAP AUDIT →
          </Link>
        </div>
      </div>
    </section>
  );
}
