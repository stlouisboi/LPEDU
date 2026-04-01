import Head from 'next/head';
import FounderPage from '../src/pages/FounderPage';

const OG_IMAGE = "https://launchpathedu.com/og-launchpath.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>Vince Lawrence — Founder & Chief System Architect | LaunchPath</title>
        <meta name="description" content="LaunchPath was built by Vince Lawrence, a U.S. Navy veteran and OSHA-certified safety professional with 25+ years in leadership, safety-based operations, and regulated environments. Built from pattern recognition, not theory." />
        <meta property="og:title" content="Vince Lawrence — Founder & Chief System Architect | LaunchPath Transportation EDU" />
        <meta property="og:description" content="LaunchPath comes from real-world pattern recognition, not theory. Built after watching operations collapse when structure came late and controls stayed weak." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://launchpathedu.com/founder" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vince Lawrence — Founder | LaunchPath Transportation EDU" />
        <meta name="twitter:description" content="25+ years in leadership, safety-based operations, and regulated environments. LaunchPath comes from real-world pattern recognition, not theory." />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <FounderPage />
    </>
  );
}
