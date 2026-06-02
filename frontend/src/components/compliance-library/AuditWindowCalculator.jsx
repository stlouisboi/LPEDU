import { useState } from 'react';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

const PHASES = [
  { label: 'INSTALLATION PHASE',  days: [0, 182],       color: '#4ade80',  status: 'OPEN',     ctaLabel: 'INSTALL THE DOCUMENT SYSTEM — $499 →', ctaHref: '#bundle' },
  { label: 'CRITICAL WINDOW',     days: [183, 365],      color: '#f59e0b',  status: 'CLOSING',  ctaLabel: 'RUN REACH DIAGNOSTIC FIRST — FREE →', ctaHref: '/reach-diagnostic' },
  { label: 'PRE-AUDIT TERRITORY', days: [366, 548],      color: '#ef4444',  status: 'CRITICAL', ctaLabel: 'REQUEST GROUND 0 BRIEFING →', ctaHref: '/ground-0-briefing' },
  { label: 'AUDIT ELIGIBLE',      days: [549, Infinity], color: '#dc2626',  status: 'CRITICAL', ctaLabel: 'REQUEST GROUND 0 BRIEFING →', ctaHref: '/ground-0-briefing' },
];

function getPhase(elapsed) {
  return PHASES.find(p => elapsed >= p.days[0] && elapsed <= p.days[1]) || PHASES[3];
}

export default function AuditWindowCalculator() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState(null);

  const compute = (val) => {
    setDate(val);
    if (!val) { setResult(null); return; }
    const granted = new Date(val);
    const today = new Date();
    const elapsed = Math.max(0, Math.floor((today - granted) / 86400000));
    const windowDays = 548;
    const remaining = Math.max(0, windowDays - elapsed);
    const phase = getPhase(elapsed);
    setResult({ elapsed, remaining, phase });
  };

  return (
    <section data-testid="cl-audit-calculator" style={{ background: NAVY, borderTop: `1px solid rgba(250,248,244,0.08)`, borderBottom: `1px solid rgba(250,248,244,0.08)`, padding: 'clamp(3rem,6vw,5rem) 1.5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>
            LP-TOOL-WIN · NEW CARRIER AUDIT WINDOW CALCULATOR
          </p>
          <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(139,115,85,0.2)', color: GOLD, padding: '0.15rem 0.5rem' }}>FREE</span>
        </div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#FAF8F4', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          How Much of Your Audit Window Is Left?
        </h2>
        <p style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(250,248,244,0.85)', lineHeight: 1.75, marginBottom: '2rem' }}>
          FMCSA targets new carriers for a safety audit within 18 months of authority grant. Enter your MC effective date.
        </p>

        {/* Date input */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.78)', display: 'block', marginBottom: '0.5rem' }}>
            MC/DOT AUTHORITY GRANT DATE
          </label>
          <input
            type="date"
            value={date}
            onChange={e => compute(e.target.value)}
            data-testid="cl-audit-date-input"
            style={{ fontFamily: MONO, fontSize: '16px', background: 'rgba(250,248,244,0.08)', border: `1px solid rgba(250,248,244,0.2)`, color: '#FAF8F4', padding: '0.875rem 1rem', minHeight: 52, width: '100%', maxWidth: 320, borderRadius: 0, outline: 'none', colorScheme: 'dark' }}
          />
        </div>

        {/* Result state */}
        {result && (
          <div data-testid="cl-audit-result" style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, border: `1px solid rgba(250,248,244,0.12)`, marginBottom: '1.5rem' }} className="cl-result-grid">
              {[
                { label: 'DAYS ELAPSED', value: result.elapsed },
                { label: 'DAYS REMAINING', value: result.remaining },
                { label: 'AUDIT WINDOW STATUS', value: result.phase.status, isStatus: true, color: result.phase.color },
              ].map((card, i) => (
                <div key={i} style={{ padding: '1.5rem', borderRight: i < 2 ? '1px solid rgba(250,248,244,0.08)' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '2rem', color: card.isStatus ? card.color : '#FAF8F4', lineHeight: 1, marginBottom: '0.4rem' }}>
                    {card.value}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.75)' }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* Phase label */}
            <div style={{ background: 'rgba(250,248,244,0.04)', border: `1px solid rgba(250,248,244,0.08)`, borderLeft: `3px solid ${result.phase.color}`, padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: result.phase.color }}>
                {result.phase.label}
              </span>
            </div>

            {/* Contextual CTA */}
            <a
              href={result.phase.ctaHref}
              data-testid="cl-audit-cta"
              style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: GOLD, color: '#FAF8F4', padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block', borderRadius: 0 }}>
              {result.phase.ctaLabel}
            </a>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@media(max-width:520px){.cl-result-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
