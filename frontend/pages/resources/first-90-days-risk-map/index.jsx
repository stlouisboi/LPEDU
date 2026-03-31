import { useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../../src/components/Navbar';
import FooterSection from '../../../src/components/FooterSection';
import AuthorityClock from '../../../src/components/AuthorityClock';

const API = process.env.REACT_APP_BACKEND_URL || '';

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bg: '#F7F5F0',
  bgStrip: '#EDEAE3',
  bgCard: '#FFFFFF',
  navy: '#0D2240',
  navyMid: '#4A7CB5',
  gold: '#C9A84C',
  goldDark: '#A8852F',
  text: '#0D1829',
  textMuted: '#5A6478',
  textLight: '#8A93A6',
  border: 'rgba(13,34,64,0.10)',
  borderGold: 'rgba(201,168,76,0.35)',
};

const S = {
  playfair: "'Playfair Display', Georgia, serif",
  inter: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

// ── PDF Cover Mockup ───────────────────────────────────────────────────────────
function PDFCoverMockup() {
  return (
    <div
      style={{
        background: C.navy,
        borderRadius: '4px',
        padding: '40px 32px 32px',
        maxWidth: '320px',
        width: '100%',
        boxShadow: '0 24px 48px rgba(13,34,64,0.22), 0 4px 12px rgba(13,34,64,0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />
      {/* Doc code */}
      <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.18em', color: 'rgba(201,168,76,0.65)', textTransform: 'uppercase', marginBottom: '32px', position: 'relative' }}>
        LP-STD-001 · FREE RESOURCE
      </div>
      {/* Gold accent line */}
      <div style={{ width: '32px', height: '3px', background: C.gold, marginBottom: '20px', position: 'relative' }} />
      {/* Title */}
      <div style={{ fontFamily: S.playfair, fontSize: '24px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.25', marginBottom: '12px', position: 'relative' }}>
        The First 90 Days<br />Risk Map™
      </div>
      {/* Subtitle */}
      <div style={{ fontFamily: S.inter, fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6', marginBottom: '40px', position: 'relative' }}>
        Compliance guidance for new<br />motor carrier authorities
      </div>
      {/* Three zones preview */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '28px', position: 'relative' }}>
        {[['1–30', '#0D2240', 'FOUNDATION'], ['31–60', '#4A7CB5', 'OPS'], ['61–90', C.gold, 'AUDIT']].map(([d, bg, lbl]) => (
          <div key={d} style={{ flex: 1, background: bg, borderRadius: '2px', padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ fontFamily: S.mono, fontSize: '8px', color: bg === C.gold ? '#0D1829' : 'rgba(255,255,255,0.8)', fontWeight: '700', letterSpacing: '0.06em' }}>{lbl}</div>
            <div style={{ fontFamily: S.inter, fontSize: '9px', color: bg === C.gold ? 'rgba(13,25,41,0.7)' : 'rgba(255,255,255,0.55)', marginTop: '2px' }}>Days {d}</div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div style={{ fontFamily: S.mono, fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', position: 'relative' }}>
        LaunchPath Transportation EDU
      </div>
    </div>
  );
}

// ── Domino Step ───────────────────────────────────────────────────────────────
function DominoStep({ label, last, danger }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <div
        style={{
          background: danger ? '#FEF2F2' : '#FFFFFF',
          border: `1px solid ${danger ? '#FCA5A5' : C.border}`,
          borderLeft: `3px solid ${danger ? '#DC2626' : C.navy}`,
          padding: '12px 18px',
          fontFamily: S.inter,
          fontSize: '13px',
          fontWeight: '500',
          color: danger ? '#DC2626' : C.text,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      {!last && (
        <div style={{ color: C.textLight, fontSize: '16px', padding: '0 4px', flexShrink: 0, fontWeight: '300' }}>→</div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RiskMapPage() {
  const formRef = useRef(null);
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      const el = formRef.current?.querySelector('input[name="firstName"]');
      if (el) el.focus();
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/risk-map/email-capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName.trim(), email: email.trim() }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || 'Submission failed. Please try again.');
      }
      router.push('/resources/first-90-days-risk-map/thank-you');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>The First 90 Days Risk Map™ | LaunchPath Transportation EDU</title>
        <meta name="description" content="Free compliance guide for new motor carriers. Understand the 3 risk phases of your first 90 days and spot the gaps before FMCSA does." />
        <meta property="og:title" content="The First 90 Days Risk Map™ | LaunchPath Transportation EDU" />
        <meta property="og:description" content="Free compliance guide for new motor carriers. Understand the 3 risk phases of your first 90 days and spot the gaps before FMCSA does." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.launchpathedu.com/resources/first-90-days-risk-map" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The First 90 Days Risk Map™ | LaunchPath Transportation EDU" />
        <meta name="twitter:description" content="Free compliance guide for new motor carriers. Understand the 3 risk phases of your first 90 days and spot the gaps before FMCSA does." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/resources/first-90-days-risk-map" />
        <style>{`
          @media (max-width: 768px) {
            .risk-map-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .risk-map-strip-grid { grid-template-columns: 1fr !important; }
            .risk-map-strip-grid > div { border-right: none !important; border-bottom: 1px solid rgba(13,34,64,0.10); }
            .risk-map-two-col { grid-template-columns: 1fr !important; }
            .risk-map-domino { flex-direction: column !important; align-items: flex-start !important; }
          }
          @media (max-width: 640px) {
            .authority-clock-cards { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>

      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: S.inter }}>
        <Navbar />

        {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
        <section style={{ background: C.bg, paddingTop: '80px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div className="risk-map-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
              {/* Left: Copy */}
              <div>
                {/* Eyebrow */}
                <div style={{ fontFamily: S.mono, fontSize: '11px', fontWeight: '700', letterSpacing: '0.20em', color: C.gold, textTransform: 'uppercase', marginBottom: '20px' }}>
                  Free Risk Guide
                </div>
                {/* Headline */}
                <h1 style={{ fontFamily: S.playfair, fontSize: '52px', fontWeight: '800', color: C.navy, lineHeight: '1.1', margin: '0 0 20px', letterSpacing: '-0.01em' }}>
                  The First 90 Days Risk Map™
                </h1>
                {/* Subhead */}
                <p style={{ fontFamily: S.inter, fontSize: '17px', color: C.textMuted, lineHeight: '1.75', margin: '0 0 32px', maxWidth: '440px' }}>
                  Compliance-first guidance for new owner-operators who want to protect their authority before small misses become expensive problems.
                </p>
                {/* Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                  {[
                    'Understand the 3 risk phases of the first 90 days',
                    'Spot the small compliance gaps that turn into major failures',
                    'See where your operation may already be exposed',
                  ].map((b) => (
                    <div key={b} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: C.gold, fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>→</span>
                      <span style={{ fontFamily: S.inter, fontSize: '15px', color: C.text, lineHeight: '1.55' }}>{b}</span>
                    </div>
                  ))}
                </div>
                {/* CTA */}
                <button
                  data-testid="hero-get-risk-map-btn"
                  onClick={scrollToForm}
                  style={{
                    display: 'inline-block',
                    background: C.gold,
                    color: C.navy,
                    fontFamily: S.mono,
                    fontSize: '13px',
                    fontWeight: '700',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '16px 32px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '12px',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = C.goldDark)}
                  onMouseOut={(e) => (e.currentTarget.style.background = C.gold)}
                >
                  Get the Risk Map
                </button>
                <div style={{ fontFamily: S.inter, fontSize: '12px', color: C.textLight, lineHeight: '1.5' }}>
                  Short. Clear. Built for new authorities.
                </div>
              </div>

              {/* Right: PDF Mockup */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PDFCoverMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Why This Matters ─────────────────────────────────── */}
        <section style={{ background: C.bgStrip, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '40px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="risk-map-strip-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
              {[
                'The first 90 days establish your compliance pattern.',
                'Small mistakes in this window are harder to correct later.',
                'Audit pressure starts before most new carriers feel ready.',
              ].map((text, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '20px 40px',
                    borderRight: idx < 2 ? `1px solid rgba(13,34,64,0.14)` : 'none',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontFamily: S.inter, fontSize: '14px', color: C.textMuted, lineHeight: '1.7', margin: '0', fontStyle: 'italic' }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: 90-Day Authority Clock ───────────────────────────── */}
        <section style={{ background: C.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.18em', color: C.gold, textTransform: 'uppercase', marginBottom: '16px' }}>
                Proprietary Visual Framework
              </div>
              <h2 style={{ fontFamily: S.playfair, fontSize: '36px', fontWeight: '800', color: C.navy, margin: '0 0 12px', lineHeight: '1.2' }}>
                The 90-Day Risk Window
              </h2>
              <p style={{ fontFamily: S.inter, fontSize: '15px', color: C.textMuted, lineHeight: '1.7', margin: '0 0 40px', maxWidth: '580px' }}>
                Every new motor carrier authority operates inside a specific compliance window. The three phases below show where the risk concentrates — and when.
              </p>
            </div>
            <AuthorityClock />
          </div>
        </section>

        {/* ── Section 4: Domino Effect ─────────────────────────────────────── */}
        <section style={{ background: C.bgStrip, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: S.playfair, fontSize: '36px', fontWeight: '800', color: C.navy, margin: '0 0 20px', lineHeight: '1.2', maxWidth: '560px' }}>
              Most carriers don't fail all at once. They fail in sequence.
            </h2>
            <p style={{ fontFamily: S.inter, fontSize: '16px', color: C.textMuted, lineHeight: '1.75', margin: '0 0 44px', maxWidth: '520px' }}>
              One missed requirement rarely stays isolated. Incomplete systems create exposure, and exposure compounds under pressure.
            </p>
            {/* Step sequence */}
            <div className="risk-map-domino" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0', overflowX: 'auto', paddingBottom: '8px' }}>
              <DominoStep label="Small delay" />
              <DominoStep label="Required action missed" />
              <DominoStep label="Pattern forms" />
              <DominoStep label="Audit trigger" />
              <DominoStep label="Automatic failure · authority at risk" last danger />
            </div>
          </div>
        </section>

        {/* ── Section 5: What You Get / What It's Not ──────────────────────── */}
        <section style={{ background: C.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="risk-map-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Left — What you'll get */}
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.navy}`, padding: '32px' }}>
                <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.16em', color: C.navy, textTransform: 'uppercase', marginBottom: '20px' }}>
                  What You'll Get
                </div>
                {[
                  'A clear view of the highest-risk areas in the first 90 days',
                  'A better understanding of FMCSA priorities and audit triggers',
                  'A framework for thinking about audit readiness',
                  'More confidence about where your authority may be exposed',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <span style={{ color: '#16A34A', fontWeight: '700', flexShrink: 0, fontSize: '15px' }}>✓</span>
                    <span style={{ fontFamily: S.inter, fontSize: '14px', color: C.text, lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Right — What it's not */}
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.bgStrip}`, padding: '32px' }}>
                <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.16em', color: C.textMuted, textTransform: 'uppercase', marginBottom: '20px' }}>
                  What This Guide Is Not
                </div>
                {[
                  'Not a step-by-step implementation manual',
                  'Not legal advice',
                  'Not dispatch or business growth training',
                  'Not a substitute for structured compliance systems',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <span style={{ color: '#DC2626', fontWeight: '700', flexShrink: 0, fontSize: '15px' }}>✗</span>
                    <span style={{ fontFamily: S.inter, fontSize: '14px', color: C.textMuted, lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 6: Who This Is For ───────────────────────────────────── */}
        <section style={{ background: C.bgStrip, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: S.playfair, fontSize: '32px', fontWeight: '800', color: C.navy, margin: '0 0 36px', lineHeight: '1.2' }}>
              Who This Guide Is For
            </h2>
            <div className="risk-map-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* For */}
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.gold}`, padding: '32px' }}>
                <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.16em', color: C.gold, textTransform: 'uppercase', marginBottom: '20px' }}>
                  This Guide Is For
                </div>
                {[
                  'New authorities',
                  'First 90 days of operation',
                  'Owner-operators who want structure',
                  'Compliance-first operators',
                  'CDL and non-CDL carriers',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ color: C.gold, fontWeight: '700', flexShrink: 0 }}>→</span>
                    <span style={{ fontFamily: S.inter, fontSize: '14px', color: C.text, lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Not For */}
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.bgStrip}`, padding: '32px' }}>
                <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.16em', color: C.textMuted, textTransform: 'uppercase', marginBottom: '20px' }}>
                  This Guide Is Not For
                </div>
                {[
                  'People looking for shortcuts',
                  'People wanting legal interpretation',
                  'Operators needing enterprise fleet guidance',
                  'People wanting execution without context',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ color: C.textLight, fontWeight: '700', flexShrink: 0 }}>→</span>
                    <span style={{ fontFamily: S.inter, fontSize: '14px', color: C.textMuted, lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 7: Opt-in Form ───────────────────────────────────────── */}
        <section
          ref={formRef}
          id="opt-in-form"
          style={{ background: C.bg, padding: '96px 24px', borderTop: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.18em', color: C.gold, textTransform: 'uppercase', marginBottom: '16px' }}>
              Free Resource
            </div>
            <h2 style={{ fontFamily: S.playfair, fontSize: '36px', fontWeight: '800', color: C.navy, margin: '0 0 12px', lineHeight: '1.2' }}>
              Get the Risk Map
            </h2>
            <p style={{ fontFamily: S.inter, fontSize: '15px', color: C.textMuted, lineHeight: '1.65', margin: '0 0 36px' }}>
              Delivered to your inbox. No account required.
            </p>

            <form data-testid="risk-map-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div>
                <label style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  First Name
                </label>
                <input
                  data-testid="risk-map-first-name"
                  name="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontFamily: S.inter,
                    fontSize: '15px',
                    color: C.text,
                    background: '#FFFFFF',
                    border: `1px solid rgba(13,34,64,0.18)`,
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.gold)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(13,34,64,0.18)')}
                />
              </div>
              <div>
                <label style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  data-testid="risk-map-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontFamily: S.inter,
                    fontSize: '15px',
                    color: C.text,
                    background: '#FFFFFF',
                    border: `1px solid rgba(13,34,64,0.18)`,
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.gold)}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(13,34,64,0.18)')}
                />
              </div>
              {error && (
                <p data-testid="risk-map-error" style={{ fontFamily: S.inter, fontSize: '13px', color: '#DC2626', margin: '0' }}>{error}</p>
              )}
              <button
                data-testid="risk-map-submit-btn"
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? 'rgba(201,168,76,0.6)' : C.gold,
                  color: C.navy,
                  fontFamily: S.mono,
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '16px 32px',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  marginTop: '4px',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => { if (!submitting) e.currentTarget.style.background = C.goldDark; }}
                onMouseOut={(e) => { if (!submitting) e.currentTarget.style.background = C.gold; }}
              >
                {submitting ? 'Sending...' : 'Send Me the Risk Map'}
              </button>
            </form>
            <p style={{ fontFamily: S.inter, fontSize: '12px', color: C.textLight, lineHeight: '1.6', margin: '16px 0 0', textAlign: 'center' }}>
              No hype. No pressure. Just clear guidance for the first 90 days.
            </p>
          </div>
        </section>

        {/* ── Section 8: Bridge to REACH ───────────────────────────────────── */}
        <section style={{ background: C.bgStrip, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: S.playfair, fontSize: '32px', fontWeight: '800', color: C.navy, margin: '0 0 20px', lineHeight: '1.3' }}>
              Reading the map is step one.<br />Knowing where your operation is exposed is step two.
            </h2>
            <p style={{ fontFamily: S.inter, fontSize: '16px', color: C.textMuted, lineHeight: '1.75', margin: '0 0 32px' }}>
              The Risk Map shows where the pressure points are. The REACH Diagnostic helps identify which phase may already be at risk in your specific operation.
            </p>
            <a
              data-testid="bridge-reach-link"
              href="https://www.launchpathedu.com/reach-diagnostic"
              style={{
                display: 'inline-block',
                border: `2px solid ${C.navy}`,
                color: C.navy,
                fontFamily: S.mono,
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '14px 28px',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = '#FFF'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.navy; }}
            >
              Run the REACH Diagnostic →
            </a>
          </div>
        </section>

        {/* ── Section 9: Founder Credibility ───────────────────────────────── */}
        <section style={{ background: C.bg, padding: '60px 24px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: S.playfair, fontSize: '20px', fontWeight: '700', color: C.navy, marginBottom: '6px' }}>
              Vince Lawrence
            </div>
            <div style={{ fontFamily: S.inter, fontSize: '13px', color: C.textMuted, marginBottom: '12px' }}>
              Founder, LaunchPath Transportation EDU
            </div>
            <p style={{ fontFamily: S.inter, fontSize: '14px', color: C.textMuted, lineHeight: '1.75', margin: '0 0 20px' }}>
              Veteran-owned. Compliance-first. Built for new carriers who want structure, not guesswork.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {[
                'U.S. Navy Veteran',
                'OSHA Certified',
                '25+ Years Leadership & Safety Operations',
                'Founder, LaunchPath',
              ].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontFamily: S.mono,
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.10em',
                    color: C.textMuted,
                    background: C.bgStrip,
                    border: `1px solid ${C.border}`,
                    padding: '5px 12px',
                    textTransform: 'uppercase',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 10: Final CTA ─────────────────────────────────────────── */}
        <section style={{ background: C.navy, padding: '96px 24px' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: S.mono, fontSize: '10px', fontWeight: '700', letterSpacing: '0.18em', color: 'rgba(201,168,76,0.70)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Protect Your Authority
            </div>
            <h2 style={{ fontFamily: S.playfair, fontSize: '40px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px', lineHeight: '1.2' }}>
              Your authority is an asset.<br />Protect it early.
            </h2>
            <p style={{ fontFamily: S.inter, fontSize: '16px', color: 'rgba(255,255,255,0.60)', lineHeight: '1.7', margin: '0 0 40px' }}>
              The first 90 days define the compliance pattern that follows you through the audit window. Start with a clear view.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button
                data-testid="final-get-risk-map-btn"
                onClick={scrollToForm}
                style={{
                  background: C.gold,
                  color: C.navy,
                  fontFamily: S.mono,
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '16px 32px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = C.goldDark)}
                onMouseOut={(e) => (e.currentTarget.style.background = C.gold)}
              >
                Get the Risk Map
              </button>
              <a
                data-testid="final-reach-link"
                href="https://www.launchpathedu.com/reach-diagnostic"
                style={{
                  display: 'inline-block',
                  border: '2px solid rgba(255,255,255,0.35)',
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: S.mono,
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '14px 28px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; e.currentTarget.style.color = '#FFF'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
              >
                Run the REACH Diagnostic →
              </a>
            </div>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
}
