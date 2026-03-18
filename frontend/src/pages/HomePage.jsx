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
import FooterSection from "../components/FooterSection";
import { DoctrineStack } from "../components/DoctrineStack";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-onyx)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <WhatGetsInstalledSection />

        {/* Transition line */}
        <div style={{ background: "#000C1A", borderBottom: "0.5px solid rgba(197,160,89,0.12)", padding: "2.5rem 1.5rem", textAlign: "center" }}>
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
          borderTop: "1px solid rgba(197,160,89,0.1)",
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
              color: "rgba(197,160,89,0.5)",
              marginBottom: "2rem",
            }}>LP-SYS-001 | AUTHORITY SURVIVAL FRAMEWORK</p>
            <DoctrineStack />
          </div>
        </section>

        <MidPageStatement />
        <FourPillarsSection />
        <TruckDividerSection />
        <EngagementSection />
        <AuthorityReadinessTestSection />
        <RecoveryPathBlock />
        <ComplianceMapTeaser />
        <VinceCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
