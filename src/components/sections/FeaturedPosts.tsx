import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, SectionHeader, CategoryBadge } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'

interface FeaturedPostsProps { posts: Post[] }

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [main, ...rest] = posts || []

  return (
    <section className="section-pad bg-navy/95 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionHeader
            eyebrow="Conversations"
            title="Latest Thinking"
            subtitle="Cultural observations, examined perspectives, and the questions worth asking."
          />
          <AnimatedSection delay={200}>
            <Link
              href="/conversations"
              className="btn-ghost whitespace-nowrap self-start"
            >
              All Conversations <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts && posts.length > 0 ? (
            posts.map((post, i) => (
              <AnimatedSection key={post._id} delay={100 + i * 50}>
                <Link href={`/conversations/${post.slug.current}`} className="group block">
                  <div className="card-navy overflow-hidden h-full">
                    {post.mainImage?.asset?.url && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.mainImage.asset.url}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CategoryBadge category={post.category} />
                        <span className="font-body text-xs text-cream/35">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-cream group-hover:text-gold transition-colors duration-300 mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <p className="font-body text-cream/55 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold text-sm font-body font-medium group-hover:gap-3 transition-all duration-200">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))
          ) : (
            <AnimatedSection className="md:col-span-2">
              <div className="card-navy p-8 text-center">
                <p className="text-cream/60 mb-4">No featured conversations yet.</p>
                <Link href="/conversations" className="btn-ghost">
                  View All Conversations <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  )
}
