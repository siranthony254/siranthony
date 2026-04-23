// ─── Posts / Conversations ──────────────────────────────────────
export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt, category,
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

export const FEATURED_POSTS_QUERY = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, publishedAt, category, featured,
    mainImage { asset->{ _id, url }, alt }
  }
`

// Test query to verify Sanity connection
export const TEST_POSTS_QUERY = `
  *[_type == "post"][0...3] {
    _id, title, featured
  }
`

// ─── Gallery ───────────────────────────────────────────────
export const GALLERY_QUERY = `
  *[_type == "gallery"] | order(order asc) {
    _id, title, slug, description,
    heroImage { asset->{ _id, url }, alt },
    heroTitle, heroSubtitle,
    images[] {
      image { asset->{ _id, url }, alt, caption },
      category, order
    },
    seo { metaTitle, metaDescription, ogImage { asset->{ url } } }
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
    workHeroImage { asset->{ _id, url }, alt }
  }
`
