import { useEffect } from "react";

// ── All 5 binder datasets ──────────────────────────────────────────────────

const SERIES = [
  {
    regulation: "49 CFR Part 385, Subpart D",
    title: "New Entrant Safety Audit Binder",
    tabs: [
      {
        num: "01", title: "Driver Qualification Files (DQF)",
        items: ["Application and hiring forms for each driver", "CDL copy and current MVR(s)", "Medical examiner's certificate and tracking of expirations", "Prior employer checks and road test (or equivalent)", "Annual MVR reviews with driver certification signatures"],
      },
      {
        num: "02", title: "Drug & Alcohol Program",
        items: ["Consortium or in-house program agreement and written policy", "Pre-employment and random test results", "FMCSA Clearinghouse queries (pre-employment and annual)", "SAP, return-to-duty, and follow-up testing records (if applicable)", "Supervisor training records for reasonable suspicion"],
      },
      {
        num: "03", title: "Hours-of-Service & ELD",
        items: ["ELD logs for all covered drivers (last 6 months minimum)", "Supporting documents: fuel receipts, toll records, dispatch records", "ELD device registration and malfunction/data transfer records", "HOS written policy and driver training records"],
      },
      {
        num: "04", title: "Vehicle & Maintenance",
        items: ["Periodic (annual) inspection report for each unit", "Driver Vehicle Inspection Reports (DVIRs) — last 90 days", "Repair orders and work orders tied to DVIR defect notations", "Out-of-service order documentation with return-to-service proof", "Preventive maintenance schedule and completion records"],
      },
      {
        num: "05", title: "Insurance & Registration",
        items: ["Insurance policy declarations page with coverage limits", "MCS-90 endorsement on file at FMCSA", "BOC-3 designation on file", "UCR registration — current year", "Operating authority (MC number) and USDOT registration"],
      },
      {
        num: "06", title: "Accidents & Safety Reviews",
        items: ["Accident register for all recordable accidents", "Post-accident drug and alcohol test records", "Safety review checklist (internal, quarterly recommended)", "CSA BASICs monitoring documentation and remediation notes"],
      },
    ],
  },
  {
    regulation: "49 CFR Part 395",
    title: "HOS Audit Binder",
    tabs: [
      {
        num: "01", title: "Driver Roster & HOS Status",
        items: ["List of all drivers subject to federal HOS (Part 395)", "Documented exception status for each driver (short-haul, agricultural, etc.)", "Conditions monitored to confirm exception eligibility", "Date of last HOS/ELD training and signature acknowledgement per driver"],
      },
      {
        num: "02", title: "ELD Records & System Setup",
        items: ["Confirmation that all regulated drivers are active in the ELD system", "ELD device registration and FMCSA certification documentation", "Unassigned drive time review and disposition records", "Log edit history and driver edit annotations (last 6 months)"],
      },
      {
        num: "03", title: "Violation Reports & Coaching",
        items: ["8-week violation summary report by driver", "Coaching or discipline records for drivers with repeat violations", "Falsification findings and corrective action documentation", "Trend notes showing improvement or escalation over time"],
      },
      {
        num: "04", title: "Supporting Document Samples",
        items: ["Fuel receipts cross-referenced to ELD log locations and times (sample trips)", "Toll records and GPS/telematics export for sampled drivers", "Bills of lading / dispatch records for sampled loads", "Notes on any mismatches found and how they were resolved"],
      },
      {
        num: "05", title: "HOS Policy & Driver Training",
        items: ["Written HOS and ELD policy — current version, dated", "Covers: personal conveyance, yard moves, log edits, malfunction procedure, short-haul exception", "Driver training acknowledgements (signature + date per driver)", "Policy revision history — at least one review per year"],
      },
      {
        num: "06", title: "ELD Malfunction & Paper Log Protocol",
        items: ["ELD malfunction reporting procedure (written)", "Paper log supply confirmed in each vehicle", "Documented malfunction incidents with repair and return-to-ELD dates", "8-day paper log supply available per driver requirement"],
      },
    ],
  },
  {
    regulation: "49 CFR Part 382",
    title: "Drug & Alcohol Program Binder",
    tabs: [
      {
        num: "01", title: "Written Policy & DER Documentation",
        items: ["Current written D&A policy, dated and signed — aligns with 49 CFR Part 382 and Part 40", "Policy acknowledgement signatures from all covered drivers, with dates", "Designated Employer Representative (DER) name, title, and contact information documented", "Policy revision history — at least one review per year"],
      },
      {
        num: "02", title: "Clearinghouse Registration & Query Records",
        items: ["Company Clearinghouse registration confirmation", "Pre-employment full query for each driver — date, driver CDL, and result", "Driver consent documentation for each Clearinghouse query", "Annual limited query records for currently employed drivers"],
      },
      {
        num: "03", title: "Random Testing Program",
        items: ["Consortium or TPA enrollment agreement and program documentation", "Random selection lists — each selection round, names drawn, dates", "Completed random test results (negative or positive) by driver and date", "Annual MIS (Management Information System) data if applicable"],
      },
      {
        num: "04", title: "Pre-Employment & Driver Test History",
        items: ["Pre-employment drug test chain-of-custody form and lab result — per driver", "Any post-accident test records with supporting documentation", "Reasonable-suspicion test records with supervisor observations documented", "Return-to-duty and follow-up testing records where applicable"],
      },
      {
        num: "05", title: "Supervisor Training",
        items: ["Reasonable-suspicion training completion certificate for each qualifying supervisor", "Training provider documentation (60 min alcohol signs, 60 min drug signs)", "Date of training relative to supervisory duties"],
      },
    ],
  },
  {
    regulation: "49 CFR Part 396",
    title: "Maintenance & Unit File Binder",
    tabs: [
      {
        num: "01", title: "Cover & Identity",
        items: ["Unit number, year/make/model, VIN, plate number", "In-service date and current mileage", "Ownership or lease agreement on file"],
      },
      {
        num: "02", title: "Core Documents",
        items: ["Current registration (copy)", "Insurance ID card (copy)", "Latest annual/periodic inspection report"],
      },
      {
        num: "03", title: "Inspections & DVIRs — last 12–18 months",
        items: ["DVIRs where defects were reported, in date order", "DVIRs tied to roadside or OOS violations flagged for quick access", "Driver verification sign-offs confirming defect correction"],
      },
      {
        num: "04", title: "Repairs & Preventive Maintenance",
        items: ["Repair orders and invoices with unit number, complaint, cause, and correction", "PM service records (oil, filters, brakes) with dates and mileage/hours", "Parts receipts tied to repair order line items"],
      },
      {
        num: "05", title: "Roadside & Out-of-Service History",
        items: ["Roadside inspection reports and citations", "Repair orders showing how OOS items or serious defects were corrected", "Return-to-service documentation for each OOS event"],
      },
      {
        num: "06", title: "Notes & Patterns",
        items: ["Notes on repeated issues with corrective action taken", "Internal decisions on retirements, major repairs, or fleet changes", "Insurer or auditor findings tied to this unit with corrective action"],
      },
    ],
  },
  {
    regulation: "49 CFR Part 387",
    title: "Insurance & Authority File",
    tabs: [
      {
        num: "01", title: "Authority & FMCSA Records",
        items: ["Current L&I snapshot showing MC and USDOT status, operating authority type, and insurance filings", "Operating authority certificate (MC number) and USDOT registration", "Any recent FMCSA correspondence about authority, revocation, or reinstatement", "BOC-3 process agent designation on file"],
      },
      {
        num: "02", title: "Policy & Endorsements",
        items: ["Current policy declarations with limits, covered autos, and key forms", "MCS-90 endorsement (where required) and any other regulatory endorsements", "Any special conditions, exclusions, or warranties that affect your operations", "Confirmation that policy classifications match your actual freight and lanes"],
      },
      {
        num: "03", title: "Filings & Evidence of Financial Responsibility",
        items: ["Confirmation or printout showing active BMC-91/BMC-91X filings with effective dates and insurer name", "Documentation of any prior cancellations and reinstatements with dates", "Proof of required UCR registration — current year", "Cargo insurance certificate if required by shippers or brokers"],
      },
      {
        num: "04", title: "Fleet & Driver Reconciliation",
        items: ["Current fleet roster with unit numbers, VINs, plates, garaging locations", "Current CDL driver roster with hire dates and roles", "Simple reconciliation sheet showing how each unit and driver ties to the policy", "Documentation of any leased-on drivers or owner-operator agreements"],
      },
      {
        num: "05", title: "Notes & Renewal Plan",
        items: ["Summary of last renewal: rate changes, coverage changes, and reasons", "One-page renewal plan: when you start quoting, what information you provide, how you decide on limits", "Agent contact log — key conversations and decisions documented", "Reminder dates: renewal, payment due dates, UCR opening window"],
      },
    ],
  },
];

