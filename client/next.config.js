/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: 'src',
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
