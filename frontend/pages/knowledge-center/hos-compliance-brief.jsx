import Head from 'next/head';
import HOSComplianceBrief from '../../src/pages/knowledge-center/HOSComplianceBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>Hours of Service Compliance for New Motor Carriers | LaunchPath</title>
        <meta name="description" content="What your HOS logs actually have to prove. The recordkeeping requirements, ELD obligations, and dispatch standards new carriers get wrong most often." />
        <meta property="og:title" content="Hours of Service Compliance for New Motor Carriers | LaunchPath" />
        <meta property="og:description" content="What your HOS logs actually have to prove. The recordkeeping requirements, ELD obligations, and dispatch standards new carriers get wrong most often." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hours of Service Compliance for New Motor Carriers | LaunchPath" />
        <meta name="twitter:description" content="What your HOS logs actually have to prove. The recordkeeping requirements, ELD obligations, and dispatch standards new carriers get wrong most often." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
      </Head>
      <HOSComplianceBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
