import { Link } from '../compat/Link';
import Image from 'next/image';
import AnnouncementBar from '../components/home/AnnouncementBar';
import SiteHeader from '../components/home/SiteHeader';
import SiteFooter from '../components/home/SiteFooter';
import { Shield, ChevronRight } from 'lucide-react';

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

const DOCTRINE = [
  {
    ref: '§ 1.6',
    title: 'Diagnostic Precedence Rule',
    body: 'Teaching before diagnosing builds systems that don\'t fit the actual operation. The assessment comes first. Always.',
  },
  {
    ref: '§ 1.8',
    title: 'Stewardship Refusal Authority',
    body: 'Carriers who enroll before they are ready don\'t just waste money. They build on a broken foundation. This Standard refuses admission when readiness is absent.',
  },
  {
    ref: '§ 1.9',
    title: 'Responsibility Prioritization',
    body: 'Admission based on willingness to pay rather than readiness to build weakens the Standard for every carrier in the cohort. Readiness determines admission. Not urgency.',
  },
  {
    ref: '§ 2.1',
    title: 'Governance Before Growth',
    body: 'Growing too fast without the right systems in place creates liability that can end the operation. Governance must be installed before capacity is expanded.',
  },
];

const EXCLUSIONS = [
  'Legal advice or legal representation',
  'Dispatch services or load booking',
  'Insurance brokerage or policy placement',
  'Guaranteed FMCSA audit outcomes',
  'Tax preparation or financial advisory',
  'Ongoing consulting retainers or managed services',
  'Revenue generation coaching or freight strategies',
];

const CREDENTIALS = [
  { val: 'U.S. Navy', label: 'Veteran' },
  { val: 'OSHA 30', label: 'OSHA 30-Hour Certified' },
  { val: '25+ Years', label: 'Safety & Compliance Systems' },
  { val: 'SAHC-NC', label: 'Safety & Health Council of North Carolina — Member' },
];

const STATUS_ITEMS = [
  ['AUTHORITY', 'ACTIVE'],
  ['REGISTRY', 'SYNCED'],
  ['INTEGRITY', '100%'],
  ['CFR_SYNC', '2026_V5.2'],
];

