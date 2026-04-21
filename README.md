# Sir Anthony — Personal Brand Site

A production-grade personal brand site for Sir Anthony, cultural thinker and conversationalist. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, and Sanity CMS.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | Next.js 14 (App Router)             |
| Language   | TypeScript (strict)                 |
| Styling    | Tailwind CSS + custom design system |
| Animation  | Framer Motion                       |
| CMS        | Sanity v3                           |
| Fonts      | Cormorant Garamond + DM Sans        |
| Deployment | Vercel                              |

---

## Pages

| Route            | Description                                    |
|------------------|------------------------------------------------|
| `/`              | Home — hero, pillars, posts, services, CTA    |
| `/about`         | Biography, philosophy, timeline                |
| `/conversations` | All posts with category filter                |
| `/conversations/[slug]` | Individual post with PortableText body  |
| `/work`          | Three service layers + speaking topics         |
| `/micdup`        | Mic'd Up Initiative — events, pillars, CTA    |
| `/contact`       | Contact form + direct phone contacts           |
| `/studio`        | Sanity CMS (protected in production)           |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token
NEXT_PUBLIC_SITE_URL=https://siranthony.com
STUDIO_USERNAME=admin
STUDIO_PASSWORD=choose_a_strong_password
```

### 3. Create a Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create a new project — name it `sir-anthony`
3. Copy the Project ID into `.env.local`
4. Create a token with Read permissions → copy into `SANITY_API_TOKEN`
5. Add `http://localhost:3000` to CORS origins in the Sanity dashboard

### 4. Run development server

```bash
npm run dev
```

Site: `http://localhost:3000`
Studio: `http://localhost:3000/studio`

---

## Content Management

The Sanity Studio at `/studio` manages all content:

### Conversations (Posts)
- Create posts with title, slug, category, body, featured image
- Mark posts as Featured to show on the home page
- Categories: Culture, Individual, Leadership, Education, Ideas, Family, Political Culture

### Work With Me
- **Services** — the three service layers with icons, features, and CTAs
- **Speaking Topics** — detailed topic descriptions for the Work page
- **Testimonials** — mark as featured to show on the home page

### Mic'd Up Initiative
- **Events** — talks, panels, summits, workshops with photos and recaps

### Site Settings (singleton)
- Social media links, contact details, OG image, announcement banner

---

## Design System

### Colours
| Token        | Hex       | Usage                        |
|-------------|-----------|------------------------------|
| `navy`      | `#0D1B2A` | Primary background           |
| `gold`      | `#C9A84C` | Accent, highlights, links    |
| `gold-light`| `#E2C97A` | Hover states                 |
| `cream`     | `#F5F0E8` | Primary text                 |

### Typography
- **Display** — Cormorant Garamond (headings, quotes, large text)
- **Body** — DM Sans (paragraphs, labels, UI)

### Key CSS Classes
```css
.btn-gold      /* Primary CTA button */
.btn-ghost     /* Secondary outlined button */
.card-navy     /* Standard content card with hover */
.eyebrow       /* Small caps label above headings */
.gold-line     /* Decorative gold line element */
.section-pad   /* Standard section padding */
.container-site /* Max-width container */
.prose-navy    /* Blog post body styles */
```

---

## Adding Contact Form Email

The contact form at `/api/contact` is set up to log submissions. To send real emails, choose one option:

### Option A — Resend (recommended)
```bash
npm install resend
```
Uncomment the Resend block in `src/app/api/contact/route.ts` and add `RESEND_API_KEY` to `.env.local`.

### Option B — Nodemailer (Gmail)
```bash
npm install nodemailer @types/nodemailer
```
Uncomment the Nodemailer block and add `GMAIL_USER` and `GMAIL_PASS` to `.env.local`.

---

## Deployment to Vercel

### One-command deploy
```bash
npm install -g vercel
vercel
```

### Or connect via GitHub
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all environment variables from `.env.example`
4. Deploy

### Environment variables needed on Vercel
All variables listed in `.env.example` must be added in Vercel's project settings.

---

## Sanity Studio Protection

The studio at `/studio` is protected in production with HTTP Basic Auth via `src/middleware.ts`.

Set `STUDIO_USERNAME` and `STUDIO_PASSWORD` in your Vercel environment variables.

---

## Replacing Placeholder Content

| File                                        | What to Replace                          |
|---------------------------------------------|------------------------------------------|
| `src/app/about/page.tsx`                    | Photo (remove placeholder, add Image)    |
| `public/og-image.jpg`                       | Add a 1200×630px OG image               |
| `public/images/`                            | Add any static images needed            |
| Social links in `src/components/layout/Footer.tsx` | Update with real URLs            |
| Sanity Studio → Site Settings               | All social links, email, phone          |

---

## File Structure

```
siranthony/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home
│   │   ├── layout.tsx                  # Root layout
│   │   ├── not-found.tsx               # 404
│   │   ├── about/page.tsx
│   │   ├── conversations/
│   │   │   ├── page.tsx                # Post index
│   │   │   └── [slug]/page.tsx         # Post detail
│   │   ├── work/page.tsx
│   │   ├── micdup/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── studio/[[...tool]]/page.tsx # Sanity Studio
│   │   └── api/
│   │       ├── contact/route.ts
│   │       └── sitemap/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SignatureQuestion.tsx
│   │   │   ├── FeaturedPosts.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── HomeSections.tsx        # Testimonial, MicdupBanner, HomeCTA
│   │   │   └── ContactForm.tsx
│   │   └── ui/
│   │       ├── index.tsx               # AnimatedSection, GoldLine, etc.
│   │       └── PortableTextRenderer.tsx
│   ├── lib/
│   │   ├── sanity.ts
│   │   ├── queries.ts
│   │   └── utils.ts
│   ├── types/index.ts
│   ├── styles/globals.css
│   └── middleware.ts
├── sanity/
│   └── schemas/
│       ├── index.ts
│       ├── post.ts
│       ├── author.ts
│       ├── service.ts
│       ├── speakingTopic.ts
│       ├── testimonial.ts
│       ├── micdupEvent.ts
│       └── siteSettings.ts
├── sanity.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── .env.example
└── package.json
```

---

## The Brand

**Sir Anthony** — Conversationalist · Cultural Thinker · Voice of Transformation

*Who made you normal? That's the question. That's the work.*

Founder, [Mic'd Up Initiative](https://micdupinitiative.site)
