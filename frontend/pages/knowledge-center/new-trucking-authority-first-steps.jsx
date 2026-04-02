import Head from 'next/head';
import NewTruckingAuthorityPost from '../../src/pages/knowledge-center/NewTruckingAuthorityPost';

const TITLE = "New Trucking Authority: Your First 30 Days | LaunchPath";
const H1 = "You Have Your MC Number. Here Is What Happens Next.";
const DESC = "Getting your MC number is step one. Here is the compliance sequence every new motor carrier must complete before the first load moves.";
const URL = "https://launchpathedu.com/knowledge-center/new-trucking-authority-first-steps";

const FAQ_ITEMS = [
  { q: "How long does it take for my MC number to become active?", a: "FMCSA typically processes new MC number applications within 20 to 25 business days. Active does not mean you can operate — it means the authority has been granted and the pre-operation compliance sequence can begin." },
  { q: "Do I need insurance before or after I get my MC number?", a: "You need insurance filed and active in FMCSA's system before you operate. Work with your insurer on timing — the BMC-91 filing should be in place as soon as your authority is granted." },
  { q: "What is UCR and do I have to register every year?", a: "Unified Carrier Registration is an annual fee-based registration program for interstate carriers. Yes, it renews every year. Operating without current UCR registration exposes you to per-vehicle fines." },
  { q: "Can I drive my own truck before my DQ file is complete?", a: "If you are the driver and you are operating a CMV subject to 49 CFR Part 391, your own DQ file must be complete before you operate. Owner-operators are subject to the same DQ file requirements as employed drivers." },
  { q: "What is a consortium and do I need one?", a: "A consortium is a third-party administrator that manages DOT drug and alcohol testing for multiple carriers. If you have CDL drivers, you need a drug and alcohol program — and for most small carriers, a consortium is the most practical way to establish one." },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" key="canonical" href={URL} />
        <meta property="og:title" content={H1} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content="https://launchpathedu.com/og-launchpath.png" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={H1} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content="https://launchpathedu.com/og-launchpath.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "headline": H1,
                "description": DESC,
                "url": URL,
                "datePublished": "2026-04-01",
                "dateModified": "2026-04-01",
                "author": { "@type": "Person", "name": "Vince Lawrence", "url": "https://launchpathedu.com/founder" },
                "publisher": { "@type": "Organization", "name": "LaunchPath Transportation EDU", "url": "https://launchpathedu.com", "logo": { "@type": "ImageObject", "url": "https://launchpathedu.com/og-launchpath.png" } },
                "image": "https://launchpathedu.com/og-launchpath.png",
                "mainEntityOfPage": { "@type": "WebPage", "@id": URL }
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQ_ITEMS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
              }
            ]
          })}}
        />
      </Head>
      <NewTruckingAuthorityPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
