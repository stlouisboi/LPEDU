import Head from 'next/head';
import DrugAlcoholPacketPage from '../../src/pages/products/DrugAlcoholPacketPage';

const OG = "https://launchpathedu.com/images/products/domain3-drug-alcohol.webp";

export default function Page() {
  return (
    <>
      <Head>
        <title>Drug & Alcohol Packet — Part 382 Compliance Operating Standard | LaunchPath</title>
        <meta name="description" content="Enrollment documentation, clearinghouse logs, and supervisor training records for Part 382 compliance. The operating standard for drug and alcohol program management." />
        <meta property="og:title" content="Drug & Alcohol Packet — Part 382 Compliance Operating Standard | LaunchPath" />
        <meta property="og:description" content="Enrollment documentation, clearinghouse logs, and supervisor training records for Part 382 compliance." />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://launchpathedu.com/products/drug-alcohol-packet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
        <link rel="canonical" href="https://launchpathedu.com/products/drug-alcohol-packet" />
      </Head>
      <DrugAlcoholPacketPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
