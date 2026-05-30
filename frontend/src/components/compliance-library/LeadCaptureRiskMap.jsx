import { useState } from 'react';

const API = process.env.REACT_APP_BACKEND_URL;
const NAVY = '#1C2B3A';
const GOLD = '#8B7355';
const BG = '#FAF8F4';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

export default function LeadCaptureRiskMap() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(`${API}/api/risk-map/email-capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: firstName || 'Carrier' }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section data-testid="cl-lead-capture" style={{ background: `rgba(139,115,85,0.06)`, borderTop: `1px solid rgba(139,115,85,0.2)`, borderBottom: `1px solid rgba(139,115,85,0.2)`, padding: 'clamp(3rem,6vw,5rem) 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="cl-lead-grid">

        {/* Left */}
        <div>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.75rem', fontWeight: 700 }}>
            LP-LEAD-001 · NEW AUTHORITY? START HERE
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: NAVY, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Get the First 90 Days Risk Map™ — Free
          </h2>
          <p style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(28,43,58,0.65)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            A single-page tactical document showing the compliance exposure points that reach new carriers in the first 90 days after authority activates — organized by phase.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              'Which phase of the 90-day window you are in',
              'What compliance gaps are most likely to exist right now',
              'What FMCSA looks for in the first safety audit',
            ].map((pt, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>·</span>
                <span style={{ fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(28,43,58,0.7)', lineHeight: 1.6 }}>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div>
          {status === 'success' ? (
            <div data-testid="cl-lead-success" style={{ background: BG, border: `1px solid rgba(139,115,85,0.3)`, borderLeft: `3px solid ${GOLD}`, padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.5rem' }}>SENT</p>
              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.1rem', color: NAVY }}>Check your inbox for the Risk Map.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ marginBottom: '0.875rem' }}>
                <label style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.5)', display: 'block', marginBottom: '0.375rem' }}>First Name (Optional)</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Carrier"
                  data-testid="cl-lead-firstname"
                  style={{ fontFamily: SANS, fontSize: '0.9rem', border: `1px solid ${BORDER}`, background: BG, color: NAVY, padding: '0.875rem 1rem', width: '100%', borderRadius: 0, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '0.875rem' }}>
                <label style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.5)', display: 'block', marginBottom: '0.375rem' }}>Carrier Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="carrier@company.com"
                  required
                  data-testid="cl-lead-email"
                  style={{ fontFamily: SANS, fontSize: '0.9rem', border: `1px solid ${BORDER}`, background: BG, color: NAVY, padding: '0.875rem 1rem', width: '100%', borderRadius: 0, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button
                type="submit"
                data-testid="cl-lead-submit"
                disabled={status === 'loading'}
                style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', border: 'none', padding: '1.1rem 2rem', cursor: status === 'loading' ? 'wait' : 'pointer', display: 'block', width: '100%', textAlign: 'center', borderRadius: 0, opacity: status === 'loading' ? 0.6 : 1, marginBottom: '0.5rem' }}>
                {status === 'loading' ? 'SENDING...' : 'SEND ME THE RISK MAP →'}
              </button>
              {status === 'error' && <p style={{ fontFamily: MONO, fontSize: 9, color: '#ef4444' }}>Something went wrong. Please try again.</p>}
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(28,43,58,0.4)', textAlign: 'center' }}>
                No spam. One email. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){.cl-lead-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}
