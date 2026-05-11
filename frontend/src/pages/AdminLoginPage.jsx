import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClub } from '../context/useClub'

export default function AdminLoginPage() {
  const { auth, login } = useClub()
  const navigate = useNavigate()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  useEffect(() => { if (auth.role === 'admin') navigate('/admin') }, [auth.role, navigate])

  const onSubmit = e => {
    e.preventDefault()
    const r = login(username, password)
    r.ok ? navigate('/admin') : setError(r.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(139,105,20,0.12) 0%, transparent 60%), #f5f0e8' }}>
      <div className="w-full max-w-md rounded-3xl p-8 md:p-10 border border-[#d4c4a0]"
        style={{ background: 'rgba(255,252,245,0.9)', boxShadow: '0 20px 60px rgba(61,43,31,0.15)' }}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)' }}>📖</div>
          <h1 className="text-2xl text-[#3d2b1f] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Admin Login</h1>
          <p className="text-xs text-[#7a6250] mt-1">Use: admin / admin123</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
            className="ui-input" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
            className="ui-input" />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit"
            className="ui-btn ui-btn--primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}