import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  { q: 'What is the LaunchPath Standard cohort?', a: 'A 90-day, 12-carrier guided implementation program where safety director Vince Lawrence personally reviews your compliance files at five critical checkpoints.' },
  { q: 'Why is the cohort limited to 12 carriers?', a: 'Because Vince manually audits every file. A larger cohort would compromise the quality of the review. This is not a video course.' },
  { q: 'What does "manual file review" mean?', a: 'Vince reviews your actual driver qualification files, drug and alcohol records, hours-of-service logs, and equipment maintenance files — not a template checklist.' },
  { q: 'What is the Verified Registry ID?', a: 'A physical credential mailed to every carrier who completes the 90-day program and passes the Week 11 Integrity Audit. It documents that your compliance system was built and verified by a certified safety professional.' },
  { q: 'What happens if I have compliance gaps going in?', a: 'That is exactly what the program is designed to address. The Orientation audit identifies every gap. The 90-day timeline is structured to close them before an investigator arrives.' },
  { q: 'Is this the same as hiring a compliance consultant?', a: 'No. A consultant does your compliance for you. LaunchPath builds the system so your team can maintain it independently after the cohort ends.' },
  { q: 'What is the Ground Zero Briefing?', a: 'A private 20-minute call with Vince to review your USDOT telemetry, identify your highest-risk exposure areas, and determine if LP-COH-002 is the right fit.' },
  { q: 'How do I find out about investment and enrollment?', a: 'Investment details are disclosed during the Ground Zero Briefing, after Vince reviews your USDOT registry data. Request your briefing to begin the process.' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ background: '#F5F2EC', borderTop: '1px solid rgba(28,43,58,0.1)', borderBottom: '1px solid rgba(28,43,58,0.1)', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.75rem' }}>Common Questions</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#1C2B3A', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
        <div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(28,43,58,0.12)' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}>
                <span style={{ ...serif, fontWeight: 700, fontSize: '0.95rem', color: '#1C2B3A', lineHeight: 1.4 }}>{faq.q}</span>
                {open === i ? <ChevronUp size={16} color="#8B7355" style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color="#6B7280" style={{ flexShrink: 0 }} />}
              </button>
              {open === i && (
                <div style={{ paddingBottom: '1.25rem' }}>
                  <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.9rem', color: 'rgba(45,55,72,0.75)', lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQPage JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      })}} />
    </section>
  );
}
