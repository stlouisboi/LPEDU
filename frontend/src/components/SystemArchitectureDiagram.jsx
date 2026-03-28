import { useState, useEffect, useRef } from "react";

const GOLD   = "#C8933F";
const GOLD_DIM = "rgba(200,147,63,0.18)";
const NAVY   = "#060f1e";
const MONO   = "'JetBrains Mono', monospace";
const COND   = "'Barlow Condensed', 'Arial Narrow', sans-serif";
const SANS   = "'Inter', sans-serif";

/* ── Data ──────────────────────────────────────────────────────── */
const PILLARS = [
  {
    code: "LP-SYS-01",
    name: "Authority Protection",
    sub: "Driver qualification, hiring standards, and operational legitimacy",
    position: "top",
  },
  {
    code: "LP-SYS-02",
    name: "Insurance Continuity",
    sub: "Financial responsibility, coverage filing, and liability maintenance",
    position: "right",
  },
  {
    code: "LP-SYS-03",
    name: "Compliance Backbone",
    sub: "D&A testing, HOS recordkeeping, and equipment documentation",
    position: "bottom",
  },
  {
    code: "LP-SYS-04",
    name: "Cash-Flow Oxygen",
    sub: "Revenue stability, cost controls, and financial runway management",
    position: "left",
  },
];

const GUARDS = [
  { code: "LP-GRD-01", name: "Driver Guard",     sub: "DQ files complete, drivers qualified", icon: "D", pillar: "LP-SYS-01" },
  { code: "LP-GRD-02", name: "Drug Guard",        sub: "Clearinghouse queries run, D&A program active", icon: "A", pillar: "LP-SYS-03" },
  { code: "LP-GRD-03", name: "Hours Guard",       sub: "ELD compliance, HOS violations prevented", icon: "H", pillar: "LP-SYS-03" },
  { code: "LP-GRD-04", name: "Equipment Guard",   sub: "Pre-trip inspections, maintenance logs current", icon: "E", pillar: "LP-SYS-01" },
];

const THREATS = [
  {
    direction: "OVER",
    label: "Regulatory Enforcement",
    example: "Roadside audit flags an unqualified driver — authority suspended same day.",
    pos: "top",
    angle: 0,
  },
  {
    direction: "AROUND",
    label: "Insurance Exposure",
    example: "Coverage lapses without notice — FMCSA revokes operating authority.",
    pos: "right",
    angle: 90,
  },
  {
    direction: "THROUGH",
    label: "Documentation Failure",
    example: "Missing D&A query discovered in investigation — automatic violation issued.",
    pos: "bottom",
    angle: 180,
  },
  {
    direction: "UNDER",
    label: "Cash-Flow Collapse",
    example: "Unexpected repair wipes out operating cash — trucks parked, loads missed.",
    pos: "left",
    angle: 270,
  },
];

/* ── Pulse dot ─────────────────────────────────────────────────── */
function PulseDot({ active, color = GOLD }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
      {active && (
        <span
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: color, opacity: 0.4,
          }}
        />
      )}
      <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: active ? color : "rgba(200,147,63,0.25)", boxShadow: active ? `0 0 6px ${color}` : "none", transition: "all 0.3s" }} />
    </span>
  );
}

/* ── Entrance animation helper ─────────────────────────────────── */
function fadeIn(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  };
}

/* ── Threat Vector ─────────────────────────────────────────────── */
function ThreatVector({ threat, isActive, onHover, onLeave, visible, delay = 0 }) {
  return (
    <div
      data-testid={`threat-${threat.direction.toLowerCase()}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer", ...fadeIn(visible, delay) }}
    >
      <div
        style={{
          padding: "0.625rem 0.875rem",
          border: `1px dashed ${isActive ? GOLD : "rgba(200,147,63,0.30)"}`,
          background: isActive ? "rgba(200,147,63,0.06)" : "rgba(4,10,20,0.85)",
          transition: "border-color 0.2s, background 0.2s",
          textAlign: "center",
          minWidth: 130,
        }}
      >
        {/* Animated inbound arrow */}
        <div
          style={{ marginBottom: 4, transform: `rotate(${threat.angle}deg)`, display: "flex", justifyContent: "center" }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M7 0v12M2 8l5 5 5-5" stroke={isActive ? GOLD : "rgba(200,147,63,0.55)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{ fontFamily: MONO, fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: isActive ? GOLD : "rgba(200,147,63,0.50)", margin: "0 0 2px" }}>
          {threat.direction}
        </p>
        <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 600, color: isActive ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.55)", lineHeight: 1.3, margin: 0 }}>
          {threat.label}
        </p>
      </div>
    </div>
  );
}

/* ── Pillar Node ───────────────────────────────────────────────── */
function PillarNode({ pillar, isTargeted, visible, delay }) {
  return (
    <div
      data-testid={`pillar-${pillar.code.toLowerCase()}`}
      style={{
        padding: "0.875rem 1rem",
        background: isTargeted ? "rgba(200,147,63,0.10)" : "rgba(8,14,28,0.95)",
        border: `1px solid ${isTargeted ? GOLD : "rgba(200,147,63,0.22)"}`,
        borderTop: `2px solid ${isTargeted ? GOLD : "rgba(200,147,63,0.45)"}`,
        transition: `all 0.25s, opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        flex: 1,
        ...fadeIn(visible, delay),
      }}
    >
      <p style={{ fontFamily: MONO, fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: isTargeted ? GOLD : "rgba(200,147,63,0.45)", margin: "0 0 4px" }}>
        {pillar.code}
      </p>
      <p style={{ fontFamily: COND, fontSize: "0.9375rem", fontWeight: 700, color: isTargeted ? "#FFFFFF" : "rgba(255,255,255,0.82)", lineHeight: 1.2, margin: "0 0 4px" }}>
        {pillar.name}
      </p>
      <p style={{ fontFamily: SANS, fontSize: "0.6875rem", color: isTargeted ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.38)", lineHeight: 1.5, margin: 0 }}>
        {pillar.sub}
      </p>
    </div>
  );
}

