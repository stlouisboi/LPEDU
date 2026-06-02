import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

export default function LibraryFooterCTA() {
  return (
    <section data-testid="cl-footer-cta" style={{ background: NAVY, padding: 'clamp(4rem,8vw,6rem) 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.25rem' }}>
          LPOS V1.0 · ENTRY POINT
        </p>
        <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', color: '#FAF8F4', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1rem' }}>
          Every operator starts with the REACH Diagnostic.
        </h2>
        <p style={{ fontFamily: SANS, fontSize: '1rem', color: 'rgba(250,248,244,0.85)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 2.5rem' }}>
          Before you buy anything, run the REACH Diagnostic. It takes 4–6 minutes. It identifies your exposure across all four compliance pillars — before FMCSA does.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}>
          <Link
            href="/reach-diagnostic"
            data-testid="cl-footer-reach-cta"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: GOLD, color: '#FAF8F4', padding: '1.1rem 2.5rem', textDecoration: 'none', borderRadius: 0, display: 'inline-block', minHeight: 56 }}>
            TAKE THE REACH DIAGNOSTIC — FREE →
          </Link>
          <Link
            href="/ground-0-briefing"
            data-testid="cl-footer-standard-link"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.80)', textDecoration: 'underline' }}>
            VIEW THE LAUNCHPATH STANDARD →
          </Link>
        </div>

        <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.25)', maxWidth: 640, margin: '3rem auto 0', lineHeight: 1.7 }}>
          All documents current as of May 2026. Verify current regulatory requirements at ecfr.gov. LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
        </p>
      </div>
    </section>
  );
}
