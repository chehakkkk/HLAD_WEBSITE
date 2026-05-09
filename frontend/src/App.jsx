import { useEffect, useMemo, useState } from 'react'
import './App.css'

const navItems = [
  { id: 'hero', label: 'होम' },
  { id: 'timeline', label: 'विरासत' },
  { id: 'authors', label: 'लेखक' },
  { id: 'events', label: 'इवेंट्स' },
  { id: 'forum', label: 'फोरम' },
  { id: 'members', label: 'सदस्य' },
  { id: 'contact', label: 'संपर्क' },
]

const timelineData = [
  { era: 'आदिकाल', years: '1000-1375', name: 'चंदबरदाई', text: 'वीर रस और ऐतिहासिक काव्य परंपरा की गूंज।' },
  { era: 'भक्तिकाल', years: '1375-1700', name: 'सूरदास', text: 'भक्ति, प्रेम और लोकभावना को काव्य में प्रतिष्ठा।' },
  { era: 'रीतिकाल', years: '1700-1900', name: 'बिहारी', text: 'श्रृंगार, अलंकार और काव्यशिल्प का सुव्यवस्थित उत्कर्ष।' },
  { era: 'आधुनिक काल', years: '1900-1950', name: 'प्रेमचंद', text: 'यथार्थ, समाज और जनचेतना की नई साहित्यिक दिशा।' },
  { era: 'समकालीन काल', years: '1950-वर्तमान', name: 'निराला', text: 'प्रयोग, प्रतिरोध और नए विमर्शों की जीवंत परंपरा।' },
]

const authors = [
  { name: 'महादेवी वर्मा', quote: 'मैं नीर भरी दुख की बदली।', bio: 'छायावाद की प्रमुख स्तंभ और संवेदनशील लेखन की प्रतीक।' },
  { name: 'रामधारी सिंह दिनकर', quote: 'सीधे-सादे शब्दों में ज्वाला।', bio: 'राष्ट्रवाद, ओज और सामाजिक चेतना के कालजयी कवि।' },
  { name: 'हरिवंश राय बच्चन', quote: 'मृदु भावों के अंगूरों की आज बना लाया हाला।', bio: 'आधुनिक हिंदी कविता में गेयता और दार्शनिक भावधारा।' },
  { name: 'अमृता प्रीतम', quote: 'मैं तैनूं फिर मिलांगी।', bio: 'प्रेम, स्त्री-अस्मिता और मानवीय गहराई की अद्भुत आवाज।' },
]

const discussionThreads = [
  { title: 'आज की पसंदीदा कविता पंक्ति?', comments: 82, reactions: 214, tag: 'Poetry Jam' },
  { title: 'प्रेमचंद की कहानियों का सामाजिक प्रभाव', comments: 56, reactions: 167, tag: 'Book Talk' },
  { title: 'नई लेखन शैली: मुक्त छंद vs छंदबद्ध', comments: 39, reactions: 122, tag: 'Writing Lab' },
]

const members = [
  { name: 'श्रेयसी मिश्रा', role: 'Member of the Month', badge: 'काव्य रत्न' },
  { name: 'आयुष श्रीवास्तव', role: 'Community Mentor', badge: 'कथा शिल्पी' },
  { name: 'रीमा गुप्ता', role: 'Open Mic Host', badge: 'स्वर साधक' },
  { name: 'विवेक त्रिपाठी', role: 'Research Contributor', badge: 'साहित्य शोधक' },
]

const testimonials = [
  '“Sahitya Sabha ने मुझे लिखने का आत्मविश्वास दिया और अपनी आवाज खोजने का मंच भी।”',
  '“हर सत्र कला, संवेदना और विचार का नया अनुभव देता है। यह सिर्फ क्लब नहीं, समुदाय है।”',
  '“इतनी सुंदर और आधुनिक हिंदी साहित्यिक space मैंने पहले कभी नहीं देखी।”',
]

const quoteOfDay = [
  '“शब्द जब आत्मा को छू लें, वही साहित्य है।”',
  '“कविता भावों की वह नदी है, जो समय से परे बहती है।”',
  '“साहित्य समाज की स्मृति और भविष्य की संभावना है।”',
]

