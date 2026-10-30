import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine } from '@/components/ui'
import { TestimonialStrip } from '@/components/sections/HomeSections'
import { sanityFetch } from '@/lib/sanity'
import { SPEAKING_TOPICS_QUERY, TESTIMONIALS_QUERY } from '@/lib/queries'
import type { SpeakingTopic, Testimonial } from '@/types'
import { notFound } from 'next/navigation'
import { HIDE_SPEAKING } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Speaking & Training',
  description:
    'Keynotes, cultural training and advisory by Sir Anthony for organisations, campuses and faith communities that want to build culture on purpose.',
}

export const revalidate = 60

// What I offer. Kept in code so the page is complete even before topics are added in Studio.
const OFFERS = [
  {
    title: 'Keynotes & talks',
    forWho: 'Conferences, campuses, leadership retreats and faith communities.',
    what:
      'A talk built around one question — who made you normal? — and shaped to your audience, your context and the conversation you need them to start.',
    outcome: 'People leave noticing the culture they are building, with language to talk about it.',
    cta: 'Book a talk',
  },
  {
    title: 'Cultural training',
    forWho: 'Organisations, schools and churches.',
    what:
      'Interactive half-day or full-day sessions: team conversations, mapping the culture you actually have, and the habits and rituals that carry the one you want.',
    outcome: 'A team that can name its culture and agrees on the next part to build on purpose.',
    cta: 'Plan a training',
  },
  {
    title: 'Cultural advisory',
    forWho: 'Leaders, founders and the people shaping an institution.',
    what:
      'Working sessions on the culture inside a team, the language an organisation uses, or a decision you keep circling. We work; we do not present.',
    outcome: 'Clarity on what is really being built, and a plan you can act on.',
    cta: 'Book a working session',
  },
]

// A real sequence, so it is numbered.
const STEPS = [
  { title: 'A first conversation', body: 'Thirty minutes, online, no charge. You tell me where you are and what you are trying to do.' },
  { title: 'Shaping the session', body: 'We agree on the audience, the outcome and the format, and I tailor the material to your context.' },
  { title: 'The session', body: 'The talk, training or working session itself — in person or online.' },
  { title: 'What happens next', body: 'A short follow-up with the questions worth carrying forward, so the conversation keeps going.' },
]

async function getData() {
  const [topics, testimonials] = await Promise.all([
    sanityFetch<SpeakingTopic[]>(SPEAKING_TOPICS_QUERY).catch(() => [] as SpeakingTopic[]),
    sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY).catch(() => [] as Testimonial[]),
  ])
  return { topics: topics ?? [], testimonials: testimonials ?? [] }
}

export default async function SpeakingPage() {
  // HIDDEN: Speaking — the page is kept intact but not served while hidden.
  if (HIDE_SPEAKING) notFound()

  const { topics, testimonials } = await getData()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy pt-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        />
        <div className="container-site pb-20 relative z-10">
          <AnimatedSection className="max-w-4xl">
            <p className="eyebrow mb-5">Speaking &amp; Training</p>
            <GoldLine className="mb-7" />
            <h1
              className="font-display font-semibold text-cream leading-tight mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              Bring the conversation
              <br />
              <em className="text-gold">into the room.</em>
            </h1>
            <p className="font-body text-cream/60 text-xl leading-relaxed max-w-2xl mb-10">
              Keynotes, training and advisory for organisations, campuses and faith communities that want
              to see the culture they have built — and build the next part on purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-gold">
                Book Sir Anthony <ArrowRight size={14} />
              </Link>
              <a
                href="https://calendly.com/officialsiranthony/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                A free first conversation
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Offers */}
      <section className="section-pad bg-navy/95 border-y border-gold/10">
        <div className="container-site">
          <SectionHeader
            eyebrow="Ways to work together"
            title="Three ways in."
            subtitle="Every engagement starts from the same place: what your people already treat as normal, and what you want them to build next."
            className="mb-14"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {OFFERS.map((o, i) => (
              <AnimatedSection key={o.title} delay={i * 120}>
                <article className="card-navy p-8 h-full flex flex-col">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream mb-5">{o.title}</h3>
                  <dl className="space-y-5 flex-1 font-body">
                    <div>
                      <dt className="eyebrow mb-1.5">Who it&apos;s for</dt>
                      <dd className="text-cream/65 leading-relaxed">{o.forWho}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1.5">What happens</dt>
                      <dd className="text-cream/65 leading-relaxed">{o.what}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1.5">What changes</dt>
                      <dd className="text-cream leading-relaxed">{o.outcome}</dd>
                    </div>
                  </dl>
                  <Link href="/contact" className="btn-gold mt-8 w-fit">
                    {o.cta} <ArrowRight size={14} />
                  </Link>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Topics from Studio */}
      {topics.length > 0 && (
        <section className="section-pad bg-navy">
          <div className="container-site">
            <SectionHeader
              eyebrow="Talk topics"
              title="What I speak on."
              subtitle="Each topic can be a keynote, a workshop or a facilitated conversation, tailored to your audience."
              className="mb-14"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics.map((t, i) => (
                <AnimatedSection key={t._id} delay={i * 90}>
                  <article className="card-navy p-7 h-full flex flex-col">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-cream mb-3">{t.title}</h3>
                    <p className="font-body text-cream/60 leading-relaxed mb-5">{t.description}</p>
                    {t.keyPoints && t.keyPoints.length > 0 && (
                      <ul className="space-y-2 mb-5">
                        {t.keyPoints.map(point => (
                          <li key={point} className="flex items-start gap-3 font-body text-sm text-cream/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gold/10">
                      {[t.audience, t.duration, t.format].filter(Boolean).map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-gold/25 text-gold/80 text-xs font-body">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="section-pad bg-navy/95 border-t border-gold/10">
        <div className="container-site">
          <SectionHeader eyebrow="How it works" title="From first call to follow-up." className="mb-12" />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <AnimatedSection delay={i * 100} className="border-l border-gold/25 pl-6 h-full">
                  <p className="font-display text-3xl text-gold/60 tabular-nums mb-3">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-xl font-semibold text-cream mb-2">{s.title}</h3>
                  <p className="font-body text-sm text-cream/55 leading-relaxed">{s.body}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TestimonialStrip testimonials={testimonials} />

      {/* Closing */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6">
              Start with a <em className="text-gold">conversation.</em>
            </h2>
            <p className="font-body text-cream/55 text-lg max-w-xl mx-auto mb-10">
              Tell me about your audience, your context and what you hope will change. I will tell you
              honestly whether I am the right person for it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                Book Sir Anthony <ArrowRight size={14} />
              </Link>
              <Link href="/conversations" className="btn-ghost">
                Read the Conversations
              </Link>
            </div>
            <p className="font-body text-sm text-cream/40 mt-10">
              Looking for a website or digital strategy? That work is handled by my studio,{' '}
              <a
                href="https://realwinners.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 hover:text-gold transition-colors"
              >
                REALWINNERS DIGITAL
              </a>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
