import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const TOOLS = [
  {
    id: "cpm-calculator",
    code: "LP-TOOL-001",
    title: "Cost Per Mile Control System",
    description:
      "Enter your fixed and variable operating costs. This control system sets your minimum acceptable rate — and prevents operating below profitability thresholds on any load.",
    inputs: ["Fixed monthly costs", "Fuel & tire variables", "Maintenance reserve"],
    outputs: ["Fixed CPM", "Variable CPM", "Total CPM", "Minimum acceptable rate"],
    href: "/tools/cpm-calculator",
    cta: "Open Calculator",
    tag: "FREE",
  },
];

const COMING = [
  {
    code: "LP-TOOL-002",
    title: "Load Profitability Analyzer",
    description: "Enter a load offer and see immediately whether it covers your real cost structure — with a GO / NEGOTIATE / DECLINE decision.",
    tag: "PORTAL",
  },
  {
    code: "LP-TOOL-003",
    title: "New Entrant Compliance Checklist",
    description: "A step-by-step verification checklist covering all FMCSA registration requirements for carriers in their first 90 days of authority.",
    tag: "COMING SOON",
  },
];

const mono = "'Inter', sans-serif";
const sans = "'Inter', sans-serif";
const display = "'Playfair Display', serif";

export default function ToolsIndexPage() {
  return (
    <div style={{ background: "#F0F2F4", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: "#0b1628", borderBottom: "1px solid rgba(212,144,10,0.2)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
          <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4900a", marginBottom: "1.25rem" }}>
            LP-TOOLS | OPERATOR TOOLBOX
          </p>
          <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#FFFFFF", letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Built for the Numbers.
          </h1>
          <p style={{ fontFamily: sans, fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.78, maxWidth: 520 }}>
            Free calculation tools for owner-operators and new motor carriers. Know your cost structure before you take the call.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>

        {/* Available tools */}
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,34,68,0.4)", marginBottom: "1.5rem" }}>
          AVAILABLE NOW
        </p>

        {TOOLS.map((tool) => (
          <div key={tool.id} style={{ background: "#FFFFFF", border: "1px solid rgba(0,34,68,0.1)", marginBottom: "1.5rem", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "2rem 2rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
                <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,34,68,0.35)" }}>
                  {tool.code}
                </p>
                <span style={{ fontFamily: mono, fontSize: "0.44rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1D9E75", background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.25)", padding: "0.15rem 0.5rem" }}>
                  {tool.tag}
                </span>
              </div>
              <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.5rem", color: "#0b1628", letterSpacing: "-0.015em", marginBottom: "0.625rem" }}>
                {tool.title}
              </h2>
              <p style={{ fontFamily: sans, fontSize: "1rem", color: "rgba(0,34,68,0.62)", lineHeight: 1.75, maxWidth: 560, marginBottom: "1.75rem" }}>
                {tool.description}
              </p>

              {/* Inputs / Outputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                {[{ label: "INPUTS", items: tool.inputs }, { label: "OUTPUTS", items: tool.outputs }].map((col) => (
                  <div key={col.label}>
                    <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,34,68,0.35)", marginBottom: "0.625rem" }}>
                      {col.label}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      {col.items.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <div style={{ width: 5, height: 5, background: "#d4900a", borderRadius: "50%", flexShrink: 0 }} />
                          <span style={{ fontFamily: sans, fontSize: "var(--text-sm)", color: "rgba(0,34,68,0.7)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA strip */}
            <div style={{ borderTop: "1px solid rgba(0,34,68,0.08)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", background: "rgba(0,34,68,0.02)" }}>
              <p style={{ fontFamily: sans, fontSize: "0.857rem", color: "rgba(0,34,68,0.45)" }}>
                Free to use · no account required
              </p>
              <Link
                to={tool.href}
                data-testid={`tool-cta-${tool.id}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: sans, fontWeight: 700, fontSize: "var(--text-sm)", letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF", background: "#0b1628", padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#003366")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0b1628")}
              >
                {tool.cta} →
              </Link>
            </div>
          </div>
        ))}

        {/* Coming soon */}
        <p style={{ fontFamily: mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,34,68,0.4)", marginBottom: "1.5rem", marginTop: "3rem" }}>
          IN THE PIPELINE
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(0,34,68,0.08)" }}>
          {COMING.map((tool) => (
            <div key={tool.code} style={{ background: "#FAFBFC", padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
                <p style={{ fontFamily: mono, fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(0,34,68,0.3)" }}>
                  {tool.code}
                </p>
                <span style={{ fontFamily: mono, fontSize: "0.4rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: tool.tag === "PORTAL" ? "#d4900a" : "rgba(0,34,68,0.35)", background: tool.tag === "PORTAL" ? "rgba(212,144,10,0.1)" : "rgba(0,34,68,0.05)", border: `1px solid ${tool.tag === "PORTAL" ? "rgba(212,144,10,0.3)" : "rgba(0,34,68,0.12)"}`, padding: "0.15rem 0.5rem" }}>
                  {tool.tag}
                </span>
              </div>
              <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: "1.1rem", color: "#0b1628", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                {tool.title}
              </h3>
              <p style={{ fontFamily: sans, fontSize: "var(--text-sm)", color: "rgba(0,34,68,0.55)", lineHeight: 1.7 }}>
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: "4rem", borderTop: "1px solid rgba(0,34,68,0.1)", paddingTop: "2rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
          <p style={{ fontFamily: sans, fontSize: "0.924rem", color: "rgba(0,34,68,0.5)", lineHeight: 1.7, maxWidth: 460 }}>
            All tools use your actual inputs — no averages, no industry benchmarks. The numbers are yours.
          </p>
          <Link to="/standards" style={{ fontFamily: sans, fontWeight: 600, fontSize: "var(--text-sm)", color: "#d4900a", textDecoration: "none" }}>
            View the LaunchPath Standard →
          </Link>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
