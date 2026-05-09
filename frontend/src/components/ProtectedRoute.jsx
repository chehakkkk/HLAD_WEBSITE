import { Navigate } from 'react-router-dom'
import { useClub } from '../context/useClub'

function ProtectedRoute({ children }) {
  const { auth } = useClub()

  if (!auth.isAuthenticated || auth.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
