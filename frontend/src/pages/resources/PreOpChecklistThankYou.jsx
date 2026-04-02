import Head from 'next/head';
import Link from 'next/link';

const navy = '#000F1F';
const gold = '#d4900a';
const coral = '#D85A30';
const mono = "'Inter', sans-serif";
const serif = "'Newsreader', 'Playfair Display', serif";
const PDF_URL = "/downloads/LaunchPath_Complete_Audit_Binder_Series.pdf";

const BINDERS = [
  {
    code: "LP-BIND-01",
    title: "New Entrant Compliance",
    items: [
      "Authority registration sequence (DOT, MC, BOC-3, UCR)",
      "Insurance filing checklist (BMC-91, MCS-90)",
      "New entrant safety audit readiness items",
    ],
  },
  {
    code: "LP-BIND-02",
    title: "Hours of Service (HOS)",
    items: [
      "ELD compliance and device verification",
      "Driver log audit checkpoints",
      "Exemption documentation requirements",
    ],
  },
  {
    code: "LP-BIND-03",
    title: "Drug & Alcohol",
    items: [
      "Pre-employment testing and consortium enrollment",
      "Random testing program requirements",
      "DER designation and supervisor training records",
    ],
  },
  {
    code: "LP-BIND-04",
    title: "Maintenance",
    items: [
      "Preventive maintenance schedule documentation",
      "DVIR process and driver reporting",
      "Out-of-service repair and return-to-service verification",
    ],
  },
  {
    code: "LP-BIND-05",
    title: "Insurance",
    items: [
      "Minimum coverage levels by cargo type",
      "BMC-91 filing and FMCSA verification steps",
      "Certificate of insurance and endorsement checklist",
    ],
  },
  {
    code: "LP-BIND-06",
    title: "Authority Registrations",
    items: [
      "IFTA and IRP base-state registration",
      "Unified Carrier Registration (UCR) annual requirement",
      "Operating authority renewal and lapse prevention",
    ],
  },
];

export default function PreOpChecklistThankYou() {
  return (
    <>
      <Head>
        <title>The Complete Audit Binder Series | LaunchPath</title>
        <meta name="description" content="All 6 compliance checklists for new motor carriers in one printable PDF — New Entrant, HOS, Drug & Alcohol, Maintenance, Insurance, Authority Registrations." />
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ background: '#F4F1EB', minHeight: '100vh', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {/* Mark */}
          <p style={{
            fontFamily: mono, fontSize: '0.714rem', fontWeight: 700,
            letterSpacing: '0.20em', textTransform: 'uppercase',
            color: coral, marginBottom: '1.5rem',
          }}>
            The Complete Audit Binder Series
          </p>

          {/* Coral rule */}
          <div style={{ width: 48, height: 2, background: coral, marginBottom: '1.75rem' }} />

          {/* Headline */}
          <h1 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: navy, lineHeight: 1.15, marginBottom: '1rem',
          }}>
            All 6 compliance checklists in one printable PDF
          </h1>

          <p style={{
            fontFamily: mono, fontSize: '0.95rem',
            color: 'rgba(0,15,31,0.6)', lineHeight: 1.75, marginBottom: '2.5rem',
          }}>
            New Entrant — HOS — Drug &amp; Alcohol — Maintenance — Insurance — Authority Registrations. Work through each domain before your first dispatch.
          </p>

          {/* Download CTA */}
          <a
            href={PDF_URL}
            download="LaunchPath_Complete_Audit_Binder_Series.pdf"
            data-testid="thankyou-download-btn"
            style={{
              display: 'inline-block',
              background: navy,
              color: '#fff',
              fontFamily: mono, fontWeight: 700,
              fontSize: '0.857rem', letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              border: `2px solid ${navy}`,
              marginBottom: '3rem',
            }}
          >
            Download All Checklists (PDF)
          </a>

          {/* Binders */}
          {BINDERS.map((binder, i) => (
            <div
              key={i}
              data-testid={`binder-${i + 1}`}
              style={{
                background: '#fff',
                borderLeft: `3px solid ${coral}`,
                padding: '1.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <p style={{
                fontFamily: mono, fontWeight: 700, fontSize: '0.625rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: coral, marginBottom: '0.35rem',
              }}>
                {binder.code}
              </p>
              <p style={{
                fontFamily: serif, fontWeight: 700, fontSize: '1rem',
                color: navy, marginBottom: '0.75rem',
              }}>
                {binder.title}
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {binder.items.map((item, j) => (
                  <li key={j} style={{
                    fontFamily: mono, fontSize: '0.857rem',
                    color: 'rgba(0,15,31,0.65)', lineHeight: 1.75, marginBottom: '0.35rem',
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
            marginTop: '0.75rem', marginBottom: '3rem',
          }}>
            Covers: 49 CFR Parts 391 · 382 · 387 · 395 · 396 · 385 · 360 · 365
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,15,31,0.1)', marginBottom: '3rem' }} />

          {/* Next step */}
          <p style={{
            fontFamily: mono, fontSize: '0.714rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: coral, marginBottom: '0.75rem',
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
            The checklist tells you what to build. REACH tells you what is already exposed. Free scored diagnostic — less than ten minutes — showing your current risk across the Four Pillars.
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

