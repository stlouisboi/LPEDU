import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Navbar from "../components/Navbar";

const PRODUCTS = [
  {
    id: "pkt-001",
    code: "LP-PKT-001",
    type: "Compliance Packet",
    name: ["New Entrant", "Compliance", "Packet"],
    subtitle: "FMCSA New-Authority Operating Standard",
    price: "$97",
    depth: 0.10,
  },
  {
    id: "pkt-002",
    code: "LP-PKT-002",
    type: "Compliance Packet",
    name: ["Drug & Alcohol", "Compliance", "Packet"],
    subtitle: "Part 382 Compliance Operating Standard",
    price: "$127",
    depth: 0.10,
  },
  {
    id: "pkt-003",
    code: "LP-PKT-003",
    type: "Compliance Packet",
    name: ["HOS & Dispatch", "Packet"],
    subtitle: "Part 395 Hours-of-Service Operating Standard",
    price: "$127",
    depth: 0.10,
  },
  {
    id: "pkt-004",
    code: "LP-PKT-004",
    type: "Compliance Packet",
    name: ["Maintenance &", "Unit File Packet"],
    subtitle: "Part 396 Fleet Maintenance Operating Standard",
    price: "$127",
    depth: 0.10,
  },
  {
    id: "pkt-005",
    code: "LP-PKT-005",
    type: "Compliance Packet",
    name: ["Insurance &", "Authority Packet"],
    subtitle: "Carrier Authority & Insurance Operating Standard",
    price: "$127",
    depth: 0.10,
  },
  {
    id: "spec-001",
    code: "LP-SPEC-001",
    type: "Complete System",
    name: ["New Carrier", "Document System"],
    subtitle: "Complete LaunchPath Operating Standard",
    note: "All 5 packets + 0–30–90 Day Implementation Guide",
    price: "$497",
    depth: 0.22,
    isBundle: true,
  },
];

// ── Canvas texture builders ─────────────────────────────────────────────────

function drawFrontCover(product) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");
  const W = 1024, H = 1440, mX = 72;

  // Background
  ctx.fillStyle = product.isBundle ? "#00101f" : "#001030";
  ctx.fillRect(0, 0, W, H);

  // Subtle document lines
  ctx.strokeStyle = "rgba(212,144,10,0.04)";
  ctx.lineWidth = 1;
  for (let y = 60; y < H; y += 27) {
    ctx.beginPath();
    ctx.moveTo(mX, y);
    ctx.lineTo(W - mX, y);
    ctx.stroke();
  }

  // Left accent stripe with gradient
  const lGrad = ctx.createLinearGradient(0, 80, 0, H - 80);
  lGrad.addColorStop(0, "rgba(212,144,10,0.90)");
  lGrad.addColorStop(0.55, "rgba(212,144,10,0.55)");
  lGrad.addColorStop(1, "rgba(212,144,10,0.15)");
  ctx.fillStyle = lGrad;
  ctx.fillRect(50, 80, product.isBundle ? 4 : 3, H - 160);

  // Top rule
  ctx.fillStyle = "#d4900a";
  ctx.fillRect(mX, 72, W - mX * 2, product.isBundle ? 3 : 2);
  if (product.isBundle) {
    ctx.fillStyle = "rgba(212,144,10,0.35)";
    ctx.fillRect(mX, 78, W - mX * 2, 1);
  }

  // LP code badge
  const bH = 50;
  ctx.strokeStyle = "rgba(212,144,10,0.42)";
  ctx.lineWidth = 1;
  ctx.strokeRect(mX + 0.5, 100.5, 228, bH);
  ctx.fillStyle = "rgba(212,144,10,0.07)";
  ctx.fillRect(mX, 100, 228, bH);
  ctx.fillStyle = "#d4900a";
  ctx.font = "bold 21px 'Courier New', monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(product.code, mX + 14, 125);
  ctx.textBaseline = "alphabetic";

  // Product type
  ctx.fillStyle = "rgba(212,144,10,0.52)";
  ctx.font = "600 16px Arial, sans-serif";
  ctx.fillText(product.type.toUpperCase(), mX, 196);

  // Title lines
  ctx.fillStyle = "#FFFFFF";
  const tSize = product.name.length <= 2 ? 86 : 72;
  const lH = tSize * 1.16;
  let titleY = product.name.length <= 2 ? 340 : 290;

  // Bundle gets extra treatment — faint rule above title
  if (product.isBundle) {
    ctx.fillStyle = "rgba(212,144,10,0.18)";
    ctx.fillRect(mX, titleY - 42, 320, 1);
  }

  ctx.fillStyle = "#FFFFFF";
  product.name.forEach((line, i) => {
    ctx.font = `800 ${tSize}px 'Arial Black', Arial, sans-serif`;
    ctx.fillText(line, mX, titleY + i * lH);
  });

  // Mid divider
  const divY = titleY + product.name.length * lH + 52;
  ctx.fillStyle = "rgba(212,144,10,0.38)";
  ctx.fillRect(mX, divY, W - mX * 2 - 80, 1.5);

  // Subtitle
  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.font = "400 29px Arial, sans-serif";
  ctx.fillText(product.subtitle, mX, divY + 52);

  // Bundle note line
  if (product.note) {
    ctx.fillStyle = "rgba(212,144,10,0.58)";
    ctx.font = "400 24px Arial, sans-serif";
    ctx.fillText(product.note, mX, divY + 96);
  }

  // Bottom rule (double for bundle)
  ctx.fillStyle = "#d4900a";
  ctx.fillRect(mX, H - 192, W - mX * 2, product.isBundle ? 3 : 2);
  if (product.isBundle) {
    ctx.fillStyle = "rgba(212,144,10,0.35)";
    ctx.fillRect(mX, H - 186, W - mX * 2, 1);
  }

  // LaunchPath wordmark
  ctx.fillStyle = "rgba(212,144,10,0.88)";
  ctx.font = "bold 25px Arial, sans-serif";
  ctx.fillText("LAUNCHPATH", mX, H - 148);
  ctx.fillStyle = "rgba(255,255,255,0.38)";
  ctx.font = "400 17px Arial, sans-serif";
  ctx.fillText("TRANSPORTATION EDUCATION", mX, H - 118);

  // Price (bottom right)
  ctx.fillStyle = "rgba(212,144,10,0.72)";
  ctx.font = `600 ${product.isBundle ? 32 : 28}px Arial, sans-serif`;
  ctx.textAlign = "right";
  ctx.fillText(product.price, W - mX, H - 148);
  ctx.textAlign = "left";

  return canvas;
}

