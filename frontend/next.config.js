/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: false,
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "customer-assets.emergentagent.com" },
      { protocol: "https", hostname: "static.prod-images.emergentagent.com" },
    ],
  },
  async rewrites() {
    // Proxy /api/* to the backend server-side so the browser sees same-origin
    // requests — eliminates CORS entirely on the production Vercel domain.
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://your-numbers-calc.preview.emergentagent.com";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      // /sitemap → /sitemap.xml canonical fix
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },

      // www → non-www canonical redirect
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.launchpathedu.com" }],
        destination: "https://launchpathedu.com/:path*",
        permanent: true,
      },
      // /standards/ → /products/ canonical consolidation (permanent 301)
      { source: "/standards/new-entrant-packet",        destination: "/products/new-entrant-packet",    permanent: true },
      { source: "/standards/dq-file-builder",           destination: "/products/dq-file-builder",       permanent: true },
      { source: "/standards/drug-alcohol-packet",       destination: "/products/drug-alcohol-packet",   permanent: true },
      { source: "/standards/hos-packet",                destination: "/products/hos-packet",            permanent: true },
      { source: "/standards/maintenance-packet",        destination: "/products/maintenance-packet",    permanent: true },
      { source: "/standards/insurance-packet",          destination: "/products/insurance-packet",      permanent: true },
      { source: "/standards/safety-audit-prep",         destination: "/products/safety-audit-prep",     permanent: true },
      { source: "/standards/safety-audit-prep-pack",    destination: "/products/safety-audit-prep",     permanent: true },
      { source: "/standards/starter-stack",             destination: "/products/starter-stack",         permanent: true },
      { source: "/standards/new-carrier-document-system", destination: "/products/new-carrier-document-system", permanent: true },
      { source: "/standards/16-deadly-sins",            destination: "/products/16-deadly-sins",        permanent: true },
      { source: "/standards/auto-method",               destination: "/compliance-library",             permanent: true },
      { source: "/16-deadly-sins",                      destination: "/products/16-deadly-sins",        permanent: true },
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

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  widenClientFileUpload: true,
});
