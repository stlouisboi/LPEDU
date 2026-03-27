import AutoMethodPage from '../src/pages/AutoMethodPage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>The Auto Method | LaunchPath</title>
        <meta name="description" content="The systematic approach to building a compliant motor carrier operation from authority activation to verified compliance." />
        <meta property="og:title" content="The Auto Method | LaunchPath" />
        <meta property="og:description" content="The systematic approach to building a compliant motor carrier operation from authority activation to verified compliance." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Auto Method | LaunchPath" />
        <meta name="twitter:description" content="The systematic approach to building a compliant motor carrier operation from authority activation to verified compliance." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <AutoMethodPage />
    </>
  );
}
