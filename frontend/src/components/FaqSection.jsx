import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const faqs = [
  {
    q: 'How do I join HLAD?',
    a: 'Attend any open event or use the “Join the Club” call-to-action—intro sessions run each term for new members.',
  },
  {
    q: 'Do I need fluent Hindi?',
    a: 'No. We welcome curious readers at every level; many sessions are bilingual with patient facilitation.',
  },
  {
    q: 'Are events hybrid?',
    a: 'Select salons stream live; workshops and open mics are primarily in person to preserve the intimacy of shared recitation.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-beige/40 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <ScrollReveal className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">FAQ</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">Questions</h2>
        </ScrollReveal>

        <div className="mt-12 space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = open === idx
            return (
              <ScrollReveal key={item.q} delay={idx * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    className="font-body flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-charcoal md:text-base"
                  >
                    {item.q}
                    <span className="text-saffron">{isOpen ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-charcoal/5"
                      >
                        <p className="font-body px-5 pb-4 pt-2 text-sm leading-relaxed text-charcoal-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
