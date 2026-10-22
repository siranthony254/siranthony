// Resend over plain REST — no SDK dependency. If RESEND_API_KEY is not set the
// send is skipped and logged, so the purchase flow still works: the access link
// is shown on screen the moment payment lands. Email is the durability layer,
// not the delivery mechanism.

const FROM = process.env.EMAIL_FROM || 'Sir Anthony <onboarding@resend.dev>'

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY)
}

export async function sendEmail(params: {
  to: string
  subject: string
  html: string
  text: string
}): Promise<{ sent: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.log(`[email skipped — no RESEND_API_KEY] to=${params.to} subject=${params.subject}`)
    return { sent: false, error: 'not configured' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [params.to],
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('Resend send failed:', res.status, detail)
      return { sent: false, error: `Resend ${res.status}` }
    }
    return { sent: true }
  } catch (error) {
    console.error('Resend send threw:', error)
    return { sent: false, error: 'network' }
  }
}

export function accessEmail(params: {
  ebookTitle: string
  accessUrl: string
  receipt?: string
  amount?: number
}) {
  const { ebookTitle, accessUrl, receipt, amount } = params

  const text = `Thank you — your copy of "${ebookTitle}" is ready.

Open it here (keep this link, it is your access):
${accessUrl}

${receipt ? `M-Pesa receipt: ${receipt}\n` : ''}${amount ? `Amount: KES ${amount}\n` : ''}
Your name is stamped on the file. Please do not pass it on.

If the download does not work, reply to this email and I will sort it out.

— Sir Anthony
siranthony.online`

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#0D1B2A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;color:#F5F0E8;">
    <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#C9A84C;margin:0 0 24px;">Sir Anthony</p>
    <h1 style="font-size:24px;font-weight:600;margin:0 0 16px;color:#F5F0E8;">Your copy is ready</h1>
    <p style="font-size:15px;line-height:1.7;color:rgba(245,240,232,.75);margin:0 0 28px;">
      Thank you for buying <strong style="color:#F5F0E8;">${escapeHtml(ebookTitle)}</strong>.
      Keep the link below — it is your access to the download.
    </p>
    <p style="margin:0 0 28px;">
      <a href="${escapeHtml(accessUrl)}"
         style="display:inline-block;background:#C9A84C;color:#0D1B2A;text-decoration:none;font-weight:600;font-size:14px;padding:14px 28px;border-radius:999px;">
        Open your download
      </a>
    </p>
    ${
      receipt || amount
        ? `<p style="font-size:13px;color:rgba(245,240,232,.45);margin:0 0 24px;">
             ${receipt ? `M-Pesa receipt: ${escapeHtml(receipt)}<br/>` : ''}
             ${amount ? `Amount: KES ${amount}` : ''}
           </p>`
        : ''
    }
    <p style="font-size:13px;line-height:1.7;color:rgba(245,240,232,.45);border-top:1px solid rgba(201,168,76,.2);padding-top:20px;margin:0;">
      Your name is stamped on the file. Please do not pass it on.<br/><br/>
      If the download does not work, reply to this email and I will sort it out.
    </p>
  </div>
</body></html>`

  return { text, html }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
