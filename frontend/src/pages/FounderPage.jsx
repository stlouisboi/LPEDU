import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { Link } from "../compat/Link";

const JBMONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS   = "'Inter', sans-serif";
const SERIF  = "'Newsreader', 'Playfair Display', serif";
const GOLD   = "#C8933F";
const BG     = "#070d1a";
const CARD   = "#09111e";
const RED    = "rgba(192,57,43,0.70)";

const CREDENTIALS = [
  { code: "LP-CRED-01", label: "U.S. Navy Veteran" },
  { code: "LP-CRED-02", label: "OSHA-Certified Safety Professional" },
  { code: "LP-CRED-03", label: "25+ Years in Leadership and Safety-Based Operations" },
  { code: "LP-CRED-04", label: "Founder, LaunchPath Transportation EDU" },
];

const OBSERVATIONS = [
  { id: "OBS-01", text: "Operations that collapsed when structure came late — after the authority was already active and loads were already moving." },
  { id: "OBS-02", text: "Carriers built on assumption. No file discipline. No control sequence. No awareness of how close danger already was." },
  { id: "OBS-03", text: "Authorities that went active before the operation behind them was ready. The MC number was live. The guard was not installed." },
  { id: "OBS-04", text: "Missing controls that stayed quiet until pressure found them — usually during an audit, sometimes in an accident investigation." },
  { id: "OBS-05", text: "Operators who did not know what they did not know, and paid for it before anyone warned them." },
];

const SYSTEM = [
  {
    code: "01", label: "REACH",
    role: "Exposure-awareness and readiness diagnostic",
    def: "REACH reveals whether danger can already reach the authority, how exposed the operator is, and whether the operator should proceed, wait, or stop.",
  },
  {
    code: "02", label: "GROUND 0",
    role: "Wisdom, posture, and consequence orientation",
    def: "Ground 0 trains the operator to think correctly about order, consequence, stewardship, and the real cost of building without structure.",
  },
  {
    code: "03", label: "FOUR PILLARS",
    role: "Protective guard structure around the authority",
    def: "The Four Pillars form the guard: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen — the defensive structure that protects the authority where new carriers break most often.",
  },
  {
    code: "04", label: "AUTO",
    role: "Threat breach-path model",
    def: "AUTO identifies the four ways failure attempts to bypass, penetrate, or overwhelm the guard around the authority: Around, Under, Through, or Over.",
  },
  {
    code: "05", label: "16 DEADLY SINS",
    role: "Threat taxonomy",
    def: "The 16 Deadly Sins are the recurring preventable failures that most often expose, weaken, or damage a new carrier during the New Entrant period.",
  },
  {
    code: "06", label: "MODULES",
    role: "Guard installation sequence",
    def: "The modules install the protection in practice — turning doctrine into files, records, controls, procedures, rhythms, and operating discipline.",
  },
];

// Bracket corner element
function Corner({ pos }) {
  const isTop = "top" in pos;
  const isLeft = "left" in pos;
  return (
    <div style={{
      position: "absolute",
      width: 18, height: 18,
      pointerEvents: "none",
      borderTop:    isTop    ? `1px solid ${GOLD}` : "none",
      borderBottom: !isTop   ? `1px solid ${GOLD}` : "none",
      borderLeft:   isLeft   ? `1px solid ${GOLD}` : "none",
      borderRight:  !isLeft  ? `1px solid ${GOLD}` : "none",
      top:    isTop    ? -1 : undefined,
      bottom: !isTop   ? -1 : undefined,
      left:   isLeft   ? -1 : undefined,
      right:  !isLeft  ? -1 : undefined,
    }} />
  );
}

