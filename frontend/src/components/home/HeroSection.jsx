import { Link } from '../../compat/Link';
import { Shield } from 'lucide-react';

const CARD_META = [
  { label: 'Credential Issued', value: 'Verified Registry ID' },
  { label: 'Verification Level', value: 'Five Station Custodian Audits' },
  { label: 'Pre-Audit Simulation', value: 'Week 11 Integrity Audit' },
  { label: 'Cohort Capacity', value: '12 Carriers · LP-COH-002' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace' };

export default function HeroSection() {
  return (
    <section className="lp-blueprint" style={{ background: '#FAF8F4', padding: 'clamp(4rem,8vw,7rem) 1.5rem clamp(3rem,6vw,5rem)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="lp-hero-grid">

        {/* Left — Copy */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(28,43,58,0.15)', padding: '0.4rem 0.9rem', marginBottom: '1.25rem' }}>
            <Shield size={11} color="#C8A96E" />
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280' }}>FMCSA 90-Day Compliance Implementation Cohort</span>
          </div>

          {/* Sub-headline — Addition 1 */}
          <p style={{ ...mono, fontSize: '0.8rem', letterSpacing: '0.01em', color: 'rgba(28,43,58,0.60)', lineHeight: 1.65, marginBottom: '1.25rem', maxWidth: 520, fontWeight: 400 }}>
            Twelve weeks to install the compliance system FMCSA will inspect — a clean audit preserves the authority; an empty file ends it.
          </p>

          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(2.4rem,5vw,4.2rem)', color: '#1C2B3A', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            Install the compliance system FMCSA expects to find before they open your file.
          </h1>

          <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '1.05rem', color: 'rgba(45,55,72,0.75)', lineHeight: 1.8, marginBottom: '2.25rem', maxWidth: 520 }}>
            A 90-day, 12-carrier guided implementation program where safety director Vince Lawrence personally reviews your actual driver, equipment, hours-of-service, and drug-and-alcohol files at five critical checkpoints — securing your authority before an investigator exposes the gaps.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/ground-0-briefing" data-testid="hero-primary-cta" style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#1C2B3A', color: '#FAF8F4', padding: '0.8rem 1.6rem', textDecoration: 'none', borderRadius: 0, fontWeight: 700 }}>
              Request Ground 0 Briefing →
            </Link>
            <Link to="/reach-diagnostic" data-testid="hero-reach-cta" style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C2B3A', border: '1px solid rgba(28,43,58,0.3)', padding: '0.8rem 1.4rem', textDecoration: 'none', borderRadius: 0 }}>
              Run REACH Diagnostic
            </Link>
          </div>
        </div>

        {/* Right — Registry ID Card */}
        <div>
          {/* Telemetry strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, padding: '0 2px' }}>
            <span style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', color: '#6B7280' }}>[LAT: 38.0931] [LNG: -95.7129]</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
              <span style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', color: '#059669' }}>SYSTEM STATUS: ACTIVE</span>
            </div>
          </div>

          {/* Card frame */}
          <div style={{ border: '1px solid rgba(28,43,58,0.2)', padding: 3, background: '#F5F2EC', boxShadow: '0 20px 60px rgba(28,43,58,0.12)' }}>
            {/* Premium code-rendered credential card */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1.586',
              background: 'linear-gradient(150deg, #111820 0%, #0c1219 45%, #07090e 100%)',
              overflow: 'hidden',
              boxSizing: 'border-box',
              // Double-border treatment: outer gold + inner dark gap
              boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.30), inset 0 0 0 3px rgba(0,0,0,0.6), inset 0 0 0 4px rgba(200,169,110,0.12)',
            }}>

              {/* ── Background elements ───────────────────────────── */}

              {/* Large watermark "LP" */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -52%)', pointerEvents: 'none', userSelect: 'none' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, fontSize: 'clamp(7rem,14vw,11rem)', color: 'rgba(200,169,110,0.04)', letterSpacing: '-0.04em', display: 'block', lineHeight: 1 }}>LP</span>
              </div>

              {/* Diagonal fine-line security pattern */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(60deg, transparent, transparent 12px, rgba(200,169,110,0.025) 12px, rgba(200,169,110,0.025) 13px)',
              }} />

              {/* Radial gold glow behind center text */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* ── Top accent line ────────────────────────────────── */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.4) 20%, #C8A96E 50%, rgba(200,169,110,0.4) 80%, transparent 100%)' }} />

              {/* ── Corner security marks ─────────────────────────── */}
              {[
                { top: 10, left: 10,  borderTop: '1.5px solid rgba(200,169,110,0.55)', borderLeft: '1.5px solid rgba(200,169,110,0.55)' },
                { top: 10, right: 10, borderTop: '1.5px solid rgba(200,169,110,0.55)', borderRight: '1.5px solid rgba(200,169,110,0.55)' },
                { bottom: 10, left: 10,  borderBottom: '1.5px solid rgba(200,169,110,0.55)', borderLeft: '1.5px solid rgba(200,169,110,0.55)' },
                { bottom: 10, right: 10, borderBottom: '1.5px solid rgba(200,169,110,0.55)', borderRight: '1.5px solid rgba(200,169,110,0.55)' },
              ].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
              ))}

              {/* ── Card content ──────────────────────────────────── */}
              <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: 'clamp(0.9rem,2vw,1.5rem) clamp(1rem,2vw,1.75rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>

                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ ...mono, fontSize: 'clamp(0.42rem,0.7vw,0.55rem)', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', margin: '0 0 0.15rem' }}>LP-SYS-001 · LPOS v1.0</p>
                    <p style={{ ...mono, fontWeight: 900, fontSize: 'clamp(1.4rem,2.8vw,2.1rem)', color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>LP</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ ...mono, fontSize: 'clamp(0.38rem,0.6vw,0.5rem)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.45)', margin: '0 0 0.15rem' }}>ISSUED BY</p>
                    <p style={{ ...mono, fontSize: 'clamp(0.38rem,0.6vw,0.5rem)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0 }}>LAUNCHPATH EDU LLC</p>
                  </div>
                </div>

                {/* Top divider */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(200,169,110,0.5), rgba(200,169,110,0.08) 80%, transparent)', margin: '0.1rem 0' }} />

                {/* ── CENTER: Credential block ── */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 'clamp(0.2rem,0.5vw,0.4rem)', padding: '0.2rem 0' }}>

                  <p style={{ ...mono, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.65)', margin: 0 }}>
                    VERIFIED REGISTRY ID
                  </p>

                  {/* Carrier name — the focal point */}
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: 'clamp(0.75rem,1.5vw,1.1rem)',
                    color: '#FFFFFF',
                    letterSpacing: '0.06em',
                    margin: 'clamp(0.1rem,0.3vw,0.25rem) 0',
                    lineHeight: 1.2,
                  }}>
                    CARRIER NAME · VERIFIED.
                  </p>

                  {/* Registry ID */}
                  <div style={{ border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(0.15rem,0.4vw,0.3rem) clamp(0.5rem,1vw,0.85rem)', background: 'rgba(200,169,110,0.05)' }}>
                    <p style={{ ...mono, fontSize: 'clamp(0.6rem,1.1vw,0.82rem)', fontWeight: 700, letterSpacing: '0.16em', color: '#d4900a', margin: 0 }}>
                      LP-VRF-0941
                    </p>
                  </div>
                </div>

                {/* Bottom divider */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(200,169,110,0.5), rgba(200,169,110,0.08) 80%, transparent)', margin: '0.1rem 0' }} />

                {/* Footer row */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ ...mono, fontSize: 'clamp(0.42rem,0.7vw,0.56rem)', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8A96E', margin: '0 0 0.1rem' }}>
                      LAUNCHPATH STANDARD
                    </p>
                    <p style={{ ...mono, fontSize: 'clamp(0.36rem,0.55vw,0.46rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
                      FMCSA MOTOR CARRIER COMPLIANCE
                    </p>
                  </div>

                  {/* Seal */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ position: 'relative', width: 'clamp(24px,3vw,32px)', height: 'clamp(24px,3vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Outer ring */}
                      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(200,169,110,0.4)', background: 'radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)' }} />
                      <Shield size={16} color="#C8A96E" strokeWidth={1.5} />
                    </div>
                    <p style={{ ...mono, fontSize: 'clamp(0.3rem,0.45vw,0.38rem)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', margin: 0 }}>
                      VERIFIED
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Addition 2 — Credential explainer */}
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.06em', color: 'rgba(28,43,58,0.50)', lineHeight: 1.6, margin: '0.625rem 0 0', paddingLeft: 2 }}>
            Issued on a clean Week&nbsp;11 Integrity Audit — driver files, drug program, HOS, maintenance records, and authority documentation.
          </p>

          {/* Metadata grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(28,43,58,0.1)', marginTop: '0.625rem' }}>
            {CARD_META.map((m, i) => (
              <div key={i} style={{ background: '#FAF8F4', padding: '0.75rem 1rem' }}>
                <div style={{ ...mono, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 2 }}>{m.label}</div>
                <div style={{ ...mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C2B3A', fontWeight: 700 }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Addition 3 — Three-column scope strip */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(28,43,58,0.1)', marginTop: '1px' }}>
            {[
              { label: 'Duration',  value: '12 weeks · 69 lessons · 10 modules' },
              { label: 'Scope',     value: 'Driver qualification · drug & alcohol · HOS · maintenance · insurance · authority continuity' },
              { label: 'Outcome',   value: 'Verified Registry ID on clean Integrity Audit.' },
            ].map((col) => (
              <div key={col.label} style={{ background: '#1C2B3A', padding: '0.75rem 1rem' }}>
                <div style={{ ...mono, fontSize: 7, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.65)', marginBottom: 4 }}>{col.label}</div>
                <div style={{ ...mono, fontSize: 8, letterSpacing: '0.04em', color: 'rgba(250,248,244,0.82)', lineHeight: 1.55, fontWeight: 600 }}>{col.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
