import SixteenSinsPage from '../src/pages/standards/SixteenSinsPage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>The 16 Deadly Sins: Common Compliance Failures That End Motor Carrier Authority | LaunchPath</title>
        <meta name="description" content="The 16 most common compliance violations that result in Conditional and Unsatisfactory safety ratings for new motor carriers. Know them before FMCSA finds them for you." />
        <meta property="og:title" content="The 16 Deadly Sins: Common Compliance Failures That End Motor Carrier Authority | LaunchPath" />
        <meta property="og:description" content="The 16 most common compliance violations that result in Conditional and Unsatisfactory safety ratings for new motor carriers. Know them before FMCSA finds them for you." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The 16 Deadly Sins: Common Compliance Failures That End Motor Carrier Authority | LaunchPath" />
        <meta name="twitter:description" content="The 16 most common compliance violations that result in Conditional and Unsatisfactory safety ratings for new motor carriers. Know them before FMCSA finds them for you." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1652081439602-b917d33f794b?w=1200&h=630&fit=crop&crop=center&q=80" />
      </Head>
      <SixteenSinsPage />
    </>
  );
}
