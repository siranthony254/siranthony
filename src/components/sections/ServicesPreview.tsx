import Link from 'next/link'
import { ArrowRight, BookOpen, Mic2, Globe, Users } from 'lucide-react'
import { AnimatedSection, SectionHeader } from '@/components/ui'
import type { Service } from '@/types'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  BookOpen, Mic2, Globe, Users,
}

const FALLBACK_SERVICES = [
  {
    _id: '1', icon: 'Mic2', order: 1,
    title: 'Cultural Conversations & Talks',
    description:
      'Keynotes, panels, and facilitated conversations that help audiences understand how culture is actually built — and what that means for how they lead, parent, teach, and live.',
    features: ['Keynote speaking', 'Panel facilitation', 'Community forums', 'University lectures'],
    cta: 'Book a Talk',
  },
  {
    _id: '2', icon: 'Users', order: 2,
    title: 'Cultural Training for Organizations',
    description:
      'Structured multi-session engagements that equip leadership teams and staff with the frameworks to understand and deliberately build their culture.',
    features: ['Cultural audit', 'Leadership workshops', 'Staff formation', 'Ongoing advisory'],
    cta: 'Start Training',
  },
  {
    _id: '3', icon: 'Globe', order: 3,
    title: 'Digital Strategy & Web Development',
    description:
      'Building digital presences that actually reflect what an organization stands for — websites, content strategy, and personal brand development built on cultural clarity.',
    features: ['Web development', 'Content strategy', 'Personal branding', 'Digital consulting'],
    cta: 'Build Together',
  },
  {
    _id: '4', icon: 'BookOpen', order: 4,
    title: 'Cultural Consulting & Advisory',
    description:
      'Ongoing advisory relationships with organizations actively building or rebuilding their culture — thinking partnership at the intersection of culture and strategy.',
    features: ['Ongoing retainer', 'Strategic advisory', 'Cultural design', 'Executive coaching'],
    cta: 'Explore Advisory',
  },
]

interface ServicesPreviewProps { services: Service[] }

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const displayServices = services?.length ? services : FALLBACK_SERVICES

  return (
    <section className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #0A2240 50%, #0D1B2A 100%)' }}>

      {/* Gold corner accent */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionHeader
            eyebrow="Work With Me"
            title="Three Layers of Work"
            subtitle="Cultural intelligence. Practical training. Digital architecture. Built together because they are expressions of the same thinking."
          />
          <AnimatedSection delay={200}>
            <Link href="/work" className="btn-ghost whitespace-nowrap self-start">
              Full Details <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayServices.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Mic2
            return (
              <AnimatedSection key={service._id} delay={i * 100}>
                <div className="card-navy p-8 h-full group">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg border border-gold/25 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                      <Icon size={18} className="text-gold/70 group-hover:text-gold transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-cream mb-2 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-body text-sm text-cream/55 leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 font-body text-xs text-cream/40">
                        <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-gold text-xs font-body font-medium tracking-wider uppercase group-hover:gap-3 transition-all duration-200"
                  >
                    {service.cta} <ArrowRight size={12} />
                  </Link>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
