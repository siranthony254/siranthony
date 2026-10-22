import { NextRequest, NextResponse } from 'next/server'
import { readCallback, stkQuery, type StkCallbackPayload } from '@/lib/daraja'
import {
  findByCheckoutRequestId,
  markPaid,
  markFailed,
  newAccessToken,
  hashAccessToken,
  addAccessTokenHash,
} from '@/lib/purchases'
import { sendEmail, accessEmail } from '@/lib/email'
import { callbackSecretMatches, checkSafaricomIp } from '@/lib/mpesa-security'

export const dynamic = 'force-dynamic'

// Safaricom POSTs here when the customer accepts or declines the prompt.
//
// Nothing in the payload is trusted to move money. Before a purchase is marked
// paid we ask Daraja directly whether that checkout actually succeeded, so a
// forged callback cannot unlock anything: the attack it closes is someone
// starting a real push, cancelling it, then posting a fake success for their
// own CheckoutRequestID.
export async function POST(req: NextRequest, { params }: { params: { secret: string } }) {
  // Always answer 200. Safaricom retries anything else, and a retry storm is
  // worse than a dropped callback the status poll can recover from.
  const ack = NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })

  // ── Layer 1: secret path ──
  if (!callbackSecretMatches(params.secret)) {
    console.warn('M-Pesa callback rejected: bad secret segment')
    return ack
  }
  if (!process.env.MPESA_CALLBACK_SECRET) {
    console.warn(
      'M-Pesa callback: MPESA_CALLBACK_SECRET is not set. Anyone who guesses this URL can post to it. Set it before going live.'
    )
  }

  // ── Layer 2: source IP ──
  const ipCheck = checkSafaricomIp(req)
  if (!ipCheck.allowed) {
    console.warn(`M-Pesa callback rejected: IP ${ipCheck.ip} is not Safaricom`)
    return ack
  }

  try {
    const payload = (await req.json().catch(() => ({}))) as StkCallbackPayload
    const result = readCallback(payload)

    if (!result.checkoutRequestId) {
      console.warn('M-Pesa callback with no CheckoutRequestID')
      return ack
    }

    const purchase = await findByCheckoutRequestId(result.checkoutRequestId)
    if (!purchase) {
      console.warn('M-Pesa callback for unknown checkout:', result.checkoutRequestId)
      return ack
    }

    if (purchase.status === 'paid') {
      // Safaricom can deliver the same callback more than once.
      return ack
    }

    // Callback says it failed — believe it. Nothing is unlocked by a failure,
    // so there is no incentive to forge one, and the status poll re-checks.
    if (result.resultCode !== 0) {
      await markFailed(purchase._id, result.resultDesc || 'Payment not completed')
      return ack
    }

    // ── Layer 3: confirm with Daraja before unlocking anything ──
    const verified = await stkQuery(result.checkoutRequestId).catch(error => {
      console.error('STK query during callback verification failed:', error)
      return null
    })

    if (verified && !verified.stillProcessing && verified.resultCode !== undefined) {
      if (verified.resultCode !== '0') {
        console.warn(
          `M-Pesa callback claimed success but Daraja reports ${verified.resultCode} for ${result.checkoutRequestId}. Not unlocking.`
        )
        await markFailed(purchase._id, verified.resultDesc || 'Payment not completed')
        return ack
      }
    } else if (!ipCheck.skipped) {
      // Query was inconclusive, but the request came from a verified Safaricom
      // address. Accept it; the alternative is stranding a real payment.
      console.warn(
        `STK query inconclusive for ${result.checkoutRequestId}; accepting on verified Safaricom IP.`
      )
    } else {
      // Inconclusive and we cannot vouch for the sender. Leave it pending — the
      // browser poll queries Daraja again seconds later and settles it safely.
      console.warn(
        `STK query inconclusive for ${result.checkoutRequestId} and IP is unverified. Leaving pending for the status poll.`
      )
      return ack
    }

    await markPaid(purchase._id, {
      mpesaReceipt: result.receipt,
      amount: typeof result.amount === 'number' ? result.amount : undefined,
      phone: result.phone ? String(result.phone) : undefined,
      resultDesc: result.resultDesc,
    })

    console.log(
      `Purchase paid: ${purchase.ebookTitle} — receipt ${result.receipt || 'n/a'} — ${purchase.phone}`
    )

    // Email is the durability layer. The browser already unlocks on its own via
    // the status poll, so anything failing here must not break the purchase.
    if (purchase.email) {
      try {
        // A second, independent token for the emailed link. The one the browser
        // holds stays valid; both hash into the same purchase.
        const emailToken = newAccessToken()
        await addAccessTokenHash(purchase._id, hashAccessToken(emailToken))

        const siteUrl = (
          process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.online'
        ).replace(/\/$/, '')

        const { text, html } = accessEmail({
          ebookTitle: purchase.ebookTitle || 'your ebook',
          accessUrl: `${siteUrl}/access/${emailToken}`,
          receipt: result.receipt,
          amount: typeof result.amount === 'number' ? result.amount : purchase.amount,
        })

        await sendEmail({
          to: purchase.email,
          subject: `Your copy of ${purchase.ebookTitle || 'the ebook'}`,
          html,
          text,
        })
      } catch (error) {
        console.error('Access email failed (payment still stands):', error)
      }
    }

    return ack
  } catch (error) {
    console.error('M-Pesa callback error:', error)
    return ack
  }
}
