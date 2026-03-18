import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { Reflector } from "three/addons/objects/Reflector.js";

// ── Brand constants ─────────────────────────────────────────────────────────
const NAVY   = "#0b1628";
const GOLD   = "#d4900a";
const SPINE  = "#000c1c";
const CREAM  = "#ede8dc";

// ── Product catalogue ────────────────────────────────────────────────────────
export const BOOK_PRODUCTS = [
  {
    id: "new-entrant",
    code: "LP-PKT-001",
    name: "New Entrant Compliance Packet",
    packetNum: "01 OF 05",
    domainLabel: "NEW ENTRANT DOMAIN",
    titleL1: "New Entrant",
    titleL2: "Compliance",
    titleL3: "Packet",
    outcomeLine: "Built for new entrant audit readiness",
    spineLabel: "LP-DOC-001",
    panel: {
      whatsInside: ["Audit readiness brief", "Pre-launch checklist", "Document index", "Unified folder structure", "Weekend install guide"],
      regBasis: "49 CFR Parts 385, 390–396",
      domain: "New entrant authority",
      format: "Instant download PDF / Checklist + templates",
    },
  },
  {
    id: "drug-alcohol",
    code: "LP-PKT-002",
    name: "Drug & Alcohol Compliance Packet",
    packetNum: "02 OF 05",
    domainLabel: "DRUG & ALCOHOL DOMAIN",
    titleL1: "Drug & Alcohol",
    titleL2: "Compliance",
    titleL3: "Packet",
    outcomeLine: "Install your Part 382 program correctly",
    spineLabel: "LP-DOC-002",
    panel: {
      whatsInside: ["Part 382 regulatory brief", "Program setup checklist", "Written policy outline", "Driver handout template", "Recordkeeping + trigger log"],
      regBasis: "49 CFR Parts 382, 40",
      domain: "Drug & alcohol program",
      format: "Instant download PDF / Policy + templates",
    },
  },
  {
    id: "hos-dispatch",
    code: "LP-PKT-003",
    name: "HOS & Dispatch Packet",
    packetNum: "03 OF 05",
    domainLabel: "HOS & DISPATCH DOMAIN",
    titleL1: "HOS & Dispatch",
    titleL2: "Compliance",
    titleL3: "Packet",
    outcomeLine: "Dispatch standards and log discipline",
    spineLabel: "LP-DOC-003",
    panel: {
      whatsInside: ["HOS rules brief", "Dispatch standards checklist", "ELD usage checklist", "Daily/weekly review checklist", "Weekend install guide"],
      regBasis: "49 CFR Parts 395, 392",
      domain: "Hours of service / dispatch",
      format: "Instant download PDF / Checklist + standards",
    },
  },
  {
    id: "maintenance",
    code: "LP-PKT-004",
    name: "Maintenance & Unit File Packet",
    packetNum: "04 OF 05",
    domainLabel: "MAINTENANCE DOMAIN",
    titleL1: "Maintenance &",
    titleL2: "Unit File",
    titleL3: "Packet",
    outcomeLine: "A file for every VIN in your fleet",
    spineLabel: "LP-DOC-004",
    panel: {
      whatsInside: ["Part 396 maintenance brief", "Unit file template per VIN", "PM schedule outline", "Pre-trip inspection checklist", "Defect & repair tracking sheet"],
      regBasis: "49 CFR Parts 396, 393",
      domain: "Vehicle maintenance",
      format: "Instant download PDF / Template + checklist",
    },
  },
  {
    id: "insurance",
    code: "LP-PKT-005",
    name: "Insurance & Authority Packet",
    packetNum: "05 OF 05",
    domainLabel: "INSURANCE DOMAIN",
    titleL1: "Insurance &",
    titleL2: "Authority",
    titleL3: "Packet",
    outcomeLine: "Continuity from day one of authority",
    spineLabel: "LP-DOC-005",
    panel: {
      whatsInside: ["Coverage types brief", "Contract risk checklist", "90-day renewal prep", "Authority status checklist", "Weekend install guide"],
      regBasis: "49 CFR Parts 387, 390",
      domain: "Insurance & authority",
      format: "Instant download PDF / Checklist + prep guide",
    },
  },
  {
    id: "bundle",
    code: "LP-SYS-001",
    name: "New Carrier Document System",
    packetNum: "COMPLETE SYSTEM",
    domainLabel: "ALL 5 DOMAINS",
    titleL1: "New Carrier",
    titleL2: "Document",
    titleL3: "System",
    outcomeLine: "The complete DIY compliance infrastructure",
    spineLabel: "LP-SYS-001",
    panel: {
      whatsInside: ["All 5 compliance packets", "Unified folder structure", "0–30–90 day guide", "6 compliance domains", "Weekend install sequence"],
      regBasis: "49 CFR Parts 385–396",
      domain: "Complete system — all domains",
      format: "Instant download PDF / $138 saved vs à la carte",
    },
  },
  {
    id: "standard",
    code: "LP-STD-001",
    name: "LaunchPath Standard",
    packetNum: "GUIDED IMPLEMENTATION",
    domainLabel: "90-DAY STANDARD",
    titleL1: "Compliance",
    titleL2: "Operating",
    titleL3: "Standard",
    outcomeLine: "Guided implementation — all five domains",
    spineLabel: "LP-STD-001",
    panel: {
      whatsInside: ["Complete document system", "90-day guided sequence", "Five custodian checkpoints", "Cohort access + Q&A", "Audit-ready at day 90"],
      regBasis: "Entry: Ground 0 completion required",
      domain: "Guided implementation / All 5 domains",
      format: "Guided implementation / All five domains",
    },
  },
];

