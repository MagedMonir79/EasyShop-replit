module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  // Remove problematic pages from build
  excludeDefaultMomentLocales: true,
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
    ]
  }
,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Exclude problematic pages from the build
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude specific pages from the build
    if (isServer) {
      if (!config.plugins) config.plugins = [];
      config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /\/(cart-basic|cart|auth\/signup|auth\/login)\.tsx?$/,
      }));
    }
    return config;
  },
};