import ComplianceLibraryPage from '../src/pages/ComplianceLibraryPage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Compliance Library | FMCSA Document Systems for Motor Carriers | LaunchPath</title>
        <meta name="description" content="DIY compliance document systems for new motor carriers. Five compliance domains, a complete document bundle, and a guided 90-day implementation program." />
        <meta property="og:title" content="Compliance Library | FMCSA Document Systems for Motor Carriers | LaunchPath" />
        <meta property="og:description" content="DIY compliance document systems for new motor carriers. Five compliance domains, a complete document bundle, and a guided 90-day implementation program." />
        <meta property="og:url" content="https://launchpathedu.com/compliance-library" />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compliance Library | FMCSA Document Systems for Motor Carriers | LaunchPath" />
        <meta name="twitter:description" content="DIY compliance document systems for new motor carriers. Five compliance domains, a complete document bundle, and a guided 90-day implementation program." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
      </Head>
      <ComplianceLibraryPage />
    </>
  );
}
