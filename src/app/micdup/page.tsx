import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine, RippleCircles } from '@/components/ui'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { MICDUP_EVENTS_QUERY } from '@/lib/queries'
import { formatDateShort } from '@/lib/utils'
import type { MicdupEvent } from '@/types'

// This page is Sir Anthony's own account of the movement, in the first person.
// The Initiative's mission, programmes and partnership details live on micdupinitiative.site.
// HIDDEN: Mic'd Up — while hidden this page reports as "Page not found". To publish it, replace the
// metadata below with the commented original.
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}
// export const metadata: Metadata = {
//   title: "Mic'd Up Initiative",
//   description:
//     "Why Sir Anthony founded Mic'd Up Initiative: a campus movement shaping how Africa's youngest generation thinks, speaks and leads.",
// }

export const revalidate = 60

const MICDUP_URL = 'https://micdupinitiative.site'

const WHAT_IT_DOES = [
  { title: 'Discover', body: 'Finds the campus voices, perspectives and stories that deserve a platform.' },
  { title: 'Shape', body: 'Forms leaders of character, courage and genuine competence, not copies of the last generation.' },
  { title: 'Build', body: 'Builds responsible cultural influence in a generation holding the most powerful tools any has ever had.' },
]

const EVENT_TYPE_LABELS: Record<string, string> = {
  talk: 'Talk',
  panel: 'Panel',
  summit: 'Summit',
  debate: 'Debate',
  workshop: 'Workshop',
}

export default async function MicdupPage() {
  // HIDDEN: Mic'd Up — this page returns 404 for now. Delete this line to publish it again
  // (and uncomment the nav, footer and sitemap entries marked "HIDDEN: Mic'd Up").
  notFound()

  const events = await sanityFetch<MicdupEvent[]>(MICDUP_EVENTS_QUERY).catch(() => [] as MicdupEvent[])
  const highlights = (events ?? []).slice(0, 3)

  return (
    <>
      {/* 1 · Why I started it */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden pt-24"
        style={{ background: 'linear-gradient(135deg, #0A2240 0%, #0D1B2A 60%, #080F18 100%)' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent" />
        <div className="container-site py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="space-y-7">
              <div>
                <p className="eyebrow mb-5">Mic&apos;d Up Initiative · Founded by Sir Anthony</p>
                <GoldLine className="mb-7" />
                <h1
                  className="font-display font-semibold text-cream leading-tight"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                >
                  Why I started
                  <br />
                  <em className="text-gold">Mic&apos;d Up.</em>
                </h1>
              </div>
              <p className="font-body text-cream/60 text-xl leading-relaxed max-w-lg">
                It began with a friend&apos;s question after my first year at university: had campus
                changed me the way everyone assumed it changes people? Mic&apos;d Up Initiative is my
                answer — a movement making sure the culture forming on Africa&apos;s campuses is formed
                on purpose.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={MICDUP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Visit Mic&apos;d Up Initiative <ExternalLink size={14} />
                </a>
                <Link href="/contact" className="btn-ghost">
                  Invite me to your campus
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} className="hidden lg:flex justify-center">
              <div className="relative">
                <RippleCircles />
                <div className="absolute inset-0 flex items-center justify-center px-10">
                  <p className="font-display italic text-2xl text-cream/80 text-center leading-snug max-w-[16rem]">
                    The youngest population on earth is being formed right now.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The thinking behind it */}
      <section className="section-pad bg-navy/95">
        <div className="container-site max-w-3xl">
          <AnimatedSection direction="in" className="space-y-6">
            <p className="font-body text-cream/75 text-lg leading-[1.85]">
              Africa has the youngest population on earth, and a large part of it is passing through
              campuses right now. That is where habits of mind are formed — what people treat as normal,
              how they disagree, what they believe their voice is for.
            </p>
            <blockquote className="border-l-2 border-gold/40 pl-6 md:pl-8 my-8">
              <p className="font-display italic text-cream text-2xl md:text-3xl leading-[1.4]">
                &ldquo;The student who learns on campus that intellectual courage is worth practising carries
                that capacity into every institution they later inhabit.&rdquo;
              </p>
            </blockquote>
            <p className="font-body text-cream/75 text-lg leading-[1.85]">
              Those habits are being formed whether anyone intends it or not. Mic&apos;d Up exists so that
              some of them are formed deliberately.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2 · What it does */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site">
          <SectionHeader eyebrow="What it does" title="Discover. Shape. Build." className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHAT_IT_DOES.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 120}>
                <div className="border-l border-gold/25 pl-6 h-full">
                  <h3 className="font-display text-2xl font-semibold text-cream mb-3">{p.title}</h3>
                  <p className="font-body text-cream/60 leading-relaxed">{p.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · My role */}
      <section className="section-pad bg-navy/95 border-t border-gold/10">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <AnimatedSection className="lg:col-span-4">
              <p className="eyebrow mb-4">My role</p>
              <GoldLine />
            </AnimatedSection>
            <AnimatedSection delay={120} className="lg:col-span-8 space-y-5">
              <p className="font-display text-2xl md:text-3xl text-cream leading-snug">
                Founder and convener. I host the conversations, shape what the movement sets out to do, and
                carry what students teach me into my writing and talks.
              </p>
              <p className="font-body text-cream/60 leading-relaxed">
                The Initiative has its own home, team and programmes. Institutions, campuses and partners
                will find everything they need — from ambassador programmes to partnerships — on{' '}
                <a href={MICDUP_URL} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light">
                  micdupinitiative.site
                </a>
                .
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4 · Highlights */}
      {highlights.length > 0 && (
        <section className="section-pad bg-navy border-t border-gold/10">
          <div className="container-site">
            <SectionHeader
              eyebrow="Highlights"
              title="On campus."
              subtitle="A few of the conversations Mic'd Up has hosted."
              className="mb-14"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((event, i) => (
                <AnimatedSection key={event._id} delay={i * 80}>
                  <article className="card-navy overflow-hidden h-full flex flex-col">
                    {event.image?.asset?.url && (
                      <div className="relative h-44 overflow-hidden flex-shrink-0">
                        <Image
                          src={urlFor(event.image).width(1200).auto('format').url()}
                          alt={event.image.alt || event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          quality={70}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/25 text-xs font-body">
                          {EVENT_TYPE_LABELS[event.type] || event.type}
                        </span>
                        <span className="font-body text-xs text-cream/40">{formatDateShort(event.date)}</span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-cream mb-2 leading-snug">{event.title}</h3>
                      <p className="font-body text-xs text-cream/45 mb-3">{event.location}</p>
                      {event.description && (
                        <p className="font-body text-sm text-cream/55 leading-relaxed line-clamp-3">{event.description}</p>
                      )}
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5 · Two ways forward */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6">
              Bring the conversation <em className="text-gold">to your campus.</em>
            </h2>
            <p className="font-body text-cream/55 text-lg max-w-xl mx-auto mb-10">
              I speak at universities, student fellowships and youth gatherings. To get involved with the
              movement itself, start at the Initiative&apos;s own site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                Invite me to speak <ArrowRight size={14} />
              </Link>
              <a href={MICDUP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Visit Mic&apos;d Up Initiative <ExternalLink size={14} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
