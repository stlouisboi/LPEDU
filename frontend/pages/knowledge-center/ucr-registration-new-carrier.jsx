import Head from 'next/head';
import UCRRegistrationPost from '../../src/pages/knowledge-center/UCRRegistrationPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>UCR Registration for New Carriers: What It Is and How to Stay Current | LaunchPath</title>
        <meta name="description" content="Unified Carrier Registration requirements for new motor carriers — who must register, annual renewal obligations, and the consequence of letting it lapse." />
        <meta property="og:title" content="UCR Registration for New Carriers: What It Is and How to Stay Current | LaunchPath" />
        <meta property="og:description" content="Unified Carrier Registration requirements for new motor carriers — who must register, annual renewal obligations, and the consequence of letting it lapse." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UCR Registration for New Carriers: What It Is and How to Stay Current | LaunchPath" />
        <meta name="twitter:description" content="Unified Carrier Registration requirements for new motor carriers — who must register, annual renewal obligations, and the consequence of letting it lapse." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "UCR Registration for New Carriers: What It Is and How to Stay Current",
          "description": "Unified Carrier Registration requirements for new motor carriers \u2014 who must register, annual renewal obligations, and the consequence of letting it lapse.",
          "url": "https://launchpathedu.com/knowledge-center/ucr-registration-new-carrier",
          "datePublished": "2025-03-01",
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
                    "@id": "https://launchpathedu.com/knowledge-center/ucr-registration-new-carrier"
          }
})}}
        />
      </Head>
      <UCRRegistrationPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
