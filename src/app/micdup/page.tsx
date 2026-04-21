import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine, RippleCircles } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity'
import { MICDUP_EVENTS_QUERY } from '@/lib/queries'
import { formatDateShort } from '@/lib/utils'
import type { MicdupEvent } from '@/types'

export const metadata: Metadata = {
  title: "Mic'd Up Initiative",
  description:
    "Africa has the youngest population on earth. Mic'd Up Initiative exists to ensure the formation of that generation happens with intention — discovering voices, shaping leaders, building responsible cultural influence on campuses across Africa.",
}

const PILLARS = [
  {
    num: '01',
    title: 'Discover',
    body: 'Every campus has talent that no one has yet found a container for. Perspectives that deserve a platform. Stories that need to be told. We find them.',
    color: 'text-gold',
  },
  {
    num: '02',
    title: 'Shape',
    body: 'Formation that develops the particular kind of leaders the next generation needs — people of character, courage, and genuine competence. Not the leaders of the last generation.',
    color: 'text-gold',
  },
  {
    num: '03',
    title: 'Build',
    body: 'Responsible cultural influence. Because the digital tools this generation holds are the most powerful any generation has ever had — and power without responsibility is the most dangerous force in any community.',
    color: 'text-gold',
  },
]

const EVENT_TYPE_LABELS: Record<string, string> = {
  talk:     'Talk',
  panel:    'Panel',
  summit:   'Summit',
  debate:   'Debate',
  workshop: 'Workshop',
}

export default async function MicdupPage() {
  const events = await sanityFetch<MicdupEvent[]>(MICDUP_EVENTS_QUERY)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden pt-24"
        style={{ background: 'linear-gradient(135deg, #0A2240 0%, #0D1B2A 60%, #080F18 100%)' }}>

        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 70% 30%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

        <div className="container-site py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="space-y-7">
              <div>
                <p className="eyebrow mb-5">Mic&apos;d Up Initiative</p>
                <GoldLine className="mb-7" />
                <h1 className="font-display font-semibold text-cream leading-tight"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  Discovering voices.
                  <br />
                  <em className="text-gold">Shaping leaders.</em>
                  <br />
                  Building influence.
                </h1>
              </div>
              <p className="font-body text-cream/55 text-xl leading-relaxed max-w-lg">
                Africa has the youngest population on earth. More than 400 million
                people between 15 and 35 — being formed right now, on campuses
                across the continent. Mic&apos;d Up exists to ensure that formation
                happens with intention.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://micdupinitiative.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Visit the Initiative <ExternalLink size={14} />
                </a>
                <Link href="/contact" className="btn-ghost">
                  Partner With Us
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} className="hidden lg:flex justify-center">
              <div className="relative">
                <RippleCircles />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display text-5xl font-semibold text-gold">400M+</p>
                    <p className="font-body text-xs text-cream/40 uppercase tracking-widest mt-1">
                      African youth 15–35
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="section-pad bg-navy/95">
        <div className="container-site">
          <SectionHeader
            eyebrow="What We Do"
            title="Three commitments"
            subtitle="Every activity, every event, every conversation at Mic'd Up Initiative exists to serve one of three purposes."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <AnimatedSection key={p.num} delay={i * 120}>
                <div className="card-navy p-8 h-full group">
                  <p className="font-display text-6xl font-light text-gold/15 group-hover:text-gold/30 transition-colors duration-300 mb-5 leading-none">
                    {p.num}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-cream mb-4">{p.title}</h3>
                  <div className="w-8 h-px bg-gold/40 mb-5 group-hover:w-14 transition-all duration-300" />
                  <p className="font-body text-cream/55 leading-relaxed">{p.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* The vision statement */}
      <section className="section-pad relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A2240 0%, #0D1B2A 100%)' }}>
        <div className="container-site max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10" />
            <p className="font-display italic text-cream/80 leading-relaxed"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
              &ldquo;The student who learns on campus that intellectual courage — holding an
              unpopular position under genuine scrutiny — is worth practicing, carries that
              capacity into every institution they subsequently inhabit. Campus culture matters
              because it forms habits of mind at exactly the stage when those habits are most
              malleable.&rdquo;
            </p>
            <p className="font-body text-gold/60 text-xs uppercase tracking-widest mt-8">
              — Sir Anthony, Founder
            </p>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-10" />
          </AnimatedSection>
        </div>
      </section>

      {/* Events / Activities */}
      {events?.length > 0 && (
        <section className="section-pad bg-navy">
          <div className="container-site">
            <SectionHeader
              eyebrow="Activities"
              title="On the ground"
              subtitle="Talks, panels, summits, debates, and workshops — the work happening on campuses across Africa."
              className="mb-14"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <AnimatedSection key={event._id} delay={i * 80}>
                  <div className="card-navy overflow-hidden h-full flex flex-col">
                    {event.image?.asset?.url && (
                      <div className="relative h-44 overflow-hidden flex-shrink-0">
                        <Image
                          src={event.image.asset.url}
                          alt={event.image.alt || event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/25 text-xs font-body">
                          {EVENT_TYPE_LABELS[event.type] || event.type}
                        </span>
                        <span className="font-body text-xs text-cream/30">
                          {formatDateShort(event.date)}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-cream mb-2 leading-snug flex-1">
                        {event.title}
                      </h3>
                      <p className="font-body text-xs text-cream/40 mb-3">{event.location}</p>
                      {event.description && (
                        <p className="font-body text-sm text-cream/50 leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner / get involved */}
      <section className="section-pad bg-navy border-t border-gold/10">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="eyebrow mb-5">Get Involved</p>
              <GoldLine className="mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6 leading-tight">
                The door
                <em className="text-gold block">is open.</em>
              </h2>
              <p className="font-body text-cream/55 text-lg leading-relaxed mb-8">
                If you are on a campus, connected to one, leading an institution that
                serves young people, or building something for this generation — this
                conversation is worth being part of.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://micdupinitiative.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Visit Mic&apos;d Up <ExternalLink size={14} />
                </a>
                <Link href="/contact" className="btn-ghost">
                  Partner With Us <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="card-navy p-8 space-y-6">
                <p className="eyebrow">Who should get involved</p>
                {[
                  'Campus student bodies and associations',
                  'University administrators and chaplains',
                  'Churches and faith communities serving youth',
                  'Organizations developing young professionals',
                  'NGOs and institutions focused on youth leadership',
                  'Corporates building campus-to-career pipelines',
                  'Individuals with a voice worth developing',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <p className="font-body text-sm text-cream/60 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
