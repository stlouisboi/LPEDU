import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const API = process.env.REACT_APP_BACKEND_URL;
const GOLD = "#d4900a";
const NAVY = "#0b1628";
const BG = "#F5F5F5";
const GREEN = "#15803d";
const RED = "#b91c1c";

const fmt$ = (v) =>
  `$${Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtCPM = (v) => `$${Number(v).toFixed(3)}/mi`;
const fmtPct = (v) => `${Number(v).toFixed(1)}%`;

const DEFAULTS = {
  loadRate: 0,
  loadedMiles: 0,
  deadheadMiles: 0,
  fuelSurcharge: 0,
  detention: 0,
  otherAccessorials: 0,
};

function calcLoad(inp, cpm) {
  const totalMiles = (inp.loadedMiles || 0) + (inp.deadheadMiles || 0);
  const totalRevenue =
    (inp.loadRate || 0) +
    (inp.fuelSurcharge || 0) +
    (inp.detention || 0) +
    (inp.otherAccessorials || 0);
  if (totalMiles === 0 || cpm === 0) {
    return { totalMiles, totalRevenue, loadRPM: 0, profitPerMile: 0, profitTotal: 0, marginPct: 0, targetRPM: 0, gap: 0, counterRate: 0, verdict: null };
  }
  const loadRPM = totalRevenue / totalMiles;
  const profitPerMile = loadRPM - cpm;
  const profitTotal = profitPerMile * totalMiles;
  const marginPct = (profitPerMile / cpm) * 100;
  const targetRPM = cpm * 1.3;
  const gap = (loadRPM - targetRPM) * totalMiles;
  const accessorials = (inp.fuelSurcharge || 0) + (inp.detention || 0) + (inp.otherAccessorials || 0);
  const counterRate = targetRPM * totalMiles - accessorials;
  let verdict = null;
  if (inp.loadRate > 0) {
    if (loadRPM >= targetRPM) verdict = "GO";
    else if (loadRPM >= cpm) verdict = "NEGOTIATE";
    else verdict = "DECLINE";
  }
  return { totalMiles, totalRevenue, loadRPM, profitPerMile, profitTotal, marginPct, targetRPM, gap, counterRate, verdict };
}

// ── Shared Input Components ──────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(11,22,40,0.55)", marginBottom: 6, letterSpacing: "0.02em" }}>
      {children}
    </p>
  );
}

function CurrencyInput({ label, value, onChange, step = 1, placeholder = "0" }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(11,22,40,0.45)" }}>$</span>
        <input
          type="number" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step} placeholder={placeholder}
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: NAVY, background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.15)", padding: "10px 12px 10px 28px", outline: "none", transition: "border-color 0.15s" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(11,22,40,0.15)")}
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
        <input
          type="number" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: NAVY, background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.15)", padding: "10px 12px", outline: "none", transition: "border-color 0.15s", paddingRight: suffix ? 40 : 12 }}
          onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(11,22,40,0.15)")}
        />
        {suffix && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.40)" }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Teaser Preview (static example for the gate overlay) ────────────────────
function TeaserPreview() {
  const exCPM = 0.85;
  const exRPM = 0.933;
  const exMiles = 2250;
  const exRevenue = 2100;
  const exProfit = (exRPM - exCPM) * exMiles;
  const exMargin = ((exRPM - exCPM) / exCPM) * 100;
  return (
    <div>
      {/* CPM Source */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", borderLeft: `3px solid ${GOLD}`, padding: "18px 24px", marginBottom: 12 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(11,22,40,0.40)", margin: "0 0 8px" }}>YOUR COST BASELINE</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(11,22,40,0.50)" }}>Break-Even CPM: </span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 800, color: NAVY }}>{fmtCPM(exCPM)}</span>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(11,22,40,0.35)" }}>From TCO Calculator</span>
        </div>
      </div>
      {/* Load Details */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", padding: "20px 24px", marginBottom: 12 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", margin: "0 0 3px" }}>BLOCK 1 — LOAD DETAILS</p>
        <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18, color: NAVY, margin: "0 0 16px" }}>Load Rate & Miles</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["Load Rate", "$2,100.00"], ["Loaded Miles", "2,100 mi"], ["Deadhead Miles", "150 mi"], ["Fuel Surcharge", "$0.00"]].map(([l, v]) => (
            <div key={l}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(11,22,40,0.55)", margin: "0 0 4px" }}>{l}</p>
              <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.15)", padding: "10px 12px", fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 500, color: NAVY }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Results */}
      <div style={{ background: NAVY, padding: "28px", marginBottom: 12 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", margin: "0 0 16px" }}>LOAD ANALYSIS</p>
        {[["Total Revenue", fmt$(exRevenue), "rgba(255,255,255,0.60)"], ["Total Miles", "2,250 mi", "rgba(255,255,255,0.60)"], ["Load RPM", fmtCPM(exRPM), "#7BA7D4"], ["Your Break-Even CPM", fmtCPM(exCPM), GOLD]].map(([l, v, c]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.60)" }}>{l}</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600, color: c }}>{v}</span>
          </div>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.15)", margin: "8px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.80)" }}>Margin %</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 800, color: "#7BC4A4" }}>+{fmtPct(exMargin)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>Profit / Load</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 22, fontWeight: 800, color: "#7BC4A4" }}>+{fmt$(exProfit)}</span>
        </div>
      </div>
      {/* Verdict */}
      <div style={{ background: "#fffbeb", border: `2px solid ${GOLD}`, padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.14em", color: "#FFFFFF", background: GOLD, padding: "6px 14px" }}>NEGOTIATE</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 20, color: "#92400e" }}>COUNTER THIS LOAD</span>
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(11,22,40,0.70)", lineHeight: 1.75, margin: 0 }}>
          This load covers operating costs but falls short of your 30% margin target by $385.88. Counter at $1.105/mi ($2,485.88 gross) to reach your minimum margin.
        </p>
      </div>
    </div>
  );
}

// ── Teaser Gate (blurred preview + centered gate card) ───────────────────────
function TeaserGate() {
  return (
    <div style={{ position: "relative" }}>
      {/* Blurred teaser */}
      <div style={{ filter: "blur(4px)", opacity: 0.45, pointerEvents: "none", userSelect: "none" }}>
        <TeaserPreview />
      </div>
      {/* Top & bottom gradient fades */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, background: "linear-gradient(to bottom, #F5F5F5, transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, #F5F5F5, transparent)", zIndex: 2 }} />
      {/* Centered gate card */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, padding: "1.5rem" }}>
        <div style={{ width: "100%", maxWidth: 460, background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.12)", borderTop: `3px solid ${GOLD}`, padding: "2rem 2.25rem", boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, margin: "0 0 10px" }}>LP-TOOL-002 | FREE ACCOUNT</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 22, color: NAVY, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
            Create a Free Account to Access
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(11,22,40,0.62)", lineHeight: 1.75, margin: "0 0 20px" }}>
            Track your loads, save your cost-per-mile, and get an instant GO / NEGOTIATE / DECLINE decision on every offer. Free to create — no payment required.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link to="/portal" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "11px 22px", textDecoration: "none" }}>
              Create Free Account →
            </Link>
            <Link to="/portal" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(11,22,40,0.50)", textDecoration: "none" }}>
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Access Gate ──────────────────────────────────────────────────────────────
function AccessGate({ children }) {
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    fetch(`${API}/api/tools/access`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setStatus(d.logged_in ? "ok" : "not_logged_in"))
      .catch(() => setStatus("not_logged_in"));
  }, []);

  if (status === "loading")
    return <div style={{ padding: "6rem 1.5rem", textAlign: "center", fontFamily: "'Inter', sans-serif", color: "rgba(11,22,40,0.45)" }}>Checking access…</div>;

  if (status !== "ok") return <TeaserGate />;

  return children;
}

// ── Verdict Card ─────────────────────────────────────────────────────────────
function VerdictCard({ verdict, result, cpm }) {
  if (!verdict) {
    return (
      <div style={{ background: "rgba(11,22,40,0.04)", border: "1px solid rgba(11,22,40,0.10)", padding: "28px", marginBottom: 12, textAlign: "center" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.40)", margin: 0 }}>Enter load details above to generate a decision.</p>
      </div>
    );
  }

  const configs = {
    GO: {
      bg: "#f0fdf4",
      border: "#16a34a",
      badgeBg: "#16a34a",
      label: "GO",
      headline: "TAKE THIS LOAD",
      color: GREEN,
      body: `This load covers your full cost structure with ${fmtPct(result.marginPct)} margin (${fmtCPM(result.profitPerMile)} above your CPM). You are ${fmt$(result.gap)} above your 30% margin target on this run.`,
    },
    NEGOTIATE: {
      bg: "#fffbeb",
      border: GOLD,
      badgeBg: GOLD,
      label: "NEGOTIATE",
      headline: "COUNTER THIS LOAD",
      color: "#92400e",
      body: `This load covers operating costs but falls short of your 30% margin target by ${fmt$(Math.abs(result.gap))}. Counter at ${fmtCPM(result.targetRPM)} (${fmt$(result.counterRate)} gross) to reach your minimum margin.`,
    },
    DECLINE: {
      bg: "#fef2f2",
      border: RED,
      badgeBg: RED,
      label: "DECLINE",
      headline: "PASS ON THIS LOAD",
      color: RED,
      body: `This load does not cover your break-even rate. Operating at this rate generates a ${fmt$(Math.abs(result.profitTotal))} loss on this run. Do not accept.`,
    },
  };

  const c = configs[verdict];

  return (
    <div data-testid="load-verdict-card" style={{ background: c.bg, border: `2px solid ${c.border}`, padding: "28px", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.14em", color: "#FFFFFF", background: c.badgeBg, padding: "6px 14px" }}>
          {c.label}
        </span>
        <span style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: c.color, letterSpacing: "-0.01em" }}>
          {c.headline}
        </span>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(11,22,40,0.70)", lineHeight: 1.75, margin: 0 }}>
        {c.body}
      </p>
    </div>
  );
}

// ── History Helpers ──────────────────────────────────────────────────────────
const VERDICT_COLORS = {
  GO: { bg: "#16a34a", label: "#fff" },
  NEGOTIATE: { bg: "#d4900a", label: "#fff" },
  DECLINE: { bg: "#b91c1c", label: "#fff" },
};

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function HistoryRow({ item, onRestore }) {
  const totalMiles = (item.loaded_miles || 0) + (item.deadhead_miles || 0);
  const profitPerMile = (item.load_rpm || 0) - (item.saved_cpm || 0);
  const profitTotal = profitPerMile * totalMiles;
  const vc = VERDICT_COLORS[item.verdict] || { bg: "#555", label: "#fff" };

  return (
    <div
      data-testid="history-row"
      style={{ display: "grid", gridTemplateColumns: "100px 88px 90px 80px 90px 90px auto", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: "1px solid rgba(11,22,40,0.07)", background: "#fff" }}
    >
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(11,22,40,0.45)" }}>{fmtDate(item.saved_at)}</span>
      <span style={{ display: "inline-block", fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: vc.label, background: vc.bg, padding: "3px 8px", textAlign: "center" }}>{item.verdict}</span>
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: NAVY }}>{fmt$(item.load_rate)}</span>
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(11,22,40,0.55)" }}>{totalMiles.toLocaleString()} mi</span>
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: NAVY }}>{fmtCPM(item.load_rpm)}</span>
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: profitTotal >= 0 ? "#15803d" : "#b91c1c" }}>
        {profitTotal >= 0 ? "+" : "-"}{fmt$(Math.abs(profitTotal))}
      </span>
      <button
        onClick={() => onRestore(item)}
        style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: GOLD, background: "transparent", border: `1px solid ${GOLD}`, padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap" }}
      >
        Restore
      </button>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function LoadAnalyzerPage() {
  const [inp, setInp] = useState(DEFAULTS);
  const [savedCPM, setSavedCPM] = useState(null);
  const [cpmLoaded, setCpmLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle");
  const [history, setHistory] = useState([]);

  const set = useCallback((key) => (val) => setInp((prev) => ({ ...prev, [key]: val })), []);
  const result = useMemo(() => calcLoad(inp, savedCPM || 0), [inp, savedCPM]);

  const fetchHistory = useCallback(() => {
    fetch(`${API}/api/tools/load-history`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setHistory(d.history || []))
      .catch(() => {});
  }, []);

  // Load saved CPM + last analysis + history on mount
  useEffect(() => {
    fetch(`${API}/api/cpm/saved`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.saved?.total_cpm) setSavedCPM(d.saved.total_cpm);
        setCpmLoaded(true);
      })
      .catch(() => setCpmLoaded(true));

    fetch(`${API}/api/tools/load-saved`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.saved) {
          const { load_rate, loaded_miles, deadhead_miles, fuel_surcharge, detention, other_accessorials } = d.saved;
          setInp({ loadRate: load_rate, loadedMiles: loaded_miles, deadheadMiles: deadhead_miles, fuelSurcharge: fuel_surcharge, detention, otherAccessorials: other_accessorials });
        }
      })
      .catch(() => {});

    fetchHistory();
  }, [fetchHistory]);

  const handleSave = async () => {
    if (!result.verdict) return;
    setSaveState("saving");
    try {
      await fetch(`${API}/api/tools/load-save`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          load_rate: inp.loadRate,
          loaded_miles: inp.loadedMiles,
          deadhead_miles: inp.deadheadMiles,
          fuel_surcharge: inp.fuelSurcharge,
          detention: inp.detention,
          other_accessorials: inp.otherAccessorials,
          load_rpm: result.loadRPM,
          verdict: result.verdict,
          saved_cpm: savedCPM || 0,
        }),
      });
      setSaveState("saved");
      fetchHistory();
      setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("idle");
    }
  };

  const handleRestore = (item) => {
    setInp({
      loadRate: item.load_rate,
      loadedMiles: item.loaded_miles,
      deadheadMiles: item.deadhead_miles,
      fuelSurcharge: item.fuel_surcharge,
      detention: item.detention,
      otherAccessorials: item.other_accessorials,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: NAVY, borderBottom: "1px solid rgba(212,144,10,0.20)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem 3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            LP-TOOL-002 — LOAD PROFITABILITY ANALYZER
          </p>
          <h1 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#FFFFFF", letterSpacing: "-0.025em", marginBottom: 10 }}>
            Load Profitability Analyzer
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.60)", lineHeight: 1.7, maxWidth: 520 }}>
            Enter a load offer and see immediately whether it covers your real cost structure — with a GO / NEGOTIATE / DECLINE decision.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem 6rem" }}>
        <AccessGate>

          {/* CPM Source */}
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", borderLeft: `3px solid ${GOLD}`, padding: "18px 24px", marginBottom: 12 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(11,22,40,0.40)", margin: "0 0 8px" }}>
              YOUR COST BASELINE
            </p>
            {!cpmLoaded ? (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(11,22,40,0.45)", margin: 0 }}>Loading…</p>
            ) : savedCPM ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.50)" }}>Break-Even CPM: </span>
                  <span data-testid="load-cpm-source" style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 800, color: NAVY }}>{fmtCPM(savedCPM)}</span>
                </div>
                <Link to="/tools/tco-calculator" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: GOLD, textDecoration: "none" }}>
                  Update CPM →
                </Link>
              </div>
            ) : (
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(11,22,40,0.60)", margin: "0 0 12px", lineHeight: 1.6 }}>
                  No saved CPM found. Calculate your True Cost of Ownership first to use this analyzer.
                </p>
                <Link to="/tools/tco-calculator" style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "10px 20px", textDecoration: "none" }}>
                  Calculate Your TCO →
                </Link>
              </div>
            )}
          </div>

          {/* Load Details */}
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", marginBottom: 12 }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(11,22,40,0.07)" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", margin: "0 0 3px" }}>BLOCK 1 — LOAD DETAILS</p>
              <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: NAVY, margin: 0 }}>Load Rate & Miles</p>
            </div>
            <div style={{ padding: "20px 24px 24px" }}>
              <div style={grid2}>
                <CurrencyInput label="Load Rate (total gross $)" value={inp.loadRate} onChange={set("loadRate")} step={10} />
                <div />
                <NumberInput label="Loaded Miles" value={inp.loadedMiles} onChange={set("loadedMiles")} suffix="mi" />
                <NumberInput label="Deadhead Miles" value={inp.deadheadMiles} onChange={set("deadheadMiles")} suffix="mi" />
              </div>
              {/* Accessorials */}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(11,22,40,0.35)", margin: "20px 0 12px" }}>
                ACCESSORIALS (OPTIONAL)
              </p>
              <div style={grid2}>
                <CurrencyInput label="Fuel Surcharge" value={inp.fuelSurcharge} onChange={set("fuelSurcharge")} />
                <CurrencyInput label="Detention" value={inp.detention} onChange={set("detention")} />
                <CurrencyInput label="Other Accessorials" value={inp.otherAccessorials} onChange={set("otherAccessorials")} />
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(11,22,40,0.07)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.50)" }}>Total miles · {result.totalMiles.toLocaleString()} mi</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: NAVY }}>Total revenue · {fmt$(result.totalRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div data-testid="load-results" style={{ background: NAVY, padding: "28px 28px 24px", marginTop: 20, marginBottom: 12 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,144,10,0.65)", margin: "0 0 16px" }}>
              LOAD ANALYSIS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {[
                ["Total Revenue", result.totalRevenue > 0 ? fmt$(result.totalRevenue) : "—", "rgba(255,255,255,0.60)"],
                ["Total Miles", result.totalMiles > 0 ? `${result.totalMiles.toLocaleString()} mi` : "—", "rgba(255,255,255,0.60)"],
                ["Load RPM", result.loadRPM > 0 ? fmtCPM(result.loadRPM) : "—", "#7BA7D4"],
                ["Your Break-Even CPM", savedCPM ? fmtCPM(savedCPM) : "—", GOLD],
              ].map(([label, val, color]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.60)" }}>{label}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color }}>{val}</span>
                </div>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.15)", margin: "4px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.80)" }}>Margin %</span>
                <span data-testid="load-margin-pct" style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 800, color: result.marginPct >= 0 ? "#7BC4A4" : "#FCA5A5" }}>
                  {result.loadRPM > 0 ? `${result.marginPct >= 0 ? "+" : ""}${fmtPct(result.marginPct)}` : "—"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>Profit / Load</span>
                <span data-testid="load-profit" style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 800, color: result.profitTotal >= 0 ? "#7BC4A4" : "#FCA5A5" }}>
                  {result.loadRPM > 0 ? `${result.profitTotal >= 0 ? "" : "-"}${fmt$(Math.abs(result.profitTotal))}` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Verdict */}
          <VerdictCard verdict={result.verdict} result={result} cpm={savedCPM || 0} />

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <button
              data-testid="load-save-btn"
              onClick={handleSave}
              disabled={!result.verdict || saveState === "saving"}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: saveState === "saved" ? "#1B5E20" : NAVY, background: saveState === "saved" ? "#E8F5E9" : GOLD, border: "none", padding: "12px 24px", cursor: result.verdict ? "pointer" : "not-allowed", opacity: result.verdict ? 1 : 0.5, transition: "background 0.2s" }}
            >
              {saveState === "saved" ? "✓ Saved" : saveState === "saving" ? "Saving…" : "Save Analysis"}
            </button>
            <button
              onClick={() => setInp(DEFAULTS)}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(11,22,40,0.45)", background: "transparent", border: "1px solid rgba(11,22,40,0.18)", padding: "12px 20px", cursor: "pointer" }}
            >
              Start Over
            </button>
            <Link to="/tools/tco-calculator" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: GOLD, textDecoration: "none", marginLeft: "auto" }}>
              ← Update TCO Data
            </Link>
          </div>

          {/* Disclaimer */}
          <div style={{ background: "rgba(11,22,40,0.04)", border: "1px solid rgba(11,22,40,0.08)", padding: "16px 20px", marginBottom: 32 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(11,22,40,0.40)", margin: "0 0 8px" }}>
              EDUCATIONAL USE ONLY
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(11,22,40,0.45)", lineHeight: 1.7, margin: 0 }}>
              This analysis is for educational purposes only. It reflects the cost data you provided and does not account for all factors that may affect profitability. You are responsible for your own load acceptance decisions.
            </p>
          </div>

          {/* Analysis History */}
          <div style={{ marginTop: 8 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(11,22,40,0.40)", margin: "0 0 12px" }}>
              ANALYSIS HISTORY
            </p>
            {history.length === 0 ? (
              <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.08)", padding: "28px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(11,22,40,0.40)", margin: 0 }}>No history yet. Run your first analysis and save it.</p>
              </div>
            ) : (
              <div style={{ border: "1px solid rgba(11,22,40,0.10)", overflow: "hidden" }}>
                {/* Header row */}
                <div style={{ display: "grid", gridTemplateColumns: "100px 88px 90px 80px 90px 90px auto", gap: 12, padding: "9px 16px", background: "rgba(11,22,40,0.04)", borderBottom: "1px solid rgba(11,22,40,0.10)" }}>
                  {["DATE", "VERDICT", "RATE", "MILES", "RPM", "PROFIT", ""].map((h) => (
                    <span key={h} style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(11,22,40,0.35)" }}>{h}</span>
                  ))}
                </div>
                {history.map((item, i) => (
                  <HistoryRow key={i} item={item} onRestore={handleRestore} />
                ))}
              </div>
            )}
            {history.length > 0 && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(11,22,40,0.35)", margin: "8px 0 0", textAlign: "right" }}>
                Showing last {history.length} of 10 saved analyses · Click "Restore" to reload any run
              </p>
            )}
          </div>

        </AccessGate>
      </div>

      <FooterSection />
    </div>
  );
}
