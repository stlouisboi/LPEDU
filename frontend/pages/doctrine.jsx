import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../src/components/Navbar';
import FooterSection from '../src/components/FooterSection';

const C = {
  bg: '#0a0f1a',
  bgMid: '#0d1628',
  gold: '#C5A059',
  goldDim: 'rgba(197,160,89,0.55)',
  text: 'rgba(255,255,255,0.85)',
  textMuted: 'rgba(255,255,255,0.50)',
  textDim: 'rgba(255,255,255,0.28)',
  border: 'rgba(255,255,255,0.07)',
  borderGold: 'rgba(197,160,89,0.20)',
};
const MONO = "'JetBrains Mono','IBM Plex Mono','Courier New',monospace";
const SERIF = "'Newsreader','Playfair Display',Georgia,serif";
const BODY = "'Inter',Helvetica,Arial,sans-serif";

const LAYERS = [
  {
    code: '01',
    tag: 'REACH',
    title: 'Exposure-Awareness & Readiness Diagnostic',
    description: 'REACH reveals how exposed the operation is, whether danger can already reach the authority, and whether the operator should proceed, wait, or stop. It is not just a qualification filter — it is an exposure-awareness instrument that tells the operator the truth about their current position before anything is built.',
    outputs: ['GO — cleared to proceed', 'WAIT — corrective pause; gaps identified', 'NO-GO — conditions do not support forward movement'],
    connector: 'Exposure revealed. Operator knows where they stand →',
    accentColor: '#C5A059',
    accentDim: 'rgba(197,160,89,0.55)',
    accentBg: 'rgba(197,160,89,0.04)',
    accentBorder: 'rgba(197,160,89,0.18)',
    href: '/reach-diagnostic',
    cta: 'Run REACH →',
  },
  {
    code: '02',
    tag: 'GROUND 0',
    title: 'Wisdom & Orientation Layer',
    description: 'Ground 0 forms posture before the build begins. It is the first briefing on order, consequence, stewardship, and the real cost of building without structure. Ground 0 is a free module — it is not the assessment, not a gate, and not contingent on a REACH result. Any operator can begin it.',
    outputs: ['Order before motion — established', 'Consequence before confidence — understood', 'Stewardship and operating discipline — oriented'],
    connector: 'Posture formed. The operator understands the stakes →',
    accentColor: 'rgba(197,160,89,0.70)',
    accentDim: 'rgba(197,160,89,0.40)',
    accentBg: 'rgba(197,160,89,0.025)',
    accentBorder: 'rgba(197,160,89,0.12)',
    href: '/ground-0-briefing',
    cta: 'Begin Ground 0 — Free →',
  },
  {
    code: '03',
    tag: 'THE FOUR PILLARS',
    title: 'The Guard Around the Authority',
    description: 'The Four Pillars form the protective structure around the authority. They are the guard — not AUTO. Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen. Each pillar addresses a distinct zone of operational vulnerability. Without all four, the structure has gaps.',
    outputs: ['Authority Protection — legal and operational standing secured', 'Insurance Continuity — coverage gaps closed', 'Compliance Backbone — records and procedures installed', 'Cash-Flow Oxygen — financial operating rhythm established'],
    connector: 'Guard structure in place. Now map the breach paths →',
    accentColor: 'rgba(61,153,112,0.85)',
    accentDim: 'rgba(61,153,112,0.45)',
    accentBg: 'rgba(61,153,112,0.025)',
    accentBorder: 'rgba(61,153,112,0.15)',
    href: '/doctrine',
    cta: 'View the Four Pillars →',
  },
  {
    code: '04',
    tag: 'AUTO',
    title: 'Breach-Path Model',
    description: 'AUTO maps the four ways failure tries to get past the guard: Around, Under, Through, and Over. AUTO is the breach map — not the guard itself. Understanding AUTO means understanding the directions from which threats travel before naming the threats themselves.',
    outputs: ['Around — regulatory exposure bypasses the operator', 'Under — financial exposure undermines the operation', 'Through — documentation exposure penetrates the record', 'Over — timeline exposure overwhelms the authority'],
    connector: 'Breach paths mapped. Now name the threats →',
    accentColor: 'rgba(192,57,43,0.75)',
    accentDim: 'rgba(192,57,43,0.40)',
    accentBg: 'rgba(192,57,43,0.025)',
    accentBorder: 'rgba(192,57,43,0.15)',
    href: '/standards/auto-method',
    cta: 'View AUTO →',
  },
  {
    code: '05',
    tag: 'THE 16 DEADLY SINS',
    title: 'Threat Taxonomy',
    description: 'The 16 Deadly Sins are the recurring, preventable failures that weaken, expose, or damage new carriers during the New Entrant period. They are not random errors — they are named, predictable, and avoidable. These are the threats the guard is built to resist.',
    outputs: ['Records failures — named and catalogued', 'Insurance failures — named and catalogued', 'Driver qualification failures — named and catalogued', 'Financial failures — named and catalogued'],
    connector: 'Threats named. Now install the protection →',
    accentColor: 'rgba(192,57,43,0.55)',
    accentDim: 'rgba(192,57,43,0.30)',
    accentBg: 'rgba(192,57,43,0.025)',
    accentBorder: 'rgba(192,57,43,0.12)',
    href: '/standards/16-deadly-sins',
    cta: 'View Threat List →',
  },
  {
    code: '06',
    tag: 'MODULES',
    title: 'Installation Sequence',
    description: 'The modules install the protection in practice through files, records, controls, procedures, rhythms, and operating discipline. Nine modules. A 90-day sequence. Each module addresses a specific exposure area and installs the safeguard that blocks the named threats.',
    outputs: ['Authority and registration infrastructure — installed', 'Driver qualification file system — installed', 'Drug and alcohol program — installed', 'Hours of service and ELD controls — installed', 'Preventive maintenance records — installed'],
    connector: null,
    accentColor: 'rgba(34,197,94,0.65)',
    accentDim: 'rgba(34,197,94,0.35)',
    accentBg: 'rgba(34,197,94,0.025)',
    accentBorder: 'rgba(34,197,94,0.12)',
    href: '/admission',
    cta: 'Request Admission →',
  },
];

