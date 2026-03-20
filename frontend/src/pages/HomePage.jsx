import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.querySelector("[data-testid='hero-primary-cta']");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        data-testid="sticky-mobile-cta"
        className="sticky-mobile-cta"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
          background: "#0b1628",
          borderTop: "2px solid #d4900a",
          padding: "14px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
          transform: show ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 2px" }}>
            FREE · 4 MINUTES
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.2 }}>
            Start Ground 0 Readiness Module
          </p>
        </div>
        <Link
          to="/ground-0-briefing"
          data-testid="sticky-mobile-cta-btn"
          style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
            letterSpacing: "0.07em", textTransform: "uppercase",
            color: "#0b1628", background: "#d4900a",
            padding: "12px 20px", textDecoration: "none",
            flexShrink: 0, whiteSpace: "nowrap",
          }}
        >
          BEGIN →
        </Link>
      </div>
      <style>{`
        .sticky-mobile-cta { display: none !important; }
        @media (max-width: 680px) { .sticky-mobile-cta { display: flex !important; } }
      `}</style>
    </>
  );
}

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
      <StickyMobileCTA />
    </div>
  );
}
