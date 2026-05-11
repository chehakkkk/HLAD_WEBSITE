import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ForumProvider } from './context/ForumContext'
import { MembersProvider } from './context/MembersContext'
import { NavigationProvider } from './context/NavigationContext'
import PublicLayout from './layouts/PublicLayout'
import HomePage from './pages/HomePage'
import MembersPage from './pages/MembersPage'
import ForumPage from './pages/ForumPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <ForumProvider>
          <MembersProvider>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/forum" element={<ForumPage />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </MembersProvider>
        </ForumProvider>
      </NavigationProvider>
    </BrowserRouter>
  )
}
