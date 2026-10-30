import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Download } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine, CategoryBadge } from '@/components/ui'
// HIDDEN: Measurements — import { ImpactNumbersSection } from '@/components/sections/ImpactNumbers'
import { Ventures } from '@/components/sections/Ventures'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'
import { EBOOKS_QUERY, INTELLECTUAL_WORK_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import type { Ebook, IntellectualWork, SiteSettings, Post } from '@/types'

export const metadata: Metadata = {
  title: 'Body of Work',
  description:
    'Essays, conversations and ventures by Sir Anthony: conversationalist, cultural thinker and founder of REALWINNERS DIGITAL.',
}

export const revalidate = 60

// The page in reading order. Sections only appear in this index when they have content.
type Anchor = { id: string; label: string }

export default async function PortfolioPage() {
  const data = await sanityFetch<{
    posts: Post[]
    postCount: number
    ebooks: Ebook[]
    intellectualWork: IntellectualWork[]
    siteSettings: SiteSettings
  }>(`{
    "posts": *[_type == "post"] | order(publishedAt desc)[0...3] {
      _id, title, slug, excerpt, publishedAt, category,
      mainImage { asset->{ _id, url }, alt }
    },
    "postCount": count(*[_type == "post"]),
    "ebooks": ${EBOOKS_QUERY},
    "intellectualWork": ${INTELLECTUAL_WORK_QUERY},
    "siteSettings": ${SITE_SETTINGS_QUERY}
  }`)

  const posts = data?.posts || []
  const postCount = data?.postCount || 0
  const ebooks = data?.ebooks || []
  const intellectualWork = data?.intellectualWork || []
  const socials = Object.entries(data?.siteSettings?.socialLinks ?? {}).filter(([, url]) => !!url) as [string, string][]
  const hasLongerPieces = ebooks.length > 0 || intellectualWork.length > 0

  // HIDDEN: Measurements — the impact numbers section ("The work, measured.") is hidden on this page.
  // To restore it: uncomment the import above, add `"impactNumbers": ${IMPACT_NUMBERS_QUERY}` to the
  // query, and render <ImpactNumbersSection data={withoutHiddenMicdupStats(data?.impactNumbers)} /> below.

  const anchors: Anchor[] = [
    { id: 'writing', label: 'Writing' },
    { id: 'founder', label: 'Founder' },
    ...(hasLongerPieces ? [{ id: 'longer', label: 'Longer pieces' }] : []),
    { id: 'connect', label: 'Connect' },
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy pt-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        />

        <div className="container-site pb-20 relative z-10">
          <div className="max-w-4xl">
            <AnimatedSection>
              <p className="eyebrow mb-5">Body of Work</p>
              <GoldLine className="mb-7" />
              <h1
                className="font-display font-semibold text-cream leading-tight mb-6"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                The talk,
                <br />
                <em className="text-gold">in action.</em>
              </h1>
              <p className="font-body text-cream/55 text-xl leading-relaxed max-w-2xl mb-8">
                Writing, conversations and the work they lead to. Each piece looks at the same question from a
                different angle. How is culture actually built? And how could we build it better, on purpose?
              </p>

              {/* Roles */}
              <ul className="flex flex-wrap gap-2 mb-10">
                {['Conversationalist', 'Cultural thinker', 'Writer'].map((role) => (
                  <li key={role} className="font-body text-xs text-cream/60 border border-gold/20 rounded-full px-3 py-1">
                    {role}
                  </li>
                ))}
                <li>
                  <a
                    href="https://realwinners.co.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-xs text-gold border border-gold/50 rounded-full px-3 py-1 hover:bg-gold/10 transition-colors"
                  >
                    Founder, REALWINNERS DIGITAL <ExternalLink size={11} />
                  </a>
                </li>
              </ul>

              {/* On this page */}
              <nav aria-label="On this page" className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gold/10 pt-6">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-cream/35">On this page</span>
                {anchors.map((a) => (
                  <a key={a.id} href={`#${a.id}`} className="font-body text-sm text-cream/70 hover:text-gold transition-colors">
                    {a.label}
                  </a>
                ))}
              </nav>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* HIDDEN: Measurements — <ImpactNumbersSection data={impactNumbers} /> */}

      {/* ── Writing: the latest conversations ───────────────────── */}
      <section id="writing" className="section-pad bg-navy border-t border-gold/10 scroll-mt-24">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <SectionHeader
              eyebrow="Writing"
              title="The Thinking"
              subtitle="Essays and conversations on culture, identity and deliberate change. These are the newest."
            />
            <AnimatedSection delay={150}>
              <Link href="/conversations" className="btn-ghost whitespace-nowrap self-start">
                All conversations{postCount > 0 ? ` (${postCount})` : ''} <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <AnimatedSection key={post._id} delay={i * 90}>
                  <Link href={`/conversations/${post.slug.current}`} className="group block h-full">
                    <article className="card-navy overflow-hidden h-full flex flex-col">
                      {post.mainImage?.asset?.url && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={urlFor(post.mainImage).width(900).auto('format').url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={70}
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          {post.category && <CategoryBadge category={post.category} />}
                          <span className="font-body text-xs text-cream/35">{formatDate(post.publishedAt)}</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold transition-colors mb-3 leading-snug">
                          {post.title}
                        </h3>
                        <p className="font-body text-sm text-cream/55 leading-relaxed line-clamp-3 mb-5 flex-1">{post.excerpt}</p>
                        <span className="inline-flex items-center gap-2 text-gold text-sm font-body group-hover:gap-3 transition-all">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="card-navy p-8 text-center">
              <p className="text-cream/60">New conversations are on the way.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Founder: REALWINNERS DIGITAL ────────────────────────── */}
      <Ventures
        id="founder"
        eyebrow="Founder"
        title="Founder of REALWINNERS DIGITAL"
        subtitle="Ideas need somewhere to live. I founded a studio that builds the conversations brands have online, on purpose."
      />

      {/* ── Longer pieces: essays, scripts, poetry and ebooks (only when there are any) ── */}
      {hasLongerPieces && (
        <section id="longer" className="section-pad bg-navy scroll-mt-24">
          <div className="container-site">
            <SectionHeader
              eyebrow="Longer pieces"
              title="Essays, scripts & books"
              subtitle="Work that needs more room than a conversation. Read the opening of any book for free."
              className="mb-14"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ebooks.map((ebook, index) => (
                <AnimatedSection key={ebook._id} delay={index * 90}>
                  <Link href={`/portfolio/${ebook.slug.current}`} className="group block h-full">
                    <article className="card-navy overflow-hidden h-full flex flex-col">
                      {ebook.coverImage?.asset?.url && (
                        <div className="relative aspect-[3/2] overflow-hidden">
                          <Image
                            src={urlFor(ebook.coverImage).width(900).auto('format').url()}
                            alt={ebook.coverImage.alt || ebook.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            quality={70}
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <span className="font-body text-xs text-gold mb-2">Book</span>
                        <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold transition-colors mb-2 leading-snug">
                          {ebook.title}
                        </h3>
                        {ebook.subtitle && <p className="font-display italic text-gold/70 text-sm mb-3">{ebook.subtitle}</p>}
                        <p className="font-body text-sm text-cream/50 leading-relaxed line-clamp-3 mb-5 flex-1">{ebook.description}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                          <span className="font-display text-lg font-semibold text-gold">
                            {ebook.forSale === false ? 'Coming soon' : `KES ${ebook.priceKes?.toLocaleString?.() ?? ebook.priceKes}`}
                          </span>
                          <span className="inline-flex items-center gap-2 text-gold text-xs font-body group-hover:gap-3 transition-all">
                            Read the opening <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}

              {intellectualWork.map((work, index) => (
                <AnimatedSection key={work._id} delay={(ebooks.length + index) * 90}>
                  <article className="card-navy overflow-hidden h-full flex flex-col group">
                    {work.thumbnail?.asset?.url && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={urlFor(work.thumbnail).width(1000).auto('format').url()}
                          alt={work.thumbnail.alt || work.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          quality={70}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="font-body text-xs text-gold mb-2">{work.customCategory || work.category}</span>
                      <h3 className="font-display text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                        {work.title}
                      </h3>
                      <p className="font-body text-cream/60 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{work.description}</p>
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gold/10">
                        <span className="text-xs font-body text-cream/40">
                          {work.publishedDate ? formatDate(work.publishedDate) : ''}
                        </span>
                        <div className="flex gap-3">
                          {work.externalUrl && (
                            <a href={work.externalUrl} target="_blank" rel="noopener noreferrer" className="text-gold text-sm inline-flex items-center gap-1.5">
                              Read <ExternalLink size={13} />
                            </a>
                          )}
                          {work.document?.asset?.url && (
                            <a href={work.document.asset.url} target="_blank" rel="noopener noreferrer" className="text-gold text-sm inline-flex items-center gap-1.5" aria-label={`Download ${work.title}`}>
                              <Download size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Connect ─────────────────────────────────────────────── */}
      <section id="connect" className="section-pad bg-navy border-t border-gold/10 scroll-mt-24">
        <div className="container-site text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Connect"
              title="Let's continue the conversation"
              subtitle="Bring the conversation to your organisation, share a thought, or just read along."
              centered
              className="mb-10"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact" className="btn-gold">
                Book Sir Anthony <ArrowRight size={14} />
              </Link>
              <Link href="/conversations" className="btn-ghost">
                Read the conversations
              </Link>
            </div>
            {socials.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {socials.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm capitalize text-cream/60 hover:text-gold transition-colors"
                  >
                    {name}
                  </a>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
