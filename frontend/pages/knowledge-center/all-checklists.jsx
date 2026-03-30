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
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="New Entrant Compliance Checklists: All Six Domains | LaunchPath" />
        <meta name="twitter:description" content="Complete compliance checklists for all six FMCSA audit domains — driver qualification, drug & alcohol, HOS, maintenance, insurance, and accident records." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <AllChecklists />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
