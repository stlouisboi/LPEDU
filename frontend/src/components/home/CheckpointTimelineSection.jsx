const CHECKPOINTS = [
  { num: '01', title: 'Authority & Insurance Audit', desc: 'Operating authority status, insurance classification, MCS-150 currency', week: 'Week 1–2' },
  { num: '02', title: 'Driver Qualification File Review', desc: 'DQ files, medical certificates, MVR records, hire documentation', week: 'Week 3–4' },
  { num: '03', title: 'Drug & Alcohol Program Audit', desc: 'Clearinghouse queries, testing records, C/TPA certification, policy files', week: 'Week 5–6' },
  { num: '04', title: 'Hours of Service & Maintenance Review', desc: 'HOS logs, pre/post-trip inspections, vehicle maintenance files', week: 'Week 7–8' },
  { num: '05', title: 'Pre-Audit Integrity Simulation', desc: 'Full mock FMCSA audit across all five compliance domains', week: 'Week 11' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

export default function CheckpointTimelineSection() {
  return (
    <section style={{ background: '#F5F2EC', borderTop: '1px solid rgba(28,43,58,0.1)', borderBottom: '1px solid rgba(28,43,58,0.1)', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '1rem' }}>The LaunchPath System</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#1C2B3A', marginBottom: '3.5rem', maxWidth: 560 }}>
          Five Custodian Checkpoints. 90 Days. One Verified Outcome.
        </h2>

        {/* Desktop timeline */}
        <div className="lp-timeline-desktop" style={{ position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'absolute', top: 20, left: '5%', right: '5%', height: 2, background: 'rgba(139,115,85,0.25)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', position: 'relative' }}>
            {CHECKPOINTS.map((c, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, background: '#1C2B3A', border: '2px solid #8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', flexShrink: 0, zIndex: 1 }}>
                  <span style={{ ...mono, fontWeight: 700, fontSize: 11, color: '#FAF8F4' }}>{c.num}</span>
                </div>
                <p style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', color: '#8B7355', marginBottom: '0.4rem' }}>{c.week}</p>
                <p style={{ ...serif, fontWeight: 700, fontSize: '0.875rem', color: '#1C2B3A', marginBottom: '0.5rem', lineHeight: 1.3 }}>{c.title}</p>
                <p style={{ ...mono, fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B7280', lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="lp-timeline-mobile" style={{ display: 'none', flexDirection: 'column', gap: '1.5rem' }}>
          {CHECKPOINTS.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, background: '#1C2B3A', border: '2px solid #8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ ...mono, fontWeight: 700, fontSize: 10, color: '#FAF8F4' }}>{c.num}</span>
              </div>
              <div>
                <p style={{ ...mono, fontSize: 9, color: '#8B7355', marginBottom: 2 }}>{c.week}</p>
                <p style={{ ...serif, fontWeight: 700, fontSize: '0.95rem', color: '#1C2B3A', marginBottom: 4 }}>{c.title}</p>
                <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(45,55,72,0.65)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
