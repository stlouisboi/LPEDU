import { useState, useEffect, useRef } from 'react';
import AnnouncementBar from '../components/home/AnnouncementBar';
import SiteHeader from '../components/home/SiteHeader';
import SiteFooter from '../components/home/SiteFooter';
import { Link } from '../compat/Link';
import { Shield, Clock, Users, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

const SCAN_STEPS = [
  { type: 'info',    text: 'CONNECTING TO FMCSA COMPLIANCE NETWORK...' },
  { type: 'pass',    text: 'AUTHORITY RECORD LOCATED — STATUS: ACTIVE' },
  { type: 'info',    text: 'INITIATING NEW ENTRANT COMPLIANCE PROFILE...' },
  { type: 'info',    text: 'DOMAIN 01 · DRIVER QUALIFICATION FILES' },
  { type: 'fail',    text: 'FLAG: DQ FILE ARCHITECTURE — NOT CONFIRMED IN REGISTRY' },
  { type: 'info',    text: 'DOMAIN 02 · DRUG & ALCOHOL PROGRAM' },
  { type: 'fail',    text: 'FLAG: CLEARINGHOUSE QUERY RECORD — NOT VERIFIABLE' },
  { type: 'info',    text: 'DOMAIN 03 · HOURS OF SERVICE RECORDS' },
  { type: 'fail',    text: 'FLAG: LOG RETENTION POLICY — NOT ON FILE' },
  { type: 'info',    text: 'DOMAIN 04 · VEHICLE MAINTENANCE' },
  { type: 'fail',    text: 'FLAG: PREVENTIVE MAINTENANCE SCHEDULE — NOT DOCUMENTED' },
  { type: 'info',    text: 'DOMAIN 05 · AUTHORITY & INSURANCE CONTINUITY' },
  { type: 'pass',    text: 'PASS: MCS-90 ENDORSEMENT — ACTIVE FILING CONFIRMED' },
  { type: 'divider', text: '───────────────────────────────────────────────' },
  { type: 'summary', text: 'SCAN COMPLETE · 4 OPEN COMPLIANCE GAPS IDENTIFIED' },
  { type: 'action',  text: 'GROUND ZERO BRIEFING: RECOMMENDED' },
];

const STEP_DELAYS = [500, 800, 600, 900, 700, 900, 700, 900, 700, 900, 700, 900, 700, 400, 900, 1000];

const COMPLIANCE_OPTIONS = [
  { value: 'active_no_issues', label: 'Authority Active — No known issues' },
  { value: 'active_conditional', label: 'Authority Active — Conditional rating received' },
  { value: 'active_monitoring', label: 'Authority Active — Under FMCSA monitoring' },
  { value: 'new_entrant', label: 'New Entrant — Authority active < 6 months' },
  { value: 'pre_authority', label: 'Pre-Authority — Not yet issued' },
  { value: 'other', label: 'Other / Not sure' },
];

const LANE_OPTIONS = [
  { value: 'box_truck', label: 'Box Truck / Straight Truck' },
  { value: 'semi', label: 'Semi / Tractor-Trailer' },
];

const TRUST_ITEMS = [
  { icon: Clock, label: '20-Minute Briefing' },
  { icon: Shield, label: 'No Sales Pitch' },
  { icon: Users, label: '12 Carriers / Cohort' },
];

function TerminalLine({ step, visible }) {
  if (!visible) return null;
  const colors = {
    info:    'rgba(250,248,244,0.55)',
    pass:    '#22c55e',
    fail:    '#ef4444',
    divider: 'rgba(250,248,244,0.2)',
    summary: '#FAF8F4',
    action:  '#C8A96E',
  };
  const prefix = {
    info:    '  › ',
    pass:    '  ✓ ',
    fail:    '  ✗ ',
    divider: '    ',
    summary: '  » ',
    action:  '  → ',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, lineHeight: 1.6, marginBottom: step.type === 'divider' ? 4 : 2 }}>
      <span style={{ ...mono, fontSize: 11, color: colors[step.type], whiteSpace: 'pre' }}>{prefix[step.type]}</span>
      <span style={{ ...mono, fontSize: 11, color: colors[step.type], letterSpacing: '0.04em' }}>{step.text}</span>
    </div>
  );
}

