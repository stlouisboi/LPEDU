import { Link } from "react-router-dom";

const LAYERS = [
  {
    label: "LAYER 1 — THREAT MODEL",
    name: "16 Deadly Sins",
    desc: "Why new carriers fail",
    color: "#D85A30",
    href: "/standards/16-deadly-sins",
  },
  {
    label: "LAYER 2 — ATTACK PATH",
    name: "AUTO Method",
    desc: "Around \u00b7 Under \u00b7 Through \u00b7 Over",
    color: "#BA7517",
    href: "/auto-method",
  },
  {
    label: "LAYER 3 — DEFENSE SYSTEM",
    name: "Four Pillars",
    desc: "Authority \u00b7 Insurance \u00b7 Compliance \u00b7 Cash Flow",
    color: "#0F6E56",
    href: "/#four-pillars",
  },
  {
    label: "LAYER 4 — INFRASTRUCTURE",
    name: "Compliance Packets",
    desc: "Five domains \u00b7 Documents installed",
    color: "#0b1628",
    href: "/standards#packets",
  },
  {
    label: "LAYER 5 — EXECUTION",
    name: "0\u201330\u201390 Day Installation",
    desc: "Infrastructure \u00b7 Standard \u00b7 Hardening",
    color: "#534AB7",
    href: "/standards/new-carrier-document-system",
  },
];

export function DoctrineStack() {
  return (
    <div style={{ marginBottom: "4rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {LAYERS.map((layer, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            <Link
              to={layer.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 72,
                padding: "0 1.75rem",
                background: layer.color,
                textDecoration: "none",
                transition: "filter 0.15s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.12)")}
              onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
            >
              {/* Left: label + name */}
              <div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "0.25rem",
                }}>{layer.label}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  letterSpacing: "0.01em",
                }}>{layer.name}</p>
              </div>

              {/* Right: descriptor — hidden on very small screens */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.857rem",
                color: "rgba(255,255,255,0.78)",
                textAlign: "right",
                letterSpacing: "0.02em",
                maxWidth: 140,
              }} className="doctrine-desc">{layer.desc}</p>
            </Link>

            {/* Arrow connector between layers */}
            {i < LAYERS.length - 1 && (
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                height: 22,
                background: "transparent",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 0 L7 10 M3 7 L7 11 L11 7" stroke="rgba(212,144,10,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Caption */}
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "var(--text-sm)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.8)",
          marginBottom: "0.25rem",
        }}>LaunchPath Authority Survival Framework</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.857rem",
          color: "rgba(255,255,255,0.62)",
          letterSpacing: "0.03em",
        }}>The 90-Day Compliance Operating Standard for new motor carrier authorities</p>
      </div>
      <style>{`@media (max-width: 480px) { .doctrine-desc { display: none !important; } }`}</style>
    </div>
  );
}
