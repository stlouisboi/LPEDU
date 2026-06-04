import { useState, useRef } from "react";
import { Link } from '../compat/Link';
import SiteHeader from "../components/home/SiteHeader";
import SiteFooter from "../components/home/SiteFooter";
import FadeIn from "../components/FadeIn";

const API = process.env.REACT_APP_BACKEND_URL;

const PERSONAS = [
  {
    code: "LP-PARTNER-INS",
    role: "Insurance Agents & Underwriters",
    headline: "Before you bind, they need a documented operating structure.",
    body: "Carriers without documented compliance infrastructure represent elevated claims risk within the first 90 days. A referral to LaunchPath installs the Standard before the policy becomes active — reducing audit exposure for both parties.",
    signal: "Fewer conditional ratings. Cleaner renewals.",
  },
  {
    code: "LP-PARTNER-FLT",
    role: "Fleet Operators",
    headline: "Compliance does not scale with units unless the system does.",
    body: "Each new unit added to a fleet introduces a new set of authority, insurance, and documentation requirements. The LaunchPath Standard provides a repeatable onboarding system that installs the same operating infrastructure across every driver and vehicle.",
    signal: "Standardized onboarding. Consistent compliance posture.",
  },
  {
    code: "LP-PARTNER-BKR",
    role: "Freight Brokers",
    headline: "The carriers you refer reflect on your operation.",
    body: "New entrant carriers without documented operating standards create liability exposure for the brokers who book them. Referring carriers to LaunchPath before they enter your freight network installs the infrastructure that protects both the load and the relationship.",
    signal: "Vetted carriers. Reduced freight liability.",
  },
  {
    code: "LP-PARTNER-BOC",
    role: "Process Agents & BOC-3 Filers",
    headline: "You file the authority. We install the infrastructure it requires.",
    body: "A BOC-3 filing puts a carrier on the federal radar. What follows — the FMCSA New Entrant audit within 12 months — requires documented compliance infrastructure that most new carriers do not have. A referral to LaunchPath at the moment of authority activation gives the carrier the system they need before the audit window opens.",
    signal: "Early referral. Maximum lead time. Carriers who arrive prepared.",
  },
  {
    code: "LP-PARTNER-CDL",
    role: "CDL Schools & Driver Training Programs",
    headline: "Your students know how to drive. Not all of them know how to operate.",
    body: "A percentage of every CDL graduating class will activate their own authority within 18 months. They know how to pass a road test. They do not know how to build a driver qualification file, implement a drug and alcohol program, or prepare for a New Entrant audit. Referring them to LaunchPath at graduation or during the authority process closes that gap before it becomes a violation.",
    signal: "Better outcomes for your graduates. Documented compliance before the first load.",
  },
  {
    code: "LP-PARTNER-ASC",
    role: "Industry Associations & Carrier Networks",
    headline: "Your members are building operations. Most of them are building without a compliance system.",
    body: "Trucking associations, owner-operator networks, and regional carrier groups have direct access to new entrant carriers at scale. A LaunchPath partnership gives your members access to a compliance implementation system designed specifically for operations in their first 18 months — and positions your association as the organization that connected them to it.",
    signal: "Member value. Compliance outcomes. A resource your network can't find anywhere else.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "You identify the carrier.",
    body: "A new carrier in your network — one you're about to bind, book, or add to your fleet — needs a documented operating standard before operations begin.",
  },
  {
    num: "02",
    title: "You make the referral.",
    body: "You connect them to LaunchPath. We handle the intake, the assessment, and the Standard installation from there. No administrative burden on your side.",
  },
  {
    num: "03",
    title: "They return compliant.",
    body: "The carrier completes the LaunchPath Standard and returns to your operation with documented compliance infrastructure, audit-ready records, and an active operating framework.",
  },
];

const STATS = [
  { value: "4", label: "Protection Systems Installed" },
  { value: "49", label: "Documented Failure Points Addressed" },
  { value: "90", label: "Days of New Entrant Period Covered" },
  { value: "100%", label: "FMCSA New Entrant Audit Focus" },
];

const ROLES = [
  "Insurance Agent / Underwriter",
  "Fleet Operator",
  "Freight Broker",
  "Process Agent / BOC-3 Filer",
  "CDL School / Driver Training",
  "Industry Association / Carrier Network",
  "Other",
];

