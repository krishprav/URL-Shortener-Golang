import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },

  // Image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },

  // Compression
  compress: true,

  // Powered by header
  poweredByHeader: false,

  // Webpack configuration
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};


export default nextConfig;