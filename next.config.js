/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'localhost', '127.0.0.1'],
    // Add your Supabase storage domain for avatar images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
