import Head from 'next/head';
import Ground0BriefingNewPage from '../src/pages/Ground0BriefingNewPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Ground Zero Briefing | LaunchPath Standard — LP-COH-002</title>
        <meta name="description" content="Request a private Ground Zero Briefing with Vince Lawrence. 20 minutes to review your USDOT compliance exposure and determine if LP-COH-002 is the right fit for your operation. No purchase required." />
        <meta property="og:title" content="Ground Zero Briefing | LaunchPath Standard" />
        <meta property="og:description" content="A 20-minute private review with Vince Lawrence. Your USDOT compliance telemetry, highest-risk exposure areas, and whether LP-COH-002 is the right fit." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ground Zero Briefing | LaunchPath Standard" />
        <meta name="twitter:description" content="A 20-minute private review with Vince Lawrence. Your USDOT compliance telemetry, highest-risk exposure areas, and whether LP-COH-002 is the right fit." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://launchpathedu.com/ground-0-briefing" />
      </Head>
      <Ground0BriefingNewPage />
    </>
  );
}
