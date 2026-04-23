'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { AnimatedSection } from '@/components/ui'
import type { Gallery } from '@/types'

interface GalleryGridProps { galleries: Gallery[] }

export function GalleryGrid({ galleries }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string; caption?: string } | null>(null)
  
  // Flatten all images from all galleries
  const allImages = galleries?.flatMap(gallery => 
    gallery.images?.map((img, index) => ({
      ...img,
      galleryTitle: gallery.title,
      id: `${gallery._id}-${index}`
    })) || []
  ) || []

  if (!allImages.length) {
    return (
      <section className="section-pad">
        <div className="container-site text-center">
          <p className="text-cream/60 text-lg">No gallery images available yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allImages.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 100}>
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-lg card-navy"
                onClick={() => setSelectedImage({
                  url: item.image.asset.url,
                  alt: item.image.alt || '',
                  caption: item.image.caption
                })}
              >
                <div className="aspect-square relative">
                  <Image
                    src={item.image.asset.url}
                    alt={item.image.alt || ''}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                  </div>
                </div>
                {item.image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/90 to-transparent">
                    <p className="text-cream text-sm font-body">{item.image.caption}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-navy/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              className="absolute top-4 right-4 text-cream hover:text-gold transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              title="Close image view"
              aria-label="Close image view"
            >
              <X size={32} />
            </button>
            <div className="relative aspect-video">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            {selectedImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy to-transparent">
                <p className="text-cream text-lg font-body">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
