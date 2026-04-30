import Head from "next/head";
import LibraryPage from "../../src/pages/products/LibraryPage";

const URL = "https://launchpathedu.com/products/library";
const OG_IMAGE = "https://launchpathedu.com/images/products/complete-diy-library.webp";

export default function Library() {
  return (
    <>
      <Head>
        <title>Complete LaunchPath DIY Library — $699 | All 8 Compliance Assets | LaunchPath</title>
        <meta
          name="description"
          content="Every compliance document LaunchPath produces — 8 assets covering all 5 FMCSA audit domains, diagnostics, and audit prep. One acquisition. Self-installation. $699."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />

        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content="Complete LaunchPath DIY Library — $699" />
        <meta property="og:description" content="Every compliance document LaunchPath produces for new motor carriers — 8 assets, one acquisition, instant access." />
        <meta property="og:image" content={OG_IMAGE} />

        {/* JSON-LD Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Complete LaunchPath DIY Library",
              "description": "Every compliance document LaunchPath produces for new motor carriers — 8 assets covering all FMCSA audit domains, diagnostics, and audit prep.",
              "sku": "LP-LIB-001",
              "brand": { "@type": "Brand", "name": "LaunchPath" },
              "offers": {
                "@type": "Offer",
                "url": URL,
                "price": "699.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": { "@type": "Organization", "name": "LaunchPath Transportation Edu LLC" },
              },
            }),
          }}
        />
      </Head>
      <LibraryPage />
    </>
  );
}

export function getStaticProps() {
  return { props: {} };
}
