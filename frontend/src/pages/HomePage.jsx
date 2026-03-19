import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import OperatorQualifierSection from "../components/OperatorQualifierSection";
import CostOfInactionSection from "../components/CostOfInactionSection";
import WhatGetsInstalledSimple from "../components/WhatGetsInstalledSimple";
import HowItWorksSimple from "../components/HowItWorksSimple";
import CredibilityStrip from "../components/CredibilityStrip";
import FinalCTASection from "../components/FinalCTASection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-onyx)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. QUALIFIER STRIP */}
        <OperatorQualifierSection />

        {/* 3. COST OF INACTION */}
        <CostOfInactionSection />

        {/* 4. WHAT GETS INSTALLED */}
        <WhatGetsInstalledSimple />

        {/* 5. HOW IT WORKS */}
        <HowItWorksSimple />

        {/* 6. CREDIBILITY STRIP */}
        <CredibilityStrip />

        {/* 7. FINAL CTA */}
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
