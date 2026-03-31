import React from 'react';

const ZONES = [
  {
    id: 1,
    label: 'FOUNDATION',
    days: 'Days 1–30',
    barColor: '#0D2240',
    accentColor: '#0D2240',
    textOnBar: 'rgba(255,255,255,0.95)',
    subTextOnBar: 'rgba(255,255,255,0.55)',
    items: ['DQ files', 'D&A enrollment', 'Insurance', 'Records'],
    desc: 'Day-one setup risks: D&A enrollment, DQ files, insurance, records, baseline compliance.',
  },
  {
    id: 2,
    label: 'OPERATIONAL PRESSURE',
    days: 'Days 31–60',
    barColor: '#4A7CB5',
    accentColor: '#4A7CB5',
    textOnBar: 'rgba(255,255,255,0.95)',
    subTextOnBar: 'rgba(255,255,255,0.55)',
    items: ['HOS', 'ELD', 'Maintenance', 'Documentation'],
    desc: 'HOS pressure, ELD misuse, maintenance lapses, weak documentation habits.',
  },
  {
    id: 3,
    label: 'AUDIT READINESS',
    days: 'Days 61–90',
    barColor: '#C9A84C',
    accentColor: '#C9A84C',
    textOnBar: '#0D1829',
    subTextOnBar: 'rgba(13,24,41,0.65)',
    items: ['Records review', 'Audit triggers', 'Authority exposure'],
    desc: 'Disorganized records, automatic-failure risks, preparation gaps, authority exposure.',
  },
];

export default function AuthorityClock() {
  return (
    <div style={{ width: '100%' }}>
      {/* Label row above the bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '6px' }}>
        {ZONES.map((z) => (
          <div
            key={z.id}
            style={{
              textAlign: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.13em',
              color: z.accentColor,
              textTransform: 'uppercase',
              padding: '0 4px',
            }}
          >
            {z.label}
          </div>
        ))}
      </div>

      {/* Segmented bar */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '64px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(13,34,64,0.12)',
        }}
      >
        {ZONES.map((z, idx) => (
          <div
            key={z.id}
            style={{
              flex: 1,
              background: z.barColor,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              borderRight: idx < 2 ? '2px solid rgba(255,255,255,0.18)' : 'none',
              padding: '8px 4px',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                color: z.textOnBar,
                letterSpacing: '0.03em',
              }}
            >
              {z.days}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: z.subTextOnBar,
                letterSpacing: '0.06em',
              }}
            >
              {z.items.join(' · ')}
            </span>
          </div>
        ))}
      </div>

      {/* Phase cards below bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginTop: '24px',
        }}
      >
        {ZONES.map((z, idx) => (
          <div
            key={z.id}
            style={{
              borderTop: `3px solid ${z.accentColor}`,
              borderLeft: `1px solid rgba(13,34,64,0.10)`,
              borderRight: `1px solid rgba(13,34,64,0.10)`,
              borderBottom: `1px solid rgba(13,34,64,0.10)`,
              padding: '20px 18px',
              background: '#FFFFFF',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                fontWeight: '700',
                letterSpacing: '0.14em',
                color: z.accentColor,
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Phase {z.id}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: '600',
                color: '#0D1829',
                marginBottom: '8px',
                lineHeight: '1.3',
              }}
            >
              {z.label.charAt(0) + z.label.slice(1).toLowerCase()} · {z.days}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#5A6478',
                lineHeight: '1.65',
              }}
            >
              {z.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile stacked version (hidden on desktop via inline) */}
    </div>
  );
}
