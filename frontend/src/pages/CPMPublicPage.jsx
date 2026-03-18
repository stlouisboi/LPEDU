import React from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { CPMCalculator } from "../components/CPMCalculator";

export default function CPMPublicPage() {
  return (
    <div style={{ background: "#F0F2F4", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.672rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C5A059", marginBottom: "1.25rem" }}>
          LP-TOOLS | COST PER MILE CALCULATOR
        </p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#002244", letterSpacing: "-0.025em", marginBottom: "0.75rem" }}>
          Know Your Real Cost Per Mile.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "rgba(0,34,68,0.62)", lineHeight: 1.75, maxWidth: 540, marginBottom: "3.5rem" }}>
          Enter your fixed and variable operating costs. This control system sets your minimum acceptable rate — and prevents you from operating below profitability thresholds on any load.
        </p>
        <CPMCalculator variant="public" />
      </div>
      <FooterSection />
    </div>
  );
}
