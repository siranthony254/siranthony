'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Smartphone, Loader2, Check, Download, AlertCircle } from 'lucide-react'

type Stage = 'idle' | 'sending' | 'waiting' | 'paid' | 'failed'

interface Props {
  slug: string
  title: string
  priceKes: number
  forSale: boolean
}

const POLL_INTERVAL_MS = 3000
const POLL_TIMEOUT_MS = 150_000 // Safaricom prompts expire around 2 minutes

export function EbookCheckout({ slug, title, priceKes, forSale }: Props) {
  const [stage, setStage] = useState<Stage>('idle')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const timers = useRef<{ poll?: ReturnType<typeof setInterval>; stop?: ReturnType<typeof setTimeout> }>({})

  const clearTimers = useCallback(() => {
    if (timers.current.poll) clearInterval(timers.current.poll)
    if (timers.current.stop) clearTimeout(timers.current.stop)
    timers.current = {}
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const startPolling = useCallback(
    (checkoutRequestId: string) => {
      const check = async () => {
        try {
          const res = await fetch(
            `/api/mpesa/status?checkoutRequestId=${encodeURIComponent(checkoutRequestId)}`,
            { cache: 'no-store' }
          )
          const data = await res.json()

          if (data.status === 'paid') {
            clearTimers()
            setStage('paid')
            setMessage(data.receipt ? `M-Pesa receipt ${data.receipt}` : '')
          } else if (data.status === 'failed') {
            clearTimers()
            setStage('failed')
            setError(data.message || 'The payment was not completed.')
          }
        } catch {
          /* keep waiting — a flaky poll is not a failed payment */
        }
      }

      timers.current.poll = setInterval(check, POLL_INTERVAL_MS)
      timers.current.stop = setTimeout(() => {
        clearTimers()
        setStage(current => {
          if (current !== 'waiting') return current
          setError(
            'We did not hear back in time. If your M-Pesa message says the payment went through, contact me and I will unlock it.'
          )
          return 'failed'
        })
      }, POLL_TIMEOUT_MS)

      check()
    },
    [clearTimers]
  )

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setStage('sending')

    try {
      const res = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, phone, email, name }),
      })
      const data = await res.json()

      if (!res.ok || !data.ok) {
        setStage('failed')
        setError(data.error || 'Could not start the payment.')
        return
      }

      setAccessToken(data.accessToken || '')
      setMessage(data.message || 'Check your phone for the M-Pesa prompt.')
      setStage('waiting')
      startPolling(data.checkoutRequestId)
    } catch {
      setStage('failed')
      setError('Could not reach the server. Check your connection and try again.')
    }
  }

  // ── Paid ───────────────────────────────────────────────────────
  if (stage === 'paid') {
    const accessUrl = accessToken ? `/access/${accessToken}` : null
    return (
      <div className="card-navy p-7 border-gold/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
            <Check size={16} />
          </span>
          <h3 className="font-display text-xl font-semibold text-cream">Payment received</h3>
        </div>

        {message && <p className="font-body text-xs text-cream/40 mb-5">{message}</p>}

        <a
          href={`/api/download?token=${encodeURIComponent(accessToken)}`}
          className="btn-gold w-full justify-center inline-flex items-center gap-2 mb-4"
        >
          <Download size={15} /> Download {title}
        </a>

        {accessUrl && (
          <div className="rounded-lg border border-gold/15 bg-navy/60 p-4">
            <p className="font-body text-xs text-cream/50 leading-relaxed mb-2">
              Save this link. It is how you get back to your download later:
            </p>
            <code className="block font-body text-[11px] text-gold/80 break-all leading-relaxed">
              {typeof window !== 'undefined' ? window.location.origin : ''}
              {accessUrl}
            </code>
          </div>
        )}

        {email && (
          <p className="font-body text-xs text-cream/35 mt-4">
            A copy of the link is on its way to {email}.
          </p>
        )}
      </div>
    )
  }

  // ── Not for sale ───────────────────────────────────────────────
  if (!forSale) {
    return (
      <div className="card-navy p-7">
        <p className="font-body text-sm text-cream/55">
          This one is not on sale yet. The preview is yours to read in the meantime.
        </p>
      </div>
    )
  }

  // ── Buy ────────────────────────────────────────────────────────
  const busy = stage === 'sending' || stage === 'waiting'

  return (
    <div className="card-navy p-7">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="font-display text-xl font-semibold text-cream">Get the full PDF</h3>
        <span className="font-display text-2xl font-semibold text-gold whitespace-nowrap">
          KES {priceKes.toLocaleString()}
        </span>
      </div>
      <p className="font-body text-sm text-cream/50 leading-relaxed mb-6">
        Pay with M-Pesa. The prompt comes to your phone, and the download unlocks here the
        moment it goes through.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="mpesa-phone" className="block font-body text-xs text-cream/45 mb-2">
            M-Pesa number
          </label>
          <div className="relative">
            <Smartphone
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none"
            />
            <input
              id="mpesa-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              disabled={busy}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="07XX XXX XXX"
              className="w-full bg-navy/60 border border-gold/15 rounded-lg pl-10 pr-4 py-3 font-body text-sm text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="buyer-name" className="block font-body text-xs text-cream/45 mb-2">
            Your name
          </label>
          <input
            id="buyer-name"
            name="name"
            type="text"
            required
            disabled={busy}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="So I can put it on your copy"
            className="w-full bg-navy/60 border border-gold/15 rounded-lg px-4 py-3 font-body text-sm text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="buyer-email" className="block font-body text-xs text-cream/45 mb-2">
            Email <span className="text-cream/25">— so you can get back to it later</span>
          </label>
          <input
            id="buyer-email"
            name="email"
            type="email"
            disabled={busy}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-navy/60 border border-gold/15 rounded-lg px-4 py-3 font-body text-sm text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
          />
        </div>

        <button type="submit" disabled={busy} className="btn-gold w-full justify-center inline-flex items-center gap-2 disabled:opacity-60">
          {stage === 'sending' && <Loader2 size={15} className="animate-spin" />}
          {stage === 'waiting' && <Loader2 size={15} className="animate-spin" />}
          {stage === 'sending'
            ? 'Sending the prompt…'
            : stage === 'waiting'
              ? 'Waiting for your PIN…'
              : `Pay KES ${priceKes.toLocaleString()} with M-Pesa`}
        </button>
      </form>

      {stage === 'waiting' && (
        <p className="font-body text-xs text-cream/45 mt-4 leading-relaxed" aria-live="polite">
          {message} Enter your PIN on the phone. Keep this page open — it unlocks by itself.
        </p>
      )}

      {error && (
        <div className="flex items-start gap-2.5 mt-4 p-3 rounded-lg border border-red-400/25 bg-red-400/5">
          <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
          <p className="font-body text-xs text-red-300/90 leading-relaxed">{error}</p>
        </div>
      )}

      {stage === 'failed' && (
        <button
          type="button"
          onClick={() => {
            setStage('idle')
            setError('')
          }}
          className="font-body text-xs text-gold/70 hover:text-gold transition-colors mt-3"
        >
          Try again
        </button>
      )}

      <p className="font-body text-[11px] text-cream/30 leading-relaxed mt-5 pt-4 border-t border-gold/10">
        All sales are final — no refunds. If your payment goes through and the download does
        not unlock, contact me and I will sort it out personally.
      </p>
    </div>
  )
}
