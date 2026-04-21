import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, SectionHeader, CategoryBadge } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'

interface FeaturedPostsProps { posts: Post[] }

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts?.length) return null

  const [main, ...rest] = posts

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main featured */}
          {main && (
            <AnimatedSection className="lg:col-span-3">
              <Link href={`/conversations/${main.slug.current}`} className="group block">
                <div className="card-navy overflow-hidden h-full">
                  {main.mainImage?.asset?.url && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={main.mainImage.asset.url}
                        alt={main.mainImage.alt || main.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <CategoryBadge category={main.category} />
                      <span className="font-body text-xs text-cream/35">
                        {formatDate(main.publishedAt)}
                      </span>
                      {main.estimatedReadingTime && (
                        <span className="font-body text-xs text-cream/35">
                          {main.estimatedReadingTime} min read
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream group-hover:text-gold transition-colors duration-300 mb-4 leading-tight">
                      {main.title}
                    </h3>
                    <p className="font-body text-cream/55 leading-relaxed line-clamp-3 mb-5">
                      {main.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-body font-medium group-hover:gap-3 transition-all duration-200">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* Side posts */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((post, i) => (
              <AnimatedSection key={post._id} delay={150 + i * 100}>
                <Link href={`/conversations/${post.slug.current}`} className="group block">
                  <div className="card-navy p-6 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryBadge category={post.category} />
                      <span className="font-body text-xs text-cream/30">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-cream/50 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold/70 text-xs font-body mt-4 group-hover:text-gold group-hover:gap-3 transition-all duration-200">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
