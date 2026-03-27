import Head from 'next/head';
import FinancialRunwayBrief from '../../src/pages/knowledge-center/FinancialRunwayBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>LP-BRF-12: Financial Runway Brief | LaunchPath</title>
        <meta name="description" content="What financial resources a new motor carrier actually needs before starting operations. The REACH Resources pillar explained." />
        <meta property="og:title" content="LP-BRF-12: Financial Runway Brief | LaunchPath" />
        <meta property="og:description" content="What financial resources a new motor carrier actually needs before starting operations. The REACH Resources pillar explained." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LP-BRF-12: Financial Runway Brief | LaunchPath" />
        <meta name="twitter:description" content="What financial resources a new motor carrier actually needs before starting operations. The REACH Resources pillar explained." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <FinancialRunwayBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
