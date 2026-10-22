import { NextRequest, NextResponse } from 'next/server'
import { stkQuery } from '@/lib/daraja'
import { findByCheckoutRequestId, markPaid, markFailed } from '@/lib/purchases'

export const dynamic = 'force-dynamic'

// Polled by the browser while the customer is on the PIN prompt.
//
// The callback is the primary signal. This also asks Daraja directly, which
// covers the two cases the callback cannot: local development, where Safaricom
// cannot reach the machine at all, and a webhook that simply never arrives.
export async function GET(req: NextRequest) {
  const checkoutRequestId = req.nextUrl.searchParams.get('checkoutRequestId')

  if (!checkoutRequestId) {
    return NextResponse.json({ error: 'Missing checkoutRequestId' }, { status: 400 })
  }

  try {
    const purchase = await findByCheckoutRequestId(checkoutRequestId)
    if (!purchase) {
      return NextResponse.json({ status: 'unknown' }, { status: 404 })
    }

    // Settled already — the callback got here first.
    if (purchase.status === 'paid') {
      return NextResponse.json({
        status: 'paid',
        receipt: purchase.mpesaReceipt,
        amount: purchase.amount,
      })
    }
    if (purchase.status === 'failed') {
      return NextResponse.json({ status: 'failed', message: purchase.resultDesc })
    }

    // Still pending — ask Safaricom.
    const query = await stkQuery(checkoutRequestId).catch(() => null)

    if (!query || query.stillProcessing) {
      return NextResponse.json({ status: 'pending' })
    }

    if (query.resultCode === '0') {
      await markPaid(purchase._id, { resultDesc: query.resultDesc })
      return NextResponse.json({ status: 'paid', amount: purchase.amount })
    }

    if (query.resultCode !== undefined) {
      await markFailed(purchase._id, query.resultDesc || 'Payment not completed')
      return NextResponse.json({
        status: 'failed',
        message: query.resultDesc || 'Payment not completed',
      })
    }

    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    console.error('Status check error:', error)
    // Never fail the poll hard — the browser keeps waiting.
    return NextResponse.json({ status: 'pending' })
  }
}