// ── Texture creators ─────────────────────────────────────────────────────────
function createCoverTexture(product) {
  const W = 2048, H = 1365;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");

  // Navy background
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, W, H);

  // Subtle grid pattern
  ctx.strokeStyle = "rgba(212,144,10,0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Gold top band — thick, full-bleed, gradient
  const topGrad = ctx.createLinearGradient(0, 0, W, 0);
  topGrad.addColorStop(0, "#A8883A");
  topGrad.addColorStop(0.35, "#D4B87A");
  topGrad.addColorStop(0.65, "#d4900a");
  topGrad.addColorStop(1, "#A8883A");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, 90);   // 90px — prominent at render size

  // Gold bottom band
  ctx.fillRect(0, H - 90, W, 90);

  // Thin inner rule (separation line below top band)
  ctx.fillStyle = "rgba(212,144,10,0.35)";
  ctx.fillRect(0, 205, W, 2);

  // System label
  ctx.fillStyle = GOLD;
  ctx.font = 'bold 40px "Courier New", Courier, monospace';
  ctx.fillText(`PACKET ${product.packetNum}  \u00B7  ${product.domainLabel}`, 80, 150);

  // Large faint LP watermark — very subtle
  ctx.fillStyle = "rgba(212,144,10,0.025)";
  ctx.font = 'bold 500px Georgia, "Times New Roman", serif';
  ctx.fillText("LP", 1350, 1250);

  // Title L1 + L2 (white bold)
  ctx.fillStyle = "#FFFFFF";
  ctx.font = 'bold 148px Georgia, "Times New Roman", serif';
  ctx.fillText(product.titleL1, 80, 520);
  ctx.fillText(product.titleL2, 80, 680);

  // Title L3 (gold)
  ctx.fillStyle = GOLD;
  ctx.fillText(product.titleL3, 80, 840);

  // Outcome line
  ctx.fillStyle = "rgba(255,255,255,0.52)";
  ctx.font = '50px Georgia, "Times New Roman", serif';
  ctx.fillText(product.outcomeLine, 80, 1010);

  // Decorative gold rule
  ctx.strokeStyle = "rgba(212,144,10,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(80, 1100); ctx.lineTo(1968, 1100); ctx.stroke();

  // Brand line
  ctx.fillStyle = "rgba(212,144,10,0.55)";
  ctx.font = 'bold 34px "Courier New", Courier, monospace';
  ctx.fillText("LAUNCHPATHEDU.COM", 80, 1260);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSpineTexture(spineLabel) {
  const W = 256, H = 1024;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, SPINE); grad.addColorStop(1, "#001428");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Gold border strips
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, 5, H);
  ctx.fillRect(0, 0, W, 10);
  ctx.fillRect(0, H - 10, W, 10);

  // Spine label (vertical, rotated)
  ctx.save();
  ctx.translate(W / 2 + 6, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = GOLD;
  ctx.font = 'bold 30px "Courier New", Courier, monospace';
  ctx.textAlign = "center";
  ctx.fillText(spineLabel, 0, 0);
  ctx.restore();

  // LaunchPath vertical text
  ctx.save();
  ctx.translate(W / 2, H - 60);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "rgba(212,144,10,0.55)";
  ctx.font = '20px "Courier New", Courier, monospace';
  ctx.textAlign = "center";
  ctx.fillText("LaunchPath", 0, 0);
  ctx.restore();

  const spineTex = new THREE.CanvasTexture(c);
  spineTex.colorSpace = THREE.SRGBColorSpace;
  return spineTex;
}

