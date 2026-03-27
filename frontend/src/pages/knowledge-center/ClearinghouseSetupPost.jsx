import { Link } from '../../compat/Link';
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const navy = "#0D1B30";
const gold = "#d4900a";
const mono = "'Inter', sans-serif";

const SECTIONS = [
  {
    heading: "What the Clearinghouse Is",
    body: `The FMCSA Drug and Alcohol Clearinghouse is a secure federal database that contains records of drug and alcohol program violations by CDL holders. It was created to close a gap in the previous system, where a driver with a violation at one carrier could move to another carrier without that violation being disclosed.

Under the Clearinghouse system, violations are reported by employers, medical review officers (MROs), substance abuse professionals (SAPs), and consortia/third-party administrators (C/TPAs). Once a violation is recorded, it is visible to any employer who runs a query on that driver.

The Clearinghouse applies to CDL holders operating commercial motor vehicles as defined under 49 CFR Part 383. For carriers operating vehicles that require a CDL — Class A or Class B — Clearinghouse compliance is mandatory. Box truck operators whose drivers do not hold or require a CDL should verify applicability based on their specific vehicle class and cargo type.`,
  },
  {
    heading: "Who Must Register",
    body: `Motor carriers — any carrier who employs CDL drivers must register as an employer in the Clearinghouse. This includes owner-operators who are both the employer and the driver — you must register under both roles.

Drivers — CDL drivers must create a Clearinghouse account to consent to full queries and to view their own records.

C/TPAs — if you use a consortium or third-party administrator for your drug and alcohol testing program, they must also be registered in the Clearinghouse and designated as your service agent.

MROs — medical review officers who report violations are required to report directly into the Clearinghouse.`,
  },
  {
    heading: "Registering as an Employer — Step by Step",
    body: `Go to clearinghouse.fmcsa.dot.gov and select "Register." You will need your USDOT number, an email address that becomes your login, and your company's legal name as registered with FMCSA.

Once your account is created, you will verify your identity through Login.gov — FMCSA's identity verification system. This requires a government-issued ID and may include a video verification step.

After identity verification, return to the Clearinghouse and complete your employer profile. Designate your C/TPA if you are using one. Your C/TPA can then manage queries and reporting on your behalf, but you remain responsible for compliance.

Allow 1 to 3 business days for your account to be fully active. Do not dispatch CDL drivers before your registration is confirmed and your pre-employment queries are complete.`,
  },
  {
    heading: "The Pre-Employment Query Requirement",
    body: `Before allowing a CDL driver to operate a commercial motor vehicle, 49 CFR Part 382.701 requires that you conduct a pre-employment query in the Clearinghouse. This is not optional and there is no timing flexibility — the query must be completed before the first dispatch.

There are two types of queries. A full query provides complete violation history and requires written consent from the driver — this is what is required for pre-employment. A limited query confirms whether a record exists but does not provide violation details, and is used for annual queries on current employees.

To run a full pre-employment query: log into the Clearinghouse employer account, select "Run Query" and enter the driver's CDL number and state. The system will send a consent request to the driver's Clearinghouse account. The driver must log in and consent before you can view results. Once consent is granted, the results are returned to your account. Download and retain the query result — this is a required record.

If the query returns a violation, the driver is prohibited from operating until they have completed the return-to-duty process with a qualified SAP and passed a return-to-duty test. A carrier who dispatches a driver with an unresolved Clearinghouse violation is in violation of Part 382 and bears the enforcement consequences.

If the driver does not have a Clearinghouse account, they must create one before they can consent to your query. Build this into your hiring timeline — it is not a same-day process.`,
  },
  {
    heading: "Annual Query Requirements",
    body: `For each CDL driver currently employed, 49 CFR Part 382.701 requires that you conduct at least one query per calendar year. The annual query can be a limited query — which does not require driver consent but only confirms whether a record exists — or a full query, which requires consent and provides full violation details.

Most carriers run limited queries annually and full queries when a full record is needed, such as when a driver changes roles or when prompted by other circumstances.

Document your annual queries. The date of the query, the driver queried, and the result are all required records. FMCSA investigators review Clearinghouse query records during the New Entrant Safety Audit.`,
  },
  {
    heading: "Reporting Requirements",
    body: `In addition to querying, employers are required to report certain information to the Clearinghouse. This includes actual knowledge of a drug or alcohol violation as defined under 49 CFR Part 382.107, a driver's refusal to submit to a required test, negative return-to-duty test results, and completion of follow-up testing.

If you use a C/TPA, they will typically handle reporting for test results. You remain responsible for reporting actual knowledge violations — situations where you, as the employer, have direct knowledge of a violation regardless of testing.`,
  },
  {
    heading: "The Enforcement Consequence",
    body: `A carrier who dispatches a CDL driver without completing the pre-employment Clearinghouse query is in violation of 49 CFR Part 382.701. This violation is detectable during a roadside inspection and during the New Entrant Safety Audit when the investigator requests query records.

Beyond the regulatory violation, a carrier who has a claim involving a driver whose pre-employment query was skipped faces a coverage dispute with their insurer. The carrier's failure to follow the regulatory requirement is a material factor in how the claim is evaluated.

This is the exposure pattern that LaunchPath's curriculum refers to as the Ghost Driver — a driver dispatched without the required Clearinghouse query who has a disqualifying violation that the carrier never discovered because the query was never run.`,
  },
  {
    heading: "What to Retain",
    body: `Maintain the following Clearinghouse records: pre-employment query results for every driver hired (retain for 3 years from date of query per 49 CFR Part 382.705), annual query records for all active drivers, consent records for full queries, and documentation of your C/TPA designation in your Clearinghouse account.

These records are requested during New Entrant Safety Audits. Organize them in your Driver Qualification File alongside other Part 391 documentation. A query result that cannot be produced on audit day is treated the same as a query that was never run.`,
  },
];

