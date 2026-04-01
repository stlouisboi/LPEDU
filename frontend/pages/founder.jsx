import Head from 'next/head';
import FounderPage from '../src/pages/FounderPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Vince Lawrence — Founder & Chief System Architect | LaunchPath</title>
        <meta name="description" content="LaunchPath was built by Vince Lawrence, a U.S. Navy veteran and OSHA-certified safety professional with 25+ years in leadership, safety-based operations, and regulated environments. Built from pattern recognition, not theory." />
        <meta property="og:title" content="Vince Lawrence — Founder & Chief System Architect | LaunchPath Transportation EDU" />
        <meta property="og:description" content="LaunchPath comes from real-world pattern recognition, not theory. Built after watching operations collapse when structure came late and controls stayed weak." />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Vince Lawrence — Founder | LaunchPath Transportation EDU" />
        <meta name="twitter:description" content="25+ years in leadership, safety-based operations, and regulated environments. LaunchPath comes from real-world pattern recognition, not theory." />
      </Head>
      <FounderPage />
    </>
  );
}
