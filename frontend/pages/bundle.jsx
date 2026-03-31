import BundleSalesPage from '../src/pages/BundleSalesPage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Document System Bundle — $499 | LaunchPath</title>
        <meta name="description" content="Five compliance domain packets, a unified folder structure, and a 90-day implementation calendar. Every form FMCSA expects — for $499." />
        <meta property="og:title" content="Document System Bundle — $499 | LaunchPath" />
        <meta property="og:description" content="Five compliance domain packets, a unified folder structure, and a 90-day implementation calendar. Every form FMCSA expects — for $499." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Document System Bundle — $499 | LaunchPath" />
        <meta name="twitter:description" content="Five compliance domain packets, a unified folder structure, and a 90-day implementation calendar. Every form FMCSA expects — for $499." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
      </Head>
      <BundleSalesPage />
    </>
  );
}
