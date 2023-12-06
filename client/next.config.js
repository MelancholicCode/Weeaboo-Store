/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['shared', 'assets', 'utils'],
  },
  env: {
    API_URL: 'http://localhost:5000/api'
  }
};

module.exports = nextConfig;