function createPageEdgeTexture() {
  const W = 512, H = 1024;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");

  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);

  for (let y = 0; y < H; y += 2 + Math.random() * 3) {
    const alpha = 0.08 + Math.random() * 0.12;
    ctx.strokeStyle = `rgba(140,120,95,${alpha})`;
    ctx.lineWidth = 0.5 + Math.random() * 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y + (Math.random() - 0.5) * 1.5);
    ctx.stroke();
  }

  const spineGrad = ctx.createLinearGradient(0, 0, 80, 0);
  spineGrad.addColorStop(0, "rgba(0,0,0,0.4)");
  spineGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = spineGrad;
  ctx.fillRect(0, 0, 80, H);

  const pageTex = new THREE.CanvasTexture(c);
  pageTex.colorSpace = THREE.SRGBColorSpace;
  return pageTex;
}

function createBackCoverTexture() {
  const W = 2048, H = 1365;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "#001428";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, W, 14);
  ctx.fillRect(0, H - 14, W, 14);

  ctx.fillStyle = "rgba(212,144,10,0.08)";
  ctx.font = 'bold 320px Georgia, "Times New Roman", serif';
  ctx.textAlign = "center";
  ctx.fillText("LP", W / 2, H / 2 + 90);

  ctx.fillStyle = "rgba(212,144,10,0.65)";
  ctx.font = 'bold 44px "Courier New", Courier, monospace';
  ctx.textAlign = "center";
  ctx.fillText("LAUNCHPATH TRANSPORTATION EDU", W / 2, H - 90);
  ctx.font = '32px "Courier New", Courier, monospace';
  ctx.fillText("launchpathedu.com", W / 2, H - 44);

  const backTex = new THREE.CanvasTexture(c);
  backTex.colorSpace = THREE.SRGBColorSpace;
  return backTex;
}

