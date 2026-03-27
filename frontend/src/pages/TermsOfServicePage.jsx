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
const serif = { fontFamily: "'Source Serif 4', Georgia, serif" };
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

export default function TermsOfServicePage() {
  return (
    <div style={{ background: T.navyBg, minHeight: "100vh" }}>
      <Head>
        <title>Terms of Service — LaunchPath Transportation Education</title>
        <meta name="description" content="LaunchPath Transportation Education terms of service. Rights, responsibilities, and policies governing use of our platform and programs." />
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px clamp(20px, 5vw, 40px) 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <p style={{ ...mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: T.goldText, marginBottom: 20 }}>
            LP-LEGAL-002 · TERMS OF SERVICE
          </p>
          <h1 style={{ ...disp, fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 700, color: T.white, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Terms of Service
          </h1>
          <p style={{ ...mono, fontSize: 11, color: T.fog, letterSpacing: "0.08em" }}>
            Effective date: March 2026 · LaunchPath Transportation Education LLC
          </p>
        </div>

        <Section title="Agreement">
          <P>These Terms of Service ("Terms") govern your access to and use of the LaunchPath Transportation Education platform and all associated programs, content, and materials ("Services"), operated by LaunchPath Transportation Education LLC ("LaunchPath," "we," or "us").</P>
          <P>By purchasing, enrolling in, or accessing any LaunchPath program or product, you agree to be bound by these Terms. If you do not agree, do not use the Services.</P>
        </Section>

        <Section title="Description of Services">
          <P>LaunchPath provides educational training, documentation systems, compliance checklists, and structured implementation programs for motor carrier operators navigating the FMCSA New Entrant safety program and ongoing 49 CFR compliance requirements.</P>
          <P><strong style={{ color: T.white }}>LaunchPath content is educational in nature and does not constitute legal advice, compliance certification, regulatory filing assistance, or a guarantee of any audit outcome.</strong> We document the federal regulatory framework and provide structured implementation tools. Compliance responsibility remains entirely with the carrier.</P>
        </Section>

        <Section title="Enrollment and Access">
          <Li>Enrollment in the LaunchPath Standard program is subject to availability and admission review. Submission of an application does not guarantee enrollment.</Li>
          <Li>Upon confirmed enrollment and completed payment, you will receive access to the program portal, lesson content, and all materials included in your selected authorization path.</Li>
          <Li>Access is granted to the individual or business entity that purchased the program. Sharing login credentials or reselling access is prohibited.</Li>
          <Li>Program access is provided for the duration stated at enrollment. We reserve the right to extend access periods at our discretion.</Li>
        </Section>

        <Section title="Payment Terms">
          <P>All payments are processed securely through Stripe, Inc. By completing a purchase, you authorize LaunchPath to charge the stated amount to your selected payment method.</P>
          <Li><strong style={{ color: T.white }}>Single Authorization ($2,500):</strong> Payment due in full at enrollment. Full program access activated immediately upon payment confirmation.</Li>
          <Li><strong style={{ color: T.white }}>Phased Authorization ($1,500 + $1,500):</strong> First payment due at enrollment; second payment due at Day 45 of the program. Access to Phase 2 content is contingent on receipt of the second payment.</Li>
          <P style={{ marginTop: 16 }}>All prices are stated in USD. LaunchPath reserves the right to adjust pricing for future cohorts. Pricing confirmed at the time of your enrollment will not change for your active term.</P>
        </Section>

        <Section title="Refund Policy">
          <P>Due to the immediate delivery of digital content upon enrollment, all sales are final. We do not offer refunds once program access has been activated.</P>
          <P>If you experience a technical issue preventing access to materials you have purchased, contact us within 30 days of purchase at <a href="mailto:info@launchpathedu.com" style={{ color: T.goldText, textDecoration: "none" }}>info@launchpathedu.com</a> and we will resolve the issue or issue a credit at our discretion.</P>
        </Section>

        <Section title="Intellectual Property">
          <P>All LaunchPath program content — including but not limited to lesson videos, compliance checklists, implementation guides, assessment tools, briefings, and written materials — is the proprietary intellectual property of LaunchPath Transportation Education LLC.</P>
          <Li>You may use purchased materials for your own business operations.</Li>
          <Li>You may not reproduce, redistribute, resell, sublicense, or publish LaunchPath content without prior written permission.</Li>
          <Li>Screen recording or downloading of video content is prohibited.</Li>
        </Section>

        <Section title="Limitation of Liability">
          <P>To the fullest extent permitted by applicable law, LaunchPath Transportation Education LLC shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Services, including but not limited to:</P>
          <Li>Any FMCSA audit outcome, compliance failure, or regulatory action</Li>
          <Li>Business interruption, loss of revenue, or loss of operating authority</Li>
          <Li>Errors or omissions in program content</Li>
          <P style={{ marginTop: 16 }}>Our total liability to you for any claim arising from use of the Services shall not exceed the amount you paid for the program giving rise to the claim.</P>
        </Section>

        <Section title="Disclaimer of Warranties">
          <P>The Services are provided "as is" without warranty of any kind, express or implied. LaunchPath does not warrant that the Services will be uninterrupted, error-free, or that any specific compliance outcome will result from completing the program.</P>
          <P>Regulations referenced in program content are current as of the effective date stated on each document. Motor carrier regulations change. You are responsible for verifying current requirements through official FMCSA sources at fmcsa.dot.gov.</P>
        </Section>

        <Section title="Acceptable Use">
          <P>You agree not to:</P>
          <Li>Use the platform for any unlawful purpose or in violation of these Terms</Li>
          <Li>Attempt to gain unauthorized access to any part of the platform or other users' accounts</Li>
          <Li>Upload, transmit, or distribute any harmful, offensive, or infringing content</Li>
          <Li>Use automated tools to scrape, index, or reproduce platform content</Li>
        </Section>

        <Section title="Modifications to Terms">
          <P>We reserve the right to update these Terms at any time. The effective date at the top of this page will reflect the most recent update. Continued use of the Services following any modification constitutes acceptance of the revised Terms.</P>
          <P>Material changes will be communicated via email to enrolled students.</P>
        </Section>

        <Section title="Governing Law">
          <P>These Terms are governed by the laws of the state in which LaunchPath Transportation Education LLC is incorporated, without regard to conflict of law provisions. Any disputes shall be resolved through binding arbitration in the jurisdiction of our principal place of business before pursuing any court action.</P>
        </Section>

        <Section title="Contact">
          <P>Questions about these Terms:</P>
          <P>LaunchPath Transportation Education LLC<br />
          Email: <a href="mailto:info@launchpathedu.com" style={{ color: T.goldText, textDecoration: "none" }}>info@launchpathedu.com</a></P>
        </Section>

      </main>

      <FooterSection />
    </div>
  );
}
