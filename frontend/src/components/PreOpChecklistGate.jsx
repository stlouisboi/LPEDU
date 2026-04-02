import { useState } from 'react';
import { useRouter } from 'next/router';

const API = process.env.REACT_APP_BACKEND_URL || '';

const navy = "#000F1F";
const gold = "#d4900a";
const mono = "'Inter', sans-serif";
const serif = "'Newsreader', 'Playfair Display', serif";

export default function PreOpChecklistGate() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) { setError('Email is required.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/checklist/email-capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName.trim(), email: email.trim() }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || 'Something went wrong. Please try again.');
      }
      router.push('/resources/pre-op-checklist/thank-you');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    fontFamily: mono,
    fontSize: '0.9rem',
    color: navy,
    background: '#fff',
    border: '1px solid rgba(0,15,31,0.2)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div
      data-testid="pre-op-checklist-gate"
      style={{
        background: navy,
        padding: '2.5rem',
        margin: '2.75rem 0',
        borderLeft: `4px solid ${gold}`,
      }}
    >
      <p style={{
        fontFamily: mono, fontSize: '0.714rem', fontWeight: 700,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(212,144,10,0.7)', marginBottom: '0.75rem',
      }}>
        Free Resource · Pre-Op Compliance Checklist
      </p>

      <h3 style={{
        fontFamily: serif, fontWeight: 700,
        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
        color: '#fff', lineHeight: 1.25, marginBottom: '0.75rem',
      }}>
        Get this checklist as a standalone reference.
      </h3>

      <p style={{
        fontFamily: mono, fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: '1.75rem',
      }}>
        Enter your first name and email. The 4-phase startup checklist opens immediately on the next page — no PDF required, no wait.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '160px' }}>
            <label
              htmlFor="checklist-first-name"
              style={{ fontFamily: mono, fontSize: '0.714rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '0.4rem' }}
            >
              First Name
            </label>
            <input
              id="checklist-first-name"
              data-testid="checklist-first-name-input"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={inputStyle}
              disabled={loading}
              autoComplete="given-name"
            />
          </div>
          <div style={{ flex: 2, minWidth: '220px' }}>
            <label
              htmlFor="checklist-email"
              style={{ fontFamily: mono, fontSize: '0.714rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '0.4rem' }}
            >
              Email Address
            </label>
            <input
              id="checklist-email"
              data-testid="checklist-email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
              disabled={loading}
              autoComplete="email"
            />
          </div>
        </div>

        {error && (
          <p data-testid="checklist-gate-error" style={{ fontFamily: mono, fontSize: '0.857rem', color: '#f87171', marginBottom: '0.75rem' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          data-testid="checklist-gate-submit"
          disabled={loading}
          style={{
            background: loading ? 'rgba(212,144,10,0.5)' : gold,
            color: navy,
            fontFamily: mono, fontWeight: 700,
            fontSize: '0.762rem', letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.875rem 2rem',
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Sending...' : 'Send Me the Checklist'}
        </button>

        <p style={{
          fontFamily: mono, fontSize: '0.714rem',
          color: 'rgba(255,255,255,0.3)', marginTop: '0.75rem',
        }}>
          No spam. Used only to deliver this document and relevant LaunchPath updates.
        </p>
      </form>
    </div>
  );
}
