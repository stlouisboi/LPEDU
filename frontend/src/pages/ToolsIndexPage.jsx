import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const API = process.env.REACT_APP_BACKEND_URL;

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
  },
];

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";
const display = "'Playfair Display', serif";
const GOLD = "#d4900a";
const NAVY = "#0b1628";

export default function ToolsIndexPage() {
  const [access, setAccess] = useState("loading");

  useEffect(() => {
    fetch(`${API}/api/tools/access`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setAccess(d.has_access ? "granted" : d.logged_in ? "locked" : "guest"))
      .catch(() => setAccess("guest"));
  }, []);

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
            Built for the Numbers.
          </h1>
          <p style={{ fontFamily: sans, fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.78, maxWidth: 560 }}>
            Two integrated financial tools for enrolled operators. Know your cost structure before you take the call.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>

        {/* Access notice for non-members */}
        {access === "guest" && (
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(212,144,10,0.25)", borderLeft: `3px solid ${GOLD}`, padding: "1.25rem 1.75rem", marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, margin: "0 0 4px" }}>ENROLLED MEMBERS ONLY</p>
              <p style={{ fontFamily: sans, fontSize: "0.924rem", color: "rgba(0,34,68,0.65)", margin: 0 }}>These tools are included with the Document System Bundle ($497) and the LaunchPath Standard ($2,500).</p>
            </div>
            <Link to="/compliance-library" style={{ fontFamily: sans, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.06em", textTransform: "uppercase", color: NAVY, background: GOLD, padding: "0.75rem 1.5rem", textDecoration: "none", whiteSpace: "nowrap" }}>
              See Enrollment Options →
            </Link>
          </div>
        )}

        {access === "locked" && (
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
            PORTAL TOOLS
          </p>
          <span style={{ fontFamily: mono, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, background: "rgba(212,144,10,0.10)", border: "1px solid rgba(212,144,10,0.30)", padding: "0.2rem 0.6rem" }}>
            ENROLLED MEMBERS
          </span>
        </div>

        {PORTAL_TOOLS.map((tool) => (
          <div key={tool.id} style={{ background: "#FFFFFF", border: "1px solid rgba(0,34,68,0.1)", marginBottom: "1.5rem" }}>
            <div style={{ padding: "2rem 2rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,34,68,0.35)", margin: 0 }}>
                  {tool.code}
                </p>
                {access === "granted" ? (
                  <span style={{ fontFamily: mono, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#15803d", background: "rgba(21,128,61,0.08)", border: "1px solid rgba(21,128,61,0.25)", padding: "0.2rem 0.6rem" }}>
                    ACCESS GRANTED
                  </span>
                ) : (
                  <span style={{ fontFamily: mono, fontSize: "0.571rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, background: "rgba(212,144,10,0.08)", border: "1px solid rgba(212,144,10,0.25)", padding: "0.2rem 0.6rem" }}>
                    PORTAL
                  </span>
                )}
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
              <p style={{ fontFamily: sans, fontSize: "0.857rem", color: "rgba(0,34,68,0.45)", margin: 0 }}>
                {access === "granted" ? "Available in your portal" : "Included with Document System Bundle · $497"}
              </p>
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
