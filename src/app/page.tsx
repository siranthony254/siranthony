import type { Metadata } from 'next'
import { HeroSection }          from '@/components/sections/HeroSection'
import { ImpactNumbersSection } from '@/components/sections/ImpactNumbers'
import { SignatureQuestion }    from '@/components/sections/SignatureQuestion'
import { FeaturedPosts }        from '@/components/sections/FeaturedPosts'
import { ServicesPreview }      from '@/components/sections/ServicesPreview'
import { MicdupBanner }         from '@/components/sections/MicdupBanner'
import { HomeCTA }              from '@/components/sections/HomeCTA'
import { sanityFetch }          from '@/lib/sanity'
import {
  FEATURED_POSTS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  TEST_POSTS_QUERY,
  SITE_SETTINGS_QUERY,
  IMPACT_NUMBERS_QUERY,
} from '@/lib/queries'
import type { Post, Service, Testimonial, SiteSettings, ImpactNumbers } from '@/types'

export const metadata: Metadata = {
  title: 'Sir Anthony — Conversationalist, Cultural Architect & Digital Content Strategist',
  description:
    "Who made you normal? Sir Anthony is a Digital Content Strategist, Conversationalist, and Cultural Architect, helping individuals, organizations, and institutions understand how culture is built through the smallest and almost ignored repeated choices and ultimately build something deliberately better. He is also the founder of Mic'd Up Initiative, which seeks to influence the culture around young people in institutions of higher learning through conversations, mentorship, community building and purposeful media.",
}

export default async function HomePage() {
  const HOME_COMBINED_QUERY = `{
    "featuredPosts": ${FEATURED_POSTS_QUERY},
    "services": ${SERVICES_QUERY},
    "testimonials": ${TESTIMONIALS_QUERY},
    "testPosts": ${TEST_POSTS_QUERY},
    "siteSettings": ${SITE_SETTINGS_QUERY},
    "impactNumbers": ${IMPACT_NUMBERS_QUERY}
  }`

  const data = await sanityFetch<{
    featuredPosts: Post[]
    services: Service[]
    testimonials: Testimonial[]
    testPosts: any[]
    siteSettings: SiteSettings
    impactNumbers: ImpactNumbers
  }>(HOME_COMBINED_QUERY)

  const posts          = data?.featuredPosts || []
  const services       = data?.services || []
  const testimonials   = data?.testimonials || []
  const testPosts      = data?.testPosts || []
  const siteSettings   = data?.siteSettings
  const impactNumbers  = data?.impactNumbers

  // Debug: Log the featured posts data
  console.log('Featured posts data:', posts)
  console.log('Featured posts count:', posts?.length)
  console.log('Test posts data:', testPosts)
  console.log('Sanity config:', {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

  return (
    <>
      <HeroSection siteSettings={siteSettings} />
      <ImpactNumbersSection data={impactNumbers} />
      <SignatureQuestion />
      <FeaturedPosts posts={posts} />
      <ServicesPreview services={services} />
      <MicdupBanner />
      <HomeCTA />
    </>
  )
}
