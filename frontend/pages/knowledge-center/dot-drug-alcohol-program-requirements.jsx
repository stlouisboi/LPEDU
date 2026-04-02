import Head from 'next/head';
import DOTDrugAlcoholPost from '../../src/pages/knowledge-center/DOTDrugAlcoholPost';

const TITLE = "DOT Drug and Alcohol Program Requirements for Motor Carriers | LaunchPath";
const H1 = "What FMCSA Requires for Your DOT Drug and Alcohol Program";
const DESC = "49 CFR Part 382 requires every motor carrier with CDL drivers to have a drug and alcohol testing program before the first driver operates. Here is what that requires.";
const URL = "https://launchpathedu.com/knowledge-center/dot-drug-alcohol-program-requirements";

const FAQ_ITEMS = [
  { q: "What is 49 CFR Part 382?", a: "49 CFR Part 382 is the federal regulation that establishes drug and alcohol testing requirements for commercial motor vehicle operators. It covers which carriers must have a program, the types of testing required, testing procedures, and consequences for violations. It applies to all motor carriers employing CDL drivers in safety-sensitive functions in interstate commerce." },
  { q: "What types of drug and alcohol testing does FMCSA require?", a: "FMCSA requires six types of testing under 49 CFR Part 382: pre-employment (before first safety-sensitive function), random (ongoing, based on annual minimum rates set by FMCSA), post-accident (specific triggering criteria under 49 CFR 382.303), reasonable suspicion (based on trained supervisor observation), return-to-duty (after a violation), and follow-up (after return-to-duty completion)." },
  { q: "Do I need a drug and alcohol program if I am the only driver?", a: "Yes. Owner-operators who drive CDL vehicles in safety-sensitive functions are subject to 49 CFR Part 382. Owner-operators must enroll in a consortium to satisfy the random testing requirement — a single-driver operation cannot run a statistically valid random testing program independently." },
  { q: "What is a consortium and why do most small carriers use one?", a: "A consortium — also called a Third-Party Administrator (TPA) — manages drug and alcohol testing on behalf of multiple carriers. It maintains the random testing pool, contracts with SAMHSA-certified labs, provides access to Medical Review Officers (MROs) and Substance Abuse Professionals (SAPs), and handles required reporting. Most small carriers use a consortium because establishing an equivalent in-house program requires significantly more administrative infrastructure." },
  { q: "What happens if a driver fails a pre-employment drug test?", a: "A driver who receives a positive pre-employment drug test result may not perform any safety-sensitive function until they have completed the return-to-duty process under 49 CFR Part 40 — including evaluation by a Substance Abuse Professional and a negative return-to-duty test result. The positive result must also be reported to the FMCSA Drug and Alcohol Clearinghouse." },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
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
      <DOTDrugAlcoholPost />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
