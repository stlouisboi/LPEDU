const TRUCK_URL = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/r5n08jvy_image.png";

export default function TruckDividerSection() {
  return (
    <div style={{
      position: "relative",
      height: "420px",
      overflow: "hidden",
    }}>
      {/* Truck photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${TRUCK_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }} />

      {/* Top fade — blends with section above */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "120px",
        background: "linear-gradient(to bottom, #080f1e 0%, transparent 100%)",
      }} />

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,10,28,0.60)",
      }} />

      {/* Bottom fade — blends into EngagementSection */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "140px",
        background: "linear-gradient(to top, #080f1e 0%, transparent 100%)",
      }} />

      {/* Caption */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 1.5rem",
      }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          color: "rgba(255,255,255,0.80)",
          letterSpacing: "-0.01em",
          lineHeight: 1.4,
          textAlign: "center",
          maxWidth: 640,
        }}>
          Most new carriers start operating before any of this is in place.
        </p>
      </div>
    </div>
  );
}
