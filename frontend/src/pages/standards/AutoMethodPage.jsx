import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";

const coral  = "#D85A30";
const gold   = "#C8933F";
const pageBg = "#060d19";
const cardBg = "#0b1220";
const MONO   = "'JetBrains Mono', 'Courier New', monospace";
const SANS   = "'Inter', sans-serif";
const SERIF  = "'Newsreader', 'Playfair Display', serif";

const PATHS = [
  {
    letter: "A",
    label:  "AROUND",
    tag:    "BYPASS PATH",
    color:  "#b87333",
    def:    "The threat moves alongside the guard without triggering it.",
    how: "External compliance is visible and current. Insurance is active. DOT registration is in order. But internal controls — driver files, drug and alcohol program documentation, HOS records — are absent or incomplete. The threat does not need to break through anything. It moves in the space between what was filed and what was actually installed.",
    field: "A carrier completes every required registration step. All external filings are current. A roadside inspection triggers a New Entrant Safety Audit. The investigator requests controlled substances and alcohol program documentation. There is none. The external record appears complete. The internal compliance never existed. The authority collapses through the gap between what was registered and what was actually operating.",
    cfr:    "49 CFR § 382 — Controlled Substances and Alcohol Use and Testing",
    pillar: "Compliance Backbone",
    pillarNote: "Internal program controls close the gap between external filing and internal practice.",
  },
  {
    letter: "U",
    label:  "UNDER",
    tag:    "ACCUMULATION PATH",
    color:  "#7a6f2b",
    def:    "The threat builds beneath the visible threshold until it cannot be contained.",
    how: "Individual violations are small. A log entry missed. A maintenance inspection delayed two days. A required test conducted slightly late. None triggers immediate action. The carrier is not aware of the accumulating record. When a pattern is documented, the investigator's view is not accidental deviation — it is systemic non-compliance. The authority's rating changes. The carrier did not see it building.",
    field: "Recurring gaps in HOS records over five to seven months. Each gap appears isolated. In aggregate, the pattern establishes a compliance failure that carries the same weight as a single major violation — because the record shows it happened again and again without correction.",
    cfr:    "49 CFR § 395 — Hours of Service of Drivers",
    pillar: "Compliance Backbone",
    pillarNote: "Record discipline and review rhythm prevents accumulation before patterns become documented.",
  },
  {
    letter: "T",
    label:  "THROUGH",
    tag:    "PENETRATION PATH",
    color:  "#b02a1e",
    def:    "The threat enters directly through a specific unguarded gap.",
    how: "One file is incomplete. One qualification is missing. One certification is dated after the fact. The gap is specific. The regulation is clear. The investigator finds it without searching. This is the most common breach path for new carriers during the first 18 months of authority. The failure is not hidden. It is present in the record, waiting to be read.",
    field: "LP-CASE-001 — The $19,246 Oversight. Medical Examiner's Certificate dated two days after the driver's first dispatch. One document. One date. One regulation. Automatic failure under 49 CFR § 385.321. Authority revoked 15 days later. This is the Through path in working form: a gap that should have been closed before dispatch was signed.",
    cfr:    "49 CFR § 391.41 / § 385.321 — Physical Qualifications; New Entrant Audit",
    pillar: "Compliance Backbone",
    pillarNote: "Driver Qualification File system requires complete certification verification before dispatch authorization is given.",
  },
  {
    letter: "O",
    label:  "OVER",
    tag:    "OVERLOAD PATH",
    color:  "#7a1a2a",
    def:    "The threat overtops the guard by exceeding the structure's capacity.",
    how: "The carrier expands before the compliance structure can scale with it. A second driver is added before the DQ file process is reinforced for two operators. Load volume increases before dispatch discipline is strengthened. Cash-flow pressure delays insurance payments. The guard that held for one truck cannot contain the exposure created by three. The threat does not bypass or penetrate the guard. It simply grows taller than the existing defense can reach.",
    field: "A carrier operating one truck under basic compliance expands to three trucks in 60 days. Insurance payments become irregular. Driver qualification files for new hires are incomplete. HOS record discipline breaks down under load pressure. A single roadside citation triggers a full audit. The audit finds structural exposure across three drivers. The investigation is not about the citation. It is about the pattern that followed the growth.",
    cfr:    "49 CFR § 383 / § 391 / § 395 / § 396 — Multiple domains",
    pillar: "Cash-Flow Oxygen + Authority Protection",
    pillarNote: "Expansion must be matched by structural reinforcement across both financial and compliance dimensions.",
  },
];

