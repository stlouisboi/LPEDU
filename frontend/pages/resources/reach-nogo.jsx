import { useEffect, useState } from 'react';
import Head from 'next/head';

const API = process.env.REACT_APP_BACKEND_URL || '';

const C = {
  bg: '#0a0f1a',
  text: 'rgba(255,255,255,0.85)',
  textMuted: 'rgba(255,255,255,0.48)',
  textDim: 'rgba(255,255,255,0.28)',
  border: 'rgba(255,255,255,0.07)',
  red: 'rgba(248,113,113,0.55)',
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
    body: JSON.stringify({ event, outcome: 'NO-GO', metadata }),
  }).catch(() => {});
}

export default function ReachNoGoStatus() {
  const [holdConfirmed, setHoldConfirmed] = useState(false);

  useEffect(() => {
    track('reach_nogo_page_view');
  }, []);

  const handleHold = () => {
    track('reach_nogo_hold_click');
    setHoldConfirmed(true);
  };

  return (
    <>
      <Head>
        <title>NO-GO Status | LaunchPath REACH</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: S.body }}>
        {/* Minimal header */}
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            LP-REACH · LaunchPath Transportation EDU
          </span>
          <span style={{ fontFamily: S.mono, fontSize: '9px', letterSpacing: '0.12em', color: C.red, textTransform: 'uppercase' }}>
            STATUS: NO-GO
          </span>
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 32px' }}>

          {/* Outcome label */}
          <p style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', color: C.red, textTransform: 'uppercase', margin: '0 0 24px' }}>
            LP-STATUS: REACH — BOUNDARY / NO-GO
          </p>

          {/* Headline */}
          <h1 style={{ fontFamily: S.serif, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Your REACH result is NO-GO.
          </h1>

          {/* Subline */}
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.textMuted, lineHeight: 1.7, margin: '0 0 40px' }}>
            This result has been recorded. Your information has been preserved for future follow-up.
          </p>

          <div style={{ height: '1px', background: C.border, margin: '0 0 40px' }} />

          {/* What NO-GO means */}
          <p style={{ fontFamily: S.mono, fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', margin: '0 0 16px' }}>
            WHAT THIS RESULT MEANS
          </p>
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.text, lineHeight: 1.8, margin: '0 0 16px' }}>
            A NO-GO result is a boundary, not a sales objection.
          </p>
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.text, lineHeight: 1.8, margin: '0 0 16px' }}>
            Based on your current position, moving forward into the LaunchPath program would not be the correct step. This is not about permanent ineligibility. It is about present conditions that do not support the next step.
          </p>
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.text, lineHeight: 1.8, margin: '0 0 16px' }}>
            REACH exists to mark that line clearly — before forward movement creates damage that is harder to reverse than the pause would have been.
          </p>
          <p style={{ fontFamily: S.body, fontSize: '15px', color: C.text, lineHeight: 1.8, margin: '0 0 40px' }}>
            The correct move at this point is restraint. Not pressure, not urgency — restraint.
          </p>

          <div style={{ height: '1px', background: C.border, margin: '0 0 40px' }} />

          {/* Status record */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, borderLeft: `3px solid rgba(248,113,113,0.30)`, padding: '24px 28px', marginBottom: '40px' }}>
            <p style={{ fontFamily: S.mono, fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(248,113,113,0.45)', textTransform: 'uppercase', margin: '0 0 16px' }}>
              STATUS RECORD
            </p>
            {[
              'Your NO-GO result has been recorded.',
              'You have not been cleared to proceed at this time.',
              'Your information has been preserved for future follow-up.',
              'Re-entry is possible later, if conditions materially change.',
              'A fresh REACH assessment will be required before any re-entry.',
            ].map((line) => (
              <div key={line} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ color: 'rgba(248,113,113,0.40)', fontWeight: 700, flexShrink: 0, fontFamily: S.mono, fontSize: '11px', marginTop: '1px' }}>·</span>
                <span style={{ fontFamily: S.body, fontSize: '14px', color: C.textMuted, lineHeight: 1.65 }}>{line}</span>
              </div>
            ))}
          </div>

          {/* CTA — inline confirm, no re-entry push */}
          {holdConfirmed ? (
            <div
              data-testid="reach-nogo-hold-confirmed"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, borderLeft: `3px solid rgba(255,255,255,0.20)`, padding: '24px 28px' }}
            >
              <p style={{ fontFamily: S.mono, fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', margin: '0 0 12px' }}>
                YOUR STATUS HAS BEEN PRESERVED
              </p>
              <p style={{ fontFamily: S.body, fontSize: '14px', color: C.textMuted, lineHeight: 1.7, margin: 0 }}>
                You remain on the list for future follow-up. If circumstances change later, REACH can be revisited from a different starting point.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                data-testid="reach-nogo-remain-btn"
                onClick={handleHold}
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: S.mono,
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '16px 32px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.40)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
              >
                Remain on the List
              </button>
              <p style={{ fontFamily: S.body, fontSize: '12px', color: C.textDim, lineHeight: 1.6, margin: 0 }}>
                This confirms your holding status. No further action is required at this time.
              </p>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: '72px', borderTop: `1px solid ${C.border}`, paddingTop: '24px' }}>
            <p style={{ fontFamily: S.mono, fontSize: '9px', letterSpacing: '0.12em', color: C.textDim, textTransform: 'uppercase', margin: 0 }}>
              LP-REACH &nbsp;·&nbsp; launchpathedu.com &nbsp;·&nbsp; Content does not constitute legal, compliance, or financial advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
