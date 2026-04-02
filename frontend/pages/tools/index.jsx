import Head from 'next/head';
import ToolsIndexPage from '../../src/pages/ToolsIndexPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Free Compliance Tools for New Motor Carriers | LaunchPath</title>
        <meta name="description" content="Four free tools built for new motor carriers — True Cost of Ownership Calculator, Load Profitability Analyzer, Compliance Gap Audit, and Compliance Health Check." />
        <meta property="og:title" content="Free Compliance Tools for New Motor Carriers | LaunchPath" />
        <meta property="og:description" content="Four free tools built for new motor carriers — True Cost of Ownership Calculator, Load Profitability Analyzer, Compliance Gap Audit, and Compliance Health Check." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Compliance Tools for New Motor Carriers | LaunchPath" />
        <meta name="twitter:description" content="Four free tools built for new motor carriers — True Cost of Ownership Calculator, Load Profitability Analyzer, Compliance Gap Audit, and Compliance Health Check." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-launchpath.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/tools" />
      </Head>
      <ToolsIndexPage />
    </>
  );
}