// ── Main component ────────────────────────────────────────────────────────────
export function BookMockup3D({ productId = "new-entrant", mode = "embed" }) {
  const mountRef   = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef   = useRef(null);
  const cameraRef  = useRef(null);
  const groupRef   = useRef(null);
  const animRef    = useRef(null);

  useEffect(() => {
    const product = BOOK_PRODUCTS.find(p => p.id === productId) || BOOK_PRODUCTS[0];
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth || 800;
    const H = Math.round(W * (9 / 16));

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.borderRadius = "6px";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000814);
    scene.fog = new THREE.FogExp2(0x000814, 0.055);
    sceneRef.current = scene;

    // ── Environment — keep intensity very low so canvas colors dominate ────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.12;   // low: just adds specular sheen, no colour cast
    pmrem.dispose();

    // ── Camera — pulled in closer, fills frame better ─────────────────────────
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
    camera.position.set(0.1, 0.8, 3.8);
    camera.lookAt(0, 0.3, 0);
    cameraRef.current = camera;

    // ── Textures ──────────────────────────────────────────────────────────────
    const coverTex   = createCoverTexture(product);
    const spineTex   = createSpineTexture(product.spineLabel);
    const pageTex    = createPageEdgeTexture();
    const backTex    = createBackCoverTexture();
    const topMat     = new THREE.MeshStandardMaterial({ color: 0xede8dc, roughness: 0.85 });

    // ── Materials ─────────────────────────────────────────────────────────────
    const coverMat = new THREE.MeshPhysicalMaterial({
      map: coverTex, roughness: 0.35, metalness: 0.08,
      clearcoat: 0.3, clearcoatRoughness: 0.2,
      envMapIntensity: 0.25,   // subtle specular only — canvas colors stay true
    });
    const spineMat = new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.45 });
    const pageMat  = new THREE.MeshStandardMaterial({ map: pageTex, roughness: 0.82 });
    const backMat  = new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.4 });

    // ── Book dimensions ───────────────────────────────────────────────────────
    const bW = 2.4, bH = 1.65, bD = 0.28;
    // Face order: [+x right=pages, -x left=spine, +y top, -y bottom, +z front=cover, -z back]
    const bookMats = [pageMat, spineMat, topMat, topMat, coverMat, backMat];

    // ── Book group (rotation applied as a unit) ───────────────────────────────
    const group = new THREE.Group();
    group.rotation.y = 0.44; // ~25°
    group.rotation.x = -0.04;
    groupRef.current = group;

    // Main (top) book
    const book1 = new THREE.Mesh(new THREE.BoxGeometry(bW, bH, bD), bookMats);
    book1.position.set(0, bH / 2 + bH + 0.015, 0);
    book1.castShadow = true;
    group.add(book1);

    // Bottom book (same product, slight offset for depth)
    const book2 = new THREE.Mesh(new THREE.BoxGeometry(bW, bH, bD), bookMats);
    book2.position.set(0.05, bH / 2, -0.06);
    book2.castShadow = true;
    group.add(book2);

    // No separate 3D band geometry — canvas texture owns the gold bands at full bleed.
    // The clearcoat on coverMat gives the metallic sheen without alignment issues.

    group.position.set(-0.15, -0.9, 0);
    scene.add(group);

    // ── Floor — dark matte base ───────────────────────────────────────────────
    const floorGeo = new THREE.PlaneGeometry(24, 24);

    // Grain texture for the floor
    const grainCanvas = document.createElement("canvas");
    grainCanvas.width = 512; grainCanvas.height = 512;
    const gctx = grainCanvas.getContext("2d");
    gctx.fillStyle = "#000814";
    gctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 18000; i++) {
      const x = Math.random() * 512, y = Math.random() * 512;
      const a = Math.random() * 0.06;
      gctx.fillStyle = `rgba(212,144,10,${a})`;
      gctx.fillRect(x, y, 1, 1);
    }
    // Subtle LP watermark on floor
    gctx.fillStyle = "rgba(212,144,10,0.04)";
    gctx.font = 'bold 140px Georgia, serif';
    gctx.textAlign = "center";
    gctx.fillText("LP", 256, 300);

    const grainTex = new THREE.CanvasTexture(grainCanvas);
    grainTex.wrapS = grainTex.wrapT = THREE.RepeatWrapping;
    grainTex.repeat.set(3, 3);

    const floor = new THREE.Mesh(
      floorGeo,
      new THREE.MeshStandardMaterial({ map: grainTex, roughness: 0.92 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.9;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Mirror floor reflection ────────────────────────────────────────────────
    const reflector = new Reflector(new THREE.CircleGeometry(3.0, 48), {
      clipBias: 0.003,
      textureWidth:  512,
      textureHeight: 512,
      color: new THREE.Color(0x050c1a),   // very dark tint — subtle studio reflection
    });
    reflector.rotation.x = -Math.PI / 2;
    reflector.position.set(-0.1, -0.898, 0);   // just above the floor plane
    scene.add(reflector);

    // Fade mask: transparency fades the reflection at the edges
    const fadeCvs = document.createElement("canvas");
    fadeCvs.width = 256; fadeCvs.height = 256;
    const fctx = fadeCvs.getContext("2d");
    const fadeGrad = fctx.createRadialGradient(128, 128, 20, 128, 128, 128);
    fadeGrad.addColorStop(0, "rgba(0,0,0,0.55)");
    fadeGrad.addColorStop(0.5, "rgba(0,0,0,0.25)");
    fadeGrad.addColorStop(1, "rgba(0,0,0,0)");
    fctx.fillStyle = fadeGrad;
    fctx.fillRect(0, 0, 256, 256);
    const fadeMesh = new THREE.Mesh(
      new THREE.CircleGeometry(3.2, 48),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(fadeCvs),
        transparent: true, depthWrite: false, opacity: 0.75,
      })
    );
    fadeMesh.rotation.x = -Math.PI / 2;
    fadeMesh.position.set(-0.1, -0.897, 0);
    scene.add(fadeMesh);

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    key.shadow.mapSize.width  = 4096;
    key.shadow.mapSize.height = 4096;
    key.shadow.camera.left   = -5; key.shadow.camera.right = 5;
    key.shadow.camera.top    = 5;  key.shadow.camera.bottom = -5;
    key.shadow.camera.near   = 0.1; key.shadow.camera.far = 30;
    key.shadow.bias = -0.0005;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.35);  // neutral white, not blue
    fill.position.set(-5, 2, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffd4a0, 0.75);
    rim.position.set(0, 3.5, -5);
    scene.add(rim);

    const goldPoint = new THREE.PointLight(0xC5A059, 0.7, 10);
    goldPoint.position.set(2.5, 2.5, 2.5);
    scene.add(goldPoint);

    // ── Drag-to-rotate ────────────────────────────────────────────────────────
    let isDragging = false;
    let prevX = 0;
    let autoRotate = true;
    let idleTimer = null;

    const onMouseDown = (e) => {
      isDragging = true;
      autoRotate = false;
      prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      clearTimeout(idleTimer);
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      group.rotation.y += (clientX - prevX) * 0.012;
      prevX = clientX;
    };
    const onMouseUp = () => {
      isDragging = false;
      idleTimer = setTimeout(() => { autoRotate = true; }, 2500);
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("touchstart", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);

    // ── Animation loop ────────────────────────────────────────────────────────
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      if (autoRotate) group.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();
    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      const nW = container.clientWidth;
      const nH = Math.round(nW * (9 / 16));
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
      renderer.dispose();
      [coverTex, spineTex, pageTex, backTex].forEach(t => t.dispose());
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [productId]);

  // ── Export helpers ────────────────────────────────────────────────────────
  const exportRender = useCallback((exportW, exportH, filename) => {
    const renderer = rendererRef.current;
    const scene    = sceneRef.current;
    const camera   = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    renderer.setSize(exportW, exportH);
    camera.aspect = exportW / exportH;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);

    const link = document.createElement("a");
    link.href = renderer.domElement.toDataURL("image/png");
    link.download = filename;
    link.click();

    // Restore to container size
    const container = mountRef.current;
    const rW = container.clientWidth;
    const rH = Math.round(rW * (9 / 16));
    renderer.setSize(rW, rH);
    camera.aspect = rW / rH;
    camera.updateProjectionMatrix();
  }, []);

  const exportCover = useCallback(() => {
    const product = BOOK_PRODUCTS.find(p => p.id === productId) || BOOK_PRODUCTS[0];
    exportRender(1280, 720, `${product.code}-cover.png`);
  }, [productId, exportRender]);

  const exportThumb = useCallback(() => {
    const product = BOOK_PRODUCTS.find(p => p.id === productId) || BOOK_PRODUCTS[0];
    const renderer = rendererRef.current;
    const scene    = sceneRef.current;
    const camera   = cameraRef.current;
    if (!renderer || !scene || !camera) return;
    // Tighter FOV for thumbnail
    const origFov = camera.fov;
    camera.fov = 36;
    camera.updateProjectionMatrix();
    exportRender(600, 600, `${product.code}-thumbnail.png`);
    camera.fov = origFov;
    camera.updateProjectionMatrix();
  }, [productId, exportRender]);

  const isExport = mode === "export";

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        ref={mountRef}
        style={{ width: "100%", cursor: "grab", userSelect: "none" }}
      />
      {isExport && (
        <div style={{
          display: "flex", gap: "0.75rem", padding: "1rem 0",
          justifyContent: "center",
        }}>
          <button
            onClick={exportCover}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              background: "#d4900a", color: "#0b1628", border: "none",
              padding: "0.75rem 1.5rem", cursor: "pointer", borderRadius: "3px",
            }}
          >
            Download Cover (1280×720)
          </button>
          <button
            onClick={exportThumb}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              background: "transparent", color: "#d4900a",
              border: "1px solid rgba(212,144,10,0.5)",
              padding: "0.75rem 1.5rem", cursor: "pointer", borderRadius: "3px",
            }}
          >
            Download Thumbnail (600×600)
          </button>
        </div>
      )}
    </div>
  );
}

