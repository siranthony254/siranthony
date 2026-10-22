import { timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

// Safaricom does not sign its callbacks, so the payload alone proves nothing.
// Three independent layers make up for it, in increasing order of strength:
//
//   1. an unguessable secret in the callback path
//   2. an IP allowlist
//   3. asking Daraja itself whether the payment really happened
//
// Layer 3 is the one that actually settles it and lives in the callback route.
// These two are here to keep obvious junk from ever reaching it.

// Published Safaricom callback ranges. They have added addresses without
// notice before, which is exactly why this is not the only check.
const SAFARICOM_RANGES = ['196.201.212.0/24', '196.201.213.0/24', '196.201.214.0/24']

function ipToLong(ip: string): number | null {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return null
  let out = 0
  for (const part of parts) {
    const n = Number(part)
    if (!Number.isInteger(n) || n < 0 || n > 255) return null
    out = out * 256 + n
  }
  return out
}

function inCidr(ip: string, cidr: string): boolean {
  const [range, bitsRaw] = cidr.split('/')
  const bits = Number(bitsRaw)
  const ipLong = ipToLong(ip)
  const rangeLong = ipToLong(range)
  if (ipLong === null || rangeLong === null || !Number.isInteger(bits)) return false
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
  return (ipLong & mask) === (rangeLong & mask)
}

/** Best-effort client IP behind Vercel's proxy. */
export function clientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    // Left-most entry is the original client.
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return req.headers.get('x-real-ip')?.trim() || null
}

export interface IpCheck {
  allowed: boolean
  ip: string | null
  /** True when the allowlist is switched off, so nothing was actually checked. */
  skipped: boolean
}

/**
 * Off by default. Safaricom rotates addresses, and a stale allowlist silently
 * rejecting real payments is worse than relying on the secret path plus the
 * Daraja verification. Turn it on with MPESA_VERIFY_CALLBACK_IP=true once you
 * are live and watching the logs.
 */
export function checkSafaricomIp(req: NextRequest): IpCheck {
  const enabled = process.env.MPESA_VERIFY_CALLBACK_IP === 'true'
  const ip = clientIp(req)

  if (!enabled) return { allowed: true, ip, skipped: true }
  if (!ip) return { allowed: false, ip: null, skipped: false }

  const extra = (process.env.MPESA_EXTRA_CALLBACK_IPS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const allowed =
    SAFARICOM_RANGES.some(range => inCidr(ip, range)) ||
    extra.some(entry => (entry.includes('/') ? inCidr(ip, entry) : entry === ip))

  return { allowed, ip, skipped: false }
}

/** Constant-time compare of the secret path segment. */
export function callbackSecretMatches(provided: string): boolean {
  const expected = process.env.MPESA_CALLBACK_SECRET
  if (!expected) {
    // Nothing configured — accept, but the route logs a warning so this is
    // never silently the state of a live site.
    return true
  }
  const a = Buffer.from(provided || '', 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** The path Daraja should call back on, secret included when configured. */
export function callbackPath(): string {
  const secret = process.env.MPESA_CALLBACK_SECRET
  return secret ? `/api/mpesa/callback/${secret}` : '/api/mpesa/callback/unsecured'
}
