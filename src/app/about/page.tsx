import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, SectionHeader, RippleCircles, GoldLine } from '@/components/ui'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { AUTHOR_QUERY } from '@/lib/queries'
import { Ventures } from '@/components/sections/Ventures'
import type { Author } from '@/types'

export const metadata: Metadata = {
  title: 'About Sir Anthony',
  description:
    // HIDDEN: Mic'd Up — original: 'Kenyan conversationalist, cultural thinker and writer. Founder of Mic\'d Up Initiative and REALWINNERS DIGITAL. My work sits where culture, identity and leadership meet.',
    'Kenyan conversationalist, cultural thinker and writer. Founder of REALWINNERS DIGITAL. My work sits where culture, identity and leadership meet.',
}

const VALUES = [
  {
    title: 'Observation before instruction',
    body: 'I notice before I conclude. I would rather describe what I am seeing and reason out loud beside you than hand down a lesson from somewhere above you.',
  },
  {
    title: 'The examined perspective',
    body: 'Every idea worth holding has been examined. The most dangerous perspectives are not the obviously wrong ones — they are the ones that feel right, come from trusted sources, and are never tested.',
  },
  {
    title: 'Ordinary people, extraordinary impact',
    body: 'The people who change culture most durably are usually those who were not trying to change the world — they were faithfully changing their corner of it, for a long time.',
  },
  {
    title: 'Both floors at once',
    body: 'The Observatory and the Workshop. Understanding how culture is built and equipping people to build something deliberately better. Diagnosis without prescription is incomplete.',
  },
]