// Section label row
function SectionLabel({ code, label, accent }) {
  const color = accent || GOLD;
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "2.5rem" }}>
      <div style={{ width: 2, height: 24, background: color, flexShrink: 0 }} />
      <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(${accent ? "192,57,43" : "197,160,89"},0.65)`, margin: 0 }}>
        {code} | {label}
      </p>
    </div>
  );
}

export default function FounderPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#F5F5F5", overflowX: "hidden" }}>
      <Navbar />

      {/* ── File Classification Band ── */}
      <div style={{ background: "#050a14", borderBottom: "1px solid rgba(197,160,89,0.14)", padding: "0.6rem 1.5rem" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          {[
            { text: "LP-FOUNDER-001",              dim: false },
            { text: "|",                            dim: true  },
            { text: "CREDIBILITY FILE",             dim: false },
            { text: "|",                            dim: true  },
            { text: "STATUS: ACTIVE",               dim: false, green: true },
            { text: "|",                            dim: true  },
            { text: "FILED: LaunchPath Transportation EDU", dim: true },
          ].map((seg, i) => (
            <span key={i} style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: seg.dim ? 400 : 700, letterSpacing: "0.18em", textTransform: "uppercase", color: seg.dim ? "rgba(197,160,89,0.22)" : seg.green ? "rgba(61,153,112,0.70)" : "rgba(197,160,89,0.55)" }}>{seg.text}</span>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 1020, margin: "0 auto", padding: "5.5rem 1.5rem 8rem" }}>

        {/* ══ SECTION 1: Identity Dossier ══ */}
        <section
          data-testid="founder-identity-block"
          style={{ position: "relative", border: "1px solid rgba(197,160,89,0.14)", background: CARD, padding: "3rem", marginBottom: "6rem" }}
        >
          <Corner pos={{ top: 0, left:  0 }} />
          <Corner pos={{ top: 0, right: 0 }} />
          <Corner pos={{ bottom: 0, left:  0 }} />
          <Corner pos={{ bottom: 0, right: 0 }} />

          {/* Record header */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.75rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(197,160,89,0.08)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, boxShadow: `0 0 6px ${GOLD}`, flexShrink: 0 }} />
            <span style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.55)" }}>PERMANENT RECORD — FOUNDER FILE</span>
          </div>

          {/* Name */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(197,160,89,0.32)", margin: "0 0 0.625rem" }}>FULL NAME</p>
            <h1
              data-testid="founder-name"
              style={{ fontFamily: SERIF, fontWeight: 900, fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", color: "#F5F5F5", letterSpacing: "-0.04em", lineHeight: 0.95, margin: 0 }}
            >
              Vince Lawrence
            </h1>
          </div>

          {/* Title */}
          <div style={{ marginBottom: "2.75rem", paddingBottom: "2.75rem", borderBottom: "1px solid rgba(197,160,89,0.08)" }}>
            <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(197,160,89,0.32)", margin: "0 0 0.5rem" }}>TITLE & DESIGNATION</p>
            <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: "1.064rem", color: "rgba(245,245,245,0.80)", letterSpacing: 0, margin: "0 0 0.25rem", lineHeight: 1.4 }}>
              Founder & Chief System Architect
            </p>
            <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "0.952rem", color: "rgba(245,245,245,0.38)", margin: 0 }}>
              LaunchPath Transportation EDU
            </p>
          </div>

          {/* Credentials on file */}
          <div>
            <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(197,160,89,0.32)", margin: "0 0 1rem" }}>CREDENTIALS ON FILE</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(197,160,89,0.10)" }}>
              {CREDENTIALS.map((c, i) => (
                <div
                  key={c.code}
                  style={{
                    display: "flex", gap: "1.5rem", alignItems: "center",
                    padding: "0.875rem 1.25rem",
                    borderBottom: i < CREDENTIALS.length - 1 ? "1px solid rgba(197,160,89,0.08)" : "none",
                    background: i % 2 === 0 ? "rgba(197,160,89,0.025)" : "transparent",
                  }}
                >
                  <span style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(197,160,89,0.40)", flexShrink: 0 }}>{c.code}</span>
                  <div style={{ width: 1, height: 16, background: "rgba(197,160,89,0.12)", flexShrink: 0 }} />
                  <span style={{ fontFamily: SANS, fontSize: "0.938rem", fontWeight: 500, color: "rgba(245,245,245,0.78)" }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SECTION 2: Origin Statement ══ */}
        <section data-testid="founder-origin" style={{ marginBottom: "6rem" }}>
          <SectionLabel code="LP-RECORD-ORIGIN" label="WHY THIS WAS BUILT" />

          <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#F5F5F5", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "2.25rem", maxWidth: 680 }}>
            Built from pattern recognition, not theory.
          </h2>

          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: "rgba(245,245,245,0.75)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              LaunchPath was built by Vince Lawrence, a U.S. Navy veteran, OSHA-certified safety professional, and operator shaped by more than 25 years in leadership, safety-based operations, and regulated work environments.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: "rgba(245,245,245,0.68)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              He built this system after seeing what happens when responsibility outruns structure, when authority goes active before the operation behind it is ready, and when missing controls stay hidden until pressure exposes them.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: "rgba(245,245,245,0.50)", lineHeight: 1.9, fontStyle: "italic", margin: 0 }}>
              LaunchPath comes from real-world pattern recognition, not theory.
            </p>
          </div>
        </section>

        {/* ══ SECTION 3: Pattern Observations ══ */}
        <section data-testid="founder-pattern" style={{ marginBottom: "6rem" }}>
          <SectionLabel code="LP-RECORD-PATTERN" label="OBSERVED FAILURE BEHAVIORS" accent="red" />

          <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#F5F5F5", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.875rem", maxWidth: 560 }}>
            The pattern repeated.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: "rgba(245,245,245,0.38)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 560, fontStyle: "italic" }}>
            These are the failure behaviors Vince watched accumulate — across operations, carriers, and regulated environments — before building a system to stop them.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(192,57,43,0.14)", borderLeft: "2px solid rgba(192,57,43,0.45)" }}>
            {OBSERVATIONS.map((obs, i) => (
              <div
                key={obs.id}
                style={{
                  display: "flex", gap: "1.5rem", alignItems: "flex-start",
                  padding: "1.25rem 1.5rem",
                  borderBottom: i < OBSERVATIONS.length - 1 ? "1px solid rgba(192,57,43,0.10)" : "none",
                  background: i % 2 === 0 ? "rgba(192,57,43,0.025)" : "transparent",
                }}
              >
                <span style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(192,57,43,0.45)", flexShrink: 0, paddingTop: "0.25rem" }}>{obs.id}</span>
                <div style={{ width: 1, background: "rgba(192,57,43,0.12)", flexShrink: 0, alignSelf: "stretch", minHeight: 18 }} />
                <span style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(245,245,245,0.70)", lineHeight: 1.78 }}>{obs.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 4: The Protection Standard ══ */}
        <section data-testid="founder-system" style={{ marginBottom: "6rem" }}>
          <SectionLabel code="LP-RECORD-SYSTEM" label="WHAT WAS BUILT" />

          <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#F5F5F5", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.875rem", maxWidth: 560 }}>
            The protection standard.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: "rgba(245,245,245,0.38)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 560 }}>
            LaunchPath runs in a fixed sequence. Each part has a role. None of the roles are interchangeable.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(197,160,89,0.10)" }} className="founder-system-list">
            {SYSTEM.map((s, i) => (
              <div
                key={s.code}
                className="founder-system-item"
                style={{
                  display: "flex", gap: 0, alignItems: "stretch",
                  borderBottom: i < SYSTEM.length - 1 ? "1px solid rgba(197,160,89,0.08)" : "none",
                  background: i % 2 === 0 ? "rgba(197,160,89,0.02)" : "transparent",
                }}
              >
                {/* Left: code + label */}
                <div className="founder-system-left" style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end", justifyContent: "center", padding: "1.75rem 1.5rem", minWidth: 120, flexShrink: 0, borderRight: "1px solid rgba(197,160,89,0.08)" }}>
                  <span style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(197,160,89,0.30)" }}>{s.code}</span>
                  <span style={{ fontFamily: JBMONO, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.08em", color: GOLD, textTransform: "uppercase", textAlign: "right" }}>{s.label}</span>
                </div>
                {/* Right: role + definition */}
                <div style={{ padding: "1.75rem 1.5rem", flex: 1 }}>
                  <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.40)", margin: "0 0 0.625rem" }}>{s.role}</p>
                  <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: "rgba(245,245,245,0.68)", lineHeight: 1.75, margin: 0 }}>{s.def}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Master logic line */}
          <div style={{ marginTop: "2rem", padding: "1.375rem 1.5rem", background: "rgba(197,160,89,0.03)", border: "1px solid rgba(197,160,89,0.12)", borderLeft: "2px solid rgba(197,160,89,0.40)" }}>
            <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(197,160,89,0.40)", margin: "0 0 0.75rem" }}>MASTER LOGIC LINE</p>
            <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(245,245,245,0.55)", lineHeight: 1.88, margin: 0 }}>
              REACH reveals the exposure. Ground 0 forms the posture. The Four Pillars create the guard. AUTO maps the breach paths. The 16 Deadly Sins name the threats. The modules install the protection.
            </p>
          </div>
        </section>

        {/* ══ SECTION 5: Founder Signature ══ */}
        <section
          data-testid="founder-signature"
          style={{ position: "relative", padding: "3rem", background: CARD, border: "1px solid rgba(197,160,89,0.12)", borderLeft: "2px solid rgba(197,160,89,0.50)", marginBottom: "6rem" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, rgba(197,160,89,0.30), transparent)" }} />
          <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(197,160,89,0.35)", margin: "0 0 1.75rem" }}>FOUNDER STATEMENT — ON RECORD</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: GOLD, lineHeight: 1.65, margin: "0 0 1.75rem", maxWidth: 560 }}>
            "I don't do your compliance. I built the system so you can do it yourself."
          </p>
          <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(197,160,89,0.28)", margin: 0 }}>
            — Vince Lawrence, Founder & Chief System Architect
          </p>
        </section>

        {/* ══ SECTION 6: CTA ══ */}
        <section
          data-testid="founder-cta"
          style={{ position: "relative", border: "1px solid rgba(197,160,89,0.14)", padding: "3.5rem 2rem", textAlign: "center" }}
        >
          <Corner pos={{ top: 0, left:  0 }} />
          <Corner pos={{ top: 0, right: 0 }} />
          <Corner pos={{ bottom: 0, left:  0 }} />
          <Corner pos={{ bottom: 0, right: 0 }} />

          <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(197,160,89,0.40)", margin: "0 0 1.5rem" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#F5F5F5", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 1.25rem" }}>
            If your authority is active, the window is already open.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(245,245,245,0.48)", lineHeight: 1.78, margin: "0 auto 2.75rem", maxWidth: 460 }}>
            REACH reveals how exposed your operation is right now — and whether you should proceed, wait, or stop.
          </p>
          <Link
            to="/reach-diagnostic"
            data-testid="founder-reach-cta"
            style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#070d1a", background: GOLD, padding: "1rem 2.75rem", textDecoration: "none", display: "inline-block", transition: "background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#dfa84e"; }}
            onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
          >
            Run the REACH Diagnostic →
          </Link>
          <p style={{ fontFamily: JBMONO, fontSize: "0.524rem", letterSpacing: "0.12em", color: "rgba(245,245,245,0.18)", marginTop: "1.25rem" }}>4 MINUTES · FREE · NO ACCOUNT REQUIRED</p>
        </section>

      </main>

      <FooterSection />

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 600px) {
          .founder-system-item { flex-direction: column !important; }
          .founder-system-left { align-items: flex-start !important; text-align: left !important; border-right: none !important; border-bottom: 1px solid rgba(197,160,89,0.08) !important; min-width: unset !important; }
        }
      `}} />
    </div>
  );
}
