import type { Metadata } from 'next'
import { HeroSection }          from '@/components/sections/HeroSection'
import { ImpactNumbersSection } from '@/components/sections/ImpactNumbers'
import { OriginStory }          from '@/components/sections/OriginStory'
import { SignatureQuestion }    from '@/components/sections/SignatureQuestion'
import { FeaturedPosts }        from '@/components/sections/FeaturedPosts'
import { TestimonialStrip }     from '@/components/sections/HomeSections'
import { MicdupBanner }         from '@/components/sections/MicdupBanner'
import { HomeCTA }              from '@/components/sections/HomeCTA'
import { sanityFetch }          from '@/lib/sanity'
import {
  FEATURED_POSTS_QUERY,
  TESTIMONIALS_QUERY,
  SITE_SETTINGS_QUERY,
  IMPACT_NUMBERS_QUERY,
} from '@/lib/queries'
import type { Post, Testimonial, SiteSettings, ImpactNumbers } from '@/types'

export const metadata: Metadata = {
  title: 'Sir Anthony — Conversationalist & Cultural Thinker',
  description:
    "Who made you normal? Nobody announces a culture. It gets built quietly, out of small repeated choices, until it is simply what everyone knows to be true. I am Sir Anthony — a conversationalist and cultural thinker in Nairobi, and founder of Mic'd Up Initiative. I work with people, organisations, and campuses on seeing the culture they are already building, and building it on purpose instead.",
}

export const revalidate = 60

export default async function HomePage() {
  const HOME_COMBINED_QUERY = `{
    "featuredPosts": ${FEATURED_POSTS_QUERY},
    "testimonials": ${TESTIMONIALS_QUERY},
    "siteSettings": ${SITE_SETTINGS_QUERY},
    "impactNumbers": ${IMPACT_NUMBERS_QUERY}
  }`

  const data = await sanityFetch<{
    featuredPosts: Post[]
    testimonials: Testimonial[]
    siteSettings: SiteSettings
    impactNumbers: ImpactNumbers
  }>(HOME_COMBINED_QUERY)

  const posts          = data?.featuredPosts || []
  const testimonials   = data?.testimonials || []
  const siteSettings   = data?.siteSettings
  const impactNumbers  = data?.impactNumbers

  return (
    <>
      <HeroSection siteSettings={siteSettings} />
      <OriginStory />
      <SignatureQuestion />
      <FeaturedPosts posts={posts} />
      <ImpactNumbersSection data={impactNumbers} />
      <TestimonialStrip testimonials={testimonials} />
      <MicdupBanner />
      <HomeCTA />
    </>
  )
}