function drawSpine(product) {
  // Spine aspect matches depth:height = e.g. 0.10:1.40
  const canvas = document.createElement("canvas");
  canvas.width = 80;
  canvas.height = 1120;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#001030";
  ctx.fillRect(0, 0, 80, 1120);

  // Gold edge line
  ctx.fillStyle = "rgba(212,144,10,0.65)";
  ctx.fillRect(77, 0, 3, 1120);

  // Rotated text (standard book: reads bottom-to-top)
  ctx.save();
  ctx.translate(40, 560);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";

  ctx.fillStyle = "rgba(255,255,255,0.80)";
  ctx.font = "bold 32px Arial, sans-serif";
  ctx.fillText(product.name.join(" "), 0, -8);

  ctx.fillStyle = "rgba(212,144,10,0.60)";
  ctx.font = "600 20px Arial, sans-serif";
  ctx.fillText("LAUNCHPATH", 0, 22);

  ctx.restore();
  return canvas;
}

function drawBack(product) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");
  const W = 1024, H = 1440, mX = 80;

  ctx.fillStyle = "#000d22";
  ctx.fillRect(0, 0, W, H);

  // Subtle lines
  ctx.strokeStyle = "rgba(212,144,10,0.03)";
  ctx.lineWidth = 1;
  for (let y = 60; y < H; y += 27) {
    ctx.beginPath(); ctx.moveTo(mX, y); ctx.lineTo(W - mX, y); ctx.stroke();
  }

  // Center LP mark
  ctx.fillStyle = "rgba(212,144,10,0.12)";
  ctx.font = "bold 96px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("LP", W / 2, H / 2 - 20);

  ctx.fillStyle = "rgba(212,144,10,0.08)";
  ctx.font = "400 22px Arial, sans-serif";
  ctx.fillText("LAUNCHPATH TRANSPORTATION EDUCATION", W / 2, H / 2 + 40);
  ctx.textAlign = "left";

  // Top and bottom rules
  ctx.fillStyle = "rgba(212,144,10,0.5)";
  ctx.fillRect(mX, 72, W - mX * 2, 1.5);
  ctx.fillRect(mX, H - 100, W - mX * 2, 1.5);

  // Product code bottom
  ctx.fillStyle = "rgba(212,144,10,0.45)";
  ctx.font = "600 18px 'Courier New', monospace";
  ctx.fillText(product.code, mX, H - 68);

  return canvas;
}

function drawEdge() {
  const canvas = document.createElement("canvas");
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e8e0d0";
  ctx.fillRect(0, 0, 64, 64);
  // Subtle page lines
  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1;
  for (let i = 4; i < 64; i += 8) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(64, i); ctx.stroke();
  }
  return canvas;
}

// ── Single book renderer ─────────────────────────────────────────────────────

