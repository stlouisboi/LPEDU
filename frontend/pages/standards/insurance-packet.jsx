import Head from 'next/head';
import InsurancePacketPage from '../../src/pages/products/InsurancePacketPage';
export default function Page() {
  return (
    <>
      <Head>
        <title>Insurance & Authority Packet — Carrier Authority & Insurance Standard | LaunchPath</title>
        <meta name="description" content="Authority accuracy, BOC-3 compliance, and insurance filing verification. The operating standard for carrier authority maintenance and insurance continuity." />
        <meta property="og:title" content="Insurance & Authority Packet — Carrier Authority & Insurance Standard | LaunchPath" />
        <meta property="og:description" content="Authority accuracy, BOC-3 compliance, and insurance filing verification for new motor carriers." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-insurance-packet.png" />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Insurance & Authority Packet — Carrier Authority & Insurance Standard | LaunchPath" />
        <meta name="twitter:description" content="Authority accuracy, BOC-3 compliance, and insurance filing verification for new motor carriers." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-insurance-packet.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/standards/insurance-packet" />
      </Head>
      <InsurancePacketPage />
    </>
  );
}
