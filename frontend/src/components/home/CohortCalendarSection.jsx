const MILESTONES = [
  { date: 'July 6, 2026', num: '01', title: 'Cohort Orientation', desc: 'USDOT registry audit, file gap assessment, 90-day roadmap issued', status: 'OPEN — 4 SEATS', statusColor: '#059669' },
  { date: 'July 20, 2026', num: '02', title: 'Checkpoint 1 Review', desc: 'Authority, insurance, and MCS-150 custodian audit', status: 'SCHEDULED', statusColor: '#6B7280' },
  { date: 'August 17, 2026', num: '03', title: 'Checkpoint 3 Review', desc: 'DQ files, D&A program, HOS records custodian audit', status: 'SCHEDULED', statusColor: '#6B7280' },
  { date: 'September 14, 2026', num: '04', title: 'Week 11 Integrity Audit', desc: 'Full pre-FMCSA mock audit across all five compliance domains', status: 'FINAL GATE', statusColor: '#8B7355' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

export default function CohortCalendarSection() {
  return (
    <section style={{ background: '#F5F2EC', borderTop: '1px solid rgba(28,43,58,0.1)', borderBottom: '1px solid rgba(28,43,58,0.1)', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.75rem' }}>LP-COH-002 Implementation Timeline</p>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#1C2B3A' }}>The 90-Day Verified Implementation Calendar</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(28,43,58,0.1)' }} className="lp-cal-grid">
          {MILESTONES.map((m, i) => (
            <div key={i} style={{ background: '#FAF8F4', padding: '1.75rem 1.5rem' }}>
              <p style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.5rem' }}>{m.date}</p>
              <div style={{ ...serif, fontWeight: 900, fontSize: '2.5rem', color: '#1C2B3A', lineHeight: 1, marginBottom: '0.75rem' }}>{m.num}</div>
              <p style={{ ...serif, fontWeight: 700, fontSize: '0.95rem', color: '#1C2B3A', marginBottom: '0.5rem' }}>{m.title}</p>
              <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(45,55,72,0.65)', lineHeight: 1.65, marginBottom: '1rem' }}>{m.desc}</p>
              <span style={{ ...mono, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: m.statusColor, border: `1px solid ${m.statusColor}`, padding: '0.25rem 0.5rem' }}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