export default function AboutPage() {
  return (
    <div className="lp-home">
      <AnnouncementBar />
      <SiteHeader activePath="/about" />

      {/* ── System Status Bar ──────────────────────────────── */}
      <div style={{ background: '#1C2B3A', borderBottom: '1px solid rgba(200,169,110,0.2)', padding: '0.55rem 1.5rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: '2.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {STATUS_ITEMS.map(([key, val]) => (
            <div key={key} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ ...mono, fontSize: 9, color: 'rgba(250,248,244,0.78)', letterSpacing: '0.14em' }}>{key}:</span>
              <span style={{ ...mono, fontSize: 9, color: '#C8A96E', letterSpacing: '0.14em', fontWeight: 700 }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="lp-blueprint" style={{ background: '#FAF8F4', padding: 'clamp(4rem,8vw,6rem) 1.5rem', borderBottom: '1px solid rgba(28,43,58,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '5rem', alignItems: 'start' }} className="lp-hero-grid">

          {/* Left — Identity */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(28,43,58,0.15)', padding: '0.4rem 0.9rem', marginBottom: '1.75rem' }}>
              <Shield size={10} color="#C8A96E" />
              <span style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280' }}>Station Custodian · LP-SYS-V5.2</span>
            </div>

            <h1 style={{ ...serif, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#1C2B3A', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
              Vince Lawrence
            </h1>
            <p style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '2rem' }}>
              LaunchPath Standard · Station Custodian
            </p>

            <p style={{ ...sans, fontSize: '1.1rem', color: 'rgba(45,55,72,0.8)', lineHeight: 1.85, marginBottom: '1.25rem', maxWidth: 520 }}>
              LaunchPath is an institutional operating standard for new motor carriers, not a course or coaching program.
            </p>
            <p style={{ ...sans, fontSize: '1rem', color: 'rgba(45,55,72,0.65)', lineHeight: 1.8, marginBottom: '1.25rem', maxWidth: 520 }}>
              That means a defined set of documents, checkpoints, and behaviors every accepted carrier installs — not videos to watch when there is time.
            </p>
            <p style={{ ...sans, fontSize: '1rem', color: 'rgba(45,55,72,0.65)', lineHeight: 1.8, maxWidth: 520 }}>
              LaunchPath exists to get new motor carriers through the New Entrant period with authority, insurance, and cash flow intact. It requires the right paperwork and programs in place before you put a truck on the road.
            </p>
          </div>

          {/* Right — Vince Photo + Credentials */}
          <div>
            <div style={{ position: 'relative', overflow: 'hidden', height: 560, border: '1px solid rgba(28,43,58,0.1)' }}>
              <Image
                src="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/apm4exp9_Vince.png"
                alt="Vince Lawrence — Station Custodian, LaunchPath Standard"
                fill
                style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
                priority
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(28,43,58,0.92))', padding: '2.5rem 1.25rem 1.25rem' }}>
                <p style={{ ...mono, fontSize: 9, color: '#C8A96E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>STATION CUSTODIAN — LP-SYS-V5.2</p>
              </div>
            </div>

            {/* Credential grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(28,43,58,0.12)', marginTop: '1px' }}>
              {CREDENTIALS.map(({ val, label }) => (
                <div key={val} style={{ background: '#F5F2EC', padding: '0.875rem 1rem' }}>
                  <div style={{ ...serif, fontWeight: 700, fontSize: '0.95rem', color: '#1C2B3A', marginBottom: '0.2rem' }}>{val}</div>
                  <div style={{ ...sans, fontSize: '0.75rem', color: 'rgba(45,55,72,0.55)', lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>

            <p style={{ ...sans, fontSize: '0.78rem', fontStyle: 'italic', color: 'rgba(45,55,72,0.45)', lineHeight: 1.65, marginTop: '0.875rem', paddingLeft: 2 }}>
              "OSHA and FMCSA operate from the same foundation — industries that won't self-regulate require documented systems and audit consequence. That is the credential."
            </p>
          </div>
        </div>
      </section>

      {/* ── Vince's Statement ──────────────────────────────── */}
      <section style={{ background: '#1C2B3A', padding: 'clamp(4rem,7vw,6rem) 1.5rem', borderBottom: '1px solid rgba(200,169,110,0.15)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.5rem' }}>In Vince's Words</p>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#FAF8F4', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
            Vince Lawrence
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              'I did not come from trucking. I came from 25 years of building and leading operational systems in manufacturing and safety environments — where documented processes were the difference between a compliant operation and a costly one, and where leadership meant being accountable for systems other people ran.',
              'When I looked at what new motor carriers were operating without in their first 90 days, I recognized the same failure pattern I had watched surface on the plant floor. Not ignorance. Not laziness. The absence of a system. LaunchPath is built from that pattern recognition. The names are different. The failure modes are not.',
              'In trucking, those same missing systems show up as failed New Entrant Safety Audits, revoked authority, and small carriers running out of cash while fixed costs keep burning.',
              'The Navy runs on documented procedure. Manufacturing and safety operations at the leadership level run on system accountability. OSHA 30-Hour certification is not a trucking credential — it is a regulatory philosophy credential. FMCSA and OSHA operate from the same foundation: industries that will not self-regulate require documented systems, audit mechanisms, and consequence structures. That is the environment I built systems in for two decades. That is the background LaunchPath is built from.',
            ].map((para, i) => (
              <p key={i} style={{ ...sans, fontSize: '1.05rem', color: 'rgba(250,248,244,0.72)', lineHeight: 1.9 }}>{para}</p>
            ))}
          </div>

          <blockquote style={{ borderLeft: '2px solid rgba(200,169,110,0.45)', paddingLeft: '1.5rem' }}>
            <p style={{ ...serif, fontWeight: 600, fontSize: '1.2rem', color: '#FAF8F4', lineHeight: 1.6, fontStyle: 'italic' }}>
              "My responsibility is not to motivate carriers — it is to prevent preventable failure."
            </p>
            <footer style={{ ...sans, fontSize: '0.8rem', color: 'rgba(250,248,244,0.78)', marginTop: '0.75rem' }}>
              — Vince Lawrence, Station Custodian
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Other Ventures ─────────────────────────────────── */}
      <section style={{ background: '#0a0f1a', borderTop: '1px solid rgba(200,169,110,0.08)', borderBottom: '1px solid rgba(200,169,110,0.08)', padding: 'clamp(3rem,5vw,4.5rem) 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.80)', marginBottom: '2rem' }}>Other Ventures</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(200,169,110,0.08)' }}>
            <div style={{ background: '#001B36', padding: '2rem 2rem', borderTop: '2px solid #C8A96E' }}>
              <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>Founded 2022</p>
              <h3 style={{ ...serif, fontWeight: 700, fontSize: '1.3rem', color: '#FAF8F4', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>GigLine</h3>
              <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(250,248,244,0.55)', lineHeight: 1.75 }}>
                Employment and transition platform for U.S. veterans and service members. Built to address the structural gap between military occupational experience and civilian hiring systems. GigLine focuses on documented skill translation, not resume inflation.
              </p>
            </div>
            <div style={{ background: '#001B36', padding: '2rem 2rem', borderTop: '2px solid rgba(200,169,110,0.4)' }}>
              <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>Current</p>
              <h3 style={{ ...serif, fontWeight: 700, fontSize: '1.3rem', color: '#FAF8F4', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>LaunchPath Transportation EDU</h3>
              <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(250,248,244,0.55)', lineHeight: 1.75 }}>
                Institutional compliance operating standard for new motor carriers. Kernersville, North Carolina. Building on 25 years of documented system installation across manufacturing, safety, and workforce environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Operational Doctrine ───────────────────────────── */}
      <section style={{ background: '#FAF8F4', padding: 'clamp(4rem,7vw,6rem) 1.5rem', borderBottom: '1px solid rgba(28,43,58,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 600, marginBottom: '3.5rem' }}>
            <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>49 CFR — Operational Doctrine</p>
            <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#1C2B3A', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Operational Doctrine</h2>
            <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(45,55,72,0.55)' }}>Version 4.2 · Authority: Station Custodian</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(28,43,58,0.1)' }} className="lp-two-col">
            {DOCTRINE.map((d, i) => (
              <div key={d.ref} style={{ background: '#FAF8F4', borderLeft: '2px solid rgba(200,169,110,0.25)', padding: '2rem 2rem 2rem 1.625rem', transition: 'background 0.2s, border-left-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F5F2EC'; e.currentTarget.style.borderLeftColor = '#C8A96E'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FAF8F4'; e.currentTarget.style.borderLeftColor = 'rgba(200,169,110,0.25)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)' }}>
                    DOC-{String(i + 1).padStart(3, '0')} · {d.ref}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(34,197,94,0.7)', border: '1px solid rgba(34,197,94,0.2)', padding: '0.15rem 0.5rem' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(34,197,94,0.7)', display: 'inline-block' }} />
                    ACTIVE
                  </span>
                </div>
                <h3 style={{ ...serif, fontWeight: 700, fontSize: '1.05rem', color: '#1C2B3A', marginBottom: '0.875rem', lineHeight: 1.3 }}>{d.title}</h3>
                <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(45,55,72,0.65)', lineHeight: 1.8 }}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Institutional Boundaries ───────────────────────── */}
      <section style={{ background: '#F5F2EC', padding: 'clamp(4rem,7vw,6rem) 1.5rem', borderBottom: '1px solid rgba(28,43,58,0.08)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.75rem' }}>Institutional Boundaries</p>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#1C2B3A', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            What LaunchPath Does Not Provide
          </h2>
          <p style={{ ...sans, fontSize: '1rem', color: 'rgba(45,55,72,0.65)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Knowing what we don't do is as important as knowing what we do. LaunchPath is a compliance education and implementation system. We build infrastructure. We do not operate your business.
          </p>

          <div style={{ border: '1px solid rgba(28,43,58,0.12)' }}>
            {EXCLUSIONS.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.5rem', borderBottom: i < EXCLUSIONS.length - 1 ? '1px solid rgba(28,43,58,0.08)' : 'none', background: 'transparent', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(28,43,58,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <ChevronRight size={14} color="rgba(28,43,58,0.3)" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(45,55,72,0.7)', lineHeight: 1.7 }}>{item}</p>
              </div>
            ))}
          </div>

          <p style={{ ...sans, fontSize: '0.9rem', color: 'rgba(45,55,72,0.45)', marginTop: '1.5rem', lineHeight: 1.7 }}>
            These boundaries are not limitations — they are the reason the LaunchPath Standard maintains its integrity.
          </p>
        </div>
      </section>

      {/* ── Operator Testimonial ───────────────────────────── */}
      <section style={{ background: '#FAF8F4', padding: 'clamp(3rem,6vw,5rem) 1.5rem', borderBottom: '1px solid rgba(28,43,58,0.08)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '1.75rem' }}>Operator Account</p>
          <blockquote style={{ borderLeft: '2px solid #8B7355', paddingLeft: '1.75rem' }}>
            <p style={{ ...serif, fontWeight: 600, fontSize: 'clamp(1.1rem,2vw,1.3rem)', color: '#1C2B3A', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1rem' }}>
              "I had been running 60 days before I realized I had no written D&A policy and my driver files were missing three required documents. Ground 0 caught it before the audit did."
            </p>
            <footer style={{ ...sans, fontSize: '0.78rem', color: 'rgba(45,55,72,0.45)', letterSpacing: '0.06em' }}>
              — New Entrant Carrier · Owner-Operator · Southeast Region
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────── */}
      <section style={{ background: '#1C2B3A', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.25rem' }}>Next Step</p>
          <p style={{ ...sans, fontSize: '1.05rem', color: 'rgba(250,248,244,0.65)', lineHeight: 1.82, marginBottom: '2.75rem', maxWidth: 560, margin: '0 auto 2.75rem' }}>
            Not all applicants are accepted. Admission is based on operational readiness — not urgency, not ability to pay. If you are in your first 90 days and you are serious about building the system before FMCSA arrives, this is where it starts.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/ground-0-briefing"
              data-testid="about-ground0-cta"
              style={{ display: 'inline-flex', alignItems: 'center', background: '#C8A96E', color: '#FAF8F4', ...mono, fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '1rem 2.25rem', textDecoration: 'none', borderRadius: 0, whiteSpace: 'nowrap' }}
            >
              REQUEST GROUND ZERO BRIEFING →
            </Link>
            <Link
              to="/reach-diagnostic"
              data-testid="about-reach-cta"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'rgba(250,248,244,0.65)', ...mono, fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '1rem 2.25rem', textDecoration: 'none', border: '1px solid rgba(250,248,244,0.15)', borderRadius: 0, whiteSpace: 'nowrap' }}
            >
              RUN REACH DIAGNOSTIC →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
