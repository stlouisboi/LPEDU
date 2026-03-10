import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FourPillarsSection from "../components/FourPillarsSection";
import SystemDiagramSection from "../components/SystemDiagramSection";
import DeadlySinsSection from "../components/DeadlySinsSection";
import PenaltyTableSection from "../components/PenaltyTableSection";
import TCOSection from "../components/TCOSection";
import ThreePathsSection from "../components/ThreePathsSection";
import AboutSection from "../components/AboutSection";
import NextStepSection from "../components/NextStepSection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <FourPillarsSection />
        <SystemDiagramSection />
        <DeadlySinsSection />
        <PenaltyTableSection />
        <TCOSection />
        <ThreePathsSection />
        <AboutSection />
        <NextStepSection />
      </main>
      <FooterSection />
    </div>
  );
}
