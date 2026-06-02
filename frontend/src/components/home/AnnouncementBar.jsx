/**
 * AnnouncementBar — Static version
 * Simple program announcement. Seat counter removed.
 */
const MONO = "'JetBrains Mono','Courier New',monospace";

export default function AnnouncementBar() {
  return (
    <div
      data-testid="announcement-bar"
      style={{ background: '#1C2B3A', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <p style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FAF8F4', margin: 0, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span
          data-testid="announcement-bar-dot"
          style={{ width: 8, height: 8, borderRadius: '50%', background: '#059669', display: 'inline-block', animation: 'lp-pulse 2s infinite' }}
        />
        <span data-testid="announcement-bar-message">
          LP-COH-002 &nbsp;·&nbsp; Next Cohort Begins July 6, 2026 &nbsp;·&nbsp; Limited to 12 Motor Carriers
        </span>
      </p>
    </div>
  );
}
