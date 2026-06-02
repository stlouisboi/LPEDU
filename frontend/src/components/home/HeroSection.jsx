import { Link } from '../../compat/Link';
import { Shield } from 'lucide-react';
import VRFCredentialCard from '../shared/VRFCredentialCard';

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
            <span style={{ ...mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280' }}>FMCSA 90-Day Compliance Implementation Cohort</span>
          </div>

          {/* Sub-headline — Addition 1 */}
          <p style={{ ...mono, fontSize: '0.925rem', letterSpacing: '0.01em', color: 'rgba(28,43,58,0.60)', lineHeight: 1.65, marginBottom: '1.25rem', maxWidth: 520, fontWeight: 500 }}>
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
            <span style={{ ...mono, fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', color: '#6B7280' }}>[LAT: 38.0931] [LNG: -95.7129]</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
              <span style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#059669' }}>SYSTEM STATUS: ACTIVE</span>
            </div>
          </div>

          {/* Card frame */}
          <div style={{ border: '1px solid rgba(28,43,58,0.2)', padding: 3, background: '#F5F2EC', boxShadow: '0 20px 60px rgba(28,43,58,0.12)' }}>
            <VRFCredentialCard size="hero" />
          </div>

          {/* Addition 2 — Credential explainer */}
          <p style={{ ...mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(28,43,58,0.60)', lineHeight: 1.6, margin: '0.625rem 0 0', paddingLeft: 2 }}>
            Issued on a clean Week&nbsp;11 Integrity Audit — driver files, drug program, HOS, maintenance records, and authority documentation.
          </p>

          {/* Metadata grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(28,43,58,0.1)', marginTop: '0.625rem' }}>
            {CARD_META.map((m, i) => (
              <div key={i} style={{ background: '#FAF8F4', padding: '0.75rem 1rem' }}>
                <div style={{ ...mono, fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 2 }}>{m.label}</div>
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
                <div style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.75)', marginBottom: 4 }}>{col.label}</div>
                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.04em', color: 'rgba(250,248,244,0.85)', lineHeight: 1.55, fontWeight: 600 }}>{col.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
