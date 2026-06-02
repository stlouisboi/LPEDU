import Head from 'next/head';
import HOSPacketPage from '../../src/pages/products/HOSPacketPage';

const OG = "https://launchpathedu.com/og-hos-packet.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>HOS & Dispatch Packet — Part 395 Hours-of-Service Standard | LaunchPath</title>
        <meta name="description" content="ELD compliance, dispatch logs, and hours documentation for Part 395. The operating standard for hours-of-service recordkeeping and driver dispatch management." />
        <meta property="og:title" content="HOS & Dispatch Packet — Part 395 Hours-of-Service Standard | LaunchPath" />
        <meta property="og:description" content="ELD compliance, dispatch logs, and hours documentation for Part 395 hours-of-service compliance." />
        <meta property="og:image" content={OG} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://launchpathedu.com/products/hos-packet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
        <link rel="canonical" href="https://launchpathedu.com/products/hos-packet" />
      </Head>
      <HOSPacketPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
