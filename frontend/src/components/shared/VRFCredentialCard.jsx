/**
 * VRFCredentialCard — Reusable premium code-rendered credential card.
 *
 * Props:
 *   carrierName  string  Carrier / operator name displayed on the card
 *   registryId   string  LP-VRF-XXXXXXXX identifier
 *   issuedAt     string  ISO date string (optional — shown in footer when provided)
 *   size         "hero" | "full"  Controls font scale (clamp-based vs fixed-px)
 */
import { Shield } from 'lucide-react';

const mono = { fontFamily: "'JetBrains Mono', 'Courier New', monospace" };

// Font size tokens per size variant
const T = {
  hero: {
    sysCode:     'clamp(0.42rem,0.7vw,0.55rem)',
    logoMark:    'clamp(1.4rem,2.8vw,2.1rem)',
    issuedBy:    'clamp(0.38rem,0.6vw,0.5rem)',
    vrfLabel:    'clamp(0.4rem,0.65vw,0.52rem)',
    carrierName: 'clamp(0.75rem,1.5vw,1.1rem)',
    registryId:  'clamp(0.6rem,1.1vw,0.82rem)',
    footer:      'clamp(0.42rem,0.7vw,0.56rem)',
    footerSub:   'clamp(0.36rem,0.55vw,0.46rem)',
    sealLabel:   'clamp(0.3rem,0.45vw,0.38rem)',
    watermark:   'clamp(7rem,14vw,11rem)',
    padding:     'clamp(0.9rem,2vw,1.5rem) clamp(1rem,2vw,1.75rem)',
    sealSize:    'clamp(24px,3vw,32px)',
    sealIcon:    16,
    corner:      14,
  },
  full: {
    sysCode:     '0.65rem',
    logoMark:    '2.4rem',
    issuedBy:    '0.58rem',
    vrfLabel:    '0.62rem',
    carrierName: '1.35rem',
    registryId:  '1.0rem',
    footer:      '0.65rem',
    footerSub:   '0.54rem',
    sealLabel:   '0.46rem',
    watermark:   '10rem',
    padding:     '1.75rem 2rem',
    sealSize:    '40px',
    sealIcon:    20,
    corner:      18,
  },
};

export default function VRFCredentialCard({
  carrierName = 'CARRIER NAME · VERIFIED.',
  registryId  = 'LP-VRF-0941',
  issuedAt    = null,
  size        = 'hero',
}) {
  const t = T[size] || T.hero;
  const issuedLabel = issuedAt
    ? new Date(issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div data-testid="vrf-credential-card" style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1.586',
      background: 'linear-gradient(150deg, #111820 0%, #0c1219 45%, #07090e 100%)',
      overflow: 'hidden',
      boxSizing: 'border-box',
      boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.30), inset 0 0 0 3px rgba(0,0,0,0.6), inset 0 0 0 4px rgba(200,169,110,0.12)',
    }}>

      {/* ── Background: watermark LP ──────────────────────────── */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -52%)', pointerEvents: 'none', userSelect: 'none' }}>
        <span style={{ ...mono, fontWeight: 900, fontSize: t.watermark, color: 'rgba(200,169,110,0.04)', letterSpacing: '-0.04em', display: 'block', lineHeight: 1 }}>LP</span>
      </div>

      {/* ── Background: diagonal security lines ──────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(60deg, transparent, transparent 12px, rgba(200,169,110,0.025) 12px, rgba(200,169,110,0.025) 13px)' }} />

      {/* ── Background: radial gold glow ─────────────────────── */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── Top accent bar ────────────────────────────────────── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.4) 20%, #C8A96E 50%, rgba(200,169,110,0.4) 80%, transparent 100%)' }} />

      {/* ── Corner security marks ─────────────────────────────── */}
      {[
        { top: 10,    left: 10,    borderTop: '1.5px solid rgba(200,169,110,0.55)',    borderLeft:   '1.5px solid rgba(200,169,110,0.55)' },
        { top: 10,    right: 10,   borderTop: '1.5px solid rgba(200,169,110,0.55)',    borderRight:  '1.5px solid rgba(200,169,110,0.55)' },
        { bottom: 10, left: 10,    borderBottom: '1.5px solid rgba(200,169,110,0.55)', borderLeft:   '1.5px solid rgba(200,169,110,0.55)' },
        { bottom: 10, right: 10,   borderBottom: '1.5px solid rgba(200,169,110,0.55)', borderRight:  '1.5px solid rgba(200,169,110,0.55)' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: t.corner, height: t.corner, ...s }} />
      ))}

      {/* ── Card content ──────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: t.padding, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ ...mono, fontSize: t.sysCode, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.78)', margin: '0 0 0.15rem' }}>LP-SYS-001 · LPOS v1.0</p>
            <p style={{ ...mono, fontWeight: 900, fontSize: t.logoMark, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>LP</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ ...mono, fontSize: t.issuedBy, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.75)', margin: '0 0 0.15rem' }}>ISSUED BY</p>
            <p style={{ ...mono, fontSize: t.issuedBy, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.75)', margin: 0 }}>LAUNCHPATH EDU LLC</p>
          </div>
        </div>

        {/* Top divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(200,169,110,0.5), rgba(200,169,110,0.08) 80%, transparent)', margin: '0.1rem 0' }} />

        {/* CENTER: Credential block */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: size === 'full' ? '0.5rem' : 'clamp(0.2rem,0.5vw,0.4rem)', padding: '0.2rem 0' }}>
          <p style={{ ...mono, fontSize: t.vrfLabel, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.65)', margin: 0 }}>
            VERIFIED REGISTRY ID
          </p>

          {/* Carrier name */}
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: t.carrierName, color: '#FFFFFF', letterSpacing: '0.06em', margin: size === 'full' ? '0.35rem 0' : 'clamp(0.1rem,0.3vw,0.25rem) 0', lineHeight: 1.2 }}>
            {carrierName}
          </p>

          {/* Registry ID badge */}
          <div style={{ border: '1px solid rgba(200,169,110,0.2)', padding: size === 'full' ? '0.35rem 1rem' : 'clamp(0.15rem,0.4vw,0.3rem) clamp(0.5rem,1vw,0.85rem)', background: 'rgba(200,169,110,0.05)' }}>
            <p style={{ ...mono, fontSize: t.registryId, fontWeight: 700, letterSpacing: '0.16em', color: '#d4900a', margin: 0 }}>
              {registryId}
            </p>
          </div>

          {/* Issued date — only when provided */}
          {issuedLabel && (
            <p style={{ ...mono, fontSize: t.issuedBy, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.72)', margin: '0.15rem 0 0' }}>
              Issued {issuedLabel}
            </p>
          )}
        </div>

        {/* Bottom divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(200,169,110,0.5), rgba(200,169,110,0.08) 80%, transparent)', margin: '0.1rem 0' }} />

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ ...mono, fontSize: t.footer, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8A96E', margin: '0 0 0.1rem' }}>
              LAUNCHPATH STANDARD
            </p>
            <p style={{ ...mono, fontSize: t.footerSub, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
              FMCSA MOTOR CARRIER COMPLIANCE
            </p>
          </div>

          {/* Seal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ position: 'relative', width: t.sealSize, height: t.sealSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(200,169,110,0.4)', background: 'radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)' }} />
              <Shield size={t.sealIcon} color="#C8A96E" strokeWidth={1.5} />
            </div>
            <p style={{ ...mono, fontSize: t.sealLabel, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.78)', margin: 0 }}>
              VERIFIED
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
