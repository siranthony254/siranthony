'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PILLARS = [
  {
    num: '01',
    title: 'Culture',
    body:
      'Not what your tribe did — what you do every day without noticing. The small ignored things that compound into the way of life a generation inherits.',
  },
  {
    num: '02',
    title: 'Individual',
    body:
      'Every person is already shaping culture whether they know it or not. An idea is an invitation. What are you inviting people toward?',
  },
  {
    num: '03',
    title: 'Leadership',
    body:
      'Not a title. The moment you influence anyone — including yourself. Leaders either amplify the best of what people carry or corrupt it.',
  },
  {
    num: '04',
    title: 'Building',
    body:
      'Understanding how culture is made is the first step to shaping it deliberately — in families, organizations, schools, and communities.',
  },
]

export function SignatureQuestion() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-pad bg-navy relative overflow-hidden">
      {/* Gold accent line left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="container-site">
        {/* Central statement */}
        <div ref={ref} className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            The Work
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <h2
              className="font-display font-semibold text-cream mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              Culture is not built in parliaments
              <br />
              or pulpits.{' '}
              <em className="text-gold">It is built in the{' '}
              <span className="underline decoration-gold/40 underline-offset-4">
                smallest repeated choices
              </span>{' '}
              of ordinary people.</em>
            </h2>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-body text-cream/55 text-lg leading-relaxed"
          >
            Sir Anthony helps individuals, organizations, and institutions understand
            how culture is built — and develop the thinking to shape it deliberately.
          </motion.p>
        </div>

        {/* Four pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="card-navy p-6 group"
            >
              <p className="font-display text-4xl font-light text-gold/20 group-hover:text-gold/40 transition-colors duration-300 mb-4 leading-none">
                {pillar.num}
              </p>
              <h3 className="font-display text-xl font-semibold text-cream mb-3">
                {pillar.title}
              </h3>
              <div className="w-6 h-px bg-gold/40 mb-4 group-hover:w-10 transition-all duration-300" />
              <p className="font-body text-sm text-cream/50 leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
