import Head from 'next/head';
import NewEntrantProgramPost from '../../src/pages/knowledge-center/NewEntrantProgramPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>FMCSA New Entrant Program Guide: What the 18-Month Window Actually Requires | LaunchPath</title>
        <meta name="description" content="The FMCSA New Entrant Safety Assurance Program explained — what the 18-month audit window covers, what investigators look for, and how new carriers build compliant operations." />
        <meta property="og:title" content="FMCSA New Entrant Program Guide: What the 18-Month Window Actually Requires | LaunchPath" />
        <meta property="og:description" content="The FMCSA New Entrant Safety Assurance Program explained — what the 18-month audit window covers, what investigators look for, and how new carriers build compliant operations." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FMCSA New Entrant Program Guide: What the 18-Month Window Actually Requires | LaunchPath" />
        <meta name="twitter:description" content="The FMCSA New Entrant Safety Assurance Program explained — what the 18-month audit window covers, what investigators look for, and how new carriers build compliant operations." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <NewEntrantProgramPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
