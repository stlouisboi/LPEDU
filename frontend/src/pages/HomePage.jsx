import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ExposureBand from "../components/ExposureBand";
import CredibilityStrip from "../components/CredibilityStrip";
import ThePatternSection from "../components/ThePatternSection";
import NotForSection from "../components/NotForSection";
import TheStandardSection from "../components/TheStandardSection";
import FailureAnalysisSection from "../components/FailureAnalysisSection";
import WhatGetsBuiltSection from "../components/WhatGetsBuiltSection";
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
      {/* Navigation */}
      <Navbar />

      {/* 1. Hero — The problem, the threat, the stakes */}
      <HeroSection />

      {/* 2. Exposure Band — "Active does not mean protected" */}
      <ExposureBand />

      {/* 3. Founder / Station Custodian — Vince Lawrence credibility */}
      <CredibilityStrip />

      {/* 4. The Pattern — I've watched this fail 200 times */}
      <ThePatternSection />

      {/* 5. Admission Criteria — Who this is and is not for */}
      <NotForSection />

      {/* 6–8. The LaunchPath Protection System — Four Pillars → AUTO → REACH */}
      <TheStandardSection />

      {/* 9. Proof Block — The $19,246 case (compressed) + 16 Deadly Sins */}
      <FailureAnalysisSection />

      {/* 10. What Gets Built — 90-day installation outcomes */}
      <WhatGetsBuiltSection />

      {/* 11. Field Outcomes — What the system produces */}
      <SocialProofSection />

      {/* 12. Common Questions */}
      <FAQSection />

      {/* 12. Final CTA — Run the REACH Diagnostic */}
      <FinalCTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