const DOCTRINE_STATEMENT = [
  { bold: 'REACH reveals the exposure.', text: ' The readiness and awareness diagnostic shows how exposed the operation is and whether the operator should proceed, wait, or stop.' },
  { bold: 'Ground 0 forms the posture.', text: ' The free orientation module prepares the operator with the right order, consequence-awareness, and stewardship before anything is built.' },
  { bold: 'The Four Pillars are the guard.', text: ' Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen form the protective structure around the authority.' },
  { bold: 'AUTO is the breach map.', text: ' It shows the four directions from which failure tries to get past the guard: Around, Under, Through, and Over.' },
  { bold: 'The 16 Deadly Sins are the threats.', text: ' Named, preventable failures that weaken, expose, or damage new carriers during the New Entrant period.' },
  { bold: 'The modules install the protection.', text: ' Nine modules, 90 days, converting readiness into a functioning compliance operating system.' },
];

export default function DoctrinePage() {
  return (
    <>
      <Head>
        <title>The LaunchPath Doctrine — Protection System Architecture</title>
        <meta name="description" content="The official doctrine: REACH reveals exposure. Ground 0 forms posture. Four Pillars create the guard. AUTO maps breach paths. 16 Deadly Sins name the threats. Modules install the protection." />
        <meta property="og:title" content="The LaunchPath Doctrine — Protection System Architecture" />
        <meta property="og:description" content="Six layers. Fixed sequence. REACH → Ground 0 → Four Pillars → AUTO → 16 Deadly Sins → Modules. Each layer has a locked role. None are interchangeable." />
        <meta property="og:image" content="https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/770283a28f0943b658338a9780cdf7c4f8f9512eb2e23c85fa53df324bc12d56.png" />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="LaunchPath Doctrine Map: The Protection System — REACH, Ground 0, Four Pillars, AUTO, 16 Deadly Sins, Modules" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://launchpathedu.com/doctrine" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The LaunchPath Doctrine — Protection System Architecture" />
        <meta name="twitter:description" content="REACH reveals. Ground 0 forms. Four Pillars guard. AUTO maps. 16 Sins name. Modules install. Six layers, fixed sequence." />
        <meta name="twitter:image" content="https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/770283a28f0943b658338a9780cdf7c4f8f9512eb2e23c85fa53df324bc12d56.png" />
      </Head>

      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: BODY }}>
        <Navbar />

        {/* ── Hero ── */}
        <div style={{ background: C.bgMid, borderBottom: `1px solid ${C.border}`, padding: '72px 24px 64px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', color: C.goldDim, textTransform: 'uppercase', margin: '0 0 20px' }}>
              LP-SYSTEM · LAUNCHPATH TRANSPORTATION EDU
            </p>
            <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#FFFFFF', margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              The LaunchPath Doctrine
            </h1>
            <p style={{ fontFamily: BODY, fontSize: '17px', color: C.textMuted, lineHeight: 1.75, margin: '0', maxWidth: 580 }}>
              LaunchPath operates on six distinct, ordered layers. Each layer has one specific function. None of those functions belong to another layer. This page documents the system architecture.
            </p>
          </div>
        </div>

        {/* ── System Flow ── */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '72px 24px' }}>

          {LAYERS.map((layer, i) => (
            <div key={layer.code}>
              {/* Layer block */}
              <div
                data-testid={`doctrine-layer-${layer.code}`}
                style={{
                  display: 'flex',
                  gap: '0',
                  position: 'relative',
                }}
              >
                {/* Left column: code + vertical line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
                  {/* Code badge */}
                  <div style={{
                    width: 40, height: 40, border: `1px solid ${layer.accentBorder}`,
                    background: layer.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: layer.accentColor, letterSpacing: '0.05em' }}>
                      {layer.code}
                    </span>
                  </div>
                  {/* Vertical line */}
                  {i < LAYERS.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: C.border, marginTop: 4 }} />
                  )}
                </div>

                {/* Right column: content */}
                <div style={{ flex: 1, paddingLeft: 24, paddingBottom: i < LAYERS.length - 1 ? 0 : 0 }}>
                  {/* Tag + title */}
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.20em', color: layer.accentDim, textTransform: 'uppercase', margin: '0 0 6px' }}>
                      {layer.tag}
                    </p>
                    <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#FFFFFF', margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                      {layer.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p style={{ fontFamily: BODY, fontSize: '15px', color: C.textMuted, lineHeight: 1.75, margin: '0 0 20px', maxWidth: 540 }}>
                    {layer.description}
                  </p>

                  {/* Outputs */}
                  <div style={{ marginBottom: 28, borderLeft: `2px solid ${layer.accentBorder}`, paddingLeft: 16 }}>
                    {layer.outputs.map((output) => (
                      <div key={output} style={{ display: 'flex', gap: 10, marginBottom: 6, alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: MONO, fontSize: '10px', color: layer.accentDim, flexShrink: 0, paddingTop: '3px', fontWeight: 700 }}>·</span>
                        <span style={{ fontFamily: BODY, fontSize: '13px', color: C.textDim, lineHeight: 1.6 }}>{output}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={layer.href}
                    data-testid={`doctrine-cta-${layer.code}`}
                    style={{
                      display: 'inline-block',
                      fontFamily: MONO,
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: layer.accentColor,
                      textDecoration: 'none',
                      borderBottom: `1px solid ${layer.accentBorder}`,
                      paddingBottom: '2px',
                      marginBottom: 40,
                      opacity: 0.85,
                      transition: 'opacity 0.15s',
                    }}
                    onMouseOver={e => e.currentTarget.style.opacity = '1'}
                    onMouseOut={e => e.currentTarget.style.opacity = '0.85'}
                  >
                    {layer.cta}
                  </Link>
                </div>
              </div>

              {/* Connector between layers */}
              {layer.connector && (
                <div style={{ display: 'flex', gap: 0, marginBottom: 0 }}>
                  {/* Align with the vertical line */}
                  <div style={{ width: 56, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 1, background: C.border }} />
                  </div>
                  {/* Connector text */}
                  <div style={{ flex: 1, paddingLeft: 24, paddingBottom: 36, paddingTop: 0 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, padding: '8px 16px' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.border, flexShrink: 0 }} />
                      <span style={{ fontFamily: MONO, fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: C.textDim, textTransform: 'uppercase' }}>
                        {layer.connector}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* ── Doctrine Statement ── */}
          <div
            data-testid="doctrine-statement"
            style={{
              border: `1px solid ${C.borderGold}`,
              borderLeft: `3px solid rgba(197,160,89,0.50)`,
              background: 'rgba(197,160,89,0.02)',
              padding: '32px 32px',
              marginTop: '16px',
              marginBottom: '48px',
            }}
          >
            <p style={{ fontFamily: MONO, fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: C.goldDim, textTransform: 'uppercase', margin: '0 0 20px' }}>
              THE DOCTRINE — LOCKED STATEMENT
            </p>
            {DOCTRINE_STATEMENT.map(({ bold, text }, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: '15px', color: C.textMuted, lineHeight: 1.8, margin: '0 0 10px' }}>
                <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>{bold}</strong>{text}
              </p>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/reach-diagnostic"
              data-testid="doctrine-begin-reach-cta"
              style={{
                display: 'inline-block',
                background: C.gold,
                color: '#000F1F',
                fontFamily: MONO,
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '16px 32px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#d4b87a'}
              onMouseOut={e => e.currentTarget.style.background = C.gold}
            >
              Begin with REACH &rarr;
            </Link>
            <Link
              href="/ground-0-briefing"
              data-testid="doctrine-ground0-cta"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: C.textMuted,
                fontFamily: MONO,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '16px 24px',
                textDecoration: 'none',
                border: `1px solid ${C.border}`,
                transition: 'all 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'; e.currentTarget.style.color = C.text; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
            >
              Enter Ground 0 &rarr;
            </Link>
          </div>

          {/* Footer note */}
          <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.12em', color: C.textDim, textTransform: 'uppercase', margin: '48px 0 0' }}>
            LP-SYSTEM &nbsp;·&nbsp; launchpathedu.com &nbsp;·&nbsp; Content does not constitute legal, compliance, or financial advice.
          </p>
        </div>

        <FooterSection />
      </div>
    </>
  );
}
