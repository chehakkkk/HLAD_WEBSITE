import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useClub } from '../context/useClub'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/members', label: 'Members' },
  { to: '/forum', label: 'Forum' },
  { to: '/events', label: 'Events' },
]

function SiteLayout() {
  const [isDark, setIsDark] = useState(document.body.dataset.theme === 'dark')
  const [isOpen, setIsOpen] = useState(false)
  const { auth, logout } = useClub()

  const toggleTheme = () => {
    const nextValue = !isDark
    setIsDark(nextValue)
    document.body.dataset.theme = nextValue ? 'dark' : 'light'
  }

  return (
    <div className="app-shell">
      <header className="top-nav">
        <NavLink className="brand" to="/">
          साहित्य सभा
        </NavLink>
        <button className="menu-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
          ☰
        </button>
        <nav className={isOpen ? 'open' : ''}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
          {auth.role === 'admin' && (
            <NavLink to="/admin" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="nav-actions">
          {auth.role === 'admin' ? (
            <button className="theme-toggle" type="button" onClick={logout}>
              Logout
            </button>
          ) : (
            <NavLink to="/admin/login" className="theme-toggle">
              Admin Login
            </NavLink>
          )}
          <button className="theme-toggle" type="button" onClick={toggleTheme}>
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main className="page-stack">
        <Outlet />
      </main>
    </div>
  )
}

export default SiteLayout
