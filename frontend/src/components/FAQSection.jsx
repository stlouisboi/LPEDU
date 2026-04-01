import { useState } from "react";

const GOLD = "#C8933F";
const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "'Inter', sans-serif";

const FAQS = [
  {
    q: "Is this done-for-you compliance?",
    a: "No. I do not do your compliance for you. I built the system so you can do it yourself with order. You do the work. The system shows you what, when, and how.",
    code: "LP-FAQ-001",
  },
  {
    q: "Is this only for carriers that already failed something?",
    a: "No. It is for carriers who do not want preventable failure to teach them what should have been installed earlier. Most operators who come in have not failed anything yet. That is the point.",
    code: "LP-FAQ-002",
  },
  {
    q: "What if my authority is already active?",
    a: "Then the window is already open. That is exactly why you need to know how exposed the operation is right now. Active does not mean protected.",
    code: "LP-FAQ-003",
  },
  {
    q: "What if I am not ready?",
    a: "Then the correct answer is not speed. The correct answer is correction. REACH will tell you what is missing. Fix those gaps before moving forward.",
    code: "LP-FAQ-004",
  },
  {
    q: "What if I already have some files in place?",
    a: "REACH identifies what is missing. You do not rebuild what is already installed — you fill the gaps and verify the structure. Starting with partial systems is common.",
    code: "LP-FAQ-005",
  },
  {
    q: "How much time does the installation require each week?",
    a: "Plan for 3–5 hours per week during the 90-day installation window. The work is structured. You are not guessing what to do next.",
    code: "LP-FAQ-006",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ fontFamily: MONO }}>
      <div className="struct-rail" style={{ marginBottom: 0 }} />
      <button
        data-testid={`faq-item-${index + 1}`}
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none",
          cursor: "pointer", padding: "1.5rem 0",
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", gap: "1.5rem", textAlign: "left",
        }}
      >
        <div style={{ flex: 1 }}>
          <span style={{
            fontFamily: MONO, fontSize: "0.600rem", fontWeight: 700,
            color: "rgba(200,147,63,0.40)", letterSpacing: "0.10em",
            background: "rgba(200,147,63,0.06)",
            border: "1px solid rgba(200,147,63,0.15)",
            padding: "0.15rem 0.45rem",
            marginRight: "0.75rem", display: "inline-block",
            verticalAlign: "middle",
          }}>
            {faq.code}
          </span>
          <span style={{
            fontFamily: MONO,
            fontSize: "0.925rem", fontWeight: 600,
            color: open ? GOLD : "rgba(255,255,255,0.85)",
            lineHeight: 1.6,
            transition: "color 0.2s ease",
          }}>
            {faq.q}
          </span>
        </div>
        <span style={{
          fontFamily: MONO, fontSize: "0.925rem",
          color: open ? GOLD : "rgba(200,147,63,0.50)",
          flexShrink: 0, transition: "color 0.2s ease",
          lineHeight: 1, marginTop: "0.15rem",
        }}>
          {open ? "[ − ]" : "[ + ]"}
        </span>
      </button>

      <div style={{ maxHeight: open ? "480px" : "0", overflow: "hidden", transition: "max-height 0.38s cubic-bezier(0.4,0,0.2,1)" }}>
        <div className="inset-card" style={{
          paddingBottom: "1.625rem", paddingLeft: "1.75rem",
          paddingTop: "0.25rem",
          borderLeft: "2px solid rgba(200,147,63,0.30)",
          marginLeft: "1.25rem", marginBottom: "0.75rem",
          background: "rgba(200,147,63,0.03)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.28s ease 0.06s",
        }}>
          <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(244,241,235,0.70)", lineHeight: 1.85, margin: 0 }}>
            {faq.a}
          </p>
          <p style={{ fontFamily: MONO, fontSize: "0.575rem", color: "rgba(200,147,63,0.22)", marginTop: "0.875rem", marginBottom: 0, letterSpacing: "0.08em" }}>
            {faq.code} — END
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      data-testid="faq-section"
      style={{
        background: "#070c14",
        borderTop: "1px solid rgba(200,147,63,0.10)",
        borderBottom: "1px solid rgba(200,147,63,0.10)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,147,63,0.45)" }}>
            ▸ SYSTEM LOG
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(200,147,63,0.12)" }} />
          <span style={{ fontFamily: MONO, fontSize: "0.58rem", color: "rgba(200,147,63,0.25)" }}>
            LP-FAQ.LOG
          </span>
        </div>

        <h2 style={{ fontFamily: MONO, fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "2.75rem" }}>
          // Questions Before You Start
        </h2>

        <div style={{ position: "relative", paddingLeft: "1rem" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 3, background: `linear-gradient(180deg, ${GOLD}, rgba(200,147,63,0.08))` }} />
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
            <div className="struct-rail" style={{ marginTop: 0 }} />
          </div>
          <div style={{ paddingTop: "1.25rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.625rem", color: "rgba(200,147,63,0.22)", letterSpacing: "0.10em" }}>
              // EOF — LP-FAQ.LOG
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
