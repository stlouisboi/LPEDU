import React, { useState, useMemo, useEffect } from "react";

const API = process.env.REACT_APP_BACKEND_URL;
const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";
const display = "'Playfair Display', serif";

// ── Helpers ──────────────────────────────────────────────────────────────────
const n = (v) => parseFloat(v) || 0;
const fmtCPM = (v) => !isFinite(v) || isNaN(v) || v === 0 ? "$0.0000" : `$${v.toFixed(4)}`;
const fmtDollar = (v) =>
  !isFinite(v) || isNaN(v)
    ? "$0.00"
    : `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── Calculation logic (spec-exact) ───────────────────────────────────────────
function calcFixed(inp) {
  const sum =
    n(inp.truckPayment) + n(inp.insurancePremium) + n(inp.irpRegistration) +
    n(inp.ucr) + n(inp.eldSubscription) + n(inp.accounting) +
    n(inp.loadBoard) + n(inp.phone) + n(inp.otherFixed);
  const miles = n(inp.projectedMiles);
  return miles > 0 ? sum / miles : 0;
}

function calcVariable(inp) {
  const diesel = n(inp.dieselPrice);
  const mpg = n(inp.mpg) || 7;
  const maintenance = n(inp.maintenanceReserve);
  const numTires = n(inp.numTires);
  const costPerTire = n(inp.costPerTire);
  const tireMiles = n(inp.expectedTireMiles);
  const fuelCPM = mpg > 0 ? diesel / mpg : 0;
  const tireCPM = tireMiles > 0 ? (numTires * costPerTire) / tireMiles : 0;
  return { fuelCPM, tireCPM, maintenanceCPM: maintenance, variableCPM: fuelCPM + maintenance + tireCPM };
}

function calcLoad(inp, totalCPM) {
  const loadedMiles = n(inp.loadedMiles);
  const deadheadMiles = n(inp.deadheadMiles);
  const offeredRate = n(inp.offeredRate);
  const factoringRate = n(inp.factoringRate);
  const totalMiles = loadedMiles + deadheadMiles;
  const breakEven = totalMiles * totalCPM;
  const factoringFee = offeredRate * (factoringRate / 100);
  const netRevenue = offeredRate - factoringFee;
  const loadProfit = netRevenue - breakEven;
  const profitPerMile = totalMiles > 0 ? loadProfit / totalMiles : 0;
  let badge = "GO";
  if (loadProfit < 0) badge = "DECLINE";
  else if (breakEven > 0 && loadProfit < breakEven * 0.1) badge = "NEGOTIATE";
  return { totalMiles, breakEven, grossRevenue: offeredRate, factoringFee, netRevenue, loadProfit, profitPerMile, badge };
}

// ── Step Indicator ────────────────────────────────────────────────────────────
function StepIndicator({ step, total, dark }) {
  return (
    <div data-testid="cpm-step-indicator" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
      {Array.from({ length: total }, (_, i) => (
        <React.Fragment key={i}>
          <div style={{
            width: i + 1 === step ? 28 : 10,
            height: 10,
            borderRadius: 5,
            background: i + 1 === step ? "#d4900a" : i + 1 < step ? "#22c55e" : dark ? "rgba(255,255,255,0.12)" : "rgba(0,34,68,0.15)",
            transition: "all 0.2s",
          }} />
        </React.Fragment>
      ))}
      <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,34,68,0.4)", marginLeft: "0.5rem" }}>
        STEP {step} OF {total}
      </p>
    </div>
  );
}

// ── Input Field ───────────────────────────────────────────────────────────────
function Field({ label, id, value, onChange, prefix, suffix, step = "any", min = "0", placeholder = "0", helpText, dark, optional }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label htmlFor={id} style={{ fontFamily: sans, fontSize: "0.762rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,34,68,0.5)" }}>
        {label}{optional && <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 4, opacity: 0.6 }}>(optional)</span>}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && <span style={{ position: "absolute", left: "0.875rem", fontFamily: sans, fontSize: "1rem", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,34,68,0.4)", pointerEvents: "none", zIndex: 1 }}>{prefix}</span>}
        <input
          id={id}
          data-testid={`cpm-input-${id}`}
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: `0.75rem ${suffix ? "2.25rem" : "0.875rem"} 0.75rem ${prefix ? "1.75rem" : "0.875rem"}`,
            fontFamily: sans,
            fontSize: "1rem",
            background: dark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
            border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,34,68,0.14)"}`,
            color: dark ? "#FFFFFF" : "#0b1628",
            outline: "none",
            boxSizing: "border-box",
            MozAppearance: "textfield",
          }}
        />
        {suffix && <span style={{ position: "absolute", right: "0.875rem", fontFamily: sans, fontSize: "1rem", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,34,68,0.4)", pointerEvents: "none" }}>{suffix}</span>}
      </div>
      {helpText && <p style={{ fontFamily: sans, fontSize: "0.762rem", color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,34,68,0.38)", lineHeight: 1.4 }}>{helpText}</p>}
    </div>
  );
}

// ── Nav Buttons ───────────────────────────────────────────────────────────────
function NavButtons({ onBack, onNext, nextLabel = "Next →", nextDisabled, dark }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", justifyContent: "flex-end" }}>
      {onBack && (
        <button onClick={onBack} data-testid="cpm-back-btn" style={{ padding: "0.75rem 1.5rem", fontFamily: sans, fontWeight: 600, fontSize: "var(--text-sm)", letterSpacing: "0.06em", textTransform: "uppercase", background: "none", border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,34,68,0.18)"}`, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,34,68,0.55)", cursor: "pointer", transition: "opacity 0.15s" }}>
          ← Back
        </button>
      )}
      {onNext && (
        <button onClick={onNext} data-testid="cpm-next-btn" disabled={nextDisabled} style={{ padding: "0.75rem 2rem", fontFamily: sans, fontWeight: 700, fontSize: "var(--text-sm)", letterSpacing: "0.08em", textTransform: "uppercase", background: nextDisabled ? (dark ? "rgba(212,144,10,0.3)" : "rgba(0,34,68,0.2)") : "#d4900a", border: "none", color: nextDisabled ? (dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)") : "#0b1628", cursor: nextDisabled ? "not-allowed" : "pointer", transition: "opacity 0.15s" }}>
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionLabel({ text, dark }) {
  return (
    <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "rgba(212,144,10,0.7)" : "#d4900a", marginBottom: "1.5rem" }}>
      {text}
    </p>
  );
}

// ── Results Card ──────────────────────────────────────────────────────────────
function ResultsCard({ fixedCPM, variableCPM, totalCPM }) {
  return (
    <div data-testid="cpm-results-card">
      {/* Hero CPM */}
      <div style={{ background: "#0b1628", padding: "2.5rem 2rem", marginBottom: "1.5rem", textAlign: "center", border: "1px solid rgba(212,144,10,0.25)" }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", marginBottom: "0.75rem" }}>
          YOUR TOTAL COST PER MILE
        </p>
        <p data-testid="cpm-total-display" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(3rem, 8vw, 4.5rem)", color: "#d4900a", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.5rem" }}>
          {fmtCPM(totalCPM)}
        </p>
        <p style={{ fontFamily: sans, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
          per mile operated · minimum acceptable rate
        </p>
      </div>

      {/* Breakdown grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(0,34,68,0.1)", border: "1px solid rgba(0,34,68,0.1)" }}>
        {[
          { label: "Fixed CPM", value: fmtCPM(fixedCPM), testid: "cpm-fixed-display" },
          { label: "Variable CPM", value: fmtCPM(variableCPM), testid: "cpm-variable-display" },
        ].map((item) => (
          <div key={item.label} style={{ background: "#F8F9FB", padding: "1.25rem 1.5rem" }}>
            <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,34,68,0.45)", marginBottom: "0.4rem" }}>{item.label}</p>
            <p data-testid={item.testid} style={{ fontFamily: display, fontWeight: 700, fontSize: "1.5rem", color: "#0b1628", letterSpacing: "-0.01em" }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Load Profitability Output ─────────────────────────────────────────────────
function LoadOutput({ result }) {
  const badgeColor = result.badge === "GO" ? "#1D9E75" : result.badge === "NEGOTIATE" ? "#d4900a" : "#E24B4A";
  const profitColor = result.loadProfit >= 0 ? "#1D9E75" : "#E24B4A";
  return (
    <div data-testid="cpm-load-output" style={{ marginTop: "1.5rem" }}>
      {/* Decision badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem", padding: "1.25rem 1.5rem", background: `${badgeColor}10`, border: `1px solid ${badgeColor}40` }}>
        <div style={{ width: 10, height: 10, background: badgeColor, borderRadius: "50%", flexShrink: 0 }} />
        <span data-testid="cpm-decision-badge" style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", color: badgeColor, textTransform: "uppercase" }}>{result.badge}</span>
        <span style={{ fontFamily: sans, fontSize: "0.857rem", color: "rgba(0,34,68,0.6)", marginLeft: 4 }}>
          {result.badge === "GO" ? "Acceptable margin — take the load." : result.badge === "NEGOTIATE" ? "Within 10% of break-even — push the rate up." : "Below break-even — this load loses money."}
        </span>
      </div>

      {/* Metrics grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "rgba(0,34,68,0.08)", border: "1px solid rgba(0,34,68,0.08)" }}>
        {[
          { label: "Total Miles", value: result.totalMiles > 0 ? `${result.totalMiles.toLocaleString()} mi` : "—" },
          { label: "Break-Even Revenue", value: fmtDollar(result.breakEven) },
          { label: "Gross Revenue", value: fmtDollar(result.grossRevenue) },
          { label: "Factoring Fee", value: result.factoringFee > 0 ? fmtDollar(result.factoringFee) : "—" },
          { label: "Net Revenue", value: fmtDollar(result.netRevenue) },
          { label: "Profit Per Mile", value: isFinite(result.profitPerMile) ? `$${result.profitPerMile.toFixed(4)}` : "—" },
        ].map((item) => (
          <div key={item.label} style={{ background: "#F8F9FB", padding: "1rem 1.25rem" }}>
            <p style={{ fontFamily: mono, fontSize: "0.44rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,34,68,0.4)", marginBottom: "0.35rem" }}>{item.label}</p>
            <p style={{ fontFamily: display, fontWeight: 700, fontSize: "1.15rem", color: "#0b1628" }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Load Profit — emphasized */}
      <div style={{ marginTop: "1px", background: "#F8F9FB", border: "1px solid rgba(0,34,68,0.08)", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,34,68,0.45)" }}>LOAD PROFIT / LOSS</p>
        <p data-testid="cpm-load-profit" style={{ fontFamily: display, fontWeight: 800, fontSize: "2rem", color: profitColor, letterSpacing: "-0.02em" }}>
          {result.loadProfit >= 0 ? "+" : ""}{fmtDollar(result.loadProfit)}
        </p>
      </div>
    </div>
  );
}

// ── Email Gate (public only) ──────────────────────────────────────────────────
function EmailGate({ onSubmit, loading, dark }) {
  const [email, setEmail] = useState("");
  return (
    <div style={{ background: dark ? "rgba(212,144,10,0.06)" : "#0b1628", border: "1px solid rgba(212,144,10,0.25)", padding: "2rem", marginBottom: "1.5rem" }}>
      <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.625rem" }}>
        YOUR RESULTS ARE READY
      </p>
      <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
        Enter your email to see your full cost breakdown.
      </h3>
      <p style={{ fontFamily: sans, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        No sales sequence. No pressure. Your CPM breakdown arrives immediately.
      </p>
      <form onSubmit={(e) => { e.preventDefault(); if (email) onSubmit(email); }} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          data-testid="cpm-email-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your operating email"
          style={{ flex: 1, minWidth: 200, padding: "0.875rem 1rem", fontFamily: sans, fontSize: "1rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", outline: "none", boxSizing: "border-box" }}
        />
        <button data-testid="cpm-email-submit" type="submit" disabled={loading} style={{ padding: "0.875rem 1.75rem", fontFamily: sans, fontWeight: 700, fontSize: "var(--text-sm)", letterSpacing: "0.08em", textTransform: "uppercase", background: "#d4900a", border: "none", color: "#0b1628", cursor: loading ? "wait" : "pointer" }}>
          {loading ? "Sending…" : "REVEAL RESULTS"}
        </button>
      </form>
    </div>
  );
}

// ── Main CPMCalculator ────────────────────────────────────────────────────────
export function CPMCalculator({ variant = "public" }) {
  const dark = variant === "portal";
  const totalSteps = variant === "portal" ? 4 : 3;

  const [step, setStep] = useState(1);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [savedCPM, setSavedCPM] = useState(null);
  const [cpmSaved, setCpmSaved] = useState(false);

  const [inp, setInp] = useState({
    // Step 1 — Fixed
    truckPayment: "", insurancePremium: "", irpRegistration: "", ucr: "",
    eldSubscription: "", accounting: "", loadBoard: "", phone: "",
    otherFixed: "", otherFixedLabel: "", projectedMiles: "",
    // Step 2 — Variable
    dieselPrice: "", mpg: "7", maintenanceReserve: "0.12",
    numTires: "", costPerTire: "", expectedTireMiles: "",
    // Step 4 — Load
    loadedMiles: "", deadheadMiles: "", offeredRate: "", factoringRate: "0",
  });

  const set = (key) => (val) => setInp((prev) => ({ ...prev, [key]: val }));

  // Load saved CPM for portal
  useEffect(() => {
    if (variant !== "portal") return;
    fetch(`${API}/api/cpm/saved`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.saved?.total_cpm) setSavedCPM(d.saved.total_cpm); })
      .catch(() => {});
  }, [variant]);

  // Calculations (live)
  const fixedCPM = useMemo(() => calcFixed(inp), [inp]);
  const { fuelCPM, tireCPM, maintenanceCPM, variableCPM } = useMemo(() => calcVariable(inp), [inp]);
  const totalCPM = fixedCPM + variableCPM;
  const loadResult = useMemo(() => calcLoad(inp, totalCPM), [inp, totalCPM]);

  // Save to MongoDB when portal user reaches Step 3
  useEffect(() => {
    if (variant !== "portal" || step !== 3 || cpmSaved || totalCPM === 0) return;
    setCpmSaved(true);
    fetch(`${API}/api/cpm/save`, {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fixed_cpm: fixedCPM, variable_cpm: variableCPM, total_cpm: totalCPM, inputs: inp }),
    }).catch(() => {});
  }, [step, variant, totalCPM, cpmSaved, fixedCPM, variableCPM, inp]);

  // Email gate submit (public)
  const handleEmailGate = async (email) => {
    setEmailLoading(true);
    fetch(`${API}/api/cpm/email-capture`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setEmailSubmitted(true);
    setEmailLoading(false);
  };

  // Validation
  const step1Valid = n(inp.projectedMiles) > 0;
  const step2Valid = n(inp.dieselPrice) > 0 && n(inp.mpg) > 0 &&
    (n(inp.numTires) === 0 || (n(inp.numTires) > 0 && n(inp.expectedTireMiles) > 0));

  // Card style
  const card = { background: dark ? "rgba(255,255,255,0.02)" : "#FFFFFF", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,34,68,0.1)"}`, padding: "2rem", marginBottom: "1.25rem" };
  const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" };
  const headingColor = dark ? "#FFFFFF" : "#0b1628";

  return (
    <div data-testid="cpm-calculator" style={{ fontFamily: sans, maxWidth: 860, margin: "0 auto" }}>
      <StepIndicator step={step} total={totalSteps} dark={dark} />

      {/* ── Step 1: Fixed Costs ──────────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <SectionLabel text="LP-CPM | STEP 1 — FIXED COSTS" dark={dark} />
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: headingColor, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Monthly Fixed Costs
          </h2>
          <p style={{ fontFamily: sans, fontSize: "1rem", color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,34,68,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Enter all monthly costs that stay constant regardless of miles driven.
          </p>

          <div style={card}>
            <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,34,68,0.35)", marginBottom: "1.25rem" }}>MONTHLY FIXED COSTS</p>
            <div style={grid2}>
              <Field label="Truck Payment" id="truckPayment" value={inp.truckPayment} onChange={set("truckPayment")} prefix="$" step="0.01" dark={dark} helpText="Loan or lease payment" />
              <Field label="Insurance Premium" id="insurancePremium" value={inp.insurancePremium} onChange={set("insurancePremium")} prefix="$" step="0.01" dark={dark} helpText="Monthly installment" />
              <Field label="IRP Registration" id="irpRegistration" value={inp.irpRegistration} onChange={set("irpRegistration")} prefix="$" step="0.01" dark={dark} helpText="Annual ÷ 12" />
              <Field label="UCR" id="ucr" value={inp.ucr} onChange={set("ucr")} prefix="$" step="0.01" dark={dark} helpText="Annual ÷ 12" />
              <Field label="ELD Subscription" id="eldSubscription" value={inp.eldSubscription} onChange={set("eldSubscription")} prefix="$" step="0.01" dark={dark} />
              <Field label="Accounting / Bookkeeping" id="accounting" value={inp.accounting} onChange={set("accounting")} prefix="$" step="0.01" dark={dark} optional />
              <Field label="Load Board" id="loadBoard" value={inp.loadBoard} onChange={set("loadBoard")} prefix="$" step="0.01" dark={dark} optional />
              <Field label="Phone / Communications" id="phone" value={inp.phone} onChange={set("phone")} prefix="$" step="0.01" dark={dark} optional />
              <Field label="Other Fixed" id="otherFixed" value={inp.otherFixed} onChange={set("otherFixed")} prefix="$" step="0.01" dark={dark} optional />
            </div>
          </div>

          <div style={{ ...card, borderColor: dark ? "rgba(212,144,10,0.25)" : "rgba(212,144,10,0.4)" }}>
            <Field label="Projected Monthly Miles" id="projectedMiles" value={inp.projectedMiles} onChange={set("projectedMiles")} step="1" dark={dark} helpText="Your estimated miles per month (required)" />
          </div>

          <NavButtons onNext={() => setStep(2)} nextDisabled={!step1Valid} dark={dark} />
        </div>
      )}

      {/* ── Step 2: Variable Costs ───────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <SectionLabel text="LP-CPM | STEP 2 — VARIABLE COSTS" dark={dark} />
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: headingColor, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Variable Cost Per Mile
          </h2>
          <p style={{ fontFamily: sans, fontSize: "1rem", color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,34,68,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Costs that scale directly with miles driven. Defaults are pre-filled based on industry averages.
          </p>

          <div style={card}>
            <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,34,68,0.35)", marginBottom: "1.25rem" }}>FUEL</p>
            <div style={grid2}>
              <Field label="Diesel Price / Gallon" id="dieselPrice" value={inp.dieselPrice} onChange={set("dieselPrice")} prefix="$" step="0.001" dark={dark} placeholder="3.800" />
              <Field label="Vehicle MPG" id="mpg" value={inp.mpg} onChange={set("mpg")} step="0.1" dark={dark} helpText="Default: 7 MPG" />
            </div>
          </div>

          <div style={card}>
            <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,34,68,0.35)", marginBottom: "1.25rem" }}>MAINTENANCE</p>
            <Field label="Maintenance Reserve Per Mile" id="maintenanceReserve" value={inp.maintenanceReserve} onChange={set("maintenanceReserve")} prefix="$" step="0.01" dark={dark} helpText="Default: $0.12 / mile" />
          </div>

          <div style={card}>
            <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,34,68,0.35)", marginBottom: "1.25rem" }}>TIRES</p>
            <div style={grid2}>
              <Field label="Number of Tires" id="numTires" value={inp.numTires} onChange={set("numTires")} step="1" dark={dark} helpText="Total on vehicle (typically 18)" />
              <Field label="Cost Per Tire" id="costPerTire" value={inp.costPerTire} onChange={set("costPerTire")} prefix="$" step="1" dark={dark} />
              <Field label="Miles Per Tire Set" id="expectedTireMiles" value={inp.expectedTireMiles} onChange={set("expectedTireMiles")} step="1000" dark={dark} helpText="Expected miles before replacement" />
            </div>
          </div>

          {/* Live preview */}
          {n(inp.dieselPrice) > 0 && n(inp.mpg) > 0 && (
            <div style={{ display: "flex", gap: "1px", background: "rgba(212,144,10,0.15)", border: "1px solid rgba(212,144,10,0.2)", marginBottom: "0.5rem" }}>
              {[
                { l: "Fuel CPM", v: fmtCPM(fuelCPM) },
                { l: "Maint CPM", v: fmtCPM(maintenanceCPM) },
                { l: "Tire CPM", v: fmtCPM(tireCPM) },
                { l: "Variable Total", v: fmtCPM(variableCPM) },
              ].map((item) => (
                <div key={item.l} style={{ flex: 1, padding: "0.75rem 1rem", background: dark ? "rgba(212,144,10,0.05)" : "rgba(212,144,10,0.04)" }}>
                  <p style={{ fontFamily: mono, fontSize: "0.44rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.7)", marginBottom: "0.25rem" }}>{item.l}</p>
                  <p style={{ fontFamily: display, fontWeight: 700, fontSize: "1rem", color: dark ? "#d4900a" : "#0b1628" }}>{item.v}</p>
                </div>
              ))}
            </div>
          )}

          <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!step2Valid} dark={dark} />
        </div>
      )}

      {/* ── Step 3: Results ──────────────────────────────────────────────── */}
      {step === 3 && (
        <div>
          <SectionLabel text="LP-CPM | STEP 3 — COST BREAKDOWN" dark={dark} />
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: headingColor, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            Your Cost Per Mile
          </h2>

          {/* Public: email gate before results */}
          {variant === "public" && !emailSubmitted && (
            <EmailGate onSubmit={handleEmailGate} loading={emailLoading} dark={dark} />
          )}

          {/* Results — always shown in portal, shown after gate in public */}
          {(variant === "portal" || emailSubmitted) && (
            <ResultsCard fixedCPM={fixedCPM} variableCPM={variableCPM} totalCPM={totalCPM} />
          )}

          {/* Portal: saved CPM banner */}
          {variant === "portal" && cpmSaved && (
            <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#22c55e", marginTop: "1rem" }}>
              ✓ CPM SAVED TO YOUR RECORD
            </p>
          )}

          <NavButtons
            onBack={() => setStep(2)}
            onNext={variant === "portal" ? () => setStep(4) : undefined}
            nextLabel="Load Analysis →"
            dark={dark}
          />
        </div>
      )}

      {/* ── Step 4: Load Profitability (portal only) ─────────────────────── */}
      {step === 4 && variant === "portal" && (
        <div>
          <SectionLabel text="LP-CPM | STEP 4 — LOAD PROFITABILITY" dark={dark} />
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: headingColor, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Load Profitability Analysis
          </h2>

          {savedCPM && totalCPM === 0 && (
            <div style={{ background: "rgba(212,144,10,0.07)", border: "1px solid rgba(212,144,10,0.2)", padding: "0.875rem 1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4900a" }}>
                Using your saved CPM: {fmtCPM(savedCPM)}
              </p>
            </div>
          )}

          <p style={{ fontFamily: sans, fontSize: "1rem", color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,34,68,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Enter a load's details to instantly see if it's worth taking based on your real cost structure.
          </p>

          <div style={card}>
            <div style={grid2}>
              <Field label="Loaded Miles" id="loadedMiles" value={inp.loadedMiles} onChange={set("loadedMiles")} step="1" dark={dark} />
              <Field label="Deadhead Miles" id="deadheadMiles" value={inp.deadheadMiles} onChange={set("deadheadMiles")} step="1" dark={dark} helpText="Miles to pickup" optional />
              <Field label="Offered Rate" id="offeredRate" value={inp.offeredRate} onChange={set("offeredRate")} prefix="$" step="0.01" dark={dark} helpText="Total dollars offered" />
              <Field label="Factoring Rate" id="factoringRate" value={inp.factoringRate} onChange={set("factoringRate")} suffix="%" step="0.1" dark={dark} helpText="Default: 0%" optional />
            </div>
          </div>

          {n(inp.loadedMiles) > 0 && n(inp.offeredRate) > 0 && (
            <LoadOutput result={calcLoad(inp, totalCPM > 0 ? totalCPM : (savedCPM || 0))} />
          )}

          <NavButtons onBack={() => setStep(3)} dark={dark} />
        </div>
      )}

      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
}
