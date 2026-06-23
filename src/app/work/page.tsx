import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mic2, Users, Globe, BookOpen, Check } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity'
import { SERVICES_QUERY, SPEAKING_TOPICS_QUERY, TESTIMONIALS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import { TestimonialStrip } from '@/components/sections/HomeSections'
import { WorkHero } from '@/components/sections/WorkHero'
import type { SpeakingTopic, Testimonial, SiteSettings, Service } from '@/types'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Conversations, Cultural Engagements, Speaking, Consulting, and Digital Strategy..',
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Mic2,
  Users,
  Globe,
  BookOpen,
}

const FALLBACK_SERVICES: Service[] = [
  {
    _id: 'fallback-1',
    title: 'Cultural Intelligence',
    description:
      'Every conversation, panel, talk, and community forum. It is my job to bring the cultural conversation directly into your context — equipping audiences to see what they have been building without knowing it, and introducing the frameworks for building something deliberately better.',
    icon: 'Mic2',
    features: [
      'Keynote addresses (60–90 minutes)',
      'Panel facilitation and moderation',
      'University lectures and campus talks',
      'Church and faith community forums',
      'Corporate leadership days',
      'Community conversation events',
      'Conference and summit appearances',
    ],
    cta: 'Book a Talk',
    order: 1,
  },
  {
    _id: 'fallback-2',
    title: 'Cultural Training',
    description:
      'Multi-session, structured engagements with leadership teams, staff bodies, student populations, or congregations. The work begins with a cultural audit — what culture actually exists versus what is intended — and builds through facilitated sessions toward deliberate cultural design.',
    icon: 'Users',
    features: [
      'Organizational cultural audit',
      'Leadership team workshops (3–6 sessions)',
      'Full staff cultural formation programs',
      'School and university culture programs',
      'Church leadership formation',
      'Ongoing cultural advisory retainer',
      'Post-engagement implementation support',
    ],
    cta: 'Start the Training',
    order: 2,
  },
  {
    _id: 'fallback-3',
    title: 'Digital Culture',
    description:
      'Building the digital presence that honestly reflects what an organization actually is. Websites, content strategies, and personal brand development — all built on the cultural clarity developed in Layer 2. Every website is a cultural statement. This work ensures it says the right thing.',
    icon: 'Globe',
    features: [
      'Website strategy and development',
      'Content strategy and editorial planning',
      'Personal brand development for leaders',
      'Digital communication frameworks',
      'Social media strategy',
      'Ongoing content advisory',
      'Brand identity and positioning',
    ],
    cta: 'Build Together',
    order: 3,
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
  const WORK_COMBINED_QUERY = `{
    "services": ${SERVICES_QUERY},
    "topics": ${SPEAKING_TOPICS_QUERY},
    "testimonials": ${TESTIMONIALS_QUERY},
    "siteSettings": ${SITE_SETTINGS_QUERY}
  }`

  const data = await sanityFetch<{
    services: Service[]
    topics: SpeakingTopic[]
    testimonials: Testimonial[]
    siteSettings: SiteSettings
  }>(WORK_COMBINED_QUERY)

  const rawServices = data?.services || []
  const services = rawServices.length > 0 ? rawServices : FALLBACK_SERVICES
  const topics = data?.topics || []
  const testimonials = data?.testimonials || []
  const siteSettings = data?.siteSettings

  // Debug: Log site settings data
  console.log('Site settings data:', siteSettings)
  console.log('Work hero image:', siteSettings?.workHeroImage)

  return (
    <>
      <WorkHero siteSettings={siteSettings} />

      {/* Three layers */}
      <section className="section-pad bg-navy/95">
        <div className="container-site space-y-8">
          {services.map((service, i) => {
            const num = String(i + 1).padStart(2, '0')
            const Icon = iconMap[service.icon] || BookOpen
            const subtitles = [
              'The Public Layer',
              'The Institutional Layer',
              'The Architecture Layer',
            ]
            const subtitle = subtitles[i] || 'Special Engagement'
            const highlight = i === 1 // Layer 2 is highlighted (Cultural Training)
            const features = service.features || []

            return (
              <AnimatedSection key={service._id} delay={i * 100}>
                <div className={`card-navy p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 ${highlight ? 'border-gold/30' : ''}`}>
                  {highlight && (
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
                          Layer {num} · {subtitle}
                        </p>
                        <h2 className="font-display text-2xl font-semibold text-cream">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <p className="font-body text-cream/60 leading-relaxed">
                      {service.description}
                    </p>
                    <Link href="/contact" className={highlight ? 'btn-gold inline-flex' : 'btn-ghost inline-flex'}>
                      {service.cta || 'Learn More'} <ArrowRight size={14} />
                    </Link>
                  </div>
                  {/* Includes */}
                  <div className="space-y-2.5">
                    <p className="eyebrow mb-4">What&apos;s included</p>
                    {features.map(item => (
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
                Whether you want a conversation facilitated by Sir Anthony, a digital content
                strategy engagement, or web development or are not yet sure which layer fits your need —
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
                  { label: 'Conversations & Speaking', phone: siteSettings?.contactPhone || '+254 741 518 589' },
                  { label: 'Digital Strategy & Web', phone: siteSettings?.contactPhoneAlt || '+254 727 974 516' },
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
