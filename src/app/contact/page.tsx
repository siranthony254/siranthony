import type { Metadata } from 'next'
import { AnimatedSection, GoldLine } from '@/components/ui'
import { Phone, Globe, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Sir Anthony for speaking engagements, cultural training, digital strategy, or to bring the conversation to your context.',
}

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: 'Conversations & Speaking',
    value: '+254 741 518 589',
    href: 'tel:+254741518589',
  },
  {
    icon: Phone,
    label: 'Digital Strategy & Web',
    value: '+254 727 974 516',
    href: 'tel:+254727974516',
  },
  {
    icon: Globe,
    label: "Mic'd Up Initiative",
    value: 'micdupinitiative.site',
    href: 'https://micdupinitiative.site',
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
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 65%)' }} />
        <div className="container-site relative z-10 text-center">
          <AnimatedSection>
            <p className="eyebrow mb-5">Contact</p>
            <GoldLine className="mb-7 mx-auto" />
            <h1 className="font-display font-semibold text-cream mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Start the
              <em className="text-gold"> conversation.</em>
            </h1>
            <p className="font-body text-cream/55 text-xl leading-relaxed max-w-xl mx-auto">
              Whether you want a keynote, a training program, a digital strategy
              engagement, or you are simply not yet sure — the conversation starts here.
            </p>
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

            {/* Right — call scheduling */}
            <AnimatedSection delay={150} className="lg:col-span-3 space-y-8">
              <div>
                <p className="eyebrow mb-4">Schedule a Session</p>
                <div className="w-6 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 30 Mins Free Call */}
                <div className="card-navy p-6 flex flex-col justify-between group border border-gold/10 hover:border-gold/30 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-body text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/25">
                        Discovery
                      </span>
                      <span className="font-display font-semibold text-lg text-cream">
                        Free
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold transition-colors">
                        Free Call
                      </h3>
                      <p className="font-body text-xs text-cream/40 mt-1">
                        30 minutes · Online Meeting
                      </p>
                    </div>
                    <p className="font-body text-cream/60 text-sm leading-relaxed">
                      A discovery conversation — understanding your context, challenge, and how we might work together.
                    </p>
                  </div>
                  <div className="pt-6">
                    <a
                      href="https://calendly.com/officialsiranthony/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold text-sm w-full flex items-center justify-center gap-2"
                    >
                      Book Free Call
                    </a>
                  </div>
                </div>

                {/* 1 Hour Paid Call */}
                <div className="card-navy p-6 flex flex-col justify-between group border border-gold/15 hover:border-gold/45 transition-all duration-300 relative overflow-hidden">
                  {/* Subtle featured badge */}
                  <div className="absolute top-0 right-0 h-16 w-16 pointer-events-none">
                    <div className="absolute transform rotate-45 bg-gold text-[9px] font-body text-navy text-center font-bold py-1 right-[-35px] top-[15px] w-[120px]">
                      POPULAR
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-body text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/25">
                        Strategy
                      </span>
                      <span className="font-display font-semibold text-lg text-cream">
                        $10
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-cream group-hover:text-gold transition-colors">
                        Strategic Session
                      </h3>
                      <p className="font-body text-xs text-cream/40 mt-1">
                        1 hour · Custom Venue
                      </p>
                    </div>
                    <p className="font-body text-cream/60 text-sm leading-relaxed">
                      An intensive strategic deep dive. Focus on cultural alignment, brand architecture, or personal advisory.
                    </p>
                  </div>
                  <div className="pt-6">
                    <a
                      href="https://calendly.com/officialsiranthony/1-hour-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold text-sm w-full flex items-center justify-center gap-2"
                    >
                      Book Session ($10)
                    </a>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
