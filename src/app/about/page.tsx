import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, SectionHeader, RippleCircles, GoldLine } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity'
import { AUTHOR_QUERY, TEST_AUTHOR_QUERY } from '@/lib/queries'
import type { Author } from '@/types'

export const metadata: Metadata = {
  title: 'About Sir Anthony',
  description:
    'Sir Anthony is a Kenyan cultural thinker, conversationalist, writer, and founder of Mic\'d Up Initiative. His work sits at the intersection of culture, identity, leadership, and the ideas quietly shaping how we live.',
}

const VALUES = [
  {
    title: 'Observation before instruction',
    body: 'Sir Anthony notices before he concludes. He describes what he sees before drawing lessons — making him feel like a thinker reasoning out loud alongside his audience, not above them.',
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

const MILESTONES = [
  { year: '2018', event: 'Personal development and motivation content across social platforms' },
  { year: '2020', event: 'First conversations on culture shift — observing what nobody was naming' },
  { year: '2022', event: 'Launch of Mic\'d Up Initiative — campus-centered voice development across Africa' },
  { year: '2023', event: 'Cultural training engagements with organizations and institutions begin' },
  { year: '2024', event: 'Brand crystallised — Sir Anthony, Voice of Transformation' },
  { year: '2025', event: 'Book in progress: Who Made You Normal? The Cultural Conversation' },
]

export default async function AboutPage() {
  const [author, testAuthors] = await Promise.all([
    sanityFetch<Author>(AUTHOR_QUERY),
    sanityFetch<any[]>(TEST_AUTHOR_QUERY),
  ])

  console.log('Author data:', author)
  console.log('Author image URL:', author?.image?.asset?.url)
  console.log('Author image alt:', author?.image?.alt)
  console.log('Author name:', author?.name)
  console.log('Test authors:', testAuthors)
  console.log('Test authors count:', testAuthors?.length)

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
                The person at
                <br />
                <em className="text-gold">the window.</em>
              </h1>
              <p className="font-body text-cream/55 text-xl leading-relaxed max-w-lg">
                Watching. Thinking. Naming what is happening before most people
                notice it has begun. That is the brand. That is the invitation.
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

            {/* Author Photo */}
            <AnimatedSection className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                  {author?.image?.asset?.url ? (
                    <Image
                      src={author.image.asset.url}
                      alt={author.image.alt || author.name || 'Sir Anthony'}
                      fill
                      className="object-cover scale-[1.3] origin-center"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center card-navy"
                      style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(13,27,42,0.8) 100%)' }}>
                      <div className="text-center p-8">
                        <RippleCircles className="mb-4 mx-auto" />
                        <p className="font-body text-xs text-cream/30 mt-4 uppercase tracking-widest">
                          Photo coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Floating quote */}
                <div className="absolute -bottom-8 -right-8 bg-navy p-4 max-w-[220px] rounded-lg shadow-xl border border-gold/20">
                  <p className="font-display italic text-white text-sm leading-relaxed">
                    &ldquo;An idea is an invitation to a certain perspective. What are you inviting people toward?&rdquo;
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Bio text */}
            <AnimatedSection delay={150} className="lg:col-span-7 space-y-7">
              <div>
                <p className="eyebrow mb-4">About Sir Anthony</p>
                <GoldLine className="mb-6" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream mb-6">
                The question that <span className="text-gold">started everything.</span>
              </h2>

              <p className="font-body text-cream/70 text-lg leading-relaxed">
                I remember arriving home after my first year at university. The following morning a
                friend looked at me and asked, almost immediately: <em className="text-gold italic">"Are you still the same saint-like
                person we knew — or have you become a drunkard like everyone else who goes
                there?"</em>
              </p>

              <p className="font-body text-cream/70 text-lg leading-relaxed border-l-2 border-gold/30 pl-6 italic">
                We laughed. We were used to joking. But the question stayed with me — not the question
                about me, but the question behind the question. Why had campus become associated with
                that? With corruption. With the erosion of values. With the kind of person who comes back
                different in ways that worry the people who love them.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={250} className="lg:col-span-7 lg:col-start-6 space-y-7">
              <p className="font-body text-cream/70 text-lg leading-relaxed">
                I thought about the advice I had received before joining. <em className="text-gold italic">Campus corrupts. Don't lose
                yourself. Don't become immoral.</em> Fear dressed as concern. Joining university was supposed
                to be a dawn signal — a beginning, but somewhere along the way, fear had grown louder than
                the hope.
              </p>

              <p className="font-body text-cream/70 text-lg leading-relaxed">
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
              <p className="eyebrow">Sir Anthony · Conversationalist & Cultural Architect</p>
              <div className="flex gap-2 max-w-2xl">
                <div className="w-1 h-1 rounded-full bg-gold mt-3 flex-shrink-0" />
                <p className="font-body text-cream text-lg md:text-xl leading-relaxed">
                  <em>I lead conversations that <strong>disturb the comfortable</strong> — and <strong>comfort the disturbed.</strong></em>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {['Cultural Thinker', 'Conversationalist', 'Keynote Speaker', 'Cultural Trainer', 'Digital Strategist', 'Nairobi, Kenya'].map((tag) => (
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
                and build the digital infrastructure to communicate it with integrity.
              </p>
              <p className="font-body text-cream/70 text-lg leading-relaxed max-w-3xl">
                I am also the founder of <strong className="text-cream">Mic'd Up Initiative</strong> — a campus-centred movement committed to
                discovering voices, shaping leaders, and building responsible cultural influence among the youngest
                and most formative generation on the continent.
              </p>
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

      {/* CTA */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site text-center">
          <AnimatedSection>
            <p className="eyebrow mb-6">The Next Step</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6">
              Start the conversation.
            </h2>
            <p className="font-body text-cream/55 text-lg max-w-xl mx-auto mb-10">
              Whether you want to read, to bring Sir Anthony to your organization,
              or to build something together — the door is open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">Get in Touch <ArrowRight size={14} /></Link>
              <Link href="/conversations" className="btn-ghost">Read the Conversations</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
