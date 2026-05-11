import { useCallback, useMemo, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const floatingTags = [
  { label: 'साहित्य', top: '8%', right: '6%', delay: 0 },
  { label: 'कविता', bottom: '14%', left: '42%', delay: 0.4 },
  { label: 'कला', top: '38%', right: '4%', delay: 0.2 },
  { label: 'संवाद', bottom: '28%', right: '18%', delay: 0.6 },
]

function LiterarySymbol() {
  return (
    <div className="relative z-[2] flex h-full min-h-[280px] items-center justify-center md:min-h-[420px]">
      <svg
        viewBox="0 0 320 400"
        className="relative w-[min(92vw,420px)] max-w-full drop-shadow-[0_20px_50px_rgba(224,120,44,0.25)]"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="saffronStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4a862" />
            <stop offset="50%" stopColor="#e0782c" />
            <stop offset="100%" stopColor="#c45f18" />
          </linearGradient>
        </defs>
        <path
          d="M 210 40 C 160 90 130 160 118 240 C 112 285 108 320 104 360 L 96 372 L 118 352 C 140 318 168 280 198 248 C 248 198 278 150 288 98 C 292 72 288 52 270 44 C 248 34 228 36 210 40 Z"
          stroke="url(#saffronStroke)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 210 40 C 235 55 252 78 258 108 C 262 132 255 158 238 182"
          stroke="url(#saffronStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path d="M 104 360 L 88 388 L 122 368 Z" fill="#e0782c" opacity="0.9" />
      </svg>
    </div>
  )
}

function Particles({ reduced }) {
  const items = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${8 + ((i * 17) % 84)}%`,
        top: `${10 + ((i * 23) % 78)}%`,
        delay: (i % 5) * 0.35,
        size: 3 + (i % 3),
        duration: 10 + (i % 5),
      })),
    [],
  )
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-saffron/25"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -32, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function PaperFragments({ reduced }) {
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm border border-saffron/15 bg-white/35 shadow-sm backdrop-blur-[2px]"
          style={{
            width: 36 + i * 8,
            height: 22 + i * 4,
            left: `${18 + i * 22}%`,
            bottom: `${8 + i * 6}%`,
            rotate: -6 + i * 5,
          }}
          animate={{ y: [0, -10, 0], rotate: [-6 + i * 5, -2 + i * 5, -6 + i * 5] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const reduced = usePrefersReducedMotion()
  const heroRef = useRef(null)
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 })

  const mx = useSpring(0.5, { stiffness: 60, damping: 28 })
  const my = useSpring(0.5, { stiffness: 60, damping: 28 })

  const onMove = useCallback(
    (e) => {
      if (!heroRef.current || reduced) return
      const r = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      mx.set(Math.min(1, Math.max(0, x)))
      my.set(Math.min(1, Math.max(0, y)))
      setCursor({ x, y })
    },
    [mx, my, reduced],
  )

  const onLeave = useCallback(() => {
    mx.set(0.5)
    my.set(0.5)
    setCursor({ x: 0.5, y: 0.5 })
  }, [mx, my])

  const parallaxX = useTransform(mx, [0, 1], reduced ? [0, 0] : [-12, 12])
  const parallaxY = useTransform(my, [0, 1], reduced ? [0, 0] : [-10, 10])

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-parchment via-parchment to-parchment-dark pt-28 pb-16 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-1/4 top-0 h-[80%] w-[70%] rounded-full bg-gradient-to-br from-saffron-soft/25 via-transparent to-transparent blur-3xl"
          animate={
            reduced
              ? undefined
              : {
                  x: [0, 24, 0],
                  y: [0, 16, 0],
                  opacity: [0.35, 0.5, 0.35],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[85%] w-[65%] rounded-full bg-gradient-to-tl from-saffron/20 via-gold-soft/15 to-transparent blur-3xl"
          animate={
            reduced
              ? undefined
              : {
                  x: [0, -20, 0],
                  y: [0, -12, 0],
                  opacity: [0.3, 0.48, 0.3],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(224,120,44,0.14), transparent 55%)`,
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute left-[5%] top-[20%] h-72 w-72 rounded-full border border-charcoal" />
        <div className="absolute right-[8%] top-[12%] h-96 w-96 rounded-full border border-charcoal" />
        <div className="absolute bottom-[10%] left-[30%] h-48 w-48 rounded-full border border-charcoal" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.12]">
        <div className="h-[min(70vh,620px)] w-[min(88vw,520px)] rotate-6 rounded-3xl border border-charcoal" />
        <div className="absolute h-[min(65vh,560px)] w-[min(82vw,480px)] -rotate-3 rounded-3xl border border-charcoal" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-6 md:px-6 lg:gap-10">
        <motion.div
          className="flex flex-col justify-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mb-8 flex w-fit items-center gap-3 rounded-2xl border border-white/70 bg-white/60 p-3 pr-5 shadow-[0_12px_40px_rgba(42,34,28,0.08)] backdrop-blur-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-saffron-deep text-lg text-white shadow-md">
              📖
            </div>
            <div>
              <span className="font-body inline-block rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal">
                Since 2010
              </span>
              <div className="font-display text-lg font-bold text-charcoal">HLAD</div>
              <div className="font-hindi text-sm font-medium text-saffron">हिंदी साहित्य</div>
            </div>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="font-hindi text-[clamp(3.2rem,10vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-charcoal"
          >
            ह्लाद
          </motion.h1>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="font-display mt-1 text-[clamp(2.8rem,8vw,4.5rem)] font-bold leading-none tracking-tight text-saffron"
          >
            HLAD
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="font-display mt-4 max-w-md text-lg font-medium leading-snug text-charcoal md:text-xl"
          >
            Hindi Literature &amp; Arts Division
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="relative mt-8 max-w-lg rounded-2xl border border-white/80 border-l-4 border-saffron bg-white/70 p-6 pl-6 shadow-[0_20px_60px_rgba(42,34,28,0.1)] backdrop-blur-xl md:pl-7"
          >
            <p className="font-hindi text-lg leading-relaxed text-charcoal">
              निज भाषा उन्नति अहै, सब उन्नति को मूल ।
            </p>
            <p className="font-display mt-3 text-base italic leading-relaxed text-charcoal-muted">
              &ldquo;Progress of one&apos;s own language is the root of all progress.&rdquo;
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="#events"
              className="font-body inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(224,120,44,0.45)] ring-1 ring-white/30 transition-shadow hover:shadow-[0_16px_48px_rgba(224,120,44,0.55)]"
            >
              Join the Club
              <span aria-hidden>✒</span>
            </MagneticButton>
            <MagneticButton
              href="#events"
              className="font-body inline-flex items-center gap-2 rounded-xl border-2 border-charcoal/85 bg-white/80 px-7 py-3.5 text-sm font-semibold text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:border-saffron hover:text-saffron"
            >
              Explore Events
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex min-h-[320px] items-center justify-center md:min-h-[520px]"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[min(90%,480px)] w-[min(90%,480px)] rounded-full bg-gradient-to-br from-saffron/30 via-gold-soft/10 to-transparent blur-3xl" />
          </div>

          <Particles reduced={reduced} />
          <PaperFragments reduced={reduced} />

          {floatingTags.map((t) => (
            <motion.span
              key={t.label}
              className="font-hindi pointer-events-none absolute z-[3] rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-xs font-semibold text-saffron shadow-md backdrop-blur-md"
              style={{ top: t.top, right: t.right, bottom: t.bottom, left: t.left }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.5 + t.delay, duration: 0.5 },
                y: { duration: 5 + t.delay * 2, repeat: Infinity, ease: 'easeInOut', delay: t.delay },
              }}
            >
              {t.label}
            </motion.span>
          ))}

          <LiterarySymbol />

          <motion.button
            type="button"
            className="font-body absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal-muted"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Scroll
            <span className="flex h-9 w-6 items-start justify-center rounded-full border border-charcoal/20 bg-white/50 p-1 backdrop-blur-sm">
              <span className="mt-1 block h-1.5 w-1 rounded-full bg-saffron" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
