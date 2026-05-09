import { useEffect, useMemo, useRef, useState } from 'react'
import { useClub } from '../context/useClub'





const quotes = [
  '"शब्द संस्कृति की सबसे सुंदर विरासत हैं।"',
  '"कविता मनुष्य की संवेदना का उजास है।"',
  '"साहित्य से ही समाज की आत्मा बोलती है।"',
]

const featureCards = [
  { icon: '📖', title: 'Weekly Poetry Salon',    desc: 'हर सप्ताह एक नई काव्य यात्रा' },
  { icon: '🏛',  title: 'Curated Reading Rooms',  desc: 'क्यूरेटेड साहित्यिक पाठन अनुभव' },
  { icon: '🎙',  title: 'Live Author Dialogues',  desc: 'प्रसिद्ध लेखकों से सीधा संवाद' },
]

// ── Scroll-reveal hook ──────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Component ───────────────────────────────────
function HomePage() {
  const { state } = useClub()
  const [quoteIndex, setQuoteIndex]         = useState(0)
  const [quoteFading, setQuoteFading]       = useState(false)
  const [heroOffset, setHeroOffset]         = useState(0)
  const heroRef = useRef(null)

  useReveal()

  // Rotating quotes with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteFading(true)
      setTimeout(() => {
        setQuoteIndex((v) => (v + 1) % quotes.length)
        setQuoteFading(false)
      }, 500)
    }, 3500)
    return () => clearInterval(interval)
  }, [])
  

  // Parallax
  useEffect(() => {
    const onScroll = () => setHeroOffset(Math.min(window.scrollY, 300))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
  }

  return (
    <>
      {/* ══════════════════════════════════════
          HERO — Cinematic
      ══════════════════════════════════════ */}
      <section className="hero-cinematic" ref={heroRef}>

        {/* Background orbs */}
        <div className="hero-bg-orbs" aria-hidden="true">
          <div className="hero-orb hero-orb-1" style={{ transform: `translateY(${heroOffset * 0.08}px)` }} />
          <div className="hero-orb hero-orb-2" style={{ transform: `translateY(${heroOffset * 0.05}px)` }} />
          <div className="hero-orb hero-orb-3" style={{ transform: `translateY(${heroOffset * 0.03}px)` }} />
        </div>

        {/* Floating ornaments */}
        <div className="hero-ornaments" aria-hidden="true">
          <span className="ornament">पुस्तक</span>
          <span className="ornament">काव्य</span>
          <span className="ornament">स्याही</span>
          <span className="ornament">छंद</span>
          <span className="ornament">रस</span>
        </div>

        {/* Decorative ring */}
        <div className="hero-ring" aria-hidden="true" />

        {/* Main Content */}
        <div className="hero-content" style={{ transform: `translateY(${heroOffset * 0.04}px)` }}>

          <div className="hero-left">
            <p className="hero-eyebrow">Hindi Literature Club · Since 2017</p>

            <div className="hero-title">
              <span className="hero-title-main">साहित्य सभा</span>
              <span className="hero-title-sub">Sahitya Sabha</span>
            </div>

            <div className="hero-quote-wrapper">
              <blockquote className={`hero-quote${quoteFading ? ' fading' : ''}`}>
                {quotes[quoteIndex]}
              </blockquote>
            </div>

            <p className="hero-lead">
              हिंदी साहित्य का एक premium, immersive और संवादशील मंच —
              जहाँ शब्द, संवेदना और संस्कृति का अद्भुत संगम होता है।
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="/members">सदस्य बनें</a>
              <a className="btn btn-secondary" href="/forum">चर्चाएं खोजें</a>
              <a className="btn btn-ghost" href="/events">आयोजन</a>
            </div>
          </div>

          <div className="hero-right">
            {featureCards.map((card) => (
              <div className="hero-feature-card" key={card.title}>
                <span className="hero-feature-icon">{card.icon}</span>
                <div>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="hero-bottom">
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{state.members.length}+</strong>
              <span>सदस्य</span>
            </div>
            <div className="hero-stat">
              <strong>{state.posts.length}+</strong>
              <span>चर्चाएं</span>
            </div>
            <div className="hero-stat">
              <strong>{state.events.length}+</strong>
              <span>आयोजन</span>
            </div>
          </div>

          <button className="scroll-indicator" onClick={scrollDown} aria-label="Scroll down">
            <span>नीचे देखें</span>
            <div className="scroll-arrow">↓</div>
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Featured Authors
      ══════════════════════════════════════ */}
      

      {/* ══════════════════════════════════════
          Literature Timeline
      ══════════════════════════════════════ */}
      

      {/* ══════════════════════════════════════
          Upcoming Events
      ══════════════════════════════════════ */}
      <section className="surface reveal">
        <div className="section-head">
          <span className="section-eyebrow">आगामी कार्यक्रम</span>
          <h2>Upcoming Events</h2>
        </div>
        <div className="card-grid">
          {state.events.map((event, i) => (
            <article key={event.id} className={`info-card reveal reveal-delay-${(i % 3) + 1}`}>
              <h3>{event.title}</h3>
              <p style={{ marginTop: '0.4rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {event.detail}
              </p>
              <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--muted-gold)' }}>
                {new Date(event.date).toLocaleString()}
              </small>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          Forum Preview
      ══════════════════════════════════════ */}
      <section className="surface reveal">
        <div className="section-head">
          <span className="section-eyebrow">चर्चा मंच</span>
          <h2>Discussion Forum</h2>
        </div>
        <div className="card-grid">
          {state.posts.slice(0, 3).map((post, i) => (
            <article key={post.id} className={`forum-card reveal reveal-delay-${i + 1}`}>
              <h3>{post.title}</h3>
              <p style={{ marginTop: '0.4rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {post.body}
              </p>
              <div className="forum-meta">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          Members Showcase
      ══════════════════════════════════════ */}
      <section className="surface reveal">
        <div className="section-head">
          <span className="section-eyebrow">हमारे सदस्य</span>
          <h2>Member Showcase</h2>
        </div>
        <div className="card-grid">
          {state.members.slice(0, 3).map((member, i) => (
            <article key={member.id} className={`member-card reveal reveal-delay-${i + 1}`}>
              <h3>{member.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                {member.role}
              </p>
              <span className="chip">{member.badge}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          Testimonials + Stats
      ══════════════════════════════════════ */}
      

      {/* ══════════════════════════════════════
          Gallery + About
      ══════════════════════════════════════ */}
      <section className="surface reveal">
        <div className="section-head">
          <span className="section-eyebrow">स्मृतियाँ और पुरालेख</span>
          <h2>Gallery &amp; About</h2>
          <p>Memories, archives, and the cultural journey of Sahitya Sabha.</p>
        </div>
        <div className="card-grid">
          {state.gallery.map((item, i) => (
            <article key={item.id} className={`media-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="media-placeholder" />
              <h3>{item.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {item.type === 'image' ? 'Gallery moment' : 'Editorial blog'}
              </p>
            </article>
          ))}
        </div>
        <article className="info-card about-block">
          <h3>Our History</h3>
          <p style={{ marginTop: '0.4rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
            2017 से साहित्य सभा हिंदी साहित्य के पाठकों और लेखकों को एक premium,
            immersive और संवादशील मंच प्रदान कर रही है।
          </p>
        </article>
      </section>

      {/* ══════════════════════════════════════
          Newsletter
      ══════════════════════════════════════ */}
      <section className="surface newsletter-block reveal" style={{
        background: 'linear-gradient(145deg, rgba(92,61,46,0.06), rgba(184,148,63,0.08))'
      }}>
        <span className="section-eyebrow" style={{ display: 'block', textAlign: 'center' }}>
          न्यूज़लेटर
        </span>
        <h2>Newsletter</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          नई कविताएं, कार्यक्रम और विशेष चर्चाएं सीधे अपने inbox में पाएं।
        </p>
        <div className="inline-form">
          <input type="email" placeholder="आपका ईमेल पता" />
          <button type="button" className="btn btn-primary">Subscribe</button>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Footer
      ══════════════════════════════════════ */}
      <footer className="surface footer-block">
        <div>
          <p style={{ fontFamily: 'var(--heading)', fontWeight: 600, color: 'var(--text-h)' }}>
            साहित्य सभा
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>© 2026 Sahitya Sabha</p>
        </div>
        <div className="inline-actions" style={{ margin: 0 }}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
        </div>
      </footer>
    </>
  )
}

export default HomePage