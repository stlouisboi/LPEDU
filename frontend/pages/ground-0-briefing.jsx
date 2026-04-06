import Head from 'next/head';
import Ground0Page from '../src/pages/Ground0Page';

export default function Page() {
  return (
    <>
      <Head>
        <title>Ground 0 | Free FMCSA Diagnostic | LaunchPath</title>
        <meta name="description" content="Ground 0 is the entry point for the LaunchPath Standard — covering the 90-Day Compliance Window, the AUTO Risk Model, the Four Pillars of Carrier Survival, and the 16 Deadly Sins. Complete REACH before entry." />
        <meta property="og:title" content="Ground 0 — The Foundation Module | LaunchPath Standard" />
        <meta property="og:description" content="Ground 0 is the entry point for the LaunchPath Standard — covering the 90-Day Compliance Window, the AUTO Risk Model, the Four Pillars of Carrier Survival, and the 16 Deadly Sins." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ground 0 — The Foundation Module | LaunchPath Standard" />
        <meta name="twitter:description" content="Ground 0 is the entry point for the LaunchPath Standard — covering the 90-Day Compliance Window, the AUTO Risk Model, the Four Pillars of Carrier Survival, and the 16 Deadly Sins." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/ground-0-briefing" />
      </Head>
      <Ground0Page />
    </>
  );
}
