/**
 * VerifyPage — LP-VRF-PUB-001
 * Public broker-facing registry lookup. Enter an LP-VRF-XXXXXXXX ID to
 * confirm a carrier holds a verified LaunchPath credential.
 */
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Shield, Search, AlertTriangle, CheckCircle } from 'lucide-react';

const VRFCredentialCard = dynamic(() => import('../../components/shared/VRFCredentialCard'), { ssr: false });

const API = process.env.REACT_APP_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
const NAVY   = '#1C2B3A';
const GOLD   = '#C8A96E';
const CREAM  = '#FAF8F4';
const CARD   = '#F5F2EC';
const BORDER = 'rgba(200,169,110,0.15)';
const MONO   = "'JetBrains Mono','Courier New',monospace";
const SERIF  = "'Playfair Display',Georgia,serif";
const SANS   = "'Instrument Sans',sans-serif";

// What the VRF credential certifies — displayed to brokers
const WHAT_IT_MEANS = [
  { code: 'CP-01–CP-05', label: 'Five Custodian Checkpoints Passed', desc: 'Driver files, drug & alcohol program, HOS records, maintenance documentation, and authority filings reviewed at each checkpoint by a LaunchPath Safety Director.' },
  { code: 'Week 11',     label: 'Integrity Audit Cleared',           desc: 'A full mock-FMCSA file review conducted at Week 11 of the 12-week program. Credential is not issued if gaps remain.' },
  { code: '49 CFR',      label: 'Regulatory Scope',                  desc: 'Parts 382, 391, 395, 396, and 387 — covering all six compliance domains FMCSA audits during the New Entrant Safety Review period.' },
];

