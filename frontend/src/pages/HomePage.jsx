import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import RegulatoryRealitySection from "../components/RegulatoryRealitySection";
import AuthorityClockSection from "../components/AuthorityClockSection";
import FourPillarsSection from "../components/FourPillarsSection";
import SystemDiagramSection from "../components/SystemDiagramSection";
import SystemArchitectureSection from "../components/SystemArchitectureSection";
import PhilosophicalLineSection from "../components/PhilosophicalLineSection";
import FailureRealitySection from "../components/FailureRealitySection";
import PenaltyTableSection from "../components/PenaltyTableSection";
import TCOSection from "../components/TCOSection";
import ThreePathsSection from "../components/ThreePathsSection";
import AboutSection from "../components/AboutSection";
import WhoNotForSection from "../components/WhoNotForSection";
import NextStepSection from "../components/NextStepSection";
import FinalCTASection from "../components/FinalCTASection";
import FooterSection from "../components/FooterSection";

const PHIL_1 = "The wise carrier builds the system before the audit. The audit only confirms what was already true.";
const PHIL_2 = "Most carriers wait until something goes wrong to learn what should have been built before they started. LaunchPath exists for the ones who refuse to wait.";
const PHIL_3 = "This program does not make you compliant. It gives you the infrastructure to stay compliant — which is a different thing entirely.";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-onyx)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <RegulatoryRealitySection />
        <AuthorityClockSection />
        <FourPillarsSection />
        <SystemDiagramSection />
        <PhilosophicalLineSection text={PHIL_1} />
        <SystemArchitectureSection />
        <FailureRealitySection />
        <PenaltyTableSection />
        <PhilosophicalLineSection text={PHIL_3} />
        <TCOSection />
        <ThreePathsSection />
        <PhilosophicalLineSection text={PHIL_2} />
        <AboutSection />
        <WhoNotForSection />
        <NextStepSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
