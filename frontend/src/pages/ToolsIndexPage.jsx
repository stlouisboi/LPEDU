import React from "react";
import { Link } from '../compat/Link';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const GOLD = "#d4900a";
const NAVY = "#0b1628";

const PORTAL_TOOLS = [
  {
    id: "tco-calculator",
    code: "LP-TOOL-001",
    title: "True Cost of Ownership Calculator",
    description:
      "Calculate your real cost-per-mile across all cost categories — fixed, variable, and operator. This is your break-even rate: the minimum revenue per mile required to cover all operating costs.",
    inputs: ["Equipment, insurance, permits", "Fuel price & MPG", "Maintenance reserve & tires", "Owner-operator or employed driver"],
    outputs: ["Fixed CPM", "Variable CPM", "Operator CPM", "Total CPM", "30% Margin Target"],
    href: "/tools/tco-calculator",
    cta: "Open Calculator",
    badge: "FREE",
    badgeColor: "#15803d",
  },
  {
    id: "load-analyzer",
    code: "LP-TOOL-002",
    title: "Load Profitability Analyzer",
    description:
      "Enter a load offer and see immediately whether it covers your real cost structure. Pulls your saved CPM from the TCO Calculator to generate an instant GO / NEGOTIATE / DECLINE decision.",
    inputs: ["Load rate (gross $)", "Loaded miles + deadhead", "Fuel surcharge, detention, accessorials"],
    outputs: ["Load RPM", "Margin %", "Profit per load", "GO / NEGOTIATE / DECLINE"],
    href: "/tools/load-analyzer",
    cta: "Open Analyzer",
    badge: "FREE ACCOUNT",
    badgeColor: GOLD,
  },
  {
    id: "gap-audit",
    code: "LP-TOOL-003",
    title: "Compliance Gap Audit",
    description:
      "A 16-question self-audit that identifies which of the 16 most common FMCSA violation categories your operation is currently exposed to. Results include domain-specific risk ratings with CFR citations.",
    inputs: ["Authority & registration status", "Driver qualification files", "Drug & alcohol program", "HOS & ELD compliance"],
    outputs: ["16-category risk exposure map", "GREEN / YELLOW / RED ratings", "Specific CFR citations", "Recommended next steps per gap"],
    href: "/compliance-gap-quiz",
    cta: "Run the Audit",
    badge: "FREE",
    badgeColor: "#15803d",
  },
  {
    id: "control-room",
    code: "LP-TOOL-004",
    title: "Compliance Health Check",
    description:
      "A 30-question compliance health assessment across all five REACH domains. Generates a real-time compliance score, identifies your highest-risk areas, and delivers a personalized 7-day action plan to your inbox.",
    inputs: ["Regulatory compliance status", "Driver & DQ file readiness", "Equipment & maintenance records", "Insurance & authority continuity"],
    outputs: ["REACH compliance score (0–100)", "Domain-by-domain breakdown", "Risk exposure gauge", "Personalized 7-day action plan (email)"],
    href: "/control-room",
    cta: "Run Health Check",
    badge: "FREE",
    badgeColor: "#15803d",
  },
];

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";
const display = "'Newsreader', 'Playfair Display', serif";

