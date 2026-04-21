import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mic2, Users, Globe, BookOpen, Check } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity'
import { SPEAKING_TOPICS_QUERY, TESTIMONIALS_QUERY } from '@/lib/queries'
import { TestimonialStrip } from '@/components/sections/HomeSections'
import type { SpeakingTopic, Testimonial } from '@/types'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Cultural training, speaking, consulting, and digital strategy. Sir Anthony works with individuals, organizations, and institutions across three integrated layers of engagement.',
}

const LAYERS = [
  {
    icon: Mic2,
    num: '01',
    title: 'Cultural Intelligence',
    subtitle: 'The Public Layer',
    description:
      'Every keynote, panel, talk, and community forum. Sir Anthony brings the cultural conversation directly into your context — equipping audiences to see what they have been building without knowing it, and introducing the frameworks for building something deliberately better.',
    includes: [
      'Keynote addresses (60–90 minutes)',
      'Panel facilitation and moderation',
      'University lectures and campus talks',
      'Church and faith community forums',
      'Corporate leadership days',
      'Community conversation events',
      'Conference and summit appearances',
    ],
    cta: 'Book a Talk',
    highlight: false,
  },
  {
    icon: Users,
    num: '02',
    title: 'Cultural Training',
    subtitle: 'The Institutional Layer',
    description:
      'Multi-session, structured engagements with leadership teams, staff bodies, student populations, or congregations. The work begins with a cultural audit — what culture actually exists versus what is intended — and builds through facilitated sessions toward deliberate cultural design.',
    includes: [
      'Organizational cultural audit',
      'Leadership team workshops (3–6 sessions)',
      'Full staff cultural formation programs',
      'School and university culture programs',
      'Church leadership formation',
      'Ongoing cultural advisory retainer',
      'Post-engagement implementation support',
    ],
    cta: 'Start the Training',
    highlight: true,
  },
  {
    icon: Globe,
    num: '03',
    title: 'Digital Culture',
    subtitle: 'The Architecture Layer',
    description:
      'Building the digital presence that honestly reflects what an organization actually is. Websites, content strategies, and personal brand development — all built on the cultural clarity developed in Layer 2. Every website is a cultural statement. This work ensures it says the right thing.',
    includes: [
      'Website strategy and development',
      'Content strategy and editorial planning',
      'Personal brand development for leaders',
      'Digital communication frameworks',
      'Social media strategy',
      'Ongoing content advisory',
      'Brand identity and positioning',
    ],
    cta: 'Build Together',
    highlight: false,
  },
]

const PROCESS = [
  { step: '01', title: 'Conversation', body: 'A discovery conversation — understanding your context, your challenge, and what kind of engagement would actually serve your organization.' },
  { step: '02', title: 'Diagnosis', body: 'For institutional engagements, a cultural audit comes first. Understanding what exists before designing what should exist.' },
  { step: '03', title: 'Design', body: 'A proposed engagement — tailored to your specific context, not a generic program applied without modification.' },
  { step: '04', title: 'Delivery', body: 'The work itself. Conversations, training sessions, or digital builds — executed with the same depth as the framework that produced them.' },
  { step: '05', title: 'Development', body: 'For ongoing relationships — the follow-through. Culture is not changed in a single session. The sustained engagement is where transformation happens.' },
]