export default async function AboutPage() {
  const author = await sanityFetch<Author>(AUTHOR_QUERY)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-navy pt-32">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

        <div className="container-site pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <AnimatedSection>
              <p className="eyebrow mb-5">About</p>
              <GoldLine className="mb-7" />
              <h1
                className="font-display font-semibold text-cream leading-tight mb-6"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                The conversations that shape us
                <br />
                <em className="text-gold">rarely announce themselves.</em>
              </h1>
              <p className="font-body text-cream/55 text-xl leading-relaxed max-w-lg">
                Conversations that have range and courage — that start with observation, not instruction. 
                That are not afraid to examine the perspectives behind the perspectives. 
                That are built by ordinary people, not extraordinary experts. 
                That understand both floors of the building — how culture is built, and how to build it deliberately.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200} className="hidden lg:flex justify-center">
              <RippleCircles />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="section-pad bg-navy/95">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Author Photo — rendered only when there is one */}
            {author?.image?.asset?.url && (
              <AnimatedSection className="lg:col-span-5">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                    <Image
                      src={urlFor(author.image).width(1200).auto('format').url()}
                      alt={author.image.alt || author.name || 'Sir Anthony'}
                      fill
                      sizes="(max-width: 1024px) 70vw, 36rem"
                      quality={70}
                      className="object-cover scale-[1.3] origin-center"
                      priority
                    />
                  </div>
                  {/* Floating quote */}
                  <div className="absolute -bottom-8 -right-8 bg-navy p-4 max-w-[220px] rounded-lg shadow-xl border border-gold/20">
                    <p className="font-display italic text-white text-sm leading-relaxed">
                      &ldquo;An idea is an invitation to a certain perspective. What are you inviting people toward?&rdquo;
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Bio text */}
            <AnimatedSection
              delay={150}
              className={author?.image?.asset?.url ? 'lg:col-span-7 space-y-7' : 'lg:col-span-9 space-y-7'}
            >
              <div>
                <p className="eyebrow mb-4">How I got here</p>
                <GoldLine className="mb-6" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream mb-6">
                The question that <span className="text-gold">started everything.</span>
              </h2>

              <p className="font-body text-cream/70 text-[0.95rem] leading-relaxed">
                I remember arriving home after my first year at university. The following morning a
                friend looked at me and asked, almost immediately: <em className="text-gold italic">"Are you still the same saint-like
                person we knew — or have you become a drunkard like everyone else who goes
                there?"</em>
              </p>

              <p className="font-body text-cream/70 text-[0.95rem] leading-relaxed border-l-2 border-gold/30 pl-6 italic">
                We laughed. We were used to joking. But the question stayed with me — not the question
                about me, but the question behind the question. Why had campus become associated with
                that? With corruption. With the erosion of values. With the kind of person who comes back
                different in ways that worry the people who love them.
              </p>

              <p className="font-body text-cream/70 text-[0.95rem] leading-relaxed">
                I thought about the advice I had received before joining. <em className="text-gold italic">Campus corrupts. Don't lose
                yourself. Don't become immoral.</em> Fear dressed as concern. Joining university was supposed
                to be a dawn signal — a beginning, but somewhere along the way, fear had grown louder than
                the hope.
              </p>

              <p className="font-body text-cream/70 text-[0.95rem] leading-relaxed">
                What my friend was really asking was whether the campus culture had changed my way of
                life. And that question became a burden I could not put down. A conversation about culture
                and formation that I have been carrying ever since.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site">
          <AnimatedSection>
            <div className="space-y-6 mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream">
                Anthony Munene
              </h2>
              <p className="eyebrow">Known as Sir Anthony · Conversationalist &amp; Cultural Thinker</p>
              <div className="flex gap-2 max-w-2xl">
                <div className="w-1 h-1 rounded-full bg-gold mt-3 flex-shrink-0" />
                <p className="font-body text-cream text-lg md:text-xl leading-relaxed">
                  <em>I lead conversations that <strong>disturb the comfortable</strong> — and <strong>comfort the disturbed.</strong></em>
                  <span className="block font-body not-italic text-xs text-cream/40 mt-2">
                    To borrow a line often credited to Cesar A. Cruz.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {['Cultural Thinker', 'Conversationalist', 'Speaker', 'Writer', 'Nairobi, Kenya'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full border border-gold/30 text-gold text-sm font-body">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* The Work */}
          <AnimatedSection delay={100}>
            <div className="space-y-6 mb-12">
              <p className="eyebrow">The Work</p>
              <p className="font-body text-cream/70 text-lg leading-relaxed max-w-3xl">
                My work begins with a single observation: culture is not what your tribe did. It is what you do —
                every day, in the small ignored things nobody is examining. The way a campus forms a student. The
                way an organisation rewards its people. The way a family transmits its values without knowing it is
                doing so.
              </p>
              <p className="font-body text-cream/70 text-lg leading-relaxed max-w-3xl">
                These small things compound. By the time anyone notices — the culture has already been built.
                Without intention. Without examination. Often without consent. <strong className="text-cream">I exist to start the
                conversations that change that.</strong>
              </p>
            </div>
          </AnimatedSection>

          {/* Where I Work */}
          <AnimatedSection delay={150}>
            <div className="space-y-6 mb-12">
              <p className="eyebrow">Where I Work</p>
              <p className="font-body text-cream/70 text-lg leading-relaxed max-w-3xl">
                Based in Nairobi, Kenya, I work with individuals, organisations, campuses, and institutions across
                Africa — helping them see the culture they have built, develop the thinking to shape it deliberately,
                and find the language to carry it with integrity.
              </p>
              {/* HIDDEN: Mic'd Up — uncomment this paragraph, and change "I also founded" below back to "And I founded".
              <p className="font-body text-cream/70 text-lg leading-relaxed max-w-3xl">
                I am also the founder of <strong className="text-cream">Mic'd Up Initiative</strong> — a campus-centred movement committed to
                discovering voices, shaping leaders, and building responsible cultural influence among the youngest
                and most formative generation on the continent.
              </p>
              */}
              <p className="font-body text-cream/70 text-lg leading-relaxed max-w-3xl">
                I also founded <strong className="text-cream">REALWINNERS DIGITAL</strong>, a studio built on the same
                belief: a brand&apos;s website is the first conversation its customers have with it. The studio
                handles websites and digital strategy, so this site can stay focused on ideas, speaking and training.
              </p>
            </div>
          </AnimatedSection>

          {/* How I work — plain rows, no cards, no icons */}
          <AnimatedSection delay={150} direction="in">
            <div className="mb-14">
              <p className="eyebrow mb-8">How I work</p>
              <div className="space-y-7 max-w-3xl">
                {VALUES.map(value => (
                  <div key={value.title} className="border-l border-gold/20 pl-6">
                    <h3 className="font-display text-lg font-semibold text-cream mb-2">
                      {value.title}
                    </h3>
                    <p className="font-body text-cream/60 leading-relaxed">{value.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Closing Quote */}
          <AnimatedSection delay={200} className="mt-16 pt-12 border-t border-gold/10">
            <p className="font-display italic text-gold text-2xl md:text-3xl leading-relaxed max-w-2xl">
              "Who made you normal? That is the question. That is the work."
            </p>
            <p className="eyebrow mt-6">— Sir Anthony</p>
          </AnimatedSection>
        </div>
      </section>

      <Ventures compact />

      {/* CTA */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site text-center">
          <AnimatedSection>
            <p className="eyebrow mb-6">The Next Step</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6">
              Start the conversation.
            </h2>
            <p className="font-body text-cream/55 text-lg max-w-xl mx-auto mb-10">
              Whether you want to read, to bring me into your organisation,
              or to bring this conversation to your context — the door is open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* HIDDEN: Speaking — <Link href="/speaking" className="btn-gold">Speaking &amp; training <ArrowRight size={14} /></Link> */}
              <Link href="/contact" className="btn-gold">Get in touch <ArrowRight size={14} /></Link>
              <Link href="/conversations" className="btn-ghost">Read the conversations</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
