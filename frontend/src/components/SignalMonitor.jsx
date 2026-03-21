import { useState, useEffect, useRef } from "react";

const mono = "'Inter', sans-serif";
const gold = "#d4900a";
const gold55 = "rgba(212,144,10,0.55)";

function getGrade(pct) {
  if (pct >= 90) return { letter: "A", label: "INSTITUTIONAL GRADE", color: gold };
  if (pct >= 60) return { letter: "B", label: "OPERATIONAL", color: "#22c55e" };
  return { letter: "C", label: "SUB-STANDARD", color: "#f87171" };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

// ── HUD corner brackets ───────────────────────────────────────────────────────
function HUDCorners({ color = gold55, size = 14, thickness = 1.5 }) {
  const s = `${color}`;
  const positions = [
    { top: 0, left: 0, rotate: 0 },
    { top: 0, right: 0, rotate: 90 },
    { bottom: 0, right: 0, rotate: 180 },
    { bottom: 0, left: 0, rotate: 270 },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <svg
          key={i}
          width={size + 4}
          height={size + 4}
          viewBox={`0 0 ${size + 4} ${size + 4}`}
          style={{ position: "absolute", ...pos, transform: `rotate(${pos.rotate}deg)`, opacity: 0.55, pointerEvents: "none" }}
        >
          <path
            d={`M 2 ${size + 2} L 2 2 L ${size + 2} 2`}
            fill="none"
            stroke={s}
            strokeWidth={thickness}
            strokeLinecap="square"
          />
        </svg>
      ))}
    </>
  );
}

