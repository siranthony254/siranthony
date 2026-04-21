import Link from 'next/link'
import { RippleCircles } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center space-y-8 px-6">
        <RippleCircles className="mx-auto mb-8" />
        <p className="eyebrow">404</p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-cream">
          This page doesn&apos;t exist.
        </h1>
        <p className="font-display italic text-gold text-xl max-w-md mx-auto leading-relaxed">
          But the conversation does. Start from the beginning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/" className="btn-gold">Back Home</Link>
          <Link href="/conversations" className="btn-ghost">Read the Conversations</Link>
        </div>
      </div>
    </div>
  )
}
