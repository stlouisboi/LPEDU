import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import Head from "next/head";

const T = {
  navyBg:     "#070E1A",
  navyCard:   "#0B1524",
  navyBorder: "rgba(255,255,255,0.06)",
  gold:       "#C9A84C",
  goldText:   "#D4A94E",
  white:      "#EEF3F8",
  mist:       "#8A9BB0",
  fog:        "#4A6070",
};

const mono  = { fontFamily: "'IBM Plex Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const disp  = { fontFamily: "'Playfair Display', Georgia, serif" };

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 52 }}>
    <p style={{ ...mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.goldText, marginBottom: 12 }}>{title}</p>
    <div style={{ height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)`, marginBottom: 24, opacity: 0.35 }} />
    {children}
  </div>
);

const P = ({ children }) => (
  <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.8, marginBottom: 16 }}>{children}</p>
);

const Li = ({ children }) => (
  <div style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
    <span style={{ ...mono, fontSize: 10, color: T.goldText, marginTop: 5, flexShrink: 0 }}>—</span>
    <span style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.8 }}>{children}</span>
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: T.navyBg, minHeight: "100vh" }}>
      <Head>
        <title>Privacy Policy — LaunchPath Transportation Education</title>
        <meta name="description" content="LaunchPath Transportation Education privacy policy. How we collect, use, and protect your information." />
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px clamp(20px, 5vw, 40px) 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <p style={{ ...mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: T.goldText, marginBottom: 20 }}>
            LP-LEGAL-001 · PRIVACY POLICY
          </p>
          <h1 style={{ ...disp, fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 700, color: T.white, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Privacy Policy
          </h1>
          <p style={{ ...mono, fontSize: 11, color: T.fog, letterSpacing: "0.08em" }}>
            Effective date: March 2026 · LaunchPath Transportation Education LLC
          </p>
        </div>

        <Section title="Overview">
          <P>LaunchPath Transportation Education LLC ("LaunchPath," "we," "us," or "our") operates the website at launchpathedu.com and delivers the LaunchPath Standard program. This Privacy Policy explains what information we collect, how we use it, and your rights with respect to it.</P>
          <P>By accessing our website or enrolling in any LaunchPath program, you agree to the practices described in this policy.</P>
        </Section>

        <Section title="Information We Collect">
          <P>We collect information you provide directly to us:</P>
          <Li>Email address (when you submit an admission request, purchase a product, or contact us)</Li>
          <Li>Name and business name (as part of admission intake forms)</Li>
          <Li>Payment information — processed exclusively through Stripe, Inc. We never store full card numbers on our servers</Li>
          <Li>Program activity data (lesson completion, assessment results, portal access logs)</Li>
          <P style={{ marginTop: 16 }}>We also collect standard technical data automatically when you visit our site:</P>
          <Li>IP address and general location (country/region)</Li>
          <Li>Browser type, device type, and operating system</Li>
          <Li>Pages visited, time on site, and referral source</Li>
        </Section>

        <Section title="How We Use Your Information">
          <Li>Deliver the program content, materials, and downloadable documents you purchased</Li>
          <Li>Send transactional emails (purchase confirmations, download links, program updates)</Li>
          <Li>Respond to your inquiries and support requests</Li>
          <Li>Improve the content and user experience of the platform</Li>
          <Li>Comply with legal obligations and enforce our Terms of Service</Li>
          <P style={{ marginTop: 16 }}>We do not sell your personal information to third parties. We do not use your data for targeted advertising.</P>
        </Section>

        <Section title="Third-Party Services">
          <P>We use the following third-party services to operate the platform. Each has its own privacy policy governing their data practices:</P>
          <Li><strong style={{ color: T.white }}>Stripe</strong> — payment processing. Your payment data is governed by Stripe's Privacy Policy at stripe.com/privacy.</Li>
          <Li><strong style={{ color: T.white }}>MailerSend</strong> — transactional email delivery (purchase receipts, download links).</Li>
          <Li><strong style={{ color: T.white }}>Vimeo</strong> — video hosting for program lesson content.</Li>
          <P style={{ marginTop: 16 }}>We do not use Google Analytics, Facebook Pixel, or other advertising tracking tools on this site.</P>
        </Section>

        <Section title="Data Retention">
          <P>We retain your information for as long as necessary to deliver the services you have purchased and to comply with applicable legal obligations. Purchase records are retained for a minimum of seven (7) years for tax and accounting purposes.</P>
          <P>Program access records (lesson completion, portal activity) are retained for the duration of your active enrollment plus 24 months.</P>
        </Section>

        <Section title="Your Rights">
          <P>You may request at any time:</P>
          <Li>A copy of the personal data we hold about you</Li>
          <Li>Correction of inaccurate information</Li>
          <Li>Deletion of your personal data (subject to retention requirements for financial records)</Li>
          <Li>Opt-out from any non-transactional email communications</Li>
          <P style={{ marginTop: 16 }}>To exercise these rights, email us at the address listed in the Contact section below.</P>
        </Section>

        <Section title="Cookies">
          <P>We use session cookies strictly necessary to authenticate you in the portal and maintain your session. We do not use persistent tracking cookies or third-party advertising cookies.</P>
        </Section>

        <Section title="Children's Privacy">
          <P>Our services are directed to adults operating commercial motor vehicle businesses. We do not knowingly collect personal information from individuals under 18 years of age.</P>
        </Section>

        <Section title="Changes to This Policy">
          <P>We may update this Privacy Policy as our services evolve. When we do, we will update the effective date at the top of this page. Material changes will be communicated via email to enrolled students.</P>
        </Section>

        <Section title="Contact">
          <P>Questions about this policy or your data:</P>
          <P>LaunchPath Transportation Education LLC<br />
          Email: <a href="mailto:info@launchpathedu.com" style={{ color: T.goldText, textDecoration: "none" }}>info@launchpathedu.com</a></P>
        </Section>

      </main>

      <FooterSection />
    </div>
  );
}
