import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const tags = ['कविता', 'साहित्य', 'संवाद']

export default function ForumDecor() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 cross-pattern opacity-[0.35]" />
      <motion.div
        className="absolute -left-1/4 top-0 h-[70%] w-[60%] rounded-full bg-gradient-to-br from-saffron-soft/30 via-transparent to-transparent blur-3xl"
        animate={reduced ? undefined : { x: [0, 30, 0], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[65%] w-[55%] rounded-full bg-gradient-to-tl from-saffron/22 via-gold-soft/18 to-transparent blur-3xl"
        animate={reduced ? undefined : { x: [0, -24, 0], opacity: [0.28, 0.45, 0.28] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {tags.map((t, i) => (
        <motion.span
          key={t}
          className="font-hindi absolute z-[1] rounded-2xl border border-white/45 bg-white/30 px-3 py-1.5 text-xs font-semibold text-saffron-deep shadow-lg backdrop-blur-md"
          style={{
            top: `${12 + i * 22}%`,
            right: i % 2 === 0 ? '6%' : 'auto',
            left: i % 2 === 1 ? '8%' : 'auto',
          }}
          animate={reduced ? undefined : { y: [0, -8, 0], rotate: [0, i % 2 ? 2 : -2, 0] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {t}
        </motion.span>
      ))}
      <div className="absolute bottom-[12%] left-1/2 h-px w-[min(80%,520px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-saffron/25 to-transparent" />
    </div>
  )
}
