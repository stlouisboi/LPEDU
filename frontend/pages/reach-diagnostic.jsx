import Head from 'next/head';
import REACHAssessmentPage from '../src/pages/REACHAssessmentPage';

const SITE  = "https://launchpathedu.com";
const TITLE = "REACH Test | FMCSA Compliance Gap Check | LaunchPath";
const DESC  = "Find out how exposed your MC authority is before FMCSA does. The REACH diagnostic reveals whether danger can already reach your operation — GO, WAIT, or NO-GO.";
const OG    = `${SITE}/og-launchpath.png`;

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/reach-diagnostic`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={OG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": TITLE,
            "description": DESC,
            "url": `${SITE}/reach-diagnostic`,
            "publisher": {
              "@type": "Organization",
              "name": "LaunchPath Transportation EDU",
              "url": SITE
            }
          }) }}
        />
      </Head>
      <REACHAssessmentPage />
    </>
  );
}
