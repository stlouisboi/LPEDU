import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import OperatorQualifierSection from "../components/OperatorQualifierSection";
import CostOfInactionSection from "../components/CostOfInactionSection";
import FailureAnalysisSection from "../components/FailureAnalysisSection";
import WhatGetsInstalledSimple from "../components/WhatGetsInstalledSimple";
import HowItWorksSimple from "../components/HowItWorksSimple";
import PlatformSurface from "../components/PlatformSurface";
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

        {/* 2. QUALIFIER */}
        <OperatorQualifierSection />

        {/* 3. COST OF INACTION */}
        <CostOfInactionSection />

        {/* 4. FAILURE ANALYSIS — proof while stakes are fresh */}
        <FailureAnalysisSection />

        {/* 5. WHAT GETS INSTALLED */}
        <WhatGetsInstalledSimple />

        {/* 6. HOW IT WORKS */}
        <HowItWorksSimple />

        {/* 7. PLATFORM SURFACE — system breadth */}
        <PlatformSurface />

        {/* 8. CREDIBILITY STRIP */}
        <CredibilityStrip />

        {/* 9. FINAL CTA */}
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
