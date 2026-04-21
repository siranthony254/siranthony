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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
