import { NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.com'

const STATIC_PAGES = [
  { url: '/',              priority: '1.0', changefreq: 'weekly'  },
  { url: '/about',         priority: '0.9', changefreq: 'monthly' },
  { url: '/conversations', priority: '0.9', changefreq: 'daily'   },
  { url: '/work',          priority: '0.8', changefreq: 'monthly' },
  { url: '/micdup',        priority: '0.8', changefreq: 'weekly'  },
  { url: '/contact',       priority: '0.7', changefreq: 'monthly' },
]

export async function GET() {
  const posts = await sanityFetch<Array<{ slug: { current: string }; publishedAt: string }>>(
    `*[_type == "post"] { slug, publishedAt }`
  )

  const postEntries = posts.map(p => ({
    url:        `/conversations/${p.slug.current}`,
    priority:   '0.7',
    changefreq: 'monthly',
    lastmod:    p.publishedAt,
  }))

  const allPages = [...STATIC_PAGES, ...postEntries]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${'lastmod' in page && page.lastmod ? `<lastmod>${new Date(page.lastmod as string).toISOString().split('T')[0]}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
}
