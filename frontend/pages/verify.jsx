import Head from 'next/head';
import dynamic from 'next/dynamic';

const VerifyPage = dynamic(() => import('../src/pages/verify/VerifyPage'), { ssr: false });

const TITLE = 'Carrier Verification — LaunchPath Verified Registry';
const DESC  = 'Confirm a motor carrier holds a verified LaunchPath credential. Enter their LP-VRF registry ID to check their compliance program completion status.';
const OG    = 'https://launchpathedu.com/og-launchpath.png';
const URL   = 'https://launchpathedu.com/verify';

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG} />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG} />
      </Head>
      <VerifyPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
