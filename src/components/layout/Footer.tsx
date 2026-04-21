import Link from 'next/link'
import { Youtube, Instagram, Facebook, Linkedin } from 'lucide-react'

const NAV = [
  { href: '/about',         label: 'About' },
  { href: '/conversations', label: 'Conversations' },
  { href: '/work',          label: 'Work With Me' },
  { href: '/micdup',        label: "Mic'd Up Initiative" },
  { href: '/contact',       label: 'Contact' },
]

const SOCIAL = [
  { href: 'https://linkedin.com', icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://youtube.com',  icon: Youtube,   label: 'YouTube' },
  { href: 'https://instagram.com',icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: Facebook,  label: 'Facebook' },
]

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-navy">
      <div className="container-site py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <span className="font-display text-2xl font-semibold text-cream">SIR ANTHONY</span>
              <span className="block eyebrow mt-1">Voice of Transformation</span>
            </Link>
            <p className="font-body text-sm text-cream/50 leading-relaxed max-w-xs italic font-display text-base">
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
              <p>Conversations & Speaking</p>
              <a href="tel:+254741518589" className="block text-gold hover:text-gold-light transition-colors">
                +254 741 518 589
              </a>
              <p className="mt-3">Digital Strategy & Web</p>
              <a href="tel:+254727974516" className="block text-gold hover:text-gold-light transition-colors">
                +254 727 974 516
              </a>
            </div>
            {/* Social */}
            <div className="flex gap-3 pt-2">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
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
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30 font-body">
            © {new Date().getFullYear()} Sir Anthony. All rights reserved.
          </p>
          <a
            href="https://micdupinitiative.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gold/60 hover:text-gold font-body transition-colors tracking-wider uppercase"
          >
            micdupinitiative.site →
          </a>
        </div>
      </div>
    </footer>
  )
}
