import { Routes, Route, Navigate } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import HomePage from './pages/HomePage'
import MembersPage from './pages/MembersPage'
import ForumPage from './pages/ForumPage'
import EventsPage from './pages/EventsPage'
import AboutPage from './pages/AboutPage'
import GalleryBlogPage from './pages/GalleryBlogPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery-blog" element={<GalleryBlogPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
