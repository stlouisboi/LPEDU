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
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://launchpathedu.com/products/starter-stack" />
      </Head>
      <StarterStackPage />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
