import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import useSEO from "../../hooks/useSEO";

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
  { code: "LP-BRF-07", href: "/knowledge-center/lp-brf-07" },
  { code: "LP-BRF-08", href: "/knowledge-center/lp-brf-08" },
  { code: "LP-BRF-09", href: "/knowledge-center/lp-brf-09" },
  { code: "LP-BRF-10", href: "/knowledge-center/lp-brf-10" },
  { code: "LP-BRF-11", href: "/knowledge-center/lp-brf-11" },
];
const CURRENT = 4;

export default function NewEntrantReviewBrief() {
  useSEO({
    title: "LP-BRF-11: The New Entrant Review Period and What Triggers Scrutiny | LaunchPath",
    description: "The New Entrant review period extends through Month 18. Passing your audit doesn't mean FMCSA stops watching. Learn what triggers increased scrutiny.",
  });

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
            LP-BRF-11 — Months 9–18 | What Was Built Gets Tested
          </p>
          <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "1.25rem" }}>
            The New Entrant Review Period<br />and What Triggers Scrutiny
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 580 }}>
            Passing your New Entrant audit doesn't mean FMCSA stops watching. The monitoring period extends through Month 18 — and the operational patterns created in the first 90 days become visible under scrutiny.
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
            What Triggers Increased Scrutiny Through Month 18
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            The New Entrant review period extends from authority activation through Month 18. During this window, FMCSA monitors new carriers for compliance patterns, safety events, and audit outcomes. Triggers for increased scrutiny during this period:
          </p>

          <ArrowList items={[
            "Roadside inspection violations (especially OOS orders)",
            "Crashes reported to FMCSA",
            "Complaints filed against the carrier",
            "Failed or conditional New Entrant Safety Audit",
            "Insurance filing lapses",
            "MCS-150 update failures",
            "Clearinghouse violations",
          ]} />

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            Carriers who pass the New Entrant Safety Audit are not finished. They remain under heightened monitoring until Month 18. The operational patterns created in the first 90 days become visible under scrutiny during this period.
          </p>

          <CfrRef items={[
            "49 CFR 385.307 — New Entrant monitoring period",
            "49 CFR 385.308 — Expedited actions during monitoring",
          ]} />
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 2 — Operator Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Operator Voice — What this means for your operation" color="rgba(13,27,48,0.45)" />
          <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: navy, marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            The Audit Is Not the Finish Line
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Passing your New Entrant audit doesn't mean FMCSA stops watching. It means they've verified your baseline. Now they're watching to see if you maintain it.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Between Month 9 and Month 18, every roadside inspection, every crash report, every insurance lapse gets weighted more heavily. You're still in the probationary window.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            The carriers who survive this period are the ones who built systems that hold under operational pressure — not just systems that looked good on audit day.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            If your compliance is a performance, it will fail during this window. If your compliance is a structure, it will hold.
          </p>
        </section>

        <div style={{ height: 1, background: "rgba(13,27,48,0.1)", marginBottom: "4rem" }} />

        {/* Section 3 — Wisdom Voice */}
        <section style={{ marginBottom: "4rem" }}>
          <VoiceLabel voice="Wisdom Voice — The principle behind the requirement" color="rgba(13,27,48,0.45)" />
          <WisdomQuote>"Early discipline determines later defensibility."</WisdomQuote>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            The operational patterns created in the first months of authority become visible under scrutiny during Months 9–18. A clean audit in Month 4 doesn't protect you from a crash in Month 12 if your maintenance records show neglect.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.8)", lineHeight: 1.85 }}>
            FMCSA's monitoring period exists because they know new carriers are fragile. The ones who survive are the ones who built structure that holds — not just through the audit, but through the operational pressure that follows. What you built early is what gets tested late.
          </p>
        </section>

        {/* CTA — LP-BRF-11: QUALIFY → /reach-diagnostic */}
        <div style={{ background: "#00213F", borderTop: "3px solid #d4900a", padding: "3rem 2.5rem", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)", marginBottom: "1rem" }}>LP-BRF-11 — NEXT STEP</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 560 }}>
            Know what triggers scrutiny before the system finds you first.
          </p>
          <Link to="/reach-diagnostic" data-testid="brief-cta-primary" style={{ display: "inline-block", background: gold, color: "#0b1628", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", padding: "1rem 2rem", textDecoration: "none" }}>
            Run the Compliance Gap Assessment →
          </Link>
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to="/knowledge-center/lp-brf-10" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600, color: gold, textDecoration: "none", letterSpacing: "0.04em" }}>
            ← LP-BRF-10
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
