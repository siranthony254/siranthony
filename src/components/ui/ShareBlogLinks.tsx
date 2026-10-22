'use client'
import { useState } from 'react'
import { Linkedin, Facebook, MessageCircle, Twitter, Link as LinkIcon, Check } from 'lucide-react'

// Share the blog itself. Individual posts use <ShareButton /> instead.
export function ShareBlogLinks({ url, title = 'Conversations — Sir Anthony' }: { url: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  const enc = encodeURIComponent
  const targets = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      name: 'X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${enc(`${title} — ${url}`)}`,
    },
  ]

  const copy = () => {
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {}
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {targets.map(({ name, icon: Icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          title={`Share on ${name}`}
          className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/45 hover:text-gold hover:border-gold/50 transition-all duration-200"
        >
          <Icon size={14} />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        title={copied ? 'Copied' : 'Copy link'}
        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
          copied
            ? 'text-green-400 border-green-400/40 bg-green-400/10'
            : 'text-cream/45 border-gold/20 hover:text-gold hover:border-gold/50'
        }`}
      >
        {copied ? <Check size={14} /> : <LinkIcon size={14} />}
      </button>
    </div>
  )
}
