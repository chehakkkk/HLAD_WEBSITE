import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClub } from '../context/useClub'

function AdminLoginPage() {
  const { auth, login } = useClub()
  const navigate = useNavigate()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  useEffect(() => {
    if (auth.role === 'admin') {
      navigate('/admin')
    }
  }, [auth.role, navigate])

  const onSubmit = (event) => {
    event.preventDefault()
    const result = login(username, password)
    if (result.ok) {
      navigate('/admin')
    } else {
      setError(result.message)
    }
  }

  return (
    <section className="surface auth-card">
      <h2>Admin Login</h2>
      <p>Use default credentials: `admin` / `admin123`</p>
      <form className="admin-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </section>
  )
}

export default AdminLoginPage
