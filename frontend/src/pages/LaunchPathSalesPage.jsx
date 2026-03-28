import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import useSEO from "../hooks/useSEO";
import Navbar from "../components/Navbar";
import { T, mono, serif, display } from "../components/sales/tokens";
import { SectionLabel, SectionDivider, CTAButton } from "../components/sales/SharedComponents";

// ── Below-fold sections: code-split and lazily hydrated ──────────────────────
const ProblemSection        = dynamic(() => import("../components/sales/sections/ProblemSection"),        { ssr: true });
const HowItWorksSection     = dynamic(() => import("../components/sales/sections/HowItWorksSection"),     { ssr: true });
const WhatIsIncludedSection = dynamic(() => import("../components/sales/sections/WhatIsIncludedSection"), { ssr: true });
const WhoIsItForSection     = dynamic(() => import("../components/sales/sections/WhoIsItForSection"),     { ssr: true });
const PricingSection        = dynamic(() => import("../components/sales/sections/PricingSection"),        { ssr: true });
const AuthorizationPathsSection = dynamic(() => import("../components/sales/sections/AuthorizationPathsSection"), { ssr: true });
const FAQSection            = dynamic(() => import("../components/sales/sections/FAQSection"),            { ssr: true });
const FinalCTASection       = dynamic(() => import("../components/sales/sections/FinalCTASection"),       { ssr: true });

const API_URL = process.env.REACT_APP_BACKEND_URL;

// ── Nav (above fold, static) ─────────────────────────────────────────────────
function Nav({ scrollToAdmission }) {
  return (
    <>
      <Navbar />
      <div style={{
        background: "rgba(11,18,32,0.97)",
        borderBottom: `1px solid ${T.navyBorder}`,
        padding: "0.75rem 2.5rem",
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <CTAButton onClick={scrollToAdmission} primary style={{ padding: "10px 24px", fontSize: 11, minHeight: 40 }}>
          REQUEST ADMISSION →
        </CTAButton>
      </div>
    </>
  );
}

// ── Hero (above fold, static) ─────────────────────────────────────────────────
function Hero({ scrollToAdmission, seatsRemaining }) {
  return (
    <section style={{ background: T.navy, borderBottom: `1px solid ${T.navyBorder}`, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `repeating-linear-gradient(0deg, ${T.gold} 0px, ${T.gold} 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, ${T.gold} 0px, ${T.gold} 1px, transparent 1px, transparent 60px)`,
        pointerEvents: "none",
      }} />
      <div className="lp-hero-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px clamp(20px, 5vw, 40px) 80px" }}>
        <div className="fade-up">
          <SectionLabel>LP-STD-001 · COHORT ENROLLMENT · 12 CARRIERS MAXIMUM</SectionLabel>
        </div>
        <h1 className="hero-headline fade-up-2" style={{ ...display, fontSize: 64, fontWeight: 900, color: T.white, lineHeight: 1.1, maxWidth: 800, marginBottom: 28 }}>
          Your Authority Is Active.<br />
          <span style={{ color: T.goldText }}>The Audit Window<br />Is Already Open.</span>
        </h1>
        <p className="fade-up-3" style={{ ...serif, fontSize: 19, color: T.mist, lineHeight: 1.7, maxWidth: 640, marginBottom: 40 }}>
          Between Month 9 and Month 18, FMCSA shows up.
          They don't check your driving. They check your paperwork.
          The LaunchPath Standard installs the compliance infrastructure
          they expect to find — in 90 days, before they come looking.
        </p>

        <div className="trust-anchors" style={{ display: "flex", gap: 28, marginBottom: 40, flexWrap: "wrap" }}>
          {["Verified against 49 CFR", "Built on federal audit criteria", "12 carriers maximum per cohort"].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 4, height: 4, background: T.gold, transform: "rotate(45deg)", flexShrink: 0 }} />
              <span style={{ ...mono, fontSize: 11, color: T.fog, letterSpacing: "0.08em" }}>{t}</span>
            </div>
          ))}
        </div>

        {seatsRemaining !== null && (
          <div data-testid="seats-remaining-counter" style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            background: T.navyCard,
            border: `1px solid ${seatsRemaining <= 3 ? "#8B3535" : T.navyBorder}`,
            borderLeft: `3px solid ${seatsRemaining <= 3 ? "#C05555" : T.gold}`,
            padding: "12px 20px", marginBottom: 32,
          }}>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 8,
                  background: i < (12 - seatsRemaining) ? T.goldDim : T.navyBorder,
                  border: `1px solid ${i < (12 - seatsRemaining) ? T.gold : T.fog}`,
                  transform: "rotate(45deg)",
                }} />
              ))}
            </div>
            <div>
              <span style={{ ...mono, fontSize: 11, color: seatsRemaining <= 3 ? "#C05555" : T.goldText, letterSpacing: "0.12em", fontWeight: 600 }}>
                {seatsRemaining} OF 12 SEATS REMAINING
              </span>
              {seatsRemaining <= 3 && (
                <span style={{ ...mono, fontSize: 10, color: T.fog, marginLeft: 12 }}>· FIRST COHORT CLOSING</span>
              )}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
          <CTAButton onClick={scrollToAdmission} primary data-testid="hero-request-admission-btn">REQUEST ADMISSION → NO PAYMENT AT THIS STEP</CTAButton>
          <p style={{ ...mono, fontSize: 15, color: T.fog, letterSpacing: "0.06em", lineHeight: 1.6 }}>
            Admission is reviewed individually. Decision within 24–48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Page orchestrator ─────────────────────────────────────────────────────────
