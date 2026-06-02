const mono = { fontFamily: 'JetBrains Mono, monospace' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

export default function LibraryEntryBanner() {
  return (
    <section data-testid="kc-start-here" style={{ background: '#F5F2EC', borderTop: '1px solid rgba(28,43,58,0.1)', borderBottom: '1px solid rgba(28,43,58,0.1)', borderLeft: '3px solid #8B7355', padding: '1.75rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }} className="lp-two-col">
        <div>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.4rem' }}>
            NEW TO THIS LIBRARY?
          </p>
          <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(28,43,58,0.80)', lineHeight: 1.7, margin: 0 }}>
            Start with the pillar guide — the full startup sequence from formation to first dispatch, before you read anything else.
          </p>
        </div>
        <a
          href="/knowledge-center/how-to-start-a-trucking-company"
          data-testid="kc-start-here-link"
          style={{ ...mono, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#1C2B3A', color: '#FAF8F4', padding: '0.9rem 1.75rem', textDecoration: 'none', whiteSpace: 'nowrap', borderRadius: 0, flexShrink: 0 }}>
          START HERE →
        </a>
      </div>
    </section>
  );
}