function useTypingText(lines, speed = 80, pause = 1400) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = lines[lineIndex]
    const timeout = setTimeout(
      () => {
        if (!deleting && charIndex < current.length) {
          setCharIndex((value) => value + 1)
          return
        }
        if (!deleting && charIndex === current.length) {
          setDeleting(true)
          return
        }
        if (deleting && charIndex > 0) {
          setCharIndex((value) => value - 1)
          return
        }
        setDeleting(false)
        setLineIndex((value) => (value + 1) % lines.length)
      },
      !deleting && charIndex === current.length ? pause : speed,
    )
    return () => clearTimeout(timeout)
  }, [lines, lineIndex, charIndex, deleting, speed, pause])

  return `${lines[lineIndex].slice(0, charIndex)}|`
}

function App() {
  const [activeEvent, setActiveEvent] = useState(0)
  const [activeFaq, setActiveFaq] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [memberIndex, setMemberIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const [counts, setCounts] = useState({ members: 0, poems: 0, events: 0, forum: 0 })
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [heroOffset, setHeroOffset] = useState(0)

  const events = useMemo(() => [
    { title: 'काव्य संध्या', date: '2026-06-18T18:00:00', display: '18 जून 2026 • शाम 6:00 बजे', tag: 'Open Mic', description: 'रचना पाठ, सजीव संगीत और curated poetic storytelling.' },
    { title: 'कहानी गोष्ठी', date: '2026-06-25T17:30:00', display: '25 जून 2026 • शाम 5:30 बजे', tag: 'Story Circle', description: 'लघुकथा चर्चा, समीक्षा और mentorship session.' },
    { title: 'लेखन कार्यशाला', date: '2026-07-02T15:00:00', display: '02 जुलाई 2026 • दोपहर 3:00 बजे', tag: 'Writing Lab', description: 'plot design, voice building और editing craft की masterclass.' },
  ], [])

  const faqs = useMemo(() => [
    { question: 'सदस्यता कैसे लें?', answer: 'Join the Club पर क्लिक करके फॉर्म भरें। समीक्षा के बाद आपका welcome mail साझा किया जाएगा।' },
    { question: 'क्या शुरुआती लेखक जुड़ सकते हैं?', answer: 'हां, Sahitya Sabha शुरुआत करने वालों से लेकर published लेखकों तक सभी के लिए है।' },
    { question: 'ऑनलाइन सत्र उपलब्ध हैं?', answer: 'मासिक hybrid sessions होते हैं। पंजीकरण के बाद meeting links और reading kit भेजी जाती है।' },
  ], [])

  const typingText = useTypingText([
    '“शब्दों से बनता है संस्कार, साहित्य से बनती है सभ्यता।”',
    '“जहां कविता सांस लेती है, वहीं Sahitya Sabha खिलती है।”',
    '“हिंदी साहित्य: परंपरा, प्रयोग और भविष्य की नई आवाज।”',
  ], 70, 1800)

  useEffect(() => {
    document.body.dataset.theme = isDark ? 'dark' : 'light'
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.35 },
    )
    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    const revealEls = document.querySelectorAll('.reveal')
    revealEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const ticker = setInterval(() => {
      const nextDate = new Date(events[0].date).getTime()
      const now = Date.now()
      const diff = Math.max(0, nextDate - now)
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / (1000 * 60)) % 60)
      const s = Math.floor((diff / 1000) % 60)
      setCountdown({
        d: String(d).padStart(2, '0'),
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(ticker)
  }, [events])

  useEffect(() => {
    const countSection = document.getElementById('stats')
    if (!countSection) return () => {}
    let animated = false
    const target = { members: 3200, poems: 18450, events: 126, forum: 9200 }
    const countObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animated) return
        animated = true
        let step = 0
        const interval = setInterval(() => {
          step += 1
          const progress = step / 45
          setCounts({
            members: Math.round(target.members * progress),
            poems: Math.round(target.poems * progress),
            events: Math.round(target.events * progress),
            forum: Math.round(target.forum * progress),
          })
          if (step >= 45) clearInterval(interval)
        }, 35)
      },
      { threshold: 0.4 },
    )
    countObserver.observe(countSection)
    return () => countObserver.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setMemberIndex((value) => (value + 1) % members.length)
      setTestimonialIndex((value) => (value + 1) % testimonials.length)
      setQuoteIndex((value) => (value + 1) % quoteOfDay.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18
      const y = (event.clientY / window.innerHeight - 0.5) * 18
      setParallax({ x, y })
      setCursor({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setHeroOffset(Math.min(window.scrollY, 240))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="page">
      <div className="cursor-orb" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />

      <header className={`top-nav ${activeSection !== 'hero' ? 'scrolled' : ''}`}>
        <p className="brand">Sahitya Sabha</p>
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsNavOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <nav aria-label="मुख्य नेविगेशन" className={isNavOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => setIsNavOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button type="button" className="theme-toggle" onClick={() => setIsDark((value) => !value)} aria-label="Toggle color mode">
          {isDark ? 'Light' : 'Dark'}
        </button>
      </header>

      <section id="hero" className="hero-section surface">
        <div className="ink-layer" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="literary-float" aria-hidden="true">
          <span className="float-book">पुस्तक</span>
          <span className="float-ink">स्याही</span>
          <span className="float-paper">पांडुलिपि</span>
        </div>
        <div className="hero-content reveal" style={{ transform: `translateY(${heroOffset * 0.08}px)` }}>
          <p className="eyebrow">हिंदी साहित्य का प्रीमियम सांस्कृतिक मंच</p>
          <h1>साहित्य सभा</h1>
          <p className="type-line">{typingText}</p>
          <p className="lead">
            एक calm editorial अनुभव जहां कविता, कहानी और विचार आधुनिक डिजिटल शिल्प में
            जीवंत होते हैं।
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">क्लब से जुड़ें</a>
            <a className="btn btn-secondary" href="#timeline">साहित्य देखें</a>
            <a className="btn btn-secondary" href="#events">आगामी कार्यक्रम</a>
          </div>
        </div>
        <div className="hero-panel reveal delay-1">
          <div
            className="glass-card"
            style={{ transform: `translate(${parallax.x * 0.85}px, ${parallax.y * 0.85}px)` }}
          >
            <h2>आज का साहित्यिक फ्रेम</h2>
            <blockquote>“शब्दों की ऊष्मा से ही संस्कृति का भविष्य उजाला पाता है।”</blockquote>
            <p>पाठ • संवाद • अभिलेख • अनुभव</p>
          </div>
          <a className="scroll-indicator" href="#timeline">नीचे स्क्रोल करें</a>
        </div>
      </section>

      <section id="timeline" className="surface reveal">
        <div className="section-head">
          <h2>हिंदी साहित्य की समय-यात्रा</h2>
          <p>Hover करके युगों की झलक और प्रमुख साहित्यकार देखें।</p>
        </div>
        <div className="timeline-grid">
          {timelineData.map((item) => (
            <article key={item.era} className="timeline-card">
              <p className="era">{item.era}</p>
              <h3>{item.name}</h3>
              <small>{item.years}</small>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="authors" className="surface reveal">
        <div className="section-head">
          <h2>Featured Authors</h2>
          <p>Hover cards for quote reveal and literary profile.</p>
        </div>
        <div className="author-grid">
          {authors.map((author) => (
            <article key={author.name} className="author-card">
              <h3>{author.name}</h3>
              <p className="quote">{author.quote}</p>
              <p>{author.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="surface reveal">
        <div className="section-head">
          <h2>Upcoming Events</h2>
          <p>Live countdown with interactive event cards.</p>
        </div>
        <div className="countdown">
          <article><strong>{countdown.d}</strong><span>Days</span></article>
          <article><strong>{countdown.h}</strong><span>Hours</span></article>
          <article><strong>{countdown.m}</strong><span>Minutes</span></article>
          <article><strong>{countdown.s}</strong><span>Seconds</span></article>
        </div>
        <div className="event-layout">
          <div className="event-list" role="tablist" aria-label="कार्यक्रम सूची">
            {events.map((event, index) => (
              <button key={event.title} type="button" className={`event-tab ${activeEvent === index ? 'is-active' : ''}`} onClick={() => setActiveEvent(index)}>
                <span>{event.title}</span>
                <small>{event.display}</small>
              </button>
            ))}
          </div>
          <article className="event-card">
            <h3>{events[activeEvent].title}</h3>
            <p>{events[activeEvent].description}</p>
            <div className="chips">
              <span>{events[activeEvent].display}</span>
              <span>{events[activeEvent].tag}</span>
            </div>
            <button type="button" className="btn btn-primary">Register Now</button>
          </article>
        </div>
      </section>

      <section id="forum" className="surface reveal">
        <div className="section-head">
          <h2>Discussion Forum Preview</h2>
          <p>Community-driven threads inspired by modern discussion platforms.</p>
        </div>
        <div className="forum-grid">
          {discussionThreads.map((thread) => (
            <article key={thread.title} className="forum-card">
              <span className="chip-tag">{thread.tag}</span>
              <h3>{thread.title}</h3>
              <div className="forum-meta">
                <span>💬 {thread.comments}</span>
                <span>❤️ {thread.reactions}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="members" className="surface reveal split member-section">
        <div className="member-spotlight">
          <h2>Member Showcase</h2>
          <article className="member-card">
            <h3>{members[memberIndex].name}</h3>
            <p>{members[memberIndex].role}</p>
            <span>{members[memberIndex].badge}</span>
          </article>
          <div className="carousel-actions">
            <button type="button" onClick={() => setMemberIndex((value) => (value - 1 + members.length) % members.length)}>Prev</button>
            <button type="button" onClick={() => setMemberIndex((value) => (value + 1) % members.length)}>Next</button>
          </div>
        </div>
        <div className="quote-day">
          <h2>Quote of the Day</h2>
          <blockquote>{quoteOfDay[quoteIndex]}</blockquote>
        </div>
      </section>

      <section id="stats" className="surface reveal">
        <div className="section-head">
          <h2>Our Literary Impact</h2>
        </div>
        <div className="stats-grid">
          <article><strong>{counts.members.toLocaleString()}</strong><span>Members</span></article>
          <article><strong>{counts.poems.toLocaleString()}</strong><span>Poems Shared</span></article>
          <article><strong>{counts.events.toLocaleString()}</strong><span>Events Conducted</span></article>
          <article><strong>{counts.forum.toLocaleString()}</strong><span>Forum Discussions</span></article>
        </div>
      </section>

      <section className="surface reveal">
        <div className="section-head">
          <h2>Testimonials</h2>
        </div>
        <article className="testimonial-card">
          <p>{testimonials[testimonialIndex]}</p>
        </article>
      </section>

      <section id="contact" className="surface reveal">
        <div className="section-head">
          <h2>FAQ + Join Sahitya Sabha</h2>
        </div>
        <div className="split">
          <div className="faq-list">
            {faqs.map((item, index) => (
              <article key={item.question} className={`faq-item ${activeFaq === index ? 'is-open' : ''}`}>
                <button type="button" onClick={() => setActiveFaq(index)}>{item.question}</button>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
          <form className="join-form">
            <label>नाम<input type="text" placeholder="अपना नाम लिखें" /></label>
            <label>ईमेल<input type="email" placeholder="example@email.com" /></label>
            <label>रुचि<select defaultValue="कविता"><option>कविता</option><option>कहानी</option><option>आलोचना</option><option>नाटक</option></select></label>
            <button type="submit" className="btn btn-primary">Join the Club</button>
          </form>
        </div>
      </section>

      <footer className="surface footer">
        <div>
          <h3>Sahitya Sabha</h3>
          <p>“जहां शब्द संस्कृति बनते हैं।”</p>
        </div>
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#events">Events</a>
          <a href="#forum">Forum</a>
          <a href="#contact">Join</a>
        </div>
        <form className="newsletter">
          <input type="email" placeholder="Newsletter email" />
          <button type="button">Subscribe</button>
        </form>
        <div className="socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
        </div>
      </footer>
    </div>
  )
}

export default App
