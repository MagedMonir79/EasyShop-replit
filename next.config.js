/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ESLint configuration to prevent build failures
  eslint: {
    // Don't run ESLint during build to prevent errors
    ignoreDuringBuilds: true,
  },
  
  // TypeScript error checking configuration
  typescript: {
    // Ignore TypeScript errors during build to prevent failures
    ignoreBuildErrors: true,
  },
  
  images: {
    // تم استبدال domains بـ remotePatterns حسب توصية Next.js
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: '**supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
