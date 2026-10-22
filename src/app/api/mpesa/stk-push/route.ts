import { NextRequest, NextResponse } from 'next/server'
import { stkPush, normalisePhone, darajaConfigured } from '@/lib/daraja'
import {
  createPendingPurchase,
  newAccessToken,
  hashAccessToken,
  purchasesConfigured,
} from '@/lib/purchases'
import { sanityFetch } from '@/lib/sanity'
import { callbackPath } from '@/lib/mpesa-security'

export const dynamic = 'force-dynamic'

interface EbookForSale {
  _id: string
  title: string
  priceKes: number
  forSale?: boolean
}

export async function POST(req: NextRequest) {
  try {
    if (!darajaConfigured()) {
      return NextResponse.json(
        { error: 'Payments are not configured yet. Please get in touch directly.' },
        { status: 503 }
      )
    }
    if (!purchasesConfigured()) {
      return NextResponse.json({ error: 'Store is not configured.' }, { status: 503 })
    }

    const body = await req.json().catch(() => ({}))
    const { slug, phone, email, name } = body as Record<string, string>

    if (!slug) {
      return NextResponse.json({ error: 'Which book?' }, { status: 400 })
    }

    const msisdn = normalisePhone(phone || '')
    if (!msisdn) {
      return NextResponse.json(
        { error: 'That does not look like a Kenyan mobile number. Try 07xx xxx xxx.' },
        { status: 400 }
      )
    }

    // Price comes from the CMS, never from the browser.
    const ebook = await sanityFetch<EbookForSale | null>(
      `*[_type == "ebook" && slug.current == $slug][0]{ _id, title, priceKes, forSale }`,
      { slug }
    )

    if (!ebook) {
      return NextResponse.json({ error: 'That book was not found.' }, { status: 404 })
    }
    if (ebook.forSale === false) {
      return NextResponse.json({ error: 'That book is not on sale right now.' }, { status: 409 })
    }
    if (!ebook.priceKes || ebook.priceKes < 1) {
      return NextResponse.json({ error: 'That book has no price set.' }, { status: 409 })
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://siranthony.online').replace(
      /\/$/,
      ''
    )
    // The callback path carries a secret segment so the endpoint is not
    // guessable. MPESA_CALLBACK_URL still overrides it wholesale for tunnels.
    const callbackUrl = process.env.MPESA_CALLBACK_URL || `${siteUrl}${callbackPath()}`

    const push = await stkPush({
      phone: msisdn,
      amount: ebook.priceKes,
      accountReference: 'SirAnthony',
      description: 'Ebook',
      callbackUrl,
    })

    if (!push.ok || !push.checkoutRequestId) {
      return NextResponse.json(
        { error: push.errorMessage || 'Could not reach M-Pesa. Try again.' },
        { status: 502 }
      )
    }

    // The raw token is created here and returned to the browser straight away.
    // It is inert until the callback flips this purchase to "paid" — the
    // download route refuses anything still pending — so handing it over now
    // costs nothing and means we never have to store it in plaintext.
    const accessToken = newAccessToken()

    await createPendingPurchase({
      ebookId: ebook._id,
      ebookTitle: ebook.title,
      amount: ebook.priceKes,
      phone: msisdn,
      email: email || undefined,
      buyerName: name || undefined,
      checkoutRequestId: push.checkoutRequestId,
      merchantRequestId: push.merchantRequestId,
      accessTokenHash: hashAccessToken(accessToken),
    })

    return NextResponse.json({
      ok: true,
      checkoutRequestId: push.checkoutRequestId,
      accessToken,
      message: push.customerMessage || 'Check your phone for the M-Pesa prompt.',
    })
  } catch (error) {
    console.error('STK push error:', error)
    return NextResponse.json({ error: 'Something went wrong starting the payment.' }, { status: 500 })
  }
}
