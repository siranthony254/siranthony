import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/HeroSection'
import { SignatureQuestion }   from '@/components/sections/SignatureQuestion'
import { FeaturedPosts }       from '@/components/sections/FeaturedPosts'
import { ServicesPreview }     from '@/components/sections/ServicesPreview'
import { MicdupBanner }        from '@/components/sections/MicdupBanner'
import { HomeCTA }             from '@/components/sections/HomeCTA'
import { sanityFetch }         from '@/lib/sanity'
import {
  FEATURED_POSTS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
} from '@/lib/queries'
import type { Post, Service, Testimonial } from '@/types'

export const metadata: Metadata = {
  title: 'Sir Anthony — Conversationalist & Cultural Thinker',
  description:
    'Who made you normal? Sir Anthony is a Kenyan cultural thinker, conversationalist, and founder of Mic\'d Up Initiative — helping individuals, organizations, and institutions understand how culture is built and build something deliberately better.',
}

export default async function HomePage() {
  const [posts, services, testimonials] = await Promise.all([
    sanityFetch<Post[]>(FEATURED_POSTS_QUERY),
    sanityFetch<Service[]>(SERVICES_QUERY),
    sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY),
  ])

  return (
    <>
      <HeroSection />
      <SignatureQuestion />
      <FeaturedPosts posts={posts} />
      <ServicesPreview services={services} />
      <MicdupBanner />
      <HomeCTA />
    </>
  )
}
