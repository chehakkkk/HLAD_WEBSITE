import { useEffect, useState } from 'react'

const events = [
  { title: 'काव्य संध्या', date: '2026-06-18T18:00:00', detail: 'Live poetry reading and curated performances.' },
  { title: 'कहानी गोष्ठी', date: '2026-06-25T17:30:00', detail: 'Community storytelling and feedback circles.' },
  { title: 'लेखन कार्यशाला', date: '2026-07-02T15:00:00', detail: 'Practical writing craft and editorial review.' },
]

function EventsPage() {
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.max(0, new Date(events[0].date).getTime() - Date.now())
      setCountdown({
        d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
        s: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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
        {events.map((event) => (
          <article key={event.title} className="info-card">
            <h3>{event.title}</h3>
            <p>{event.detail}</p>
            <button className="btn btn-primary" type="button">Register</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EventsPage
