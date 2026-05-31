/**
 * AnnouncementBar — Dynamic version
 * LP-WRK-001 §7.4: Surface near_capacity signal when remaining ≤ 2.
 * Fetches /api/cohort-seats and updates messaging accordingly.
 */
import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_BACKEND_URL;
const MONO = "'JetBrains Mono','Courier New',monospace";

export default function AnnouncementBar() {
  const [seats, setSeats] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/cohort-seats`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setSeats(d); })
      .catch(() => {});
  }, []);

  // Derive display config
  let bg        = '#1C2B3A';
  let dotColor  = '#059669';
  let dotAnim   = 'lp-pulse 2s infinite';
  let message   = 'LP-COH-002 · Next Cohort Begins July 6, 2026 \u00a0·\u00a0 Limited to 12 Motor Carriers';
  let suffix    = null;

  if (seats) {
    const { remaining, at_capacity, near_capacity } = seats;

    if (at_capacity) {
      bg       = '#1a0a0a';
      dotColor = '#F87171';
      dotAnim  = 'none';
      message  = 'LP-COH-002 \u00a0·\u00a0 Cohort At Capacity';
      suffix   = 'Join Waitlist \u2192';
    } else if (near_capacity) {
      bg       = '#1C1608';
      dotColor = '#F59E0B';
      dotAnim  = 'lp-pulse 1s infinite';
      message  = `COHORT NEARLY FULL \u00a0\u2014\u00a0 ${remaining} SEAT${remaining !== 1 ? 'S' : ''} REMAIN`;
      suffix   = 'LP-COH-002 \u00b7 Secure Your Seat \u2192';
    } else {
      suffix = `${remaining} Seat${remaining !== 1 ? 's' : ''} Remaining`;
    }
  }

  return (
    <div
      data-testid="announcement-bar"
      style={{ background: bg, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.4s' }}
    >
      <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FAF8F4', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          data-testid="announcement-bar-dot"
          style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, display: 'inline-block', animation: dotAnim, transition: 'background 0.4s' }}
        />
        <span data-testid="announcement-bar-message" style={{ color: seats?.near_capacity ? '#F59E0B' : seats?.at_capacity ? '#F87171' : '#FAF8F4' }}>
          {message}
        </span>
        {suffix && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>&nbsp;·&nbsp;</span>
            <span data-testid="announcement-bar-suffix" style={{ color: seats?.near_capacity ? '#F59E0B' : seats?.at_capacity ? '#F87171' : 'rgba(255,255,255,0.55)' }}>
              {suffix}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
