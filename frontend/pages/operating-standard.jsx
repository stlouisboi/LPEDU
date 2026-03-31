import Head from 'next/head';
import OperatingStandardPage from '../src/pages/OperatingStandardPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>The LaunchPath Operating Standard | Compliance Infrastructure for New Motor Carriers</title>
        <meta name="description" content="The complete compliance operating system for new motor carriers — authority protection, insurance continuity, and the compliance backbone FMCSA expects." />
        <meta property="og:title" content="The LaunchPath Operating Standard | LaunchPath Transportation EDU" />
        <meta property="og:description" content="The complete compliance operating system for new motor carriers — authority protection, insurance continuity, and the compliance backbone FMCSA expects." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The LaunchPath Operating Standard | LaunchPath Transportation EDU" />
        <meta name="twitter:description" content="The complete compliance operating system for new motor carriers — authority protection, insurance continuity, and the compliance backbone FMCSA expects." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/operating-standard" />
      </Head>
      <OperatingStandardPage />
    </>
  );
}
