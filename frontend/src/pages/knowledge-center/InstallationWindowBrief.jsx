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
const CURRENT = 1;

export default function InstallationWindowBrief() {

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
            The 90-Day Compliance Build
          </p>
          <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "1.25rem" }}>
            The 90-Day Compliance Build Sequence
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 580 }}>
            New motor carriers have a narrow window to build working compliance systems before FMCSA scrutiny intensifies. The 90-day compliance build sequence defines what gets built, in what order, and why the sequence matters.
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
            What New Carriers Must Build in the First 30 Days
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            The first 30 days of authority are when your compliance structure must take shape. These are not optional systems to build "when things slow down" — they are the foundation of your audit record. Build these before your dispatch volume grows:
          </p>

          <ArrowList items={[
            "Driver Qualification Files (complete for every driver)",
            "Pre-employment drug testing with filed results",
            "Clearinghouse queries (pre-employment, documented)",
            "Vehicle maintenance files (one per unit)",
            "DVIR process (daily, signed, filed)",
            "Hours-of-service records (ELD or paper log, compliant)",
            "Insurance certificate copies (on file, matching authority)",
          ]} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            Missing systems at this stage become invisible vulnerabilities. You won't know they're missing until an investigator asks for them.
          </p>

          <CfrRef items={[
            "49 CFR 391.51 — Driver Qualification Files",
            "49 CFR 382.301 — Pre-Employment Testing",
            "49 CFR 396.3 — Vehicle Maintenance",
            "49 CFR 395.8 — Hours of Service Records",
          ]} />
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 2 — Operator Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Operator Voice — What this means for your operation" color="rgba(13,27,48,0.45)" />
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: navy, marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            Where New Carriers Create Compliance Gaps Early On
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            The installation window is where most carriers create the gaps that fail them later.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            You hire a driver and start dispatching before the DQ file is complete. You skip the Clearinghouse query because you're in a hurry. You don't set up unit files because you only have one truck.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            None of these feel like emergencies in the moment. But when the audit notice arrives in Month 9, the investigator will pull records from Month 1. What you did — or didn't do — in the installation window is what they'll see.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            The first 30 days are not a grace period. They're the foundation pour. What you build here is what holds — or doesn't.
          </p>
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 3 — Wisdom Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Wisdom Voice — The principle behind the requirement" color="rgba(13,27,48,0.45)" />
          <WisdomQuote>"Structure built under pressure rarely holds. Structure built before pressure arrives is what survives."</WisdomQuote>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            The installation window exists because compliance systems need time to become operational habits. A DQ file isn't just a folder — it's a process. A maintenance file isn't just paper — it's a rhythm.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            Carriers who treat the first 30 days as "figuring it out" are building on sand. Carriers who treat it as installation are building on rock.
          </p>
        </section>

        {/* CTA — LP-BRF-08: ACQUIRE→ENROLL */}
        <div style={{ background: "#00213F", borderTop: "3px solid #d4900a", padding: "3rem 2.5rem", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1rem" }}>90-DAY BUILD — NEXT STEP</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 560 }}>
            The Document System Bundle gives you the full architecture in one installation.
          </p>
          <Link to="/compliance-library" data-testid="brief-cta-primary" style={{ display: "inline-block", background: gold, color: "#0b1628", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", padding: "1rem 2rem", textDecoration: "none", marginBottom: "0.875rem" }}>
            Get the Document System Bundle →
          </Link>
          <br />
          <Link to="/standard" data-testid="brief-cta-secondary" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: "rgba(212,144,10,0.75)", textDecoration: "none" }}>
            See the full LaunchPath Standard →
          </Link>
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/knowledge-center/first-dispatch-requirements" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "0.04em" }}>
            ← First Dispatch Requirements
          </Link>
          <Link to="/knowledge-center/operating-patterns-compliance-risks" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "0.04em" }}>
            Next: Operating Patterns That Create Compliance Exposure →
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
