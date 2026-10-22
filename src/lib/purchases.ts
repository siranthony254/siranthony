import { createClient } from '@sanity/client'
import { createHmac, randomBytes, timingSafeEqual } from 'crypto'
import { sanityConfig } from '@/lib/sanity'

// A separate client with a write token. Purchases are the only thing it writes.
const writeClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export function purchasesConfigured(): boolean {
  return Boolean(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN)
}

// ── Access tokens ────────────────────────────────────────────────
// The raw token goes to the buyer. Only its HMAC is stored, so a leaked
// dataset does not hand anyone a working download link.

function tokenSecret(): string {
  return (
    process.env.ACCESS_TOKEN_SECRET ||
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    'insecure-development-secret'
  )
}

export function newAccessToken(): string {
  return randomBytes(24).toString('base64url')
}

export function hashAccessToken(token: string): string {
  return createHmac('sha256', tokenSecret()).update(token).digest('hex')
}

function hashesMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

// ── Records ──────────────────────────────────────────────────────

export interface PurchaseRecord {
  _id: string
  status: 'pending' | 'paid' | 'failed'
  ebookTitle?: string
  phone?: string
  email?: string
  buyerName?: string
  amount?: number
  mpesaReceipt?: string
  resultDesc?: string
  downloadCount?: number
  accessTokenHashes?: string[]
  ebook?: { _id: string; slug?: string; title?: string }
}

const PURCHASE_PROJECTION = `
  _id, status, ebookTitle, phone, email, buyerName, amount,
  mpesaReceipt, resultDesc, downloadCount, accessTokenHashes,
  ebook->{ _id, title, "slug": slug.current }
`

export async function createPendingPurchase(input: {
  ebookId: string
  ebookTitle: string
  amount: number
  phone: string
  email?: string
  buyerName?: string
  checkoutRequestId: string
  merchantRequestId?: string
  accessTokenHash: string
}): Promise<string> {
  const doc = await writeClient.create({
    _type: 'purchase',
    status: 'pending',
    ebook: { _type: 'reference', _ref: input.ebookId },
    ebookTitle: input.ebookTitle,
    amount: input.amount,
    phone: input.phone,
    email: input.email,
    buyerName: input.buyerName,
    checkoutRequestId: input.checkoutRequestId,
    merchantRequestId: input.merchantRequestId,
    accessTokenHashes: [input.accessTokenHash],
    downloadCount: 0,
    createdAt: new Date().toISOString(),
  })
  return doc._id
}

export async function findByCheckoutRequestId(
  checkoutRequestId: string
): Promise<PurchaseRecord | null> {
  return writeClient.fetch<PurchaseRecord | null>(
    `*[_type == "purchase" && checkoutRequestId == $id][0]{ ${PURCHASE_PROJECTION} }`,
    { id: checkoutRequestId }
  )
}

/**
 * Look a purchase up by the raw token the buyer holds. Compares HMACs, so the
 * token is never stored anywhere it could be read back.
 */
export async function findByAccessToken(token: string): Promise<PurchaseRecord | null> {
  if (!token) return null
  const hash = hashAccessToken(token)
  const record = await writeClient.fetch<PurchaseRecord | null>(
    `*[_type == "purchase" && $hash in accessTokenHashes][0]{ ${PURCHASE_PROJECTION} }`,
    { hash }
  )
  const stored = record?.accessTokenHashes || []
  if (stored.length === 0) return null
  return stored.some(candidate => hashesMatch(candidate, hash)) ? record : null
}

/** Issue an extra valid token for an existing purchase (the emailed link). */
export async function addAccessTokenHash(id: string, hash: string): Promise<void> {
  await writeClient
    .patch(id)
    .setIfMissing({ accessTokenHashes: [] })
    .append('accessTokenHashes', [hash])
    .commit()
}

export async function markPaid(
  id: string,
  data: { mpesaReceipt?: string; amount?: number; phone?: string; resultDesc?: string }
): Promise<void> {
  await writeClient
    .patch(id)
    .set({
      status: 'paid',
      paidAt: new Date().toISOString(),
      ...(data.mpesaReceipt ? { mpesaReceipt: data.mpesaReceipt } : {}),
      ...(data.amount ? { amount: data.amount } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.resultDesc ? { resultDesc: data.resultDesc } : {}),
    })
    .commit()
}

export async function markFailed(id: string, resultDesc?: string): Promise<void> {
  await writeClient.patch(id).set({ status: 'failed', resultDesc: resultDesc || '' }).commit()
}

export async function recordDownload(id: string): Promise<void> {
  await writeClient
    .patch(id)
    .setIfMissing({ downloadCount: 0 })
    .inc({ downloadCount: 1 })
    .commit()
    .catch(() => {
      /* a failed counter must never block a paid download */
    })
}

/** Server-side lookup of the private PDF URL. Never sent to a browser. */
export async function getEbookPdfUrl(
  ebookId: string
): Promise<{ url: string; title: string } | null> {
  return writeClient.fetch<{ url: string; title: string } | null>(
    `*[_type == "ebook" && _id == $id][0]{ "url": pdf.asset->url, title }`,
    { id: ebookId }
  )
}
