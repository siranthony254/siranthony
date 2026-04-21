// ─── Shared ──────────────────────────────────────────────────────
export interface SanitySlug { current: string }
export interface SanityImage {
  asset: { _id: string; url: string }
  alt?: string
}

// ─── Author ──────────────────────────────────────────────────────
export interface Author {
  name: string
  bio?: string
  image?: { asset: { url: string } }
}

// ─── Post ────────────────────────────────────────────────────────
export type PostCategory =
  | 'culture'
  | 'individual'
  | 'leadership'
  | 'education'
  | 'ideas'
  | 'family'
  | 'political'

export interface Post {
  _id: string
  title: string
  slug: SanitySlug
  excerpt: string
  publishedAt: string
  category: PostCategory
  estimatedReadingTime?: number
  mainImage?: SanityImage
  author?: Author
  body?: unknown[] // PortableText
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: { asset: { url: string } }
  }
}

// ─── Service ─────────────────────────────────────────────────────
export interface Service {
  _id: string
  title: string
  description: string
  icon: string
  features: string[]
  cta: string
  order: number
}

// ─── Speaking Topic ──────────────────────────────────────────────
export interface SpeakingTopic {
  _id: string
  title: string
  description: string
  duration: string
  audience: string
  order: number
}

// ─── Testimonial ─────────────────────────────────────────────────
export interface Testimonial {
  _id: string
  quote: string
  author: string
  role: string
  organization: string
  image?: { asset: { url: string } }
  order: number
}

// ─── Mic'd Up Event ──────────────────────────────────────────────
export type EventType = 'talk' | 'panel' | 'summit' | 'debate' | 'workshop'

export interface MicdupEvent {
  _id: string
  title: string
  description: string
  date: string
  location: string
  type: EventType
  image?: SanityImage
  recap?: string
}

// ─── Site Settings ───────────────────────────────────────────────
export interface SiteSettings {
  siteTitle: string
  tagline: string
  description: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    tiktok?: string
    youtube?: string
    instagram?: string
    facebook?: string
  }
  contactEmail: string
  contactPhone: string
  contactPhoneAlt?: string
}
