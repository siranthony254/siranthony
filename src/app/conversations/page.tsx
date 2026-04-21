import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, SectionHeader, CategoryBadge, GoldLine } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity'
import { ALL_POSTS_QUERY } from '@/lib/queries'
import { formatDate, CATEGORY_LABELS } from '@/lib/utils'
import type { Post } from '@/types'

export const metadata: Metadata = {
  title: 'Conversations',
  description:
    'Cultural observations, examined perspectives, and the questions worth asking — from Sir Anthony, cultural thinker and conversationalist.',
}

const CATEGORIES = ['all', 'culture', 'individual', 'leadership', 'education', 'ideas', 'family', 'political']

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const posts = await sanityFetch<Post[]>(ALL_POSTS_QUERY)
  const active = searchParams.category || 'all'

  const filtered = active === 'all'
    ? posts
    : posts.filter(p => p.category === active)

  return (
    <>
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 65%)' }} />
        <div className="container-site relative z-10">
          <AnimatedSection>
            <p className="eyebrow mb-5">Conversations</p>
            <GoldLine className="mb-7" />
            <h1
              className="font-display font-semibold text-cream mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              The questions
              <br />
              <em className="text-gold">nobody is asking.</em>
            </h1>
            <p className="font-body text-cream/55 text-lg leading-relaxed max-w-xl">
              Cultural observations and examined perspectives on culture, identity,
              leadership, and the ideas quietly shaping how we live.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 z-30 bg-navy/95 backdrop-blur-md border-b border-gold/10">
        <div className="container-site py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={cat === 'all' ? '/conversations' : `/conversations?category=${cat}`}
                className={`px-4 py-1.5 rounded-full font-body text-xs uppercase tracking-wider border transition-all duration-200 ${
                  active === cat
                    ? 'bg-gold text-navy border-gold font-medium'
                    : 'text-cream/50 border-gold/15 hover:border-gold/35 hover:text-cream/80'
                }`}
              >
                {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <section className="section-pad bg-navy/95">
        <div className="container-site">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-cream/30 italic">
                No conversations in this category yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <AnimatedSection key={post._id} delay={i * 60}>
                  <Link href={`/conversations/${post.slug.current}`} className="group block h-full">
                    <div className="card-navy overflow-hidden h-full flex flex-col">
                      {post.mainImage?.asset?.url && (
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                          <Image
                            src={post.mainImage.asset.url}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <CategoryBadge category={post.category} />
                          <span className="font-body text-xs text-cream/30">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        <h2 className="font-display text-xl font-semibold text-cream group-hover:text-gold transition-colors duration-300 mb-3 leading-snug flex-1">
                          {post.title}
                        </h2>
                        <p className="font-body text-sm text-cream/50 leading-relaxed line-clamp-2 mb-5">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                          <span className="inline-flex items-center gap-2 text-gold text-xs font-body group-hover:gap-3 transition-all duration-200">
                            Read <ArrowRight size={12} />
                          </span>
                          {post.estimatedReadingTime && (
                            <span className="font-body text-xs text-cream/25">
                              {post.estimatedReadingTime} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
