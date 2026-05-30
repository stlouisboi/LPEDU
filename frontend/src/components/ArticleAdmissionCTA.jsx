import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

/**
 * ArticleAdmissionCTA
 * Replaces BriefBundleCTA across all 24 knowledge-center article pages.
 * Routes to /ground-0-briefing per PRD. No pricing displayed.
 */
export default function ArticleAdmissionCTA() {
  return (
    <section
      data-testid="article-admission-cta"
      style={{
        background: NAVY,
        borderTop: '1px solid rgba(250,248,244,0.08)',
        padding: 'clamp(3rem,5vw,4.5rem) 1.5rem',
        textAlign: 'center',
      }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '1rem', lineHeight: 1.4 }}>
          LP-STD-001 · GUIDED IMPLEMENTATION
        </p>
        <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#FAF8F4', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1rem' }}>
          Reading about compliance is the first step. Installing it is the job.
        </h2>
        <p style={{ fontFamily: SANS, fontSize: '1rem', color: 'rgba(250,248,244,0.85)', lineHeight: 1.75, marginBottom: '2rem' }}>
          The LaunchPath Standard is a guided 90-day implementation — every document, system, and verification checkpoint installed in the right order. It starts at Ground 0.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}>
          <Link
            href="/ground-0-briefing"
            data-testid="article-cta-ground0"
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              background: GOLD,
              color: NAVY,
              padding: '1.1rem 2.5rem',
              textDecoration: 'none',
              borderRadius: 0,
              display: 'inline-block',
              minHeight: 56,
              lineHeight: '1.8',
            }}>
            BEGIN GROUND 0 — FREE →
          </Link>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.5)', margin: 0 }}>
            Free. No purchase required. Takes 20 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
