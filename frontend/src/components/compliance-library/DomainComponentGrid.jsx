import Link from 'next/link';

const NAVY = '#1C2B3A';
const GOLD = '#C8A96E';
const BG = '#FAF8F4';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

const DOMAINS = [
  { code: 'DOMAIN 1 · AUTHORITY & NEW ENTRANT', title: 'New Entrant Compliance Packet', desc: 'Full 18-month new entrant roadmap — authority activation through audit window.', bestFor: 'Carriers in first 18 months', price: '$139', sku: 'LP-PKT-001', href: '/products/new-entrant-packet', img: '/images/products/domain1-new-entrant.webp' },
  { code: 'DOMAIN 2 · DRIVER QUALIFICATION',    title: 'DQ File Builder Kit',           desc: 'Complete CFR-compliant DQ file system for every driver in your fleet.',         bestFor: 'Fleets adding drivers',       price: '$129', sku: 'LP-PKT-DQ',  href: '/products/dq-file-builder',     img: '/images/products/domain2-dq-files.webp' },
  { code: 'DOMAIN 3 · DRUG & ALCOHOL',          title: 'Drug & Alcohol Compliance Packet', desc: 'Complete Part 382 program — policy, testing, Clearinghouse integration.',    bestFor: 'Owner-operators setting up Part 382', price: '$129', sku: 'LP-PKT-002', href: '/products/drug-alcohol-packet', img: '/images/products/domain3-drug-alcohol.webp' },
  { code: 'DOMAIN 4 · HOS & DISPATCH',          title: 'HOS & Dispatch Compliance Packet', desc: 'ELD compliance, dispatch standards, HOS records that hold under inspection.', bestFor: 'Carriers using ELDs',         price: '$119', sku: 'LP-PKT-003', href: '/products/hos-packet',          img: '/images/products/domain4-hos-dispatch.webp' },
  { code: 'DOMAIN 5 · VEHICLE MAINTENANCE',     title: 'Maintenance & Unit File Packet',   desc: 'Unit files, PM schedules, and repair documentation per Part 396.',           bestFor: 'Owner-operators building unit files', price: '$119', sku: 'LP-PKT-004', href: '/products/maintenance-packet', img: '/images/products/domain5-maintenance.webp' },
  { code: 'DOMAIN 6 · INSURANCE CONTINUITY',    title: 'Insurance & Authority Packet',     desc: 'Filings, renewal calendar, and monitoring that keep your authority active.',  bestFor: 'Carriers managing filings independently', price: '$109', sku: 'LP-PKT-005', href: '/products/insurance-packet', img: '/images/products/domain6-insurance.webp' },
];

const SUPPLEMENTAL = [
  { code: 'DIAGNOSTIC TOOLS', title: '16 Deadly Sins Pocket Guide & Audit Prep', desc: 'Self-audit tools and audit prep resources.', price: '$59', sku: 'LP-PKT-SINS', href: '/standards/16-deadly-sins', img: '/images/products/tool-deadly-sins.webp' },
  { code: 'AUDIT PREPARATION & RESPONSE', title: '18-Month Readiness Protocol', desc: '18-month readiness protocol and 48-hour response system for New Entrant Safety Audits.', price: '$169', sku: 'LP-RES-004', href: '/products/safety-audit-prep', img: '/images/products/tool-audit-prep.webp' },
];