export default async function WorkPage() {
  const [topics, testimonials] = await Promise.all([
    sanityFetch<SpeakingTopic[]>(SPEAKING_TOPICS_QUERY),
    sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY),
  ])

  return (
    <>
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 60%, rgba(201,168,76,0.05) 0%, transparent 65%)' }} />
        <div className="container-site relative z-10">
          <AnimatedSection>
            <p className="eyebrow mb-5">Work With Me</p>
            <GoldLine className="mb-7" />
            <h1 className="font-display font-semibold text-cream leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>
              Three layers.
              <br />
              <em className="text-gold">One integrated mission.</em>
            </h1>
            <p className="font-body text-cream/55 text-xl leading-relaxed max-w-2xl">
              Cultural intelligence. Practical training. Digital architecture.
              Built together because they are expressions of the same thinking —
              helping organizations understand how their culture is built and
              shape it deliberately.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Three layers */}
      <section className="section-pad bg-navy/95">
        <div className="container-site space-y-8">
          {LAYERS.map((layer, i) => {
            const Icon = layer.icon
            return (
              <AnimatedSection key={layer.num} delay={i * 100}>
                <div className={`card-navy p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 ${layer.highlight ? 'border-gold/30' : ''}`}>
                  {layer.highlight && (
                    <div className="lg:col-span-3 -mt-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-body font-medium border border-gold/25">
                        Most Requested
                      </span>
                    </div>
                  )}
                  {/* Layer info */}
                  <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl border border-gold/25 flex items-center justify-center">
                        <Icon size={20} className="text-gold" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-gold uppercase tracking-widest mb-0.5">
                          Layer {layer.num} · {layer.subtitle}
                        </p>
                        <h2 className="font-display text-2xl font-semibold text-cream">
                          {layer.title}
                        </h2>
                      </div>
                    </div>
                    <p className="font-body text-cream/60 leading-relaxed">
                      {layer.description}
                    </p>
                    <Link href="/contact" className={layer.highlight ? 'btn-gold inline-flex' : 'btn-ghost inline-flex'}>
                      {layer.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                  {/* Includes */}
                  <div className="space-y-2.5">
                    <p className="eyebrow mb-4">What&apos;s included</p>
                    {layer.includes.map(item => (
                      <div key={item} className="flex items-start gap-2.5">
                        <Check size={13} className="text-gold mt-0.5 flex-shrink-0" />
                        <span className="font-body text-xs text-cream/55 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      {/* Speaking topics from Sanity */}
      {topics?.length > 0 && (
        <section className="section-pad relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #0A2240 100%)' }}>
          <div className="container-site">
            <SectionHeader
              eyebrow="Speaking Topics"
              title="What Sir Anthony speaks on"
              subtitle="Each topic is a developed framework — not a generic talk applied without modification to any audience."
              className="mb-14"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics.map((topic, i) => (
                <AnimatedSection key={topic._id} delay={i * 80}>
                  <div className="card-navy p-7">
                    <h3 className="font-display text-xl font-semibold text-cream mb-3">{topic.title}</h3>
                    <div className="w-6 h-px bg-gold/40 mb-4" />
                    <p className="font-body text-sm text-cream/55 leading-relaxed mb-4">{topic.description}</p>
                    <div className="flex gap-4 text-xs font-body text-cream/35 uppercase tracking-wider">
                      <span>{topic.duration}</span>
                      <span>·</span>
                      <span>{topic.audience}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="section-pad bg-navy">
        <div className="container-site">
          <SectionHeader
            eyebrow="How It Works"
            title="The process"
            subtitle="Every engagement begins the same way — with a genuine conversation about context, not a brochure."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 80}>
                <div className="card-navy p-6 text-center h-full">
                  <p className="font-display text-4xl font-light text-gold/20 mb-3">{step.step}</p>
                  <h3 className="font-display text-lg font-semibold text-cream mb-3">{step.title}</h3>
                  <div className="w-5 h-px bg-gold/30 mx-auto mb-3" />
                  <p className="font-body text-xs text-cream/45 leading-relaxed">{step.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialStrip testimonials={testimonials} />

      {/* Contact CTA */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="eyebrow mb-5">Start the Conversation</p>
              <GoldLine className="mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6 leading-tight">
                Ready to bring this
                <em className="text-gold block">to your context?</em>
              </h2>
              <p className="font-body text-cream/55 text-lg leading-relaxed mb-8">
                Whether you want a keynote, a full cultural training program, a digital
                strategy engagement, or are not yet sure which layer fits your need —
                the conversation starts the same way. A real exchange about context.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-gold">
                  Get in Touch <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="space-y-4">
                {[
                  { label: 'Conversations & Speaking', phone: '+254 741 518 589' },
                  { label: 'Digital Strategy & Web', phone: '+254 727 974 516' },
                ].map(c => (
                  <div key={c.label} className="card-navy p-6">
                    <p className="eyebrow mb-2">{c.label}</p>
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`}
                      className="font-display text-2xl text-gold hover:text-gold-light transition-colors">
                      {c.phone}
                    </a>
                  </div>
                ))}
                <div className="card-navy p-6">
                  <p className="eyebrow mb-2">Mic&apos;d Up Initiative</p>
                  <a href="https://micdupinitiative.site" target="_blank" rel="noopener noreferrer"
                    className="font-display text-2xl text-gold hover:text-gold-light transition-colors">
                    micdupinitiative.site
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
