const NAVY = '#1C2B3A';
const GOLD = '#8B7355';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

export default function VinceQuoteSection() {
  return (
    <section data-testid="cl-vince-quote" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: 'clamp(3rem,6vw,5rem) 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '8fr 4fr', gap: '4rem', alignItems: 'center' }} className="cl-quote-grid">
        {/* Quote */}
        <div>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.25rem', fontWeight: 700 }}>
            LP-DOC-003 · STATION CUSTODIAN
          </p>
          <blockquote style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.25rem,2.5vw,1.75rem)', color: NAVY, lineHeight: 1.5, borderLeft: `4px solid ${GOLD}`, paddingLeft: '1.75rem', margin: 0 }}>
            "Most carriers don't fail their audit because they lacked a form. They fail because no one installed the forms in the right order, at the right time, with the right verification in place."
          </blockquote>
        </div>

        {/* Attribution */}
        <div>
          <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(28,43,58,0.7)', lineHeight: 2, margin: 0 }}>
            VINCE LAWRENCE<br />
            <span style={{ color: 'rgba(28,43,58,0.45)' }}>STATION CUSTODIAN, LAUNCHPATH TRANSPORTATION EDU</span><br />
            <span style={{ color: 'rgba(28,43,58,0.45)' }}>25 YEARS IN SAFETY MANAGEMENT · OSHA CERTIFIED</span>
          </p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.cl-quote-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}