// ── Circular gauge ────────────────────────────────────────────────────────────
function CircularGauge({ signal, grade, animate, scanPos }) {
  const cx = 110, cy = 110, r = 80, strokeWidth = 10;
  const startAngle = -220, totalArc = 260;
  const endAngle = startAngle + (animate ? totalArc * (signal / 100) : 0);
  const trackPath = describeArc(cx, cy, r, startAngle, startAngle + totalArc);
  const progressPath = describeArc(cx, cy, r, startAngle, endAngle);

  return (
    <div style={{ position: "relative" }}>
      {/* Dot-grid backing */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 2, overflow: "hidden",
        backgroundImage: "radial-gradient(circle, rgba(197,160,89,0.18) 1px, transparent 1px)",
        backgroundSize: "18px 18px", opacity: 0.35, pointerEvents: "none",
      }} />

      <svg viewBox="0 0 220 220" style={{ width: "100%", maxWidth: 220, display: "block", position: "relative" }}
        aria-label={`Administrative Signal: ${Math.round(signal)}%`}>

        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke="rgba(197,160,89,0.06)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke="rgba(197,160,89,0.04)" strokeWidth="1" />

        {/* Tick marks */}
        {Array.from({ length: 26 }).map((_, i) => {
          const angle = (-220 + i * 10) * (Math.PI / 180);
          const inner = i % 5 === 0 ? r + 8 : r + 11;
          const outer = r + 16;
          return (
            <line key={i}
              x1={cx + inner * Math.cos(angle)} y1={cy + inner * Math.sin(angle)}
              x2={cx + outer * Math.cos(angle)} y2={cy + outer * Math.sin(angle)}
              stroke={i % 5 === 0 ? "rgba(197,160,89,0.35)" : "rgba(197,160,89,0.12)"}
              strokeWidth={i % 5 === 0 ? 1.5 : 0.75}
            />
          );
        })}

        {/* Track */}
        <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth} strokeLinecap="round" />

        {/* Progress arc */}
        <path d={progressPath} fill="none" stroke={grade.color} strokeWidth={strokeWidth} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${grade.color}70)`, transition: animate ? "all 1.4s cubic-bezier(0.22, 1, 0.36, 1)" : "none" }} />

        {/* Horizontal scan line */}
        <clipPath id="gauge-clip">
          <circle cx={cx} cy={cy} r={r + 20} />
        </clipPath>
        <rect x={0} y={cy - 1 + scanPos} width={220} height={1.5}
          fill={`${grade.color}30`} clipPath="url(#gauge-clip)"
          style={{ transition: "y 0.05s linear" }} />

        {/* Signal value */}
        <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: mono, fontSize: 38, fontWeight: 700, fill: "#FFFFFF", letterSpacing: "-2px" }}>
          {Math.round(signal)}
        </text>
        <text x={cx + 28} y={cy - 22} textAnchor="middle"
          style={{ fontFamily: mono, fontSize: 17, fill: "rgba(255,255,255,0.45)" }}>%</text>

        {/* Grade */}
        <text x={cx} y={cy + 22} textAnchor="middle"
          style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, fill: grade.color, letterSpacing: "0.10em" }}>
          GRADE {grade.letter}
        </text>
        <text x={cx} y={cy + 44} textAnchor="middle"
          style={{ fontFamily: mono, fontSize: 7, fill: "rgba(255,255,255,0.30)", letterSpacing: "0.18em" }}>
          {grade.label}
        </text>
      </svg>
    </div>
  );
}

// ── Indicator bar ─────────────────────────────────────────────────────────────
function IndicatorBar({ label, code, value, color, animate, weight }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.4rem" }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: "0.667rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", marginBottom: "0.15rem" }}>{code}</p>
          <p style={{ fontFamily: mono, fontSize: "0.820rem", fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>{label}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: mono, fontSize: "0.952rem", fontWeight: 700, color, marginBottom: "0.1rem" }}>{value}%</p>
          <p style={{ fontFamily: mono, fontSize: "0.600rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>WT: {weight}</p>
        </div>
      </div>
      {/* Track */}
      <div style={{ background: "rgba(255,255,255,0.06)", height: 4, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: animate ? `${value}%` : "0%",
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          boxShadow: `0 0 8px ${color}55`,
          transition: animate ? "width 1.5s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }} />
        {/* Internal shimmer */}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          width: "30%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          animation: animate ? "bar-shimmer 3s ease-in-out infinite" : "none",
        }} />
      </div>
      {/* Sub-grid tick marks */}
      <div style={{ display: "flex", gap: "2px", marginTop: "3px" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 2,
            background: i < Math.round(value / 5) ? `${color}40` : "rgba(255,255,255,0.04)",
            transition: animate ? `background 0.1s ease ${i * 0.06}s` : "none",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Status log ticker ─────────────────────────────────────────────────────────
function StatusTicker({ grade, integrity, pulse, alignment }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const logs = [
    { code: "SYS", msg: `SIGNAL_COMPUTED — DOC(${integrity}%) + PULSE(${pulse}%) + ALIGN(${alignment}%)`, ok: true },
    { code: "AUD", msg: grade.letter === "A" ? "AUDIT_READINESS — SYSTEMS AT INSTITUTIONAL GRADE" : grade.letter === "B" ? "AUDIT_READINESS — OPERATIONAL — ELEVATE DOC_INTEGRITY" : "AUDIT_READINESS — SUB-STANDARD — IMMEDIATE ACTION REQUIRED", ok: grade.letter !== "C" },
    { code: "PLT", msg: `PULSE_MONITOR — LAST_ACTIVITY WITHIN ACCEPTABLE WINDOW`, ok: pulse >= 70 },
    { code: "CFR", msg: "49_CFR_PART_385 — NEW_ENTRANT_WINDOW ACTIVE — MONITORING", ok: true },
    { code: "CHK", msg: "IMPLEMENTATION_SEQUENCE — VERIFICATION_CYCLE RUNNING", ok: true },
  ];

  const current = logs[tick % logs.length];
  const ts = new Date().toISOString().replace("T", " ").substring(0, 19);

  return (
    <div style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      paddingTop: "0.75rem",
      marginTop: "0.75rem",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", opacity: 0.7 }}>
        <span style={{ fontFamily: mono, fontSize: "0.600rem", color: current.ok ? "#22c55e" : "#f87171", letterSpacing: "0.10em", flexShrink: 0 }}>
          [{current.code}]
        </span>
        <span style={{
          fontFamily: mono, fontSize: "0.600rem", color: "rgba(255,255,255,0.38)",
          letterSpacing: "0.08em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {ts} — {current.msg}
        </span>
      </div>
    </div>
  );
}

// ── Live clock ────────────────────────────────────────────────────────────────
function LiveClock() {
  const [ts, setTs] = useState("");
  useEffect(() => {
    const update = () => setTs(new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC");
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontFamily: mono, fontSize: "0.600rem", letterSpacing: "0.10em", color: "rgba(255,255,255,0.28)" }}>
      {ts}
    </span>
  );
}

// ── Blinking cursor ───────────────────────────────────────────────────────────
function BlinkCursor() {
  return <span style={{ animation: "blink-cur 1.1s step-end infinite", color: gold, marginLeft: 2 }}>▮</span>;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SignalMonitor({ carrierId, refreshKey = 0 }) {
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signalData, setSignalData] = useState({ integrity: 0, pulse: 100, alignment: 0 });
  const [scanPos, setScanPos] = useState(-80);
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

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(t);
  }, [loading]);

  // Slow gauge scan line
  useEffect(() => {
    if (!animate) return;
    let pos = -80;
    const id = setInterval(() => {
      pos += 0.8;
      if (pos > 80) pos = -80;
      setScanPos(pos);
    }, 30);
    return () => clearInterval(id);
  }, [animate]);

  const { integrity, pulse, alignment } = signalData;
  const signal = 0.4 * integrity + 0.3 * pulse + 0.3 * alignment;
  const grade = getGrade(signal);

  const indicators = [
    { label: "Documentary Integrity", code: "DOC_INTEGRITY", value: integrity, color: gold, weight: "40%" },
    { label: "System Pulse",          code: "SYS_PULSE",    value: pulse,      color: "#22c55e", weight: "30%" },
    { label: "Regulatory Alignment",  code: "REG_ALIGNMENT", value: alignment, color: "#7dd3fc", weight: "30%" },
  ];

  return (
    <div
      data-testid="signal-monitor"
      style={{
        background: "rgba(4,10,24,0.85)",
        border: "1px solid rgba(212,144,10,0.18)",
        padding: "1.75rem",
        marginBottom: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink-cur { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bar-shimmer { 0%{left:-30%} 100%{left:130%} }
        @keyframes signal-sweep {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(600%); }
        }
        @keyframes pulse-beacon {
          0%,100% { box-shadow: 0 0 4px ${gold}; opacity:1; }
          50%     { box-shadow: 0 0 12px ${gold}, 0 0 20px ${gold}55; opacity:0.7; }
        }
      `}</style>

      {/* Dot-grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(197,160,89,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px", opacity: 0.4,
      }} />

      {/* Slow background sweep */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "25%", top: 0,
        background: "linear-gradient(180deg, transparent, rgba(197,160,89,0.018), transparent)",
        animation: "signal-sweep 8s linear infinite",
        pointerEvents: "none",
      }} />

      {/* HUD corner brackets */}
      <HUDCorners size={16} />

      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(2,6,23,0.80)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(212,144,10,0.25)", borderTopColor: gold, animation: "spin 0.8s linear infinite" }} />
            <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.16em", color: gold55, textTransform: "uppercase" }}>
              FETCHING_SIGNAL...
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "1.5rem", paddingBottom: "1rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexWrap: "wrap", gap: "0.75rem", position: "relative",
      }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "0.2rem" }}>
            ADMINISTRATIVE_HEALTH_MONITOR<BlinkCursor />
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <p style={{ fontFamily: mono, fontSize: "0.620rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.28)" }}>
              LPOS v1.0 · LP-SYS-SIGNAL · REAL-TIME
            </p>
            <LiveClock />
          </div>
        </div>

        {/* Signal badge with pulsing beacon */}
        <div style={{
          border: `1px solid ${grade.color}44`,
          background: `${grade.color}0D`,
          padding: "0.4rem 0.875rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: grade.color,
            animation: "pulse-beacon 2s ease-in-out infinite",
          }} />
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.1em", color: grade.color }}>
            SIGNAL: {Math.round(signal)}% / {grade.label}
          </p>
        </div>
      </div>

      {/* Gauge + Indicators */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2.5rem", alignItems: "start", position: "relative" }} className="signal-grid">
        <div>
          <CircularGauge signal={signal} grade={grade} animate={animate} scanPos={scanPos} />

          {/* Sub-label below gauge */}
          <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
            <p style={{ fontFamily: mono, fontSize: "0.600rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
              COMPOSITE_SCORE
            </p>
            <p style={{ fontFamily: mono, fontSize: "0.667rem", letterSpacing: "0.10em", color: `${grade.color}99`, marginTop: "0.2rem" }}>
              {grade.letter === "A" ? "AUDIT_READY" : grade.letter === "B" ? "IMPROVE_DOCS" : "ACTION_REQUIRED"}
            </p>
          </div>
        </div>

        <div style={{ paddingTop: "0.25rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.667rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", marginBottom: "1.25rem" }}>
            INDICATOR_GRID — SIGNAL DECOMPOSITION
          </p>
          {indicators.map((ind) => (
            <IndicatorBar key={ind.code} {...ind} animate={animate} />
          ))}
        </div>
      </div>

      {/* Status ticker */}
      <StatusTicker grade={grade} integrity={integrity} pulse={pulse} alignment={alignment} />

      <style>{`
        @media (max-width: 640px) {
          .signal-grid { grid-template-columns: 1fr !important; }
          .signal-grid > div:first-child { max-width: 180px; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}
