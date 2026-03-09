import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FourPillarsSection from "./components/FourPillarsSection";
import StepsSection from "./components/StepsSection";
import PenaltyTableSection from "./components/PenaltyTableSection";
import TCOSection from "./components/TCOSection";
import ThreePathsSection from "./components/ThreePathsSection";
import FooterSection from "./components/FooterSection";

function App() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <FourPillarsSection />
        <StepsSection />
        {/* Cost Exposure / Penalty Table — sequence load-bearing: table before calculator */}
        <PenaltyTableSection />
        {/* TCO Calculator — RUN YOUR OWN NUMBERS — positioned AFTER penalty table, BEFORE Three Paths */}
        <TCOSection />
        {/* Three Paths — carrier reads this AFTER doing the math */}
        <ThreePathsSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
