'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { RippleCircles } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import type { SiteSettings } from '@/types'

const fadeUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 28 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export function HeroSection() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  
  // Fetch site settings on client side
  useEffect(() => {
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY).then(data => {
      if (data) {
        console.log('Homepage hero image:', data.homepageHeroImage)
        setSiteSettings(data)
      }
    })
  }, [])
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-site relative z-10 py-32 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">

          {/* Left — Text */}
          <div className="space-y-8 lg:py-32">
            <motion.div {...fadeUp(0.1)}>
              <span className="eyebrow">Conversationalist · Cultural Thinker · Digital Strategist · Creator · Kenya</span>
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="space-y-3">
              <h1 className="font-display font-semibold text-cream leading-[1.0]"  
              
                  style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
                Who made
                <br />
                <em className="text-gold not-italic">you normal?</em>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.4)}>
              <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent mb-6" />
              <p className="font-body text-cream/60 text-lg md:text-xl leading-relaxed max-w-lg">
                Most of us never asked. Almost nothing about the way we live was our
                original idea — someone gave it to us. That is the question.
                That is the work.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.55)} className="flex flex-col sm:flex-row gap-4">
              <Link href="/conversations" className="btn-gold">
                Start the Conversation
              </Link>
              <Link href="/work" className="btn-ghost">
                Work With Me
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.7)}>
              <p className="font-body text-xs text-cream/35 uppercase tracking-widest">
                Founder,{' '}
                <a
                  href="https://micdupinitiative.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/60 hover:text-gold transition-colors"
                >
                  Mic&apos;d Up Initiative
                </a>
                {' '}· Cultural Training · Digital Strategy
              </p>
            </motion.div>
          </div>

          {/* Right — Branded Image + Ripple visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[600px] h-[600px] flex items-center justify-center">
              <RippleCircles />

              {/* Branded Image - 1.5x larger than before */}
              {siteSettings?.homepageHeroImage?.asset?.url && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem]">
                    <Image
                      src={siteSettings.homepageHeroImage.asset.url}
                      alt={siteSettings.homepageHeroImage.alt || 'Sir Anthony'}
                      fill
                      className="object-cover rounded-2xl shadow-2xl"
                      style={{ objectPosition: 'center' }}
                    />
                    {/* Premium glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/15 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              )}

              {/* Stats card - positioned over image corner */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-4 right-4 bg-navy p-4 z-10 rounded-lg shadow-xl border border-gold/20"
              >
                <p className="eyebrow mb-1 text-[0.65rem]">Mic&apos;d Up Initiative</p>
                <p className="font-display text-2xl font-semibold text-gold">400M+</p>
                <p className="font-body text-[0.8rem] text-cream/50">African youth aged 15–35</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[0.65rem] text-cream/30 uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown size={14} className="text-gold/40 animate-bounce" />
      </motion.div>
    </section>
  )
}