function TerminalSection({ onScanComplete, prefillDot, setPrefillDot }) {
  const [dotInput, setDotInput] = useState('');
  const [scanState, setScanState] = useState('idle'); // idle | scanning | complete
  const [visibleSteps, setVisibleSteps] = useState([]);
  const inputRef = useRef(null);

  const startScan = () => {
    if (!dotInput.trim()) return;
    setPrefillDot(dotInput.trim());
    setScanState('scanning');
    setVisibleSteps([]);

    let cumulativeDelay = 0;
    SCAN_STEPS.forEach((step, idx) => {
      cumulativeDelay += STEP_DELAYS[idx] || 600;
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, idx]);
        if (idx === SCAN_STEPS.length - 1) {
          setTimeout(() => {
            setScanState('complete');
            onScanComplete();
          }, 800);
        }
      }, cumulativeDelay);
    });
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') startScan();
  };

  return (
    <section style={{ background: '#111B27', borderTop: '1px solid rgba(250,248,244,0.08)', borderBottom: '1px solid rgba(250,248,244,0.08)', padding: 'clamp(3.5rem,7vw,5rem) 1.5rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Terminal label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
          <span style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A96E' }}>LP-SCAN-001 · COMPLIANCE EXPOSURE TERMINAL</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px rgba(34,197,94,0.6)' }} />
          <span style={{ ...mono, fontSize: 9, color: '#22c55e', letterSpacing: '0.1em' }}>LIVE</span>
        </div>

        {/* Terminal frame */}
        <div style={{ border: '1px solid rgba(250,248,244,0.12)', background: '#0A1018', overflow: 'hidden' }}>

          {/* Terminal chrome */}
          <div style={{ background: 'rgba(250,248,244,0.06)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(250,248,244,0.08)' }}>
            {['#DC2626','#D97706','#16A34A'].map((c, i) => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block', opacity: 0.7 }} />
            ))}
            <span style={{ ...mono, fontSize: 9, color: 'rgba(250,248,244,0.72)', marginLeft: 8, letterSpacing: '0.08em' }}>fmcsa-compliance-scan — bash</span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '1.5rem 1.75rem', minHeight: 300 }}>

            {/* Prompt line */}
            <div style={{ ...mono, fontSize: 11, color: 'rgba(250,248,244,0.78)', marginBottom: '1rem', letterSpacing: '0.04em' }}>
              LaunchPath Compliance Terminal v1.0 — New Entrant Scan
            </div>

            {scanState === 'idle' && (
              <div>
                <div style={{ ...mono, fontSize: 11, color: 'rgba(250,248,244,0.82)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
                  Enter your USDOT number to initiate a new entrant compliance scan.<br />
                  <span style={{ color: 'rgba(250,248,244,0.72)', fontSize: 10 }}>This scan shows you what an investigator's review process looks like — not what they find in your files.</span>
                </div>
                <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
                  <span style={{ ...mono, fontSize: 11, color: '#C8A96E', padding: '0.75rem 0.9rem', border: '1px solid rgba(250,248,244,0.15)', borderRight: 'none', background: 'rgba(139,115,85,0.08)', display: 'flex', alignItems: 'center', letterSpacing: '0.06em' }}>DOT&gt;</span>
                  <input
                    ref={inputRef}
                    value={dotInput}
                    onChange={e => setDotInput(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={handleKey}
                    placeholder="Enter USDOT number"
                    maxLength={8}
                    data-testid="dot-terminal-input"
                    style={{ flex: 1, background: 'rgba(250,248,244,0.04)', border: '1px solid rgba(250,248,244,0.15)', color: '#FAF8F4', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, padding: '0.75rem 1rem', outline: 'none', borderRadius: 0 }}
                  />
                  <button
                    onClick={startScan}
                    disabled={!dotInput.trim()}
                    data-testid="dot-scan-btn"
                    style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', background: dotInput.trim() ? '#C8A96E' : 'rgba(139,115,85,0.2)', color: dotInput.trim() ? '#1C2B3A' : 'rgba(250,248,244,0.2)', border: 'none', padding: '0.75rem 1.25rem', cursor: dotInput.trim() ? 'pointer' : 'default', borderRadius: 0, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Run Scan →
                  </button>
                </div>
              </div>
            )}

            {(scanState === 'scanning' || scanState === 'complete') && (
              <div>
                {/* DOT acknowledgment */}
                <div style={{ ...mono, fontSize: 11, color: 'rgba(250,248,244,0.78)', marginBottom: '1rem' }}>
                  <span style={{ color: '#C8A96E' }}>DOT&gt;</span> {dotInput}
                </div>
                <div style={{ ...mono, fontSize: 11, color: 'rgba(250,248,244,0.75)', marginBottom: '1rem' }}>
                  Initiating scan for DOT-{dotInput}...
                </div>
                {SCAN_STEPS.map((step, idx) => (
                  <TerminalLine key={idx} step={step} visible={visibleSteps.includes(idx)} />
                ))}
                {scanState === 'scanning' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <span style={{ ...mono, fontSize: 11, color: '#C8A96E', animation: 'terminal-blink 1s step-end infinite' }}>█</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {scanState === 'complete' && (
          <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'rgba(139,115,85,0.08)', border: '1px solid rgba(139,115,85,0.3)', borderLeft: '3px solid #8B7355' }}>
            <p style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: 4 }}>Scan complete — 4 gaps identified</p>
            <p style={{ ...sans, fontSize: '0.9rem', color: 'rgba(250,248,244,0.80)', lineHeight: 1.7, margin: 0 }}>
              These are the compliance domains every new entrant authority is reviewed against. The Ground Zero Briefing maps your specific exposure — and determines whether LP-COH-002 is the right fit. Complete the admission request below.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

function AdmissionForm({ dotPrefill, formVisible }) {
  const [form, setForm] = useState({ carrier_name: '', email: '', dot_mc_number: dotPrefill || '', authority_activation_date: '', compliance_status: '', lane: '', message: '' });
  const [state, setState] = useState('idle'); // idle | loading | success | error
  const API = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (dotPrefill) setForm(f => ({ ...f, dot_mc_number: dotPrefill }));
  }, [dotPrefill]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const isValid = form.carrier_name && form.email && form.compliance_status && form.lane;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setState('loading');
    try {
      const resp = await fetch(`${API}/api/admission-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error('Failed');
      setState('success');
    } catch {
      setState('error');
    }
  };

  const inputSt = {
    width: '100%', background: '#FAF8F4', border: '1px solid rgba(28,43,58,0.2)',
    color: '#1C2B3A', fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.95rem',
    padding: '0.875rem 1rem', outline: 'none', boxSizing: 'border-box', borderRadius: 0,
    transition: 'border-color 0.15s',
  };
  const labelSt = {
    display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.65)', marginBottom: '0.4rem',
  };

  if (state === 'success') {
    return (
      <div data-testid="admission-success-ground0" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <div style={{ width: 56, height: 56, background: '#1C2B3A', border: '2px solid #8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={24} color="#C8A96E" />
        </div>
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.75rem' }}>Request Received</p>
        <h3 style={{ ...serif, fontWeight: 700, fontSize: '1.5rem', color: '#1C2B3A', marginBottom: '1rem' }}>Your admission request has been recorded.</h3>
        <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(28,43,58,0.80)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 2rem' }}>
          Vince reviews every request personally. You will receive a response within 24–48 hours. If LP-COH-002 is a fit, you will be directed to schedule your Ground Zero Briefing.
        </p>
        <p style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', color: '#6B7280' }}>
          Ref: LP-ADM-001 · Status: PENDING REVIEW
        </p>
      </div>
    );
  }

  return (
    <div style={{ opacity: formVisible ? 1 : 0.35, transition: 'opacity 0.6s ease', pointerEvents: formVisible ? 'auto' : 'none' }}>
      <div style={{ borderBottom: '1px solid rgba(28,43,58,0.1)', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
        <p style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>ADMISSION REQUEST FORM · REF: LP-ADM-001</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#1C2B3A', marginBottom: '0.75rem' }}>
          Request Your Ground Zero Briefing
        </h2>
        <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(28,43,58,0.72)', lineHeight: 1.75, maxWidth: 540 }}>
          Vince reviews every request personally. This is not a purchase. Admission details, cohort dates, and investment are discussed during the briefing — after your compliance exposure is reviewed.
        </p>
      </div>

      {/* Trust strip */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        {['SC REVIEWED', '24–48H RESPONSE', '12 SEATS / COHORT', 'NO OBLIGATION'].map((t, i) => (
          <span key={i} style={{ ...mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.65)', border: '1px solid rgba(28,43,58,0.2)', padding: '0.35rem 0.7rem' }}>{t}</span>
        ))}
      </div>

      <form onSubmit={handleSubmit} data-testid="ground0-admission-form" noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="lp-form-grid">

          {/* Carrier Name */}
          <div>
            <label style={labelSt} htmlFor="g0-carrier-name">Carrier / Business Name *</label>
            <input id="g0-carrier-name" name="carrier_name" value={form.carrier_name} onChange={handleChange} required style={inputSt} placeholder="Legal entity name on FMCSA file" data-testid="g0-carrier-name-input" />
          </div>

          {/* Email */}
          <div>
            <label style={labelSt} htmlFor="g0-email">Operating Email *</label>
            <input id="g0-email" name="email" type="email" value={form.email} onChange={handleChange} required style={inputSt} placeholder="Direct contact email" data-testid="g0-email-input" />
          </div>

          {/* DOT Number */}
          <div>
            <label style={labelSt} htmlFor="g0-dot">USDOT / MC Number</label>
            <input id="g0-dot" name="dot_mc_number" value={form.dot_mc_number} onChange={handleChange} style={inputSt} placeholder="e.g. 1234567" data-testid="g0-dot-input" />
          </div>

          {/* Authority Date */}
          <div>
            <label style={labelSt} htmlFor="g0-auth-date">Authority Activation Date (approx.)</label>
            <input id="g0-auth-date" name="authority_activation_date" value={form.authority_activation_date} onChange={handleChange} style={inputSt} placeholder="e.g. Jan 2025" data-testid="g0-auth-date-input" />
          </div>

          {/* Compliance Status */}
          <div>
            <label style={labelSt} htmlFor="g0-compliance">Current Compliance Status *</label>
            <select id="g0-compliance" name="compliance_status" value={form.compliance_status} onChange={handleChange} required style={{ ...inputSt, appearance: 'none', cursor: 'pointer' }} data-testid="g0-compliance-select">
              <option value="">Select current status</option>
              {COMPLIANCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Operation Lane */}
          <div>
            <label style={labelSt} htmlFor="g0-lane">Operation Type *</label>
            <select id="g0-lane" name="lane" value={form.lane} onChange={handleChange} required style={{ ...inputSt, appearance: 'none', cursor: 'pointer' }} data-testid="g0-lane-select">
              <option value="">Select vehicle type</option>
              {LANE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

        </div>

        {/* Message */}
        <div style={{ marginTop: '1.25rem' }}>
          <label style={labelSt} htmlFor="g0-message">What is your biggest compliance concern right now? (optional)</label>
          <textarea
            id="g0-message" name="message" value={form.message} onChange={handleChange} rows={4}
            style={{ ...inputSt, resize: 'vertical', lineHeight: 1.6 }}
            placeholder="Driver files, drug &amp; alcohol program, authority gaps, insurance continuity, or other..."
            data-testid="g0-message-textarea"
          />
        </div>

        {state === 'error' && (
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.25)' }}>
            <p style={{ ...mono, fontSize: 10, color: '#DC2626', margin: 0 }}>Submission failed. Please try again or email vince@giglinecompliance.com</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={!isValid || state === 'loading'}
            data-testid="g0-submit-btn"
            style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: isValid ? '#1C2B3A' : 'rgba(28,43,58,0.3)', color: '#FAF8F4', border: 'none', padding: '1rem 2rem', cursor: isValid && state !== 'loading' ? 'pointer' : 'default', fontWeight: 700, borderRadius: 0 }}>
            {state === 'loading' ? 'Submitting...' : 'Submit Admission Request →'}
          </button>
          <p style={{ ...mono, fontSize: 11, color: 'rgba(28,43,58,0.60)', letterSpacing: '0.08em' }}>No payment required. Reviewed within 24–48h.</p>
        </div>
      </form>

    </div>
  );
}

export default function Ground0BriefingNewPage() {
  const [scanComplete, setScanComplete] = useState(false);
  const [dotPrefill, setDotPrefill] = useState('');
  const [seats, setSeats] = useState(null);
  const formRef = useRef(null);
  const API = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${API}/api/cohort-seats`).then(r => r.json()).then(setSeats).catch(() => {});
  }, [API]);

  const handleScanComplete = () => {
    setScanComplete(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  };

  return (
    <div className="lp-home" suppressHydrationWarning>
      <AnnouncementBar />
      <SiteHeader activePath="/ground-0-briefing" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="lp-blueprint" style={{ background: '#FAF8F4', padding: 'clamp(4rem,8vw,6rem) 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4rem', alignItems: 'center' }} className="lp-hero-grid">

          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(28,43,58,0.15)', padding: '0.4rem 0.9rem', marginBottom: '1.75rem' }}>
              <Shield size={10} color="#C8A96E" />
              <span style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.60)' }}>LP-COH-002 · Admission Gate</span>
            </div>

            <h1 style={{ ...serif, fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.6rem)', color: '#1C2B3A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              The Ground Zero Briefing.
            </h1>

            <p style={{ ...sans, fontSize: '1.05rem', color: 'rgba(28,43,58,0.80)', lineHeight: 1.85, marginBottom: '1.75rem', maxWidth: 520 }}>
              A 20-minute private review with Vince Lawrence. He will examine your USDOT compliance telemetry, identify your highest-risk exposure areas, and tell you directly whether LP-COH-002 is the right fit for your operation.
            </p>

            <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(28,43,58,0.72)', lineHeight: 1.75, maxWidth: 500 }}>
              This is not a sales call. Investment details are disclosed during the briefing — after your compliance file has been reviewed. The briefing itself is free.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={14} color="#C8A96E" />
                  <span style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — What to expect */}
          <div style={{ background: '#F5F2EC', border: '1px solid rgba(28,43,58,0.12)', padding: '2rem' }}>
            <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.25rem' }}>What the briefing covers</p>
            {[
              'Your USDOT telemetry review — what the registry shows about your authority',
              'Your compliance exposure profile across five domains',
              'Whether your timeline aligns with LP-COH-002',
              'What the 90-day implementation requires from you',
              'Whether admission is appropriate or premature',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: '0.85rem' }}>
                <ChevronRight size={13} color="#C8A96E" style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ ...sans, fontSize: '0.875rem', color: 'rgba(28,43,58,0.80)', lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(28,43,58,0.1)' }}>
              <p style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.5rem' }}>Cohort Status · LP-COH-002</p>
              {seats ? (
                <>
                  <p style={{ ...mono, fontSize: 12, fontWeight: 700, color: seats.near_capacity ? '#B45309' : '#1C2B3A', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                    {seats.taken} OF {seats.total} SEATS FILLED
                  </p>
                  <div style={{ height: 4, background: 'rgba(28,43,58,0.1)', marginBottom: '0.5rem' }}>
                    <div style={{ height: '100%', background: seats.near_capacity ? '#F59E0B' : '#C8A96E', width: `${Math.min(100, (seats.taken / seats.total) * 100)}%`, transition: 'width 0.6s ease' }} />
                  </div>
                  {seats.near_capacity ? (
                    <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', padding: '8px 12px', marginTop: '0.5rem' }}>
                      <p style={{ ...mono, fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#B45309', margin: 0, fontWeight: 700 }}>
                        COHORT NEARLY FULL — {seats.remaining} SEAT{seats.remaining !== 1 ? 'S' : ''} REMAIN
                      </p>
                    </div>
                  ) : (
                    <p style={{ ...mono, fontSize: 9, letterSpacing: '0.08em', color: '#6B7280' }}>{seats.remaining} seats remaining</p>
                  )}
                </>
              ) : (
                <p style={{ ...mono, fontSize: 12, fontWeight: 700, color: '#1C2B3A', letterSpacing: '0.06em' }}>ACCEPTING REQUESTS</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Terminal Scan ──────────────────────────────────── */}
      <TerminalSection
        onScanComplete={handleScanComplete}
        prefillDot={dotPrefill}
        setPrefillDot={setDotPrefill}
      />

      {/* ── Admission Form ─────────────────────────────────── */}
      <section ref={formRef} style={{ background: '#FAF8F4', borderTop: '1px solid rgba(28,43,58,0.08)', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          {/* Near-capacity urgency banner — LP-WRK-001 §7.4 */}
          {seats?.near_capacity && (
            <div
              data-testid="ground0-urgency-banner"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.30)', borderLeft: '3px solid #F59E0B', padding: '14px 20px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <AlertTriangle size={14} color="#B45309" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B45309', margin: '0 0 3px' }}>
                  COHORT NEARLY FULL — {seats.remaining} SEAT{seats.remaining !== 1 ? 'S' : ''} REMAIN
                </p>
                <p style={{ ...sans, fontSize: '0.8rem', color: 'rgba(28,43,58,0.75)', margin: 0 }}>
                  LP-COH-002 is filling. Briefing requests are reviewed in the order received. Submit yours before the cohort closes.
                </p>
              </div>
            </div>
          )}

          <AdmissionForm dotPrefill={dotPrefill} formVisible={true} />
        </div>
      </section>

      {/* ── Doctrine Anchor ────────────────────────────────── */}
      <div style={{ background: '#F5F2EC', borderTop: '1px solid rgba(28,43,58,0.1)', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.5rem' }}>
          Not ready for admission?
        </p>
        <p style={{ ...sans, fontSize: '0.9rem', color: 'rgba(28,43,58,0.65)', marginBottom: '1rem' }}>
          Run the REACH Diagnostic first — 15 questions that score your compliance exposure across five domains.
        </p>
        <Link to="/reach-diagnostic" style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C2B3A', border: '1px solid rgba(28,43,58,0.25)', padding: '0.6rem 1.25rem', textDecoration: 'none', display: 'inline-block', borderRadius: 0 }}>
          Run REACH Diagnostic — Free →
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}
