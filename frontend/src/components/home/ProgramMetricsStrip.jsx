const STATS = [
  { num: '90', label: 'Program Duration', unit: 'Days' },
  { num: '12', label: 'Maximum Cohort Size', unit: 'Carriers' },
  { num: '5', label: 'Custodian Checkpoints', unit: '' },
  { num: '1', label: 'Verified Registry ID Issued', unit: '' },
];

export default function ProgramMetricsStrip() {
  return (
    <div style={{ background: '#1C2B3A' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="lp-metrics-grid">
        {STATS.map((s, i) => (
          <div key={i} style={{ borderRight: i < 3 ? '1px solid rgba(250,248,244,0.1)' : 'none', padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900, color: '#FAF8F4', lineHeight: 1 }}>
              {s.num}{s.unit && <span style={{ fontSize: '1.2rem', marginLeft: 4, opacity: 0.6 }}>{s.unit}</span>}
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.5)', marginTop: 8, display: 'block' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
