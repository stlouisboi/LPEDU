import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FourPillarsSection from "../components/FourPillarsSection";
import DeadlySinsSection from "../components/DeadlySinsSection";
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
        <DeadlySinsSection />
        <AboutSection />
        <NextStepSection />
      </main>
      <FooterSection />
    </div>
  );
}
