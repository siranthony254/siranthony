'use client'

import { useState } from 'react'
import { Share2, Linkedin, Facebook, MessageCircle, Instagram, Music2, Link as LinkIcon, Check } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import type { Post } from '@/types'

interface ShareButtonProps {
  post: Post
  baseUrl: string
}

export function ShareButton({ post, baseUrl }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${baseUrl}/conversations/${post.slug.current}`
  const shareTitle = post.seo?.metaTitle || post.title
  const shareDescription = post.seo?.metaDescription || post.excerpt
  const shareImage = post.seo?.ogImage?.asset?.url || post.mainImage?.asset?.url || ''

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`
    window.open(url, '_blank')
  }

  const shareToInstagram = () => {
    // Instagram doesn't support direct link sharing via URL
    // We'll copy the link and show a message
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      alert('Link copied! Open Instagram and paste it in your story or DM.')
    })
  }

  const shareToTikTok = () => {
    // TikTok doesn't support direct link sharing via URL
    // We'll copy the link and show a message
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      alert('Link copied! Open TikTok and paste it in your bio or DM.')
    })
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareButtons = [
    { name: 'LinkedIn', icon: Linkedin, onClick: shareToLinkedIn, color: 'hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50' },
    { name: 'Facebook', icon: Facebook, onClick: shareToFacebook, color: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50' },
    { name: 'WhatsApp', icon: MessageCircle, onClick: shareToWhatsApp, color: 'hover:bg-[#25D366]/20 hover:border-[#25D366]/50' },
    { name: 'Instagram', icon: Instagram, onClick: shareToInstagram, color: 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:border-pink-500/50' },
    { name: 'TikTok', icon: Music2, onClick: shareToTikTok, color: 'hover:bg-black/40 hover:border-white/30' },
  ]

  return (
    <div className="relative inline-block">
      {/* Main share button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 text-gold text-sm font-body uppercase tracking-wider hover:bg-gold/10 hover:border-gold transition-all duration-200"
        aria-label="Share this post"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <Share2 size={14} />
        Share
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-navy border border-gold/20 rounded-xl shadow-2xl z-[100] p-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {shareButtons.map((button) => (
                <button
                  key={button.name}
                  onClick={() => {
                    button.onClick()
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-cream/80 text-sm font-body transition-all duration-200 border border-transparent ${button.color}`}
                >
                  <button.icon size={16} />
                  {button.name}
                </button>
              ))}
              
              {/* Copy link button */}
              <button
                onClick={copyLink}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-200 border border-transparent ${
                  copied 
                    ? 'text-green-400 bg-green-400/10 border-green-400/30' 
                    : 'text-cream/80 hover:bg-gold/10 hover:border-gold/30'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <LinkIcon size={16} />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}