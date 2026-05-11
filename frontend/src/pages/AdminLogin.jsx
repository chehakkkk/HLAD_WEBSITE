import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForum } from '../context/ForumContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function AdminLogin() {
  const reduced = usePrefersReducedMotion()
  const navigate = useNavigate()
  const { adminLogin, adminSession } = useForum()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (adminSession) navigate('/admin', { replace: true })
  }, [adminSession, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (adminLogin(password)) {
      navigate('/admin', { replace: true })
      return
    }
    setError('Invalid password. Please try again.')
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col bg-gradient-to-b from-parchment via-parchment to-parchment-dark px-4 py-10">
      <div className="pointer-events-none absolute inset-0 cross-pattern opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-saffron-soft/25 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <Link
          to="/"
          className="font-body inline-flex items-center gap-2 text-sm font-semibold text-charcoal-muted underline-offset-4 hover:text-saffron hover:underline"
        >
          ← Back to site
        </Link>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 rounded-2xl border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(42,34,28,0.12)] backdrop-blur-xl"
        >
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-saffron">HLAD</div>
          <h1 className="font-display text-2xl font-bold text-charcoal">Admin sign in</h1>
          <p className="font-body mt-2 text-sm text-charcoal-muted">
            Access moderation tools, pinned discussions, and content visibility.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-pass" className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-charcoal/12 bg-white px-4 py-3 text-sm outline-none ring-saffron/25 focus:ring-2"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <motion.button
              type="submit"
              whileHover={reduced ? undefined : { scale: 1.01 }}
              whileTap={reduced ? undefined : { scale: 0.99 }}
              className="font-body w-full rounded-xl bg-gradient-to-r from-saffron to-saffron-deep py-3 text-sm font-semibold text-white shadow-lg shadow-saffron/30"
            >
              Enter dashboard
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
