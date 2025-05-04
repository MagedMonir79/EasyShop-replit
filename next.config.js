module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
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
