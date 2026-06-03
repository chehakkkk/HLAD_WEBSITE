"use client";
import { motion } from 'motion/react'
import ScrollReveal from './ScrollReveal'

const items = [
  { h: 'h-52', label: 'Ink wash studies', tone: 'from-charcoal/10 to-saffron/20', src: '/gallery.jpg' },
  { h: 'h-72', label: 'Open mic, monsoon', tone: 'from-saffron/25 to-parchment', src: '/gallery.jpg' },
  { h: 'h-64', label: 'Rare periodicals', tone: 'from-gold-soft/40 to-beige', src: '/gallery.jpg' },
  { h: 'h-44', label: 'Calligraphy lab', tone: 'from-parchment-dark to-saffron-soft/30', src: '/gallery.jpg' },
  { h: 'h-56', label: 'Community archive', tone: 'from-saffron-soft/20 to-white', src: '/gallery.jpg' },
  { h: 'h-68', label: 'Festival of letters', tone: 'from-charcoal/5 to-gold-soft/35', src: '/gallery.jpg' },
]

/* ─── Drifting calligraphy brush-stroke ────────────────────────── */
function DriftingStroke({
  d,
  style,
  duration = 18,
  delay = 0,
  xRange = [0, 12, -6, 10, 0],
  yRange = [0, -8, 4, -6, 0],
}) {
  return (
    <motion.path
      d={d}
      animate={{ x: xRange, y: yRange }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={style}
    />
  )
}

export default function GallerySection() {
  return (
    <section id="gallery" className="section-gallery section-rule-top relative overflow-hidden py-24 md:py-32">
      {/* ── Animated corner: drifting calligraphy strokes ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>

        {/* Top-right — flowing brush strokes drift gently */}
        <motion.svg
          viewBox="0 0 320 260"
          className="absolute -right-8 -top-8 w-64 md:w-80 opacity-[0.13] dark:opacity-[0.07]"
          fill="none"
          aria-hidden
        >
          <DriftingStroke
            d="M20 200 C 60 140, 140 80, 300 30"
            style={{ stroke: 'var(--saffron)', strokeWidth: 2.5, strokeLinecap: 'round' }}
            duration={16}
            delay={0}
            xRange={[0, 10, -5, 8, 0]}
            yRange={[0, -12, 5, -9, 0]}
          />
          <DriftingStroke
            d="M50 240 C 100 170, 190 100, 310 55"
            style={{ stroke: 'var(--gold)', strokeWidth: 1.5, strokeLinecap: 'round' }}
            duration={20}
            delay={1.5}
            xRange={[0, 7, -4, 6, 0]}
            yRange={[0, -8, 3, -6, 0]}
          />
          <DriftingStroke
            d="M0 160 C 50 100, 130 50, 280 10"
            style={{ stroke: 'var(--saffron-soft)', strokeWidth: 1, strokeLinecap: 'round', opacity: 0.6 }}
            duration={14}
            delay={3}
            xRange={[0, 12, -6, 10, 0]}
            yRange={[0, -10, 4, -8, 0]}
          />
          {/* Ink-dot accents */}
          {[[290, 28], [250, 55], [180, 90]].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r={2.5}
              fill="var(--saffron)"
              animate={{ opacity: [0.4, 0.9, 0.3, 0.8, 0.4], scale: [1, 1.4, 0.8, 1.2, 1] }}
              transition={{ duration: 5 + i * 1.5, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.svg>

        {/* Bottom-left — mirror composition, cooler gold tones */}
        <motion.svg
          viewBox="0 0 320 260"
          className="absolute -left-8 -bottom-8 w-56 md:w-72 opacity-[0.10] dark:opacity-[0.06]"
          style={{ transform: 'rotate(180deg)' }}
          fill="none"
          aria-hidden
        >
          <DriftingStroke
            d="M20 200 C 60 140, 140 80, 300 30"
            style={{ stroke: 'var(--gold)', strokeWidth: 2, strokeLinecap: 'round' }}
            duration={19}
            delay={2}
            xRange={[0, -8, 5, -7, 0]}
            yRange={[0, 10, -4, 8, 0]}
          />
          <DriftingStroke
            d="M60 245 C 110 175, 200 105, 310 60"
            style={{ stroke: 'var(--saffron)', strokeWidth: 1.2, strokeLinecap: 'round' }}
            duration={22}
            delay={0.5}
            xRange={[0, -6, 3, -5, 0]}
            yRange={[0, 7, -3, 6, 0]}
          />
        </motion.svg>

        {/* Ambient centre bloom */}
        <motion.div
          className="absolute left-1/2 top-1/3 h-[300px] w-[500px] -translate-x-1/2 rounded-full blur-[80px]"
          style={{ background: 'rgba(255,153,51,0.04)' }}
          animate={{ scale: [1, 1.1, 0.95, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
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
                <div className={`relative ${it.h} overflow-hidden`}>
                  <img
                    src={it.src}
                    alt={it.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Optional: keep a subtle gradient overlay so the caption stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <figcaption className="font-body absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white">
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
