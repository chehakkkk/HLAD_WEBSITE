import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const FEATHER_MAIN =
  'M 210 40 C 160 90 130 160 118 240 C 112 285 108 320 104 360 L 96 372 L 118 352 C 140 318 168 280 198 248 C 248 198 278 150 288 98 C 292 72 288 52 270 44 C 248 34 228 36 210 40 Z'
const FEATHER_DETAIL =
  'M 210 40 C 235 55 252 78 258 108 C 262 132 255 158 238 182'
const FEATHER_QUILL = 'M 104 360 L 88 388 L 122 368 Z'

const literaryTags = [
  { label: 'कविता', top: '6%', left: '8%', delay: 0.05, float: 5.5 },
  { label: 'साहित्य', top: '22%', right: '4%', delay: 0.2, float: 6.5 },
  { label: 'संवाद', bottom: '18%', left: '12%', delay: 0.35, float: 5 },
]

function LiterarySymbol({ mx, my, reduced }) {
  const rid = useId().replace(/:/g, '')
  const gradId = `lit-grad-${rid}`
  const glowId = `lit-glow-${rid}`

  const innerX = useTransform(mx, [0, 1], reduced ? [0, 0] : [-14, 14])
  const innerY = useTransform(my, [0, 1], reduced ? [0, 0] : [-12, 12])
  const tilt = useTransform(mx, [0, 1], reduced ? [0, 0] : [-4, 4])

  return (
    <div className="relative z-[2] flex h-full min-h-[280px] items-center justify-center md:min-h-[420px]">
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute h-[min(112%,560px)] w-[min(112%,560px)] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(252, 214, 160, 0.55) 0%, rgba(244, 168, 98, 0.28) 38%, rgba(224, 120, 44, 0.08) 58%, transparent 72%)',
          }}
          animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="relative flex items-center justify-center"
        style={{ x: innerX, y: innerY, rotate: tilt }}
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 320 400"
          className="relative w-[min(92vw,440px)] max-w-full"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`ghost-${rid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c45f18" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e0782c" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fcd6a0" />
              <stop offset="35%" stopColor="#f4a862" />
              <stop offset="65%" stopColor="#e0782c" />
              <stop offset="100%" stopColor="#a84a10" />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                from="0 160 200"
                to="360 160 200"
                dur="18s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g opacity="0.22" stroke={`url(#ghost-${rid})`} strokeWidth="1.25">
            <path d="M 160 36 L 278 118 L 236 268 L 160 352 L 84 268 L 42 118 Z" />
            <path d="M 160 52 L 258 124 L 222 256 L 160 324 L 98 256 L 62 124 Z" />
          </g>

          <motion.path
            d={FEATHER_MAIN}
            transform="translate(4, 6)"
            stroke="rgba(224, 120, 44, 0.2)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={reduced ? undefined : { strokeDashoffset: [120, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            strokeDasharray="14 18"
          />

          <path
            d="M 160 28 C 228 96 268 168 272 232 C 276 292 248 338 200 364"
            stroke="rgba(92, 83, 76, 0.12)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            fill="none"
          />
          <path
            d="M 160 48 C 214 108 248 174 252 236"
            stroke="rgba(224, 120, 44, 0.15)"
            strokeWidth="1.25"
            strokeDasharray="4 8"
            fill="none"
          />

          <path
            d={FEATHER_MAIN}
            stroke={`url(#${gradId})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.04)"
            style={{
              filter: `url(#${glowId}) drop-shadow(0 0 22px rgba(244, 168, 98, 0.55)) drop-shadow(0 18px 40px rgba(224, 120, 44, 0.28))`,
            }}
          />

          <motion.path
            d={FEATHER_MAIN}
            stroke={`url(#${gradId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.55"
            animate={reduced ? undefined : { strokeDashoffset: [0, -80] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
            strokeDasharray="10 22"
          />

          <path
            d={FEATHER_DETAIL}
            stroke={`url(#${gradId})`}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path d={FEATHER_QUILL} fill="#e0782c" opacity="0.92" />
        </svg>
      </motion.div>
    </div>
  )
}

function PaperMotes({ reduced }) {
  const items = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: `${6 + ((i * 19) % 88)}%`,
        top: `${8 + ((i * 27) % 82)}%`,
        delay: (i % 6) * 0.22,
        w: 4 + (i % 4) * 2,
        h: 3 + (i % 3),
        rot: -20 + (i % 9) * 5,
        duration: 12 + (i % 7),
      })),
    [],
  )
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-[1px] border border-saffron/20 bg-gradient-to-br from-white/55 to-white/20 shadow-sm"
          style={{
            left: p.left,
            top: p.top,
            width: p.w,
            height: p.h,
            rotate: p.rot,
          }}
          animate={{
            y: [0, -36, 0],
            x: [0, 10, 0],
            opacity: [0.08, 0.35, 0.08],
            rotate: [p.rot, p.rot + 8, p.rot],
          }}
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
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm border border-saffron/18 bg-gradient-to-br from-white/55 to-white/25 shadow-md backdrop-blur-[3px]"
          style={{
            width: 28 + i * 10,
            height: 18 + i * 5,
            left: `${12 + i * 18}%`,
            bottom: `${6 + i * 5}%`,
            rotate: -8 + i * 6,
          }}
          animate={{
            y: [0, -14, 0],
            rotate: [-8 + i * 6, -2 + i * 6, -8 + i * 6],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ duration: 8 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const reduced = usePrefersReducedMotion()
  const heroRef = useRef(null)
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 })

  const mx = useSpring(0.5, { stiffness: 70, damping: 30 })
  const my = useSpring(0.5, { stiffness: 70, damping: 30 })

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

  const parallaxX = useTransform(mx, [0, 1], reduced ? [0, 0] : [-10, 10])
  const parallaxY = useTransform(my, [0, 1], reduced ? [0, 0] : [-8, 8])

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
            background: `radial-gradient(680px circle at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(244,168,98,0.16), transparent 55%)`,
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
            <p className="font-hindi text-lg leading-relaxed text-charcoal">निज भाषा उन्नति अहै, सब उन्नति को मूल ।</p>
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
            <motion.div whileHover={reduced ? undefined : { y: -1 }} whileTap={reduced ? undefined : { scale: 0.99 }}>
              <Link
                to="/forum"
                className="font-body inline-flex items-center gap-2 rounded-xl border-2 border-charcoal/85 bg-white/80 px-7 py-3.5 text-sm font-semibold text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:border-saffron hover:text-saffron"
              >
                Open forum
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex min-h-[320px] items-center justify-center md:min-h-[520px]"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[min(90%,480px)] w-[min(90%,480px)] rounded-full bg-gradient-to-br from-saffron/30 via-gold-soft/10 to-transparent blur-3xl" />
          </div>

          <PaperMotes reduced={reduced} />
          <PaperFragments reduced={reduced} />

          {literaryTags.map((t) => (
            <motion.div
              key={t.label}
              className="font-hindi pointer-events-none absolute z-[3]"
              style={{ top: t.top, right: t.right, bottom: t.bottom, left: t.left }}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{
                opacity: 1,
                y: [0, -t.float, 0],
                filter: ['blur(0px)', 'blur(0px)', 'blur(0px)'],
              }}
              transition={{
                opacity: { delay: 0.45 + t.delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 6 + t.delay * 3, repeat: Infinity, ease: 'easeInOut', delay: t.delay + 0.5 },
              }}
            >
              <div className="rounded-2xl border border-white/55 bg-white/35 px-4 py-2.5 text-sm font-semibold text-saffron-deep shadow-[0_12px_40px_rgba(224,120,44,0.15)] backdrop-blur-xl ring-1 ring-saffron/15">
                {t.label}
              </div>
            </motion.div>
          ))}

          <LiterarySymbol mx={mx} my={my} reduced={reduced} />

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
