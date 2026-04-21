import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { AnimatedSection, SectionHeader } from '@/components/ui'
import type { Testimonial } from '@/types'

// ── TestimonialStrip ─────────────────────────────────────────────
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: '1', order: 1,
    quote:
      'Sir Anthony does not just speak about culture — he makes you feel the weight of what you have been building without knowing it. Our leadership team left the session seeing things we had been walking past for years.',
    author: 'Dr. Wanjiku M.',
    role: 'Vice Chancellor',
    organization: 'Kenyan University',
  },
  {
    _id: '2', order: 2,
    quote:
      'The cultural audit changed how we understood ourselves as an organization. The gap between what we said we valued and what we actually rewarded was uncomfortable — and exactly what we needed to see.',
    author: 'James O.',
    role: 'CEO',
    organization: 'Nairobi Tech Company',
  },
  {
    _id: '3', order: 3,
    quote:
      'Every campus should have this conversation. Mic\'d Up gave our students a framework for understanding the culture forming them — and the courage to think about what they want to build instead.',
    author: 'Pastor Samuel K.',
    role: 'Campus Chaplain',
    organization: 'University of Nairobi',
  },
]

interface TestimonialStripProps { testimonials: Testimonial[] }

export function TestimonialStrip({ testimonials }: TestimonialStripProps) {
  const items = testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS

  return (
    <section className="section-pad bg-navy border-y border-gold/10">
      <div className="container-site">
        <SectionHeader
          eyebrow="What People Say"
          title="The Conversation in Action"
          centered
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((t, i) => (
            <AnimatedSection key={t._id} delay={i * 120}>
              <div className="card-navy p-7 h-full flex flex-col">
                <Quote size={24} className="text-gold/25 mb-4 flex-shrink-0" />
                <p className="font-display italic text-cream/75 text-lg leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-gold/10 pt-5">
                  <p className="font-body font-medium text-cream text-sm">{t.author}</p>
                  <p className="font-body text-xs text-cream/40 mt-0.5">
                    {t.role} · {t.organization}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── MicdupBanner ─────────────────────────────────────────────────
export function MicdupBanner() {
  return (
    <section className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A2240 0%, #0D1B2A 100%)' }}>

      {/* Side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent" />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <span className="eyebrow mb-4 block">Mic&apos;d Up Initiative</span>
            <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6 leading-tight">
              Africa has the youngest
              population on earth.
              <em className="text-gold block mt-1">What happens on its campuses matters.</em>
            </h2>
            <p className="font-body text-cream/55 text-lg leading-relaxed mb-8">
              More than 400 million people between 15 and 35 — being formed right now,
              on campuses across the continent. Mic&apos;d Up Initiative exists to ensure
              that formation happens with intention.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://micdupinitiative.site"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Visit Mic&apos;d Up <ArrowRight size={14} />
              </a>
              <Link href="/micdup" className="btn-ghost">
                Learn More
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '400M+', label: 'African youth 15–35' },
                { num: '54',    label: 'Countries on the continent' },
                { num: '3',     label: 'Core pillars of formation' },
                { num: '∞',     label: 'Conversations worth having' },
              ].map(stat => (
                <div key={stat.label} className="card-navy p-6 text-center">
                  <p className="font-display text-3xl md:text-4xl font-semibold text-gold mb-2">
                    {stat.num}
                  </p>
                  <p className="font-body text-xs text-cream/45 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ── HomeCTA ──────────────────────────────────────────────────────
export function HomeCTA() {
  return (
    <section className="section-pad bg-navy relative overflow-hidden">
      {/* Background ripple hint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container-site text-center relative z-10">
        <AnimatedSection>
          <p className="eyebrow mb-6">Start Here</p>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
          <h2
            className="font-display font-semibold text-cream mx-auto mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.0, maxWidth: '800px' }}
          >
            Are you shaping your life on purpose —{' '}
            <em className="text-gold">or is someone else shaping it for you?</em>
          </h2>
          <p className="font-body text-cream/55 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            The conversation is already happening. In your organization. Your family.
            Your campus. Your daily choices. The question is whether you are building
            consciously — or by default.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/conversations" className="btn-gold">
              Read the Conversations
            </Link>
            <Link href="/contact" className="btn-ghost">
              Bring Sir Anthony to Your Context
            </Link>
          </div>
        </AnimatedSection>

        {/* Bottom signature */}
        <AnimatedSection delay={300} className="mt-16 pt-12 border-t border-gold/10">
          <p className="font-display italic text-cream/30 text-lg">
            &ldquo;Culture is built in the small ignored things. And the most important thing
            I know about Africa is that there are millions of people doing those small things
            faithfully, daily, without recognition. They are the architects.
            The continent is their project.&rdquo;
          </p>
          <p className="font-body text-gold/50 text-xs uppercase tracking-widest mt-4">
            — Sir Anthony
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
