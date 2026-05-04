import Head from 'next/head';
import InsurancePacketPage from '../../src/pages/products/InsurancePacketPage';

const OG = "https://launchpathedu.com/images/products/domain6-insurance.webp";

export default function Page() {
  return (
    <>
      <Head>
        <title>Insurance & Authority Packet — Carrier Authority & Insurance Standard | LaunchPath</title>
        <meta name="description" content="Authority accuracy, BOC-3 compliance, and insurance filing verification. The operating standard for carrier authority maintenance and insurance continuity." />
        <meta property="og:title" content="Insurance & Authority Packet — Carrier Authority & Insurance Standard | LaunchPath" />
        <meta property="og:description" content="Authority accuracy, BOC-3 compliance, and insurance filing verification for new motor carriers." />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://launchpathedu.com/products/insurance-packet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
        <link rel="canonical" href="https://launchpathedu.com/products/insurance-packet" />
      </Head>
      <InsurancePacketPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
