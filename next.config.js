/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Use redirects for problematic pages
  async redirects() {
    return [
      {
        source: '/cart-basic',
        destination: '/',
        permanent: false,
      },
      {
        source: '/cart',
        destination: '/',
        permanent: false,
      },
      {
        source: '/auth/:path*',
        destination: '/',
        permanent: false,
      }
    ];
  },

  // Very simple config for better compatibility
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  distDir: '.next',
};

module.exports = nextConfig;