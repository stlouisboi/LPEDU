import { useEffect, useRef, useState } from "react";

const AUTO_CARDS = [
  {
    letter: "A",
    dir: "AROUND",
    code: "LP-MOD-AUTO-A",
    threat: "Insurance exposure & liability gaps",
    detail: "Coverage gaps and policy misalignment that leave the authority exposed to third-party claims and BMC-91 filing lapses.",
  },
  {
    letter: "U",
    dir: "UNDER",
    code: "LP-MOD-AUTO-U",
    threat: "Financial collapse & cash flow failure",
    detail: "Cost-per-mile blindness and rate compression that erode operational runway before FMCSA enforcement arrives.",
  },
  {
    letter: "T",
    dir: "THROUGH",
    code: "LP-MOD-AUTO-T",
    threat: "Compliance failure & documentation gaps",
    detail: "HOS violations, D&A program gaps, and driver qualification failures that convert directly into CSA point accumulation.",
  },
  {
    letter: "O",
    dir: "OVER",
    code: "LP-MOD-AUTO-O",
    threat: "Regulatory enforcement & audit failure",
    detail: "New entrant audit exposure that terminates authority within the first 12–24 months of operation.",
  },
];

function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}


function AutoCard({ card, visible, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-testid={`auto-card-${card.letter.toLowerCase()}`}
      style={{
        background: hovered ? "#003366" : "#002244",
        padding: "2rem 1.5rem",
        boxShadow: hovered ? "inset 0 0 0 1px rgba(197,160,89,0.32)" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: [
          "background 0.25s ease",
          "box-shadow 0.25s ease",
          `opacity 0.6s ease ${delay}ms`,
          `transform 0.6s ease ${delay}ms`,
        ].join(", "),
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 800,
        fontSize: "3.5rem",
        color: "#C5A059",
        lineHeight: 1,
        marginBottom: "0.375rem",
        display: "inline-block",
        transition: "transform 0.2s ease",
        transform: hovered ? "scale(1.12)" : "scale(1)",
        transformOrigin: "left center",
      }}>
        {card.letter}
      </p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "0.784rem",
        color: "#FFFFFF",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "0.5rem",
      }}>
        {card.dir}
      </p>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.616rem",
        color: "rgba(197,160,89,0.65)",
        letterSpacing: "0.08em",
        marginBottom: "0.75rem",
      }}>
        {card.code}
      </p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.784rem",
        fontWeight: 600,
        color: "rgba(255,255,255,0.78)",
        lineHeight: 1.55,
        marginBottom: "0.5rem",
      }}>
        {card.threat}
      </p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.784rem",
        color: "rgba(255,255,255,0.45)",
        lineHeight: 1.65,
      }}>
        {card.detail}
      </p>
    </div>
  );
}

export default function AutoMethodTeaserSection() {
  const [sectionRef, visible] = useVisible(0.08);

  return (
    <section
      data-testid="auto-method-teaser"
      ref={sectionRef}
      style={{
        background: "#002244",
        borderTop: "1px solid rgba(197,160,89,0.15)",
        borderBottom: "1px solid rgba(197,160,89,0.15)",
        padding: "72px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            color: "rgba(197,160,89,0.85)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            LP-MOD-AUTO | AUTHORITY PROTECTION MODEL
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "0.875rem",
          }}>
            The AUTO Method
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            maxWidth: 520,
          }}>
            Every new carrier authority faces predictable failure vectors.
            The AUTO Method maps those threats — Around, Under, Through, and Over — and installs the guards that keep them from reaching your operation.
          </p>
        </div>

        {/* 4 cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(197,160,89,0.12)",
        }} className="auto-teaser-grid">
          {AUTO_CARDS.map((card, i) => (
            <AutoCard key={card.letter} card={card} visible={visible} delay={i * 100} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .auto-teaser-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .auto-teaser-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
