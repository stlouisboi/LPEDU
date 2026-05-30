const NAVY = '#1C2B3A';
const GOLD = '#8B7355';
const BG = '#FAF8F4';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

export default function LibraryPageHero() {
  return (
    <section data-testid="cl-hero" style={{ background: NAVY, padding: 'clamp(4rem,8vw,6rem) 1.5rem', borderBottom: `1px solid rgba(250,248,244,0.08)` }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.35)', marginBottom: '1.5rem' }}>
          LP-SYS-LIBRARY · OPERATING STANDARDS LIBRARY
        </p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,3.75rem)', color: '#FAF8F4', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
          The LaunchPath Operating Standards Library
        </h1>
        <p style={{ fontFamily: SANS, fontSize: '1.05rem', color: 'rgba(250,248,244,0.6)', lineHeight: 1.82, maxWidth: 640, margin: '0 auto 2.5rem' }}>
          Choose your path: DIY document system or guided 90-day implementation for new motor carriers.
        </p>

        {/* Proof points */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            '· Pass the New Entrant audit on the first attempt',
            '· Install a complete document system in 90 days',
            '· Know exactly what FMCSA will look for before they arrive',
          ].map((pt, i) => (
            <span key={i} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.4)' }}>{pt}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}>
          <a
            href="/reach-diagnostic"
            data-testid="cl-hero-reach-cta"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: GOLD, color: '#FAF8F4', padding: '1.1rem 2.5rem', textDecoration: 'none', borderRadius: 0, display: 'inline-block' }}>
            TAKE THE REACH DIAGNOSTIC — FREE
          </a>
          <a
            href="#bundle"
            data-testid="cl-hero-bundle-link"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.45)', textDecoration: 'underline' }}>
            Already know what you need? Skip to the DIY Bundle →
          </a>
        </div>
      </div>
    </section>
  );
}
