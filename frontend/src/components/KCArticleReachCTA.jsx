import { Link } from '../compat/Link';

const mono = { fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace" };
const sans = { fontFamily: "'Inter',sans-serif" };
const serif = { fontFamily: "'Newsreader','Playfair Display',serif" };

/**
 * KCArticleReachCTA
 * Persistent CTA block at the bottom of every Knowledge Center article.
 * Copy is governed by LP-WEB-012 §4.4 — do not alter without issuing a revision.
 * Applied globally via SiteFooter route detection — one component, all KC articles.
 */
export default function KCArticleReachCTA() {
  return (
    <section
      data-testid="kc-article-reach-cta"
      style={{
        background: '#0D1B2A',
        borderTop: '3px solid #C8A96E',
        padding: 'clamp(2.5rem,5vw,3.5rem) 1.5rem',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <p style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>
          LP-MOD-REACH · Compliance Exposure Scan
        </p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,2rem)', color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Your files are either audit-ready or they aren't.
        </h2>
        <p style={{ ...sans, fontSize: '1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, maxWidth: 580, marginBottom: '2rem' }}>
          Run the REACH Diagnostic — 15 questions, free, no email required. It identifies exactly where FMCSA already has reach into your operation before they exercise it.
        </p>
        <Link
          to="/reach-diagnostic"
          data-testid="kc-reach-cta-bottom"
          style={{
            ...mono,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: '#C8A96E',
            color: '#0D1B2A',
            padding: '0.875rem 2rem',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background 0.18s',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#d4b87a'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = '#C8A96E'; }}
        >
          Run REACH Diagnostic — Free →
        </Link>
      </div>
    </section>
  );
}
