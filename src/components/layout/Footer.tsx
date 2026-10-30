import Link from 'next/link'
import { Youtube, Instagram, Facebook, Linkedin, Twitter, Music2 } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import type { SiteSettings } from '@/types'

const NAV = [
  { href: '/about',         label: 'About' },
  // HIDDEN: Speaking — { href: '/speaking',      label: 'Speaking & Training' },
  { href: '/conversations', label: 'Conversations' },
  { href: '/portfolio',     label: 'Body of Work' },
  { href: '/gallery',       label: 'Gallery' },
  // HIDDEN: Mic'd Up — { href: '/micdup',        label: "Mic'd Up Initiative" },
  { href: '/contact',       label: 'Book Sir Anthony' },
]

// Icons are only rendered for links that actually exist in Site Settings.
// A social icon that goes to a platform's front page is worse than no icon.
const SOCIAL_ICONS = [
  { key: 'linkedin',  icon: Linkedin,  label: 'LinkedIn' },
  { key: 'youtube',   icon: Youtube,   label: 'YouTube' },
  { key: 'instagram', icon: Instagram, label: 'Instagram' },
  { key: 'facebook',  icon: Facebook,  label: 'Facebook' },
  { key: 'twitter',   icon: Twitter,   label: 'X' },
  { key: 'tiktok',    icon: Music2,    label: 'TikTok' },
] as const

export async function Footer() {
  const settings = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY).catch(() => null)

  const socials = SOCIAL_ICONS.map(s => ({
    ...s,
    href: settings?.socialLinks?.[s.key],
  })).filter((s): s is typeof s & { href: string } => Boolean(s.href))

  // One number for the personal brand. Website and digital enquiries belong to
  // REALWINNERS DIGITAL, which has its own line.
  const phone = settings?.contactPhone || '+254 741 518 589'

  return (
    <footer className="border-t border-gold/10 bg-navy">
      <div className="container-site py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <span className="font-display text-2xl font-semibold text-cream">SIR ANTHONY</span>
              <span className="block eyebrow mt-1">Conversationalist &amp; Cultural Thinker</span>
            </Link>
            <p className="font-display italic text-base text-cream/50 leading-relaxed max-w-xs">
              &ldquo;Who made you normal? That&apos;s the question. That&apos;s the work.&rdquo;
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="eyebrow mb-4">Navigate</p>
            {NAV.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-cream/50 hover:text-gold transition-colors duration-200 font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <p className="eyebrow mb-4">Connect</p>
            <div className="space-y-2 text-sm text-cream/50 font-body">
              <p>Speaking, training &amp; bookings</p>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="block text-gold hover:text-gold-light transition-colors"
              >
                {phone}
              </a>
              {settings?.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="block text-cream/50 hover:text-gold transition-colors mt-3"
                >
                  {settings.contactEmail}
                </a>
              )}
            </div>

            {socials.length > 0 && (
              <div className="flex gap-3 pt-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/50 transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30 font-body">
            © {new Date().getFullYear()} Sir Anthony. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-body tracking-wider uppercase">
            <span className="text-cream/30">Founder of</span>
            {/* HIDDEN: Mic'd Up — uncomment to show it in the footer again.
            <a
              href="https://micdupinitiative.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              Mic&apos;d Up Initiative →
            </a>
            */}
            <a
              href="https://realwinners.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              REALWINNERS DIGITAL →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
