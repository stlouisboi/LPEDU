import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AuthorityClockSection from "../components/AuthorityClockSection";
import PhilosophyQuoteBlock from "../components/PhilosophyQuoteBlock";
import ConsequenceNumberBlock from "../components/ConsequenceNumberBlock";
import AutoMethodTeaserSection from "../components/AutoMethodTeaserSection";
import ProtectionDiagramSection from "../components/ProtectionDiagramSection";
import FourPillarsSection from "../components/FourPillarsSection";
import EngagementSection from "../components/EngagementSection";
import AuthorityReadinessTestSection from "../components/AuthorityReadinessTestSection";
import RecoveryPathBlock from "../components/RecoveryPathBlock";
import ComplianceMapTeaser from "../components/ComplianceMapTeaser";
import VinceCTASection from "../components/VinceCTASection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-onyx)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AuthorityClockSection />
        <PhilosophyQuoteBlock
          quote="Most failures in the first 90 days are not failures of commitment. They are failures of structure."
          attribution="Vince Lawrence, Station Custodian"
        />
        <ConsequenceNumberBlock />
        <AutoMethodTeaserSection />
        <ProtectionDiagramSection />
        <FourPillarsSection />
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
