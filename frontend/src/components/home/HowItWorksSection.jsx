const mono = { fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace" };
const serif = { fontFamily: "'Newsreader','Playfair Display',serif" };
const sans = { fontFamily: "'Inter',sans-serif" };

const STEPS = [
  {
    num: '01',
    label: 'Run the REACH Diagnostic',
    body: '15 questions across your finances, records, drivers, and operating history. Identifies exactly where FMCSA already has reach into your operation — before they exercise it. Free. No email required. Results are immediate.',
    status: 'active',
    cta: { label: 'Start REACH →', href: '/reach-diagnostic' },
  },
  {
    num: '02',
    label: 'Complete the Ground 0 Briefing',
    body: 'A 20-minute private review with Vince Lawrence. He examines your USDOT compliance telemetry, identifies your highest-risk exposure areas, and determines whether LP-COH-002 is the right fit for your operation. This is not a sales call. Investment details are disclosed here — after your file has been reviewed.',
    status: 'active',
    cta: { label: 'Request Briefing →', href: '/ground-0-briefing' },
  },
  {
    num: '03',
    label: 'Complete the 90-Day LaunchPath Standard',
    body: 'Video-led implementation across 10 modules, 5 custodian checkpoints, and 6 FMCSA compliance domains. At Week 11, your files go through a full pre-audit integrity simulation. Carriers who complete the program cleanly receive a Verified Registry ID — documented evidence that the compliance system was built correctly.',
    status: 'earned',
    cta: null,
  },
];

const SEQ_NODES = [
  { num: '01', label: 'REACH Diagnostic',        sub: 'Free · 15 Questions',       status: 'active',  href: '/reach-diagnostic'  },
  { num: '02', label: 'Ground 0 Briefing',       sub: '20 Min · Private Review',   status: 'active',  href: '/ground-0-briefing' },
  { num: '03', label: '90-Day Standard',         sub: '10 Modules · 5 Checkpoints', status: 'program', href: null },
  { num: '04', label: 'Week 11 Integrity Audit', sub: 'Pre-FMCSA Simulation',       status: 'program', href: null },
  { num: '05', label: 'Verified Registry ID',    sub: 'Issued on Clean Completion', status: 'program', href: null },
];

export default function HowItWorksSection() {
  return (
    <section data-testid="how-it-works-section" style={{ background: '#F5F6F7', borderTop: '1px solid rgba(28,43,58,0.08)', borderBottom: '1px solid rgba(28,43,58,0.08)', padding: 'clamp(4.5rem,8vw,7rem) 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.75rem' }}>LP-SYS-001 · System Order</p>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.75rem,3.2vw,2.75rem)', color: '#1C2B3A', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
            How the LaunchPath System Works
          </h2>
          <p style={{ ...sans, fontSize: '1rem', color: 'rgba(28,43,58,0.65)', lineHeight: 1.75, maxWidth: 520 }}>
            Three stages. Each one builds on the last. No stage is optional.
          </p>
        </div>

        {/* 3-step cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', marginBottom: '3rem' }}>
          {STEPS.map((step) => {
            const isActive = step.status === 'active';
            return (
              <div key={step.num} data-testid={`how-it-works-step-${step.num}`} style={{
                background: '#1C2B3A',
                padding: '2rem 1.75rem 1.75rem',
                borderTop: isActive ? '3px solid #C8A96E' : '3px solid rgba(197,160,89,0.20)',
                position: 'relative',
              }}>
                <p style={{ ...mono, fontSize: 9, letterSpacing: '0.16em', color: isActive ? 'rgba(197,160,89,0.85)' : 'rgba(197,160,89,0.35)', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
                  STEP {step.num} {!isActive && '· PROGRAM REQUIRED'}
                </p>
                <h3 style={{ ...serif, fontWeight: 700, fontSize: '1.125rem', color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)', lineHeight: 1.25, marginBottom: '0.875rem' }}>
                  {step.label}
                </h3>
                <p style={{ ...sans, fontSize: '0.875rem', color: isActive ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.50)', lineHeight: 1.8, marginBottom: step.cta ? '1.5rem' : 0 }}>
                  {step.body}
                </p>
                {step.cta && (
                  <a href={step.cta.href} style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8A96E', textDecoration: 'none', fontWeight: 700, display: 'inline-block', borderBottom: '1px solid rgba(197,160,89,0.30)', paddingBottom: 2, transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#d4b87a'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#C8A96E'}
                  >
                    {step.cta.label}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* ── System Sequence Grid ───────────────────────────────────── */}
        <div data-testid="system-roadmap" style={{ background: '#131F2E', border: '1px solid rgba(197,160,89,0.12)' }}>

          {/* Grid header bar */}
          <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(197,160,89,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <p style={{ ...mono, fontSize: 9, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.65)', margin: 0 }}>LP-SYS-001 · Installation Sequence</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, background: '#C8A96E', display: 'inline-block' }} />
                <span style={{ ...mono, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)' }}>Open Access</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, background: 'transparent', border: '1px solid rgba(197,160,89,0.30)', display: 'inline-block' }} />
                <span style={{ ...mono, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)' }}>Program Required</span>
              </span>
            </div>
          </div>

          {/* 5-column node grid */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', minWidth: 680 }}>
              {SEQ_NODES.map((node, i) => {
                const isActive = node.status === 'active';
                const isLast = i === SEQ_NODES.length - 1;
                return (
                  <div key={node.num} style={{
                    borderRight: isLast ? 'none' : '1px solid rgba(197,160,89,0.08)',
                    borderTop: isActive ? '2px solid #C8A96E' : '2px solid rgba(197,160,89,0.18)',
                    padding: '1.5rem 1.25rem 1.25rem',
                    position: 'relative',
                    background: isActive ? 'rgba(200,169,110,0.04)' : 'transparent',
                  }}>

                    {/* Step number */}
                    <p style={{ ...mono, fontSize: 8, letterSpacing: '0.18em', color: isActive ? '#C8A96E' : 'rgba(197,160,89,0.30)', textTransform: 'uppercase', marginBottom: '0.625rem' }}>{node.num}</p>

                    {/* Label */}
                    {node.href ? (
                      <a href={node.href} style={{ ...serif, fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none', display: 'block', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                        {node.label}
                      </a>
                    ) : (
                      <p style={{ ...serif, fontSize: '0.875rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', lineHeight: 1.3, marginBottom: '0.5rem', margin: '0 0 0.5rem' }}>
                        {node.label}
                      </p>
                    )}

                    {/* Sub label */}
                    <p style={{ ...mono, fontSize: 8, color: isActive ? 'rgba(197,160,89,0.65)' : 'rgba(255,255,255,0.30)', letterSpacing: '0.06em', lineHeight: 1.5, marginBottom: '0.875rem' }}>{node.sub}</p>

                    {/* Status badge */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '3px 8px',
                      background: isActive ? 'rgba(200,169,110,0.10)' : 'transparent',
                      border: isActive ? '1px solid rgba(197,160,89,0.35)' : '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <span style={{ width: 5, height: 5, background: isActive ? '#C8A96E' : 'rgba(255,255,255,0.20)', display: 'inline-block' }} />
                      <span style={{ ...mono, fontSize: 7, letterSpacing: '0.14em', textTransform: 'uppercase', color: isActive ? 'rgba(197,160,89,0.80)' : 'rgba(255,255,255,0.30)' }}>
                        {isActive ? 'Open Access' : 'Program Required'}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom caption */}
          <div style={{ padding: '0.875rem 1.75rem', borderTop: '1px solid rgba(197,160,89,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p style={{ ...mono, fontSize: 8, letterSpacing: '0.10em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: 0 }}>
              Steps 01–02 are open access. Steps 03–05 are issued through the program.
            </p>
            <p data-testid="roadmap-scroll-hint" style={{ ...mono, fontSize: 8, letterSpacing: '0.12em', color: 'rgba(197,160,89,0.50)', textTransform: 'uppercase', margin: 0, display: 'none' }} className="roadmap-scroll-hint">
              ← scroll →
            </p>
          </div>
          <style>{`
            @media (max-width: 767px) { .roadmap-scroll-hint { display: block !important; } }
          `}</style>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(28,43,58,0.10)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <p style={{ ...sans, fontSize: '0.924rem', color: 'rgba(28,43,58,0.60)', lineHeight: 1.65, maxWidth: 480 }}>
            Start with REACH. It takes 5 minutes and costs nothing. Your result determines the next step.
          </p>
          <a data-testid="how-it-works-reach-cta" href="/reach-diagnostic"
            style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#1C2B3A', color: '#C8A96E', padding: '0.875rem 1.75rem', textDecoration: 'none', fontWeight: 700, border: '1px solid rgba(200,169,110,0.40)', whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s, color 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#C8A96E'; e.currentTarget.style.color = '#0D1B2A'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#1C2B3A'; e.currentTarget.style.color = '#C8A96E'; }}
          >
            Run REACH Diagnostic — Free →
          </a>
        </div>

      </div>
    </section>
  );
}
