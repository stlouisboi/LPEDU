export default function SystemDiagramSection() {
  return (
    <section data-testid="system-diagram" style={{
      background: "#002244",
      borderTop: "1px solid rgba(197,160,89,0.2)",
      borderBottom: "1px solid rgba(197,160,89,0.2)",
      padding: "6rem 1.5rem",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.706rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "1rem",
          }}>System Architecture — LP-AUTH-SYS-V4</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.15,
            marginBottom: "0.875rem",
          }}>The Authority Protection System</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.064rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            maxWidth: 520,
          }}>
            Four interdependent systems. One operating standard.
            Failure in any one creates cascading risk across the others.
          </p>
        </div>

        {/* Diagram */}
        <div style={{
          position: "relative",
          width: "100%",
          border: "1px solid var(--border)",
          background: "var(--bg-2)",
          overflow: "hidden",
        }}>
          {/* Corner ticks */}
          {[
            { top: 0, left: 0, borderTop: "1px solid var(--orange)", borderLeft: "1px solid var(--orange)", width: 20, height: 20 },
            { top: 0, right: 0, borderTop: "1px solid var(--orange)", borderRight: "1px solid var(--orange)", width: 20, height: 20 },
            { bottom: 0, left: 0, borderBottom: "1px solid var(--orange)", borderLeft: "1px solid var(--orange)", width: 20, height: 20 },
            { bottom: 0, right: 0, borderBottom: "1px solid var(--orange)", borderRight: "1px solid var(--orange)", width: 20, height: 20 },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", ...s }} />
          ))}

          {/* System ID tag */}
          <div style={{
            position: "absolute",
            top: 12,
            left: 28,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
          }}>LP-SYS-V4 · AUTHORITY PROTECTION · STATUS: ACTIVE</div>

          <svg
            viewBox="0 0 800 480"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "auto", display: "block" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Dot grid pattern */}
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.75" fill="#1e293b" />
              </pattern>

              {/* Orange glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Animated dash marker */}
              <marker id="dot-mark" markerWidth="4" markerHeight="4" refX="2" refY="2">
                <circle cx="2" cy="2" r="1.5" fill="#E8590F" />
              </marker>
            </defs>

            {/* Background dots */}
            <rect width="800" height="480" fill="url(#dots)" />

            {/* ── Outer diamond ring connecting the 4 nodes ── */}
            <polygon
              points="400,52 718,240 400,428 82,240"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1"
              strokeDasharray="6 4"
            />

            {/* ── Connection lines — center to each node ── */}
            {/* Top */}
            <line x1="400" y1="204" x2="400" y2="112" stroke="#E8590F" strokeWidth="1" strokeDasharray="5 4" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.6s" repeatCount="indefinite" />
            </line>
            {/* Right */}
            <line x1="446" y1="240" x2="570" y2="240" stroke="#E8590F" strokeWidth="1" strokeDasharray="5 4" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.4s" repeatCount="indefinite" />
            </line>
            {/* Bottom */}
            <line x1="400" y1="276" x2="400" y2="368" stroke="#E8590F" strokeWidth="1" strokeDasharray="5 4" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.8s" repeatCount="indefinite" />
            </line>
            {/* Left */}
            <line x1="354" y1="240" x2="230" y2="240" stroke="#E8590F" strokeWidth="1" strokeDasharray="5 4" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="18" to="0" dur="2s" repeatCount="indefinite" />
            </line>

            {/* ── Connection dots at junctions ── */}
            {[[400,112],[612,240],[400,368],[188,240]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#E8590F" opacity="0.7" />
            ))}

            {/* ── CENTER HUB ── */}
            {/* Outer pulse ring */}
            <circle cx="400" cy="240" r="52" fill="none" stroke="#E8590F" strokeWidth="0.75" opacity="0.15">
              <animate attributeName="r" values="50;56;50" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Mid ring */}
            <circle cx="400" cy="240" r="46" fill="none" stroke="#E8590F" strokeWidth="0.75" opacity="0.25" />
            {/* Inner fill */}
            <circle cx="400" cy="240" r="40" fill="#0B1120" stroke="#E8590F" strokeWidth="1" filter="url(#glow)" />
            {/* Hub label */}
            <text x="400" y="234" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#8A96A3" letterSpacing="1.5">THE</text>
            <text x="400" y="245" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="10" fontWeight="700" fill="#f0f4f8">CARRIER</text>
            <text x="400" y="258" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#E8590F" letterSpacing="1">● PROTECTED</text>

            {/* ── NODE 01 — Authority Protection (TOP) ── */}
            <rect x="300" y="56" width="200" height="56" rx="0" fill="#020408" stroke="#2d3d50" strokeWidth="1" />
            <line x1="300" y1="56" x2="310" y2="56" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="300" y1="56" x2="300" y2="66" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="500" y1="56" x2="490" y2="56" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="500" y1="56" x2="500" y2="66" stroke="#E8590F" strokeWidth="1.5" />
            <text x="400" y="76" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#8A96A3" letterSpacing="1.5">NODE-01</text>
            <text x="400" y="92" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="11.5" fontWeight="700" fill="#f0f4f8" letterSpacing="-0.3">Authority Protection</text>
            <circle cx="472" cy="76" r="3" fill="#E8590F" />

            {/* ── NODE 02 — Insurance Continuity (RIGHT) ── */}
            <rect x="612" y="212" width="168" height="56" rx="0" fill="#020408" stroke="#2d3d50" strokeWidth="1" />
            <line x1="612" y1="212" x2="622" y2="212" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="612" y1="212" x2="612" y2="222" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="780" y1="212" x2="770" y2="212" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="780" y1="212" x2="780" y2="222" stroke="#E8590F" strokeWidth="1.5" />
            <text x="696" y="231" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#8A96A3" letterSpacing="1.5">NODE-02</text>
            <text x="696" y="247" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="11.5" fontWeight="700" fill="#f0f4f8" letterSpacing="-0.3">Insurance</text>
            <text x="696" y="261" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="11.5" fontWeight="700" fill="#f0f4f8" letterSpacing="-0.3">Continuity</text>
            <circle cx="752" cy="231" r="3" fill="#E8590F" />

            {/* ── NODE 03 — Compliance Backbone (BOTTOM) ── */}
            <rect x="294" y="368" width="212" height="56" rx="0" fill="#020408" stroke="#2d3d50" strokeWidth="1" />
            <line x1="294" y1="368" x2="304" y2="368" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="294" y1="368" x2="294" y2="378" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="506" y1="368" x2="496" y2="368" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="506" y1="368" x2="506" y2="378" stroke="#E8590F" strokeWidth="1.5" />
            <text x="400" y="387" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#8A96A3" letterSpacing="1.5">NODE-03</text>
            <text x="400" y="403" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="11.5" fontWeight="700" fill="#f0f4f8" letterSpacing="-0.3">Compliance Backbone</text>
            <circle cx="472" cy="387" r="3" fill="#E8590F" />

            {/* ── NODE 04 — Cash-Flow Oxygen (LEFT) ── */}
            <rect x="20" y="212" width="168" height="56" rx="0" fill="#020408" stroke="#2d3d50" strokeWidth="1" />
            <line x1="20" y1="212" x2="30" y2="212" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="20" y1="212" x2="20" y2="222" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="188" y1="212" x2="178" y2="212" stroke="#E8590F" strokeWidth="1.5" />
            <line x1="188" y1="212" x2="188" y2="222" stroke="#E8590F" strokeWidth="1.5" />
            <text x="104" y="231" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#8A96A3" letterSpacing="1.5">NODE-04</text>
            <text x="104" y="247" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="11.5" fontWeight="700" fill="#f0f4f8" letterSpacing="-0.3">Cash-Flow</text>
            <text x="104" y="261" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="11.5" fontWeight="700" fill="#f0f4f8" letterSpacing="-0.3">Oxygen</text>
            <circle cx="160" cy="231" r="3" fill="#E8590F" />

            {/* ── Status bar bottom ── */}
            <line x1="0" y1="462" x2="800" y2="462" stroke="#1e293b" strokeWidth="1" />
            <text x="20" y="474" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a5568" letterSpacing="1">LAUNCHPATH OPERATING STANDARD</text>
            <text x="780" y="474" textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#4a5568" letterSpacing="1">49 CFR PARTS 382 · 385 · 387 · 395 · 396</text>
          </svg>
        </div>

        {/* Caption row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--border)",
          marginTop: "1px",
        }} className="diagram-caption-grid">
          {[
            ["Authority Protection", "Operating authority status, filings, and MC number continuity."],
            ["Insurance Continuity", "BMC-91 filings, policy alignment, and coverage gap prevention."],
            ["Compliance Backbone", "HOS, D&A, driver qualification, and vehicle maintenance systems."],
            ["Cash-Flow Oxygen", "Freight rate floor, invoice controls, and financial runway systems."],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: "var(--bg-2)", padding: "1.25rem 1.5rem" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.806rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "0.375rem",
              }}>{title}</p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.874rem",
                color: "var(--text-subtle)",
                lineHeight: 1.6,
              }}>{desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .diagram-caption-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .diagram-caption-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
