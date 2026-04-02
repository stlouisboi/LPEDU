import Head from 'next/head';
import HOSPacketPage from '../../src/pages/products/HOSPacketPage';
export default function Page() {
  return (
    <>
      <Head>
        <title>HOS & Dispatch Packet — Part 395 Hours-of-Service Standard | LaunchPath</title>
        <meta name="description" content="ELD compliance, dispatch logs, and hours documentation for Part 395. The operating standard for hours-of-service recordkeeping and driver dispatch management." />
        <meta property="og:title" content="HOS & Dispatch Packet — Part 395 Hours-of-Service Standard | LaunchPath" />
        <meta property="og:description" content="ELD compliance, dispatch logs, and hours documentation for Part 395 hours-of-service compliance." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-hos-packet.png" />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HOS & Dispatch Packet — Part 395 Hours-of-Service Standard | LaunchPath" />
        <meta name="twitter:description" content="ELD compliance, dispatch logs, and hours documentation for Part 395 hours-of-service compliance." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-hos-packet.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/standards/hos-packet" />
      </Head>
      <HOSPacketPage />
    </>
  );
}
