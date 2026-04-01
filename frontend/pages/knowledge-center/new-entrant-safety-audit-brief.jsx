import Head from 'next/head';
import NewEntrantAuditBrief from '../../src/pages/knowledge-center/NewEntrantAuditBrief';

export default function Page() {
  return (
    <>
      <Head>
        <title>New Entrant Safety Audit: What FMCSA Actually Checks | LaunchPath</title>
        <meta name="description" content="A breakdown of the FMCSA New Entrant Safety Audit — what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating." />
        <meta property="og:title" content="New Entrant Safety Audit: What FMCSA Actually Checks | LaunchPath" />
        <meta property="og:description" content="A breakdown of the FMCSA New Entrant Safety Audit — what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="New Entrant Safety Audit: What FMCSA Actually Checks | LaunchPath" />
        <meta name="twitter:description" content="A breakdown of the FMCSA New Entrant Safety Audit — what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "New Entrant Safety Audit: What FMCSA Actually Checks",
          "description": "A breakdown of the FMCSA New Entrant Safety Audit \u2014 what investigators look for, which files they pull, and the 6 compliance domains that determine your safety rating.",
          "url": "https://launchpathedu.com/knowledge-center/new-entrant-safety-audit-brief",
          "datePublished": "2025-02-01",
          "dateModified": "2026-04-01",
          "author": {
                    "@type": "Person",
                    "name": "Vince Lawrence",
                    "url": "https://launchpathedu.com/founder"
          },
          "publisher": {
                    "@type": "Organization",
                    "name": "LaunchPath Transportation EDU",
                    "url": "https://launchpathedu.com",
                    "logo": {
                              "@type": "ImageObject",
                              "url": "https://launchpathedu.com/og-launchpath.png"
                    }
          },
          "image": "https://launchpathedu.com/og-launchpath.png",
          "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://launchpathedu.com/knowledge-center/new-entrant-safety-audit-brief"
          }
})}}
        />
      </Head>
      <NewEntrantAuditBrief />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
