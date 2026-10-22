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
    'I work with people, organisations, and campuses on seeing the culture they have already built — and on building the next part on purpose. Conversationalist and cultural thinker, Nairobi.',
  keywords: [
    'Sir Anthony', 'cultural thinker', 'conversationalist', 'Africa leadership',
    'Who Made You Normal', "Mic'd Up Initiative", 'cultural training', 'Kenya',
    'organizational culture', 'thought leadership', 'cultural intelligence',
    'responsible influence', 'campus culture', 'public speaking Africa',
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
                  "image": "https://siranthony.online/og-image.jpg",
                  "jobTitle": [
                    "Cultural Thinker",
                    "Conversationalist",
                    "Speaker",
                    "Writer"
                  ],
                  "knowsAbout": [
                    "Cultural Intelligence",
                    "Cultural Formation",
                    "Responsible Influence",
                    "Conversation Facilitation",
                    "Leadership Development",
                    "Personal Development"
                  ],
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+254727974516",
                      "contactType": "Bookings and Partnerships"
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
                  "name": "Sir Anthony | Conversationalist & Cultural Thinker",
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
                      "name": "What does Sir Anthony mean by culture?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Culture is not only heritage, tribe, and tradition. It is the shared beliefs, values, behaviours, and norms that a people gradually accept as normal — carried in everyday habits, unwritten rules, and repeated choices far more than in ceremonies and celebrations. Sir Anthony’s work begins by making that everyday culture visible, so that it can be examined and shaped deliberately rather than simply inherited."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is responsible influence?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Responsible influence is the use of your voice with an awareness that it shapes people, culture, and society — and therefore the exercise of truth, integrity, stewardship, and long-term thinking in what you communicate. It does not require a large platform or institutional authority. Every voice already influences someone; the only real question is whether it is influencing on purpose."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does cultural intelligence change the way an organisation communicates?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Cultural intelligence changes communication by examining the normalised daily choices and systemic habits of the people involved — what an organisation actually rewards, tolerates, and repeats. Instead of publishing statements that describe an aspiration, a culturally intelligent approach names the culture that already exists and builds the language and rituals that carry the intended one. People trust that alignment because they recognise it as true."
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
