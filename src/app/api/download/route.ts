import { NextRequest, NextResponse } from 'next/server'
import { findByAccessToken, getEbookPdfUrl, recordDownload } from '@/lib/purchases'
import { watermarkPdf, downloadFilename } from '@/lib/watermark'

export const dynamic = 'force-dynamic'
// Watermarking loads the whole PDF into memory; give it room to work.
export const maxDuration = 60

// Above this we stream the file through untouched rather than buffering it.
// Watermarking needs the entire document in memory twice over — once parsed,
// once serialised — so a large book would exhaust the function before it
// finished. Default 24MB comfortably covers a text ebook.
const MAX_WATERMARK_BYTES = Number(process.env.MAX_WATERMARK_BYTES || 24 * 1024 * 1024)

// A ceiling on what we will serve at all, to avoid hitting the platform's
// response timeout mid-transfer and handing the buyer a corrupt file.
const MAX_DOWNLOAD_BYTES = Number(process.env.MAX_DOWNLOAD_BYTES || 200 * 1024 * 1024)

// The only route that can hand over the file.
//
// The PDF's Sanity URL is never sent to a browser. It is fetched here, on the
// server, stamped with the buyer's details, and streamed straight back. There
// is no URL a buyer could share that would give someone else the file.
export async function GET(req: NextRequest) {
  const token =
    req.nextUrl.searchParams.get('token') || req.cookies.get('sa_access')?.value || ''

  if (!token) {
    return NextResponse.json({ error: 'No access token.' }, { status: 401 })
  }

  try {
    const purchase = await findByAccessToken(token)

    if (!purchase) {
      return NextResponse.json({ error: 'That link is not valid.' }, { status: 403 })
    }
    if (purchase.status !== 'paid') {
      return NextResponse.json(
        { error: 'This payment has not completed yet.' },
        { status: 402 }
      )
    }
    if (!purchase.ebook?._id) {
      return NextResponse.json({ error: 'This purchase has no book attached.' }, { status: 409 })
    }

    const ebook = await getEbookPdfUrl(purchase.ebook._id)
    if (!ebook?.url) {
      return NextResponse.json(
        { error: 'The file is missing. Please get in touch.' },
        { status: 409 }
      )
    }

    const filename = downloadFilename(ebook.title || purchase.ebookTitle || 'ebook')

    const buyer =
      purchase.buyerName?.trim() ||
      purchase.email?.trim() ||
      (purchase.phone ? maskPhone(purchase.phone) : 'a verified buyer')

    // Ask for the size first so we can decide how to serve it without ever
    // pulling an oversized file into memory to find out.
    const declaredSize = await headContentLength(ebook.url)

    if (declaredSize !== null && declaredSize > MAX_DOWNLOAD_BYTES) {
      console.error(`Refusing ${ebook.title}: ${declaredSize} bytes exceeds the download ceiling`)
      return NextResponse.json(
        { error: 'This file is too large to serve. Please get in touch and I will send it.' },
        { status: 413 }
      )
    }

    const source = await fetch(ebook.url, { cache: 'no-store' })
    if (!source.ok || !source.body) {
      console.error('Could not fetch source PDF:', source.status, ebook.url)
      return NextResponse.json({ error: 'Could not read the file.' }, { status: 502 })
    }

    const size = declaredSize ?? Number(source.headers.get('content-length') || 0)

    // ── Too big to watermark: stream it through, never buffering it ──
    if (size > MAX_WATERMARK_BYTES) {
      console.warn(
        `${ebook.title} is ${size} bytes — over the ${MAX_WATERMARK_BYTES} watermark limit. Streaming unstamped.`
      )
      await recordDownload(purchase._id)
      return new NextResponse(source.body, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          ...(size ? { 'Content-Length': String(size) } : {}),
          'Cache-Control': 'private, no-store, max-age=0',
        },
      })
    }

    // ── Normal path: buffer, stamp, return ──
    const original = await source.arrayBuffer()

    // A server that lied about Content-Length must not blow the function up.
    if (original.byteLength > MAX_WATERMARK_BYTES) {
      console.warn(
        `${ebook.title} declared ${size} but is ${original.byteLength} bytes. Serving unstamped.`
      )
      await recordDownload(purchase._id)
      return pdfResponse(new Uint8Array(original), filename)
    }

    let bytes: Uint8Array
    try {
      bytes = await watermarkPdf(original, {
        buyer,
        reference: purchase.mpesaReceipt,
      })
    } catch (error) {
      // A PDF pdf-lib cannot parse must not cost someone the thing they bought.
      console.error('Watermarking failed, serving the original:', error)
      bytes = new Uint8Array(original)
    }

    await recordDownload(purchase._id)
    return pdfResponse(bytes, filename)
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

function pdfResponse(body: Uint8Array, filename: string): NextResponse {
  // BodyInit takes an ArrayBufferView; hand it the underlying bytes.
  return new NextResponse(body as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(body.byteLength),
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })
}

/** Size of the remote file, or null if the host will not say. */
async function headContentLength(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-store' })
    if (!res.ok) return null
    const length = res.headers.get('content-length')
    if (!length) return null
    const parsed = Number(length)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null
  } catch {
    return null
  }
}

function maskPhone(phone: string): string {
  return phone.length > 6 ? `${phone.slice(0, 6)}***${phone.slice(-2)}` : phone
}
