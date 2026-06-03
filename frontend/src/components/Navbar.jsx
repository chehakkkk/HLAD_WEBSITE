"use client";
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import MagneticButton from './MagneticButton'
import { useNavigationSection } from '../context/NavigationContext'
import { ThemeToggle } from './ThemeToggle'

const hashNav = [
  { id: 'home', href: '/#home', en: 'Home', hi: 'मुख्य' },
  { id: 'about', href: '/#about', en: 'About', hi: 'परिचय' },
  { id: 'events', href: '/#events', en: 'Events', hi: 'कार्यक्रम' },
  { id: 'team', href: '/#team', en: 'Team', hi: 'टीम' },
  { id: 'faq', href: '/#faq', en: 'FAQ', hi: 'प्रश्न' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { activeSectionId } = useNavigationSection()

  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 48 : false))
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 48)
  })

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isHome = pathname === '/'

  const hashActive = useMemo(() => {
    if (!isHome) return null
    return activeSectionId || 'home'
  }, [isHome, activeSectionId])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:px-6"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        layout
        className="flex w-full max-w-6xl items-center justify-between gap-2 rounded-2xl border border-charcoal/10 dark:border-white/10 bg-white/90 dark:bg-[#1c1814]/90 px-2 py-3 shadow-[0_8px_40px_rgba(42,34,28,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:gap-3 md:gap-4 md:px-5"
        animate={{
          paddingTop: scrolled ? 10 : 14,
          paddingBottom: scrolled ? 10 : 14,
          borderRadius: scrolled ? 14 : 18,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2 no-underline md:gap-3" onClick={() => setMobileOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-saffron-deep text-base text-white shadow-lg shadow-saffron/25 md:h-11 md:w-11 md:text-lg">
            <span aria-hidden>📖</span>
          </div>
          <div className="hidden leading-tight sm:block">
            <span className="inline-block rounded-full bg-white/90 dark:bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal dark:text-white/80">
              Since 2020
            </span>
            <div className="font-display text-base font-bold text-charcoal">HLAD</div>
            <div className="font-hindi text-xs font-medium text-saffron">हिंदी साहित्य</div>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
          {hashNav.map((l) => {
            const active = hashActive === l.id
            return (
              <a
                key={l.id}
                href={l.href}
                className={`group relative shrink-0 px-2 py-2 no-underline xl:px-3 ${active ? 'text-saffron' : 'text-charcoal-muted hover:text-charcoal'}`}
              >
                <span className="font-body block text-center text-[13px] font-medium">{l.en}</span>
                <span className="font-hindi block text-center text-[10px] opacity-70">{l.hi}</span>
                <span
                  className={`absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-saffron transition-all duration-300 group-hover:w-3/5 ${active ? 'w-3/5' : ''}`}
                />
              </a>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
          <Link
            href="/login"
            className="font-body hidden items-center justify-center rounded-xl border-2 border-charcoal/18 bg-white/75 px-3 py-2 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:border-saffron hover:text-saffron dark:border-white/10 dark:bg-secondary dark:text-white dark:hover:bg-white/10 md:px-4 md:text-sm lg:inline-flex"
          >
            Admin Login
          </Link>
          <MagneticButton
            href="/register"
            className="font-body hidden rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-saffron/30 transition-shadow hover:shadow-xl hover:shadow-saffron/40 md:px-5 md:text-sm lg:inline-flex"
          >
            Join Now
          </MagneticButton>
          <Link
            href="/login"
            className="font-body hidden items-center justify-center rounded-xl border border-charcoal/15 bg-white/80 px-2.5 py-2 text-[10px] font-semibold text-charcoal sm:inline-flex lg:hidden"
          >
            Admin
          </Link>
          <MagneticButton
            href="/register"
            className="font-body inline-flex rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-3 py-2 text-[11px] font-semibold text-white shadow-md shadow-saffron/25 lg:hidden"
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
              className="absolute right-4 top-24 max-h-[min(80vh,520px)] w-[min(92vw,340px)] overflow-y-auto rounded-2xl border border-white/60 dark:border-white/10 bg-white/95 dark:bg-charcoal/95 p-4 shadow-2xl"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {hashNav.map((l) => {
                  const active = hashActive === l.id
                  return (
                    <a
                      key={l.id}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-xl px-4 py-3 no-underline ${active ? 'bg-saffron/10 text-saffron' : 'text-charcoal hover:bg-beige/80'}`}
                    >
                      <span className="font-body block text-sm font-semibold">{l.en}</span>
                      <span className="font-hindi block text-xs opacity-70">{l.hi}</span>
                    </a>
                  )
                })}
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-charcoal/10 px-4 py-3 font-body text-sm font-semibold text-charcoal hover:bg-beige/80"
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
