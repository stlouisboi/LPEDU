/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd ? { output: 'export' } : {}),
  reactStrictMode: false,
  allowedDevOrigins: [
    'your-numbers-calc.cluster-5.preview.emergentcf.cloud',
    '*.preview.emergentcf.cloud',
    '*.preview.emergentagent.com',
  ],
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  },
  images: {
    unoptimized: true,
  },
  experimental: {},
};

module.exports = nextConfig;
