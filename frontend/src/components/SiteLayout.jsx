import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/members', label: 'Members' },
  { to: '/forum', label: 'Forum' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/gallery-blog', label: 'Gallery/Blog' },
]

function SiteLayout() {
  const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
        </nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          {isDark ? 'Light' : 'Dark'}
        </button>
      </header>

      <main className="page-stack">
        <Outlet />
      </main>
    </div>
  )
}

export default SiteLayout