export default function ClearinghouseSetupPost() {
  useSEO({
    title: "How to Register in the FMCSA Drug and Alcohol Clearinghouse: A Step-by-Step Guide for New Carriers | LaunchPath",
    description: "Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key.",
  });

  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Article Hero */}
      <div style={{
        background: "var(--bg-2)",
        borderBottom: `3px solid ${gold}`,
        padding: "5rem 1.5rem 4rem",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link to="/knowledge-center" style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", textDecoration: "none" }}>
              ← Operational Library
            </Link>
            <span style={{ color: "rgba(13,27,48,0.20)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(13,27,48,0.40)" }}>Drug & Alcohol Program</span>
          </div>

          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
            LP-BRF-POST-04 · DRUG & ALCOHOL PROGRAM · COMPLIANCE BACKBONE
          </p>

          <h1 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
            fontSize: "var(--text-2xl)", letterSpacing: "-0.02em",
            color: "var(--text)", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            How to Register in the FMCSA Drug and Alcohol Clearinghouse: A Step-by-Step Guide for New Carriers
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(0,26,51,0.82)", lineHeight: 1.8, borderLeft: `3px solid ${gold}`, paddingLeft: "1.25rem" }}>
            The FMCSA Drug and Alcohol Clearinghouse became mandatory on January 6, 2020. For new motor carriers, registration and proper use is a regulatory requirement under 49 CFR Part 382 — not an optional best practice. Failure to register, failure to query before a driver's first dispatch, or failure to run annual queries on active drivers are all violations discoverable during a New Entrant Safety Audit.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(13,27,48,0.65)", lineHeight: 1.8, marginTop: "1rem" }}>
            This article walks through the registration process, the query requirements, and the specific steps new carriers must complete before a driver turns a key.
          </p>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(13,27,48,0.08)", flexWrap: "wrap" }}>
            {[
              ["Primary Keyword", "FMCSA Clearinghouse new carrier setup"],
              ["CFR References", "49 CFR Part 382 · 49 CFR Part 383"],
              ["Reading Time", "~10 min"],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.2rem" }}>{label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(13,27,48,0.70)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {SECTIONS.map((section, i) => (
          <div key={i} style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
              fontSize: "var(--text-xl)", color: "#0b1628",
              letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1.25rem",
              paddingBottom: "0.6rem", borderBottom: "1px solid rgba(212,144,10,0.15)",
            }}>
              {section.heading}
            </h2>
            {section.body.split("\n\n").map((para, j) => (
              <p key={j} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "var(--text-base)",
                color: "rgba(0,26,51,0.82)", lineHeight: 1.85, marginBottom: "1.1rem",
              }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        {/* Related Resources */}
        <div style={{
          background: "var(--bg-2)", border: `1px solid rgba(212,144,10,0.20)`,
          borderTop: `3px solid ${gold}`, padding: "2rem", marginBottom: "3rem",
        }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem" }}>
            Related Resources
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "LP-BRF-03 — Drug & Alcohol Program Brief", desc: "Full regulatory framework for your Part 382 program — consortium requirements, testing types, and documentation structure.", href: "/knowledge-center/drug-alcohol-program-brief" },
              { label: "LP-BRF-01 — New Entrant Safety Audit Brief", desc: "The six audit categories, including the Drug & Alcohol review — and what investigators request in documentation.", href: "/knowledge-center/new-entrant-safety-audit-brief" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 3, minHeight: 40, background: gold, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <Link to={item.href} style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, textDecoration: "none" }}>{item.label}</Link>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(0,26,51,0.60)", marginTop: "0.2rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ground 0 CTA */}
        <div style={{ textAlign: "center", padding: "3rem 2rem", background: "var(--bg-2)", border: "1px solid rgba(13,27,48,0.07)" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>
            LPOS V1.0 — GROUND 0 ENTRY
          </p>
          <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            If you're a new carrier in your first 90 days, Ground 0 is free.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "rgba(13,27,48,0.65)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 460, margin: "0 auto 1.75rem" }}>
            Ground 0 covers the Four Pillars that keep a carrier operating — including the compliance backbone your Clearinghouse program is part of — before your first dispatch.
          </p>
          <Link
            to="/auto-diagnostic"
            data-testid="article-reach-cta"
            style={{
              display: "inline-block", background: gold, color: "#060d19",
              fontFamily: mono, fontWeight: 700, fontSize: "0.714rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "1rem 2.25rem", textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
            onMouseLeave={e => e.currentTarget.style.background = gold}
          >
            RUN THE REACH ASSESSMENT →
          </Link>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "rgba(0,26,51,0.45)", lineHeight: 1.7, marginTop: "2.5rem", fontStyle: "italic" }}>
          LaunchPath Transportation EDU is an educational program. This content does not constitute legal or compliance advice. Verify all regulatory requirements directly with FMCSA at fmcsa.dot.gov and at clearinghouse.fmcsa.dot.gov.
        </p>
        <p style={{ fontFamily: mono, fontSize: "0.762rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(0,26,51,0.35)", marginTop: "0.5rem" }}>
          LaunchPath Transportation EDU · Accuracy Over Hype. Systems Over Shortcuts.
        </p>
      </div>

      <BriefBundleCTA />
      <FooterSection />
    </div>
  );
}
