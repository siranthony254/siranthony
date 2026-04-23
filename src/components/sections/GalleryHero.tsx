import Image from 'next/image'
import type { Gallery } from '@/types'

interface GalleryHeroProps { galleries: Gallery[] }

export function GalleryHero({ galleries }: GalleryHeroProps) {
  // Use the first gallery for hero content, or fallback
  const heroGallery = galleries?.[0]
  
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroGallery?.heroImage?.asset?.url && (
        <div className="absolute inset-0">
          <Image
            src={heroGallery.heroImage.asset.url}
            alt={heroGallery.heroImage.alt || heroGallery.heroTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-6 leading-tight">
            {heroGallery?.heroTitle || 'Gallery'}
          </h1>
          {heroGallery?.heroSubtitle && (
            <p className="font-body text-lg md:text-xl text-cream/90 max-w-2xl mx-auto leading-relaxed">
              {heroGallery.heroSubtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  )
}
