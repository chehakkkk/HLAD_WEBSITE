import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'
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

const HINDI_LETTER_POOL = ['क', 'स', 'व', 'त', 'अ', 'ह', 'श', 'ब', 'द', 'र', 'म', 'न', 'शब्द', 'काव्य', 'रस']

function buildLetterBurst(seed) {
  const count = 14
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + ((i / (count - 1)) - 0.5) * 1.25
    const dist = 22 + (seed % 5) * 3 + i * 4
    const fragment = HINDI_LETTER_POOL[(seed + i * 3) % HINDI_LETTER_POOL.length].length > 1
    return {
      id: `${seed}-${i}`,
      char: HINDI_LETTER_POOL[(seed + i * 3) % HINDI_LETTER_POOL.length],
      x: Math.cos(angle) * dist + (i % 2 === 0 ? 8 : -8),
      y: -Math.abs(Math.sin(angle) * dist) - 36 - i * 7,
      rotate: -22 + ((seed + i) % 11) * 4,
      delay: i * 0.048,
      size: fragment ? 'text-base md:text-lg' : i % 3 === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
    }
  })
}

function buildSparkles(seed) {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${seed}-s-${i}`,
    x: -20 + ((seed + i * 11) % 40),
    y: -8 - ((seed + i * 7) % 18),
    size: 3 + (i % 3),
    delay: i * 0.04,
  }))
}

function HindiLetterBurst({ burst, reduced }) {
  const particles = useMemo(() => (burst ? buildLetterBurst(burst) : []), [burst])
  if (reduced || !burst) return null

  return (
    <div className="pointer-events-none absolute left-[58%] top-[7%] z-[4] -translate-x-1/2">
      <AnimatePresence mode="popLayout">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className={`font-hindi absolute left-1/2 top-0 ${p.size} font-semibold text-saffron-deep`}
            style={{
              textShadow: '0 0 18px rgba(244, 168, 98, 0.75), 0 0 32px rgba(224, 120, 44, 0.45)',
              filter: 'blur(0.3px)',
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.5, rotate: 0 }}
            animate={{
              opacity: [0, 0.95, 0.7, 0],
              x: p.x,
              y: p.y,
              scale: [0.5, 1.05, 0.92],
              rotate: [0, p.rotate * 0.4, p.rotate],
            }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              duration: 2.4,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
              opacity: { times: [0, 0.12, 0.55, 1], duration: 2.4, delay: p.delay },
            }}
          >
            <span className="rounded-lg border border-white/40 bg-white/25 px-1.5 py-0.5 backdrop-blur-md">
              {p.char}
            </span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

function FeatherSparkles({ burst, reduced }) {
  const sparkles = useMemo(() => (burst ? buildSparkles(burst) : []), [burst])
  if (reduced || !burst) return null

  return (
    <div className="pointer-events-none absolute left-[58%] top-[7%] z-[4] -translate-x-1/2">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-gradient-to-br from-gold-soft to-saffron"
            style={{
              width: s.size,
              height: s.size,
              left: s.x,
              top: s.y,
              boxShadow: '0 0 10px rgba(252, 214, 160, 0.9), 0 0 18px rgba(224, 120, 44, 0.5)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.6, 0],
              scale: [0, 1.2, 0.8],
              y: [0, -22 - s.delay * 120],
              x: [0, s.x * 0.15],
            }}
            transition={{
              duration: 1.1,
              delay: s.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

function LiterarySymbol({ mx, my, reduced, burst, onFeatherClick, interacting }) {
  const rid = useId().replace(/:/g, '')
  const gradId = `lit-grad-${rid}`
  const glowId = `lit-glow-${rid}`

  const innerX = useTransform(mx, [0, 1], reduced ? [0, 0] : [-14, 14])
  const innerY = useTransform(my, [0, 1], reduced ? [0, 0] : [-12, 12])
  const tilt = useTransform(mx, [0, 1], reduced ? [0, 0] : [-4, 4])

  const floatTransition = interacting
    ? { duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }
    : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }

  return (
    <div className="relative z-[2] flex h-full min-h-[220px] w-full items-center justify-center sm:min-h-[260px] md:min-h-[420px]">
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
          animate={
            reduced
              ? undefined
              : interacting
                ? { scale: [1, 1.14, 1.05], opacity: [0.88, 1, 0.92] }
                : { scale: [1, 1.06, 1], opacity: [0.88, 1, 0.88] }
          }
          transition={interacting ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] } : { duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <AnimatePresence>
        {interacting && !reduced && (
          <motion.div
            key="feather-pulse"
            className="pointer-events-none absolute left-[58%] top-[6%] z-[1] h-28 w-28 -translate-x-1/2 rounded-full bg-gradient-to-br from-saffron/50 via-gold-soft/30 to-transparent blur-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.85, 0], scale: [0.6, 1.35, 1.1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Interact with the literary feather — releases glowing Hindi letters"
        onClick={onFeatherClick}
        disabled={reduced}
        className="group relative flex cursor-pointer items-center justify-center border-0 bg-transparent p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron disabled:cursor-default md:hover:drop-shadow-[0_0_28px_rgba(244,168,98,0.35)]"
        whileTap={reduced ? undefined : { scale: 0.98 }}
      >
        <HindiLetterBurst burst={burst} reduced={reduced} />
        <FeatherSparkles burst={burst} reduced={reduced} />
        <motion.div
          className="relative flex items-center justify-center"
          style={{ x: innerX, y: innerY, rotate: tilt }}
          animate={reduced ? undefined : interacting ? { y: [0, -4, 2, -2, 0] } : { y: [0, -6, 0] }}
          transition={floatTransition}
        >
          <motion.div
            className="relative"
            style={{ transformOrigin: '54% 93%' }}
            animate={
              reduced
                ? undefined
                : interacting
                  ? {
                      rotate: [0, 8, -7, 5, -3, 1.5, 0],
                      scale: [1, 1.025, 0.985, 1],
                    }
                  : undefined
            }
            transition={
              interacting
                ? { duration: 0.88, ease: [0.22, 1.12, 0.38, 1] }
                : undefined
            }
          >
        <svg
          viewBox="0 0 320 400"
          className="relative w-[min(78vw,320px)] max-w-full sm:w-[min(85vw,380px)] md:w-[min(92vw,440px)]"
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
        </motion.div>
      </motion.button>
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
  const interactTimerRef = useRef(null)
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 })
  const [burst, setBurst] = useState(0)
  const [interacting, setInteracting] = useState(false)

  const onFeatherClick = useCallback(() => {
    if (reduced) return
    setBurst((n) => n + 1)
    setInteracting(true)
    if (interactTimerRef.current) clearTimeout(interactTimerRef.current)
    interactTimerRef.current = setTimeout(() => setInteracting(false), 950)
  }, [reduced])

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

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 pb-4 sm:gap-7 md:grid md:grid-cols-2 md:items-center md:gap-6 md:px-6 md:pb-0 lg:gap-10">
        <motion.div
          className="order-1 relative flex w-full min-h-[220px] max-w-sm items-center justify-center sm:min-h-[260px] sm:max-w-md md:order-2 md:max-w-none md:min-h-[520px]"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[min(80%,360px)] w-[min(80%,360px)] rounded-full bg-gradient-to-br from-saffron/30 via-gold-soft/10 to-transparent blur-3xl md:h-[min(90%,480px)] md:w-[min(90%,480px)]" />
          </div>

          <PaperMotes reduced={reduced} />
          <PaperFragments reduced={reduced} />

          {literaryTags.map((t) => (
            <motion.div
              key={t.label}
              className="font-hindi pointer-events-none absolute z-[3] hidden md:block"
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

          <LiterarySymbol
            mx={mx}
            my={my}
            reduced={reduced}
            burst={burst}
            onFeatherClick={onFeatherClick}
            interacting={interacting}
          />

          <motion.button
            type="button"
            className="font-body absolute -bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal-muted md:bottom-0"
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

        <motion.div
          className="order-2 flex w-full max-w-xl flex-col items-center justify-center text-center md:order-1 md:max-w-none md:items-start md:text-left"
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
            className="mb-6 flex w-fit items-center gap-3 rounded-2xl border border-white/70 bg-white/60 p-3 pr-5 shadow-[0_12px_40px_rgba(42,34,28,0.08)] backdrop-blur-md md:mb-8"
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
            className="font-display mx-auto mt-4 max-w-md text-lg font-medium leading-snug text-charcoal md:mx-0 md:text-xl"
          >
            Hindi Literature &amp; Arts Division
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="relative mx-auto mt-6 max-w-lg rounded-2xl border border-white/80 border-l-4 border-saffron bg-white/70 p-6 pl-6 shadow-[0_20px_60px_rgba(42,34,28,0.1)] backdrop-blur-xl md:mx-0 md:mt-8 md:pl-7"
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
            className="mt-6 flex flex-wrap justify-center gap-4 md:mt-8 md:justify-start"
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
      </div>
    </section>
  )
}
