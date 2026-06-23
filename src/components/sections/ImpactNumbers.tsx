'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import type { ImpactNumbers } from '@/types'

// ─── Animated Counter ────────────────────────────────────────────
function AnimatedNumber({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = null
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }
    frameRef.current = requestAnimationFrame(step)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration])

  return <span>{count.toLocaleString()}</span>
}

// ─── Stat Row ───────────────────────────────────────────────────
function StatRow({
  label,
  value,
  animate,
  index,
}: {
  label: string
  value: number
  animate: boolean
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
      className="flex items-baseline justify-between gap-4 py-3 border-b border-gold/10 last:border-0 group"
    >
      <span className="font-body text-sm text-cream/55 group-hover:text-cream/80 transition-colors leading-snug">
        {label}
      </span>
      <span className="font-display text-2xl font-semibold text-gold shrink-0 tabular-nums">
        {animate ? <AnimatedNumber target={value} /> : 0}
        <span className="text-gold/50 text-lg">+</span>
      </span>
    </motion.div>
  )
}

// ─── Category Card ───────────────────────────────────────────────
function CategoryCard({
  title,
  icon,
  stats,
  animate,
  cardIndex,
}: {
  title: string
  icon: string
  stats: { label: string; value: number }[]
  animate: boolean
  cardIndex: number
}) {
  if (stats.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + cardIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="card-navy p-6 md:p-8 flex flex-col gap-1"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-display text-lg font-semibold text-cream leading-none">{title}</h3>
          <div className="w-8 h-px bg-gold/50 mt-2" />
        </div>
      </div>

      {/* Stats list */}
      <div className="flex flex-col">
        {stats.map((stat, i) => (
          <StatRow
            key={stat.label}
            label={stat.label}
            value={stat.value}
            animate={animate}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────
export function ImpactNumbersSection({ data }: { data?: ImpactNumbers | null }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  if (!data) return null

  // Build stat arrays — only include entries with a value > 0
  const speakingStats: { label: string; value: number }[] = [
    { label: 'Speaking Engagements', value: data.speaking?.speakingEngagements ?? 0 },
    { label: 'Events Facilitated', value: data.speaking?.eventsFacilitated ?? 0 },
    { label: 'Campuses Engaged', value: data.speaking?.campusesEngaged ?? 0 },
    { label: 'Workshops Facilitated', value: data.speaking?.workshopsFacilitated ?? 0 },
    { label: 'Conversations Done', value: data.speaking?.conversationsDone ?? 0 },
  ].filter(s => s.value > 0)

  const projectStats: { label: string; value: number }[] = [
    { label: 'Websites Launched', value: data.projects?.websitesLaunched ?? 0 },
    { label: 'Brands Supported', value: data.projects?.brandsSupported ?? 0 },
    { label: 'Demo Projects', value: data.projects?.demoProjects ?? 0 },
  ].filter(s => s.value > 0)

  const movementStats: { label: string; value: number }[] = (data.impactMovements ?? []).filter(
    s => s.value > 0,
  )

  // If absolutely no data, render nothing
  const hasAnyData =
    speakingStats.length > 0 || projectStats.length > 0 || movementStats.length > 0
  if (!hasAnyData) return null

  const categories = [
    { title: 'Speaking', icon: '🎤', stats: speakingStats },
    { title: 'Projects', icon: '🛠️', stats: projectStats },
    { title: 'Impact Movements & Initiatives', icon: '🌱', stats: movementStats },
  ].filter(c => c.stats.length > 0)

  return (
    <section
      ref={ref}
      className="section-pad bg-navy/95 relative overflow-hidden border-y border-gold/10"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-site relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-5">By the Numbers</p>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <h2
            className="font-display font-semibold text-cream"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.15 }}
          >
            The work,{' '}
            <em className="text-gold not-italic">measured.</em>
          </h2>
          <p className="font-body text-cream/50 text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Every number represents a conversation started, a site shipped, or a community moved.
          </p>
        </motion.div>

        {/* Category cards */}
        <div
          className={`grid gap-6 ${
            categories.length === 1
              ? 'grid-cols-1 max-w-md mx-auto'
              : categories.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              icon={cat.icon}
              stats={cat.stats}
              animate={inView}
              cardIndex={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
