import Head from 'next/head';
import AllChecklists from '../../src/pages/knowledge-center/AllChecklists';

export default function Page() {
  return (
    <>
      <Head>
        <title>New Entrant Compliance Checklists: All Six Domains | LaunchPath</title>
        <meta name="description" content="Complete compliance checklists for all six FMCSA audit domains — driver qualification, drug & alcohol, HOS, maintenance, insurance, and accident records." />
        <meta property="og:title" content="New Entrant Compliance Checklists: All Six Domains | LaunchPath" />
        <meta property="og:description" content="Complete compliance checklists for all six FMCSA audit domains — driver qualification, drug & alcohol, HOS, maintenance, insurance, and accident records." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="New Entrant Compliance Checklists: All Six Domains | LaunchPath" />
        <meta name="twitter:description" content="Complete compliance checklists for all six FMCSA audit domains — driver qualification, drug & alcohol, HOS, maintenance, insurance, and accident records." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png" />
      </Head>
      <AllChecklists />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
