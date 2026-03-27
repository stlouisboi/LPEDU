import { useState } from "react";
import { T, mono, serif, display } from "./tokens";

export const section = (children, bg = T.navy, extra = {}) => (
  <section style={{ background: bg, ...extra }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px clamp(20px, 5vw, 40px)" }}>
      {children}
    </div>
  </section>
);

export const SectionLabel = ({ children }) => (
  <p style={{
    ...mono, fontSize: 10, letterSpacing: "0.18em", color: T.goldText,
    textTransform: "uppercase", marginBottom: 24,
  }}>{children}</p>
);

export const GoldDivider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "32px 0" }}>
    <div style={{ flex: 1, height: 1, background: T.navyBorder }} />
    <div style={{ width: 6, height: 6, background: T.gold, transform: "rotate(45deg)" }} />
    <div style={{ flex: 1, height: 1, background: T.navyBorder }} />
  </div>
);

export const GoldLine = () => (
  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`, margin: "40px 0" }} />
);

export const SectionDivider = ({ line }) => (
  <div style={{
    background: "#080f1c",
    borderTop: `1px solid ${T.navyBorder}`,
    borderBottom: `1px solid ${T.navyBorder}`,
    padding: "22px clamp(20px, 5vw, 40px)",
    textAlign: "center",
  }}>
    <p style={{ ...mono, fontSize: 11, color: T.fog, letterSpacing: "0.14em", fontStyle: "italic" }}>{line}</p>
  </div>
);

export const CheckItem = ({ children, accent = T.gold }) => (
  <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
    <span style={{ color: accent, flexShrink: 0, marginTop: 3, fontSize: 12 }}>✓</span>
    <span style={{ ...serif, fontSize: 15, color: T.mist, lineHeight: 1.6 }}>{children}</span>
  </div>
);

export const CrossItem = ({ children, accent = "#7A3535" }) => (
  <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
    <span style={{ color: accent, flexShrink: 0, marginTop: 4, fontSize: 13 }}>✕</span>
    <span style={{ ...serif, fontSize: 15, color: T.fog, lineHeight: 1.6 }}>{children}</span>
  </div>
);

export const ArrowItem = ({ children, color = T.white }) => (
  <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
    <span style={{ color: T.gold, flexShrink: 0, marginTop: 3, fontSize: 12 }}>→</span>
    <span style={{ ...serif, fontSize: 15, color, lineHeight: 1.6 }}>{children}</span>
  </div>
);

export const CTAButton = ({ children, primary = true, onClick, style = {}, disabled = false, "data-testid": testId }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    disabled={disabled}
    style={{
      ...mono,
      fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
      padding: "16px 32px", border: "none", cursor: disabled ? "not-allowed" : "pointer",
      minHeight: 48,
      background: primary
        ? (disabled ? T.goldDim : T.gold)
        : "transparent",
      color: primary ? T.navy : T.goldText,
      border: primary ? "none" : `1px solid ${T.goldDim}`,
      opacity: disabled ? 0.7 : 1,
      transition: "opacity 0.2s, background 0.2s",
      ...style,
    }}
  >{children}</button>
);

export const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.navyBorder}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          padding: "20px 0", gap: 16, textAlign: "left", minHeight: 44,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ ...mono, fontSize: 10, color: T.fog, flexShrink: 0, paddingTop: 3 }}>{String(index).padStart(2, "0")}</span>
          <span style={{ ...serif, fontSize: 17, color: T.white, lineHeight: 1.5 }}>{q}</span>
        </div>
        <span style={{ ...mono, fontSize: 16, color: T.gold, flexShrink: 0 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 20, paddingLeft: 34 }}>
          {a.split("\n\n").map((para, i) => (
            <p key={i} style={{ ...serif, fontSize: 16, color: T.mist, lineHeight: 1.75, marginBottom: 12 }}>{para}</p>
          ))}
        </div>
      )}
    </div>
  );
};
