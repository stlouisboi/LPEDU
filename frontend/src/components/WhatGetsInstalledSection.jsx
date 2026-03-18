const INSTALLS = [
  "Driver Qualification File System",
  "Drug & Alcohol Compliance System",
  "Hours of Service & ELD Monitoring",
  "Vehicle Maintenance Record System",
  "Insurance Continuity Framework",
  "Cash Flow Control System",
];

export default function WhatGetsInstalledSection() {
  return (
    <div style={{
      background: "#000C1A",
      borderTop: "0.5px solid rgba(197,160,89,0.15)",
      borderBottom: "0.5px solid rgba(197,160,89,0.15)",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "3rem 1.5rem",
        display: "flex",
        gap: "3rem",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}>
        {/* Label */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "rgba(197,160,89,0.75)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          paddingTop: "0.2rem",
          minWidth: 180,
        }}>
          WHAT GETS INSTALLED
        </p>

        {/* Items */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem 2.5rem",
          flex: 1,
        }}>
          {INSTALLS.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              minWidth: 240,
            }}>
              <div style={{
                width: 4,
                height: 4,
                background: "#C5A059",
                flexShrink: 0,
              }} />
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.72)",
                letterSpacing: "0.01em",
                margin: 0,
              }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
