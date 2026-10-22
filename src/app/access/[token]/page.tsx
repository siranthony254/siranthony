import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, Clock, AlertCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/ui'
import { findByAccessToken } from '@/lib/purchases'

export const dynamic = 'force-dynamic'

// A private page reached by a link only the buyer holds.
export const metadata: Metadata = {
  title: 'Your download',
  robots: { index: false, follow: false },
}

interface Props {
  params: { token: string }
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-36 pb-24 bg-navy min-h-[70vh]">
      <div className="container-site">
        <div className="max-w-xl">
          <AnimatedSection direction="in">{children}</AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default async function AccessPage({ params }: Props) {
  const purchase = await findByAccessToken(params.token).catch(() => null)

  // ── Unknown or tampered link ──
  if (!purchase) {
    return (
      <Shell>
        <div className="flex items-start gap-3 mb-6">
          <AlertCircle size={20} className="text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h1 className="font-display text-3xl font-semibold text-cream mb-3">
              That link does not work
            </h1>
            <p className="font-body text-cream/60 leading-relaxed">
              It may have been mistyped or truncated somewhere along the way. If you paid and
              cannot get to your download, message me with the M-Pesa receipt number and I will
              open it up for you.
            </p>
          </div>
        </div>
        <Link href="/contact" className="btn-gold">
          Contact me
        </Link>
      </Shell>
    )
  }

  // ── Payment never landed ──
  if (purchase.status !== 'paid') {
    const failed = purchase.status === 'failed'
    return (
      <Shell>
        <div className="flex items-start gap-3 mb-6">
          <Clock size={20} className="text-gold/60 mt-1 flex-shrink-0" />
          <div>
            <h1 className="font-display text-3xl font-semibold text-cream mb-3">
              {failed ? 'That payment did not go through' : 'Still waiting on payment'}
            </h1>
            <p className="font-body text-cream/60 leading-relaxed">
              {failed
                ? purchase.resultDesc ||
                  'M-Pesa reported that the payment was not completed, so nothing was charged.'
                : 'We have not had confirmation from M-Pesa yet. If you entered your PIN, give it a moment and refresh.'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {purchase.ebook?.slug && (
            <Link href={`/portfolio/${purchase.ebook.slug}`} className="btn-gold">
              Back to {purchase.ebookTitle || 'the book'}
            </Link>
          )}
          <Link href="/contact" className="btn-ghost">
            Contact me
          </Link>
        </div>
      </Shell>
    )
  }

  // ── Paid ──
  return (
    <Shell>
      <p className="font-body text-xs text-gold uppercase tracking-widest mb-4">Your download</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-cream mb-4 leading-tight">
        {purchase.ebookTitle || 'Your ebook'}
      </h1>
      <p className="font-body text-cream/60 leading-relaxed mb-8">
        Thank you. The file has your name on every page, so please keep it to yourself.
      </p>

      <a
        href={`/api/download?token=${encodeURIComponent(params.token)}`}
        className="btn-gold inline-flex items-center gap-2 mb-8"
      >
        <Download size={15} /> Download the PDF
      </a>

      <dl className="border-t border-gold/10 pt-6 space-y-3">
        {purchase.mpesaReceipt && (
          <div className="flex justify-between gap-4">
            <dt className="font-body text-xs text-cream/35 uppercase tracking-wider">Receipt</dt>
            <dd className="font-body text-sm text-cream/70">{purchase.mpesaReceipt}</dd>
          </div>
        )}
        {purchase.amount ? (
          <div className="flex justify-between gap-4">
            <dt className="font-body text-xs text-cream/35 uppercase tracking-wider">Paid</dt>
            <dd className="font-body text-sm text-cream/70">KES {purchase.amount.toLocaleString()}</dd>
          </div>
        ) : null}
        {purchase.buyerName && (
          <div className="flex justify-between gap-4">
            <dt className="font-body text-xs text-cream/35 uppercase tracking-wider">Licensed to</dt>
            <dd className="font-body text-sm text-cream/70">{purchase.buyerName}</dd>
          </div>
        )}
      </dl>

      <p className="font-body text-xs text-cream/30 leading-relaxed mt-8">
        Bookmark this page — it is your permanent link to the download. All sales are final. If
        anything here does not work,{' '}
        <Link href="/contact" className="text-gold/70 hover:text-gold transition-colors">
          tell me
        </Link>{' '}
        and I will fix it.
      </p>
    </Shell>
  )
}
