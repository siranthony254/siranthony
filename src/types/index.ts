// ─── Shared ──────────────────────────────────────────────────────
export interface SanitySlug { current: string }
export interface SanityImage {
  asset: { _id: string; url: string }
  alt?: string
  caption?: string
}

// ─── Author ──────────────────────────────────────────────────────
export interface Author {
  name: string
  bio?: string
  image?: { asset: { url: string }; alt?: string }
  role?: string
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
  featured?: boolean
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

// ─── Gallery ─────────────────────────────────────────────────────
export type GalleryCategory = 'events' | 'speaking' | 'media' | 'personal' | 'professional'

export interface GalleryImage {
  image: SanityImage
  category?: GalleryCategory
  order?: number
}

export interface Gallery {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  heroImage: SanityImage
  heroTitle: string
  heroSubtitle?: string
  images: GalleryImage[]
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
  workHeroImage?: SanityImage
  homepageHeroImage?: SanityImage
}

// ─── Portfolio Types ───────────────────────────────────────────────
export interface WebDevelopment {
  _id: string
  title: string
  slug: { _type: 'slug'; current: string }
  description: string
  category: 'shipped' | 'demo'
  projectUrl: string
  githubUrl?: string
  technologies: string[]
  thumbnail?: SanityImage
  featured: boolean
  order?: number
}

export interface CaseStudy {
  _id: string
  title: string
  slug: { _type: 'slug'; current: string }
  client: string
  heroImage?: SanityImage
  challenge: string
  culturalThinking: string
  execution: string
  outcome: string
  projectUrl?: string
  additionalResources: {
    title: string
    description: string
    url: string
    type: 'document' | 'link' | 'video' | 'image'
  }[]
  documentUpload?: { asset: { _id: string; url: string } }
  featured: boolean
  order?: number
}

export interface IntellectualWork {
  _id: string
  title: string
  slug: { _type: 'slug'; current: string }
  category: string
  customCategory?: string
  description: string
  content: string
  publishedDate: string
  externalUrl?: string
  document?: { asset: { _id: string; url: string } }
  thumbnail?: SanityImage
  featured: boolean
  order?: number
  tags: string[]
}