/* ── Guard Node ────────────────────────────────────────────────── */
function GuardNode({ guard, visible, delay }) {
  return (
    <div
      data-testid={`guard-${guard.code.toLowerCase()}`}
      style={{
        display: "flex", alignItems: "center", gap: "0.625rem",
        padding: "0.625rem 0.875rem",
        background: "rgba(4,10,20,0.90)",
        border: "1px solid rgba(200,147,63,0.18)",
        flex: 1,
        ...fadeIn(visible, delay),
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        background: "rgba(200,147,63,0.08)", border: "1px solid rgba(200,147,63,0.30)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 700, color: GOLD }}>{guard.icon}</span>
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: SANS, fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.80)", margin: "0 0 2px", lineHeight: 1.2 }}>{guard.name}</p>
        <p style={{ fontFamily: SANS, fontSize: "0.625rem", color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.4 }}>{guard.sub}</p>
      </div>
    </div>
  );
}

/* ── Threat detail panel ───────────────────────────────────────── */
function ThreatDetail({ threat }) {
  if (!threat) return null;
  return (
    
      <div
        key={threat.direction}
        style={{
          marginTop: "1.25rem",
          padding: "1rem 1.375rem",
          background: "rgba(200,147,63,0.04)",
          border: `1px solid rgba(200,147,63,0.28)`,
          borderLeft: `3px solid ${GOLD}`,
          display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap",
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontFamily: MONO, fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", margin: "0 0 3px" }}>ATTACK VECTOR</p>
          <p style={{ fontFamily: COND, fontSize: "1.125rem", fontWeight: 700, color: GOLD, margin: 0 }}>{threat.direction}</p>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontFamily: SANS, fontSize: "0.875rem", fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>{threat.label}</p>
          <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{threat.example}</p>
        </div>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <PulseDot active color="#22c55e" />
          <p style={{ fontFamily: MONO, fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#22c55e", margin: 0 }}>DEFENDED</p>
        </div>
      </div>
    
  );
}

/* ── Main Diagram ──────────────────────────────────────────────── */
export default function SystemArchitectureDiagram() {
  const [visible, setVisible] = useState(false);
  const [activeThreat, setActiveThreat] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const active = THREATS.find(t => t.direction === activeThreat) || null;

  return (
    <section
      ref={ref}
      data-testid="system-architecture-diagram"
      style={{
        background: "#040c1a",
        borderTop: "1px solid rgba(200,147,63,0.12)",
        borderBottom: "1px solid rgba(200,147,63,0.12)",
        padding: "5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: "3rem", ...fadeIn(visible, 0) }}>
          <p
            style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", marginBottom: "0.625rem" }}
          >
            LP-STD-001 | HOW LAUNCHPATH WORKS
          </p>
          <h2
            style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.625rem,3.5vw,2.375rem)", letterSpacing: "-0.02em", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0.875rem" }}
          >
            The Four-Pillar Operating Standard
          </h2>
          <p
            style={{ fontFamily: SANS, fontSize: "clamp(0.9rem,1.6vw,1rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 620 }}
          >
            This is the four-pillar operating standard we implement to protect your MC authority from shutdowns, coverage gaps, and cash-flow failure. Hover a threat vector to see how each pillar responds.
          </p>
        </div>

        {/* ── Diagram: 3-column layout ── */}
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "stretch" }} className="arch-layout">

          {/* Left: OVER + UNDER threats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", justifyContent: "space-between", flexShrink: 0, width: 148 }}>
            <ThreatVector
              threat={THREATS[0]}
              isActive={activeThreat === "OVER"}
              onHover={() => setActiveThreat("OVER")}
              onLeave={() => setActiveThreat(null)}
              visible={visible}
              delay={0.1}
            />
            <ThreatVector
              threat={THREATS[3]}
              isActive={activeThreat === "UNDER"}
              onHover={() => setActiveThreat("UNDER")}
              onLeave={() => setActiveThreat(null)}
              visible={visible}
              delay={0.18}
            />
          </div>

          {/* Center: pillars + guards + core */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: 0 }}>

            {/* Top pillars row */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {PILLARS.slice(0, 2).map((p, i) => (
                <PillarNode key={p.code} pillar={p} isTargeted={activeThreat === THREATS[i].direction} visible={visible} delay={0.2 + i * 0.08} />
              ))}
            </div>

            {/* Core protected authority */}
            <div
              data-testid="mc-authority-core"
              style={{
                padding: "1.625rem 1.5rem",
                background: "rgba(8,16,32,0.98)",
                border: `1px solid ${GOLD}`,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                ...fadeIn(visible, 0.35),
              }}
            >
              {/* Corner accents */}
              {[["0px","0px","top","left"],["0px","0px","top","right"],["0px","0px","bottom","left"],["0px","0px","bottom","right"]].map(([t,r,vp,hp],i) => (
                <span key={i} style={{
                  position: "absolute",
                  [vp]: 8, [hp]: 8,
                  width: 10, height: 10,
                  borderTop: vp === "top" ? `1.5px solid ${GOLD}` : "none",
                  borderBottom: vp === "bottom" ? `1.5px solid ${GOLD}` : "none",
                  borderLeft: hp === "left" ? `1.5px solid ${GOLD}` : "none",
                  borderRight: hp === "right" ? `1.5px solid ${GOLD}` : "none",
                  opacity: 0.6,
                }}/>
              ))}
              {/* Idle ambient glow */}
              <div
                style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(200,147,63,0.07) 0%, transparent 70%)", pointerEvents: "none" }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <PulseDot active />
                  <p style={{ fontFamily: MONO, fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", margin: 0 }}>
                    OPERATING STATUS: ACTIVE
                  </p>
                </div>
                <p style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(1.25rem,2.5vw,1.625rem)", letterSpacing: "-0.01em", color: "#FFFFFF", margin: "0 0 4px", lineHeight: 1.1 }}>
                  MC Authority
                </p>
                <p style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, margin: 0 }}>
                  Protected
                </p>
              </div>
            </div>

            {/* Bottom pillars row */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {PILLARS.slice(2, 4).map((p, i) => (
                <PillarNode key={p.code} pillar={p} isTargeted={activeThreat === THREATS[i + 2].direction} visible={visible} delay={0.28 + i * 0.08} />
              ))}
            </div>

            {/* Guards row */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {GUARDS.map((g, i) => (
                <GuardNode key={g.code} guard={g} visible={visible} delay={0.42 + i * 0.06} />
              ))}
            </div>

          </div>

          {/* Right: THROUGH + UNDER threats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", justifyContent: "space-between", flexShrink: 0, width: 148 }}>
            <ThreatVector
              threat={THREATS[1]}
              isActive={activeThreat === "AROUND"}
              onHover={() => setActiveThreat("AROUND")}
              onLeave={() => setActiveThreat(null)}
              visible={visible}
              delay={0.1}
            />
            <ThreatVector
              threat={THREATS[2]}
              isActive={activeThreat === "THROUGH"}
              onHover={() => setActiveThreat("THROUGH")}
              onLeave={() => setActiveThreat(null)}
              visible={visible}
              delay={0.18}
            />
          </div>
        </div>

        {/* ── Threat detail callout ── */}
        <ThreatDetail threat={active} />

        {/* ── Bottom legend ── */}
        <div
          style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid rgba(200,147,63,0.10)", paddingTop: "1.25rem", ...fadeIn(visible, 0.65) }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { dot: GOLD, label: "4 Operational Pillars" },
              { dot: "rgba(200,147,63,0.35)", label: "4 Industrial Guards" },
              { dot: "rgba(255,255,255,0.20)", label: "Threat Vectors (hover to activate)" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: item.dot, flexShrink: 0, display: "inline-block" }} />
                <p style={{ fontFamily: MONO, fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: 0 }}>{item.label}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: MONO, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", margin: 0 }}>
            LaunchPath Operating Standard v1.0
          </p>
        </div>

      </div>

      {/* Responsive styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .arch-layout {
            flex-direction: column !important;
          }
          .arch-layout > div:first-child,
          .arch-layout > div:last-child {
            width: auto !important;
            flex-direction: row !important;
          }
        }
      `}} />
    </section>
  );
}
