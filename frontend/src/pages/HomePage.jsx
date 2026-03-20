import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import OperatorQualifierSection from "../components/OperatorQualifierSection";
import Ground0ExplainerSection from "../components/Ground0ExplainerSection";
import CostOfInactionSection from "../components/CostOfInactionSection";
import FailureAnalysisSection from "../components/FailureAnalysisSection";
import WhatGetsInstalledSimple from "../components/WhatGetsInstalledSimple";
import PlatformSurface from "../components/PlatformSurface";
import HowItWorksSimple from "../components/HowItWorksSimple";
import AfterInstallationSection from "../components/AfterInstallationSection";
import CredibilityStrip from "../components/CredibilityStrip";
import FAQSection from "../components/FAQSection";
import SocialProofPlaceholder from "../components/SocialProofPlaceholder";
import FinalCTASection from "../components/FinalCTASection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-onyx)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. QUALIFICATION FILTER */}
        <OperatorQualifierSection />

        {/* 3. GROUND 0 EXPLAINER */}
        <Ground0ExplainerSection />

        {/* 4. CONSEQUENCE — AUTHORITY REVOCATION */}
        <CostOfInactionSection />

        {/* FAILURE PATTERN ANALYSIS */}
        <FailureAnalysisSection />

        {/* 5. WHAT GETS INSTALLED — 6 domains expanded */}
        <WhatGetsInstalledSimple />

        {/* SYSTEM COMPONENTS SURFACE */}
        <PlatformSurface />

        {/* 6. HOW IT WORKS — 4-step installation sequence */}
        <HowItWorksSimple />

        {/* 7. AFTER INSTALLATION — positive outcome */}
        <AfterInstallationSection />

        {/* 8. CREDIBILITY STRIP */}
        <CredibilityStrip />

        {/* 9. FAQ */}
        <FAQSection />

        {/* 10. SOCIAL PROOF PLACEHOLDER */}
        <SocialProofPlaceholder />

        {/* 11. PRICING EXPECTATION LINE */}
        <div
          data-testid="pricing-expectation-section"
          style={{
            background: "#060c16",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "3rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.7,
            margin: "0 auto",
            maxWidth: 580,
            letterSpacing: "0.01em",
          }}>
            Investment details are presented after fit and readiness are confirmed in Ground 0.
          </p>
        </div>

        {/* 12. FINAL CTA */}
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
