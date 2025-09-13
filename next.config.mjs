/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow cross-origin requests from Cloudflare tunnel
  allowedDevOrigins: ["junevergelquerol.com", "www.junevergelquerol.com"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.basehub.com",
      },
    ],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Headers for better caching and performance + Cloudflare bypass
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Cloudflare bypass headers
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'CF-Cache-Status',
            value: 'DYNAMIC'
          }
        ]
      },
      // Specific rules for CSS and JS files
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Content-Type',
            value: 'text/css'
          },
          // Tell Cloudflare not to modify CSS
          {
            key: 'CF-Edge-Cache',
            value: 'no-transform'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          // Bypass Cloudflare Rocket Loader for Next.js chunks
          {
            key: 'CF-Rocket-Loader',
            value: 'off'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
