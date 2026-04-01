import Head from 'next/head';
import AutoMethodPage from '../../src/pages/standards/AutoMethodPage';

const AUTO_OG = "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/0a271d178b03794607375bbfa1428845f65deb6a51a0e1b2c09ab18087d26f9b.png";

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
