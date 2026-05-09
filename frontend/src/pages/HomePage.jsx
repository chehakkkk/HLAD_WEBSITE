import { useEffect, useMemo, useState } from 'react'
import { useClub } from '../context/useClub'

const timeline = [
  { era: 'आदिकाल', year: '1000-1375', highlight: 'वीर रस और महाकाव्य परंपरा।' },
  { era: 'भक्तिकाल', year: '1375-1700', highlight: 'लोकभाषा और भक्ति काव्य का उत्कर्ष।' },
  { era: 'रीतिकाल', year: '1700-1900', highlight: 'श्रृंगार, अलंकार और काव्यशिल्प।' },
  { era: 'आधुनिक काल', year: '1900-1950', highlight: 'यथार्थवाद और सामाजिक चेतना।' },
  { era: 'समकालीन', year: '1950-वर्तमान', highlight: 'प्रयोग और नए विमर्श।' },
]

const testimonials = [
  '“यह मंच हिंदी साहित्य को नए रूप में देखने का अवसर देता है।”',
  '“साहित्य सभा की community warm, welcoming और inspiring है।”',
  '“यहां हर सत्र विचार और संवेदना से भरपूर होता है।”',
]

const authors = [
  { name: 'महादेवी वर्मा', quote: 'मैं नीर भरी दुख की बदली।' },
  { name: 'दिनकर', quote: 'सीधे-सादे शब्दों में ज्वाला।' },
  { name: 'प्रेमचंद', quote: 'साहित्य समाज का दर्पण है।' },
]

function HomePage() {
  const { state } = useClub()
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [heroOffset, setHeroOffset] = useState(0)
  const quotes = useMemo(
    () => [
      '“शब्द संस्कृति की सबसे सुंदर विरासत हैं।”',
      '“कविता मनुष्य की संवेदना का उजास है।”',
      '“साहित्य से ही समाज की आत्मा बोलती है।”',
    ],
    [],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((value) => (value + 1) % quotes.length)
      setTestimonialIndex((value) => (value + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [quotes.length])

  useEffect(() => {
    const onScroll = () => setHeroOffset(Math.min(window.scrollY, 220))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <section className="surface hero editorial">
        <div className="floating-ornaments" aria-hidden="true">
          <span>पुस्तक</span>
          <span>स्याही</span>
          <span>पांडुलिपि</span>
        </div>
        <p className="eyebrow">Hindi Literature Club</p>
        <h1 style={{ transform: `translateY(${heroOffset * 0.06}px)` }}>साहित्य सभा</h1>
        <p className="type-line">{quotes[quoteIndex]}</p>
        <p className="lead">
          award-winning cultural platform की भावना के साथ हिंदी साहित्य का immersive
          अनुभव।
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/members">Join the Club</a>
          <a className="btn btn-secondary" href="/forum">Explore Discussions</a>
          <a className="btn btn-secondary" href="/events">Upcoming Events</a>
        </div>
        <div className="bento-grid">
          <article className="surface-sub">Weekly poetry salon</article>
          <article className="surface-sub">Curated reading rooms</article>
          <article className="surface-sub">Live author dialogues</article>
        </div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Featured Authors</h2>
        </div>
        <div className="card-grid">
          {authors.map((author) => (
            <article key={author.name} className="info-card">
              <h3>{author.name}</h3>
              <p>{author.quote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Interactive Literature Timeline</h2>
        </div>
        <div className="card-grid">
          {timeline.map((item) => (
            <article key={item.era} className="timeline-item">
              <h3>{item.era}</h3>
              <strong>{item.year}</strong>
              <p>{item.highlight}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Upcoming Events</h2>
        </div>
        <div className="card-grid">
          {state.events.map((event) => (
            <article key={event.id} className="info-card">
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
              <small>{new Date(event.date).toLocaleString()}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Discussion Forum Preview</h2>
        </div>
        <div className="card-grid">
          {state.posts.slice(0, 3).map((post) => (
            <article key={post.id} className="forum-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div className="forum-meta">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Member Showcase</h2>
        </div>
        <div className="card-grid">
          {state.members.slice(0, 3).map((member) => (
            <article key={member.id} className="member-card">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <span>{member.badge}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="surface split-grid">
        <article className="info-card">
          <h2>Testimonials</h2>
          <p>{testimonials[testimonialIndex]}</p>
        </article>
        <article className="info-card">
          <h2>Statistics</h2>
          <div className="count-grid">
            <article><strong>{state.members.length}</strong><span>Members</span></article>
            <article><strong>{state.posts.length}</strong><span>Discussions</span></article>
            <article><strong>{state.events.length}</strong><span>Events</span></article>
            <article><strong>{state.gallery.length}</strong><span>Gallery Items</span></article>
          </div>
        </article>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Gallery + About</h2>
          <p>Memories, archives, and the cultural journey of Sahitya Sabha.</p>
        </div>
        <div className="card-grid">
          {state.gallery.map((item) => (
            <article key={item.id} className="media-card">
              <div className="media-placeholder" />
              <h3>{item.title}</h3>
              <p>{item.type === 'image' ? 'Gallery moment' : 'Editorial blog'}</p>
            </article>
          ))}
        </div>
        <article className="info-card about-block">
          <h3>Our History</h3>
          <p>
            2017 से साहित्य सभा हिंदी साहित्य के पाठकों और लेखकों को एक premium,
            immersive और संवादशील मंच प्रदान कर रही है।
          </p>
        </article>
      </section>

      <section className="surface newsletter-block">
        <h2>Newsletter</h2>
        <p>नई कविताएं, कार्यक्रम और विशेष चर्चाएं सीधे अपने inbox में पाएं।</p>
        <form className="inline-form">
          <input type="email" placeholder="आपका ईमेल" />
          <button type="button" className="btn btn-primary">Subscribe</button>
        </form>
      </section>

      <footer className="surface footer-block">
        <p>© 2026 Sahitya Sabha</p>
        <div className="inline-actions">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
        </div>
      </footer>
    </>
  )
}

export default HomePage
