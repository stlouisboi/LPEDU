import Head from 'next/head';

const C = {
  bg: '#F7F5F0',
  navy: '#0D2240',
  gold: '#C9A84C',
  goldDark: '#A8852F',
  text: '#0D1829',
  textMuted: '#5A6478',
  textLight: '#8A93A6',
  border: 'rgba(13,34,64,0.10)',
};

const S = {
  playfair: "'Playfair Display', Georgia, serif",
  inter: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

export default function RiskMapThankYou() {
  return (
    <>
      <Head>
        <title>Your Risk Map Is On the Way | LaunchPath Transportation EDU</title>
        <meta name="description" content="Your copy of The First 90 Days Risk Map is on its way to your inbox." />
        <meta name="robots" content="noindex" />
      </Head>

      <div
        style={{
          background: C.bg,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
          fontFamily: S.inter,
        }}
      >
        <div style={{ maxWidth: '540px', width: '100%', textAlign: 'center' }}>
          {/* LP mark */}
          <div
            style={{
              fontFamily: S.mono,
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.20em',
              color: C.gold,
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            LaunchPath Transportation EDU · LP-STD-001
          </div>

          {/* Gold accent line */}
          <div
            style={{
              width: '40px',
              height: '3px',
              background: C.gold,
              margin: '0 auto 28px',
            }}
          />

          {/* Headline */}
          <h1
            data-testid="thank-you-headline"
            style={{
              fontFamily: S.playfair,
              fontSize: '40px',
              fontWeight: '800',
              color: C.navy,
              margin: '0 0 20px',
              lineHeight: '1.2',
            }}
          >
            Your Risk Map is on the way.
          </h1>

          {/* Body */}
          <p
            style={{
              fontFamily: S.inter,
              fontSize: '16px',
              color: C.textMuted,
              lineHeight: '1.75',
              margin: '0 0 40px',
            }}
          >
            Check your inbox. The guide should arrive within a few minutes.
          </p>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: C.border,
              margin: '0 0 40px',
            }}
          />

          {/* Next step copy */}
          <p
            style={{
              fontFamily: S.inter,
              fontSize: '15px',
              color: C.textMuted,
              lineHeight: '1.75',
              margin: '0 0 28px',
            }}
          >
            Then take the next step — run the REACH Diagnostic to see which phase may already be exposed in your operation.
          </p>

          {/* Primary CTA */}
          <a
            data-testid="thank-you-reach-btn"
            href="https://www.launchpathedu.com/reach-diagnostic"
            style={{
              display: 'inline-block',
              background: C.gold,
              color: C.navy,
              fontFamily: S.mono,
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '16px 36px',
              textDecoration: 'none',
              marginBottom: '16px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = C.goldDark)}
            onMouseOut={(e) => (e.currentTarget.style.background = C.gold)}
          >
            Run the REACH Diagnostic →
          </a>

          {/* Microcopy */}
          <p
            style={{
              fontFamily: S.inter,
              fontSize: '12px',
              color: C.textLight,
              lineHeight: '1.6',
              margin: '0',
            }}
          >
            Free. 4–6 minutes. No account required.
          </p>

          {/* Footer mark */}
          <div
            style={{
              fontFamily: S.mono,
              fontSize: '10px',
              color: C.textLight,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              marginTop: '64px',
              opacity: 0.6,
            }}
          >
            launchpathedu.com · Not legal or compliance advice
          </div>
        </div>
      </div>
    </>
  );
}
