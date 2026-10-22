import { NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.online'

export const revalidate = 3600

interface FeedPost {
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  category?: string
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = await sanityFetch<FeedPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...50] {
      title, slug, excerpt, publishedAt, category
    }`
  ).catch(() => [] as FeedPost[])

  const items = (posts || [])
    .map(post => {
      const url = `${SITE_URL}/conversations/${post.slug.current}`
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : ''
      return `    <item>
      <title>${escapeXml(post.title || '')}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ''}
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Conversations — Sir Anthony</title>
    <link>${SITE_URL}/conversations</link>
    <description>Talks, essays, and the questions I keep coming back to — on culture, identity, leadership, and the things we call normal without checking.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/conversations/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