const MATRIX = [
  { path: "A — AROUND",   pillar: "Compliance Backbone",                    note: "Installs internal controls where external filing ends." },
  { path: "U — UNDER",    pillar: "Compliance Backbone",                    note: "Record discipline and rhythm block accumulation." },
  { path: "T — THROUGH",  pillar: "Compliance Backbone",                    note: "DQ file and checklist discipline closes specific gaps." },
  { path: "O — OVER",     pillar: "Cash-Flow Oxygen + Authority Protection", note: "Structural reinforcement scales with the operation." },
];

export default function AutoMethodPage() {
  return (
    <div style={{ background: pageBg, minHeight: "100vh", color: "#F5F5F5", overflowX: "hidden" }}>
      <Navbar />

      {/* ── File Classification Band ── */}
      <div style={{ background: "#050a14", borderBottom: "1px solid rgba(216,90,48,0.18)", padding: "0.6rem 1.5rem" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          {[
            { text: "LP-AUTO-001",             dim: false },
            { text: "|",                        dim: true  },
            { text: "BREACH-PATH MODEL",        dim: false },
            { text: "|",                        dim: true  },
            { text: "STATUS: ACTIVE",           dim: false, green: true },
            { text: "|",                        dim: true  },
            { text: "FILED: LaunchPath Transportation EDU", dim: true },
          ].map((seg, i) => (
            <span key={i} style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: seg.dim ? 400 : 700, letterSpacing: "0.18em", textTransform: "uppercase", color: seg.dim ? "rgba(216,90,48,0.22)" : seg.green ? "rgba(61,153,112,0.70)" : "rgba(216,90,48,0.60)" }}>{seg.text}</span>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 1020, margin: "0 auto", padding: "5.5rem 1.5rem 8rem" }}>

        {/* ── HERO ── */}
        <section style={{ marginBottom: "5rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(216,90,48,0.55)", margin: "0 0 1.25rem" }}>LP-AUTO | BREACH-PATH MODEL</p>
          <h1 data-testid="auto-h1" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#FFFFFF", letterSpacing: "-0.04em", lineHeight: 1.0, margin: "0 0 0.875rem" }}>
            The AUTO Method.
          </h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)", color: "rgba(216,90,48,0.75)", lineHeight: 1.3, margin: "0 0 2rem" }}>
            Four ways failure reaches the authority.
          </p>
          <div style={{ height: 2, background: coral, width: 56, marginBottom: "2.5rem" }} />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: "rgba(245,245,245,0.75)", lineHeight: 1.9, marginBottom: "1.25rem" }}>
              Understanding how failure moves is not the same as understanding what causes it. A carrier can know every regulation and still lose the authority if the breach path is already open.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: "rgba(245,245,245,0.58)", lineHeight: 1.9, margin: 0 }}>
              The AUTO model maps the four paths failure takes to reach the authority — Around, Under, Through, and Over. Each path behaves differently. Each requires a different control to close it. This model is not the guard. It is the breach map the guard is built to resist.
            </p>
          </div>
        </section>

        {/* ── WHY THIS MODEL ── */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "2rem" }}>
            <div style={{ width: 2, height: 20, background: coral, flexShrink: 0 }} />
            <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(216,90,48,0.60)", margin: 0 }}>LP-AUTO — WHY THIS MODEL EXISTS</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(216,90,48,0.12)", borderLeft: "2px solid rgba(216,90,48,0.40)" }}>
            {[
              "Most new carrier failures are not mysterious. They follow one of four recognizable patterns. The AUTO model names those patterns so they can be identified before an investigator names them first.",
              "The Four Pillars guard the authority. But a guard is only effective if you understand the breach paths it is guarding against. AUTO provides that understanding — it shows the directions of attack, not the defense.",
              "REACH uses the AUTO model to assess exposure. If danger is already close and the breach path is open, the REACH result tells the operator to stop. If the path is partially closed, the result tells them to wait. This is how the system is designed to work.",
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.25rem 1.5rem", borderBottom: i < 2 ? "1px solid rgba(216,90,48,0.08)" : "none", background: i % 2 === 0 ? "rgba(216,90,48,0.02)" : "transparent" }}>
                <span style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, color: "rgba(216,90,48,0.40)", flexShrink: 0, paddingTop: "0.2rem" }}>{`0${i+1}`}</span>
                <div style={{ width: 1, background: "rgba(216,90,48,0.10)", flexShrink: 0, alignSelf: "stretch", minHeight: 16 }} />
                <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: "rgba(245,245,245,0.68)", lineHeight: 1.78, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE FOUR BREACH PATHS ── */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
            <div style={{ width: 2, height: 20, background: coral, flexShrink: 0 }} />
            <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(216,90,48,0.60)", margin: 0 }}>LP-AUTO — THE FOUR BREACH PATHS</p>
          </div>
          <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: "rgba(245,245,245,0.35)", lineHeight: 1.75, marginBottom: "3rem", maxWidth: 560 }}>
            Each path has a distinct behavior. Each requires a specific control to resist it.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PATHS.map((p) => (
              <div
                key={p.letter}
                data-testid={`auto-path-${p.letter.toLowerCase()}`}
                style={{ background: cardBg, border: "1px solid rgba(255,255,255,0.05)", borderLeft: `3px solid ${p.color}`, overflow: "hidden" }}
              >
                {/* Path header */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem 1.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap" }}>
                  <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: "3rem", color: p.color, lineHeight: 1, flexShrink: 0 }}>{p.letter}</div>
                  <div>
                    <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: `${p.color}99`, margin: "0 0 0.25rem" }}>{p.tag}</p>
                    <p style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", color: p.color, margin: 0 }}>{p.label}</p>
                  </div>
                  <p style={{ fontFamily: SANS, fontStyle: "italic", fontSize: "0.952rem", color: "rgba(245,245,245,0.50)", lineHeight: 1.5, margin: 0, marginLeft: "auto", maxWidth: 360 }}>{p.def}</p>
                </div>

                {/* Path body */}
                <div style={{ padding: "1.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem" }} className="auto-path-body">
                  <div>
                    <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.28)", margin: "0 0 0.75rem" }}>HOW IT MOVES</p>
                    <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: "rgba(245,245,245,0.68)", lineHeight: 1.80, margin: 0 }}>{p.how}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.28)", margin: "0 0 0.75rem" }}>IN THE FIELD</p>
                    <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: "rgba(245,245,245,0.58)", lineHeight: 1.80, margin: 0, fontStyle: "italic" }}>{p.field}</p>
                  </div>
                </div>

                {/* Path footer */}
                <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, padding: "1rem 1.75rem", minWidth: 200, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,245,245,0.22)", margin: "0 0 0.375rem" }}>CFR REFERENCE</p>
                    <p style={{ fontFamily: MONO, fontSize: "0.625rem", color: "rgba(245,245,245,0.42)", margin: 0 }}>{p.cfr}</p>
                  </div>
                  <div style={{ flex: 2, padding: "1rem 1.75rem", minWidth: 260 }}>
                    <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: `${gold}80`, margin: "0 0 0.375rem" }}>PILLAR THAT RESISTS</p>
                    <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(200,147,63,0.72)", margin: 0 }}><strong>{p.pillar}</strong> — {p.pillarNote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROTECTION MATRIX ── */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "2rem" }}>
            <div style={{ width: 2, height: 20, background: gold, flexShrink: 0 }} />
            <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", margin: 0 }}>LP-AUTO — PROTECTION MATRIX</p>
          </div>
          <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: "rgba(245,245,245,0.38)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 560 }}>
            AUTO is the breach map. The Four Pillars are the guard. This matrix shows which Pillar resists each path.
          </p>
          <div style={{ border: "1px solid rgba(200,147,63,0.12)", overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", background: "rgba(200,147,63,0.05)", borderBottom: "1px solid rgba(200,147,63,0.12)", padding: "0.75rem 1.5rem", gap: "1.5rem" }}>
              {["BREACH PATH", "PILLAR", "CONTROL"].map(h => (
                <p key={h} style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,147,63,0.42)", margin: 0 }}>{h}</p>
              ))}
            </div>
            {MATRIX.map((row, i) => (
              <div key={row.path} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "1.5rem", padding: "1rem 1.5rem", borderBottom: i < MATRIX.length - 1 ? "1px solid rgba(200,147,63,0.08)" : "none", background: i % 2 === 0 ? "rgba(200,147,63,0.02)" : "transparent", alignItems: "center" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: coral, margin: 0 }}>{row.path}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.857rem", fontWeight: 600, color: "rgba(200,147,63,0.80)", margin: 0 }}>{row.pillar}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.857rem", color: "rgba(245,245,245,0.52)", lineHeight: 1.65, margin: 0 }}>{row.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section data-testid="auto-cta" style={{ position: "relative", border: "1px solid rgba(200,147,63,0.14)", padding: "3.5rem 2rem", textAlign: "center" }}>
          {/* Corner brackets */}
          {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
            <div key={i} style={{ position: "absolute", width: 16, height: 16, pointerEvents: "none", borderTop: i < 2 ? `1px solid ${gold}` : "none", borderBottom: i >= 2 ? `1px solid ${gold}` : "none", borderLeft: (i===0||i===2) ? `1px solid ${gold}` : "none", borderRight: (i===1||i===3) ? `1px solid ${gold}` : "none", ...pos, margin: -1 }} />
          ))}
          <p style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,147,63,0.40)", margin: "0 0 1.5rem" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#F5F5F5", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 1.25rem" }}>
            Know which path is already open in your operation.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(245,245,245,0.48)", lineHeight: 1.78, margin: "0 auto 2.75rem", maxWidth: 460 }}>
            REACH uses the AUTO model to assess your exposure. It tells you which breach path is most open right now — and whether you should proceed, wait, or stop.
          </p>
          <Link
            to="/reach-diagnostic"
            data-testid="auto-reach-cta"
            style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#060d19", background: gold, padding: "1rem 2.75rem", textDecoration: "none", display: "inline-block", transition: "background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#dfa84e"; }}
            onMouseLeave={e => { e.currentTarget.style.background = gold; }}
          >
            Run the REACH Diagnostic →
          </Link>
          <p style={{ fontFamily: MONO, fontSize: "0.524rem", letterSpacing: "0.12em", color: "rgba(245,245,245,0.18)", marginTop: "1.25rem" }}>4 MINUTES · FREE · NO ACCOUNT REQUIRED</p>
        </section>

        {/* ── Link to 16 Deadly Sins ── */}
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <Link to="/standards/16-deadly-sins" data-testid="auto-sins-link" style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(216,90,48,0.45)", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={e => { e.currentTarget.style.color = coral; }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(216,90,48,0.45)"; }}>The 16 Deadly Sins →</Link>
          <Link to="/doctrine" data-testid="auto-doctrine-link" style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,147,63,0.40)", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={e => { e.currentTarget.style.color = gold; }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(200,147,63,0.40)"; }}>Full Doctrine Map →</Link>
          <Link to="/founder" data-testid="auto-founder-link" style={{ fontFamily: MONO, fontSize: "0.524rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,147,63,0.40)", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={e => { e.currentTarget.style.color = gold; }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(200,147,63,0.40)"; }}>About the Founder →</Link>
        </div>

      </main>

      <FooterSection />

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 700px) {
          .auto-path-body { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
        }
      `}} />
    </div>
  );
}