export default function VerifyPage() {
  const [input, setInput]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | found | notfound | error
  const [result, setResult] = useState(null);

  const normalize = (v) => v.trim().toUpperCase().replace(/\s+/g, '');

  const handleVerify = async () => {
    const id = normalize(input);
    if (!id) return;
    setStatus('loading');
    setResult(null);
    try {
      const res  = await fetch(`${API}/api/public/verify?id=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (data.found) {
        setResult(data);
        setStatus('found');
      } else {
        setStatus('notfound');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleVerify();
  };

  return (
    <div style={{ background: NAVY, minHeight: '100vh', color: CREAM }}>

      {/* Classification band */}
      <div style={{ borderBottom: '1px solid rgba(200,169,110,0.12)', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.78)' }}>
            LP-VRF-PUB-001 · Public Registry
          </span>
          <a href="/" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.75)', textDecoration: 'none' }}>
            LaunchPathEDU.com
          </a>
        </div>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(3rem,7vw,5.5rem) 1.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(200,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={16} color={GOLD} strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>Verified Registry</span>
        </div>

        <h1 style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', color: CREAM, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 1.25rem', maxWidth: 680 }}>
          LaunchPath Carrier Verification
        </h1>

        <p style={{ fontFamily: SANS, fontSize: '1.05rem', color: 'rgba(250,248,244,0.65)', lineHeight: 1.8, maxWidth: 580, margin: '0 0 3rem' }}>
          Enter a registry ID to confirm a motor carrier has completed the LaunchPath Standard and holds a verified credential.
        </p>

        {/* Search form */}
        <div data-testid="verify-search-form" style={{ display: 'flex', gap: 0, maxWidth: 560, marginBottom: '1rem' }}>
          <input
            data-testid="verify-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="LP-VRF-XXXXXXXX"
            style={{
              flex: 1,
              fontFamily: MONO,
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${BORDER}`,
              borderRight: 'none',
              color: CREAM,
              padding: '0.9rem 1.25rem',
              outline: 'none',
              borderRadius: 0,
            }}
          />
          <button
            data-testid="verify-submit-btn"
            onClick={handleVerify}
            disabled={status === 'loading'}
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              background: status === 'loading' ? 'rgba(200,169,110,0.4)' : GOLD,
              color: NAVY,
              border: 'none',
              padding: '0.9rem 1.5rem',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              borderRadius: 0,
            }}
          >
            <Search size={13} />
            {status === 'loading' ? 'SEARCHING...' : 'VERIFY'}
          </button>
        </div>

        <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(200,169,110,0.70)', marginBottom: '3rem' }}>
          Format: LP-VRF-XXXXXXXX — provided directly by the carrier
        </p>
      </div>

      {/* Results area */}
      {status !== 'idle' && (
        <div data-testid="verify-result-area" style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          <div style={{ height: 1, background: 'rgba(200,169,110,0.12)', marginBottom: '3rem' }} />

          {/* Found state */}
          {status === 'found' && result && (
            <div data-testid="verify-found">
              {/* Status banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem', padding: '0.875rem 1.25rem', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.25)' }}>
                <CheckCircle size={18} color="#059669" />
                <div>
                  <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#059669', margin: 0 }}>
                    ON RECORD — VERIFIED
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(250,248,244,0.82)', margin: '0.2rem 0 0' }}>
                    This registry ID is valid and on file with LaunchPath.
                  </p>
                </div>
              </div>

              {/* Two-column layout: card + details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="verify-grid">
                {/* Card */}
                <div style={{ border: '1px solid rgba(200,169,110,0.15)', padding: 3, background: 'rgba(200,169,110,0.04)' }}>
                  <VRFCredentialCard
                    size="full"
                    carrierName={`${result.operator_name.toUpperCase()} · VERIFIED.`}
                    registryId={result.registry_id}
                    issuedAt={result.issued_at}
                  />
                </div>

                {/* Verification details */}
                <div>
                  <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.80)', marginBottom: '1.25rem' }}>
                    What This Credential Confirms
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {WHAT_IT_MEANS.map((item) => (
                      <div key={item.code} style={{ borderLeft: '2px solid rgba(200,169,110,0.25)', paddingLeft: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.35rem' }}>
                          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, background: 'rgba(200,169,110,0.1)', padding: '2px 6px' }}>{item.code}</span>
                          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: CREAM }}>{item.label}</span>
                        </div>
                        <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(250,248,244,0.82)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Broker note */}
                  <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: 'rgba(200,169,110,0.04)', border: '1px solid rgba(200,169,110,0.1)' }}>
                    <p style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.78)', marginBottom: '0.5rem' }}>Note for Brokers</p>
                    <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(250,248,244,0.82)', lineHeight: 1.7, margin: 0 }}>
                      This credential confirms the carrier completed a structured 90-day compliance program with verified file reviews. It does not replace standard carrier onboarding due diligence or insurance verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Not found state */}
          {status === 'notfound' && (
            <div data-testid="verify-notfound" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <AlertTriangle size={20} color="rgba(200,169,110,0.5)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: CREAM, margin: '0 0 0.5rem' }}>
                  Not on Record
                </p>
                <p style={{ fontFamily: SANS, fontSize: '0.925rem', color: 'rgba(250,248,244,0.82)', lineHeight: 1.75, margin: 0, maxWidth: 520 }}>
                  No credential matching <span style={{ fontFamily: MONO, color: GOLD }}>{normalize(input)}</span> is in the LaunchPath Verified Registry. Verify the ID directly with the carrier. If you believe this is an error, contact{' '}
                  <a href="mailto:vince@launchpathedu.com" style={{ color: GOLD, textDecoration: 'none' }}>vince@launchpathedu.com</a>.
                </p>
              </div>
            </div>
          )}

          {/* Error state */}
          {status === 'error' && (
            <div data-testid="verify-error" style={{ padding: '1.5rem', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ef4444', margin: 0 }}>
                Lookup failed. Check your connection and try again.
              </p>
            </div>
          )}
        </div>
      )}

      {/* What the registry is — always shown below fold */}
      <div style={{ borderTop: '1px solid rgba(200,169,110,0.08)', padding: 'clamp(3rem,6vw,5rem) 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.75)', marginBottom: '2rem' }}>
            About This Registry
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }} className="verify-about-grid">
            {[
              { label: 'Who Earns It',    body: 'Motor carriers who complete the full LaunchPath Standard — a 12-week, 90-day guided compliance installation with five custodian checkpoint reviews.' },
              { label: 'How It Is Issued', body: 'The Verified Registry ID is issued automatically on a clean Week 11 Integrity Audit. No partial completions qualify.' },
              { label: 'What It Covers',   body: 'Driver qualification files, drug & alcohol program, hours-of-service, vehicle maintenance, and authority continuity — all six FMCSA audit domains.' },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.75rem' }}>{item.label}</p>
                <p style={{ fontFamily: SANS, fontSize: '0.9rem', color: 'rgba(250,248,244,0.82)', lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 768px) {
          .verify-grid { grid-template-columns: 1fr !important; }
          .verify-about-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder { color: rgba(200,169,110,0.25); }
        input:focus { border-color: rgba(200,169,110,0.4) !important; outline: none; }
      `}</style>
    </div>
  );
}
