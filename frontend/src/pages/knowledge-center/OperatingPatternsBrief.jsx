import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";

const gold = "#d4900a";
const ivory = "#F6F3EE";
const navy = "#0D1B30";

function VoiceLabel({ voice, color }) {
  return (
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: "0.75rem" }}>
      {voice}
    </p>
  );
}

function ArrowList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: navy, marginTop: "0.28rem", flexShrink: 0, fontWeight: 700 }}>→</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.75 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function CfrRef({ items }) {
  return (
    <div style={{ borderLeft: "2px solid rgba(13,27,48,0.15)", paddingLeft: "1.25rem", marginTop: "1.5rem" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.45)", marginBottom: "0.5rem" }}>CFR References</p>
      {items.map((ref, i) => (
        <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(13,27,48,0.55)", lineHeight: 1.6, marginBottom: "0.25rem" }}>{ref}</p>
      ))}
    </div>
  );
}

function WisdomQuote({ children }) {
  return (
    <blockquote style={{ borderLeft: "3px solid " + gold, paddingLeft: "1.5rem", margin: "0 0 1.5rem", fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: navy, lineHeight: 1.5, fontStyle: "italic" }}>
      {children}
    </blockquote>
  );
}

const BRIEF_NAV = [
  { code: "First Dispatch", href: "/knowledge-center/first-dispatch-requirements" },
  { code: "90-Day Build", href: "/knowledge-center/new-carrier-90-day-build" },
  { code: "Operating Patterns", href: "/knowledge-center/operating-patterns-compliance-risks" },
  { code: "Audit Prep", href: "/knowledge-center/fmcsa-audit-preparation-records" },
  { code: "New Entrant Review", href: "/knowledge-center/fmcsa-new-entrant-review" },
];

const CURRENT = 2;

export default function OperatingPatternsBrief() {

  return (
    <div style={{ background: ivory, minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: navy, padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem", letterSpacing: "0.04em" }}>
            ← Operational Library
          </Link>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            Operating Patterns & Compliance Risk
          </p>
          <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "1.25rem" }}>
            Operating Patterns That Create Compliance Exposure
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 580 }}>
            The way a carrier operates creates a record. FMCSA investigators read that record for patterns — not just individual documents. This page identifies the operating habits that create compliance exposure and explains how to reduce that risk before an audit notice arrives.
          </p>
        </div>
      </section>

      {/* ── BRIEF NAV ── */}
      <div style={{ background: "#0b1628", borderBottom: "1px solid rgba(255,255,255,0.08)", overflowX: "auto" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "stretch" }}>
          {BRIEF_NAV.map((b, i) => (
            <Link key={b.code} to={b.href} style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", fontWeight: i === CURRENT ? 700 : 400,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: i === CURRENT ? gold : "rgba(255,255,255,0.38)",
              textDecoration: "none", padding: "0.875rem 1.25rem", whiteSpace: "nowrap",
              borderBottom: i === CURRENT ? "2px solid " + gold : "2px solid transparent",
              transition: "color 0.15s",
            }}>
              {b.code}
            </Link>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "4rem 1.5rem 5rem" }}>

        {/* Section 1 — System Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="System Voice — What the regulation requires" color={gold} />
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: navy, marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            Which Operating Habits Create Compliance Risk
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Most compliance exposure doesn't come from a single decision. It comes from operating habits that build a problematic record over time. These patterns, once established, become visible when investigators pull your documentation:
          </p>

          <ArrowList items={[
            "Dispatch frequency and load acceptance rhythm",
            "HOS compliance patterns (consistent vs. frequent violations)",
            "DVIR completion consistency (daily vs. sporadic)",
            "Maintenance intervals (scheduled vs. reactive)",
            "Driver file update habits (current vs. lapsed)",
            "Insurance monitoring (proactive vs. reactive)",
          ]} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            FMCSA investigators don't just check if files exist. They check if the files show consistent operational discipline over time. Patterns matter more than perfection.
          </p>

          <CfrRef items={[
            "49 CFR 395 — Hours of Service (pattern analysis)",
            "49 CFR 396.11 — DVIR (daily requirement)",
            "49 CFR 396.3 — Maintenance (systematic inspection)",
          ]} />
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 2 — Operator Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Operator Voice — What this means for your operation" color="rgba(13,27,48,0.45)" />
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: navy, marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            How Investigators Read Patterns in Your Records
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            By Day 30, you're not building anymore — you're operating. And the way you operate creates a paper trail.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            If your ELD shows a pattern of 30-minute breaks right at the limit, that's a pattern. If your DVIRs are signed in batches at the end of the week, that's a pattern. If your maintenance records show repairs only after breakdowns, that's a pattern.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Investigators read patterns. They're trained to see operational habits in documentation — not just individual documents.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            The question isn't "do you have the files?" The question is "do your files show you're running a controlled operation?"
          </p>
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 3 — Wisdom Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Wisdom Voice — The principle behind the requirement" color="rgba(13,27,48,0.45)" />
          <WisdomQuote>"Compliance is not an event. It's a rhythm."</WisdomQuote>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            The carriers who pass audits are not the ones with perfect paperwork. They're the ones whose paperwork shows consistent, reasonable operational discipline.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            FMCSA knows no one is perfect. What they're looking for is evidence that you're trying — that your operation has structure, that your habits are documented, that your systems are real. Patterns tell the truth. Build patterns that tell a good story.
          </p>
        </section>

        {/* CTA — LP-BRF-09: QUALIFY → /reach-diagnostic */}
        <div style={{ background: "#00213F", borderTop: "3px solid #d4900a", padding: "3rem 2.5rem", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1rem" }}>OPERATING PATTERNS — NEXT STEP</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 560 }}>
            Your operating patterns are already creating an evidence record. Find out what that record shows.
          </p>
          <Link to="/reach-diagnostic" data-testid="brief-cta-primary" style={{ display: "inline-block", background: gold, color: "#0b1628", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", padding: "1rem 2rem", textDecoration: "none" }}>
            Run the Compliance Gap Assessment →
          </Link>
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/knowledge-center/new-carrier-90-day-build" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", letterSpacing: "0.04em" }}>
            ← 90-Day Compliance Build
          </Link>
          <Link to="/knowledge-center/fmcsa-audit-preparation-records" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", letterSpacing: "0.04em" }}>
            Next: FMCSA Audit Preparation →
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
