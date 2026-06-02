import Link from 'next/link';

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

const HIGHWAY_IMG = 'https://images.unsplash.com/photo-1698077671410-139c80ac4fb8?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800';

export default function ArticleCard({ variant = 'standard', code, category, title, excerpt, readTime, cfr, slug, isPillar, thumbnail }) {
  if (variant === 'featured') {
    return (
      <Link href={slug} style={{ textDecoration: 'none', display: 'block' }}>
        <article data-testid="kc-featured-card" style={{ border: '1px solid rgba(28,43,58,0.12)', display: 'grid', gridTemplateColumns: '2fr 1fr', overflow: 'hidden', transition: 'border-color 0.2s' }} className="kc-featured-grid"
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139,115,85,0.5)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(28,43,58,0.12)'}>
          {/* Left — copy */}
          <div style={{ padding: '2.5rem', borderRight: '1px solid rgba(28,43,58,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ ...mono, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#8B7355', color: '#FAF8F4', padding: '0.2rem 0.6rem' }}>PILLAR GUIDE</span>
              <span style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280' }}>{category}</span>
              <span style={{ ...mono, fontSize: 8, letterSpacing: '0.08em', color: 'rgba(28,43,58,0.72)', marginLeft: 'auto' }}>{readTime}</span>
            </div>
            <h2 style={{ ...serif, fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#1C2B3A', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {title}
            </h2>
            <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(28,43,58,0.75)', lineHeight: 1.8, marginBottom: '1.25rem' }}>{excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139,115,85,0.8)', border: '1px solid rgba(139,115,85,0.25)', padding: '0.2rem 0.6rem' }}>{cfr}</span>
              <span style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(139,115,85,0.08)', color: 'rgba(139,115,85,0.6)', padding: '0.2rem 0.6rem' }}>{code}</span>
            </div>
          </div>
          {/* Right — image */}
          <div className="kc-featured-img" style={{ position: 'relative', overflow: 'hidden', minHeight: 260 }}>
            <img src={thumbnail || HIGHWAY_IMG} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(245,242,236,0.3), transparent)' }} />
          </div>
        </article>
      </Link>
    );
  }

  // Standard card
  return (
    <Link href={slug} style={{ textDecoration: 'none', display: 'block' }}>
      <article data-testid="kc-article-card" style={{ borderBottom: '1px solid rgba(28,43,58,0.1)', borderRight: '1px solid rgba(28,43,58,0.1)', padding: '1.75rem', background: '#FAF8F4', transition: 'background 0.2s', height: '100%', boxSizing: 'border-box' }}
        onMouseEnter={e => e.currentTarget.style.background = '#F5F2EC'}
        onMouseLeave={e => e.currentTarget.style.background = '#FAF8F4'}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: '0.875rem', flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'rgba(139,115,85,0.1)', color: '#8B7355', padding: '0.2rem 0.5rem' }}>{code}</span>
          <span style={{ ...mono, fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>{category}</span>
          <span style={{ ...mono, fontSize: 8, color: '#6B7280' }}>{readTime}</span>
        </div>
        {/* Title */}
        <h2 style={{ ...serif, fontWeight: 700, fontSize: '1.05rem', color: '#1C2B3A', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: '0.625rem' }}>
          {title}
        </h2>
        {/* Excerpt */}
        <p style={{ ...sans, fontSize: '0.875rem', color: 'rgba(28,43,58,0.75)', lineHeight: 1.75, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {excerpt}
        </p>
        {/* CFR badge */}
        {cfr && (
          <span style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139,115,85,0.7)', border: '1px solid rgba(139,115,85,0.25)', padding: '0.2rem 0.5rem', display: 'inline-block' }}>
            {cfr}
          </span>
        )}
      </article>
    </Link>
  );
}
