const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BG = '#FAF8F4';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";

const STATS = [
  { val: '49 CFR',    label: 'Primary Regulation Indexed' },
  { val: '11',        label: 'Operational Briefs' },
  { val: '5',         label: 'Compliance Domains' },
  { val: '16',        label: 'Documented Failure Patterns' },
  { val: '18-Month',  label: 'New Entrant Audit Window' },
];

export default function LibraryMetricsStrip() {
  return (
    <section data-testid="cl-metrics-strip" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', borderLeft: `1px solid ${BORDER}` }} className="cl-metrics-grid">
        {STATS.map((s, i) => (
          <div key={i} style={{ padding: '2rem 1.5rem', borderRight: `1px solid ${BORDER}`, textAlign: 'center' }}>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '1.75rem', color: NAVY, lineHeight: 1, marginBottom: '0.35rem' }}>{s.val}</div>
            <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.4)' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.cl-metrics-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}
