import { Html, Head, Main, NextScript } from 'next/document';

const LCP_HERO_URL = "https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80";

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