export default function LaunchPathSalesPage() {
  const admissionRef = useRef(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [seatsRemaining, setSeatsRemaining] = useState(null);

  useSEO({
    title: "Enroll in the LaunchPath Standard",
    description: "Install the federal compliance infrastructure FMCSA expects before your audit window opens. $2,500 — 12 carriers maximum per cohort.",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/cohort-seats`)
      .then(r => r.json())
      .then(d => setSeatsRemaining(d.remaining))
      .catch(() => {});
  }, []);

  const scrollToAdmission = () => admissionRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleAuthorize = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/create-program-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin_url: window.location.origin }),
      });
      const data = await res.json();
      if (data.checkout_url) window.location.href = data.checkout_url;
      else setCheckoutLoading(false);
    } catch {
      setCheckoutLoading(false);
    }
  };

  const handlePhased  = () => { window.location.href = "/admission"; };
  const handleReach   = () => { window.location.href = "/reach-diagnostic"; };
  const handleBundle  = () => { window.location.href = "/bundle"; };

  return (
    <div data-testid="launchpath-sales-page" style={{ background: T.navy, minHeight: "100vh", color: T.white }}>
      <Nav scrollToAdmission={scrollToAdmission} />
      <Hero scrollToAdmission={scrollToAdmission} seatsRemaining={seatsRemaining} />
      <SectionDivider line="The audit does not announce itself until it is already scheduled." />
      <ProblemSection />
      <SectionDivider line="Failure here is structural, not personal." />
      <HowItWorksSection handleAuthorize={handleAuthorize} checkoutLoading={checkoutLoading} />
      <SectionDivider line="The system either exists or it doesn't." />
      <WhatIsIncludedSection />
      <WhoIsItForSection handleReach={handleReach} />
      <PricingSection scrollToAdmission={scrollToAdmission} handleBundle={handleBundle} />
      <AuthorizationPathsSection admissionRef={admissionRef} handleAuthorize={handleAuthorize} handlePhased={handlePhased} checkoutLoading={checkoutLoading} />
      <FAQSection />
      <FinalCTASection handleAuthorize={handleAuthorize} checkoutLoading={checkoutLoading} handlePhased={handlePhased} handleBundle={handleBundle} />
    </div>
  );
}
