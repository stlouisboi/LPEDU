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
    <div style={{ borderLeft: "2px solid rgba(13,27,48,0.15)", paddingLeft: "1.25rem", marginTop: "1.5rem", marginBottom: "0" }}>
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
  { code: "First Dispatch", label: "First Dispatch", href: "/knowledge-center/first-dispatch-requirements" },
  { code: "90-Day Build", label: "90-Day Build", href: "/knowledge-center/new-carrier-90-day-build" },
  { code: "Operating Patterns", label: "Operating Patterns", href: "/knowledge-center/operating-patterns-compliance-risks" },
  { code: "Audit Prep", label: "Audit Prep", href: "/knowledge-center/fmcsa-audit-preparation-records" },
  { code: "New Entrant Review", label: "New Entrant Review", href: "/knowledge-center/fmcsa-new-entrant-review" },
];
const CURRENT = 0;

export default function Day1AuthorityBrief() {

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
            First Dispatch Requirements
          </p>
          <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "1.25rem" }}>
            What Must Be Operational<br />Before Your First Dispatch
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 580 }}>
            Before your first dispatch, FMCSA requires specific filings, programs, and records to already be in place. The moment your MC number goes active in SAFER, you are considered an operating motor carrier — whether you've moved a single load or not.
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
            What FMCSA Requires Before Your First Dispatch
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Before your first dispatch, the following must be operational and on file. These are not audit checklist items — they are legal requirements that apply the moment authority goes active:
          </p>

          <ArrowList items={[
            "Active operating authority (MC number live in SAFER)",
            "BOC-3 process agent designation on file",
            "BMC-91 or BMC-34 insurance filing accepted",
            "USDOT number with current MCS-150 information",
            "UCR registration for the current year",
            "Drug & Alcohol program enrollment (consortium or in-house)",
            "Written Drug & Alcohol policy",
            "Clearinghouse employer registration",
          ]} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            These are not "nice to have before your first audit." These are legally required before your first dispatch.
          </p>

          <CfrRef items={[
            "49 CFR 365 — Operating Authority",
            "49 CFR 387 — Insurance Requirements",
            "49 CFR 382 — Drug & Alcohol",
            "49 CFR 390.19 — MCS-150",
          ]} />
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 2 — Operator Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Operator Voice — What this means for your operation" color="rgba(13,27,48,0.45)" />
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: navy, marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            Why the First Dispatch Is Already Being Evaluated
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Most new carriers treat Day 1 as the starting line. It's not. It's the moment the clock starts running.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            If you dispatch a driver before your D&A program is enrolled, that's a violation — even if the test comes back clean later.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            If your insurance filing has a name mismatch with your authority, you may already be suspended and not know it.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            If you haven't registered as an employer in the Clearinghouse, you cannot legally run pre-employment queries — which means you cannot legally hire drivers. Day 1 is not when you start building. Day 1 is when everything you've built gets tested.
          </p>
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 3 — Wisdom Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Wisdom Voice — The principle behind the requirement" color="rgba(13,27,48,0.45)" />
          <WisdomQuote>"The compliance clock starts at activation, not at the first load."</WisdomQuote>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            FMCSA doesn't care when you started hauling freight. They care when your authority went active. Every day between activation and your first dispatch is a day your systems should have been operational.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            Carriers who wait until they're busy to build compliance systems are already behind. The ones who survive build before they need to.
          </p>
        </section>

        {/* CTA — LP-BRF-07: QUALIFY → /reach-diagnostic */}
        <div style={{ background: "#00213F", borderTop: "3px solid #d4900a", padding: "3rem 2.5rem", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1rem" }}>FIRST DISPATCH REQUIREMENTS — NEXT STEP</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 560 }}>
            Day 1 requirements don't wait. Find out what you're missing before your first load moves.
          </p>
          <Link to="/reach-diagnostic" data-testid="brief-cta-primary" style={{ display: "inline-block", background: gold, color: "#0b1628", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", padding: "1rem 2rem", textDecoration: "none" }}>
            Run the Compliance Gap Assessment →
          </Link>
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/knowledge-center/new-carrier-90-day-build" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "0.04em" }}>
            Next: The 90-Day Compliance Build Sequence →
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
