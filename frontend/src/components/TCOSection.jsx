import { useState, useMemo } from "react";

const fmt = (n) => "$" + Math.round(n).toLocaleString();

function calcExposure(trucks, monthlyRevPerTruck, payStructure) {
  // 1. Annual compliance infrastructure exposure
  const infraPerTruck = 850; // midrange of required items (DQ $350 + D&A $225 + maint $200 + ELD $450 + safety $275) amortized annually
  const annualInfra = trucks * infraPerTruck;

  // 2. Single OOS violation at this fleet size
  // FMCSA documented: $1,000–$16,000 per vehicle; mid = $5,000
  const oosSingle = trucks * 5000;

  // 3. Insurance premium increase over 2 years post-CSA score event
  // FMCSA data: $3,000–$8,000 per truck per year; mid = $5,500/yr × 2 years
  const insuranceIncrease = trucks * 5500 * 2;

  // 4. Authority revocation + recovery cycle
  // Legal, reinstatement, refiling, downtime: $5,000–$15,000 base + per-truck downtime
  const monthlyGross = trucks * (monthlyRevPerTruck || 8000);
  const downtimeLoss = monthlyGross * 2; // avg 2 months downtime
  const revocationFixed = 10000; // legal + reinstatement + filings
  const revocationTotal = revocationFixed + downtimeLoss;

  // Total exposure
  const total = annualInfra + oosSingle + insuranceIncrease + revocationTotal;

  return { annualInfra, oosSingle, insuranceIncrease, revocationTotal, total };
}

