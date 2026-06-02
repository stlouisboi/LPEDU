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

const ROADMAP_NODES = [
  { code: 'LP-01', label: 'REACH Diagnostic', sub: 'Free · 15 Questions', status: 'active', href: '/reach-diagnostic' },
  { code: 'LP-02', label: 'Ground 0 Briefing', sub: '20 Min · Private Review', status: 'active', href: '/ground-0-briefing' },
  { code: 'LP-03', label: '90-Day Standard', sub: '10 Modules · 5 Checkpoints', status: 'enrolled', href: null },
  { code: 'LP-04', label: 'Week 11 Integrity Audit', sub: 'Pre-FMCSA Simulation', status: 'enrolled', href: null },
  { code: 'LP-05', label: 'Verified Registry ID', sub: 'Issued on Clean Completion', status: 'issued', href: null },
];

function RoadmapNode({ node, isLast }) {
  const isActive = node.status === 'active';
  const nodeDot = {
    flexShrink: 0,
    width: 10,
    height: 10,
    background: isActive ? '#C8A96E' : 'rgba(197,160,89,0.22)',
    border: isActive ? '2px solid #C8A96E' : '2px solid rgba(197,160,89,0.30)',
    borderRadius: 0,
    zIndex: 2,
  };
  const connector = {
    width: 48,
    flexShrink: 0,
    height: 1,
    background: isActive
      ? 'linear-gradient(to right, rgba(200,169,110,0.55), rgba(200,169,110,0.18))'
      : 'rgba(255,255,255,0.07)',
    alignSelf: 'flex-end',
    marginBottom: 5,
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0, width: 108 }}>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ ...mono, fontSize: 8, letterSpacing: '0.16em', color: isActive ? '#C8A96E' : 'rgba(197,160,89,0.50)', textTransform: 'uppercase', marginBottom: 4 }}>{node.code}</div>
          {node.href ? (
            <a href={node.href} style={{ ...sans, fontSize: '0.714rem', fontWeight: 600, color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.40)', textDecoration: 'none', display: 'block', lineHeight: 1.35, marginBottom: 3 }}>
              {node.label}
            </a>
          ) : (
            <p style={{ ...sans, fontSize: '0.714rem', fontWeight: 600, color: 'rgba(255,255,255,0.40)', lineHeight: 1.35, marginBottom: 3, margin: '0 0 3px' }}>{node.label}</p>
          )}
          <p style={{ ...mono, fontSize: 8, color: isActive ? 'rgba(197,160,89,0.65)' : 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', margin: 0 }}>{node.sub}</p>
          {!isActive && (
            <p style={{ ...mono, fontSize: 7, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '3px 0 0' }}>EARNED</p>
          )}
        </div>
        <div style={nodeDot} />
      </div>
      {!isLast && <div style={connector} />}
    </>
  );
}

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
                  STEP {step.num} {!isActive && '· EARNED'}
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

        {/* System Roadmap Visual */}
        <div data-testid="system-roadmap" style={{ background: '#1C2B3A', padding: '1.75rem 2rem', borderTop: '1px solid rgba(197,160,89,0.15)' }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.65)', marginBottom: '1.25rem' }}>LP-SYS — Installation Sequence</p>
          {/* Nodes row — horizontally scrollable, fixed-width nodes prevent overlap on mobile */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', minWidth: 720, paddingBottom: '0.25rem' }}>
              {ROADMAP_NODES.map((node, i) => (
                <RoadmapNode key={node.code} node={node} isLast={i === ROADMAP_NODES.length - 1} />
              ))}
            </div>
          </div>
          <p style={{ ...mono, fontSize: 8, letterSpacing: '0.10em', color: 'rgba(255,255,255,0.40)', marginTop: '1rem', textTransform: 'uppercase' }}>
            Nodes 1–2 are open access. Nodes 3–5 are earned through the program.
          </p>
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
