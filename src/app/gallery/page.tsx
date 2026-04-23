import type { Metadata } from 'next'
import { GalleryHero } from '@/components/sections/GalleryHero'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { sanityFetch } from '@/lib/sanity'
import { GALLERY_QUERY } from '@/lib/queries'
import type { Gallery } from '@/types'

export const metadata: Metadata = {
  title: 'Gallery - Sir Anthony',
  description: 'Visual moments from speaking engagements, events, and cultural conversations.',
}

export default async function GalleryPage() {
  const galleries = await sanityFetch<Gallery[]>(GALLERY_QUERY)

  // Debug: Log gallery data
  console.log('Gallery data:', galleries)
  console.log('Gallery count:', galleries?.length)

  return (
    <>
      <GalleryHero galleries={galleries} />
      <GalleryGrid galleries={galleries} />
    </>
  )
}
