import Head from 'next/head';
import LpBrf09Page from '../../src/pages/knowledge-center/LpBrf09Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-09: Operating Patterns Brief | LaunchPath</title>
        <meta name="description" content="The operating patterns that create compliance exposure for new motor carriers — identified from 200+ operations reviewed under the LaunchPath Standard." />
        <meta property="og:title" content="LP-BRF-09: Operating Patterns Brief | LaunchPath" />
        <meta property="og:description" content="The operating patterns that create compliance exposure for new motor carriers — identified from 200+ operations reviewed under the LaunchPath Standard." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-09: Operating Patterns Brief | LaunchPath" />
        <meta name="twitter:description" content="The operating patterns that create compliance exposure for new motor carriers — identified from 200+ operations reviewed under the LaunchPath Standard." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <LpBrf09Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