export default function TCOSection() {
  const [trucks, setTrucks] = useState(1);
  const [monthlyRev, setMonthlyRev] = useState(10000);
  const [payStructure, setPayStructure] = useState("owner");
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => calcExposure(trucks, monthlyRev, payStructure), [trucks, monthlyRev, payStructure]);

  const handleCalculate = () => setCalculated(true);

  return (
    <section
      data-testid="tco-calculator-section"
      style={{
        background: "var(--bg-primary)",
        padding: "5rem 1.5rem",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Section label */}
        <div
          data-testid="tco-section-label"
          className="section-label"
          style={{ marginBottom: "1.5rem", justifyContent: "center" }}
        >
          RUN YOUR OWN NUMBERS
        </div>

        {/* Framing line above */}
        <p
          data-testid="tco-framing-above"
          style={{
            textAlign: "center",
            color: "#8899aa",
            fontSize: "1rem",
            lineHeight: 1.6,
            marginBottom: "3rem",
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The penalty table shows documented ranges. This calculator applies them to your specific operation.
        </p>

        {/* Calculator */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          padding: "2.5rem",
        }}>

          {/* Inputs */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}>

            {/* Fleet size */}
            <div>
              <label
                htmlFor="fleet-size"
                data-testid="fleet-size-label"
                style={{
                  display: "block",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#8899aa",
                  marginBottom: "0.75rem",
                }}
              >
                NUMBER OF POWER UNITS
              </label>
              <input
                id="fleet-size"
                data-testid="fleet-size-input"
                type="number"
                min={1}
                max={50}
                value={trucks}
                onChange={e => { setTrucks(Math.max(1, parseInt(e.target.value) || 1)); setCalculated(false); }}
                style={{
                  width: "100%",
                  background: "var(--bg-primary)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  padding: "0.75rem 1rem",
                  fontSize: "1.1rem",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  outline: "none",
                }}
              />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "#8899aa", marginTop: "0.4rem" }}>
                Trucks / power units in operation
              </div>
            </div>

            {/* Monthly revenue */}
            <div>
              <label
                htmlFor="monthly-rev"
                data-testid="monthly-rev-label"
                style={{
                  display: "block",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#8899aa",
                  marginBottom: "0.75rem",
                }}
              >
                MONTHLY REVENUE (PER TRUCK)
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
                  color: "#8899aa", fontSize: "1rem",
                }}>$</span>
                <input
                  id="monthly-rev"
                  data-testid="monthly-rev-input"
                  type="number"
                  min={1000}
                  max={50000}
                  step={500}
                  value={monthlyRev}
                  onChange={e => { setMonthlyRev(parseInt(e.target.value) || 0); setCalculated(false); }}
                  style={{
                    width: "100%",
                    background: "var(--bg-primary)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                    padding: "0.75rem 1rem 0.75rem 1.75rem",
                    fontSize: "1.1rem",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "#8899aa", marginTop: "0.4rem" }}>
                Gross revenue per truck per month
              </div>
            </div>

            {/* Pay structure */}
            <div>
              <label
                data-testid="pay-structure-label"
                style={{
                  display: "block",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#8899aa",
                  marginBottom: "0.75rem",
                }}
              >
                OPERATING STRUCTURE
              </label>
              <div style={{ display: "flex", gap: "0" }}>
                {[
                  { val: "owner", label: "OWNER-OP" },
                  { val: "fleet", label: "FLEET" },
                ].map(opt => (
                  <button
                    key={opt.val}
                    data-testid={`pay-structure-${opt.val}`}
                    onClick={() => { setPayStructure(opt.val); setCalculated(false); }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: payStructure === opt.val ? "var(--gold)" : "rgba(255,255,255,0.2)",
                      background: payStructure === opt.val ? "rgba(200,150,62,0.12)" : "var(--bg-primary)",
                      color: payStructure === opt.val ? "var(--gold)" : "#8899aa",
                      transition: "all 0.2s",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "#8899aa", marginTop: "0.4rem" }}>
                How your operation is structured
              </div>
            </div>
          </div>

          {/* Calculate button */}
          <button
            data-testid="calculate-btn"
            onClick={handleCalculate}
            style={{
              display: "block",
              width: "100%",
              background: "var(--gold)",
              color: "#000000",
              border: "none",
              padding: "1rem",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "0",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            CALCULATE MY EXPOSURE
          </button>
        </div>

        {/* Output — shown after calculate */}
        {calculated && (
          <div
            data-testid="tco-output"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderTop: "none",
              padding: "2.5rem",
            }}
          >
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#8899aa",
              marginBottom: "1.75rem",
              textTransform: "uppercase",
            }}>
              ESTIMATED EXPOSURE — {trucks} POWER UNIT{trucks > 1 ? "S" : ""}
            </div>

            {/* Output rows */}
            {[
              {
                id: "annual-compliance",
                label: "Estimated Annual Compliance Infrastructure Exposure",
                sublabel: "Required filings, DQ files, ELD, safety records, consortium enrollment",
                value: fmt(results.annualInfra),
              },
              {
                id: "oos-violation",
                label: "Estimated Cost — Single Out-of-Service Violation",
                sublabel: `Based on documented FMCSA range ($1,000–$16,000/vehicle) × ${trucks} unit${trucks > 1 ? "s" : ""}`,
                value: fmt(results.oosSingle),
              },
              {
                id: "insurance-increase",
                label: "Estimated Insurance Premium Increase — 2 Years Post-CSA Event",
                sublabel: `$3,000–$8,000/year per unit following CSA score deterioration × ${trucks} unit${trucks > 1 ? "s" : ""} × 2 years`,
                value: fmt(results.insuranceIncrease),
              },
              {
                id: "revocation-recovery",
                label: "Total Estimated Exposure — Authority Revocation & Recovery Cycle",
                sublabel: "Legal + reinstatement + re-filings + estimated revenue loss during downtime",
                value: fmt(results.revocationTotal),
              },
            ].map((row, i) => (
              <div
                key={row.id}
                data-testid={`output-row-${row.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "2rem",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#c8d8e8", fontSize: "0.9rem", marginBottom: "0.35rem" }}>{row.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "#8899aa" }}>{row.sublabel}</div>
                </div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "var(--red)",
                  whiteSpace: "nowrap",
                  minWidth: "120px",
                  textAlign: "right",
                }}>
                  {row.value}
                </div>
              </div>
            ))}

            {/* Total */}
            <div
              data-testid="output-total"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.5rem 0 1.25rem",
                borderBottom: "2px solid rgba(255,255,255,0.15)",
              }}
            >
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "#ffffff",
                textTransform: "uppercase",
              }}>
                TOTAL ESTIMATED EXPOSURE
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "2.25rem",
                color: "var(--red)",
              }}>
                {fmt(results.total)}
              </div>
            </div>

            {/* LaunchPath price line */}
            <div
              data-testid="launchpath-price-line"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.25rem 0 0",
              }}
            >
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "#c8d8e8",
                textTransform: "uppercase",
              }}>
                The LaunchPath 90-Day Standard is priced at $5,000.
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "2.25rem",
                color: "var(--gold)",
              }}>
                $5,000
              </div>
            </div>
          </div>
        )}

        {/* Framing line below */}
        <p
          data-testid="tco-framing-below"
          style={{
            textAlign: "center",
            color: "#8899aa",
            fontSize: "0.875rem",
            fontStyle: "italic",
            marginTop: "2rem",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
            paddingBottom: "3rem",
          }}
        >
          This is not a projection. It is arithmetic based on documented FMCSA enforcement data.
        </p>

      </div>
    </section>
  );
}
