import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AuthorityClockSection from "../components/AuthorityClockSection";
import AutoMethodTeaserSection from "../components/AutoMethodTeaserSection";
import FourPillarsSection from "../components/FourPillarsSection";
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
        <AutoMethodTeaserSection />
        <FourPillarsSection />
        <ComplianceMapTeaser />
        <VinceCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
