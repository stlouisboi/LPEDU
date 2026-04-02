import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  useEffect(() => { router.replace('/compliance-library'); }, [router]);
  return (
    <Head>
      <meta property="og:image" content="https://www.launchpathedu.com/og-new-carrier-document-system.png" />
      <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
      <meta name="twitter:image" content="https://www.launchpathedu.com/og-new-carrier-document-system.png" />
    </Head>
  );
}
