import Head from 'next/head';
import DrugAlcoholPacketPage from '../../src/pages/products/DrugAlcoholPacketPage';
export default function Page() {
  return (
    <>
      <Head>
        <title>Drug & Alcohol Packet — Part 382 Compliance Operating Standard | LaunchPath</title>
        <meta name="description" content="Enrollment documentation, clearinghouse logs, and supervisor training records for Part 382 compliance. The operating standard for drug and alcohol program management." />
        <meta property="og:title" content="Drug & Alcohol Packet — Part 382 Compliance Operating Standard | LaunchPath" />
        <meta property="og:description" content="Enrollment documentation, clearinghouse logs, and supervisor training records for Part 382 compliance." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-drug-alcohol-packet.png" />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Drug & Alcohol Packet — Part 382 Compliance Operating Standard | LaunchPath" />
        <meta name="twitter:description" content="Enrollment documentation, clearinghouse logs, and supervisor training records for Part 382 compliance." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-drug-alcohol-packet.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/standards/drug-alcohol-packet" />
      </Head>
      <DrugAlcoholPacketPage />
    </>
  );
}