function EcosystemDiagram() {
  const nodes = [
    { label: 'Insurance Agent', x: 147, y: 70 },
    { label: 'Freight Broker', x: 360, y: 55 },
    { label: 'Fleet Operator', x: 573, y: 70 },
    { label: 'Process Agent', x: 147, y: 290 },
    { label: 'CDL School', x: 360, y: 305 },
    { label: 'Association', x: 573, y: 290 },
  ];
  return (
    <svg viewBox="0 0 720 370" width="100%" style={{ display: 'block', maxWidth: 680, margin: '0 auto' }} aria-label="Partner ecosystem diagram">
      <rect width="720" height="370" fill="#071422" />
      {/* Connecting lines */}
      {nodes.map(n => (
        <line key={n.label} x1={n.x} y1={n.y} x2={360} y2={180} stroke="rgba(200,169,110,0.20)" strokeWidth="1" strokeDasharray="4 3" />
      ))}
      {/* Output line */}
      <line x1={360} y1={204} x2={360} y2={328} stroke="rgba(200,169,110,0.35)" strokeWidth="1.5" />
      <polygon points="354,324 366,324 360,334" fill="rgba(200,169,110,0.55)" />
      {/* Center box */}
      <rect x={280} y={156} width={160} height={48} fill="#0d1f38" stroke="#C8A96E" strokeWidth="1.5" />
      <text x={360} y={175} textAnchor="middle" fill="#C8A96E" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.14em" fontWeight="700">LAUNCHPATH</text>
      <text x={360} y={193} textAnchor="middle" fill="rgba(255,255,255,0.80)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">STANDARD</text>
      {/* Outer nodes */}
      {nodes.map(n => (
        <g key={n.label}>
          <rect x={n.x - 65} y={n.y - 18} width={130} height={36} fill="#0d1f38" stroke="rgba(200,169,110,0.28)" strokeWidth="1" />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.04em">{n.label}</text>
        </g>
      ))}
      {/* Output label */}
      <text x={360} y={352} textAnchor="middle" fill="#C8A96E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.16em" fontWeight="700">VERIFIED CARRIER — AUDIT READY</text>
    </svg>
  );
}

