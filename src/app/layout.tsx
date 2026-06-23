import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.com'),
  title: {
    default: 'Sir Anthony — Conversationalist & Cultural Thinker',
    template: '%s | Sir Anthony',
  },
  description:
    'Sir Anthony helps individuals, organizations, and institutions understand how culture is built, develop the thinking to shape it deliberately, and build the digital infrastructure to communicate it with integrity.',
  keywords: [
    'Sir Anthony', 'cultural thinker', 'conversationalist', 'Africa leadership',
    'Who Made You Normal', "Mic'd Up Initiative", 'cultural training', 'Kenya',
    'organizational culture', 'thought leadership', 'cultural intelligence',
  ],
  authors: [{ name: 'Sir Anthony' }],
  creator: 'Sir Anthony',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'Sir Anthony',
    title: 'Sir Anthony — Conversationalist & Cultural Thinker',
    description:
      'Who made you normal? That\'s the question. That\'s the work.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Sir Anthony' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sir Anthony — Conversationalist & Cultural Thinker',
    description: 'Who made you normal? That\'s the question. That\'s the work.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: '#0D1B2A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://siranthony.online",
                  "name": "Anthony Munene",
                  "alternateName": "Sir Anthony",
                  "url": "https://siranthony.online",
                  "image": "https://siranthony.onlinepath-to-your-photo.jpg",
                  "jobTitle": [
                    "Frontend Web Developer",
                    "Web Content Strategist",
                    "Cultural Thinker",
                    "Conversationalist"
                  ],
                  "knowsAbout": [
                    "Cultural Intelligence",
                    "Frontend Web Development",
                    "Content Strategy",
                    "Personal Development",
                    "React",
                    "Next.js"
                  ],
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+254727974516",
                      "contactType": "Web Development and Strategy Support"
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+254741518589",
                      "contactType": "Speaking and Cultural Consulting"
                    }
                  ],
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Mic'd Up Initiative",
                    "url": "https://micdupinitiative.site"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://siranthony.online#website",
                  "url": "https://siranthony.online",
                  "name": "Sir Anthony | Cultural Intelligence & Digital Infrastructure",
                  "publisher": {
                    "@id": "https://siranthony.online"
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://siranthony.online#faq",
                  "isPartOf": {
                    "@id": "https://siranthony.online#website"
                  },
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is a conscious brand, and why do they need specialized digital strategy?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A conscious brand is an ethical startup, sustainable business, or impact-driven organization that prioritizes social values alongside economic value. They need specialized digital strategy because generic marketing often focuses purely on transactional metrics. A values-driven strategy transforms digital touchpoints into an authentic reflection of the brand’s deeper cultural mission and community impact."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Why should a thought leader or ethical startup choose custom code over a website template?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Thought leaders and ethical startups should choose custom code because generic templates restrict unique storytelling and carry bloated code. Custom-coded digital architecture using frameworks like React and Next.js ensures zero design limitations, faster page performance, and enhanced digital accessibility. Furthermore, lightweight, bespoke code uses less server energy, lowering the brand's digital carbon footprint and matching its sustainability metrics."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does cultural intelligence improve business content strategy?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Cultural intelligence improves content strategy by analyzing the normalized daily choices and systemic habits of a target audience. Instead of creating generic content to satisfy search engine algorithms, a culturally intelligent strategy builds highly intentional content pillars. This specific alignment builds immediate trust with conscious consumers and positions the brand or leader as an authentic authority."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What does a cultural intelligence consultation involve for teams and organizations?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A cultural intelligence consultation involves moving past surface-level values statements on a wall to build a genuinely lived organization culture. The process includes deep team conversations, interactive workshops, and leadership advisory sessions. This framework helps teams examine their daily operational choices, align their communication strategies, and equip their members to actively shape a positive workplace culture."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How can institutions and campuses partner with the Mic’d Up Initiative?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Institutions, campuses, and organizations can partner with the Mic'd Up Initiative to mentor the next generation of African leaders. Partnership avenues include hosting dialogue summits, campus debates, values-based leadership training, and media production collaborations. The initiative focuses on discovering young voices and building responsible cultural influence across the continent."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
