import Head from 'next/head';
import LpBrf08Page from '../../src/pages/knowledge-center/LpBrf08Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-08: Installation Window Brief | LaunchPath</title>
        <meta name="description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta property="og:title" content="LP-BRF-08: Installation Window Brief | LaunchPath" />
        <meta property="og:description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-08: Installation Window Brief | LaunchPath" />
        <meta name="twitter:description" content="The 90-day compliance installation window — what gets built, in what sequence, and why the order matters for new motor carriers." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <LpBrf08Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
