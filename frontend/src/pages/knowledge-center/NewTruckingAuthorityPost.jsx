import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import { PrimaryCtaBlock, SecondaryCtaBlock, RegulatoryDisclaimer } from "../../components/KCClusterCtaBlocks";

const gold = "#d4900a";
const mono = "'Inter', sans-serif";
const serif = "'Newsreader', 'Playfair Display', serif";

const s = {
  h2: { fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", color: "#0b1628", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1.1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(212,144,10,0.15)", marginTop: "2.75rem" },
  p: { fontFamily: mono, fontSize: "1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.85, marginBottom: "1rem" },
  link: { color: gold, fontWeight: 600, textDecoration: "underline" },
  li: { fontFamily: mono, fontSize: "0.95rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.75, marginBottom: "0.6rem", paddingLeft: "0.25rem" },
  cfr: { fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.2rem" },
};

const CHECKLIST = [
  "Verify MC number is active in FMCSA's system (BEFORE DISPATCH)",
  "Confirm insurance is filed and showing active in SAFER system — BMC-91 on file (BEFORE DISPATCH)",
  "Enroll in drug and alcohol testing consortium (BEFORE DISPATCH)",
  "Complete pre-employment drug test for every driver — result on file (BEFORE DISPATCH)",
  "Build complete Driver Qualification File for every driver (BEFORE DISPATCH)",
  "Verify ELD is on FMCSA's approved device list and installed (BEFORE DISPATCH)",
  "Register for UCR at ucr.gov (BEFORE DISPATCH)",
  "Initiate IFTA registration with your base state (WITHIN 30 DAYS)",
  "Initiate IRP registration with your base state (WITHIN 30 DAYS)",
  "Verify contact information in FMCSA's system is current (WITHIN 30 DAYS)",
  "Establish vehicle maintenance recordkeeping system (WITHIN 30 DAYS)",
  "Document your accident register procedure (WITHIN 30 DAYS)",
];

const FAQ = [
  { q: "How long does it take for my MC number to become active?", a: "FMCSA typically processes new MC number applications within 20 to 25 business days. Active does not mean you can operate — it means the authority has been granted and the pre-operation compliance sequence can begin." },
  { q: "Do I need insurance before or after I get my MC number?", a: "You need insurance filed and active in FMCSA's system before you operate. Work with your insurer on timing — the BMC-91 filing should be in place as soon as your authority is granted." },
  { q: "What is UCR and do I have to register every year?", a: "Unified Carrier Registration is an annual fee-based registration program for interstate carriers. Yes, it renews every year. Operating without current UCR registration exposes you to per-vehicle fines." },
  { q: "Can I drive my own truck before my DQ file is complete?", a: "If you are the driver and you are operating a CMV subject to 49 CFR Part 391, your own DQ file must be complete before you operate. Owner-operators are subject to the same DQ file requirements as employed drivers." },
  { q: "What is a consortium and do I need one?", a: "A consortium is a third-party administrator that manages DOT drug and alcohol testing for multiple carriers. If you have CDL drivers, you need a drug and alcohol program — and for most small carriers, a consortium is the most practical way to establish one." },
];

export default function NewTruckingAuthorityPost() {
  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "var(--bg-2)", borderBottom: `3px solid ${gold}`, padding: "5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>← Knowledge Center</Link>
            <span style={{ color: "rgba(13,27,48,0.2)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.4)" }}>Authority Activation</span>
          </div>
          <p style={{ ...s.cfr, marginBottom: "1rem" }}>Authority Activation · Pre-Operation Compliance</p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "var(--text-2xl)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            You Have Your MC Number. Here Is What Happens Next.
          </h1>
          <p style={{ fontFamily: mono, fontSize: "1.05rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            Your MC number is active. That means FMCSA has granted you operating authority — not permission to move a load. Before your first dispatch, federal law requires insurance to be filed and showing active in FMCSA's system, a drug and alcohol testing program to be in place, and a complete Driver Qualification File for every driver you intend to operate.
          </p>
          <p style={{ fontFamily: mono, fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8 }}>
            Most new carriers receive their MC number and assume they can start hauling freight. They cannot. Here is the compliance sequence you must complete before your first load moves.
          </p>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[["CFR Reference", "49 CFR Parts 387, 391, 382"], ["Reading Time", "~9 min"], ["Cluster", "LP-WEB-001 Page 2"]].map(([l, v]) => (
              <div key={l}><p style={s.cfr}>{l}</p><p style={{ fontFamily: mono, fontSize: "0.857rem", color: "rgba(13,27,48,0.7)" }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>

        <h2 style={s.h2}>What Your MC Number Activates — and What It Doesn't</h2>
        <p style={s.p}>Your MC number confirms FMCSA has approved your application for operating authority. That is what it activates. It does not file your insurance. It does not establish your drug and alcohol program. It does not create your driver files. It does not register you for UCR, IFTA, or IRP.</p>
        <p style={s.p}>Each of those items is a separate requirement with its own process, its own deadline, and its own consequence if skipped. The MC number is the starting line, not the finish line.</p>
        <p style={s.p}>Carriers who move freight before these requirements are in place are operating in violation of federal law — regardless of how clean their driving record is or how careful they are behind the wheel. See also: <Link to="/knowledge-center/how-to-start-a-trucking-company" style={s.link}>How to Start a Trucking Company</Link>.</p>

        <h2 style={s.h2}>Insurance Filing — Required Before You Can Operate</h2>
        <p style={s.p}>Your insurer must file proof of liability insurance with FMCSA using Form BMC-91 before you operate a single load. The filing must appear as active in FMCSA's system.</p>
        <p style={s.p}>49 CFR Part 387 establishes minimum liability limits by cargo type:</p>
        <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
          {["General freight: $750,000", "Household goods: $300,000", "Oil: $1,000,000", "Hazardous materials (certain categories): $5,000,000"].map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ul>
        <p style={s.p}>How to verify your insurance is filed: go to FMCSA's SAFER system at safer.fmcsa.dot.gov, search your DOT number, and confirm your insurance shows as active. Do not dispatch until it does.</p>
        <p style={s.p}>If your insurance lapses — even for one day — FMCSA can revoke your operating authority.</p>

        <h2 style={s.h2}>UCR Registration</h2>
        <p style={s.p}>Unified Carrier Registration is an annual requirement for all interstate motor carriers. Register through ucr.gov. Fees are based on fleet size. Operating without UCR registration exposes you to fines calculated per vehicle per day of operation.</p>

        <h2 style={s.h2}>IFTA and IRP — Fuel Tax and Apportioned Plates</h2>
        <p style={s.p}>If you operate across state lines in a vehicle over 26,000 pounds gross vehicle weight — or a vehicle with three or more axles — you are subject to IFTA and likely IRP. Both are registered through your base state. IFTA requires quarterly filing. IRP governs your apportioned plate registration.</p>

        <h2 style={s.h2}>Driver Qualification Files — Before Your First Driver Operates</h2>
        <p style={s.p}>A complete Driver Qualification File must be in place for every CDL driver before they operate. That file includes a signed employment application, motor vehicle records, a medical examiner's certificate, and a negative pre-employment drug test result, among other required documents.</p>
        <p style={s.p}>The full requirements are covered in detail on the <Link to="/knowledge-center/driver-qualification-file-requirements-fmcsa" style={s.link}>Driver Qualification File Requirements</Link> page.</p>

        <h2 style={s.h2}>Drug and Alcohol Program — Required Before Dispatch</h2>
        <p style={s.p}>49 CFR Part 382 requires every motor carrier employing CDL drivers in safety-sensitive functions to have a drug and alcohol testing program in place before the first driver operates. Most small carriers establish this program through a consortium. The pre-employment drug test result must be on file before dispatch.</p>
        <p style={s.p}>The full setup process is covered on the <Link to="/knowledge-center/dot-drug-alcohol-program-requirements" style={s.link}>DOT Drug and Alcohol Program Requirements</Link> page.</p>

        <h2 style={s.h2}>ELD Requirements</h2>
        <p style={s.p}>49 CFR Parts 395.8 and 395.15 require most interstate motor carriers to use an Electronic Logging Device to record hours of service. Your ELD must be registered on FMCSA's approved device list. An out-of-service order at roadside is the consequence of operating without one when one is required.</p>

        <h2 style={s.h2}>Your 30-Day Activation Checklist</h2>
        <p style={s.p}>Complete these items in sequence. Items marked BEFORE DISPATCH must be done before your first load moves. Items marked WITHIN 30 DAYS have a registration window but should be completed as early as possible.</p>
        <ol style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          {CHECKLIST.map((item, i) => <li key={i} style={s.li}>{item}</li>)}
        </ol>
        <p style={s.p}>The <Link to="/standards/starter-stack" style={s.link}>LaunchPath Starter Stack</Link> includes the activation checklist in fillable format alongside the core compliance documents every new carrier needs in their first 30 days.</p>

        <h2 style={s.h2}>What Happens If You Move a Load Before You're Compliant</h2>
        <p style={s.p}>Operating without insurance filed: if an accident occurs before your BMC-91 is active in FMCSA's system, your insurer may dispute coverage. You are personally liable. FMCSA can revoke your authority.</p>
        <p style={s.p}>Operating without a drug and alcohol program: your driver is operating in violation of 49 CFR Part 382. At a new entrant audit, this is not treated as an administrative gap — it is treated as a driver who should not have been dispatched.</p>
        <p style={s.p}>Operating without UCR registration: fines are assessed per vehicle. The exposure is real from day one of operation.</p>
        <p style={s.p}>The <Link to="/standards/16-deadly-sins" style={s.link}>16 Deadly Sins Pocket Guide</Link> covers the authority and insurance failures that shut down new carriers before their first full year of operation.</p>
        <p style={s.p}>See also: <Link to="/knowledge-center/new-entrant-safety-audit-checklist" style={s.link}>new entrant audit</Link>.</p>

        {/* FAQ */}
        <h2 style={s.h2}>Frequently Asked Questions</h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "0.95rem", color: "#0b1628", lineHeight: 1.5, marginBottom: "0.5rem" }}>{item.q}</p>
            <p style={{ ...s.p, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}

        <p style={{ ...s.p, marginTop: "3rem", fontStyle: "italic", color: "rgba(0,26,51,0.55)" }}>
          Operating authority activation is covered in depth in Module 1 of the LaunchPath Standard — the module that installs your complete FMCSA registration and authority compliance system.
        </p>

        <PrimaryCtaBlock />
        <SecondaryCtaBlock />
        <RegulatoryDisclaimer />
      </div>

      <FooterSection />
    </div>
  );
}
