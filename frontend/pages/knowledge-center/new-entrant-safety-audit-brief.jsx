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
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="New Entrant Safety Audit: What FMCSA Actually Checks | LaunchPath" />
        <meta name="twitter:description" content="A breakdown of the FMCSA New Entrant Safety Audit — what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <NewEntrantAuditBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
