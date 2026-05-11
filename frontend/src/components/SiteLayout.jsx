import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useClub } from '../context/useClub'

const links = [
  { to: '/',        en: 'Home',   hi: 'मुख्य',    end: true },
  { to: '/members', en: 'Team',   hi: 'टीम' },
  { to: '/forum',   en: 'Forum',  hi: 'चर्चा' },
  { to: '/events',  en: 'Events', hi: 'कार्यक्रम' },
]

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { auth, logout } = useClub()
  const location = useLocation()

  return (
    <div className="min-h-screen" style={{ background: '#f5f0e8' }}>

      {/* ── Navbar ── */}
      <header className="sticky top-3 z-50 mx-3 md:mx-6">
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl border border-[#d4c4a0]"
          style={{
            background: 'rgba(245,240,232,0.92)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 24px rgba(61,43,31,0.10), 0 1px 0 rgba(255,255,255,0.7) inset'
          }}>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 no-underline group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B6914] rounded-xl">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)' }}>
              📖
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[#3d2b1f] text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                HLAD
              </div>
              <div className="text-[10px] text-[#8B6914]" style={{ fontFamily: 'var(--font-heading)' }}>
                हिंदी साहित्य
              </div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}
                className={({ isActive }) =>
                  `no-underline px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6914]
                   ${isActive
                     ? 'bg-[#8B6914] text-white'
                     : 'text-[#5c3d2e] hover:bg-[#8B6914]/10 hover:text-[#8B6914]'
                   }`
                }>
                <span className="block">{link.en}</span>
                <span className="block text-[9px] opacity-70" style={{ fontFamily: 'var(--font-heading)' }}>
                  {link.hi}
                </span>
              </NavLink>
            ))}
            {auth.role === 'admin' && (
              <NavLink to="/admin"
                className={({ isActive }) =>
                  `no-underline px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6914]
                   ${isActive ? 'bg-[#8B6914] text-white' : 'text-[#5c3d2e] hover:bg-[#8B6914]/10'}`
                }>
                Admin
              </NavLink>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {auth.role === 'admin' ? (
              <button onClick={logout}
                className="ui-btn ui-btn--secondary !px-4 !py-2 !text-sm">
                Logout
              </button>
            ) : (
              <NavLink to="/admin/login"
                className="ui-btn ui-btn--primary btn-shimmer relative overflow-hidden !px-4 !py-2 !text-sm"
                style={{ boxShadow: '0 3px 12px rgba(139,105,20,0.35)' }}>
                Join Now
              </NavLink>
            )}
            {/* Mobile toggle */}
            <button className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[#5c3d2e] hover:bg-[#8B6914]/10 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6914]"
              onClick={() => setMenuOpen(v => !v)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 rounded-2xl border border-[#d4c4a0] overflow-hidden"
            style={{ background: 'rgba(245,240,232,0.97)', backdropFilter: 'blur(20px)' }}>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `no-underline flex items-center justify-between px-5 py-3.5 border-b border-[#d4c4a0]/50 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6914]
                   ${isActive ? 'bg-[#8B6914]/10 text-[#8B6914]' : 'text-[#5c3d2e]'}`
                }>
                <span>{link.en}</span>
                <span className="text-xs text-[#8B6914]" style={{ fontFamily: 'var(--font-heading)' }}>{link.hi}</span>
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* ── Page content ── */}
      <main className="animate-fade-in">
        <Outlet />
      </main>
    </div>
  )
}