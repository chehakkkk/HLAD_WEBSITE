import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { useNavigationSection } from '../context/NavigationContext'

/** Order: Home → Forum → Members → Events → Gallery → About */
const navItems = [
  { kind: 'hash', id: 'home', href: '/#home', en: 'Home', hi: 'मुख्य' },
  { kind: 'route', id: 'forum', to: '/forum', en: 'Forum', hi: 'संवाद' },
  { kind: 'route', id: 'members', to: '/members', en: 'Members', hi: 'सदस्य' },
  { kind: 'hash', id: 'events', href: '/#events', en: 'Events', hi: 'कार्यक्रम' },
  { kind: 'hash', id: 'gallery', href: '/#gallery', en: 'Gallery', hi: 'प्रदर्शनी' },
  { kind: 'hash', id: 'about', href: '/#about', en: 'About', hi: 'परिचय' },
]

function NavItemLink({ item, active }) {
  const base =
    'group relative shrink-0 px-1.5 py-2 no-underline sm:px-2 xl:px-2.5 ' +
    (active ? 'text-saffron' : 'text-charcoal-muted hover:text-charcoal')

  const inner = (
    <>
      <span className="font-body block text-center text-[12px] font-medium leading-tight sm:text-[13px]">{item.en}</span>
      <span className="font-hindi block text-center text-[9px] leading-tight opacity-70 sm:text-[10px]">{item.hi}</span>
      <span
        className={`absolute bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-saffron transition-all duration-300 group-hover:w-3/5 ${active ? 'w-3/5' : ''}`}
      />
    </>
  )

  if (item.kind === 'route') {
    return (
      <Link to={item.to} className={base}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={item.href} className={base}>
      {inner}
    </a>
  )
}

export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
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

  const isActive = useMemo(() => {
    return (item) => {
      if (item.kind === 'route') return pathname === item.to
      if (!isHome) return false
      return (activeSectionId || 'home') === item.id
    }
  }, [pathname, isHome, activeSectionId])

  const closeMobile = () => setMobileOpen(false)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4 md:px-6"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        layout
        className="flex w-full max-w-6xl items-center justify-between gap-1.5 rounded-2xl border border-white/50 bg-white/55 px-2 py-2.5 shadow-[0_8px_40px_rgba(42,34,28,0.08)] backdrop-blur-xl sm:gap-2 sm:px-3 sm:py-3 md:gap-3 md:px-4"
        animate={{
          paddingTop: scrolled ? 9 : 12,
          paddingBottom: scrolled ? 9 : 12,
          borderRadius: scrolled ? 14 : 18,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/" className="flex shrink-0 items-center gap-1.5 no-underline sm:gap-2 md:gap-3" onClick={closeMobile}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-saffron-deep text-sm text-white shadow-lg shadow-saffron/25 sm:h-10 sm:w-10 sm:text-base md:h-11 md:w-11 md:text-lg">
            <span aria-hidden>📖</span>
          </div>
          <div className="hidden leading-tight sm:block">
            <span className="inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal">
              Since 2010
            </span>
            <div className="font-display text-sm font-bold text-charcoal md:text-base">HLAD</div>
            <div className="font-hindi text-[10px] font-medium text-saffron md:text-xs">हिंदी साहित्य</div>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0 lg:flex">
          {navItems.map((item) => (
            <NavItemLink key={item.id} item={item} active={isActive(item)} />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            to="/admin/login"
            className="font-body hidden items-center justify-center rounded-xl border-2 border-charcoal/18 bg-white/75 px-2.5 py-2 text-[11px] font-semibold text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:border-saffron hover:text-saffron sm:px-3 sm:text-xs md:px-4 md:text-sm lg:inline-flex"
          >
            Admin Login
          </Link>
          <MagneticButton
            href={isHome ? '#events' : '/#events'}
            className="font-body hidden rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-saffron/30 transition-shadow hover:shadow-xl hover:shadow-saffron/40 md:px-5 md:text-sm lg:inline-flex"
          >
            Join Now
          </MagneticButton>
          <Link
            to="/admin/login"
            className="font-body hidden items-center justify-center rounded-xl border border-charcoal/15 bg-white/80 px-2 py-1.5 text-[10px] font-semibold text-charcoal sm:inline-flex lg:hidden"
          >
            Admin
          </Link>
          <MagneticButton
            href={isHome ? '#events' : '/#events'}
            className="font-body inline-flex rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-md shadow-saffron/25 sm:px-3 sm:text-[11px] lg:hidden"
          >
            Join
          </MagneticButton>
          <button
            type="button"
            className="font-body inline-flex h-9 w-9 items-center justify-center rounded-xl border border-charcoal/10 bg-white/70 text-charcoal sm:h-10 sm:w-10 lg:hidden"
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
            onClick={closeMobile}
          >
            <motion.div
              className="absolute right-3 top-20 max-h-[min(82vh,540px)] w-[min(92vw,340px)] overflow-y-auto rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl sm:right-4 sm:top-24"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-0.5">
                {navItems.map((item) => {
                  const active = isActive(item)
                  const rowClass = `rounded-xl px-3 py-2.5 no-underline ${active ? 'bg-saffron/10 text-saffron' : 'text-charcoal hover:bg-beige/80'}`
                  if (item.kind === 'route') {
                    return (
                      <Link key={item.id} to={item.to} onClick={closeMobile} className={rowClass}>
                        <span className="font-body block text-sm font-semibold">{item.en}</span>
                        <span className="font-hindi block text-xs opacity-70">{item.hi}</span>
                      </Link>
                    )
                  }
                  return (
                    <a key={item.id} href={item.href} onClick={closeMobile} className={rowClass}>
                      <span className="font-body block text-sm font-semibold">{item.en}</span>
                      <span className="font-hindi block text-xs opacity-70">{item.hi}</span>
                    </a>
                  )
                })}
                <Link
                  to="/admin/login"
                  onClick={closeMobile}
                  className="mt-1 rounded-xl border border-charcoal/10 px-3 py-2.5 font-body text-sm font-semibold text-charcoal hover:bg-beige/80"
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
