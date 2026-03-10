import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FourPillarsSection from "./components/FourPillarsSection";
import DeadlySinsSection from "./components/DeadlySinsSection";
import AboutSection from "./components/AboutSection";
import NextStepSection from "./components/NextStepSection";
import FooterSection from "./components/FooterSection";

function App() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        {/* Section 1 — Orientation */}
        <HeroSection />
        {/* Section 2 — Four Pillars */}
        <FourPillarsSection />
        {/* Section 3 — 16 Deadly Sins */}
        <DeadlySinsSection />
        {/* Section 4 — Proof + Founder */}
        <AboutSection />
        {/* Section 5 — Next Step + One CTA */}
        <NextStepSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