export default function AllChecklists() {
  useEffect(() => {
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="print-document">

      {/* ── Cover ── */}
      <div className="print-cover">
        <div className="print-cover-rule" />
        <p className="print-overline">LaunchPath Operating Standard</p>
        <h1 className="print-h1">Complete Audit Binder Series</h1>
        <p className="print-lead">All 5 compliance checklists — New Entrant, HOS, Drug & Alcohol, Maintenance, Insurance</p>
        <div className="print-meta-row">
          <span>49 CFR Parts 382, 385, 387, 395, 396</span>
          <span>·</span>
          <span>New Entrant Series</span>
          <span>·</span>
          <span>{new Date().getFullYear()}</span>
        </div>
        <div className="print-cover-rule" style={{ marginTop: "2rem" }} />
      </div>

      {/* ── Binders ── */}
      {SERIES.map((brief) => (
        <div key={brief.title} className="print-brief-section">
          <div className="print-brief-header">
            <span className="print-regulation">{brief.regulation}</span>
            <h2 className="print-h2">{brief.title}</h2>
          </div>
          {brief.tabs.map((tab) => (
            <div key={tab.num} className="print-tab">
              <div className="print-tab-header">
                <span className="print-tab-num">TAB {tab.num}</span>
                <h3 className="print-h3">{tab.title}</h3>
              </div>
              <ul className="print-checklist">
                {tab.items.map((item, i) => (
                  <li key={i} className="print-check-item">
                    <span className="print-checkbox" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* ── Marker ── */}
      <div className="print-marker">
        <div className="print-marker-rule" />
        <p className="print-marker-text">
          This checklist series is part of the LaunchPath Operating Standard.
        </p>
        <p className="print-marker-url">launchpathedu.com/ground-0</p>
      </div>

      {/* ── Screen-only fallback ── */}
      <div className="screen-fallback">
        <p className="screen-msg">Preparing your download…</p>
        <button onClick={() => window.print()} className="screen-btn">
          Click here if print dialog did not open
        </button>
        <a href="/knowledge-center" className="screen-back">← Back to Knowledge Center</a>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* ── SCREEN: hide document, show fallback ── */
        @media screen {
          .print-document { background: #060d19; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
          .print-cover, .print-brief-section, .print-marker { display: none; }
          .screen-fallback { text-align: center; padding: 4rem 2rem; }
          .screen-msg { font-family: 'Newsreader', 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #f0f4f8; margin-bottom: 1.5rem; }
          .screen-btn { background: #E8590F; color: #fff; border: none; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 1rem 2rem; cursor: pointer; margin-bottom: 1.5rem; display: block; margin-left: auto; margin-right: auto; }
          .screen-back { font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #8a99aa; text-decoration: none; display: block; }
        }

        /* ── PRINT: hide fallback, show document ── */
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body, html { margin: 0; padding: 0; background: white; }
          .screen-fallback { display: none; }
          .print-document { font-family: 'Inter', Arial, sans-serif; color: #111; background: white; }

          /* Cover */
          .print-cover { padding: 3rem 3rem 2rem; page-break-after: always; }
          .print-cover-rule { height: 3px; background: #E8590F; margin-bottom: 2rem; }
          .print-overline { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: #555; margin-bottom: 1rem; }
          .print-h1 { font-family: 'Newsreader', 'Playfair Display', serif; font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; color: #0a0a0a; margin-bottom: 0.75rem; line-height: 1.1; }
          .print-lead { font-size: 0.95rem; color: #444; margin-bottom: 1rem; line-height: 1.6; }
          .print-meta-row { font-size: 0.75rem; color: #777; display: flex; gap: 0.75rem; flex-wrap: wrap; }

          /* Brief sections */
          .print-brief-section { padding: 2rem 3rem; page-break-before: always; }
          .print-brief-header { border-bottom: 2px solid #E8590F; padding-bottom: 0.75rem; margin-bottom: 1.5rem; }
          .print-regulation { font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: #777; display: block; margin-bottom: 0.25rem; }
          .print-h2 { font-family: 'Newsreader', 'Playfair Display', serif; font-size: 1.35rem; font-weight: 700; color: #0a0a0a; margin: 0; }

          /* Tabs */
          .print-tab { margin-bottom: 1.5rem; border: 1px solid #ddd; padding: 1rem 1.25rem; break-inside: avoid; }
          .print-tab-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.875rem; padding-bottom: 0.5rem; border-bottom: 1px solid #eee; }
          .print-tab-num { font-size: 0.6rem; letter-spacing: 0.1em; color: #999; text-transform: uppercase; white-space: nowrap; }
          .print-h3 { font-family: 'Newsreader', 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; color: #111; margin: 0; }

          /* Checklist */
          .print-checklist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.45rem; }
          .print-check-item { display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.8rem; color: #333; line-height: 1.55; }
          .print-checkbox { width: 12px; height: 12px; min-width: 12px; border: 1.5px solid #999; margin-top: 0.15rem; display: inline-block; }

          /* Marker */
          .print-marker { padding: 2rem 3rem; page-break-before: auto; }
          .print-marker-rule { height: 1px; background: #ddd; margin-bottom: 1.5rem; }
          .print-marker-text { font-size: 0.75rem; color: #555; margin-bottom: 0.25rem; }
          .print-marker-url { font-size: 0.75rem; color: #E8590F; font-weight: 600; }
        }
      `}} />
    </div>
  );
}
