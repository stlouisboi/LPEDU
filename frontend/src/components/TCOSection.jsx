import { useState, useMemo } from "react";

const fmt = (n) => "$" + Math.round(n).toLocaleString();

function calc(trucks, monthlyRev) {
  const annualInfra = trucks * 850;
  const oosSingle = trucks * 5000;
  const insuranceIncrease = trucks * 5500 * 2;
  const revocationTotal = 10000 + (trucks * (monthlyRev || 8000) * 2);
  const total = annualInfra + oosSingle + insuranceIncrease + revocationTotal;
  return { annualInfra, oosSingle, insuranceIncrease, revocationTotal, total };
}

export default function TCOSection() {
  const [trucks, setTrucks] = useState(1);
  const [monthlyRev, setMonthlyRev] = useState(10000);
  const [structure, setStructure] = useState("owner");
  const [done, setDone] = useState(false);
  const r = useMemo(() => calc(trucks, monthlyRev), [trucks, monthlyRev]);

  return (
    <section data-testid="tco-calculator-section" style={{
      background: "var(--bg-paper)",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid var(--divider-light)",
    }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        <p className="overline" data-testid="tco-section-label" style={{ marginBottom: "1.25rem", color: "var(--text-paper-heading)" }}>
          Run Your Own Numbers
        </p>
        <h2 style={{
          fontFamily: "'Manrope', sans-serif", fontWeight: 700,
          fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
          letterSpacing: "-0.02em", marginBottom: "1rem",
          color: "var(--text-paper-heading)",
        }}>
          The penalty table shows ranges. This applies them to your operation.
        </h2>
        <p data-testid="tco-framing-above" style={{
          fontFamily: "'Inter', sans-serif", fontSize: "1rem",
          color: "var(--text-paper)", lineHeight: 1.75, maxWidth: 580, marginBottom: "3.5rem",
        }}>
          Enter your operation size. The output shows your documented exposure against documented FMCSA enforcement data — before the LaunchPath program cost appears.
        </p>

        {/* Input panel */}
        <div style={{ border: "1px solid var(--divider-light)", padding: "2.5rem", marginBottom: 0, background: "#FFFFFF" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>

            {/* Fleet size */}
            <div>
              <label htmlFor="fleet" style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-paper-muted)", marginBottom: "0.75rem" }}>
                Power Units
              </label>
              <input id="fleet" data-testid="fleet-size-input" type="number" min={1} max={50} value={trucks}
                onChange={e => { setTrucks(Math.max(1, parseInt(e.target.value) || 1)); setDone(false); }}
                style={{
                  width: "100%", background: "#FFFFFF",
                  border: "1px solid var(--divider-light)", color: "var(--text-paper)",
                  padding: "0.875rem 1rem", fontSize: "1.25rem",
                  fontFamily: "'JetBrains Mono', monospace", outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "var(--text-paper-heading)"}
                onBlur={e => e.target.style.borderColor = "var(--divider-light)"}
              />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-paper-muted)", marginTop: "0.4rem" }}>Trucks / power units in operation</p>
            </div>

            {/* Monthly revenue */}
            <div>
              <label htmlFor="rev" style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-paper-muted)", marginBottom: "0.75rem" }}>
                Monthly Revenue / Truck
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-paper-muted)", fontFamily: "'JetBrains Mono', monospace" }}>$</span>
                <input id="rev" data-testid="monthly-rev-input" type="number" min={0} step={500} value={monthlyRev}
                  onChange={e => { setMonthlyRev(parseInt(e.target.value) || 0); setDone(false); }}
                  style={{
                    width: "100%", background: "#FFFFFF",
                    border: "1px solid var(--divider-light)", color: "var(--text-paper)",
                    padding: "0.875rem 1rem 0.875rem 1.75rem",
                    fontSize: "1.25rem", fontFamily: "'JetBrains Mono', monospace", outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--text-paper-heading)"}
                  onBlur={e => e.target.style.borderColor = "var(--divider-light)"}
                />
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-paper-muted)", marginTop: "0.4rem" }}>Gross monthly revenue per unit</p>
            </div>

            {/* Structure */}
            <div>
              <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-paper-muted)", marginBottom: "0.75rem" }}>
                Operating Structure
              </label>
              <div style={{ display: "flex", gap: 0 }}>
                {[["owner", "Owner-Op"], ["fleet", "Fleet"]].map(([val, label]) => (
                  <button key={val} data-testid={`pay-structure-${val}`}
                    onClick={() => { setStructure(val); setDone(false); }}
                    style={{
                      flex: 1, padding: "0.875rem", cursor: "pointer",
                      fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600,
                      border: "1px solid",
                      borderColor: structure === val ? "var(--text-paper-heading)" : "var(--divider-light)",
                      background: structure === val ? "rgba(27,42,74,0.07)" : "#FFFFFF",
                      color: structure === val ? "var(--text-paper-heading)" : "var(--text-paper-muted)",
                      transition: "all 0.2s",
                    }}
                  >{label}</button>
                ))}
              </div>
            </div>
          </div>

          <button data-testid="calculate-btn" onClick={() => setDone(true)}
            style={{
              width: "100%", padding: "1rem",
              background: "var(--gold-primary)", color: "var(--bg-onyx)",
              border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontWeight: 700,
              fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = "var(--gold-light)"}
            onMouseLeave={e => e.target.style.background = "var(--gold-primary)"}
          >
            Calculate Exposure
          </button>
        </div>

        {/* Output */}
        {done && (
          <div data-testid="tco-output" style={{ border: "1px solid var(--divider-light)", borderTop: "none", padding: "2.5rem", background: "#FFFFFF" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-paper-muted)", marginBottom: "2rem" }}>
              Estimated Exposure — {trucks} Power Unit{trucks !== 1 ? "s" : ""}
            </p>

            {[
              { id: "annual-compliance", label: "Annual compliance infrastructure exposure", sub: "Required filings, DQ files, ELD, safety records, consortium enrollment", val: r.annualInfra },
              { id: "oos-violation", label: `Single out-of-service violation — ${trucks} unit${trucks !== 1 ? "s" : ""}`, sub: "FMCSA documented range: $1,000–$16,000 per vehicle", val: r.oosSingle },
              { id: "insurance-increase", label: "Insurance premium increase — 2 years post-CSA event", sub: "$3,000–$8,000 per unit per year following CSA score deterioration", val: r.insuranceIncrease },
              { id: "revocation-recovery", label: "Authority revocation and recovery cycle", sub: "Legal fees, reinstatement, re-filings, estimated revenue loss during downtime", val: r.revocationTotal },
            ].map((row, i) => (
              <div key={row.id} data-testid={`output-row-${row.id}`} style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                gap: "2rem", padding: "1.25rem 0",
                borderBottom: "1px solid var(--divider-light)",
                animation: "tcoCountIn 0.4s ease both",
                animationDelay: `${i * 0.08}s`,
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "var(--text-paper)", marginBottom: "0.3rem" }}>{row.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "var(--text-paper-muted)" }}>{row.sub}</p>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.35rem", fontWeight: 500, color: "var(--red)", whiteSpace: "nowrap" }}>
                  {fmt(row.val)}
                </div>
              </div>
            ))}

            {/* Total */}
            <div data-testid="output-total" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.75rem 0 1.5rem", borderBottom: "1px solid var(--divider-light)" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-paper)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total estimated exposure</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "2rem", fontWeight: 500, color: "var(--red)" }}>{fmt(r.total)}</span>
            </div>

            {/* Price line */}
            <div data-testid="launchpath-price-line" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0 0" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "var(--text-paper)" }}>The LaunchPath 90-Day Standard is priced at $2,500.</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "2rem", fontWeight: 500, color: "var(--gold-primary)" }}>$2,500</span>
            </div>
          </div>
        )}

        {/* Closing framing */}
        <p data-testid="tco-framing-below" style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontStyle: "italic",
          color: "var(--text-paper-muted)", textAlign: "center",
          marginTop: "2.5rem", lineHeight: 1.7, paddingBottom: "1rem",
        }}>
          This is not a projection. It is arithmetic based on documented FMCSA enforcement data.
        </p>
      </div>
    </section>
  );
}
