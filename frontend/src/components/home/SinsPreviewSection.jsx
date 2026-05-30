import { Link } from '../../compat/Link';

const SINS = [
  { num: '01', name: 'Authority Blindness', desc: 'Operating without verifying your authority is active, properly classified, and current in the FMCSA registry.' },
  { num: '07', name: 'The Clearinghouse Ghost', desc: 'Failure to query the FMCSA Drug & Alcohol Clearinghouse before a driver\'s first dispatch. A direct 49 CFR 382.701 violation.' },
  { num: '16', name: 'The Biennial Gap', desc: 'MCS-150 biennial update not filed, filed late, or filed with incorrect operational data. Visible in every federal compliance database.' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

export default function SinsPreviewSection() {
  return (
    <section style={{ background: '#1C2B3A', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.75rem' }}>Compliance Threat Taxonomy</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#FAF8F4', marginBottom: '3rem', maxWidth: 600 }}>
          16 Documented Paths to Automatic Audit Failure
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(250,248,244,0.08)', marginBottom: '2.5rem' }} className="lp-three-col">
          {SINS.map((s, i) => (
            <div key={i} style={{ background: 'rgba(250,248,244,0.03)', padding: '1.75rem' }}>
              <p style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>Sin {s.num}</p>
              <p style={{ ...serif, fontWeight: 700, fontSize: '1rem', color: '#FAF8F4', marginBottom: '0.75rem' }}>{s.name}</p>
              <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.875rem', color: 'rgba(250,248,244,0.5)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/standards/16-deadly-sins" data-testid="sins-preview-cta" style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FAF8F4', border: '1px solid rgba(250,248,244,0.3)', padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block', borderRadius: 0 }}>
            View All 16 Exposure Sins →
          </Link>
        </div>
      </div>
    </section>
  );
}
