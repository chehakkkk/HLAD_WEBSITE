import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const items = [
  { h: 'h-52', label: 'Ink wash studies', tone: 'from-charcoal/10 to-saffron/20' },
  { h: 'h-72', label: 'Open mic, monsoon', tone: 'from-saffron/25 to-parchment' },
  { h: 'h-64', label: 'Rare periodicals', tone: 'from-gold-soft/40 to-beige' },
  { h: 'h-44', label: 'Calligraphy lab', tone: 'from-parchment-dark to-saffron-soft/30' },
  { h: 'h-56', label: 'Community archive', tone: 'from-saffron-soft/20 to-white' },
  { h: 'h-68', label: 'Festival of letters', tone: 'from-charcoal/5 to-gold-soft/35' },
]

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-parchment py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Visual archive</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">Gallery</h2>
          <p className="font-body mt-4 max-w-2xl text-charcoal-muted">
            Masonry collage of evenings, artefacts, and textures from our literary life together.
          </p>
        </ScrollReveal>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((it, i) => (
            <ScrollReveal key={it.label} delay={i * 0.04} className="mb-4 break-inside-avoid">
              <motion.figure
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35 }}
                className={`overflow-hidden rounded-2xl border border-white/70 bg-white/60 shadow-[0_12px_40px_rgba(42,34,28,0.08)] backdrop-blur-sm`}
              >
                <div className={`relative ${it.h} bg-gradient-to-br ${it.tone} cross-pattern`}>
                  <figcaption className="font-body absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4 text-sm font-medium text-white">
                    {it.label}
                  </figcaption>
                </div>
              </motion.figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
