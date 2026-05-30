import { AlertTriangle } from 'lucide-react';

const CARDS = [
  { title: 'The File Gap', body: 'Drivers operating under your authority with no complete, current Driver Qualification File on record. Missing documentation is indistinguishable from non-compliance to an auditor.' },
  { title: 'The Clearinghouse Ghost', body: "No pre-employment Drug & Alcohol Clearinghouse query on record before a driver's first dispatch. One missing query is a direct 49 CFR 382.701 violation." },
  { title: 'The Biennial Gap', body: 'MCS-150 not updated within the required 2-year window. Operating with a stale filing is an authority classification error visible in every federal database.' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

export default function FailurePatternSection() {
  return (
    <section style={{ padding: 'clamp(4rem,7vw,6rem) 1.5rem', background: '#FAF8F4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="lp-two-col">

        {/* Left */}
        <div>
          <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.25rem' }}>The Compliance Failure Pattern</p>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#1C2B3A', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Most carriers don't fail audits because they're bad operators. They fail because their paperwork doesn't match their operations.
          </h2>
          <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '1rem', color: 'rgba(45,55,72,0.7)', lineHeight: 1.8, marginBottom: '1rem' }}>
            FMCSA investigators are not evaluating your driving record or your safety instincts. They are looking for documentation that proves your compliance system exists and is current. Good operations with incomplete records look identical to non-compliant operations.
          </p>
          <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '1rem', color: 'rgba(45,55,72,0.7)', lineHeight: 1.8 }}>
            The gap between how you operate and what your files prove is where authority is lost. LaunchPath closes that gap before an investigator arrives.
          </p>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {CARDS.map((c, i) => (
            <div key={i} style={{ background: '#F5F2EC', border: '1px solid rgba(28,43,58,0.12)', padding: '1.5rem', borderRadius: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <AlertTriangle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ ...serif, fontWeight: 700, fontSize: '1rem', color: '#1C2B3A', marginBottom: '0.4rem' }}>{c.title}</p>
                  <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.875rem', color: 'rgba(45,55,72,0.7)', lineHeight: 1.75, margin: 0 }}>{c.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
