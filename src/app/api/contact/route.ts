import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, organization, phone, inquiryType, message } = body

    // Validate required fields
    if (!name || !email || !message || !inquiryType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // ── Option A: Resend (recommended) ──────────────────────────
    // Uncomment and install: npm install resend
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@siranthony.com',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `New inquiry: ${inquiryType} — ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Organization:</strong> ${organization || '—'}</p>
    //     <p><strong>Phone:</strong> ${phone || '—'}</p>
    //     <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
    //     <hr />
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br/>')}</p>
    //   `,
    // })

    // ── Option B: Nodemailer (Gmail / SMTP) ──────────────────────
    // Uncomment and install: npm install nodemailer @types/nodemailer
    //
    // import nodemailer from 'nodemailer'
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    // })
    // await transporter.sendMail({
    //   from: process.env.GMAIL_USER,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New inquiry: ${inquiryType} — ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nOrg: ${organization}\nPhone: ${phone}\nType: ${inquiryType}\n\n${message}`,
    // })

    // ── For now: log to console (replace with one of the above) ──
    console.log('Contact form submission:', { name, email, organization, phone, inquiryType, message })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
