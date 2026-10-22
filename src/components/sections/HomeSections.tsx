import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { AnimatedSection, SectionHeader } from '@/components/ui'
import type { Testimonial } from '@/types'
import { isHiddenMicdup } from '@/lib/utils'

// ── TestimonialStrip ─────────────────────────────────────────────
interface TestimonialStripProps { testimonials: Testimonial[] }

export function TestimonialStrip({ testimonials: all }: TestimonialStripProps) {
  // HIDDEN: Mic'd Up — testimonials that mention Mic'd Up are filtered out while it is hidden.
  const testimonials = (all ?? []).filter(t => !isHiddenMicdup(t.quote, t.role, t.organization))
  if (testimonials.length === 0) {
    return null
  }

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
          {testimonials.slice(0, 3).map((t, i) => (
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
              Talk to me
            </Link>
          </div>
        </AnimatedSection>

        {/* Bottom signature */}
        <AnimatedSection delay={300} className="mt-16 pt-12 border-t border-gold/10">
          <p className="font-display italic text-cream/30 text-lg">
           Culture isn't handed down by elites alone. It's a living negotiation between millions of ordinary people, played out one choice at a time. 
           Every habit you normalize, every story you tell, every value you model in your daily life is a small vote for what the world becomes next.
          </p>
          <p className="font-body text-gold/50 text-xs uppercase tracking-widest mt-4">
            — Sir Anthony
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
