import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.online'

export function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Disallow: /access/

Sitemap: ${SITE_URL}/sitemap.xml`

  return new NextResponse(robots, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
