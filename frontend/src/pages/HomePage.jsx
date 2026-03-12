import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AuthorityClockSection from "../components/AuthorityClockSection";
import ConsequenceNumberBlock from "../components/ConsequenceNumberBlock";
import AutoMethodTeaserSection from "../components/AutoMethodTeaserSection";
import FourPillarsSection from "../components/FourPillarsSection";
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
        <ConsequenceNumberBlock />
        <AutoMethodTeaserSection />
        <FourPillarsSection />
        <RecoveryPathBlock />
        <ComplianceMapTeaser />
        <VinceCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
