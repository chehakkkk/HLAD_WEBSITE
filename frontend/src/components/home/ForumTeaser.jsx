import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export default function ForumTeaser() {
  const reduced = usePrefersReducedMotion()
  return (
    <section
      id="discussions"
      className="relative scroll-mt-28 overflow-hidden border-t border-charcoal/10 bg-gradient-to-b from-parchment-dark via-parchment to-parchment py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 cross-pattern opacity-35" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-saffron-soft/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gold-soft/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/60 bg-white/55 p-8 shadow-[0_24px_80px_rgba(42,34,28,0.1)] backdrop-blur-2xl md:p-12"
        >
          <span className="font-body inline-block rounded-full border border-saffron/25 bg-white/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-saffron">
            संवाद · सदस्यता
          </span>
          <h2 className="font-hindi mt-5 text-3xl font-bold text-charcoal md:text-4xl">साहित्यिक समुदाय</h2>
          <p className="font-display mx-auto mt-4 max-w-2xl text-lg text-charcoal-muted">
            Browse the full discussion forum with categories, imagery, and trending threads — or meet the people who
            carry HLAD forward.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: 0.98 }}>
              <Link
                to="/forum"
                className="font-body inline-flex min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(224,120,44,0.4)] ring-1 ring-white/25"
              >
                Open forum
              </Link>
            </motion.div>
            <motion.div whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: 0.98 }}>
              <Link
                to="/members"
                className="font-body inline-flex min-w-[200px] items-center justify-center rounded-xl border-2 border-charcoal/20 bg-white/80 px-8 py-3.5 text-sm font-semibold text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:border-saffron hover:text-saffron"
              >
                Member directory
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
