import { useState } from 'react'
import { useClub } from '../context/useClub'

function AdminDashboardPage() {
  const { state, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useClub()
  const [tab, setTab] = useState('overview')
  const [galleryForm, setGalleryForm] = useState({ title: '', type: 'image' })
  const [editingId, setEditingId] = useState('')

  const submitGallery = (event) => {
    event.preventDefault()
    if (!galleryForm.title.trim()) return
    if (editingId) {
      updateGalleryItem(editingId, galleryForm)
      setEditingId('')
    } else {
      addGalleryItem(galleryForm)
    }
    setGalleryForm({ title: '', type: 'image' })
  }

  return (
    <section className="surface">
      <div className="section-head">
        <h2>Admin Dashboard</h2>
        <p>Analytics overview and full content management controls.</p>
      </div>
      <div className="inline-actions">
        <button type="button" className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>Overview</button>
        <button type="button" className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>Content</button>
        <button type="button" className={tab === 'gallery' ? 'active' : ''} onClick={() => setTab('gallery')}>Gallery</button>
      </div>

      {tab === 'overview' && (
        <div className="card-grid">
          <article className="info-card"><h3>{state.members.length}</h3><p>Total Members</p></article>
          <article className="info-card"><h3>{state.posts.length}</h3><p>Forum Posts</p></article>
          <article className="info-card"><h3>{state.events.length}</h3><p>Events</p></article>
          <article className="info-card"><h3>{state.gallery.length}</h3><p>Gallery Items</p></article>
        </div>
      )}

      {tab === 'content' && (
        <div className="card-grid">
          <article className="info-card">
            <h3>Member Management</h3>
            <p>Add/edit/delete members on Members page.</p>
          </article>
          <article className="info-card">
            <h3>Forum Moderation</h3>
            <p>Manage categories, pin posts and moderate comments from Forum page.</p>
          </article>
          <article className="info-card">
            <h3>Event Management</h3>
            <p>Create, update, delete events and track registrations from Events page.</p>
          </article>
        </div>
      )}

      {tab === 'gallery' && (
        <>
          <form className="admin-form" onSubmit={submitGallery}>
            <h3>{editingId ? 'Update Gallery Item' : 'Add Gallery Item'}</h3>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Title"
                value={galleryForm.title}
                onChange={(event) => setGalleryForm((prev) => ({ ...prev, title: event.target.value }))}
              />
              <select
                value={galleryForm.type}
                onChange={(event) => setGalleryForm((prev) => ({ ...prev, type: event.target.value }))}
              >
                <option value="image">Image</option>
                <option value="blog">Blog</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
          </form>
          <div className="card-grid">
            {state.gallery.map((item) => (
              <article key={item.id} className="info-card">
                <h3>{item.title}</h3>
                <p>{item.type}</p>
                <div className="inline-actions">
                  <button type="button" onClick={() => { setEditingId(item.id); setGalleryForm({ title: item.title, type: item.type }) }}>Edit</button>
                  <button type="button" onClick={() => deleteGalleryItem(item.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default AdminDashboardPage
