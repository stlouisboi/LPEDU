const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

export default function CohortMapSection() {
  return (
    <section data-testid="cohort-map-section" style={{ background: '#FAF8F4', borderTop: '1px solid rgba(28,43,58,0.08)', borderBottom: '1px solid rgba(28,43,58,0.08)', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.75rem' }}>LP-COH-002 · National Cohort</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#1C2B3A', marginBottom: '1.5rem' }}>
          Open to Carriers Across All 48 Contiguous States
        </h2>
        <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '1rem', color: 'rgba(28,43,58,0.70)', lineHeight: 1.8, maxWidth: 640, marginBottom: '2rem' }}>
          LP-COH-002 accepts carriers from all 48 contiguous states. The cohort map will be activated after the first cohort's Verified Registry IDs are issued.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['All 48 Contiguous States', 'LP-COH-002 · Opens July 2026', '12 Carrier Maximum'].map((s, i) => (
            <div key={i} style={{ background: '#F5F2EC', border: '1px solid rgba(28,43,58,0.12)', padding: '0.6rem 1.25rem' }}>
              <span style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C2B3A' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
