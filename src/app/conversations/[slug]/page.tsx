import type { Metadata } from 'next'
import { notFound }   from 'next/navigation'
import Image          from 'next/image'
import Link           from 'next/link'
import { ArrowLeft }  from 'lucide-react'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { POST_BY_SLUG_QUERY } from '@/lib/queries'
import { formatDate }  from '@/lib/utils'
import { CategoryBadge, AnimatedSection, ShareButton } from '@/components/ui'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'
import type { Post } from '@/types'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch<Post>(POST_BY_SLUG_QUERY, { slug: params.slug })
  if (!post) return { title: 'Not Found' }
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.seo?.ogImage?.asset?.url
        ? [post.seo.ogImage.asset.url]
        : post.mainImage?.asset?.url
        ? [post.mainImage.asset.url]
        : [],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const post = await sanityFetch<Post>(POST_BY_SLUG_QUERY, { slug: params.slug })
  if (!post) notFound()

  return (
    <>
      {/* Back link */}
      <div className="pt-28 pb-4 bg-navy">
        <div className="container-site">
          <Link
            href="/conversations"
            className="inline-flex items-center gap-2 font-body text-xs text-cream/40 hover:text-gold transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={12} /> All Conversations
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-navy pb-0 pt-8">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <CategoryBadge category={post.category} />
              <span className="font-body text-xs text-cream/35">{formatDate(post.publishedAt)}</span>
              {post.estimatedReadingTime && (
                <span className="font-body text-xs text-cream/35">
                  {post.estimatedReadingTime} min read
                </span>
              )}
            </div>
            <h1
              className="font-display font-semibold text-cream leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {post.title}
            </h1>
            <p className="font-body text-cream/55 text-xl leading-relaxed mb-8 max-w-2xl">
              {post.excerpt}
            </p>
            <div className="w-10 h-px bg-gradient-to-r from-gold to-transparent mb-10" />
          </AnimatedSection>
        </div>

        {/* Feature image */}
        {post.mainImage?.asset?.url && (
          <div className="container-site max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
            <AnimatedSection delay={100}>
              <div className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(1400).auto('format').url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    sizes="100vw"
                    quality={75}
                    className="object-cover"
                    priority
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        )}
      </section>

      {/* Body */}
      <section className="section-pad bg-navy/95">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Gold border container for content */}
          <div className="border-l-2 border-r-2 border-gold/30 px-6 md:px-12 py-8">
            <div className="max-w-[87.5%] mx-auto">
            <AnimatedSection>
              {post.body ? (
                <div className="prose-navy">
                  <PortableTextRenderer value={post.body} />
                </div>
              ) : (
                <p className="font-body text-cream/40 italic">Content coming soon.</p>
              )}
            </AnimatedSection>

            {/* Author card and Share button row */}
            <AnimatedSection delay={200} className="mt-16 pt-10 border-t border-gold/10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Author card */}
                {post.author && (
                  <div className="flex items-start gap-5">
                    {post.author.image?.asset?.url && (
                      <Image
                        src={urlFor(post.author.image).width(112).auto('format').url()}
                        alt={post.author.name}
                        width={56}
                        height={56}
                        quality={70}
                        className="rounded-full flex-shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-body text-xs text-gold uppercase tracking-widest mb-1">Written by</p>
                      <p className="font-display text-lg font-semibold text-cream">{post.author.name}</p>
                      {post.author.bio && (
                        <p className="font-body text-sm text-cream/50 mt-1 leading-relaxed">{post.author.bio}</p>
                      )}
                    </div>
                  </div>
                )}
                {/* Share button - opposite the author */}
                <div className="flex-shrink-0">
                  <ShareButton post={post} baseUrl={process.env.NEXT_PUBLIC_SITE_URL || ''} />
                </div>
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={300} className="mt-16 card-navy p-8 text-center">
              <p className="font-display italic text-gold text-lg mb-4">
                &ldquo;The person who understands how culture is made is the person who can help shape it.&rdquo;
              </p>
              <p className="font-body text-xs text-cream/40 uppercase tracking-widest mb-6">
                — Sir Anthony
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/conversations" className="btn-ghost text-xs">
                  More Conversations
                </Link>
                <Link href="/work" className="btn-gold text-xs">
                  Work With Sir Anthony
                </Link>
              </div>
            </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}