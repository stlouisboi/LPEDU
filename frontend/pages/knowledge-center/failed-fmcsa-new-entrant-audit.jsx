import Head from 'next/head';
import FailedAuditPost2 from '../../src/pages/knowledge-center/FailedAuditPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath</title>
        <meta name="description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming." />
        <meta property="og:title" content="What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath" />
        <meta property="og:description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What Actually Happens When You Fail an FMCSA New Entrant Audit | LaunchPath" />
        <meta name="twitter:description" content="A Conditional rating from the FMCSA New Entrant Audit triggers insurance and cash-flow consequences most carriers don't see coming." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <FailedAuditPost2 />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
