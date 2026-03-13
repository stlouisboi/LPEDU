import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ArticlePortalBanner from "../../components/ArticlePortalBanner";

const AUTO_FAIL_TABLE = [
  {
    area: "Alcohol & Drugs",
    rows: [
      {
        condition: "No alcohol and/or drug testing program in place when required",
        proof: "Consortium or in-house program agreement, written policy, list of covered drivers, service provider contact",
      },
      {
        condition: "No random alcohol and/or drug testing program when required",
        proof: "Random selection summaries, annual rate reports, proof of completed random tests for selected drivers",
      },
      {
        condition: "Using a driver who refused a required alcohol or drug test",
        proof: "Test order paperwork, refusal documentation, evidence driver was removed from safety-sensitive duties",
      },
      {
        condition: "Using a driver with known BAC of 0.04 or greater",
        proof: "Post-accident/for-cause test results, incident report, documentation of immediate removal from driving",
      },
      {
        condition: "Using a driver who tested positive for controlled substances without proper return-to-duty/follow-up",
        proof: "Positive test result, SAP evaluation, return-to-duty test, follow-up testing schedule and completion records",
      },
    ],
  },
  {
    area: "Driver Qualification",
    rows: [
      {
        condition: "Using a driver without a valid CDL when a CDL is required",
        proof: "CDL copy in DQF, current MVR, license verification logs",
      },
      {
        condition: "Using a disqualified driver",
        proof: "MVRs showing no disqualification, internal flagging system, documentation of any suspensions and removals",
      },
      {
        condition: "Using a driver with a revoked, suspended, or cancelled CDL",
        proof: "Recent MVRs (at hire and annually), electronic monitoring or pull-notice reports",
      },
      {
        condition: "Using a medically unqualified driver",
        proof: "Valid medical examiner's certificate (and CDL med status where applicable), tracking of expiration dates",
      },
    ],
  },
  {
    area: "Operations & Insurance",
    rows: [
      {
        condition: "Operating a CMV without required levels of financial responsibility (minimum insurance)",
        proof: "Insurance policy declarations, MCS-90 endorsement where required, list of covered units",
      },
    ],
  },
  {
    area: "Operations & HOS",
    rows: [
      {
        condition: "Failing to require drivers to prepare records of duty status (HOS records) when required",
        proof: "ELD logs or paper RODS, supporting documents (fuel, tolls, dispatch), HOS policy and training records",
      },
    ],
  },
  {
    area: "Maintenance & Repairs",
    rows: [
      {
        condition: "Operating a CMV placed out-of-service for safety defects before repairs are made",
        proof: "Roadside inspection/OOS reports, repair invoices, work orders, documentation showing repair date before return",
      },
      {
        condition: "Failing to repair OOS defects listed on DVIRs before vehicle is operated again",
        proof: "DVIRs noting defects, signed 'defects corrected' certifications, matching repair records",
      },
    ],
  },
  {
    area: "Maintenance & Inspections",
    rows: [
      {
        condition: "Using a CMV that has not been periodically inspected as required (≥51% of records reviewed are missing)",
        proof: "Annual/periodic inspection reports for each unit, inspection schedule, proof of qualified inspector",
      },
    ],
  },
];

const BINDER_TABS = [
  {
    num: "01",
    title: "Driver Qualification Files (DQF)",
    items: [
      "Application and hiring forms for each driver",
      "CDL copy and current MVR(s)",
      "Medical examiner's certificate and tracking of expirations",
      "Prior employer checks and road test (or equivalent)",
      "Annual MVR reviews with driver certification signatures",
    ],
  },
  {
    num: "02",
    title: "Drug & Alcohol Program",
    items: [
      "Consortium or in-house program agreement and written policy",
      "Pre-employment and random test results",
      "FMCSA Clearinghouse queries (pre-employment and annual)",
      "SAP, return-to-duty, and follow-up testing records (if applicable)",
      "Supervisor training records for reasonable suspicion",
    ],
  },
  {
    num: "03",
    title: "Hours-of-Service & ELD",
    items: [
      "ELD logs for all covered drivers (last 6 months minimum)",
      "Supporting documents: fuel receipts, toll records, dispatch records",
      "ELD device registration and malfunction/data transfer records",
      "HOS written policy and driver training records",
      "Time zone and unidentified driver log reconciliation records",
    ],
  },
  {
    num: "04",
    title: "Vehicle & Maintenance",
    items: [
      "Periodic (annual) inspection reports for each unit",
      "Driver Vehicle Inspection Reports (DVIRs) — last 90 days",
      "Repair orders and work orders tied to DVIR defect notations",
      "Out-of-service order documentation with return-to-service proof",
      "Preventive maintenance schedule and completion records",
    ],
  },
  {
    num: "05",
    title: "Insurance & Registration",
    items: [
      "Insurance policy declarations page with coverage limits",
      "MCS-90 endorsement on file at FMCSA",
      "BOC-3 designation on file",
      "UCR registration — current year",
      "Operating authority (MC number) and USDOT registration",
    ],
  },
  {
    num: "06",
    title: "Accidents & Safety Reviews",
    items: [
      "Accident register for all accidents meeting recordable threshold",
      "Post-accident drug and alcohol test records",
      "Safety review checklist (internal, quarterly recommended)",
      "CSA BASICs monitoring documentation and remediation notes",
    ],
  },
];

