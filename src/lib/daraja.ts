// ── Safaricom Daraja (M-Pesa) ────────────────────────────────────
// STK Push only. Phase 1 is Kenya/KES.

const ENV = process.env.MPESA_ENV === 'production' ? 'production' : 'sandbox'

const BASE =
  ENV === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke'

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

export function darajaConfigured(): boolean {
  return Boolean(
    process.env.MPESA_CONSUMER_KEY &&
      process.env.MPESA_CONSUMER_SECRET &&
      process.env.MPESA_SHORTCODE &&
      process.env.MPESA_PASSKEY
  )
}

/**
 * Normalise anything a Kenyan types into the 2547XXXXXXXX / 2541XXXXXXXX
 * form Daraja demands. Returns null if it cannot be made valid.
 */
export function normalisePhone(input: string): string | null {
  const digits = (input || '').replace(/[^\d]/g, '')
  let local: string

  if (digits.startsWith('254')) local = digits.slice(3)
  else if (digits.startsWith('0')) local = digits.slice(1)
  else local = digits

  // Safaricom/Airtel/Telkom mobile prefixes are 7XXXXXXXX or 1XXXXXXXX
  if (!/^[71]\d{8}$/.test(local)) return null
  return `254${local}`
}

/** Daraja's timestamp format: YYYYMMDDHHmmss, East Africa Time. */
function timestamp(): string {
  const now = new Date()
  // Daraja expects EAT (UTC+3) regardless of where the server runs.
  const eat = new Date(now.getTime() + 3 * 60 * 60 * 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    eat.getUTCFullYear().toString() +
    pad(eat.getUTCMonth() + 1) +
    pad(eat.getUTCDate()) +
    pad(eat.getUTCHours()) +
    pad(eat.getUTCMinutes()) +
    pad(eat.getUTCSeconds())
  )
}

async function accessToken(): Promise<string> {
  const key = required('MPESA_CONSUMER_KEY')
  const secret = required('MPESA_CONSUMER_SECRET')
  const basic = Buffer.from(`${key}:${secret}`).toString('base64')

  const res = await fetch(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${basic}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Daraja auth failed (${res.status}): ${await res.text()}`)
  }

  const data = (await res.json()) as { access_token?: string }
  if (!data.access_token) throw new Error('Daraja auth returned no access_token')
  return data.access_token
}

export interface StkPushResult {
  ok: boolean
  checkoutRequestId?: string
  merchantRequestId?: string
  customerMessage?: string
  errorMessage?: string
}

export async function stkPush(params: {
  phone: string
  amount: number
  accountReference: string
  description: string
  callbackUrl: string
}): Promise<StkPushResult> {
  const shortcode = required('MPESA_SHORTCODE')
  const passkey = required('MPESA_PASSKEY')
  const ts = timestamp()
  const password = Buffer.from(`${shortcode}${passkey}${ts}`).toString('base64')

  const token = await accessToken()

  const res = await fetch(`${BASE}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: ts,
      // Paybill uses CustomerPayBillOnline; a Till number uses CustomerBuyGoodsOnline.
      TransactionType:
        process.env.MPESA_SHORTCODE_TYPE === 'till'
          ? 'CustomerBuyGoodsOnline'
          : 'CustomerPayBillOnline',
      Amount: Math.max(1, Math.round(params.amount)),
      PartyA: params.phone,
      PartyB: shortcode,
      PhoneNumber: params.phone,
      CallBackURL: params.callbackUrl,
      // Daraja truncates these hard; keep them short.
      AccountReference: params.accountReference.slice(0, 12),
      TransactionDesc: params.description.slice(0, 13),
    }),
  })

  const data = (await res.json().catch(() => ({}))) as Record<string, string>

  if (!res.ok || data.ResponseCode !== '0') {
    return {
      ok: false,
      errorMessage:
        data.errorMessage || data.ResponseDescription || `Daraja returned ${res.status}`,
    }
  }

  return {
    ok: true,
    checkoutRequestId: data.CheckoutRequestID,
    merchantRequestId: data.MerchantRequestID,
    customerMessage: data.CustomerMessage,
  }
}

export interface StkQueryResult {
  /** '0' means paid. Anything else is pending or failed. */
  resultCode?: string
  resultDesc?: string
  /** True when Daraja says the request is still being processed. */
  stillProcessing: boolean
}

/**
 * Fallback for when the callback cannot reach us — local development, or a
 * dropped webhook. Safaricom answers 500.001.1001 while the user still has
 * the PIN prompt open.
 */
export async function stkQuery(checkoutRequestId: string): Promise<StkQueryResult> {
  const shortcode = required('MPESA_SHORTCODE')
  const passkey = required('MPESA_PASSKEY')
  const ts = timestamp()
  const password = Buffer.from(`${shortcode}${passkey}${ts}`).toString('base64')
  const token = await accessToken()

  const res = await fetch(`${BASE}/mpesa/stkpushquery/v1/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: ts,
      CheckoutRequestID: checkoutRequestId,
    }),
  })

  const data = (await res.json().catch(() => ({}))) as Record<string, string>

  if (data.errorCode === '500.001.1001') {
    return { stillProcessing: true, resultDesc: 'Waiting for the PIN' }
  }

  return {
    resultCode: data.ResultCode,
    resultDesc: data.ResultDesc,
    stillProcessing: false,
  }
}

/** Shape of the callback Safaricom POSTs to us. */
export interface StkCallbackPayload {
  Body?: {
    stkCallback?: {
      MerchantRequestID?: string
      CheckoutRequestID?: string
      ResultCode?: number
      ResultDesc?: string
      CallbackMetadata?: { Item?: Array<{ Name: string; Value?: string | number }> }
    }
  }
}

export function readCallback(payload: StkCallbackPayload) {
  const cb = payload?.Body?.stkCallback
  const items = cb?.CallbackMetadata?.Item || []
  const pick = (name: string) => items.find(i => i.Name === name)?.Value

  return {
    checkoutRequestId: cb?.CheckoutRequestID,
    merchantRequestId: cb?.MerchantRequestID,
    resultCode: cb?.ResultCode,
    resultDesc: cb?.ResultDesc,
    amount: pick('Amount') as number | undefined,
    receipt: pick('MpesaReceiptNumber') as string | undefined,
    phone: pick('PhoneNumber') as string | number | undefined,
  }
}
