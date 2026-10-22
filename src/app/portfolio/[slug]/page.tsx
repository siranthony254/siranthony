import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, FileText, Lock } from 'lucide-react'
import { AnimatedSection } from '@/components/ui'
import { ShareBlogLinks } from '@/components/ui/ShareBlogLinks'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'
import { EbookCheckout } from '@/components/sections/EbookCheckout'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { EBOOK_BY_SLUG_QUERY, EBOOK_SLUGS_QUERY } from '@/lib/queries'
import type { Ebook } from '@/types'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.online').replace(/\/$/, '')

interface Props {
  params: { slug: string }
}

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(EBOOK_SLUGS_QUERY).catch(() => [] as string[])
  return (slugs || []).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ebook = await sanityFetch<Ebook | null>(EBOOK_BY_SLUG_QUERY, { slug: params.slug })
  if (!ebook) return { title: 'Not found' }

  const url = `${SITE_URL}/portfolio/${params.slug}`
  // Absolute, correctly sized image — WhatsApp, X and LinkedIn all need this
  // spelled out or they fall back to showing nothing.
  const image = ebook.coverImage?.asset?.url
    ? urlFor(ebook.coverImage).width(1200).height(630).fit('crop').auto('format').url()
    : `${SITE_URL}/og-image.jpg`

  const title = ebook.subtitle ? `${ebook.title} — ${ebook.subtitle}` : ebook.title

  return {
    title: ebook.title,
    description: ebook.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description: ebook.description,
      siteName: 'Sir Anthony',
      images: [{ url: image, width: 1200, height: 630, alt: ebook.coverImage?.alt || ebook.title, type: 'image/jpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ebook.description,
      images: [image],
    },
  }
}

export default async function EbookPage({ params }: Props) {
  const ebook = await sanityFetch<Ebook | null>(EBOOK_BY_SLUG_QUERY, { slug: params.slug })
  if (!ebook) notFound()

  const url = `${SITE_URL}/portfolio/${params.slug}`
  const hasPreview = Array.isArray(ebook.preview) && ebook.preview.length > 0

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-navy">
        <div className="container-site">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-body text-xs text-cream/35 flex-wrap">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <ChevronRight size={12} className="text-gold/25" />
              <li>
                <Link href="/portfolio" className="hover:text-gold transition-colors">
                  Body of Work
                </Link>
              </li>
              <ChevronRight size={12} className="text-gold/25" />
              <li className="text-cream/55">{ebook.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Head */}
      <section className="bg-navy pb-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* Cover */}
            <AnimatedSection className="lg:col-span-4">
              {ebook.coverImage?.asset?.url && (
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gold/15">
                  <Image
                    src={urlFor(ebook.coverImage).width(900).auto('format').url()}
                    alt={ebook.coverImage.alt || ebook.title}
                    fill
                    sizes="(max-width: 1024px) 80vw, 33vw"
                    quality={80}
                    priority
                    className="object-cover"
                  />
                </div>
              )}
            </AnimatedSection>

            {/* Detail */}
            <AnimatedSection delay={100} className="lg:col-span-8">
              <h1
                className="font-display font-semibold text-cream leading-tight mb-3"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
              >
                {ebook.title}
              </h1>
              {ebook.subtitle && (
                <p className="font-display italic text-gold text-xl mb-6">{ebook.subtitle}</p>
              )}

              <p className="font-body text-cream/65 text-lg leading-relaxed mb-6 max-w-2xl">
                {ebook.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 font-body text-xs text-cream/35 mb-8">
                <span className="inline-flex items-center gap-1.5">
                  <FileText size={13} className="text-gold/50" /> PDF
                </span>
                {ebook.pageCount ? (
                  <>
                    <span className="text-gold/25">·</span>
                    <span>{ebook.pageCount} pages</span>
                  </>
                ) : null}
                {ebook.publishedDate ? (
                  <>
                    <span className="text-gold/25">·</span>
                    <span>{new Date(ebook.publishedDate).getFullYear()}</span>
                  </>
                ) : null}
              </div>

              {/* Contents */}
              {ebook.contents && ebook.contents.length > 0 && (
                <div className="mb-8">
                  <p className="font-body text-xs text-gold uppercase tracking-widest mb-3">
                    What is inside
                  </p>
                  <ul className="space-y-1.5 max-w-xl">
                    {ebook.contents.map(item => (
                      <li
                        key={item}
                        className="font-body text-sm text-cream/55 leading-relaxed border-l border-gold/15 pl-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="font-body text-xs text-cream/35 mb-3">Share this</p>
                <ShareBlogLinks url={url} title={ebook.title} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Preview + checkout */}
      <section className="section-pad bg-navy/95 border-t border-gold/10">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* Free preview */}
            <div className="lg:col-span-7">
              <p className="font-body text-xs text-gold uppercase tracking-widest mb-1">
                Read the opening
              </p>
              <div className="w-6 h-px bg-gold/40 mb-7" />

              {hasPreview ? (
                <>
                  <div className="prose-navy">
                    <PortableTextRenderer value={ebook.preview as never} />
                  </div>

                  {/* Where the free part stops */}
                  <div className="relative mt-10 pt-10 border-t border-gold/15">
                    <div
                      className="absolute inset-x-0 -top-24 h-24 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(13,27,42,0.95))',
                      }}
                    />
                    <div className="flex items-start gap-3">
                      <Lock size={15} className="text-gold/50 mt-1 flex-shrink-0" />
                      <p className="font-body text-cream/50 leading-relaxed">
                        That is where the free part stops. The rest — {ebook.pageCount ? `all ${ebook.pageCount} pages` : 'the full piece'} — comes as
                        a PDF with your name on it.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="font-body text-cream/40 italic">
                  The preview is coming shortly.
                </p>
              )}
            </div>

            {/* Buy */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <EbookCheckout
                slug={params.slug}
                title={ebook.title}
                priceKes={ebook.priceKes}
                forSale={ebook.forSale !== false}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
