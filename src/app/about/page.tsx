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
                <div className="aspect-[3/4] rounded-2xl overflow-hidden transform scale-130 origin-center">
                  {author?.image?.asset?.url ? (
                    <Image
                      src={author.image.asset.url}
                      alt={author.image.alt || author.name || 'Sir Anthony'}
                      fill
                      className="object-cover"
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
                <p className="eyebrow mb-4">The Story</p>
                <GoldLine className="mb-6" />
              </div>

              <p className="font-body text-cream/70 text-lg leading-relaxed">
                For a long time, Sir Anthony participated in the same conversations everyone
                around him was having — about the younger generation, about moral decline, about
                the distance between the Africa we have and the Africa we imagine. These
                conversations were passionate. Often correct in their diagnosis. And they never
                went anywhere.
              </p>
              <p className="font-body text-cream/70 text-lg leading-relaxed">
                The day he started asking a different question was the day the conversations
                became useful. Not <em className="text-cream/90">what is wrong</em> — but{' '}
                <em className="text-gold">what is producing</em> what we are seeing, and what
                inputs would need to change to produce something different?
              </p>
              <p className="font-body text-cream/70 text-lg leading-relaxed">
                That single shift — from output to input, from complaint to mechanism — is the
                intellectual foundation of everything Sir Anthony builds. The YouTube channel.
                The training programs. The book. The Mic&apos;d Up Initiative. The digital strategy
                work. All of it begins in the same place: the conviction that culture is built
                in the small ignored things, and understanding how it is built is the first
                step to building something deliberately better.
              </p>
              <p className="font-body text-cream/70 text-lg leading-relaxed">
                Based in Nairobi, Kenya, Sir Anthony works with individuals, organizations,
                campuses, and institutions across Africa — helping them see the culture they
                have built, develop the thinking to shape it deliberately, and build the digital
                infrastructure to communicate it with integrity.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/work" className="btn-gold">
                  Work With Me <ArrowRight size={14} />
                </Link>
                <Link href="/conversations" className="btn-ghost">
                  Read the Conversations
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values / Philosophy */}
      <section className="section-pad relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #0A2240 50%, #0D1B2A 100%)' }}>

        <div className="container-site">
          <SectionHeader
            eyebrow="Philosophy"
            title="How the thinking works"
            subtitle="The principles that run through every conversation, every training, every piece of content Sir Anthony creates."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 100}>
                <div className="card-navy p-8">
                  <p className="font-display text-5xl font-light text-gold/15 mb-4 leading-none">
                    0{i + 1}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-cream mb-4">
                    {v.title}
                  </h3>
                  <div className="w-6 h-px bg-gold/40 mb-4" />
                  <p className="font-body text-sm text-cream/55 leading-relaxed">{v.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-navy">
        <div className="container-site">
          <SectionHeader
            eyebrow="Journey"
            title="How it unfolded"
            className="mb-14"
          />
          <div className="relative max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />

            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <AnimatedSection key={m.year} delay={i * 80}>
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0 w-14 text-right">
                      <span className="font-display text-gold text-sm font-semibold">{m.year}</span>
                    </div>
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gold mt-1.5 relative z-10" />
                    <p className="font-body text-cream/60 text-sm leading-relaxed pt-0.5">
                      {m.event}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
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
