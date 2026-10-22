/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    taint: true,
  },

  async redirects() {
    return [
      // Website and digital services moved to REALWINNERS DIGITAL. The old /work page is
      // indexed, so a permanent redirect passes its search value and old links to the studio.
      { source: '/work', destination: 'https://realwinners.co.ke/services', permanent: true },
      { source: '/work/:path*', destination: 'https://realwinners.co.ke/services', permanent: true },
    ]
  },

  async rewrites() {
    // robots.txt points crawlers at /sitemap.xml; the sitemap is generated at /api/sitemap.
    return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
  },
}

export default nextConfig