import Head from 'next/head';
import dynamic from 'next/dynamic';
const CoachRegistryPage = dynamic(() => import('../src/pages/CoachRegistryPage'), { ssr: false });
export default function Page() {
  return (
    <>
      <Head>
        <title>Coach Registry & Carrier Portal | LaunchPath Standard</title>
        <meta name="description" content="Carrier verification registry and coach portal for LaunchPath Standard administrators. Monitor operator progress, remediate tasks, and issue gate decisions." />
        <meta property="og:title" content="Coach Registry & Carrier Portal | LaunchPath Standard" />
        <meta property="og:description" content="Carrier verification registry and coach portal for LaunchPath Standard administrators. Monitor operator progress, remediate tasks, and issue gate decisions." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Coach Registry & Carrier Portal | LaunchPath Standard" />
        <meta name="twitter:description" content="Carrier verification registry and coach portal for LaunchPath Standard administrators. Monitor operator progress, remediate tasks, and issue gate decisions." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://launchpathedu.com/coach-registry" />
      </Head>
      <CoachRegistryPage />
    </>
  );
}
