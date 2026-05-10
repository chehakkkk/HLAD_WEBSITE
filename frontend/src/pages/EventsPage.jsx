import { useEffect, useState } from 'react'
import { useClub } from '../context/useClub'

export default function EventsPage() {
  const { state, auth, addEvent, updateEvent, deleteEvent, registerEvent } = useClub()
  const [countdown, setCountdown] = useState({ d:'00', h:'00', m:'00', s:'00' })
  const [form, setForm] = useState({ title:'', date:'', detail:'' })
  const [editingId, setEditingId] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.max(0, new Date(state.events[0]?.date).getTime() - Date.now())
      setCountdown({
        d: String(Math.floor(diff/86400000)).padStart(2,'0'),
        h: String(Math.floor(diff/3600000)%24).padStart(2,'0'),
        m: String(Math.floor(diff/60000)%60).padStart(2,'0'),
        s: String(Math.floor(diff/1000)%60).padStart(2,'0'),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [state.events])

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.title.trim() || !form.date) return
    editingId ? updateEvent(editingId, form) : addEvent(form)
    setEditingId('')
    setForm({ title:'', date:'', detail:'' })
  }

  return (
    <div className="px-3 md:px-6 py-4 space-y-5">

      {/* Header */}
      <section className="rounded-3xl p-8 md:p-12 text-center cross-pattern"
        style={{ background: 'linear-gradient(160deg, #f5f0e8 0%, #ede4cc 100%)', border: '1px solid rgba(212,196,160,0.5)' }}>
        <h1 className="text-3xl md:text-5xl text-[#3d2b1f] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          आगामी कार्यक्रम
        </h1>
        <p className="text-[#7a6250]">Upcoming Events &amp; Activities</p>

        {/* Countdown */}
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          {[['d','Days'],['h','Hours'],['m','Min'],['s','Sec']].map(([k,l]) => (
            <div key={k} className="rounded-2xl px-6 py-4 text-center border border-[#d4c4a0]"
              style={{ background: 'rgba(255,252,245,0.8)', minWidth: '72px' }}>
              <div className="text-3xl font-bold text-[#8B6914]" style={{ fontFamily: 'var(--font-heading)' }}>
                {countdown[k]}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#7a6250] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Event cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {state.events.map((ev, i) => (
          <article key={ev.id} className="rounded-2xl overflow-hidden border border-[#d4c4a0]/60 hover:-translate-y-1 transition-transform duration-200"
            style={{ background: 'rgba(255,252,245,0.8)' }}>
            <div className="h-36 flex items-center justify-center text-5xl"
              style={{ background: `linear-gradient(135deg, ${['#e8d9b8','#d4c49c'][i%2]}, #c8b080)` }}>
              {['📚','🎤','🌸'][i%3]}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-[#3d2b1f] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{ev.title}</h3>
              <p className="text-xs text-[#7a6250] mb-1">{ev.detail}</p>
              <p className="text-xs text-[#8B6914] font-medium mb-4">{new Date(ev.date).toLocaleString()}</p>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => registerEvent(ev.id)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer border-none transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)' }}>
                  Register ({ev.registrations})
                </button>
                {auth.role === 'admin' && (
                  <>
                    <button onClick={() => { setEditingId(ev.id); setForm({title:ev.title,date:ev.date,detail:ev.detail}) }}
                      className="px-3 py-2 rounded-xl text-xs border border-[#d4c4a0] text-[#5c3d2e] hover:bg-[#8B6914]/10 cursor-pointer transition-colors">
                      Edit
                    </button>
                    <button onClick={() => deleteEvent(ev.id)}
                      className="px-3 py-2 rounded-xl text-xs border border-red-200 text-red-500 hover:bg-red-50 cursor-pointer transition-colors">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Admin form */}
      {auth.role === 'admin' && (
        <div className="rounded-3xl p-6 md:p-8 border border-[#d4c4a0]/60" style={{ background: 'rgba(255,252,245,0.8)' }}>
          <h3 className="text-lg font-semibold text-[#3d2b1f] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {editingId ? 'Update Event' : 'Add New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3">
            <input placeholder="Event title" value={form.title}
              onChange={e => setForm(p => ({...p,title:e.target.value}))}
              className="px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70" />
            <input type="datetime-local" value={form.date}
              onChange={e => setForm(p => ({...p,date:e.target.value}))}
              className="px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70" />
            <input placeholder="Details" value={form.detail}
              onChange={e => setForm(p => ({...p,detail:e.target.value}))}
              className="px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70" />
            <button type="submit"
              className="sm:col-span-3 py-2.5 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)' }}>
              {editingId ? 'Update Event' : 'Add Event'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}