import Head from 'next/head';
import LpBrf11Page from '../../src/pages/knowledge-center/LpBrf11Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-11: New Entrant Review Brief | LaunchPath</title>
        <meta name="description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta property="og:title" content="LP-BRF-11: New Entrant Review Brief | LaunchPath" />
        <meta property="og:description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-11: New Entrant Review Brief | LaunchPath" />
        <meta name="twitter:description" content="What FMCSA's New Entrant Review actually examines — the six compliance domains and the documentation standard applied at each checkpoint." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <LpBrf11Page />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
