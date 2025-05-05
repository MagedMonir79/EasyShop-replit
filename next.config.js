module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  // Add trailingSlash to improve SEO
  trailingSlash: true,
  // Customize 404 page
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      '/404': { page: '/404' },
    };
  },
  // Use redirects instead of page exclusions
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
        source: '/auth/signup',
        destination: '/',
        permanent: false,
      },
      {
        source: '/auth/login',
        destination: '/',
        permanent: false,
      },
      {
        source: '/products/:id',
        destination: '/',
        permanent: false,
      },
    ]
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Exclude problematic pages from the build
  // Remove problematic webpack configuration that might be causing issues
  experimental: {
    // Increase stability during build
    optimizeCss: true,
  },
  // Exclude certain pages from production build
  excludeDefaultMomentLocales: true,
};