import Image from 'next/image'
import type { SiteSettings } from '@/types'

interface WorkHeroProps { siteSettings: SiteSettings | null }

export function WorkHero({ siteSettings }: WorkHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {siteSettings?.workHeroImage?.asset?.url && (
        <div className="absolute inset-0">
          <Image
            src={siteSettings.workHeroImage.asset.url}
            alt={siteSettings.workHeroImage.alt || 'Work With Me'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
      )}
      
      {/* Fallback background if no image */}
      {!siteSettings?.workHeroImage?.asset?.url && (
        <div className="absolute inset-0 bg-navy" />
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-6 leading-tight">
            Work With Me
          </h1>
          
          <div className="space-y-4 text-lg md:text-xl text-cream/90 max-w-3xl mx-auto leading-relaxed">
            <p className="font-medium">Three layers.</p>
            <p className="font-medium">One integrated mission.</p>
            <p className="font-medium">Cultural intelligence. Practical training. Digital architecture.</p>
            <p className="font-medium">
              Built together because they are expressions of the same thinking — helping organizations understand how their culture is built and shape it deliberately.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  )
}