function SectionHeader({ overline, title, id }) {
  return (
    <div style={{ marginBottom: "2rem" }} id={id}>
      {overline && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.728rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          marginBottom: "0.75rem",
        }}>{overline}</p>
      )}
      <h2 style={{
        fontFamily: "'Manrope', sans-serif",
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
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.728rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--orange)",
          marginBottom: "0.6rem",
        }}>{label}</p>
      )}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "1.008rem",
        color: "var(--text-muted)",
        lineHeight: 1.8,
      }}>{children}</div>
    </div>
  );
}

function CheckList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.784rem",
            color: "var(--orange)",
            marginTop: "0.3rem",
            flexShrink: 0,
          }}>—</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
          }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function NewEntrantAuditBrief() {
  const handlePrint = () => window.print();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
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
            ← Knowledge Center
          </Link>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.728rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "1.5rem",
          }}>
            Ground 0 — FMCSA New Entrant Program (49 CFR Part 385, Subpart D)
          </p>

          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "1.25rem",
          }}>
            New Entrant Safety Audit:<br />Ground 0 Brief
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.176rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: "2rem",
            maxWidth: 620,
          }}>
            What FMCSA will check in your first 12 months and how to pass on the first attempt.
          </p>

          {/* Meta row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1rem",
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
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
              Critical — first 18 months of authority
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
              fontSize: "0.728rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              marginBottom: "1.25rem",
            }}>In this brief you will:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Understand what FMCSA monitors during your first 18 months as a new entrant.",
                "See exactly what the safety auditor can request and where carriers usually fail.",
                "Use a single checklist to prepare your driver, vehicle, insurance, and safety records before the audit notice arrives.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.728rem",
                    color: "var(--orange)",
                    marginTop: "0.28rem",
                    flexShrink: 0,
                  }}>→</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.008rem",
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
              Download printable<br />audit checklist (PDF)
            </button>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.784rem",
              color: "var(--text-subtle)",
            }}>Print or save to PDF</p>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>

        {/* Section 2 — What the Program Really Is */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader
            overline="Section 1"
            title="What the New Entrant Program Really Is"
            id="what-it-is"
          />
          <Body>
            The moment your USDOT number is issued and you begin interstate commerce, the Federal Motor Carrier Safety Administration classifies you as a new entrant. That classification runs for 18 months. During that window, FMCSA monitors your operation through two mechanisms: roadside inspection data and a mandatory safety audit.
          </Body>
          <Body>
            The safety audit is not optional. FMCSA will contact your operation — typically between 10 and 18 months after your authority is issued — to schedule a review. The audit evaluates whether you have the basic safety management controls in place to operate lawfully as a motor carrier. Passing it (or completing an approved corrective action plan) is required to convert your operating authority from provisional to permanent.
          </Body>
          <Body>
            Most carriers who fail do not fail because they are unsafe operators. They fail because they never installed the administrative infrastructure that proves to a federal auditor they are running a compliant operation. The difference is documentation — organized, retrievable, and complete before the auditor arrives.
          </Body>

          <Callout label="Regulation in plain English">
            <strong style={{ color: "var(--text)" }}>49 CFR Part 385, Subpart D</strong> governs the New Entrant Safety Assurance Program. It requires FMCSA to perform a safety audit on every new entrant carrier within the first 12 months of operations. If a carrier fails to pass and cannot complete a corrective action plan, FMCSA must revoke their new entrant registration — which includes their operating authority.
          </Callout>
        </div>

        {/* Section 3 — What the Auditor Will Ask For */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader
            overline="Section 2"
            title="What the Safety Auditor Will Ask For"
            id="what-auditor-wants"
          />
          <Body>
            The safety audit covers five document systems. Each one maps to a documented failure category. If any one of these is absent or incomplete, the auditor has the authority to note it as a deficiency — and enough deficiencies mean automatic failure.
          </Body>

          {[
            {
              title: "Driver Qualification Files",
              items: [
                "CDL copy — current, valid, correct class for the operation",
                "Employment application (49 CFR 391.21 format)",
                "Annual motor vehicle record (MVR) pull",
                "Medical examiner's certificate — not expired",
                "Prior employer safety performance history inquiry",
                "Road test or equivalent (CDL bypass documentation)",
              ],
            },
            {
              title: "Hours-of-Service Records",
              items: [
                "ELD logs or paper RODs for all covered drivers",
                "Supporting documents: fuel receipts, dispatch records, toll slips",
                "ELD device registration and malfunction/diagnostic event records",
                "HOS exemption documentation where applicable (short-haul, agricultural, etc.)",
              ],
            },
            {
              title: "Drug & Alcohol Program",
              items: [
                "Written D&A policy, signed and distributed",
                "Pre-employment drug test on file for each driver",
                "FMCSA Drug & Alcohol Clearinghouse pre-employment query",
                "Consortium enrollment or in-house random testing program documentation",
                "Annual random testing completion records",
              ],
            },
            {
              title: "Vehicle & Maintenance Records",
              items: [
                "Periodic (annual) inspection report for each CMV",
                "Driver Vehicle Inspection Reports (DVIRs) — last 90 days minimum",
                "Repair orders/work orders tied to DVIR defect items",
                "Out-of-service order documentation with return-to-service verification",
              ],
            },
            {
              title: "Insurance, Registration & Authority",
              items: [
                "Proof of minimum required insurance limits on file with FMCSA",
                "MCS-90 endorsement (where required by freight type)",
                "BOC-3 process agent designation on file",
                "Unified Carrier Registration (UCR) — current year",
                "Operating authority certificate (MC number) and USDOT registration",
              ],
            },
          ].map((bucket) => (
            <div key={bucket.title} style={{ marginBottom: "2rem" }}>
              <h3 style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "1.176rem",
                color: "var(--text)",
                marginBottom: "1rem",
              }}>{bucket.title}</h3>
              <CheckList items={bucket.items} />
            </div>
          ))}
        </div>

      </main>

      {/* ── AUTO-FAIL TABLE (wider than prose) ── */}
      <section data-testid="auto-fail-table" style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.728rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "0.75rem",
          }}>Section 3</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
            letterSpacing: "-0.015em",
            color: "var(--text)",
            lineHeight: 1.25,
            marginBottom: "0.75rem",
          }}>The Automatic-Fail Triggers You Cannot Ignore</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.12rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 680,
            marginBottom: "2.5rem",
          }}>
            FMCSA publishes a defined list of conditions that automatically fail a new entrant safety audit. If any single one of these is true on the day of the audit, no amount of other documentation prevents a failing result. These are not grey areas.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.98rem",
            }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Area", "Automatic-Failure Condition", "What to Show the Auditor (Proof)"].map(h => (
                    <th key={h} style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.728rem",
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
                {AUTO_FAIL_TABLE.map((group) =>
                  group.rows.map((row, ri) => (
                    <tr key={`${group.area}-${ri}`} style={{ borderBottom: "1px solid var(--border)" }}>
                      {ri === 0 ? (
                        <td
                          rowSpan={group.rows.length}
                          style={{
                            verticalAlign: "top",
                            padding: "1rem 1rem 1rem 0",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.784rem",
                            color: "var(--text-subtle)",
                            letterSpacing: "0.04em",
                            whiteSpace: "nowrap",
                          }}
                        >{group.area}</td>
                      ) : null}
                      <td style={{
                        padding: "1rem 1.25rem 1rem 0",
                        color: "var(--text-muted)",
                        lineHeight: 1.65,
                        verticalAlign: "top",
                        maxWidth: 380,
                      }}>{row.condition}</td>
                      <td style={{
                        padding: "1rem 0 1rem 0",
                        color: "var(--text-subtle)",
                        lineHeight: 1.65,
                        verticalAlign: "top",
                        fontSize: "0.952rem",
                      }}>{row.proof}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── AUDIT BINDER ── */}
      <section data-testid="audit-binder" className="audit-binder-section" style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.728rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "0.75rem",
          }}>Section 3 — Supplement</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
            letterSpacing: "-0.015em",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>New Entrant Safety Audit Binder</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.064rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            maxWidth: 620,
          }}>
            Use this binder to keep the documents FMCSA may request during your New Entrant Safety Audit organized and ready. If you cannot produce any item within 10 minutes, you do not have it for the audit.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", marginBottom: "2.5rem" }}>
            {BINDER_TABS.map((tab) => (
              <div key={tab.num} className="binder-tab" style={{
                background: "var(--bg)",
                padding: "2rem 2rem 2rem 2rem",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.875rem",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.728rem",
                    color: "var(--text-subtle)",
                    letterSpacing: "0.1em",
                  }}>TAB {tab.num}</span>
                  <h3 style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.12rem",
                    color: "var(--text)",
                    lineHeight: 1.3,
                  }}>{tab.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {tab.items.map((item, i) => (
                    <label key={i} style={{
                      display: "flex",
                      gap: "0.875rem",
                      alignItems: "flex-start",
                      cursor: "pointer",
                    }}>
                      <input
                        type="checkbox"
                        className="binder-check"
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
                        fontSize: "0.98rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.7,
                      }}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Callout label="Audit readiness standard">
            If you cannot produce any item in this binder within 10 minutes of an auditor request, you do not "have" it for purposes of the audit. Organized and retrievable are not the same as filed somewhere.
          </Callout>

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

      {/* ── ARTICLE BODY — SECTIONS 4–8 ── */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 1.5rem" }}>

        {/* Section 4 — Operating Standard */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader
            overline="Section 4"
            title="The Operating Standard That Survives the Audit"
            id="operating-standard"
          />
          <Body>
            FMCSA does not want a thick handbook. They want proof that you run consistent safety controls — week after week, before anyone calls. The carriers who pass their New Entrant Safety Audit on the first attempt are not the ones who scrambled to assemble a binder after getting the audit notice. They are the ones who installed a system before the first dispatch.
          </Body>

          {[
            {
              system: "System 1",
              title: "People & Qualification",
              subtitle: "DQFs, D&A Program, Clearinghouse",
              behaviors: [
                "Pull a new MVR before every new driver's first trip — not just at hire.",
                "Run a Clearinghouse pre-employment query on every new driver, every time.",
                "Check medical certificate expiration dates on the 1st of each month.",
                "Store DQFs in a single location with a cover sheet showing completion status.",
                "Review and re-sign the D&A policy with any new hire within 30 days.",
              ],
            },
            {
              system: "System 2",
              title: "Hours & Dispatch",
              subtitle: "ELD Records, HOS Compliance, Supporting Documents",
              behaviors: [
                "Confirm ELD connectivity and driver login at the start of every shift.",
                "Retain fuel receipts and toll records as HOS supporting documents — same day.",
                "Audit a 30-day ELD log sample internally every month for violations.",
                "Document any ELD malfunctions and the paper log switch immediately.",
                "Verify short-haul exemptions are properly recorded and qualified.",
              ],
            },
            {
              system: "System 3",
              title: "Equipment & Maintenance",
              subtitle: "DVIRs, Periodic Inspections, OOS Protocol",
              behaviors: [
                "Require a completed DVIR before and after every trip — no exceptions.",
                "Sign off on defect corrections with a separate certification before the vehicle returns to service.",
                "Track periodic (annual) inspection dates on a wall calendar or shared tracker.",
                "Pull a current inspection copy for each unit and verify it's in the vehicle file.",
                "Never dispatch a unit with an open OOS notation without documented repair.",
              ],
            },
            {
              system: "System 4",
              title: "Records, Insurance & Reviews",
              subtitle: "Insurance, Authority Filings, Internal Safety Reviews",
              behaviors: [
                "Set a calendar reminder 60 days before each insurance policy renewal.",
                "Verify MCS-90 and BOC-3 filings are current in FMCSA SAFER at least quarterly.",
                "Renew UCR registration before the November 1st opening window each year.",
                "Conduct a 15-minute internal safety review at the start of each month.",
                "Monitor your CSA BASICs online and address any elevated scores immediately.",
              ],
            },
          ].map((sys) => (
            <div key={sys.system} style={{ marginBottom: "2.5rem" }}>
              <div style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.875rem",
                marginBottom: "1rem",
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.728rem",
                  color: "var(--text-subtle)",
                  letterSpacing: "0.08em",
                  flexShrink: 0,
                }}>{sys.system}</span>
                <div>
                  <h3 style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.176rem",
                    color: "var(--text)",
                    marginBottom: "0.2rem",
                  }}>{sys.title}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.896rem",
                    color: "var(--text-subtle)",
                  }}>{sys.subtitle}</p>
                </div>
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.84rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
                marginBottom: "0.75rem",
              }}>Weekly behaviors</p>
              <CheckList items={sys.behaviors} />
            </div>
          ))}
        </div>

        {/* Section 5 — 90-Day Countdown Checklist */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader
            overline="Section 5"
            title="90-Day Countdown Checklist"
            id="countdown-checklist"
          />
          <Body>
            If your authority is already active, begin this sequence now. Each item below is a confirmation gate — not complete until you can produce the document in under 10 minutes.
          </Body>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "2rem" }}>
            {[
              ["Confirm all drivers pass the Big 3 pre-employment requirements.", "D&A test + Clearinghouse query + current MVR — all three, every driver, every time."],
              ["Verify every vehicle has a current periodic inspection and maintenance record.", "One missing unit inspection is a documented audit deficiency."],
              ["Audit your HOS system.", "Every driver logging correctly, ELD functioning, supporting documents retained and retrievable."],
              ["Confirm proof of insurance, BOC-3, and required registrations are on file and current.", "Verify in FMCSA SAFER — not just in your own records."],
              ["Build and organize your audit binder.", "One physical or digital binder, tabbed by system, cover sheet showing completion status for each driver and vehicle."],
              ["Run a 15-minute internal mock audit.", "Ask yourself: if an auditor called today, what could I not produce immediately? Fix that item this week."],
            ].map(([title, note], i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "2.25rem 1fr",
                gap: "1.25rem",
                alignItems: "start",
                padding: "1.25rem 0",
                borderTop: "1px solid var(--border)",
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.728rem",
                  color: "var(--text-subtle)",
                  paddingTop: "0.25rem",
                  letterSpacing: "0.05em",
                }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.064rem",
                    color: "var(--text)",
                    lineHeight: 1.65,
                    marginBottom: "0.35rem",
                  }}>{title}</p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.952rem",
                    color: "var(--text-subtle)",
                    lineHeight: 1.65,
                  }}>{note}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>

          <Callout label="Audit-ready standard">
            If you cannot produce it in 10 minutes, you do not "have" it for the audit. The auditor will not wait while you search email threads or call your accountant.
          </Callout>
        </div>

        {/* Section 6 — If You Fail */}
        <div style={{ marginBottom: "4.5rem" }}>
          <SectionHeader
            overline="Section 6"
            title="If You Fail or Ignore the Audit"
            id="if-you-fail"
          />
          <Body>
            Failure without a completed corrective action plan triggers revocation of your new entrant registration — which includes your operating authority. This is not a fine. It is the end of the operating authority, requiring a new application and restart of the new entrant period.
          </Body>
          <Body>
            FMCSA does provide a corrective action plan pathway for carriers who fail but are willing to remedy the deficiencies. That path is available — but it requires documented, verified corrections within a tight window. Carriers who ignore the audit notice entirely, or who continue operating after a failing result without corrective action, face civil penalties and out-of-service orders in addition to authority revocation.
          </Body>
          <Body style={{ color: "var(--text-subtle)", fontSize: "1.008rem" }}>
            The cost of failing and correcting is measured in weeks of disrupted operations and legal fees. The cost of installing the Standard before the audit is measured in hours of preparation.
          </Body>
        </div>

        {/* Section 7 — CTA */}
        <div data-testid="article-cta" style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "3.5rem",
        }}>
          <p className="overline" style={{ marginBottom: "1rem" }}>What Happens Next</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1rem",
          }}>
            Run the Ground 0 New Entrant Readiness Test
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.092rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            maxWidth: 520,
          }}>
            The diagnostic maps your current operation against the five audit systems and identifies which items are missing, incomplete, or at risk. Free. Takes approximately 12 minutes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a
              href="https://www.launchpathedu.com/auto-diagnostic"
              target="_blank" rel="noopener noreferrer"
              data-testid="article-readiness-test-cta"
              style={{
                display: "inline-block",
                background: "var(--orange)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.98rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >
              Run the Ground 0 Readiness Test
            </a>
            <button
              onClick={handlePrint}
              data-testid="download-binder-cta"
              style={{
                background: "none",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.98rem",
                fontWeight: 600,
                padding: "1rem 2rem",
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              Download New Entrant Audit Binder Checklist (PDF)
            </button>
          </div>
        </div>

      </main>

      {/* Portal cross-link */}
      <ArticlePortalBanner
        taskId="DQ-001"
        taskName="Driver Qualification File"
        message="A complete, auditor-ready DQ file is Standard Task DQ-001 in the LaunchPath Operating System. Operators enrolled in the Standard submit their DQ documentation for coach verification and track their Documentary Integrity score in the portal."
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
            <a href="/operating-standard" style={{ color: "#C5A059", textDecoration: "none" }}>
              LaunchPath Operating Standard Library
            </a>
            .
          </p>
          <a href="/operating-standard" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.728rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.7)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            View the Full Standard →
          </a>
        </div>
      </div>

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
