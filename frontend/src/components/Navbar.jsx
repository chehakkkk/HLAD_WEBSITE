import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import MagneticButton from './MagneticButton'

const links = [
  { id: 'home', en: 'Home', hi: 'मुख्य' },
  { id: 'about', en: 'About', hi: 'परिचय' },
  { id: 'events', en: 'Events', hi: 'कार्यक्रम' },
  { id: 'team', en: 'Team', hi: 'टीम' },
  { id: 'faq', en: 'FAQ', hi: 'प्रश्न' },
]

export default function Navbar({ activeId = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 48)
  })

  useEffect(() => {
    setScrolled(window.scrollY > 48)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:px-6"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        layout
        className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/50 bg-white/55 px-3 py-3 shadow-[0_8px_40px_rgba(42,34,28,0.08)] backdrop-blur-xl md:gap-4 md:px-6"
        animate={{
          paddingTop: scrolled ? 10 : 14,
          paddingBottom: scrolled ? 10 : 14,
          borderRadius: scrolled ? 14 : 18,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#home" className="flex shrink-0 items-center gap-2 no-underline md:gap-3" onClick={() => setMobileOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-saffron-deep text-base text-white shadow-lg shadow-saffron/25 md:h-11 md:w-11 md:text-lg">
            <span aria-hidden>📖</span>
          </div>
          <div className="hidden leading-tight sm:block">
            <span className="inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal">
              Since 2010
            </span>
            <div className="font-display text-base font-bold text-charcoal">HLAD</div>
            <div className="font-hindi text-xs font-medium text-saffron">हिंदी साहित्य</div>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = activeId === l.id
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`group relative px-3 py-2 no-underline ${active ? 'text-saffron' : 'text-charcoal-muted hover:text-charcoal'}`}
              >
                <span className="font-body block text-center text-sm font-medium">{l.en}</span>
                <span className="font-hindi block text-center text-[11px] opacity-70">{l.hi}</span>
                <span
                  className={`absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-saffron transition-all duration-300 group-hover:w-3/5 ${active ? 'w-3/5' : ''}`}
                />
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton
            href="#events"
            className="font-body hidden rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-saffron/30 transition-shadow hover:shadow-xl hover:shadow-saffron/40 lg:inline-flex"
          >
            Join Now
          </MagneticButton>
          <MagneticButton
            href="#events"
            className="font-body inline-flex rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-4 py-2 text-xs font-semibold text-white shadow-md shadow-saffron/25 lg:hidden"
          >
            Join
          </MagneticButton>
          <button
            type="button"
            className="font-body inline-flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/10 bg-white/70 text-charcoal lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-0 z-40 bg-charcoal/30 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="absolute right-4 top-24 w-[min(92vw,320px)] rounded-2xl border border-white/60 bg-white/95 p-4 shadow-2xl"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => {
                  const active = activeId === l.id
                  return (
                    <a
                      key={l.id}
                      href={`#${l.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-xl px-4 py-3 no-underline ${active ? 'bg-saffron/10 text-saffron' : 'text-charcoal hover:bg-beige/80'}`}
                    >
                      <span className="font-body block text-sm font-semibold">{l.en}</span>
                      <span className="font-hindi block text-xs opacity-70">{l.hi}</span>
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
