import { Html, Head, Main, NextScript } from 'next/document';

const LCP_HERO_URL = "https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/gt9pdg9a_hero-letter-dashboard.png";

export default function Document() {
  const gscCode = process.env.GOOGLE_SITE_VERIFICATION;
  return (
    <Html lang="en">
      <Head>
        {gscCode && <meta name="google-site-verification" content={gscCode} />}
        {/* Preload LCP hero background image */}
        <link rel="preload" as="image" href={LCP_HERO_URL} fetchPriority="high" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
