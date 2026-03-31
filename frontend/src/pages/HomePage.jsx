import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CredibilityStrip from "../components/CredibilityStrip";
import ThePatternSection from "../components/ThePatternSection";
import NotForSection from "../components/NotForSection";
import TheStandardSection from "../components/TheStandardSection";
import SystemArchitectureDiagram from "../components/SystemArchitectureDiagram";
import FailureAnalysisSection from "../components/FailureAnalysisSection";
import OperatorQualifierSection from "../components/OperatorQualifierSection";
import SocialProofSection from "../components/SocialProofSection";
import FAQSection from "../components/FAQSection";
import FinalCTASection from "../components/FinalCTASection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  // Data-stream text reveal — triggers .revealed on [data-ds] elements
  useEffect(() => {
    const elements = document.querySelectorAll(".data-stream");
    if (!elements.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } }),
      { threshold: 0.2 }
    );
    elements.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#0b1628", overflowX: "hidden" }}>
      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Hero */}
      <HeroSection />

      {/* 3. Vince Lawrence / Station Custodian */}
      <CredibilityStrip />

      {/* 4. The Pattern — The Wound (Ground 0 first mention) */}
      <ThePatternSection />

      {/* 5. Who This Is NOT For (Ground 0 second mention) */}
      <NotForSection />

      {/* 6. The Standard — Four Pillars + AUTO Method + REACH Assessment */}
      <TheStandardSection />

      {/* 6b. System Architecture — animated interactive diagram */}
      <SystemArchitectureDiagram />

      {/* 7. 16 Deadly Sins (anchor: #sixteen-sins) */}
      <FailureAnalysisSection />

      {/* 8. Who This IS For */}
      <OperatorQualifierSection />

      {/* 9. Operator Outcomes */}
      <SocialProofSection />

      {/* 10. Common Questions */}
      <FAQSection />

      {/* 10. Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
