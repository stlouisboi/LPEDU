import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const API = process.env.REACT_APP_BACKEND_URL || '';

const C = {
  bg: '#0a0f1a',
  navy: '#001B36',
  gold: '#C5A059',
  goldDim: 'rgba(197,160,89,0.55)',
  text: 'rgba(255,255,255,0.85)',
  textMuted: 'rgba(255,255,255,0.48)',
  textDim: 'rgba(255,255,255,0.28)',
  border: 'rgba(255,255,255,0.07)',
  borderGold: 'rgba(197,160,89,0.20)',
};
const S = {
  mono: "'JetBrains Mono','IBM Plex Mono','Courier New',monospace",
  body: "'Inter',Helvetica,Arial,sans-serif",
  serif: "'Newsreader','Playfair Display',Georgia,serif",
};

function track(event, metadata = {}) {
  fetch(`${API}/api/ground0/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, outcome: 'WAIT', metadata }),
  }).catch(() => {});
}

export default function Ground0WaitStatus() {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    track('ground0_wait_page_view');
  }, []);

  const handleReturn = () => {
    track('ground0_wait_return_click');
  };

  return (
    <>
      <Head>
        <title>WAIT Status | LaunchPath Ground 0</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: S.body, padding: '0' }}>
        {/* Minimal header */}
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: C.goldDim, textTransform: 'uppercase' }}>
            LP-GRD-0 · LaunchPath Transportation EDU
          </span>
          <span style={{ fontFamily: S.mono, fontSize: '9px', letterSpacing: '0.12em', color: C.textDim, textTransform: 'uppercase' }}>
            STATUS: WAIT
          </span>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 32px' }}>

          {/* Outcome label */}
          <p style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(251,191,36,0.55)', textTransform: 'uppercase', margin: '0 0 24px' }}>
            LP-STATUS: WAIT &nbsp;|&nbsp; CORRECTIVE PAUSE
          </p>

          {/* Headline */}
          <h1 style={{ fontFamily: S.serif, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Your Ground 0 result is WAIT.
          </h1>

          {/* Subline */}
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.textMuted, lineHeight: 1.7, margin: '0 0 40px' }}>
            This result has been recorded. Your place in the process has been preserved.
          </p>

          {/* Divider */}
          <div style={{ height: '1px', background: C.border, margin: '0 0 40px' }} />

          {/* What WAIT means */}
          <p style={{ fontFamily: S.mono, fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: C.goldDim, textTransform: 'uppercase', margin: '0 0 16px' }}>
            WHAT THIS RESULT MEANS
          </p>
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.text, lineHeight: 1.8, margin: '0 0 16px' }}>
            WAIT is not rejection. It is instruction.
          </p>
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.text, lineHeight: 1.8, margin: '0 0 16px' }}>
            Your current position shows conditions that need to be corrected before moving forward is appropriate. Proceeding with those conditions unaddressed creates exposure that becomes harder to correct under active authority.
          </p>
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.text, lineHeight: 1.8, margin: '0 0 40px' }}>
            A pause taken now — with the gaps clearly identified — is a better foundation than a rushed entry into a system that requires those gaps to be closed.
          </p>

          <div style={{ height: '1px', background: C.border, margin: '0 0 40px' }} />

          {/* What to do */}
          <p style={{ fontFamily: S.mono, fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: C.goldDim, textTransform: 'uppercase', margin: '0 0 16px' }}>
            WHAT TO DO NOW
          </p>

          {[
            { label: 'Treat this as instruction', body: 'Use the gaps identified in your REACH results as a correction checklist. Each one has a specific fix.' },
            { label: 'Repair before re-entering', body: 'Do not return to Ground 0 until the conditions that caused the WAIT result have been meaningfully addressed.' },
            { label: 'Return when the foundation is stronger', body: 'When you re-enter, Ground 0 will reassess from the beginning. This is a fresh evaluation, not an automatic continuation.' },
          ].map((item) => (
            <div key={item.label} style={{ borderLeft: `2px solid rgba(197,160,89,0.25)`, paddingLeft: '20px', marginBottom: '24px' }}>
              <p style={{ fontFamily: S.body, fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.02em', margin: '0 0 6px' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: S.body, fontSize: '14px', color: C.textMuted, lineHeight: 1.7, margin: 0 }}>
                {item.body}
              </p>
            </div>
          ))}

          <div style={{ height: '1px', background: C.border, margin: '0 0 40px' }} />

          {/* Status summary */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, borderLeft: `3px solid rgba(197,160,89,0.40)`, padding: '24px 28px', marginBottom: '40px' }}>
            <p style={{ fontFamily: S.mono, fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', color: C.goldDim, textTransform: 'uppercase', margin: '0 0 16px' }}>
              STATUS RECORD
            </p>
            {[
              'Your WAIT result has been recorded.',
              'Your place in the process has been saved.',
              'You will receive follow-up at appropriate intervals.',
              'When you return, a fresh Ground 0 assessment is required.',
            ].map((line) => (
              <div key={line} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ color: C.goldDim, fontWeight: 700, flexShrink: 0, fontFamily: S.mono, fontSize: '11px', marginTop: '1px' }}>·</span>
                <span style={{ fontFamily: S.body, fontSize: '14px', color: C.textMuted, lineHeight: 1.65 }}>{line}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              href="/ground-0-briefing?return=wait"
              data-testid="wait-return-cta"
              onClick={handleReturn}
              style={{
                display: 'inline-block',
                background: C.gold,
                color: '#001830',
                fontFamily: S.mono,
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '16px 32px',
                textDecoration: 'none',
                alignSelf: 'flex-start',
              }}
            >
              Revisit Ground 0 Later →
            </Link>
            <p style={{ fontFamily: S.body, fontSize: '12px', color: C.textDim, lineHeight: 1.6, margin: 0 }}>
              This routes to a fresh Ground 0 entry. Prior WAIT metadata is preserved for continuity.
            </p>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '72px', borderTop: `1px solid ${C.border}`, paddingTop: '24px' }}>
            <p style={{ fontFamily: S.mono, fontSize: '9px', letterSpacing: '0.12em', color: C.textDim, textTransform: 'uppercase', margin: 0 }}>
              LP-GRD-0 &nbsp;·&nbsp; launchpathedu.com &nbsp;·&nbsp; Content does not constitute legal, compliance, or financial advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
