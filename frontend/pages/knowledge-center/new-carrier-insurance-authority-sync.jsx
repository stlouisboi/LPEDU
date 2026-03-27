import Head from 'next/head';
import InsuranceSyncPost from '../../src/pages/knowledge-center/InsuranceSyncPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath</title>
        <meta name="description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta property="og:title" content="How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath" />
        <meta property="og:description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Verify Your Insurance Filing Is Active on FMCSA's System | LaunchPath" />
        <meta name="twitter:description" content="Your insurer filed the certificate. FMCSA's system may not reflect it yet. Here's how to verify the sync and what happens when it's wrong." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <InsuranceSyncPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
