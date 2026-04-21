'use client'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const INQUIRY_TYPES = [
  'Speaking / Keynote',
  'Cultural Training (Organization)',
  'Cultural Training (School/Church)',
  'Digital Strategy / Web Development',
  "Mic'd Up Initiative Partnership",
  'Book / Writing',
  'General Inquiry',
]

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm]   = useState({
    name: '', email: '', organization: '', phone: '',
    inquiryType: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={48} className="text-gold mb-6" />
        <h3 className="font-display text-2xl font-semibold text-cream mb-3">
          Message received.
        </h3>
        <p className="font-body text-cream/55 leading-relaxed max-w-md">
          Thank you for reaching out. Sir Anthony will be in touch within 48 hours.
          The conversation is just beginning.
        </p>
      </div>
    )
  }

  const inputClass = [
    'w-full bg-white/[0.04] border border-gold/15 rounded-lg px-4 py-3',
    'font-body text-sm text-cream placeholder-cream/25',
    'focus:outline-none focus:border-gold/40 focus:bg-white/[0.06]',
    'transition-all duration-200',
  ].join(' ')

  const labelClass = 'block font-body text-xs text-cream/45 uppercase tracking-wider mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input
            id="name" name="name" type="text" required
            value={form.name} onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input
            id="email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organization" className={labelClass}>Organization</label>
          <input
            id="organization" name="organization" type="text"
            value={form.organization} onChange={handleChange}
            placeholder="Company / institution"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="+254 700 000 000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="inquiryType" className={labelClass}>What are you reaching out about? *</label>
        <select
          id="inquiryType" name="inquiryType" required
          value={form.inquiryType} onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>Select an inquiry type</option>
          {INQUIRY_TYPES.map(type => (
            <option key={type} value={type} className="bg-navy">{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Your Message *</label>
        <textarea
          id="message" name="message" required rows={6}
          value={form.message} onChange={handleChange}
          placeholder="Tell Sir Anthony about your context — your organization, what you are trying to accomplish, and what kind of engagement you have in mind..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === 'error' && (
        <p className="font-body text-xs text-red-400 bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3">
          Something went wrong. Please try again or reach out directly by phone.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? (
          <>Sending...</>
        ) : (
          <>Send Message <Send size={14} /></>
        )}
      </button>

      <p className="font-body text-xs text-cream/25 text-center">
        Expect a response within 48 hours.
      </p>
    </form>
  )
}
