'use client'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

// ── AnimatedSection ──────────────────────────────────────────────
interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'in'
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView
          ? 'opacity-100 translate-y-0'
          : direction === 'up'
          ? 'opacity-0 translate-y-8'
          : 'opacity-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── GoldLine ─────────────────────────────────────────────────────
export function GoldLine({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'block w-12 h-0.5',
        'bg-gradient-to-r from-gold to-transparent',
        className
      )}
    />
  )
}

// ── Eyebrow ──────────────────────────────────────────────────────
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('eyebrow', className)}>{children}</p>
  )
}

// ── RippleCircles ────────────────────────────────────────────────
export function RippleCircles({ className }: { className?: string }) {
  return (
    <div className={cn('ripple-container', className)}>
      <div className="ripple-ring" />
      <div className="ripple-ring" />
      <div className="ripple-ring" />
      <div className="ripple-ring" />
      <div className="gold-dot" />
    </div>
  )
}

// ── CategoryBadge ────────────────────────────────────────────────
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/utils'

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium border',
        CATEGORY_COLORS[category] || 'bg-gold/10 text-gold border-gold/30'
      )}
    >
      {CATEGORY_LABELS[category] || category}
    </span>
  )
}

// ── SectionHeader ────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow, title, subtitle, centered = false, className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <AnimatedSection>
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <GoldLine className={cn('mb-6', centered && 'mx-auto')} />
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-cream mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="font-body text-cream/60 text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </AnimatedSection>
    </div>
  )
}
