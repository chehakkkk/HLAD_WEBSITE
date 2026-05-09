import { useEffect, useState } from 'react'
import { useClub } from '../context/useClub'

function EventsPage() {
  const { state, auth, addEvent, updateEvent, deleteEvent, registerEvent } = useClub()
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const [form, setForm] = useState({ title: '', date: '', detail: '' })
  const [editingId, setEditingId] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const upcoming = state.events[0]
      const diff = upcoming ? Math.max(0, new Date(upcoming.date).getTime() - Date.now()) : 0
      setCountdown({
        d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
        s: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [state.events])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.date) return
    if (editingId) {
      updateEvent(editingId, form)
      setEditingId('')
    } else {
      addEvent(form)
    }
    setForm({ title: '', date: '', detail: '' })
  }

  return (
    <section className="surface">
      <div className="section-head">
        <h2>Events</h2>
        <p>Elegant event cards with a live countdown.</p>
      </div>
      <div className="count-grid">
        <article><strong>{countdown.d}</strong><span>Days</span></article>
        <article><strong>{countdown.h}</strong><span>Hours</span></article>
        <article><strong>{countdown.m}</strong><span>Minutes</span></article>
        <article><strong>{countdown.s}</strong><span>Seconds</span></article>
      </div>
      <div className="card-grid">
        {state.events.map((event) => (
          <article key={event.id} className="info-card">
            <h3>{event.title}</h3>
            <p>{event.detail}</p>
            <small>{new Date(event.date).toLocaleString()}</small>
            <div className="inline-actions">
              <button className="btn btn-primary" type="button" onClick={() => registerEvent(event.id)}>
                Register ({event.registrations})
              </button>
              {auth.role === 'admin' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(event.id)
                      setForm({ title: event.title, date: event.date, detail: event.detail })
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteEvent(event.id)}>Delete</button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
      {auth.role === 'admin' && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Update Event' : 'Add Event'}</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            />
            <input
              type="datetime-local"
              value={form.date}
              onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            />
            <input
              type="text"
              placeholder="Details"
              value={form.detail}
              onChange={(event) => setForm((prev) => ({ ...prev, detail: event.target.value }))}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            {editingId ? 'Update Event' : 'Add Event'}
          </button>
        </form>
      )}
    </section>
  )
}

export default EventsPage
