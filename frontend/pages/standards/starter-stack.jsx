import Head from 'next/head';
import StarterStackPage from '../../src/pages/products/StarterStackPage';
export default function Page() {
  return (
    <>
      <Head>
        <title>Starter Stack — Foundation Document Set for New Motor Carriers | LaunchPath</title>
        <meta name="description" content="The entry-level document package for new motor carriers. Core templates, forms, and operational checklists to establish your compliance foundation from day one." />
        <meta property="og:title" content="Starter Stack — Foundation Document Set for New Motor Carriers | LaunchPath" />
        <meta property="og:description" content="Core templates, forms, and operational checklists to establish your compliance foundation from day one." />
        <meta property="og:image" content="https://www.launchpathedu.com/og-starter-stack.png" />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Starter Stack — Foundation Document Set for New Motor Carriers | LaunchPath" />
        <meta name="twitter:description" content="Core templates, forms, and operational checklists to establish your compliance foundation from day one." />
        <meta name="twitter:image" content="https://www.launchpathedu.com/og-starter-stack.png" />
        <link rel="canonical" href="https://www.launchpathedu.com/standards/starter-stack" />
      </Head>
      <StarterStackPage />
    </>
  );
}
