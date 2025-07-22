/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // SOC 2 Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), bluetooth=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://static.hotjar.com https://script.hotjar.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://*.hotjar.com https://api.vercel.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'"
            ].join('; ')
          }
        ]
      }
    ];
  },

  // Environment variable validation
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_VERSION: process.env.npm_package_version || '1.0.0'
  },

  // Disable server-side includes for security
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse']
  },

  // Webpack configuration for security
  webpack: (config, { dev, isServer }) => {
    // Production security optimizations
    if (!dev) {
      config.optimization.minimize = true;
      
      // Remove source maps in production for security
      config.devtool = false;
    }

    return config;
  },

  // Redirect configuration for security
  async redirects() {
    return [
      // Redirect HTTP to HTTPS in production
      ...(process.env.NODE_ENV === 'production' ? [
        {
          source: '/:path*',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http'
            }
          ],
          destination: 'https://trusto.inc/:path*',
          permanent: true
        }
      ] : [])
    ];
  }
};

module.exports = nextConfig;