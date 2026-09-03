/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['heyama-dev.s3.amazonaws.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
