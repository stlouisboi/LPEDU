import Head from 'next/head';
import BoxTruckFMCSAPost from '../../src/pages/knowledge-center/BoxTruckFMCSAPost';

export default function Page() {
  return (
    <>
      <Head>
        <title>Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes | LaunchPath</title>
        <meta name="description" content="The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line." />
        <meta property="og:title" content="Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes | LaunchPath" />
        <meta property="og:description" content="The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line." />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes | LaunchPath" />
        <meta name="twitter:description" content="The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line." />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes",
          "description": "The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, and driver qualification obligations. Here's what applies below and above that line.",
          "url": "https://launchpathedu.com/knowledge-center/box-truck-fmcsa-requirements",
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
                    "@id": "https://launchpathedu.com/knowledge-center/box-truck-fmcsa-requirements"
          }
})}}
        />
      </Head>
      <BoxTruckFMCSAPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
