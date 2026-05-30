const NAVY = '#1C2B3A';
const GOLD = '#8B7355';
const BG = '#FAF8F4';
const CARD = '#F5F2EC';
const BORDER = 'rgba(28,43,58,0.12)';
const SERIF = "'Playfair Display', serif";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', sans-serif";

const FAQS = [
  {
    q: 'Why is the $499 Document System less expensive than the $699 Complete Library?',
    a: 'Different products, different purpose. The bundle includes the implementation architecture — the folder map, the 0–90 day calendar, and the master checklist — that tells you what to do and when. The library is the complete document collection without the installation structure. Most carriers need the system, not just the documents.',
  },
  {
    q: 'Can I upgrade from the $499 bundle to the Standard later?',
    a: 'Yes. Bundle purchasers may apply their purchase toward Standard enrollment within 90 days.',
  },
  {
    q: 'What if I already have some documents in place?',
    a: "The Ground 0 module (free) identifies what's already installed and what's missing. You don't rebuild what works — you close the gaps.",
  },
];

export default function PrePurchaseFAQ() {
  return (
    <section data-testid="cl-faq" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: 'clamp(3rem,6vw,5rem) 1.5rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: '2rem', fontWeight: 700 }}>
          BEFORE YOU BUY — READ THIS
        </p>
        <div>
          {FAQS.map((item, i) => (
            <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${BORDER}` : 'none', paddingBottom: '2rem', marginBottom: '2rem' }}>
              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1rem', color: NAVY, lineHeight: 1.4, marginBottom: '0.75rem' }}>
                {item.q}
              </p>
              <p style={{ fontFamily: SANS, fontSize: '0.9rem', color: 'rgba(28,43,58,0.65)', lineHeight: 1.8, margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
