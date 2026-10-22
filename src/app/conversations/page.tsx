import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { AnimatedSection, SectionHeader } from '@/components/ui'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { ALL_POSTS_QUERY, FAQ_QUERY, VIDEO_CONVERSATIONS_QUERY } from '@/lib/queries'
import { formatDate, CATEGORY_LABELS, isHiddenMicdup } from '@/lib/utils'
import { FaqAccordion } from '@/components/sections/FaqAccordion'
import { VideoConversations } from '@/components/sections/VideoConversations'
import { PostsExplorer, type PostCardData } from '@/components/sections/PostsExplorer'
import { BlogSidebar, type SidebarSection } from '@/components/sections/BlogSidebar'
import type { Post, Faq, VideoConversation } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.online'

export const metadata: Metadata = {
  title: 'Conversations',
  description:
    'Talks, essays, and the questions I keep coming back to — on culture, identity, leadership, and the things we call normal without checking.',
  alternates: {
    canonical: `${SITE_URL}/conversations`,
    types: { 'application/rss+xml': `${SITE_URL}/conversations/rss.xml` },
  },
}

const CATEGORY_ORDER = [
  'culture',
  'individual',
  'leadership',
  'education',
  'ideas',
  'family',
  'political',
]

// Server-side so the Sanity image builder never enters the client bundle.
function toCardData(post: Post): PostCardData {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt || '',
    category: post.category,
    dateLabel: formatDate(post.publishedAt),
    readingTime: post.estimatedReadingTime,
    imageUrl: post.mainImage?.asset?.url
      ? urlFor(post.mainImage).width(1200).auto('format').url()
      : undefined,
    blurUrl: post.mainImage?.asset?.url
      ? urlFor(post.mainImage).width(20).auto('format').url()
      : undefined,
    authorName: post.author?.name,
    featured: post.featured,
  }
}

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const CONVERSATIONS_COMBINED_QUERY = `{
    "posts": ${ALL_POSTS_QUERY},
    "faqs": ${FAQ_QUERY},
    "videos": ${VIDEO_CONVERSATIONS_QUERY}
  }`

  const data = await sanityFetch<{
    posts: Post[]
    faqs: Faq[]
    videos: VideoConversation[]
  }>(CONVERSATIONS_COMBINED_QUERY)

  const posts = data?.posts || []
  // HIDDEN: Mic'd Up — FAQs about Mic'd Up Initiative are filtered out while it is hidden.
  const faqs = (data?.faqs || []).filter(f => !isHiddenMicdup(f.question, f.answer))
  const videos = data?.videos || []

  const requested = searchParams.category
  const active = requested && CATEGORY_ORDER.includes(requested) ? requested : 'all'

  const filteredPosts = active === 'all' ? posts : posts.filter(p => p.category === active)
  const filteredVideos = active === 'all' ? videos : videos.filter(v => v.category === active)
  const filteredFaqs = active === 'all' ? faqs : faqs.filter(f => f.category === active)

  // Sections, with counts. Empty ones are left out rather than shown at zero.
  const sections: SidebarSection[] = CATEGORY_ORDER.map(key => ({
    key,
    label: CATEGORY_LABELS[key] || key,
    count: posts.filter(p => p.category === key).length,
  })).filter(s => s.count > 0)

  const cards = filteredPosts.map(toCardData)
  const lead = cards.find(c => c.featured) || cards[0]

  const recent = posts.slice(0, 5).map(p => ({
    id: p._id,
    title: p.title,
    slug: p.slug.current,
    dateLabel: formatDate(p.publishedAt),
  }))

  const activeLabel = active === 'all' ? null : CATEGORY_LABELS[active] || active

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 bg-navy">
        <div className="container-site">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-xs text-cream/35">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight size={12} className="text-gold/25" />
              <li>
                {activeLabel ? (
                  <Link href="/conversations" className="hover:text-gold transition-colors">
                    Conversations
                  </Link>
                ) : (
                  <span className="text-cream/55">Conversations</span>
                )}
              </li>
              {activeLabel && (
                <>
                  <ChevronRight size={12} className="text-gold/25" />
                  <li className="text-cream/55">{activeLabel}</li>
                </>
              )}
            </ol>
          </nav>

          <AnimatedSection direction="in">
            <div className="max-w-2xl">
              <h1 className="font-display font-semibold text-cream text-3xl md:text-4xl mb-4 leading-tight">
                {activeLabel ? (
                  <>
                    Conversations on <em className="text-gold">{activeLabel.toLowerCase()}.</em>
                  </>
                ) : (
                  <>
                    The questions <em className="text-gold">nobody is asking.</em>
                  </>
                )}
              </h1>
              <p className="font-body text-cream/60 leading-relaxed">
                Everything I have said out loud and written down — on culture, identity,
                leadership, and the things we call normal without ever checking.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section chips — the mobile equivalent of the sidebar index */}
      <div className="lg:hidden sticky top-16 z-30 bg-navy/95 backdrop-blur-md border-y border-gold/10">
        <div className="container-site py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <Link
              href="/conversations"
              className={`px-4 py-1.5 rounded-full font-body text-xs uppercase tracking-wider border transition-all duration-200 ${
                active === 'all'
                  ? 'bg-gold text-navy border-gold font-medium'
                  : 'text-cream/50 border-gold/15 hover:border-gold/35 hover:text-cream/80'
              }`}
            >
              All
            </Link>
            {sections.map(section => (
              <Link
                key={section.key}
                href={`/conversations?category=${section.key}`}
                className={`px-4 py-1.5 rounded-full font-body text-xs uppercase tracking-wider border transition-all duration-200 ${
                  active === section.key
                    ? 'bg-gold text-navy border-gold font-medium'
                    : 'text-cream/50 border-gold/15 hover:border-gold/35 hover:text-cream/80'
                }`}
              >
                {section.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Posts + sidebar */}
      <section className="section-pad bg-navy/95">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
            <div className="lg:col-span-8">
              <PostsExplorer posts={cards} lead={lead} />
            </div>
            <div className="lg:col-span-4">
              <BlogSidebar
                sections={sections}
                recent={recent}
                active={active}
                total={posts.length}
                shareUrl={`${SITE_URL}/conversations`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video conversations */}
      <VideoConversations videos={filteredVideos} />

      {/* FAQ */}
      {filteredFaqs.length > 0 && (
        <section className="section-pad bg-navy border-t border-gold/10">
          <div className="container-site">
            <SectionHeader
              eyebrow="FAQ"
              title="Common Questions"
              subtitle={
                active === 'all'
                  ? 'The things people ask me most often, answered plainly.'
                  : `What people ask about ${activeLabel?.toLowerCase() || active}.`
              }
              centered
              className="mb-14"
            />
            <FaqAccordion faqs={filteredFaqs} />
          </div>
        </section>
      )}
    </>
  )
}
