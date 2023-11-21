/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.swell.store',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'cdn.swell.test',
        pathname: '**',
      },
    ],
  },
  // Strict causes double render in dev mode
  reactStrictMode: false,
};

module.exports = nextConfig;
