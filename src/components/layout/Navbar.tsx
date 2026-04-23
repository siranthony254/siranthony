'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/',              label: 'Home' },
  { href: '/about',         label: 'About' },
  { href: '/conversations', label: 'Conversations' },
  { href: '/gallery',       label: 'Gallery' },
  { href: '/work',          label: 'Work With Me' },
  { href: '/micdup',        label: "Mic'd Up" },
]

export function Navbar() {
  const pathname   = usePathname()
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-navy/95 backdrop-blur-md border-b border-gold/10 py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container-site flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-wider text-cream group-hover:text-gold transition-colors duration-300">
            SIR ANTHONY
          </span>
          <span className="eyebrow text-[0.6rem] mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            Voice of Transformation
          </span>
        </Link>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 ml-12">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn('nav-link', pathname === link.href && 'active')}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-gold text-xs py-2.5 px-5">
            Book Sir Anthony
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cream hover:text-gold transition-colors p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-500',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container-site flex flex-col gap-1 pt-4 pb-6 border-t border-gold/10 mt-3">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'py-3 text-sm tracking-wider uppercase font-body transition-colors duration-200',
                pathname === link.href
                  ? 'text-gold'
                  : 'text-cream/70 hover:text-gold'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-gold mt-4 justify-center text-xs">
            Book Sir Anthony
          </Link>
        </nav>
      </div>
    </header>
  )
}
