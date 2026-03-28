import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const gscCode = process.env.GOOGLE_SITE_VERIFICATION;
  return (
    <Html lang="en">
      <Head>
        {gscCode && <meta name="google-site-verification" content={gscCode} />}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
