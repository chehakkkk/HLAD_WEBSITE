import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export default function MembersHero() {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative min-h-[48svh] overflow-hidden border-b border-white/40 bg-gradient-to-b from-parchment via-parchment-dark to-parchment pb-16 pt-28 md:min-h-[52svh] md:pt-36">
      <div className="pointer-events-none absolute inset-0 cross-pattern opacity-30" />
      <motion.div
        className="pointer-events-none absolute -right-1/4 top-0 h-[70%] w-[70%] rounded-full bg-gradient-to-bl from-saffron-soft/35 via-gold-soft/15 to-transparent blur-3xl"
        animate={reduced ? undefined : { x: [0, -18, 0], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-body inline-block rounded-full border border-saffron/30 bg-white/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-saffron shadow-sm backdrop-blur-md">
            Directory
          </span>
          <h1 className="font-hindi mt-6 text-4xl font-bold leading-tight text-charcoal md:text-5xl">HLAD सदस्य</h1>
          <p className="font-display mx-auto mt-4 max-w-2xl text-lg text-charcoal-muted md:text-xl">
            Poets, writers, stewards, and mentors — the living circle behind our Hindi literary programming.
          </p>
          <Link
            to="/forum"
            className="font-body mt-8 inline-block text-sm font-semibold text-saffron underline-offset-4 hover:underline"
          >
            Join the conversation on the forum →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
