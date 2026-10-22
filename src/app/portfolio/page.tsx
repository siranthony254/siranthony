import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Download } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine, BlogCount } from '@/components/ui'
import { ImpactNumbersSection } from '@/components/sections/ImpactNumbers'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { withoutHiddenMicdupStats } from '@/lib/utils'
import {
  EBOOKS_QUERY,
  CASE_STUDIES_QUERY,
  INTELLECTUAL_WORK_QUERY,
  SITE_SETTINGS_QUERY,
  IMPACT_NUMBERS_QUERY,
} from '@/lib/queries'
import type { CaseStudy, Ebook, IntellectualWork, SiteSettings, ImpactNumbers } from '@/types'

export const metadata: Metadata = {
  title: 'Body of Work',
  description: 'Essays, scripts, poetry, and published conversations by Sir Anthony — conversationalist and cultural thinker.',
}

export const revalidate = 60

export default async function PortfolioPage() {
  const PORTFOLIO_COMBINED_QUERY = `{
    "ebooks": ${EBOOKS_QUERY},
    "caseStudies": ${CASE_STUDIES_QUERY},
    "intellectualWork": ${INTELLECTUAL_WORK_QUERY},
    "siteSettings": ${SITE_SETTINGS_QUERY},
    "blogCount": count(*[_type == "post"]),
    "impactNumbers": ${IMPACT_NUMBERS_QUERY}
  }`

  const data = await sanityFetch<{
    ebooks: Ebook[]
    caseStudies: CaseStudy[]
    intellectualWork: IntellectualWork[]
    siteSettings: SiteSettings
    blogCount: number
    impactNumbers: ImpactNumbers
  }>(PORTFOLIO_COMBINED_QUERY)

  const ebooks          = data?.ebooks || []
  const caseStudies     = data?.caseStudies || []
  const intellectualWork = data?.intellectualWork || []
  const siteSettings    = data?.siteSettings
  const blogCount       = data?.blogCount || 0
  // HIDDEN: Mic'd Up — withoutHiddenMicdupStats drops the Mic'd Up stat while it is hidden.
  const impactNumbers   = withoutHiddenMicdupStats(data?.impactNumbers)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy pt-32">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

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
              <p className="font-body text-cream/55 text-xl leading-relaxed max-w-2xl">
                Essays, scripts, poetry, and the conversations they came from. Each piece is a different
                facet of the same question — how culture is actually built, and how it might be built
                deliberately better.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <ImpactNumbersSection data={impactNumbers} />

      {/* Case Studies - Deactivated for now */}
      {/*
      <section className="section-pad bg-navy">
        <div className="container-site">
          <SectionHeader
            eyebrow="Case Studies"
            title="Deep Dives"
            subtitle="Comprehensive analysis of complex projects. From cultural thinking to technical execution, these studies show how ideas become reality."
            className="mb-14"
          />
          
          <div className="space-y-12">
            {caseStudies?.map((study, index) => (
              <AnimatedSection key={study._id} delay={index * 150}>
                <div className="card-navy overflow-hidden">
                  {study.heroImage?.asset?.url && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={urlFor(study.heroImage).width(1400).auto('format').url()}
                        alt={study.heroImage.alt || study.title}
                        fill
                        sizes="100vw"
                        quality={75}
                        placeholder="blur"
                        blurDataURL={urlFor(study.heroImage).width(20).auto('format').url()}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="font-display text-3xl font-semibold text-cream mb-2">
                          {study.title}
                        </h3>
                        <p className="font-body text-gold text-sm">{study.client}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Challenge</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Cultural Thinking</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.culturalThinking}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Execution</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.execution}</p>
                      </div>
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Outcome</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>

                    {study.additionalResources && study.additionalResources.length > 0 && (
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">Additional Resources</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {study.additionalResources.map((resource, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-navy/50 rounded-lg">
                              <div className="flex-1">
                                <h5 className="font-body text-cream font-medium text-sm mb-1">{resource.title}</h5>
                                <p className="font-body text-cream/60 text-xs mb-2">{resource.description}</p>
                                <Link
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gold text-xs hover:text-gold/80 transition-colors flex items-center gap-1"
                                >
                                  {resource.type === 'document' && <Download size={12} />}
                                  {resource.type === 'video' && <ExternalLink size={12} />}
                                  {resource.type === 'link' && <ExternalLink size={12} />}
                                  {resource.type === 'image' && <ExternalLink size={12} />}
                                  View Resource <ExternalLink size={12} />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {study.projectUrl && (
                      <div className="pt-4 border-t border-gold/20">
                        <Link
                          href={study.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold flex items-center gap-2"
                        >
                          View Live Project <ExternalLink size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {(!caseStudies || caseStudies.length === 0) && (
            <AnimatedSection className="text-center py-12">
              <p className="text-cream/60 text-lg">Case studies coming soon.</p>
            </AnimatedSection>
          )}
        </div>
      </section>
      */}

      {/* Ebooks — hidden entirely until there is one */}
      {ebooks.length > 0 && (
        <section className="section-pad bg-navy/95 border-t border-gold/10">
          <div className="container-site">
            <SectionHeader
              eyebrow="Ebooks"
              title="Longer pieces"
              subtitle="Read the opening for nothing. If you want the rest, it comes as a PDF with your name on it."
              className="mb-14"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold transition-colors mb-2 leading-snug">
                          {ebook.title}
                        </h3>
                        {ebook.subtitle && (
                          <p className="font-display italic text-gold/70 text-sm mb-3">
                            {ebook.subtitle}
                          </p>
                        )}
                        <p className="font-body text-sm text-cream/50 leading-relaxed line-clamp-3 mb-5 flex-1">
                          {ebook.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                          <span className="font-display text-lg font-semibold text-gold">
                            {ebook.forSale === false
                              ? 'Coming soon'
                              : `KES ${ebook.priceKes?.toLocaleString?.() ?? ebook.priceKes}`}
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
            </div>
          </div>
        </section>
      )}

      {/* Intellectual Work */}
      <section className="section-pad bg-navy">
        <div className="container-site">
          <SectionHeader
            eyebrow="Intellectual Work"
            title="The Thinking"
            subtitle="Essays, scripts, poetry, and books that explore culture, identity, and transformation. Each piece represents a different facet of the conversation."
            className="mb-14"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Conversations card fetching blog stats */}
            <AnimatedSection delay={0}>
              <div className="card-navy overflow-hidden h-full group flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden bg-gold/5 flex items-center justify-center border-b border-gold/10">
                    <span className="text-xs font-body text-gold bg-gold/10 px-2 py-1 rounded absolute top-4 left-4 z-10">
                      Category: Conversations
                    </span>
                    <svg className="w-16 h-16 text-gold/30 group-hover:scale-105 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                      Conversations
                    </h3>
                    <p className="font-body text-cream/60 text-sm leading-relaxed mb-4">
                      Thought-provoking articles, essays, and dialogues exploring culture, identity, and deliberate change.
                    </p>
                    <div className="mt-4 p-4 rounded-lg bg-navy/50 border border-gold/10 flex items-center justify-between">
                      <span className="text-xs font-body text-cream/45 uppercase tracking-wider">Blogs Published</span>
                      <BlogCount initialCount={blogCount} />
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/conversations"
                    className="btn-gold text-sm flex items-center gap-2 w-max"
                  >
                    Read Conversations <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {intellectualWork?.map((work, index) => (
              <AnimatedSection key={work._id} delay={(index + 1) * 100}>
                <div className="card-navy overflow-hidden h-full group">
                  {work.thumbnail?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(work.thumbnail).width(1000).auto('format').url()}
                        alt={work.thumbnail.alt || work.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={70}
                        placeholder="blur"
                        blurDataURL={urlFor(work.thumbnail).width(20).auto('format').url()}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-xs font-body text-gold bg-gold/10 px-2 py-1 rounded">
                          {work.customCategory || work.category}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                      {work.title}
                    </h3>
                    <p className="font-body text-cream/60 text-sm leading-relaxed mb-4 line-clamp-3">
                      {work.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-body text-cream/40">
                        {new Date(work.publishedDate).toLocaleDateString()}
                      </span>
                      {work.tags && work.tags.length > 0 && (
                        <div className="flex gap-1">
                          {work.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-xs font-body text-cream/30">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {work.externalUrl && (
                        <Link
                          href={work.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold text-sm flex items-center gap-2"
                        >
                          Read More <ExternalLink size={14} />
                        </Link>
                      )}
                      {work.document && (
                        <Link
                          href={work.document.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost text-sm flex items-center gap-2"
                        >
                          <Download size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="section-pad bg-navy">
        <div className="container-site text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Connect"
              title="Let's Continue the Conversation"
              subtitle="Follow the journey, share your thoughts, or reach out to collaborate on something meaningful."
              className="mb-12"
            />
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {siteSettings?.socialLinks?.twitter && (
                <Link
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  Twitter
                </Link>
              )}
              {siteSettings?.socialLinks?.linkedin && (
                <Link
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  LinkedIn
                </Link>
              )}
              {siteSettings?.socialLinks?.youtube && (
                <Link
                  href={siteSettings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  YouTube
                </Link>
              )}
              {siteSettings?.socialLinks?.instagram && (
                <Link
                  href={siteSettings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  Instagram
                </Link>
              )}
              {siteSettings?.socialLinks?.tiktok && (
                <Link
                  href={siteSettings.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  TikTok
                </Link>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

    </>
  )
}
