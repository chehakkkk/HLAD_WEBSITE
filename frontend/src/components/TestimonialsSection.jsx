import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const slides = [
  {
    quote:
      'HLAD taught me to read Hindi poetry slowly again—to feel the weight of each syllable.',
    name: 'Meera K.',
    role: 'Graduate student',
  },
  {
    quote: 'The manuscript salon changed how I think about marginalia as living commentary.',
    name: 'Daniel O.',
    role: 'Research fellow',
  },
  {
    quote: 'Our open mic nights feel like a warm study hall with stage lights.',
    name: 'Ishita P.',
    role: 'Club member',
  },
]

export default function TestimonialsSection() {
  const [i, setI] = useState(0)
  const next = () => setI((v) => (v + 1) % slides.length)
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length)

  return (
    <section id="testimonials" className="bg-gradient-to-b from-parchment to-parchment-dark py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <ScrollReveal className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Voices</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">Testimonials</h2>
        </ScrollReveal>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-8 shadow-[0_20px_70px_rgba(42,34,28,0.1)] backdrop-blur-md md:p-12">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-display text-xl italic leading-relaxed text-charcoal md:text-2xl">
                &ldquo;{slides[i].quote}&rdquo;
              </p>
              <footer className="font-body mt-6 text-sm font-semibold text-charcoal">
                {slides[i].name}
                <span className="mt-1 block text-xs font-normal text-charcoal-muted">{slides[i].role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="font-body rounded-full border border-charcoal/15 bg-white/80 px-4 py-2 text-sm font-semibold text-charcoal hover:border-saffron hover:text-saffron"
            >
              ← Prev
            </button>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-2.5 w-2.5 rounded-full ${idx === i ? 'bg-saffron' : 'bg-charcoal/15'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="font-body rounded-full border border-charcoal/15 bg-white/80 px-4 py-2 text-sm font-semibold text-charcoal hover:border-saffron hover:text-saffron"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
