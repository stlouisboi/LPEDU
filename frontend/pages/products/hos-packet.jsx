import Head from 'next/head';
import HOSPacketPage from '../../src/pages/products/HOSPacketPage';

const OG = "https://launchpathedu.com/images/products/domain4-hos-dispatch.webp";

export default function Page() {
  return (
    <>
      <Head>
        <title>HOS & Dispatch Packet — Part 395 Hours-of-Service Standard | LaunchPath</title>
        <meta name="description" content="ELD compliance, dispatch logs, and hours documentation for Part 395. The operating standard for hours-of-service recordkeeping and driver dispatch management." />
        <meta property="og:title" content="HOS & Dispatch Packet — Part 395 Hours-of-Service Standard | LaunchPath" />
        <meta property="og:description" content="ELD compliance, dispatch logs, and hours documentation for Part 395 hours-of-service compliance." />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
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
