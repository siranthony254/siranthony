import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib'

// Social DRM: stamp the buyer's details on every page. It does not stop a
// determined copier — nothing does — but it makes casual re-sharing personal,
// which is the part that actually works. It also never breaks the reader the
// way hard DRM does.

export interface WatermarkDetails {
  /** Who bought it — name, phone, or email */
  buyer: string
  /** M-Pesa receipt, so a leaked copy traces to one transaction */
  reference?: string
}

export async function watermarkPdf(
  source: ArrayBuffer | Uint8Array,
  details: WatermarkDetails
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(source, { ignoreEncryption: true })
  const font = await pdf.embedFont(StandardFonts.Helvetica)

  const issued = new Date().toISOString().split('T')[0]
  const footer = [
    `Licensed to ${details.buyer}`,
    details.reference ? `Ref ${details.reference}` : null,
    issued,
  ]
    .filter(Boolean)
    .join('  ·  ')

  const pages = pdf.getPages()

  for (const page of pages) {
    const { width, height } = page.getSize()

    // Foot of every page — small, dark, readable but out of the way.
    page.drawText(footer, {
      x: 36,
      y: 20,
      size: 7,
      font,
      color: rgb(0.42, 0.42, 0.42),
    })

    // A faint diagonal across the middle so screenshots carry it too.
    const diagonal = `Licensed to ${details.buyer}`
    const diagonalSize = Math.min(26, Math.max(12, width / (diagonal.length * 0.62)))
    page.drawText(diagonal, {
      x: width * 0.12,
      y: height * 0.42,
      size: diagonalSize,
      font,
      color: rgb(0.55, 0.5, 0.35),
      opacity: 0.1,
      rotate: degrees(32),
    })
  }

  pdf.setTitle(pdf.getTitle() || 'Sir Anthony')
  pdf.setSubject(footer)
  pdf.setProducer('siranthony.online')

  return pdf.save()
}

/** A safe, descriptive filename for the download. */
export function downloadFilename(title: string): string {
  const base = (title || 'ebook')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return `${base || 'ebook'}.pdf`
}
