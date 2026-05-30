import { useState, useEffect } from 'react';
import Image from 'next/image';

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

function AnimatedStat({ num, label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf, start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 1800, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(ease * num));
      if (t < 1) raf = requestAnimationFrame(animate);
      else setCount(num);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [num]);
  return (
    <div>
      <div style={{ ...mono, fontSize: '1.875rem', fontWeight: 700, color: '#FAF8F4', lineHeight: 1, marginBottom: '0.3rem' }}>{count}</div>
      <div style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.4)' }}>{label}</div>
    </div>
  );
}

function StatText({ val, label }) {
  return (
    <div>
      <div style={{ ...serif, fontSize: '1.5rem', fontWeight: 700, color: '#FAF8F4', lineHeight: 1, marginBottom: '0.3rem' }}>{val}</div>
      <div style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.4)' }}>{label}</div>
    </div>
  );
}

export default function LibraryHeroSection() {
  return (
    <section data-testid="kc-hero" style={{ background: '#1C2B3A', padding: 'clamp(4rem,8vw,6rem) 1.5rem', borderBottom: '1px solid rgba(250,248,244,0.08)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4rem', alignItems: 'center' }} className="lp-hero-grid">

        {/* Left */}
        <div>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.35)', marginBottom: '1.5rem' }}>
            LAUNCHPATH / OPERATIONAL LIBRARY
          </p>
          <h1 style={{ ...serif, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,3.75rem)', color: '#FAF8F4', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Operational Library
          </h1>
          <p style={{ ...sans, fontSize: '1.05rem', color: 'rgba(250,248,244,0.85)', lineHeight: 1.82, maxWidth: 520, marginBottom: '3rem' }}>
            Documented briefings on FMCSA compliance, authority operations, and the systems that keep new motor carriers alive through the New Entrant period. Each brief is a working document — not a summary.
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, borderTop: '1px solid rgba(250,248,244,0.12)', paddingTop: '2rem' }}>
            {[
              { num: 19, label: 'Articles Published', isCount: true },
              { num: 8, label: 'Briefs Published', isCount: true },
              { val: '49 CFR', label: 'Primary Source', isCount: false },
              { val: '18-Month', label: 'Audit Window', isCount: false },
            ].map((s, i) => (
              <div key={i} style={{ paddingRight: i < 3 ? '1.5rem' : 0, borderRight: i < 3 ? '1px solid rgba(250,248,244,0.1)' : 'none', paddingLeft: i > 0 ? '1.5rem' : 0 }}>
                {s.isCount
                  ? <AnimatedStat num={s.num} label={s.label} />
                  : <StatText val={s.val} label={s.label} />
                }
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ position: 'relative', overflow: 'hidden', height: 420, border: '1px solid rgba(250,248,244,0.12)' }}>
          <img
            src="https://images.unsplash.com/photo-1698077671410-139c80ac4fb8?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=640"
            alt="Freight carriers on highway — LaunchPath Operational Library"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(28,43,58,0.85) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', background: 'rgba(28,43,58,0.82)', border: '1px solid rgba(250,248,244,0.12)', padding: '0.5rem 0.75rem', backdropFilter: 'blur(4px)' }}>
            <p style={{ ...mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.4)', margin: 0 }}>
              FMCSA NEW ENTRANT PROGRAM · 18-MONTH WINDOW
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
