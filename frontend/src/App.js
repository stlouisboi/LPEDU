import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FourPillarsSection from "./components/FourPillarsSection";
import StepsSection from "./components/StepsSection";
import PenaltyTableSection from "./components/PenaltyTableSection";
import TCOSection from "./components/TCOSection";
import ThreePathsSection from "./components/ThreePathsSection";
import AboutSection from "./components/AboutSection";
import AdmissionSection from "./components/AdmissionSection";
import FooterSection from "./components/FooterSection";

function App() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <FourPillarsSection />
        <StepsSection />
        <PenaltyTableSection />
        <TCOSection />
        <ThreePathsSection />
        <AboutSection />
        <AdmissionSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