export default function DomainComponentGrid({ onBuy, states, errors }) {
  return (
    <section id="component-library" data-testid="cl-domain-grid" style={{ background: BG, borderTop: `1px solid ${BORDER}`, padding: 'clamp(3rem,6vw,5rem) 1.5rem 3rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.625rem', fontWeight: 700 }}>
          JUST NEED ONE AREA FIXED?
        </p>
        <p style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(28,43,58,0.82)', lineHeight: 1.75, maxWidth: 680, marginBottom: '1.5rem' }}>
          Know exactly which domain needs attention? Each packet covers one compliance area completely. Select your domain. Install it. Move to the next.
        </p>

        {/* Upsell note */}
        <div style={{ marginBottom: '2.5rem', padding: '0.875rem 1.25rem', background: CARD, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(28,43,58,0.55)', margin: 0, lineHeight: 1.5 }}>
            Buying more than one domain? The Document System Bundle includes all six compliance packets plus the Unified Folder Structure Guide — $176 below individual acquisition cost.
          </p>
          <a href="#bundle" data-testid="domain-bundle-crosssell" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            INSTALL THE BUNDLE →
          </a>
        </div>

        {/* 6 Domain Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: `1px solid ${BORDER}` }} className="cl-domain-grid">
          {DOMAINS.map((d, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const isLoading = states?.[d.sku] === 'loading';
            return (
              <div key={d.sku} style={{
                borderRight: col < 2 ? `1px solid ${BORDER}` : 'none',
                borderBottom: row < 1 ? `1px solid ${BORDER}` : 'none',
                display: 'flex', flexDirection: 'column',
              }}>
                {d.img && (
                  <div style={{ overflow: 'hidden', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, background: '#1C2B3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={d.img} alt={d.title} style={{ width: '100%', height: 220, objectFit: 'contain', display: 'block' }} />
                  </div>
                )}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.5rem' }}>{d.code}</p>
                <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.05rem', color: NAVY, lineHeight: 1.3, marginBottom: '0.5rem' }}>{d.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(28,43,58,0.82)', lineHeight: 1.7, marginBottom: '0.625rem', flexGrow: 1 }}>{d.desc}</p>
                <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.08em', color: 'rgba(28,43,58,0.4)', marginBottom: '0.875rem' }}>Best for: {d.bestFor}</p>
                <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '1.75rem', color: NAVY, marginBottom: '1rem' }}>{d.price}</div>
                <button
                  data-testid={`buy-btn-${d.sku.toLowerCase()}`}
                  onClick={() => onBuy(d.sku)}
                  disabled={isLoading}
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', border: 'none', padding: '0.75rem 1rem', cursor: isLoading ? 'wait' : 'pointer', display: 'block', width: '100%', textAlign: 'center', borderRadius: 0, marginBottom: '0.5rem', opacity: isLoading ? 0.6 : 1 }}>
                  {isLoading ? 'PROCESSING...' : `ADD TO SYSTEM — ${d.price} →`}
                </button>
                {errors?.[d.sku] && <p style={{ fontFamily: MONO, fontSize: 8, color: '#ef4444', marginBottom: '0.4rem' }}>{errors[d.sku]}</p>}
                <Link
                  href={d.href}
                  data-testid={`view-domain-${d.sku.toLowerCase()}`}
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: NAVY, border: `1px solid ${BORDER}`, padding: '0.75rem 1rem', textDecoration: 'none', display: 'block', textAlign: 'center', borderRadius: 0 }}>
                  VIEW DOMAIN →
                </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Supplemental Tools */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', border: `1px solid ${BORDER}`, borderTop: 'none' }} className="cl-supplemental-grid">
          {SUPPLEMENTAL.map((s, i) => {
            const isLoading = states?.[s.sku] === 'loading';
            return (
              <div key={s.sku} style={{ background: CARD, borderRight: i === 0 ? `1px solid ${BORDER}` : 'none', display: 'flex', flexDirection: 'column' }}>
                {s.img && (
                  <div style={{ overflow: 'hidden', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, background: '#1C2B3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={s.img} alt={s.title} style={{ width: '100%', height: 220, objectFit: 'contain', display: 'block' }} />
                  </div>
                )}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.5rem' }}>{s.code}</p>
                <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1rem', color: NAVY, lineHeight: 1.3, marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(28,43,58,0.82)', lineHeight: 1.7, marginBottom: '0.875rem', flexGrow: 1 }}>{s.desc}</p>
                <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '1.5rem', color: NAVY, marginBottom: '1rem' }}>{s.price}</div>
                <Link
                  href={s.href}
                  data-testid={`view-page-${s.sku.toLowerCase()}`}
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: NAVY, border: `1px solid ${BORDER}`, padding: '0.75rem 1rem', textDecoration: 'none', display: 'block', textAlign: 'center', borderRadius: 0 }}>
                  VIEW PAGE →
                </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle upsell footer */}
        <div style={{ background: 'rgba(28,43,58,0.04)', border: `1px solid ${BORDER}`, borderTop: 'none', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: 'rgba(28,43,58,0.82)', lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
            The Document System Bundle includes all five compliance packets plus the folder architecture, implementation calendar, and master checklist — at $176 below individual acquisition cost.
          </p>
          <a href="#bundle" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: NAVY, color: '#FAF8F4', padding: '0.875rem 1.5rem', textDecoration: 'none', borderRadius: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>
            BUILD THE FULL SYSTEM — $499 →
          </a>
        </div>
      </div>
      <style suppressHydrationWarning>{`@media(max-width:900px){.cl-domain-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){.cl-domain-grid{grid-template-columns:1fr!important}.cl-supplemental-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
