import { useState, useEffect } from "react";

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";

// Grade thresholds
function getGrade(pct) {
  if (pct >= 90) return { letter: "A", label: "INSTITUTIONAL GRADE", color: "#d4900a" };
  if (pct >= 60) return { letter: "B", label: "OPERATIONAL", color: "#22c55e" };
  return { letter: "C", label: "SUB-STANDARD", color: "#f87171" };
}

// SVG arc helper — produces the d attribute for a circular arc
function describeArc(cx, cy, r, startAngle, endAngle) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

function CircularGauge({ signal, grade, animate }) {
  const cx = 110;
  const cy = 110;
  const r = 80;
  const strokeWidth = 10;
  const startAngle = -220;
  const totalArc = 260; // degrees of arc used
  const endAngle = startAngle + (animate ? totalArc * (signal / 100) : 0);

  const trackPath = describeArc(cx, cy, r, startAngle, startAngle + totalArc);
  const progressPath = describeArc(cx, cy, r, startAngle, endAngle);

  return (
    <svg
      viewBox="0 0 220 220"
      style={{ width: "100%", maxWidth: 220, display: "block" }}
      aria-label={`Administrative Signal: ${Math.round(signal)}%`}
    >
      {/* Track */}
      <path
        d={trackPath}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Progress arc */}
      <path
        d={progressPath}
        fill="none"
        stroke={grade.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${grade.color}55)`, transition: animate ? "all 1.2s ease" : "none" }}
      />

      {/* Center — signal % */}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: mono,
          fontSize: 36,
          fontWeight: 700,
          fill: "#FFFFFF",
          letterSpacing: "-1px",
        }}
      >
        {Math.round(signal)}
      </text>

      {/* Center — % symbol */}
      <text
        x={cx + 26}
        y={cy - 18}
        textAnchor="middle"
        style={{ fontFamily: mono, fontSize: 18, fill: "rgba(255,255,255,0.55)" }}
      >
        %
      </text>

      {/* Grade letter */}
      <text
        x={cx}
        y={cy + 24}
        textAnchor="middle"
        style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, fill: grade.color, letterSpacing: "0.12em" }}
      >
        GRADE {grade.letter}
      </text>

      {/* Label below */}
      <text
        x={cx}
        y={cy + 50}
        textAnchor="middle"
        style={{ fontFamily: mono, fontSize: 7.5, fill: "rgba(255,255,255,0.38)", letterSpacing: "0.18em", textTransform: "uppercase" }}
      >
        {grade.label}
      </text>
    </svg>
  );
}

function IndicatorBar({ label, code, value, color, animate }) {
  return (
    <div style={{ marginBottom: "1.375rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.45rem" }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase", marginBottom: "0.2rem" }}>
            {code}
          </p>
          <p style={{ fontFamily: sans, fontSize: "0.857rem", fontWeight: 600, color: "rgba(255,255,255,0.82)" }}>
            {label}
          </p>
        </div>
        <p style={{ fontFamily: mono, fontSize: "var(--text-sm)", fontWeight: 700, color }}>
          {value}%
        </p>
      </div>

      {/* Track */}
      <div style={{ background: "rgba(255,255,255,0.07)", height: 3, position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: animate ? `${value}%` : "0%",
          background: color,
          boxShadow: `0 0 6px ${color}55`,
          transition: animate ? "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }} />
      </div>

      {/* Weight label */}
      <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", marginTop: "0.3rem", textTransform: "uppercase" }}>
        WEIGHT: {code === "DOC_INTEGRITY" ? "40%" : "30%"} OF SIGNAL
      </p>
    </div>
  );
}

export default function SignalMonitor({ carrierId, refreshKey = 0 }) {
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signalData, setSignalData] = useState({ integrity: 0, pulse: 100, alignment: 0 });

  const API = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!carrierId) { setLoading(false); return; }
    setLoading(true);
    setAnimate(false);

    const fetchSignal = async () => {
      try {
        const resp = await fetch(`${API}/api/signal/${carrierId}`, { credentials: "include" });
        if (resp.ok) {
          const json = await resp.json();
          setSignalData({ integrity: json.integrity, pulse: json.pulse, alignment: json.alignment });
        }
      } catch { /* keep defaults */ }
      setLoading(false);
    };

    fetchSignal();
  }, [carrierId, API, refreshKey]);

  // Trigger animation after data loads
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(t);
  }, [loading]);

  const { integrity, pulse, alignment } = signalData;
  const signal = 0.4 * integrity + 0.3 * pulse + 0.3 * alignment;
  const grade = getGrade(signal);

  const indicators = [
    { label: "Documentary Integrity", code: "DOC_INTEGRITY", value: integrity, color: "#d4900a" },
    { label: "System Pulse", code: "SYS_PULSE", value: pulse, color: "#22c55e" },
    { label: "Regulatory Alignment", code: "REG_ALIGNMENT", value: alignment, color: "#7dd3fc" },
  ];

  return (
    <div
      data-testid="signal-monitor"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(212,144,10,0.14)",
        padding: "1.75rem",
        marginBottom: "2rem",
        position: "relative",
      }}
    >
      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(2,6,23,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10,
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              border: "2px solid rgba(212,144,10,0.25)",
              borderTopColor: "#d4900a",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em", color: "rgba(212,144,10,0.6)", textTransform: "uppercase" }}>
              FETCHING_SIGNAL...
            </p>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.75rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "0.25rem" }}>
            ADMINISTRATIVE_HEALTH_MONITOR
          </p>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)" }}>
            LPOS v1.0 | LP-SYS-SIGNAL | REAL-TIME
          </p>
        </div>

        {/* Signal badge */}
        <div style={{
          border: `1px solid ${grade.color}44`,
          background: `${grade.color}0D`,
          padding: "0.35rem 0.875rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: grade.color, boxShadow: `0 0 6px ${grade.color}` }} />
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", color: grade.color }}>
            SIGNAL: {Math.round(signal)}% / {grade.label}
          </p>
        </div>
      </div>

      {/* Content: Gauge + Indicators */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2.5rem", alignItems: "start" }} className="signal-grid">

        {/* Left: Circular Gauge */}
        <div>
          <CircularGauge signal={signal} grade={grade} animate={animate} />
        </div>

        {/* Right: Indicator Grid */}
        <div style={{ paddingTop: "0.5rem" }}>
          <p style={{
            fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)", marginBottom: "1.5rem",
          }}>
            INDICATOR_GRID — SIGNAL DECOMPOSITION
          </p>

          {indicators.map((ind) => (
            <IndicatorBar key={ind.code} {...ind} animate={animate} />
          ))}

          {/* Footer note */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem", marginTop: "0.5rem" }}>
            <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.25)", lineHeight: 1.8, textTransform: "uppercase" }}>
              DOC_INTEGRITY (40%) + SYS_PULSE (30%) + REG_ALIGNMENT (30%) = ADMINISTRATIVE_SIGNAL
              {"\n"}SIGNAL DEGRADES AFTER 72H OPERATIONAL INACTIVITY
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .signal-grid { grid-template-columns: 1fr !important; }
          .signal-grid > div:first-child { max-width: 180px; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}
