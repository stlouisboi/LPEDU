const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

export default function ChecklistDownloadBanner() {
  return (
    <section data-testid="kc-bundle-download" style={{ background: 'rgba(139,115,85,0.07)', borderTop: '1px solid rgba(139,115,85,0.2)', borderBottom: '1px solid rgba(139,115,85,0.2)', padding: '2.75rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }} className="lp-two-col">
        <div>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.625rem' }}>
            THE COMPLETE AUDIT BINDER SERIES
          </p>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: '1.35rem', color: '#1C2B3A', letterSpacing: '-0.015em', marginBottom: '0.5rem' }}>
            All 6 compliance checklists in one printable PDF
          </h2>
          <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(28,43,58,0.75)', lineHeight: 1.65 }}>
            New Entrant — HOS — Drug & Alcohol — Maintenance — Insurance — Authority Registrations
          </p>
        </div>
        <a
          href="/knowledge-center/all-checklists"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="kc-download-all-btn"
          style={{ ...mono, fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#8B7355', color: '#FAF8F4', padding: '1rem 1.75rem', textDecoration: 'none', whiteSpace: 'nowrap', borderRadius: 0, flexShrink: 0 }}>
          DOWNLOAD ALL CHECKLISTS
        </a>
      </div>
    </section>
  );
}