// ── Right Panel HTML overlay ───────────────────────────────────────────────
export function BookInfoPanel({ productId }) {
  const product = BOOK_PRODUCTS.find(p => p.id === productId) || BOOK_PRODUCTS[0];
  const gold = "#d4900a";
  return (
    <div style={{
      background: "#001428",
      border: "1px solid rgba(212,144,10,0.2)",
      borderTop: `3px solid ${gold}`,
      padding: "1.75rem",
      fontFamily: "'Inter', sans-serif",
      color: "#FFFFFF",
      minWidth: 260,
      maxWidth: 320,
    }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
        letterSpacing: "0.15em", textTransform: "uppercase", color: gold,
        marginBottom: "0.5rem",
      }}>{product.code}</p>
      <h3 style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
        fontSize: "1rem", lineHeight: 1.3, color: "#FFFFFF",
        marginBottom: "1.5rem",
      }}>{product.name}</h3>

      <PanelSection label="What's Inside" items={product.panel.whatsInside} gold={gold} />

      <div style={{ marginBottom: "1rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: "0.35rem" }}>Regulatory Basis</p>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{product.panel.regBasis}</p>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: "0.35rem" }}>Domain</p>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{product.panel.domain}</p>
      </div>
      <div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: "0.35rem" }}>Format</p>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{product.panel.format}</p>
      </div>
    </div>
  );
}

function PanelSection({ label, items, gold }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
        letterSpacing: "0.12em", textTransform: "uppercase", color: gold,
        marginBottom: "0.5rem",
      }}>{label}</p>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontSize: "0.875rem", color: "rgba(255,255,255,0.8)",
            paddingLeft: "1rem", position: "relative", lineHeight: 1.5,
          }}>
            <span style={{ position: "absolute", left: 0, color: gold, fontSize: "0.7rem" }}>›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
