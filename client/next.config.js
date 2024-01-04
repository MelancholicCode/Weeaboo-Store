/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [
      'shared',
      'assets',
      'utils',
      'api',
      'assets',
      'constants',
      'services',
      'store',
      'api',
      'fonts',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
