import type { Metadata } from 'next'
import { HeroSection }          from '@/components/sections/HeroSection'
import { ImpactNumbersSection } from '@/components/sections/ImpactNumbers'
import { OriginStory }          from '@/components/sections/OriginStory'
import { SignatureQuestion }    from '@/components/sections/SignatureQuestion'
import { FeaturedPosts }        from '@/components/sections/FeaturedPosts'
import { TestimonialStrip }     from '@/components/sections/HomeSections'
import { Ventures }             from '@/components/sections/Ventures'
import { HomeCTA }              from '@/components/sections/HomeCTA'
import { sanityFetch }          from '@/lib/sanity'
import { withoutHiddenMicdupStats } from '@/lib/utils'
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
    "Who made you normal? Sir Anthony is a conversationalist and cultural thinker in Nairobi, helping people, organisations and campuses build culture on purpose.",
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
  // HIDDEN: Mic'd Up — withoutHiddenMicdupStats drops the Mic'd Up stat while it is hidden.
  const impactNumbers  = withoutHiddenMicdupStats(data?.impactNumbers)

  return (
    <>
      <HeroSection siteSettings={siteSettings} />
      <OriginStory />
      <SignatureQuestion />
      <FeaturedPosts posts={posts} />
      <ImpactNumbersSection data={impactNumbers} />
      <TestimonialStrip testimonials={testimonials} />
      <Ventures />
      <HomeCTA />
    </>
  )
}
