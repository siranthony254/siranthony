import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { AnimatedSection, SectionHeader } from '@/components/ui'

// The organisations Sir Anthony founded. This is the only place the personal
// site talks about websites: the work itself lives at REALWINNERS DIGITAL.
const VENTURES = [
  // HIDDEN: Mic'd Up — uncomment this card and swap the heading text below back to the
  // two-venture version (also commented below) to show the movement again.
  // {
  //   label: 'The movement',
  //   name: "Mic'd Up Initiative",
  //   body:
  //     "A campus movement shaping how Africa's youngest generation thinks, speaks and leads. It discovers voices, forms leaders and builds responsible cultural influence where habits of mind are still being formed.",
  //   primary: { href: '/micdup', label: "Why I started Mic'd Up", external: false },
  //   secondary: { href: 'https://micdupinitiative.site', label: 'micdupinitiative.site', external: true },
  // },
  {
    label: 'The studio',
    name: 'REALWINNERS DIGITAL',
    body:
      "Your website is the first conversation your customers have with you. I founded REALWINNERS DIGITAL to make sure it's the right one: websites, portals and digital strategy that carry what a brand actually stands for.",
    primary: { href: 'https://realwinners.co.ke', label: 'Visit the studio', external: true },
    secondary: { href: 'https://realwinners.co.ke/services', label: 'Websites & digital services', external: true },
  },
] as const

const HEADING = {
  title: 'Ideas, put to work.',
  subtitle:
    'Culture is built in conversations. I founded a studio that builds those conversations on purpose, online.',
}
// HIDDEN: Mic'd Up — two-venture heading to restore with the Mic'd Up card:
// const HEADING = {
//   title: 'Two ventures, one conviction.',
//   subtitle: 'Culture is built in conversations. I founded two organisations that build it on purpose: one on campuses, one online.',
// }

export function Ventures({
  compact = false,
  eyebrow = "What I've built",
  title = HEADING.title,
  subtitle = HEADING.subtitle,
  id,
}: {
  compact?: boolean
  eyebrow?: string
  title?: string
  subtitle?: string
  id?: string
}) {
  return (
    <section id={id} className="section-pad bg-navy/95 border-y border-gold/10 scroll-mt-24">
      <div className="container-site">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          className={compact ? 'mb-10' : 'mb-14'}
        />

        <div className={VENTURES.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'grid grid-cols-1 gap-6 max-w-3xl'}>
          {VENTURES.map((v, i) => (
            <AnimatedSection key={v.name} delay={i * 120}>
              <article className="card-navy p-8 md:p-10 h-full flex flex-col">
                <p className="eyebrow mb-4">{v.label}</p>
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-cream mb-4 leading-tight">
                  {v.name}
                </h3>
                <div className="w-8 h-px bg-gold/40 mb-6" />
                <p className="font-body text-cream/65 leading-relaxed mb-8 flex-1">{v.body}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {v.primary.external ? (
                    <a href={v.primary.href} target="_blank" rel="noopener noreferrer" className="btn-gold">
                      {v.primary.label} <ExternalLink size={14} />
                    </a>
                  ) : (
                    <Link href={v.primary.href} className="btn-gold">
                      {v.primary.label} <ArrowRight size={14} />
                    </Link>
                  )}
                  <a
                    href={v.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-gold/70 hover:text-gold transition-colors border-b border-gold/25 hover:border-gold/60 pb-0.5"
                  >
                    {v.secondary.label} →
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
