import { useState } from 'react';
import { Play, Award, Shield, Clock, Users } from 'lucide-react';
import { Link } from '../../compat/Link';

const CREDS = [
  { icon: Shield, text: 'U.S. Navy Safety Veteran' },
  { icon: Award, text: 'OSHA 30-Hour Certified' },
  { icon: Clock, text: '25+ Years Regulatory Leadership' },
  { icon: Users, text: 'Founder, LaunchPath Transportation EDU LLC' },
];

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

export default function VinceVideoLetterSection({ videoUrl }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section style={{ background: '#FAF8F4', borderTop: '1px solid rgba(28,43,58,0.08)', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '4rem', alignItems: 'center' }} className="lp-two-col">

        {/* Left — Video */}
        <div>
          <div style={{ border: '2px solid #1C2B3A', padding: 3, background: '#1C2B3A', boxShadow: '0 24px 64px rgba(28,43,58,0.2)' }}>
            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0D1B2A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {playing && videoUrl ? (
                <iframe src={videoUrl} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; fullscreen" allowFullScreen />
              ) : (
                <>
                  {videoUrl ? (
                    /* Play state — video URL available */
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0D1B2A 0%, #1C2B3A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ ...mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.72)', marginBottom: '2rem' }}>Director's Briefing</div>
                        <button onClick={() => setPlaying(true)} aria-label="Play director's briefing" style={{ width: 64, height: 64, background: 'rgba(139,115,85,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', borderRadius: 0 }}>
                          <Play size={22} color="#1C2B3A" fill="#1C2B3A" />
                        </button>
                        <div style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(250,248,244,0.80)' }}>Click to play</div>
                      </div>
                    </div>
                  ) : (
                    /* Teaser state — recording in production */
                    <div data-testid="directors-briefing-teaser" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0D1B2A 0%, #111D2C 100%)', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '2rem 2.25rem', overflowY: 'auto' }}>
                      <div>
                        <div style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1rem' }}>LP-VID-001 · Director's Briefing</div>
                        <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(250,248,244,0.75)', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: 400 }}>
                          Recording in production — available before LP-COH-002 opens. In the briefing, Vince covers:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {[
                            'Why most new carriers fail the New Entrant audit inside 18 months',
                            'What the FMCSA investigator is looking for when they open your file',
                            'How the LaunchPath Standard closes the gap between operations and documentation',
                            'What the Ground 0 Briefing covers and what to expect',
                          ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                              <span style={{ color: '#C8A96E', fontSize: '0.75rem', flexShrink: 0, marginTop: '0.15rem' }}>—</span>
                              <span style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(250,248,244,0.72)', lineHeight: 1.65 }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(250,248,244,0.55)', lineHeight: 1.65, marginBottom: '1.25rem', fontStyle: 'italic', maxWidth: 380 }}>
                          Request a Ground 0 Briefing now — Vince will cover this and your specific exposure in the session.
                        </p>
                        <Link to="/ground-0-briefing" style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#C8A96E', color: '#0D1B2A', padding: '0.625rem 1.25rem', textDecoration: 'none', fontWeight: 700 }}>
                          Request Ground 0 Briefing →
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Bottom strip */}
            <div style={{ background: 'rgba(28,43,58,0.95)', padding: '0.6rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', color: 'rgba(250,248,244,0.82)' }}>Director's Briefing · Recorded May 2026</span>
              <span style={{ ...mono, fontSize: 9, color: 'rgba(250,248,244,0.72)' }}>LP-VID-001</span>
            </div>
          </div>
        </div>

        {/* Right — Metadata */}
        <div>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>Safety Director · LaunchPath</p>
          <h2 style={{ ...serif, fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2rem)', color: '#1C2B3A', marginBottom: '1.75rem', lineHeight: 1.2 }}>Vince Lawrence</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {CREDS.map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Icon size={14} color="#C8A96E" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.875rem', color: '#2D3748', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          <blockquote style={{ borderLeft: '3px solid #8B7355', paddingLeft: '1.25rem', margin: '0 0 2rem', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.05rem', color: '#1C2B3A', lineHeight: 1.7 }}>
            "I don't do your compliance. I build the system so you can do it yourself — protecting your operating authority from Day 1."
          </blockquote>

          <Link to="/ground-0-briefing" data-testid="vince-section-cta" style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#1C2B3A', color: '#FAF8F4', padding: '0.85rem 1.5rem', textDecoration: 'none', display: 'inline-block', borderRadius: 0 }}>
            Request Ground 0 Briefing
          </Link>
        </div>
      </div>
    </section>
  );
}