function VideoBlock() {
  const outline = [
    { time: '0:00 – 0:15', note: 'The compliance gap new carriers enter at authority activation' },
    { time: '0:15 – 0:45', note: 'What the LaunchPath Standard installs and how it is verified' },
    { time: '0:45 – 1:15', note: 'Why audit-ready carriers reduce exposure for every partner in the network' },
    { time: '1:15 – 1:30', note: 'The referral process — what to do when you identify a carrier' },
  ];
  return (
    <div style={{ background: '#071422', border: '1px solid rgba(200,169,110,0.18)', padding: '2.5rem 2.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.762rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,144,10,1)', marginBottom: '0.4rem' }}>
            LP-VID-002 | PARTNER OVERVIEW
          </p>
          <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF' }}>
            90-second partner overview — in production
          </p>
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.714rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.70)', border: '1px solid rgba(200,169,110,0.25)', padding: '0.3rem 0.7rem' }}>
          IN PRODUCTION
        </span>
      </div>
      <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(200,169,110,0.12)', padding: '1.75rem 2rem', marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.762rem', letterSpacing: '0.1em', color: 'rgba(200,169,110,0.70)', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
          VIDEO CONTENT OUTLINE
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {outline.map(item => (
            <div key={item.time} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.714rem', color: 'rgba(200,169,110,0.65)', letterSpacing: '0.08em', flexShrink: 0, marginTop: 2 }}>{item.time}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{item.note}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
        This video is in production. Use the inquiry form below to start a partnership conversation.
      </p>
    </div>
  );
}

function ReferralIncentiveBlock() {
  const items = [
    {
      num: '01',
      title: 'Referral Acknowledgment',
      body: 'Every referred carrier is tracked and credited at enrollment. Your organization is on record as the referring partner.',
    },
    {
      num: '02',
      title: 'Co-Branded Referral Materials',
      body: 'A one-page referral sheet with your organization name. Distribute to your carriers, clients, or fleet operators at the point of contact.',
    },
    {
      num: '03',
      title: 'Carrier Completion Notification',
      body: 'You are notified when a referred carrier completes the LaunchPath Standard. You know when the installation is done.',
    },
    {
      num: '04',
      title: 'Referral Commission',
      body: 'Commission structure is in development. Terms are discussed and confirmed during the initial partnership conversation.',
    },
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(212,144,10,0.10)' }} className="incentive-grid">
        {items.map(item => (
          <div key={item.num} style={{ background: '#001020', padding: '2.25rem 2rem' }}>
            <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: '2rem', color: 'rgba(212,144,10,0.20)', lineHeight: 1, marginBottom: '0.875rem', letterSpacing: '-0.02em' }}>
              {item.num}
            </p>
            <p style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '0.625rem', lineHeight: 1.3 }}>
              {item.title}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.80)', lineHeight: 1.7 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonaCard({ p, idx }) {
  return (
    <FadeIn delay={idx * 80}>
      <div style={{
        background: "#0b1628",
        borderTop: "3px solid #d4900a",
        padding: "2.5rem 2rem",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem",
          letterSpacing: "0.12em",
          color: "rgba(212,144,10,1)",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}>
          {p.code}
        </p>
        <p style={{
          fontFamily: "'Newsreader', 'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          {p.role}
        </p>
        <h3 style={{
          fontFamily: "'Newsreader', 'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1.12rem",
          color: "#FFFFFF",
          lineHeight: 1.3,
          marginBottom: "1rem",
          flex: 0,
        }}>
          {p.headline}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.90)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
          flex: 1,
        }}>
          {p.body}
        </p>
        <div style={{
          borderTop: "1px solid rgba(212,144,10,0.14)",
          paddingTop: "0.875rem",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            color: "rgba(212,144,10,0.95)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            {p.signal}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) { setError("Please select your role."); return; }
    setStatus("loading");
    setError("");
    try {
      const resp = await fetch(`${API}/api/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1.1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#FFFFFF",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1.1rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.762rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(212,144,10,0.95)",
    display: "block",
    marginBottom: "0.4rem",
  };

  if (status === "success") {
    return (
      <div data-testid="partner-form-success" style={{ textAlign: "center", padding: "3rem 0" }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,1)",
          marginBottom: "1rem",
        }}>
          LP-PARTNER-001 — INQUIRY RECEIVED
        </p>
        <p style={{
          fontFamily: "'Newsreader', 'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          color: "#FFFFFF",
          marginBottom: "0.875rem",
          letterSpacing: "-0.01em",
        }}>
          Your inquiry has been received.
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1.7,
          maxWidth: 440,
          margin: "0 auto",
        }}>
          A member of the LaunchPath team will follow up within one business day to discuss the partnership arrangement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-testid="partner-contact-form" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="form-grid">
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            data-testid="partner-name"
            required
            type="text"
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(212,144,10,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            data-testid="partner-email"
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="your@company.com"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(212,144,10,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="form-grid">
        <div>
          <label style={labelStyle}>Company</label>
          <input
            data-testid="partner-company"
            required
            type="text"
            value={form.company}
            onChange={set("company")}
            placeholder="Company or agency name"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = "rgba(212,144,10,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          />
        </div>
        <div>
          <label style={labelStyle}>Your Role</label>
          <select
            data-testid="partner-role"
            required
            value={form.role}
            onChange={set("role")}
            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
            onFocus={e => (e.target.style.borderColor = "rgba(212,144,10,0.5)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
          >
            <option value="" style={{ background: "#0b1628" }}>Select your role</option>
            {ROLES.map(r => (
              <option key={r} value={r} style={{ background: "#0b1628" }}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Message (Optional)</label>
        <textarea
          data-testid="partner-message"
          value={form.message}
          onChange={set("message")}
          placeholder="Describe your carrier referral volume, fleet size, or specific inquiry."
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={e => (e.target.style.borderColor = "rgba(212,144,10,0.5)")}
          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
        />
      </div>

      {error && (
        <p data-testid="partner-form-error" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "var(--text-sm)",
          color: "#f87171",
        }}>
          {error}
        </p>
      )}

      <button
        data-testid="partner-submit-btn"
        type="submit"
        disabled={status === "loading"}
        style={{
          background: status === "loading" ? "rgba(212,144,10,0.5)" : "#d4900a",
          color: "#0b1628",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "1rem 2.5rem",
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          alignSelf: "flex-start",
        }}
        onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "#D4B87A"; }}
        onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.background = "#d4900a"; }}
      >
        {status === "loading" ? "Submitting..." : "Request a Partnership Conversation"}
      </button>
    </form>
  );
}

export default function PartnersPage() {
  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ background: "#080f1e", minHeight: "100vh" }}>
      <SiteHeader />

      {/* ── Hero ── */}
      <section data-testid="partners-hero" style={{
        background: "#080f1e",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "96px 24px 80px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,1)",
              marginBottom: "1.5rem",
            }}>
              LP-PARTNER-001 | REFERRAL & PARTNERSHIP NETWORK
            </p>
            <h1 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              maxWidth: 720,
            }}>
              The operational layer behind your carrier relationships.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.75,
              maxWidth: 600,
              marginBottom: "0.875rem",
            }}>
              LaunchPath installs the compliance infrastructure that new motor carrier authorities require to survive federal oversight. For partners — insurers, fleets, and brokers — this is the onboarding layer that reduces exposure before it becomes a claim, a violation, or a failed load.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.75,
              maxWidth: 600,
              marginBottom: "2.75rem",
            }}>
              The arrangement is straightforward: you identify the carrier. We handle the Standard installation.
            </p>
            <button
              data-testid="partners-hero-cta"
              onClick={scrollToForm}
              style={{
                background: "#d4900a",
                color: "#0b1628",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "1rem 2.25rem",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                minHeight: 52,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#D4B87A")}
              onMouseLeave={e => (e.currentTarget.style.background = "#d4900a")}
            >
              Request a Partnership Conversation
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── Three Personas ── */}
      <section data-testid="partners-personas" style={{
        background: "#001020",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "72px 24px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,1)",
              marginBottom: "0.625rem",
            }}>
              WHO THIS SERVES
            </p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              Six networks. One operational exposure.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.90)",
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: "3rem",
            }}>
              Underprepared carriers create downstream risk for every partner in their network. LaunchPath eliminates that risk at the source.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(212,144,10,0.1)",
          }} className="persona-grid">
            {PERSONAS.map((p, i) => <PersonaCard key={p.code} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── Partner Ecosystem Diagram ── */}
      <section data-testid="partners-ecosystem" style={{
        background: "#080f1e",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "72px 24px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,1)",
              marginBottom: "0.625rem",
            }}>
              LP-PARTNER-ECO — REFERRAL NETWORK
            </p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              Every partner feeds the same installation.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: "3rem",
            }}>
              Six partner networks. One referral path. The carrier enters the LaunchPath Standard and returns to your operation audit-ready.
            </p>
            <EcosystemDiagram />
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section data-testid="partners-how-it-works" style={{
        background: "#080f1e",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "72px 24px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,1)",
              marginBottom: "0.625rem",
            }}>
              THE REFERRAL PROCESS
            </p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "3rem",
            }}>
              Three steps. No administrative burden.
            </h2>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(212,144,10,0.1)" }}>
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div style={{
                  background: "#001020",
                  padding: "2.25rem 2rem",
                  display: "flex",
                  gap: "2rem",
                  alignItems: "flex-start",
                }}>
                  <p style={{
                    fontFamily: "'Newsreader', 'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "rgba(212,144,10,0.2)",
                    lineHeight: 1,
                    minWidth: 56,
                    letterSpacing: "-0.02em",
                  }}>
                    {step.num}
                  </p>
                  <div>
                    <h3 style={{
                      fontFamily: "'Newsreader', 'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      color: "#FFFFFF",
                      marginBottom: "0.625rem",
                      lineHeight: 1.3,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.7,
                    }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Band ── */}
      <section data-testid="partners-trust-band" style={{
        background: "#0b1628",
        borderTop: "1px solid rgba(212,144,10,0.15)",
        borderBottom: "1px solid rgba(212,144,10,0.15)",
        padding: "56px 24px",
      }}>
        <div style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(212,144,10,0.1)",
        }} className="stats-grid">
          {STATS.map((s) => (
            <FadeIn key={s.label}>
              <div style={{
                background: "#0b1628",
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "'Newsreader', 'Playfair Display', serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  color: "#d4900a",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                  letterSpacing: "0.02em",
                }}>
                  {s.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Video Block ── */}
      <section data-testid="partners-video-block" style={{
        background: "#080f1e",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "72px 24px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,1)",
              marginBottom: "0.625rem",
            }}>
              THE PARTNER BRIEF
            </p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "2.5rem",
            }}>
              Hear the case directly.
            </h2>
            <VideoBlock />
          </FadeIn>
        </div>
      </section>

      {/* ── Referral Incentive Block ── */}
      <section data-testid="partners-referral-incentive" style={{
        background: "#001020",
        borderBottom: "1px solid rgba(212,144,10,0.12)",
        padding: "72px 24px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,1)",
              marginBottom: "0.625rem",
            }}>
              LP-PARTNER-VALUE
            </p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              What Partners Receive
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: "3rem",
            }}>
              Every partnership arrangement includes the following. Commission structure is confirmed during the initial conversation.
            </p>
          </FadeIn>
          <ReferralIncentiveBlock />
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section
        ref={formRef}
        data-testid="partners-contact-section"
        style={{
          background: "#001020",
          borderBottom: "1px solid rgba(212,144,10,0.12)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,1)",
              marginBottom: "0.625rem",
            }}>
              LP-PARTNER-INQUIRY
            </p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}>
              Request a Partnership Conversation
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.7,
              marginBottom: "2.75rem",
              maxWidth: 560,
            }}>
              Submit your inquiry below. A member of the LaunchPath team will follow up within one business day to discuss the referral arrangement and determine whether the partnership is the right fit.
            </p>
          </FadeIn>
          <ContactForm />
        </div>
      </section>

      <SiteFooter />

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 760px) {
          .persona-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .incentive-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}

