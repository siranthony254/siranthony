import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.com'

export function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml`

  return new NextResponse(robots, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
