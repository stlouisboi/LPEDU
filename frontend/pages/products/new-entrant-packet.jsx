import Head from 'next/head';
import NewEntrantPacketPage from '../../src/pages/products/NewEntrantPacketPage';

const OG = "https://launchpathedu.com/images/products/domain1-new-entrant.webp";

export default function Page() {
  return (
    <>
      <Head>
        <title>New Entrant Packet — FMCSA New-Authority Operating Standard | LaunchPath</title>
        <meta name="description" content="The 18-month monitoring period framework, DQ file system, and new entrant audit preparation. The operating standard for new motor carrier authority compliance from day one." />
        <meta property="og:title" content="New Entrant Packet — FMCSA New-Authority Operating Standard | LaunchPath" />
        <meta property="og:description" content="The 18-month monitoring period framework, DQ file system, and new entrant audit preparation for new motor carriers." />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://launchpathedu.com/products/new-entrant-packet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
        <link rel="canonical" href="https://launchpathedu.com/products/new-entrant-packet" />
      </Head>
      <NewEntrantPacketPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
