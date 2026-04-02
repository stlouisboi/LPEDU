import Head from 'next/head';
import SafetyAuditPrepPage from '../../src/pages/products/SafetyAuditPrepPage';
export default function Page() {
  return (
    <>
      <Head>
        <title>Safety Audit Prep Pack — FMCSA Audit Preparation Standard | LaunchPath</title>
        <meta name="description" content="The complete preparation system for the FMCSA new entrant safety audit. Documentation checklists, audit-ready file organization, and corrective action frameworks." />
        <meta property="og:title" content="Safety Audit Prep Pack — FMCSA Audit Preparation Standard | LaunchPath" />
        <meta property="og:description" content="The complete preparation system for the FMCSA new entrant safety audit — checklists, file organization, and corrective action frameworks." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-safety-audit-prep-pack.png" />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Safety Audit Prep Pack — FMCSA Audit Preparation Standard | LaunchPath" />
        <meta name="twitter:description" content="The complete preparation system for the FMCSA new entrant safety audit — checklists, file organization, and corrective action frameworks." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-safety-audit-prep-pack.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/standards/safety-audit-prep-pack" />
      </Head>
      <SafetyAuditPrepPage />
    </>
  );
}
