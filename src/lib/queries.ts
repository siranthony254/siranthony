// ─── Posts / Conversations ──────────────────────────────────────
export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt, category, featured,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
    mainImage { asset->{ _id, url }, alt },
    author->{ name, image { asset->{ url } } }
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, publishedAt, category, body,
    mainImage { asset->{ _id, url }, alt },
    author->{ name, bio, image { asset->{ url } } },
    seo { metaTitle, metaDescription, ogImage { asset->{ url } } }
  }
`

export const RELATED_POSTS_QUERY = `
  *[_type == "post" && category == $category && slug.current != $slug]
    | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, publishedAt, category,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
    mainImage { asset->{ _id, url }, alt }
  }
`

export const FEATURED_POSTS_QUERY = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, publishedAt, category, featured,
    mainImage { asset->{ _id, url }, alt }
  }
`

// ─── Video Conversations ──────────────────────────
export const VIDEO_CONVERSATIONS_QUERY = `
  *[_type == "videoConversation"] | order(order asc, publishedAt desc) {
    _id, title, embedLink, description, category, recordedAt,
    publishedAt, featured, order
  }
`

// ─── Author ─────────────────────────────────────────────────
export const AUTHOR_QUERY = `
  *[_type == "author"][0] {
    _id, name, slug, bio, role,
    image { asset->{ _id, url }, alt }
  }
`

// ─── Body of Work ──────────────────────────────
export const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy"] | order(order asc) {
    _id, title, slug, client, heroImage { asset->{ _id, url }, alt },
    challenge, culturalThinking, execution, outcome, projectUrl,
    additionalResources[] {
      title, description, url, type
    }, documentUpload { asset->{ _id, url } }, featured, order
  }
`

export const INTELLECTUAL_WORK_QUERY = `
  *[_type == "intellectualWork"] | order(order asc) {
    _id, title, slug, category, customCategory, description, content,
    publishedDate, externalUrl, document { asset->{ _id, url } },
    thumbnail { asset->{ _id, url }, alt }, featured, order, tags
  }
`

export const INTELLECTUAL_WORK_CATEGORIES_QUERY = `
  *[_type == "intellectualWork"] {
    category, customCategory
  } | distinct(category, customCategory)
`

// ─── Ebooks ──────────────────────────────────
// The `pdf` field is never projected into anything the browser can see.
// It is read server-side only, in src/lib/purchases.ts.
export const EBOOKS_QUERY = `
  *[_type == "ebook"] | order(order asc, publishedDate desc) {
    _id, title, slug, subtitle, description, priceKes, forSale,
    pageCount, publishedDate, featured, order,
    coverImage { asset->{ _id, url }, alt }
  }
`

export const EBOOK_BY_SLUG_QUERY = `
  *[_type == "ebook" && slug.current == $slug][0] {
    _id, title, slug, subtitle, description, priceKes, forSale,
    pageCount, publishedDate, contents, preview,
    coverImage { asset->{ _id, url }, alt }
  }
`

export const EBOOK_SLUGS_QUERY = `
  *[_type == "ebook" && defined(slug.current)].slug.current
`

// ─── Gallery ───────────────────────────────────────────────
export const GALLERY_QUERY = `
  *[_type == "gallery"] {
    _id, title, slug, description,
    heroImage { asset->{ _id, url }, alt },
    heroTitle, heroSubtitle,
    images[] {
      image { asset->{ _id, url }, alt, caption },
      category, order
    }
  }
`

// ─── Speaking / Services ─────────────────────────────────────────
export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id, title, description, icon, features, cta
  }
`

export const SPEAKING_TOPICS_QUERY = `
  *[_type == "speakingTopic"] | order(order asc) {
    _id, title, description, duration, audience
  }
`

// ─── Testimonials ────────────────────────────────────────────────
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, author, role, organization,
    image { asset->{ url } }
  }
`

// ─── Mic'd Up Initiative ─────────────────────────────────────────
export const MICDUP_EVENTS_QUERY = `
  *[_type == "micdupEvent"] | order(date desc) {
    _id, title, description, date, location, type,
    image { asset->{ _id, url }, alt },
    recap
  }
`

// ─── Site Settings ───────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteTitle, tagline, description,
    socialLinks { twitter, linkedin, tiktok, youtube, instagram, facebook },
    contactEmail, contactPhone, contactPhoneAlt,
    workHeroImage { asset->{ _id, url }, alt },
    homepageHeroImage { asset->{ _id, url }, alt }
  }
`

// ─── FAQ ─────────────────────────────────────────────────────────
export const FAQ_QUERY = `
  *[_type == "faq"] | order(order asc) {
    _id, question, answer, category, order
  }
`

// ─── Impact Numbers ───────────────────────────────────────────────
export const IMPACT_NUMBERS_QUERY = `
  *[_type == "impactNumbers"][0] {
    speaking {
      speakingEngagements, eventsFacilitated, campusesEngaged,
      workshopsFacilitated, conversationsDone
    },
    impactMovements[] { label, value }
  }
`
