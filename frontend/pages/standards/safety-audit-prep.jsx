import Head from 'next/head';
import SafetyAuditPrepPage from '../../src/pages/products/SafetyAuditPrepPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Safety Audit Prep — New Entrant Audit Preparation Standard | LaunchPath</title>
        <meta name="description" content="Prepare your operation for the FMCSA new entrant safety audit. Structured documentation review, audit-ready file organization, and gap remediation protocols." />
        <meta property="og:title" content="Safety Audit Prep — New Entrant Audit Preparation Standard | LaunchPath" />
        <meta property="og:description" content="Structured documentation review, audit-ready file organization, and gap remediation for the FMCSA new entrant safety audit." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-safety-audit-prep.png" />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Safety Audit Prep — New Entrant Audit Preparation Standard | LaunchPath" />
        <meta name="twitter:description" content="Structured documentation review, audit-ready file organization, and gap remediation for the FMCSA new entrant safety audit." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-safety-audit-prep.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/standards/safety-audit-prep" />
      </Head>
      <SafetyAuditPrepPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
