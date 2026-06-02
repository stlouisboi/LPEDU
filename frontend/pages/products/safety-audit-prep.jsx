import Head from 'next/head';
import SafetyAuditPrepPage from '../../src/pages/products/SafetyAuditPrepPage';

export default function Page() {
  return (
    <>
      <Head>
        <title>Safety Audit Prep — New Entrant Audit Preparation | LaunchPath</title>
        <meta name="description" content="Prepare your operation for the FMCSA new entrant safety audit. Structured documentation review, audit-ready file organization, and gap remediation protocols." />
        <meta property="og:title" content="Safety Audit Prep — New Entrant Audit Preparation | LaunchPath" />
        <meta property="og:description" content="Structured documentation review, audit-ready file organization, and gap remediation for the FMCSA new entrant safety audit." />
        <meta property="og:image" content="https://launchpathedu.com/og-safety-audit-prep.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://launchpathedu.com/products/safety-audit-prep" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://launchpathedu.com/og-safety-audit-prep.png" />
        <link rel="canonical" href="https://launchpathedu.com/products/safety-audit-prep" />
      </Head>
      <SafetyAuditPrepPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
