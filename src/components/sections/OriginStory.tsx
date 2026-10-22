import Link from 'next/link'
import { AnimatedSection } from '@/components/ui'

// Deliberately the quietest section on the page: one column, no eyebrow,
// no gold rule, no oversized display heading. After the hero's volume this
// should feel like someone lowering their voice to tell you something.
export function OriginStory() {
  return (
    <section className="bg-navy border-y border-gold/10 py-24 md:py-32">
      <div className="container-site">
        <div className="max-w-2xl">
          <AnimatedSection direction="in">
            <p className="font-body text-cream/75 text-lg leading-[1.85] mb-8">
              I came home after my first year at university. The next morning a friend
              looked at me and asked, almost before saying hello:
            </p>
          </AnimatedSection>

          <AnimatedSection direction="in" delay={200}>
            <blockquote className="border-l-2 border-gold/40 pl-6 md:pl-8 my-10">
              <p className="font-display italic text-cream text-2xl md:text-3xl leading-[1.4]">
                &ldquo;Are you still the same saint-like person we knew — or have you
                become a drunkard like everyone else who goes there?&rdquo;
              </p>
            </blockquote>
          </AnimatedSection>

          <AnimatedSection direction="in" delay={350}>
            <p className="font-body text-cream/75 text-lg leading-[1.85] mb-6">
              We laughed. We were used to joking. But it stayed with me — not the
              question about me, the question behind it. Why had campus become
              associated with that? Who decided that was what happens there?
            </p>
            <p className="font-body text-cream/75 text-lg leading-[1.85] mb-10">
              Nobody had announced it. No one voted on it. It had simply been built —
              quietly, by ordinary people making small repeated choices — until it was
              just what everyone knew to be true. That is culture. And I have not been
              able to put the question down since.
            </p>

            <Link
              href="/about"
              className="font-body text-sm text-gold/70 hover:text-gold transition-colors border-b border-gold/25 hover:border-gold/60 pb-0.5"
            >
              The rest of how I got here
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
