import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";
import BriefBundleCTA from "../../components/BriefBundleCTA";
import useSEO from "../../hooks/useSEO";

const LOG_RISK_PATTERNS = [
  {
    category: "Exceeding Core Limits",
    items: [
      "Repeated days where drivers exceed the 11-hour driving limit",
      "Violations of the 14-hour driving window",
      "60/70-hour weekly on-duty limits exceeded",
    ],
  },
  {
    category: "Missing or Incomplete Records",
    items: [
      "No record of duty status for certain days",
      "Logs missing required information such as locations or vehicle identifiers",
      "Gaps in on-duty time with no corresponding explanation",
    ],
  },
  {
    category: "False or Manipulated Logs",
    items: [
      "Edits that remove drive time after the fact",
      "Off-duty status showing while the truck is moving",
      "Logs that do not match GPS, fuel, or toll data",
    ],
  },
  {
    category: "Break and Sleeper Issues",
    items: [
      "No 30-minute break after 8 hours of driving",
      "Improper use of split-sleeper rules",
      "Logs showing impossible turnarounds between shifts",
    ],
  },
  {
    category: "ELD Misuse or Malfunctions",
    items: [
      "Drivers operating without an ELD when required",
      "Ignoring malfunction procedures and not switching to paper logs",
      "Incomplete or missing backup logs during device failures",
    ],
  },
];

const CHECKLIST_STEPS = [
  {
    step: "01",
    action: "Confirm which drivers are subject to Part 395.",
    why: "Ensures every required driver is following HOS rules and using the correct logging method.",
  },
  {
    step: "02",
    action: "Verify every regulated driver is in your ELD system.",
    why: "Prevents 'ghost drivers' moving freight without logs or hiding time on shared or unassigned profiles.",
  },
  {
    step: "03",
    action: "Map and document any HOS exceptions (short-haul, etc.).",
    why: "Shows auditors you qualify for exceptions and actively monitor the conditions.",
  },
  {
    step: "04",
    action: "Review the last 8 weeks of ELD data for core violations.",
    why: "Identifies 11/14/60-70 and break issues before FMCSA or insurers do.",
  },
  {
    step: "05",
    action: "Run a support-document cross-check (logs vs fuel, tolls, dispatch, bills).",
    why: "Catches falsification and mismatches that damage your credibility in audits and claims.",
  },
  {
    step: "06",
    action: "Validate your HOS policy and training are current and documented.",
    why: "Proves drivers were trained and that your written rules match current regulations.",
  },
  {
    step: "07",
    action: "Test your ELD malfunction plan with drivers.",
    why: "Shows you can handle device failures without gaps in required records.",
  },
  {
    step: "08",
    action: "Organize an \"HOS Audit\" folder or binder with sample logs, reports, policy, training records, and ELD manuals.",
    why: "Lets you respond quickly and confidently when an auditor requests HOS documentation.",
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "Driver Roster & HOS Status",
    items: [
      "List of all drivers subject to federal HOS (Part 395)",
      "Documented exception status for each driver (short-haul, agricultural, etc.)",
      "Conditions monitored to confirm exception eligibility",
      "Date of last HOS/ELD training and signature acknowledgement per driver",
    ],
  },
  {
    num: "02",
    title: "ELD Records & System Setup",
    items: [
      "Confirmation that all regulated drivers are active in the ELD system",
      "ELD device registration and FMCSA certification documentation",
      "Unassigned drive time review and disposition records",
      "Log edit history and driver edit annotations (last 6 months)",
    ],
  },
  {
    num: "03",
    title: "Violation Reports & Coaching",
    items: [
      "8-week violation summary report by driver",
      "Coaching or discipline records for drivers with repeat violations",
      "Falsification findings and corrective action documentation",
      "Trend notes showing improvement or escalation over time",
    ],
  },
  {
    num: "04",
    title: "Supporting Document Samples",
    items: [
      "Fuel receipts cross-referenced to ELD log locations and times (sample trips)",
      "Toll records and GPS/telematics export for sampled drivers",
      "Bills of lading / dispatch records for sampled loads",
      "Notes on any mismatches found and how they were resolved",
    ],
  },
  {
    num: "05",
    title: "HOS Policy & Driver Training",
    items: [
      "Written HOS and ELD policy — current version, dated",
      "Covers: personal conveyance, yard moves, log edits, malfunction procedure, short-haul exception",
      "Driver training acknowledgements (signature + date per driver)",
      "Policy revision history — at least one review per year",
    ],
  },
  {
    num: "06",
    title: "ELD Malfunction & Paper Log Protocol",
    items: [
      "ELD malfunction reporting procedure (written)",
      "Paper log supply confirmed in each vehicle",
      "Documented malfunction incidents with repair and return-to-ELD dates",
      "8-day paper log supply available per driver requirement",
    ],
  },
];

