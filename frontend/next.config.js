/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // www → non-www canonical redirect
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.launchpathedu.com" }],
        destination: "https://launchpathedu.com/:path*",
        permanent: true,
      },
      { source: "/reach", destination: "/reach-diagnostic", permanent: true },
      { source: "/knowledge-center/lp-brf-07", destination: "/knowledge-center/first-dispatch-requirements", permanent: true },
      { source: "/knowledge-center/lp-brf-08", destination: "/knowledge-center/new-carrier-90-day-build", permanent: true },
      { source: "/knowledge-center/lp-brf-09", destination: "/knowledge-center/operating-patterns-compliance-risks", permanent: true },
      { source: "/knowledge-center/lp-brf-10", destination: "/knowledge-center/fmcsa-audit-preparation-records", permanent: true },
      { source: "/knowledge-center/lp-brf-11", destination: "/knowledge-center/fmcsa-new-entrant-review", permanent: true },
      { source: "/knowledge-center/lp-brf-12", destination: "/knowledge-center/new-motor-carrier-financial-requirements", permanent: true },
      { source: "/knowledge-center/failed-fmcsa-new-entrant-audit", destination: "/knowledge-center/what-happens-failed-fmcsa-new-entrant-audit", permanent: true },
      { source: "/knowledge-center/installation-window", destination: "/knowledge-center/new-carrier-90-day-build", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Cache Next.js static bundles for 1 year (they are content-hashed)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache public folder assets for 7 days
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
