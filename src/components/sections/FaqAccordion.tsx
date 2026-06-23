'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { AnimatedSection } from '@/components/ui'
import type { Faq } from '@/types'

interface FaqAccordionProps {
  faqs: Faq[]
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, i) => {
        const isOpen = openId === faq._id
        return (
          <AnimatedSection key={faq._id} delay={i * 50}>
            <div className={`card-navy border transition-all duration-300 ${isOpen ? 'border-gold/30 bg-gold/5' : 'border-gold/5'}`}>
              <button
                onClick={() => toggle(faq._id)}
                className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="font-display text-lg font-medium text-cream group-hover:text-gold transition-colors">
                  {faq.question}
                </span>
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] border-t border-gold/10' : 'max-h-0'}`}>
                <div className="p-6 font-body text-cream/70 text-sm leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )
      })}
    </div>
  )
}
