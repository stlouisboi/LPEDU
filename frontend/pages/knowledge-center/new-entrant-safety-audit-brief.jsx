import Head from 'next/head';
import NewEntrantAuditBrief from '../../src/pages/knowledge-center/NewEntrantAuditBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>New Entrant Safety Audit: What FMCSA Actually Checks | LaunchPath</title>
        <meta name="description" content="A breakdown of the FMCSA New Entrant Safety Audit — what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating." />
        <meta property="og:title" content="New Entrant Safety Audit: What FMCSA Actually Checks | LaunchPath" />
        <meta property="og:description" content="A breakdown of the FMCSA New Entrant Safety Audit — what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="New Entrant Safety Audit: What FMCSA Actually Checks | LaunchPath" />
        <meta name="twitter:description" content="A breakdown of the FMCSA New Entrant Safety Audit — what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <NewEntrantAuditBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
