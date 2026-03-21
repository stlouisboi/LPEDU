import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const API = process.env.REACT_APP_BACKEND_URL;
const GOLD = "#d4900a";
const NAVY = "#0b1628";
const BG = "#F5F5F5";

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt$ = (v) => `$${Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtCPM = (v) => `$${Number(v).toFixed(3)}/mi`;

const DEFAULTS = {
  equipmentPayment: 0, insurancePremium: 0, permitsSubscriptions: 0, parkingStorage: 0,
  avgFuelPrice: 3.50, avgMPG: 6.5, maintenanceReserve: 0.12, tiresWearables: 0.05,
  driverMode: "owner", hourlyRate: 25, hoursPerWeek: 60, taxReservePercent: 27,
  payStructure: "per_mile", ratePerMile: 0.50, empHourlyRate: 22, empHoursPerWeek: 50,
  payrollTaxPercent: 11, workersCompPercent: 8, drugTestingMonthly: 75, benefitsMonthly: 0, recruitmentMonthly: 0,
  milesPerMonth: 8000,
};

function calc(inp) {
  const totalFixed = inp.equipmentPayment + inp.insurancePremium + inp.permitsSubscriptions + inp.parkingStorage;
  const fixedCPM = inp.milesPerMonth > 0 ? totalFixed / inp.milesPerMonth : 0;
  const fuelCPM = inp.avgMPG > 0 ? inp.avgFuelPrice / inp.avgMPG : 0;
  const variableCPM = fuelCPM + inp.maintenanceReserve + inp.tiresWearables;
  let operatorMonthly = 0;
  if (inp.driverMode === "owner") {
    const gross = inp.hourlyRate * inp.hoursPerWeek * (52 / 12);
    operatorMonthly = gross * (1 + inp.taxReservePercent / 100);
  } else {
    const pay = inp.payStructure === "per_mile"
      ? inp.ratePerMile * inp.milesPerMonth
      : inp.empHourlyRate * inp.empHoursPerWeek * (52 / 12);
    operatorMonthly = pay * (1 + inp.payrollTaxPercent / 100 + inp.workersCompPercent / 100)
      + inp.drugTestingMonthly + inp.benefitsMonthly + inp.recruitmentMonthly;
  }
  const operatorCPM = inp.milesPerMonth > 0 ? operatorMonthly / inp.milesPerMonth : 0;
  const totalCPM = fixedCPM + variableCPM + operatorCPM;
  return {
    fixedCPM, variableCPM, operatorCPM, totalCPM,
    marginTarget: totalCPM * 1.30,
    monthlyBreakEven: totalCPM * inp.milesPerMonth,
    fuelCPM, totalFixed, operatorMonthly,
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────
function Label({ children }) {
  return <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(11,22,40,0.55)", marginBottom: 6, letterSpacing: "0.02em" }}>{children}</p>;
}
function CurrencyInput({ label, value, onChange, step = 1, placeholder = "0" }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(11,22,40,0.45)" }}>$</span>
        <input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} step={step} placeholder={placeholder}
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: NAVY, background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.15)", padding: "10px 12px 10px 28px", outline: "none", transition: "border-color 0.15s" }}
          onFocus={e => e.currentTarget.style.borderColor = GOLD}
          onBlur={e => e.currentTarget.style.borderColor = "rgba(11,22,40,0.15)"}
        />
      </div>
    </div>
  );
}
function NumberInput({ label, value, onChange, step = 1, suffix = "" }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ position: "relative" }}>
        <input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} step={step}
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: NAVY, background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.15)", padding: "10px 12px", outline: "none", transition: "border-color 0.15s", paddingRight: suffix ? 40 : 12 }}
          onFocus={e => e.currentTarget.style.borderColor = GOLD}
          onBlur={e => e.currentTarget.style.borderColor = "rgba(11,22,40,0.15)"}
        />
        {suffix && <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.40)" }}>{suffix}</span>}
      </div>
    </div>
  );
}
function Block({ title, code, open, onToggle, children }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", marginBottom: 12 }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", margin: "0 0 3px" }}>{code}</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: NAVY, margin: 0, letterSpacing: "-0.01em" }}>{title}</p>
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: "rgba(11,22,40,0.35)", lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <div style={{ padding: "0 24px 24px", borderTop: "1px solid rgba(11,22,40,0.07)" }}><div style={{ paddingTop: 20 }}>{children}</div></div>}
    </div>
  );
}
function Toggle({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", border: "1px solid rgba(11,22,40,0.15)", overflow: "hidden", width: "fit-content" }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          style={{ padding: "9px 20px", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", border: "none", cursor: "pointer", background: value === opt.value ? NAVY : "transparent", color: value === opt.value ? "#FFFFFF" : "rgba(11,22,40,0.55)", transition: "background 0.15s, color 0.15s" }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Access Gate ─────────────────────────────────────────────────────────────
function AccessGate({ children }) {
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    fetch(`${API}/api/tools/access`, { credentials: "include" })
      .then(r => r.json())
      .then(d => setStatus(d.has_access ? "ok" : d.logged_in ? "no_access" : "not_logged_in"))
      .catch(() => setStatus("not_logged_in"));
  }, []);
  if (status === "loading") return <div style={{ padding: "6rem 1.5rem", textAlign: "center", fontFamily: "'Inter', sans-serif", color: "rgba(11,22,40,0.45)" }}>Checking access…</div>;
  if (status === "not_logged_in") return (
    <div style={{ maxWidth: 520, margin: "6rem auto", background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", padding: "2.5rem" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, margin: "0 0 12px" }}>LP-TOOL-001 | ACCESS REQUIRED</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, color: NAVY, margin: "0 0 12px" }}>Login to Access the TCO Calculator</h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(11,22,40,0.60)", lineHeight: 1.7, margin: "0 0 24px" }}>This tool is available to LaunchPath enrolled members. Login to access your account.</p>
      <Link to="/login" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "12px 24px", textDecoration: "none" }}>Login to Access →</Link>
    </div>
  );
  if (status === "no_access") return (
    <div style={{ maxWidth: 520, margin: "6rem auto", background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", borderTop: `3px solid ${GOLD}`, padding: "2.5rem" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, margin: "0 0 12px" }}>LP-TOOL-001 | ENROLLED MEMBERS ONLY</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, color: NAVY, margin: "0 0 12px" }}>This tool is available to enrolled members.</h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(11,22,40,0.60)", lineHeight: 1.7, margin: "0 0 24px" }}>The TCO Calculator and Load Profitability Analyzer are included with the Document System Bundle ($497) and the LaunchPath Standard ($2,500).</p>
      <Link to="/compliance-library" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "12px 24px", textDecoration: "none" }}>See Enrollment Options →</Link>
    </div>
  );
  return children;
}

// ── Results Bar Chart ────────────────────────────────────────────────────────
function CPMBar({ fixedCPM, variableCPM, operatorCPM, totalCPM }) {
  if (totalCPM === 0) return null;
  const pct = (v) => `${((v / totalCPM) * 100).toFixed(1)}%`;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", height: 10, overflow: "hidden", borderRadius: 2, marginBottom: 8 }}>
        <div style={{ width: pct(fixedCPM), background: "#1B4F8A" }} title={`Fixed: ${pct(fixedCPM)}`} />
        <div style={{ width: pct(variableCPM), background: "#d4900a" }} title={`Variable: ${pct(variableCPM)}`} />
        <div style={{ width: pct(operatorCPM), background: "#2C7A5A" }} title={`Operator: ${pct(operatorCPM)}`} />
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[["#1B4F8A", "Fixed"], ["#d4900a", "Variable"], ["#2C7A5A", "Operator"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, background: c, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(11,22,40,0.55)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function TCOCalculatorPage() {
  const [inp, setInp] = useState(DEFAULTS);
  const [open, setOpen] = useState({ fixed: true, variable: true, operator: true });
  const [saveState, setSaveState] = useState("idle");
  const set = useCallback((key) => (val) => setInp(prev => ({ ...prev, [key]: val })), []);
  const result = useMemo(() => calc(inp), [inp]);

  // Load saved on mount
  useEffect(() => {
    fetch(`${API}/api/cpm/saved`, { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.saved?.inputs) setInp(prev => ({ ...prev, ...d.saved.inputs })); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaveState("saving");
    try {
      await fetch(`${API}/api/cpm/save`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fixed_cpm: result.fixedCPM, variable_cpm: result.variableCPM, total_cpm: result.totalCPM, inputs: inp }),
      });
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch { setSaveState("idle"); }
  };

  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Navbar />
      <div style={{ background: NAVY, borderBottom: "1px solid rgba(212,144,10,0.20)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem 3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>LP-TOOL-001 — TCO CALCULATOR</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", letterSpacing: "-0.025em", marginBottom: 10 }}>True Cost of Ownership</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.60)", lineHeight: 1.7, maxWidth: 520 }}>Calculate your real cost-per-mile across all cost categories. This is your break-even rate — the minimum revenue per mile to cover all operating costs.</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem 6rem" }}>
        <AccessGate>

          {/* Block 1: Fixed Costs */}
          <Block title="Fixed Monthly Costs" code="BLOCK 1 — FIXED" open={open.fixed} onToggle={() => setOpen(s => ({ ...s, fixed: !s.fixed }))}>
            <div style={grid2}>
              <CurrencyInput label="Equipment Payment" value={inp.equipmentPayment} onChange={set("equipmentPayment")} />
              <CurrencyInput label="Insurance Premium" value={inp.insurancePremium} onChange={set("insurancePremium")} />
              <CurrencyInput label="Permits & Subscriptions" value={inp.permitsSubscriptions} onChange={set("permitsSubscriptions")} />
              <CurrencyInput label="Parking / Storage" value={inp.parkingStorage} onChange={set("parkingStorage")} />
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(11,22,40,0.07)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.50)" }}>Monthly subtotal</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: NAVY }}>{fmt$(result.totalFixed)}/mo</span>
            </div>
          </Block>

          {/* Block 2: Variable Costs */}
          <Block title="Variable Operating Costs" code="BLOCK 2 — VARIABLE" open={open.variable} onToggle={() => setOpen(s => ({ ...s, variable: !s.variable }))}>
            <div style={grid2}>
              <CurrencyInput label="Average Fuel Price ($/gal)" value={inp.avgFuelPrice} onChange={set("avgFuelPrice")} step={0.01} />
              <NumberInput label="Average MPG" value={inp.avgMPG} onChange={set("avgMPG")} step={0.1} />
              <CurrencyInput label="Maintenance Reserve ($/mi)" value={inp.maintenanceReserve} onChange={set("maintenanceReserve")} step={0.01} />
              <CurrencyInput label="Tires & Wearables ($/mi)" value={inp.tiresWearables} onChange={set("tiresWearables")} step={0.01} />
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(11,22,40,0.07)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.50)" }}>Fuel CPM · {fmtCPM(result.fuelCPM)} &nbsp;|&nbsp; Variable subtotal</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: NAVY }}>{fmtCPM(result.variableCPM)}</span>
            </div>
          </Block>

          {/* Block 3: Operator Costs */}
          <Block title="Operator / Driver Costs" code="BLOCK 3 — OPERATOR" open={open.operator} onToggle={() => setOpen(s => ({ ...s, operator: !s.operator }))}>
            <div style={{ marginBottom: 20 }}>
              <Label>Driver Mode</Label>
              <Toggle value={inp.driverMode} onChange={set("driverMode")} options={[{ value: "owner", label: "Owner-Operator" }, { value: "employed", label: "Employed Driver" }]} />
            </div>
            {inp.driverMode === "owner" ? (
              <div style={grid2}>
                <CurrencyInput label="Target Hourly Rate" value={inp.hourlyRate} onChange={set("hourlyRate")} />
                <NumberInput label="Hours Per Week" value={inp.hoursPerWeek} onChange={set("hoursPerWeek")} />
                <NumberInput label="Tax Reserve %" value={inp.taxReservePercent} onChange={set("taxReservePercent")} suffix="%" />
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  <Label>Pay Structure</Label>
                  <Toggle value={inp.payStructure} onChange={set("payStructure")} options={[{ value: "per_mile", label: "Per Mile" }, { value: "hourly", label: "Hourly" }]} />
                </div>
                <div style={grid2}>
                  {inp.payStructure === "per_mile"
                    ? <CurrencyInput label="Rate Per Mile" value={inp.ratePerMile} onChange={set("ratePerMile")} step={0.01} />
                    : <><CurrencyInput label="Hourly Rate" value={inp.empHourlyRate} onChange={set("empHourlyRate")} /><NumberInput label="Hours Per Week" value={inp.empHoursPerWeek} onChange={set("empHoursPerWeek")} /></>
                  }
                  <NumberInput label="Payroll Tax %" value={inp.payrollTaxPercent} onChange={set("payrollTaxPercent")} suffix="%" />
                  <NumberInput label="Workers Comp %" value={inp.workersCompPercent} onChange={set("workersCompPercent")} suffix="%" />
                  <CurrencyInput label="Drug Testing ($/mo)" value={inp.drugTestingMonthly} onChange={set("drugTestingMonthly")} />
                  <CurrencyInput label="Benefits ($/mo)" value={inp.benefitsMonthly} onChange={set("benefitsMonthly")} />
                  <CurrencyInput label="Recruitment ($/mo)" value={inp.recruitmentMonthly} onChange={set("recruitmentMonthly")} />
                </div>
              </>
            )}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(11,22,40,0.07)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.50)" }}>Operator monthly · {fmt$(result.operatorMonthly)}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: NAVY }}>{fmtCPM(result.operatorCPM)}</span>
            </div>
          </Block>

          {/* Operating Assumptions */}
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", padding: "18px 24px", marginBottom: 12 }}>
            <Label>Projected Miles Per Month</Label>
            <NumberInput label="" value={inp.milesPerMonth} onChange={set("milesPerMonth")} suffix="mi" />
          </div>

          {/* Results Panel */}
          <div data-testid="tco-results" style={{ background: NAVY, padding: "28px 28px 24px", marginTop: 20, marginBottom: 12 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", margin: "0 0 16px" }}>YOUR COST-PER-MILE BREAKDOWN</p>
            <CPMBar fixedCPM={result.fixedCPM} variableCPM={result.variableCPM} operatorCPM={result.operatorCPM} totalCPM={result.totalCPM} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {[["Fixed Costs", result.fixedCPM, "#7BA7D4"], ["Variable Costs", result.variableCPM, GOLD], ["Operator Costs", result.operatorCPM, "#7BC4A4"]].map(([l, v, c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.60)" }}>{l}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: c }}>{fmtCPM(v)}</span>
                </div>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.15)", margin: "4px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>TOTAL CPM</span>
                <span data-testid="tco-total-cpm" style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>{fmtCPM(result.totalCPM)}</span>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.50)" }}>Break-Even Rate</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.80)" }}>{fmtCPM(result.totalCPM)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: GOLD }}>30% Margin Target</span>
                <span data-testid="tco-margin-target" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: GOLD }}>{fmtCPM(result.marginTarget)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.50)" }}>Monthly Break-Even Revenue</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.80)" }}>{fmt$(result.monthlyBreakEven)}</span>
              </div>
            </div>
          </div>

          {/* Save + Link to LP-TOOL-002 */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <button data-testid="tco-save-btn" onClick={handleSave} disabled={saveState === "saving"}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: saveState === "saved" ? "#1B5E20" : NAVY, background: saveState === "saved" ? "#E8F5E9" : GOLD, border: "none", padding: "12px 24px", cursor: "pointer", transition: "background 0.2s" }}>
              {saveState === "saved" ? "✓ Saved" : saveState === "saving" ? "Saving…" : "Save Calculation"}
            </button>
            <button onClick={() => setInp(DEFAULTS)} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(11,22,40,0.45)", background: "transparent", border: "1px solid rgba(11,22,40,0.18)", padding: "12px 20px", cursor: "pointer" }}>
              Start Over
            </button>
            <Link to="/tools/load-analyzer" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: GOLD, textDecoration: "none", marginLeft: "auto" }}>
              Analyze a Load with this CPM →
            </Link>
          </div>

          {/* Disclaimer */}
          <div style={{ background: "rgba(11,22,40,0.04)", border: "1px solid rgba(11,22,40,0.08)", padding: "16px 20px" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(11,22,40,0.40)", margin: "0 0 8px" }}>EDUCATIONAL USE ONLY</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.45)", lineHeight: 1.7, margin: 0 }}>This calculator is for educational and planning purposes only. Results are based on the values you entered and do not constitute financial, tax, or business advice. Verify all figures with your accountant or financial advisor before making business decisions.</p>
          </div>
        </AccessGate>
      </div>
      <FooterSection />
    </div>
  );
}