function BookRenderer({ product }) {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);
  const stateRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const DW = 360, DH = 504;

    // Wait for fonts before drawing textures
    document.fonts.ready.then(() => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000c1a);

      // Soft vignette environment
      scene.fog = new THREE.Fog(0x000c1a, 8, 20);

      const camera = new THREE.PerspectiveCamera(38, DW / DH, 0.1, 20);
      camera.position.set(1.75, 0.55, 3.1);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(DW, DH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mount.appendChild(renderer.domElement);

      // Lights — 3-point setup
      scene.add(new THREE.AmbientLight(0xffffff, 0.22));

      const key = new THREE.DirectionalLight(0xfff8e0, 3.2);
      key.position.set(4, 7, 5);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.bias = -0.001;
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xd0e8ff, 0.9);
      fill.position.set(-4, 2, 2);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xfff0c0, 0.7);
      rim.position.set(-1, -2, -4);
      scene.add(rim);

      // Book geometry
      const bookW = 1.0, bookH = 1.40;
      const geo = new THREE.BoxGeometry(bookW, bookH, product.depth);

      // Build canvas textures
      const frontCanvas = drawFrontCover(product);
      const spineCanvas = drawSpine(product);
      const backCanvas = drawBack(product);
      const edgeCanvas = drawEdge();

      const toTex = (c) => {
        const t = new THREE.CanvasTexture(c);
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return t;
      };

      const mats = [
        new THREE.MeshStandardMaterial({ color: 0x001428, roughness: 0.88 }),  // +x
        new THREE.MeshStandardMaterial({ map: toTex(spineCanvas), roughness: 0.80 }), // -x spine
        new THREE.MeshStandardMaterial({ map: toTex(edgeCanvas), roughness: 0.92 }),  // +y top
        new THREE.MeshStandardMaterial({ map: toTex(edgeCanvas), roughness: 0.92 }),  // -y bottom
        new THREE.MeshStandardMaterial({ map: toTex(frontCanvas), roughness: 0.70, metalness: 0.04 }), // +z front
        new THREE.MeshStandardMaterial({ map: toTex(backCanvas), roughness: 0.85 }),  // -z back
      ];

      const book = new THREE.Mesh(geo, mats);
      book.rotation.y = -0.38;
      book.rotation.x = 0.04;
      book.castShadow = true;
      scene.add(book);

      // Shadow floor
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.ShadowMaterial({ opacity: 0.45 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -bookH / 2 - 0.02;
      floor.receiveShadow = true;
      scene.add(floor);

      // Orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enableZoom = true;
      controls.minDistance = 2.2;
      controls.maxDistance = 5.5;
      controls.target.set(0, 0, 0);

      // Store for download
      stateRef.current = { renderer, scene, camera };
      setReady(true);

      let rafId;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(rafId);
        controls.dispose();
        geo.dispose();
        mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    });
  }, [product]);

  const handleDownload = () => {
    const { renderer, scene, camera } = stateRef.current;
    if (!renderer) return;
    renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${product.code}-mockup.png`;
    a.click();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {/* Canvas mount */}
      <div
        ref={mountRef}
        style={{
          width: 360, height: 504,
          background: "#060d19",
          cursor: "grab",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
        }}
      />
      {/* Download button */}
      <button
        data-testid={`download-btn-${product.id}`}
        onClick={handleDownload}
        disabled={!ready}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.784rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: ready ? "#d4900a" : "rgba(212,144,10,0.35)",
          background: "transparent",
          border: `1px solid ${ready ? "rgba(212,144,10,0.45)" : "rgba(212,144,10,0.15)"}`,
          padding: "0.6rem 1.5rem",
          cursor: ready ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { if (ready) { e.currentTarget.style.background = "rgba(212,144,10,0.08)"; }}}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        {ready ? "Download PNG" : "Loading…"}
      </button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BookMockupPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#060d19" }}>
      <Navbar />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "3rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.616rem",
            color: "rgba(212,144,10,0.75)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}>
            LP-ART-001 | Product Mockup Library
          </p>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}>
            3D Product Covers
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            maxWidth: 480,
          }}>
            Drag to rotate each book. Click <strong style={{ color: "rgba(212,144,10,0.8)" }}>Download PNG</strong> to save the render for your Gumroad product listing.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "4rem 3rem",
        }}>
          {PRODUCTS.map((product) => (
            <div key={product.id}>
              {/* Product label above book */}
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.608rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "rgba(212,144,10,0.65)",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}>
                  {product.code}
                </p>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.94rem",
                  color: "rgba(255,255,255,0.85)",
                }}>
                  {product.name.join(" ")}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.40)",
                  marginTop: "0.2rem",
                }}>
                  {product.price}
                  {product.isBundle && (
                    <span style={{ color: "rgba(212,144,10,0.55)", marginLeft: "0.75rem" }}>
                      Bundle
                    </span>
                  )}
                </p>
              </div>

              <BookRenderer product={product} />
            </div>
          ))}
        </div>

        {/* Usage note */}
        <div style={{
          marginTop: "5rem",
          paddingTop: "2.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-start",
          maxWidth: 640,
        }}>
          <div style={{ width: 3, height: 48, background: "rgba(212,144,10,0.4)", flexShrink: 0, marginTop: 2 }} />
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.75,
          }}>
            Downloads are PNG renders from the live scene. For best Gumroad results, upload a cover at least 640×900px.
            These renders output at approximately 720×1008px at standard display density.
          </p>
        </div>

      </div>
    </div>
  );
}
