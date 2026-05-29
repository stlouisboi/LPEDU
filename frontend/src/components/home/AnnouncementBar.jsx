export default function AnnouncementBar() {
  return (
    <div style={{ background: '#1C2B3A', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FAF8F4', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#059669', display: 'inline-block', animation: 'lp-pulse 2s infinite' }} />
        LP-COH-002: Next Cohort Begins July 6, 2026 &nbsp;·&nbsp; Limited to 12 Motor Carriers &nbsp;·&nbsp; 4 Seats Remaining
      </p>
    </div>
  );
}
