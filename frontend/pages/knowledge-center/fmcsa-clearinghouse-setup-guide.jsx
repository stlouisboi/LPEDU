import Head from 'next/head';
import ClearinghouseSetupPost from '../../src/pages/knowledge-center/ClearinghouseSetupPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>How to Register in the FMCSA Drug and Alcohol Clearinghouse | LaunchPath</title>
        <meta name="description" content="Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key." />
        <meta property="og:title" content="How to Register in the FMCSA Drug and Alcohol Clearinghouse | LaunchPath" />
        <meta property="og:description" content="Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Register in the FMCSA Drug and Alcohol Clearinghouse | LaunchPath" />
        <meta name="twitter:description" content="Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. What new motor carriers must complete before a driver turns a key." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <ClearinghouseSetupPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
