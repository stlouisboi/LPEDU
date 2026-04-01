import Head from 'next/head';
import AutoMethodPage from '../../src/pages/standards/AutoMethodPage';

const AUTO_OG = "https://launchpathedu.com/og-launchpath.png";

export default function Page() {
  return (
    <>
      <Head>
        <title>The AUTO Method: Four Ways Failure Reaches the Authority | LaunchPath</title>
        <meta name="description" content="AUTO is the breach-path model: Around, Under, Through, Over. Four ways failure bypasses, accumulates, penetrates, or overwhelms the guard around motor carrier authority." />
        <meta property="og:title" content="The AUTO Method: Four Ways Failure Reaches the Authority" />
        <meta property="og:description" content="Around. Under. Through. Over. Four breach paths. Each behaves differently. Each requires a different control to close it." />
        <meta property="og:image" content={AUTO_OG} />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://launchpathedu.com/standards/auto-method" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The AUTO Method: Four Ways Failure Reaches the Authority | LaunchPath" />
        <meta name="twitter:description" content="Around. Under. Through. Over. Four breach paths mapped to controls, CFR references, and the Four Pillars that resist them." />
        <meta name="twitter:image" content={AUTO_OG} />
      </Head>
      <AutoMethodPage />
    </>
  );
}