function SectionHeader({ overline, title, id }) {
  return (
    <div style={{ marginBottom: "2rem" }} id={id}>
      {overline && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          marginBottom: "0.75rem",
        }}>{overline}</p>
      )}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
        letterSpacing: "-0.015em",
        color: "var(--text)",
        lineHeight: 1.25,
      }}>{title}</h2>
    </div>
  );
}

function Body({ children, style = {} }) {
  return (
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "1.12rem",
      color: "var(--text-muted)",
      lineHeight: 1.85,
      marginBottom: "1.25rem",
      ...style,
    }}>{children}</p>
  );
}

function Callout({ label, children }) {
  return (
    <div style={{
      borderLeft: "2px solid var(--orange)",
      paddingLeft: "1.25rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      paddingRight: "1.25rem",
      background: "var(--bg-2)",
      marginBottom: "1.5rem",
    }}>
      {label && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--orange)",
          marginBottom: "0.6rem",
        }}>{label}</p>
      )}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "1rem",
        color: "var(--text-muted)",
        lineHeight: 1.8,
      }}>{children}</div>
    </div>
  );
}

export default function HOSComplianceBrief() {
  useSEO({
    title: "Hours of Service Compliance Brief | LaunchPath Operational Library",
    description: "Hours of service requirements for new motor carriers under 49 CFR Part 395. ELD applicability, exemptions, short-haul rules, and the recordkeeping discipline that prevents violations.",
  });
  const handlePrint = () => window.print();

  return (
    <div className="content-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section data-testid="article-hero" style={{
        background: "var(--bg)",
        padding: "6rem 1.5rem 4rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/knowledge-center" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.84rem",
            color: "var(--text-subtle)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "2.5rem",
          }}>
            ← Operational Library
          </Link>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "1.5rem",
          }}>
            Ground 0 — Hours-of-Service Compliance (49 CFR Part 395)
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "1.25rem",
          }}>
            HOS Compliance Brief:<br />What Your ELD Records Actually Prove
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.176rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: "2rem",
            maxWidth: 620,
          }}>
            How FMCSA reads your logs during audits — and how to make sure they tell the right story.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.806rem",
              color: "var(--text-subtle)",
              letterSpacing: "0.06em",
            }}>12-minute brief</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.896rem",
              color: "var(--text-subtle)",
            }}>Updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            <span style={{ color: "var(--border)", fontSize: "0.896rem" }}>|</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.806rem",
              fontWeight: 600,
              color: "var(--orange)",
              background: "var(--orange-muted)",
              padding: "0.25rem 0.75rem",
              letterSpacing: "0.02em",
            }}>
              Required for all interstate CDL operations
            </span>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY BAND ── */}
      <section data-testid="exec-summary" style={{
        background: "var(--bg-2)",
        borderBottom: "1px solid var(--border)",
        padding: "3rem 1.5rem",
      }}>
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "center",
        }} className="summary-grid">
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              marginBottom: "1.25rem",
            }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "See what the HOS rules actually limit (driving vs on-duty vs weekly hours) and which exceptions matter for small carriers.",
                "Understand how FMCSA and investigators use your ELD data and supporting documents to decide whether your logs are believable.",
                "Learn the most common log-based violations and why falsification is more dangerous than honest errors.",
                "Use a practical 90-day checklist so your HOS system is audit-ready any day a trooper or auditor looks at your records.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.762rem",
                    color: "var(--orange)",
                    marginTop: "0.28rem",
                    flexShrink: 0,
                  }}>→</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", flexShrink: 0 }} className="download-col">
            <button
              onClick={handlePrint}
              data-testid="download-checklist-top"
              style={{
                background: "none",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.896rem",
                fontWeight: 600,
                padding: "0.875rem 1.5rem",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "border-color 0.2s, color 0.2s",
                whiteSpace: "nowrap",
                display: "block",
                marginBottom: "0.5rem",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              Download HOS<br />readiness checklist (PDF)
            </button>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)" }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY — SECTIONS 1–3 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>

        {/* Section 1 — What HOS is really trying to control */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 1" title="What HOS Is Really Trying to Control" id="what-hos-controls" />
          <Body>
            Hours-of-Service regulations limit how long and how often a driver can be on duty and driving before resting, to reduce fatigue-related crashes. For most property-carrying carriers, the core rules are: up to 11 hours driving after 10 consecutive hours off duty, within a 14-hour driving window, plus weekly 60/70-hour on-duty limits and a 30-minute break after 8 hours of driving.
          </Body>
          <Body>
            In practice, FMCSA is less interested in whether you can quote the rule and more interested in whether your real-world operation stays inside these limits day after day. That is why ELDs are mandatory for most interstate CDL operations and why auditors cross-check your logs against fuel, toll, and dispatch records instead of taking them at face value.
          </Body>
          <Callout label="Plain English">
            HOS is not about "perfect logs." It is about whether your dispatch pattern, miles, and log data prove your drivers are not being pushed beyond legal and safe limits.
          </Callout>
        </div>

        {/* Section 2 — What FMCSA is really checking */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 2" title="What FMCSA Is Really Checking in Your Logs" id="what-fmcsa-checks" />

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.12rem",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>Do you fall under federal HOS?</h3>
          <Body>
            You generally must follow Part 395 if you operate a CMV in interstate commerce that weighs 10,001 pounds or more, has that weight rating, or hauls placardable hazmat. Common exceptions — short-haul, certain agricultural or oilfield operations — apply only when specific conditions are met and must be documented.
          </Body>

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.12rem",
            color: "var(--text)",
            marginBottom: "0.75rem",
            marginTop: "2rem",
          }}>Three questions investigators ask</h3>
          <Body>When an auditor or investigator looks at your HOS system, they are effectively asking:</Body>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
            {[
              "Are your drivers subject to HOS correctly identified and using the right method — ELD, paper, or exception?",
              "Do their logs align with the HOS limits, exceptions, and your dispatch reality: miles, locations, time zones?",
              "When violations happen, does your safety management control system notice and respond with coaching, discipline, or operational changes?",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.857rem",
                  color: "var(--text-subtle)",
                  marginTop: "0.3rem",
                  flexShrink: 0,
                }}>{i + 1}.</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                }}>{item}</span>
              </div>
            ))}
          </div>
          <Body style={{ color: "var(--text-subtle)", fontSize: "1rem" }}>
            If the answer to any of these is "no," you may be technically running HOS but functionally non-compliant.
          </Body>
        </div>

        {/* Section 3 — What the auditor will ask for */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 3" title="What the Auditor Will Ask For" id="what-auditor-wants" />
          <Body>
            In a safety audit or compliance review, investigators request a combination of log data and supporting documents over a defined sample period. They are not looking at logs in isolation — they are building a picture of whether the logs match your operation.
          </Body>

          {[
            "ELD records or paper records of duty status for a sample of drivers and dates.",
            "Supporting documents: fuel receipts, tolls, bills of lading, GPS or telematics data, and dispatch records.",
            "Your written HOS/ELD policy, including how you handle personal conveyance, yard moves, edits, and malfunctions.",
            "Documentation of driver training on HOS and ELD use.",
            "Internal reports or notes showing that you review logs — violation or exception reports, coaching notes, and discipline records.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.857rem",
                color: "var(--orange)",
                marginTop: "0.28rem",
                flexShrink: 0,
              }}>—</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
              }}>{item}</span>
            </div>
          ))}

          <div style={{ marginTop: "1.5rem" }}>
            <Callout label="What your ELD records prove">
              Your ELD data does not just prove time. It proves whether your paper trail matches what the truck actually did. When those two things conflict, the conflict is the finding.
            </Callout>
          </div>
        </div>

      </main>

      {/* ── LOG RISK PATTERNS — full-width band ── */}
      <section data-testid="log-risk-patterns" style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "0.75rem",
          }}>Section 4</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
            letterSpacing: "-0.015em",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>Log Patterns That Create the Most Risk</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.12rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 680,
            marginBottom: "3rem",
          }}>
            Most HOS violations show up as patterns in your ELD data, not one-off mistakes. Falsification and "no records" issues carry heavier enforcement, damage CSA scores more, and can contribute to a finding that your safety management controls are inadequate.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--border)",
          }}>
            {LOG_RISK_PATTERNS.map((pattern) => (
              <div key={pattern.category} style={{
                background: "var(--bg-2)",
                padding: "2rem",
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.762rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-subtle)",
                  paddingBottom: "0.875rem",
                  borderBottom: "1px solid var(--border)",
                  marginBottom: "1.25rem",
                }}>{pattern.category}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {pattern.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.762rem",
                        color: "var(--text-subtle)",
                        marginTop: "0.25rem",
                        flexShrink: 0,
                      }}>—</span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.952rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.7,
                      }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY — SECTION 5 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 5" title="The LaunchPath HOS Operating Standard" id="hos-standard" />
          <Body>
            Instead of chasing every exception by hand, you run a simple weekly rhythm that keeps logs believable and defensible. FMCSA does not expect perfection. They expect evidence that you are watching, correcting, and improving.
          </Body>

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.12rem",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>System inputs</h3>
          <Body>Three data sources feed your HOS standard every week:</Body>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
            {[
              "ELD log exports or compliance dashboards.",
              "Supporting documents: fuel receipts, tolls, dispatch records, GPS.",
              "Driver roster and duty status — who is under which rules or documented exceptions.",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.857rem",
                  color: "var(--orange)",
                  marginTop: "0.3rem",
                  flexShrink: 0,
                }}>—</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                }}>{item}</span>
              </div>
            ))}
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.12rem",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>Weekly behaviors</h3>
          {[
            "Pull violation and missing-log reports for all active drivers, with emphasis on 11/14/60-70-hour violations and \"no RODS\" days.",
            "Sample at least 2–3 trips per driver and compare logs to miles, fuel, and dispatch times to look for mismatches or falsification.",
            "Document coaching and discipline for drivers with repeated issues — especially falsification or ignoring break rules.",
            "Review short-haul or other exception use to ensure the conditions (radius and time limits) are truly met.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.857rem",
                color: "var(--orange)",
                marginTop: "0.28rem",
                flexShrink: 0,
              }}>—</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
              }}>{item}</span>
            </div>
          ))}

          <div style={{ marginTop: "2rem" }}>
            <Callout label="The standard in plain terms">
              If you run this standard honestly, your logs may not be perfect — but they will be defensible. Defensible logs are what survive audits.
            </Callout>
          </div>
        </div>
      </main>

      {/* ── 90-DAY HOS CHECKLIST — full-width table ── */}
      <section data-testid="hos-checklist-table" style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "0.75rem",
          }}>Section 6</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
            letterSpacing: "-0.015em",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>90-Day HOS Readiness Checklist</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.12rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 680,
            marginBottom: "2.5rem",
          }}>
            Use this checklist in the 90 days before an audit — or as a recurring monthly review — to keep your HOS system audit-ready.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: "1rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Step", "Action", "Why It Matters"].map(h => (
                    <th key={h} style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.762rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-subtle)",
                      textAlign: "left",
                      padding: "0 1rem 1rem 0",
                      whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CHECKLIST_STEPS.map((row) => (
                  <tr key={row.step} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.762rem",
                      color: "var(--text-subtle)",
                      letterSpacing: "0.05em",
                      padding: "1rem 1.25rem 1rem 0",
                      verticalAlign: "top",
                      whiteSpace: "nowrap",
                    }}>{row.step}</td>
                    <td style={{
                      padding: "1rem 1.25rem 1rem 0",
                      color: "var(--text-muted)",
                      lineHeight: 1.65,
                      verticalAlign: "top",
                      maxWidth: 340,
                    }}>{row.action}</td>
                    <td style={{
                      padding: "1rem 0 1rem 0",
                      color: "var(--text-subtle)",
                      lineHeight: 1.65,
                      verticalAlign: "top",
                      fontSize: "0.952rem",
                    }}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── HOS AUDIT BINDER ── */}
      <section data-testid="hos-audit-binder" className="audit-binder-section" style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "0.75rem",
          }}>Section 6 — Supplement</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
            letterSpacing: "-0.015em",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>HOS Audit Binder</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.064rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            maxWidth: 620,
          }}>
            Keep these documents organized and retrievable. If an auditor asks for your HOS records and you cannot respond within 10 minutes, you do not have them for purposes of the audit.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", marginBottom: "2.5rem" }}>
            {BINDER_TABS.map((tab) => (
              <div key={tab.num} className="binder-tab" style={{ background: "var(--bg)", padding: "2rem" }}>
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.875rem",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.762rem",
                    color: "var(--text-subtle)",
                    letterSpacing: "0.1em",
                  }}>TAB {tab.num}</span>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.12rem",
                    color: "var(--text)",
                    lineHeight: 1.3,
                  }}>{tab.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {tab.items.map((item, i) => (
                    <label key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        style={{
                          marginTop: "0.2rem",
                          flexShrink: 0,
                          accentColor: "var(--orange)",
                          width: 14,
                          height: 14,
                        }}
                      />
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.7,
                      }}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrint}
            data-testid="download-binder-btn"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.896rem",
              fontWeight: 600,
              padding: "0.875rem 1.5rem",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            Print / Save Binder as PDF
          </button>
        </div>
      </section>

      {/* ── ARTICLE BODY — SECTIONS 7–8 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>

        {/* Section 7 — When logs don't match */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader overline="Section 7" title="When Your Logs Don't Match Your Freight" id="logs-dont-match" />
          <Body>
            If you discover that logs and freight reality do not line up, you have two problems: the safety risk of fatigued driving, and the credibility problem that comes with falsified records.
          </Body>
          <Body>
            Repeated falsification can drive up your HOS BASIC in CSA, trigger interventions, and support a finding that your safety management controls are inadequate — which hurts you in audits and after crashes. When you find issues, correct them, document what changed (policy, dispatch planning, driver coaching), and avoid retro-editing logs just to "clean them up" without fixing the underlying pattern.
          </Body>
          <Callout label="Audit posture">
            It is better to show an auditor that you identify, log, and correct HOS problems than to pretend they never happen and get caught. An imperfect record with a correction trail is more defensible than a suspiciously clean one.
          </Callout>
        </div>

        {/* Section 8 — CTA */}
        <div data-testid="article-cta" style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "3.5rem",
        }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1rem",
          }}>
            Run a 30-Day HOS Snapshot on Your Fleet
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.092rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            maxWidth: 520,
          }}>
            If you rely on ELDs but have never looked at your logs the way FMCSA does, now is the time — before an auditor or plaintiff's attorney does it for you. Pull violation reports, sample trips, and see whether your logs and freight match.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a
              href="https://www.launchpathedu.com/auto-diagnostic"
              target="_blank" rel="noopener noreferrer"
              data-testid="article-diagnostic-cta"
              style={{
                display: "inline-block",
                background: "var(--orange)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >
              Run the REACH Assessment
            </a>
            <button
              onClick={handlePrint}
              data-testid="download-checklist-cta"
              style={{
                background: "none",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                padding: "1rem 2rem",
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              Download HOS Audit Binder Checklist (PDF)
            </button>
          </div>
        </div>

      </main>

      {/* Portal cross-link */}
      <ArticlePortalBanner
        taskId="HOS-001"
        taskName="HOS Policy Document"
        message="A written Hours of Service policy is Standard Task HOS-001 in the LaunchPath Operating System. Operators enrolled in the Standard document their HOS policy, submit it for coach verification, and track it as part of their Regulatory Alignment score."
      />

      {/* Operating Standard Library footer strip */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#000F1F",
        padding: "2rem 2.5rem",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.84rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
          }}>
            This brief is part of the{" "}
            <a href="/operating-standard" style={{ color: "#d4900a", textDecoration: "none" }}>
              LaunchPath Operating Standard Library
            </a>
            .
          </p>
          <a href="/operating-standard" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.7)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            View the Full Standard →
          </a>
        </div>
      </div>

      <BriefBundleCTA />
      <FooterSection />

      <style>{`
        @media (max-width: 680px) {
          .summary-grid { grid-template-columns: 1fr !important; }
          .download-col { text-align: left !important; }
        }

        @media print {
          body * { visibility: hidden; }
          .audit-binder-section,
          .audit-binder-section * { visibility: visible; }
          .audit-binder-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 2rem !important;
          }
          .audit-binder-section h2,
          .audit-binder-section h3 { color: black !important; }
          .audit-binder-section p,
          .audit-binder-section span,
          .audit-binder-section label { color: #333 !important; }
          .audit-binder-section .binder-tab {
            background: white !important;
            border: 1px solid #ccc;
            margin-bottom: 0.5rem;
          }
          .audit-binder-section button { display: none !important; }
        }
      `}</style>
    </div>
  );
}
