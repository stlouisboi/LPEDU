// BookMockupPage — three.js removed (38MB package, unused in production)
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

export default function BookMockupPage() {
  return (
    <div style={{ background: "#070e1c", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          3D Mockup Viewer — Not available in this build
        </p>
      </div>
      <FooterSection />
    </div>
  );
}
