import dynamic from 'next/dynamic';

const MEMBER_STATES = ['TX', 'GA', 'FL', 'OH', 'NC', 'TN', 'AL', 'MS', 'LA', 'AR', 'MO', 'IL', 'IN', 'KY'];

const STATS = ['14 States Represented', 'LP-COH-001 Graduates', '100% Active Authority'];

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

// Lazy-load map (D3 not SSR-safe)
const MapChart = dynamic(() => import('./CohortMapChart'), { ssr: false, loading: () => (
  <div style={{ width: '100%', height: 360, background: '#F5F2EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ ...mono, fontSize: 9, color: '#6B7280', letterSpacing: '0.1em' }}>LOADING MAP...</span>
  </div>
)});

export default function CohortMapSection() {
  return (
    <section style={{ background: '#FAF8F4', borderTop: '1px solid rgba(28,43,58,0.08)', borderBottom: '1px solid rgba(28,43,58,0.08)', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.75rem' }}>National Cohort Reach</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#1C2B3A', marginBottom: '2.5rem' }}>
          LP-COH-001 Graduates — Active Across 14 States
        </h2>
        <MapChart memberStates={MEMBER_STATES} />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: '#F5F2EC', border: '1px solid rgba(28,43,58,0.12)', padding: '0.6rem 1.25rem' }}>
              <span style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C2B3A' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
