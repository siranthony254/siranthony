import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui'
import Link from 'next/link'
import { Phone, Mail, MapPin, MonitorSmartphone } from 'lucide-react'
// HIDDEN: Mic'd Up — add Globe back to the import above when restoring the Mic'd Up contact card.

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Sir Anthony for speaking engagements, cultural training, cultural advisory, or to bring the conversation to your context.',
}

const CONTACT_EMAIL = 'officialsiranthony@gmail.com'

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: 'Speaking, training & bookings',
    value: '+254 741 518 589',
    href: 'tel:+254741518589',
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  // HIDDEN: Mic'd Up — uncomment to show this contact card again.
  // {
  //   icon: Globe,
  //   label: "Mic'd Up Initiative (campus partnerships)",
  //   value: 'micdupinitiative.site',
  //   href: 'https://micdupinitiative.site',
  //   external: true,
  // },
  {
    icon: MonitorSmartphone,
    label: 'Websites & digital projects',
    value: 'REALWINNERS DIGITAL →',
    href: 'https://realwinners.co.ke/contact',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Nairobi, Kenya',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Header — quiet on purpose. Nobody needs a billboard to say hello. */}
      <section className="pt-32 pb-12 bg-navy">
        <div className="container-site">
          <AnimatedSection direction="in">
            <div className="max-w-2xl">
              <h1 className="font-display font-semibold text-cream text-3xl md:text-4xl mb-4 leading-tight">
                Start the <em className="text-gold">conversation.</em>
              </h1>
              <p className="font-body text-cream/60 leading-relaxed">
                A talk, a training programme, something ongoing, or you are not yet sure
                what you need — all of it starts the same way. Tell me where you are.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section-pad bg-navy/95">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left — contact info */}
            <AnimatedSection className="lg:col-span-2 space-y-8">
              <div>
                <p className="eyebrow mb-4">Reach Out Directly</p>
                <div className="w-6 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
              </div>

              <div className="space-y-5">
                {CONTACT_ITEMS.map(item => {
                  const Icon = item.icon
                  const content = (
                    <div className="card-navy p-5 flex items-start gap-4 group">
                      <div className="w-9 h-9 rounded-lg border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition-colors">
                        <Icon size={15} className="text-gold/60 group-hover:text-gold transition-colors" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-cream/35 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-display text-lg text-cream group-hover:text-gold transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )

                  if (!item.href) return <div key={item.label}>{content}</div>

                  return item.external ? (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <a key={item.label} href={item.href}>{content}</a>
                  )
                })}
              </div>

              {/* Signature question */}
              <div className="card-navy p-6 mt-6">
                <div className="w-5 h-px bg-gradient-to-r from-gold to-transparent mb-4" />
                <p className="font-display italic text-gold/80 text-base leading-relaxed mb-3">
                  &ldquo;Who made you normal? That&apos;s the question. That&apos;s the work.&rdquo;
                </p>
                <p className="font-body text-xs text-cream/30 uppercase tracking-widest">
                  — Sir Anthony
                </p>
              </div>
            </AnimatedSection>

            {/* Right — two ways to talk. Plainly described, not tiered. */}
            <AnimatedSection delay={150} direction="in" className="lg:col-span-3 space-y-8">
              <div>
                <p className="eyebrow mb-4">Book a Time</p>
                <div className="w-6 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-gold/30 pl-6 py-1">
                  <h3 className="font-display text-2xl font-semibold text-cream mb-2">
                    A first conversation
                  </h3>
                  <p className="font-body text-cream/60 leading-relaxed mb-4">
                    Half an hour, online, no charge. You tell me where you are and what you
                    are actually trying to do. If I am not the right person for it, I will
                    say so and point you somewhere better.
                  </p>
                  <a
                    href="https://calendly.com/officialsiranthony/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-gold hover:text-gold-light transition-colors border-b border-gold/30 hover:border-gold pb-0.5"
                  >
                    Find a time →
                  </a>
                </div>

                <div className="border-l-2 border-gold/15 pl-6 py-1">
                  <h3 className="font-display text-2xl font-semibold text-cream mb-2">
                    A longer working session
                  </h3>
                  <p className="font-body text-cream/60 leading-relaxed mb-4">
                    A full hour, $10, for when you already know the problem and want to go
                    at it properly — the culture inside a team, the language a brand is
                    using, a decision you keep circling. We work, we do not present.
                  </p>
                  <a
                    href="https://calendly.com/officialsiranthony/1-hour-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-gold hover:text-gold-light transition-colors border-b border-gold/30 hover:border-gold pb-0.5"
                  >
                    Find a time →
                  </a>
                </div>
              </div>

              <p className="font-body text-sm text-cream/40 leading-relaxed pt-2">
                If neither fits, call or write. I read everything that comes in. Looking for a
                website or digital strategy? That work is handled by my studio,{' '}
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
        </div>
      </section>

      {/* Testimonials are asked for here, where people who have worked with me arrive. */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream mb-4">
              Share your experience
            </h2>
            <p className="font-body text-cream/55 text-lg max-w-2xl mx-auto mb-8">
              Attended a talk, a training or a conversation? A few lines about what changed for you
              help others decide whether this work is for them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Testimonial`}
                className="btn-gold"
              >
                <Mail size={16} /> Send a testimonial
              </a>
              <Link href="/speaking" className="btn-ghost">
                Speaking &amp; training
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