export default function ToolsIndexPage() {
  return (
    <div style={{ background: "#F0F2F4", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: NAVY, borderBottom: "1px solid rgba(212,144,10,0.2)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "1.25rem" }}>
            LP-TOOLS | OPERATOR TOOLBOX
          </p>
          <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#FFFFFF", letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Operator Toolbox.
          </h1>
          <p style={{ fontFamily: sans, fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.78, maxWidth: 560, marginBottom: "0.75rem" }}>
            Four tools built for new motor carriers — financial analysis, compliance auditing, and health scoring. All free to use.
          </p>
          <p style={{ fontFamily: mono, fontSize: "0.619rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: 0 }}>
            Best suited for new and small carriers operating 1–20 trucks.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>

        {/* Access notice — only for load analyzer gating */}
        {false && (
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(11,22,40,0.10)", borderLeft: `3px solid ${GOLD}`, padding: "1.25rem 1.75rem", marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, margin: "0 0 4px" }}>UPGRADE REQUIRED</p>
              <p style={{ fontFamily: sans, fontSize: "0.924rem", color: "rgba(0,34,68,0.65)", margin: 0 }}>You're logged in but do not have tool access. These tools require Document System Bundle or LaunchPath Standard enrollment.</p>
            </div>
            <Link to="/compliance-library" style={{ fontFamily: sans, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.75rem 1.5rem", textDecoration: "none", whiteSpace: "nowrap" }}>
              Upgrade Access →
            </Link>
          </div>
        )}

        {/* Portal Tools */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,34,68,0.4)", margin: 0 }}>
            OPERATOR TOOLS
          </p>
        </div>

        {PORTAL_TOOLS.map((tool) => (
          <div key={tool.id} style={{ background: "#FFFFFF", border: "1px solid rgba(0,34,68,0.1)", marginBottom: "1.5rem" }}>
            <div style={{ padding: "2rem 2rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,34,68,0.35)", margin: 0 }}>
                  {tool.code}
                </p>
                <span style={{ fontFamily: mono, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: tool.badgeColor, background: `${tool.badgeColor}14`, border: `1px solid ${tool.badgeColor}40`, padding: "0.2rem 0.6rem" }}>
                  {tool.badge}
                </span>
              </div>
              <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.5rem", color: NAVY, letterSpacing: "-0.015em", marginBottom: "0.625rem" }}>
                {tool.title}
              </h2>
              <p style={{ fontFamily: sans, fontSize: "1rem", color: "rgba(0,34,68,0.62)", lineHeight: 1.75, maxWidth: 560, marginBottom: "1.75rem" }}>
                {tool.description}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                {[{ label: "INPUTS", items: tool.inputs }, { label: "OUTPUTS", items: tool.outputs }].map((col) => (
                  <div key={col.label}>
                    <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,34,68,0.35)", marginBottom: "0.625rem" }}>
                      {col.label}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      {col.items.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <div style={{ width: 5, height: 5, background: GOLD, borderRadius: "50%", flexShrink: 0 }} />
                          <span style={{ fontFamily: sans, fontSize: "0.857rem", color: "rgba(0,34,68,0.7)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(0,34,68,0.08)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", background: "rgba(0,34,68,0.02)" }}>
              <div>
                <p style={{ fontFamily: sans, fontSize: "0.857rem", color: "rgba(0,34,68,0.45)", margin: 0 }}>
                  {tool.id === "load-analyzer"
                    ? "Free account required · no payment needed"
                    : "Free to use · no account required"}
                </p>
                {(tool.id === "gap-audit" || tool.id === "control-room") && (
                  <p style={{ fontFamily: sans, fontSize: "0.762rem", color: "rgba(0,34,68,0.38)", margin: "0.3rem 0 0", fontStyle: "italic" }}>
                    For a deeper readiness check that includes cash, commitment, and discipline,{" "}
                    <Link to="/reach-diagnostic" style={{ color: GOLD, textDecoration: "none", fontWeight: 600 }}>run the REACH Diagnostic next</Link>.
                  </p>
                )}
              </div>
              <Link
                to={tool.href}
                data-testid={`tool-cta-${tool.id}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: sans, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF", background: NAVY, padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#003366")}
                onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
              >
                {tool.cta} →
              </Link>
            </div>
          </div>
        ))}

        {/* Free tools divider */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(0,34,68,0.1)", paddingTop: "2.5rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,34,68,0.4)", marginBottom: "1.5rem" }}>
            FREE TOOLS
          </p>
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,34,68,0.08)" }}>
            <div style={{ padding: "1.75rem 2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.625rem" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,34,68,0.35)", margin: 0 }}>LP-TOOL-000</p>
                <span style={{ fontFamily: mono, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#15803d", background: "rgba(21,128,61,0.08)", border: "1px solid rgba(21,128,61,0.25)", padding: "0.2rem 0.6rem" }}>
                  FREE
                </span>
              </div>
              <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.25rem", color: NAVY, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                CPM Quick Calculator
              </h3>
              <p style={{ fontFamily: sans, fontSize: "0.924rem", color: "rgba(0,34,68,0.62)", lineHeight: 1.75, maxWidth: 560, marginBottom: 0 }}>
                A simplified cost-per-mile calculator for quick estimates. No account required. For detailed analysis with save/load functionality, use the TCO Calculator above.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(0,34,68,0.08)", padding: "1rem 2rem", display: "flex", justifyContent: "flex-end", background: "rgba(0,34,68,0.02)" }}>
              <Link
                to="/tools/cpm-calculator"
                data-testid="tool-cta-cpm-calculator"
                style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", color: NAVY, textDecoration: "none" }}
              >
                Open Free Calculator →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(0,34,68,0.1)", paddingTop: "2rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
          <p style={{ fontFamily: sans, fontSize: "0.924rem", color: "rgba(0,34,68,0.5)", lineHeight: 1.7, maxWidth: 460 }}>
            All tools use your actual inputs — no averages, no industry benchmarks. The numbers are yours.
          </p>
          <Link to="/standards" style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.857rem", color: GOLD, textDecoration: "none" }}>
            View the LaunchPath Standard →
          </Link>
        </div>

      </div>

      <FooterSection />
    </div>
  );
}
