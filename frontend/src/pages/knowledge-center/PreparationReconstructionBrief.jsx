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
const CURRENT = 3;

export default function PreparationReconstructionBrief() {

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
            FMCSA Audit Preparation
          </p>
          <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "1.25rem" }}>
            FMCSA Audit Preparation<br />and Record Reconstruction
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 580 }}>
            There are two ways to experience an FMCSA New Entrant Safety Audit — with records already built, or scrambling to reconstruct them under scrutiny. This page explains what genuine audit preparation looks like and what happens when carriers have to rebuild records after the notice arrives.
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
            What Documents FMCSA Needs at the Audit
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            FMCSA can schedule a New Entrant Safety Audit as early as 90 days into operations. By the time that notice arrives, investigators expect to see documentation covering the full period since authority activation — not just the recent weeks. These are the records they will request:
          </p>

          <ArrowList items={[
            "60+ days of HOS records showing compliance patterns",
            "Driver Qualification Files complete and current",
            "Drug & Alcohol program documentation (policy, enrollment, tests)",
            "Vehicle maintenance records showing systematic care",
            "Insurance filings current and matching authority",
            "Clearinghouse queries documented for all drivers",
          ]} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            If these systems exist and are documented, the audit is verification. If they don't exist, the audit becomes reconstruction — and reconstruction under scrutiny is a different problem entirely.
          </p>

          <CfrRef items={[
            "49 CFR 385.305–385.327 — New Entrant Safety Audit requirements",
            "49 CFR 385.321 — Automatic failure criteria",
          ]} />
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 2 — Operator Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Operator Voice — What this means for your operation" color="rgba(13,27,48,0.45)" />
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: navy, marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            Two Ways to Experience a New Entrant Safety Audit
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 700, color: navy, lineHeight: 1.85, marginBottom: "0.5rem" }}>Preparation:</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            The investigator asks for files. You hand them over. They review, ask clarifying questions, and document findings. You may have minor gaps. You address them. Audit complete.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 700, color: navy, lineHeight: 1.85, marginBottom: "0.5rem" }}>Reconstruction:</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            The investigator asks for files. You don't have them — or they're incomplete. You scramble to create documentation after the fact. The investigator notes the gaps. You receive a conditional rating or worse.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            The difference between these two experiences is not luck. It's what you built in the first 60 days. By Day 60, your operation should be able to produce audit-ready documentation within 24 hours of a request. If it can't, you're not prepared — you're exposed.
          </p>
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 3 — Wisdom Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Wisdom Voice — The principle behind the requirement" color="rgba(13,27,48,0.45)" />
          <WisdomQuote>"An audit doesn't reveal what you know. It reveals what you can prove."</WisdomQuote>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Investigators don't care what you intended to do. They care what you can document. They don't care what you know about compliance. They care what your files show.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            Preparation is building the documentation before the audit. Reconstruction is building it after the notice arrives. One demonstrates control. The other demonstrates scramble. FMCSA can tell the difference. So can insurers.
          </p>
        </section>

        {/* CTA — LP-BRF-10: ENROLL → /reach-diagnostic (Ground 0 entry) */}
        <div style={{ background: "#00213F", borderTop: "3px solid #d4900a", padding: "3rem 2.5rem", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1rem" }}>AUDIT PREPARATION — NEXT STEP</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 560 }}>
            The LaunchPath Standard installs the preparation. Ground 0 is the first step — and it's free.
          </p>
          <Link to="/reach-diagnostic" data-testid="brief-cta-primary" style={{ display: "inline-block", background: gold, color: "#0b1628", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", padding: "1rem 2rem", textDecoration: "none" }}>
            Start Ground 0 →
          </Link>
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/knowledge-center/operating-patterns-compliance-risks" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", letterSpacing: "0.04em" }}>
            ← Operating Patterns
          </Link>
          <Link to="/knowledge-center/fmcsa-new-entrant-review" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", letterSpacing: "0.04em" }}>
            Next: FMCSA New Entrant Review →
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
