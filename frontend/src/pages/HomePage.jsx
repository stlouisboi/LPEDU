import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AuthorityClockSection from "../components/AuthorityClockSection";
import PhilosophyQuoteBlock from "../components/PhilosophyQuoteBlock";
import ConsequenceNumberBlock from "../components/ConsequenceNumberBlock";
import AutoMethodTeaserSection from "../components/AutoMethodTeaserSection";
import HowItWorksSection from "../components/HowItWorksSection";
import ProtectionDiagramSection from "../components/ProtectionDiagramSection";
import MidPageStatement from "../components/MidPageStatement";
import FourPillarsSection from "../components/FourPillarsSection";
import TruckDividerSection from "../components/TruckDividerSection";
import EngagementSection from "../components/EngagementSection";
import AuthorityReadinessTestSection from "../components/AuthorityReadinessTestSection";
import RecoveryPathBlock from "../components/RecoveryPathBlock";
import ComplianceMapTeaser from "../components/ComplianceMapTeaser";
import VinceCTASection from "../components/VinceCTASection";
import WhatGetsInstalledSection from "../components/WhatGetsInstalledSection";
import FinalCTASection from "../components/FinalCTASection";
import FooterSection from "../components/FooterSection";
import { DoctrineStack } from "../components/DoctrineStack";

import OperatorQualifierSection from "../components/OperatorQualifierSection";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-onyx)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <OperatorQualifierSection />
        <WhatGetsInstalledSection />

        {/* Transition line */}
        <div style={{ background: "#060d19", borderBottom: "0.5px solid rgba(212,144,10,0.12)", padding: "2.5rem 1.5rem", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            maxWidth: 680,
            margin: "0 auto",
          }}>
            By the end of this system, your operation will not run the way it does today—and it shouldn't.
          </p>
        </div>

        <AuthorityClockSection />
        <PhilosophyQuoteBlock
          quote="Most failures in the first 90 days are not failures of commitment. They are failures of structure."
          attribution="Vince Lawrence, Station Custodian"
        />
        <ConsequenceNumberBlock />
        <HowItWorksSection />
        <AutoMethodTeaserSection />
        <ProtectionDiagramSection />

        {/* DoctrineStack — system reference block */}
        <section style={{
          background: "#000B17",
          borderTop: "1px solid rgba(212,144,10,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          padding: "4rem 1.5rem 0.5rem",
        }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.5)",
              marginBottom: "2rem",
            }}>LP-SYS-001 | AUTHORITY SURVIVAL FRAMEWORK</p>
            <DoctrineStack />
          </div>
        </section>

        {/* Dock divider — atmospheric visual break before Failure Analysis */}
        <div style={{
          position: "relative",
          height: 400,
          overflow: "hidden",
          backgroundImage: `url("https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/ft9osegn_hero-empty-dock.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
        }}>
          {/* Top fade */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, #000B17 0%, transparent 100%)", zIndex: 1 }} />
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,8,20,0.62)", zIndex: 1 }} />
          {/* Bottom fade */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 130, background: "linear-gradient(to top, #000508 0%, transparent 100%)", zIndex: 1 }} />
          {/* Text */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1.5rem", zIndex: 2 }}>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              color: "rgba(255,255,255,0.88)",
              letterSpacing: "-0.01em",
              lineHeight: 1.45,
              textAlign: "center",
              maxWidth: 660,
            }}>
              Every form. Every policy. Every log.<br />
              <span style={{ color: "#d4900a" }}>Built to survive a roadside inspection on Day 1.</span>
            </p>
          </div>
        </div>

        <MidPageStatement />        <FourPillarsSection />
        <TruckDividerSection />
        <EngagementSection />
        <AuthorityReadinessTestSection />
        <RecoveryPathBlock />
        <ComplianceMapTeaser />
        <VinceCTASection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
