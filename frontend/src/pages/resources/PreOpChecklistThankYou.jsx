import Head from 'next/head';
import Link from 'next/link';

const navy = '#000F1F';
const gold = '#d4900a';
const mono = "'Inter', sans-serif";
const serif = "'Newsreader', 'Playfair Display', serif";

const PHASES = [
  {
    label: 'Phase 1 — Formation',
    items: [
      'LLC or legal entity formed',
      'EIN obtained from IRS',
      'Dedicated business bank account opened',
      'Commercial insurance quotes initiated',
    ],
  },
  {
    label: 'Phase 2 — Registration',
    items: [
      'DOT number obtained',
      'MC number applied for (OP-1, $300)',
      'BOC-3 process agent filed',
      'UCR registration completed for current year',
    ],
  },
  {
    label: 'Phase 3 — Pre-Operation (Complete Before Dispatch)',
    items: [
      'Insurance filed via BMC-91 — active and verified in SAFER',
      'Drug and Alcohol program established — consortium enrolled, DER designated',
      'Pre-employment drug test completed for every CDL driver — result on file',
      'Complete DQ file in place for every CDL driver',
      'ELD installed — confirmed on FMCSA approved device list',
      'IFTA and IRP registration initiated with base state (within 30 days)',
    ],
  },
  {
    label: 'Phase 4 — Operational Discipline (From Day One)',
    items: [
      'HOS records current from first dispatch',
      'Maintenance records active — PM schedule documented, DVIR process in place',
      'Accident register established and accessible',
    ],
  },
];

export default function PreOpChecklistThankYou() {
  return (
    <>
      <Head>
        <title>Pre-Operation Compliance Checklist | LaunchPath</title>
        <meta name="description" content="Your 4-phase pre-operation compliance checklist for new motor carriers." />
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ background: '#F4F1EB', minHeight: '100vh', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Mark */}
          <p style={{
            fontFamily: mono, fontSize: '0.714rem', fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(212,144,10,0.65)', marginBottom: '2rem',
          }}>
            LaunchPath Transportation EDU
          </p>

          {/* Gold rule */}
          <div style={{ width: 40, height: 3, background: gold, marginBottom: '1.75rem' }} />

          {/* Headline */}
          <h1 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: navy, lineHeight: 1.15, marginBottom: '1rem',
          }}>
            Pre-Operation Compliance Checklist
          </h1>

          <p style={{
            fontFamily: mono, fontSize: '0.95rem',
            color: 'rgba(0,15,31,0.6)', lineHeight: 1.75, marginBottom: '2.5rem',
          }}>
            Work through these phases in sequence. Do not dispatch until every item in Phase 3 is complete.
          </p>

          {/* Checklist phases */}
          {PHASES.map((phase, i) => (
            <div
              key={i}
              data-testid={`checklist-phase-${i + 1}`}
              style={{
                background: '#fff',
                borderLeft: `4px solid ${i === 2 ? gold : 'rgba(0,15,31,0.12)'}`,
                padding: '1.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <p style={{
                fontFamily: mono, fontWeight: 700, fontSize: '0.762rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: i === 2 ? gold : 'rgba(0,15,31,0.45)',
                marginBottom: '0.85rem',
              }}>
                {phase.label}
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {phase.items.map((item, j) => (
                  <li key={j} style={{
                    fontFamily: mono, fontSize: '0.9rem',
                    color: 'rgba(0,15,31,0.78)', lineHeight: 1.75, marginBottom: '0.45rem',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CFR note */}
          <p style={{
            fontFamily: mono, fontSize: '0.762rem',
            color: 'rgba(0,15,31,0.4)', lineHeight: 1.6,
            marginTop: '0.5rem', marginBottom: '3rem',
          }}>
            Regulations: 49 CFR Parts 391 · 382 · 387 · 395 · 396 · 385
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,15,31,0.1)', marginBottom: '3rem' }} />

          {/* Next step */}
          <p style={{
            fontFamily: mono, fontSize: '0.714rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(212,144,10,0.65)', marginBottom: '0.75rem',
          }}>
            Next Step
          </p>

          <h2 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: navy, lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            Check your exposure with REACH.
          </h2>

          <p style={{
            fontFamily: mono, fontSize: '0.95rem',
            color: 'rgba(0,15,31,0.65)', lineHeight: 1.75, marginBottom: '1.75rem',
          }}>
            The checklist tells you what to build. REACH tells you what is already exposed. It is a free scored diagnostic — less than ten minutes — showing your current risk across the Four Pillars.
          </p>

          <Link
            href="/auto-diagnostic"
            data-testid="checklist-thankyou-reach-cta"
            style={{
              display: 'inline-block',
              background: navy,
              color: gold,
              fontFamily: mono, fontWeight: 700,
              fontSize: '0.762rem', letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.875rem 2rem',
              textDecoration: 'none',
              border: `2px solid ${gold}`,
              marginBottom: '0.75rem',
            }}
          >
            Run the REACH Test
          </Link>

          <p style={{
            fontFamily: mono, fontSize: '0.762rem',
            color: 'rgba(0,15,31,0.4)', marginTop: '0.5rem',
          }}>
            Free. No login. No payment.
          </p>

          {/* Footer */}
          <p style={{
            fontFamily: mono, fontSize: '0.714rem',
            color: 'rgba(0,15,31,0.25)', letterSpacing: '0.1em',
            textTransform: 'uppercase', marginTop: '4rem',
          }}>
            launchpathedu.com · This content is educational and does not constitute legal or regulatory advice.
          </p>
        </div>
      </div>
    </>
  );
}
