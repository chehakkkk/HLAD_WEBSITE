import { useEffect, useRef, useState } from 'react'
import { useClub } from '../context/useClub'

const quotes = [
  { hi: 'निज भाषा उन्नति अहै, सब उन्नति को मूल।', en: '"Progress of one\'s own language is the root of all progress."', author: '— भारतेन्दु हरिश्चंद्र' },
  { hi: 'साहित्य समाज का दर्पण है।',                en: '"Literature is the mirror of society."',                       author: '— प्रेमचंद' },
  { hi: 'कविता मनुष्य की संवेदना का उजास है।',       en: '"Poetry is the light of human sensitivity."',                  author: '— निराला' },
]

const offerings = [
  { icon: '📖', title: 'Literary Workshops',  desc: 'Master the art of Hindi poetry and prose with expert guidance' },
  { icon: '👥', title: 'Community Events',    desc: 'Connect with fellow literature enthusiasts at our regular meetups' },
  { icon: '🎤', title: 'Poetry Slams',        desc: 'Express yourself on stage at our monthly open mic evenings' },
  { icon: '📝', title: 'Writing Labs',        desc: 'Sharpen your craft in focused creative writing workshops' },
]

const floatingTags = ['काव्य', 'साहित्य', 'कविता', 'गद्य', 'छंद']

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.10 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function HomePage() {
  const { state } = useClub()
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useReveal()

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => { setQuoteIdx(v => (v + 1) % quotes.length); setFading(false) }, 400)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => setScrollY(Math.min(window.scrollY, 300))
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const q = quotes[quoteIdx]

  return (
    <div className="px-3 md:px-6 pb-8 space-y-5 mt-4">

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[92svh] rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(212,170,90,0.22) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(139,105,20,0.12) 0%, transparent 50%), linear-gradient(160deg, #f5f0e8 0%, #ede4cc 60%, #e3d5b0 100%)',
          boxShadow: '0 20px 60px rgba(61,43,31,0.15)'
        }}>

        {/* Subtle grid texture */}
        <div className="absolute inset-0 cross-pattern opacity-40 pointer-events-none" />

        {/* Floating Hindi tags */}
        {floatingTags.map((tag, i) => (
          <span key={tag}
            className="absolute text-xs font-medium px-3 py-1.5 rounded-full border animate-tag-float pointer-events-none select-none"
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#8B6914',
              borderColor: 'rgba(139,105,20,0.3)',
              background: 'rgba(245,240,232,0.6)',
              backdropFilter: 'blur(4px)',
              top:  ['12%','35%','62%','18%','75%'][i],
              left: i % 2 === 0 ? '1.5%' : undefined,
              right: i % 2 !== 0 ? '1.5%' : undefined,
              animationDuration: `${8 + i * 1.5}s`,
              animationDelay: `${-i * 2}s`,
            }}>
            {tag}
          </span>
        ))}

        {/* Big decorative pen SVG */}
        <div className="absolute right-0 top-0 w-[45%] h-full flex items-center justify-center pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <svg viewBox="0 0 300 360" className="w-full max-w-xs opacity-90" fill="none">
            {/* Book behind */}
            <rect x="80" y="60" width="160" height="220" rx="8" stroke="rgba(139,105,20,0.2)" strokeWidth="1.5" fill="none" />
            <rect x="90" y="70" width="140" height="200" rx="6" stroke="rgba(139,105,20,0.15)" strokeWidth="1" fill="none" />
            {/* Quill pen */}
            <path className="pen-path"
              d="M230 40 C210 80 180 120 150 180 C130 220 120 260 115 300"
              stroke="#8B6914" strokeWidth="2.5" strokeLinecap="round" />
            <path className="pen-path"
              d="M230 40 C250 60 260 90 240 130 C220 160 190 175 150 180"
              stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
            <path className="pen-path"
              d="M230 40 C215 55 200 75 185 100 C170 125 160 155 150 180"
              stroke="#b8943f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            {/* Nib */}
            <path className="pen-path"
              d="M115 300 L108 318 L120 308 L115 300 Z"
              stroke="#8B6914" strokeWidth="1.5" fill="rgba(139,105,20,0.15)" />
            {/* Ink drop */}
            <circle cx="113" cy="322" r="3" fill="#8B6914" opacity="0.5" />
          </svg>
          {/* Decorative rings */}
          <div className="absolute right-8 top-16 w-40 h-40 rounded-full border border-[#8B6914]/15 ring-ornament" />
          <div className="absolute right-4 bottom-20 w-24 h-24 rounded-full border border-[#8B6914]/10 ring-ornament" style={{ animationDelay: '-2s' }} />
        </div>

        {/* Hero text content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-14 pt-10 pb-6 max-w-[580px]"
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}>

          {/* Hindi headline */}
          <h1 className="animate-word-rise text-[clamp(3rem,8vw,5.5rem)] leading-[1.0] text-[#3d2b1f] mb-1"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
            हलाद
          </h1>

          {/* English bold */}
          <h2 className="animate-word-rise delay-200 text-[clamp(2rem,5vw,3.5rem)] leading-none font-black tracking-tight mb-4"
            style={{ color: '#8B6914' }}>
            HLAD
          </h2>

          {/* Subtitle */}
          <p className="animate-word-rise delay-300 text-lg md:text-xl text-[#5c3d2e] mb-6 font-medium">
            Hindi Literature &amp; Arts Division
          </p>

          {/* Quote card */}
          <div className="animate-word-rise delay-400 rounded-2xl p-5 mb-7 border border-[#d4c4a0]"
            style={{ background: 'rgba(255,252,245,0.85)', backdropFilter: 'blur(8px)' }}>
            <p className={`text-base md:text-lg text-[#3d2b1f] leading-relaxed transition-all duration-400 ${fading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}
              style={{ fontFamily: 'var(--font-heading)' }}>
              {q.hi}
            </p>
            <p className={`text-sm text-[#7a6250] italic mt-2 transition-all duration-400 ${fading ? 'opacity-0' : 'opacity-100'}`}>
              {q.en}
            </p>
            <p className={`text-xs text-[#8B6914] mt-1 font-medium transition-all duration-400 ${fading ? 'opacity-0' : 'opacity-100'}`}>
              {q.author}
            </p>
          </div>

          {/* CTAs */}
          <div className="animate-word-rise delay-500 flex gap-3 flex-wrap">
            <a href="/members"
              className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm relative overflow-hidden btn-shimmer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)', boxShadow: '0 4px 18px rgba(139,105,20,0.40)' }}>
              Join the Club <span>✉</span>
            </a>
            <a href="/events"
              className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-[#8B6914] text-[#8B6914] transition-all duration-200 hover:bg-[#8B6914] hover:text-white hover:-translate-y-0.5">
              Explore Events
            </a>
          </div>
        </div>

        {/* Bottom stats + scroll indicator */}
        <div className="relative z-10 flex items-center justify-between px-8 md:px-14 py-4 border-t border-[#d4c4a0]/50 flex-wrap gap-3">
          <div className="flex gap-8">
            {[
              { n: `${state.members.length}+`, l: 'सदस्य' },
              { n: `${state.posts.length}+`,   l: 'चर्चाएं' },
              { n: `${state.events.length}+`,  l: 'आयोजन' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-xl font-bold text-[#3d2b1f]" style={{ fontFamily: 'var(--font-heading)' }}>{s.n}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#7a6250]">{s.l}</div>
              </div>
            ))}
          </div>
          <button onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent">
            <span className="text-[9px] uppercase tracking-widest text-[#7a6250]">scroll</span>
            <div className="w-7 h-7 rounded-full border border-[#b8943f] flex items-center justify-center text-xs text-[#8B6914] animate-bounce-scroll">↓</div>
          </button>
        </div>
      </section>

      {/* ══════════ ABOUT / WHAT WE OFFER ══════════ */}
      <section className="rounded-3xl overflow-hidden reveal">
        <div className="cross-pattern py-12 px-6 md:px-12 text-center border-b border-[#d4c4a0]/50"
          style={{ background: 'rgba(237,228,213,0.4)' }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#8B6914]/40" />
            <span className="text-[#8B6914] text-sm">📅</span>
            <div className="h-px w-12 bg-[#8B6914]/40" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#3d2b1f] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            About HLAD
          </h2>
          <p className="text-[#7a6250] text-base">Where tradition meets contemporary expression</p>
        </div>

        <div className="grid md:grid-cols-2 gap-0" style={{ background: '#f5f0e8' }}>
          {/* Manuscript image placeholder */}
          <div className="relative min-h-64 md:min-h-80 flex items-end"
            style={{ background: 'linear-gradient(135deg, #e8d9b8 0%, #d4c49c 50%, #c8b488 100%)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center opacity-40">
                <div className="text-6xl mb-2">📜</div>
                <p className="text-xs text-[#5c3d2e]" style={{ fontFamily: 'var(--font-heading)' }}>प्राचीन पाण्डुलिपि</p>
              </div>
            </div>
            <div className="relative z-10 m-4 px-4 py-2 rounded-xl text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)' }}>
              5+ Years
            </div>
          </div>

          {/* What we offer */}
          <div className="p-7 md:p-10 border-l border-[#d4c4a0]/50">
            <h3 className="text-xl text-[#3d2b1f] mb-6 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              What We Offer
            </h3>
            <div className="space-y-5">
              {offerings.map((o, i) => (
                <div key={o.title} className={`flex gap-4 items-start reveal delay-${i + 1}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-[#d4c4a0]"
                    style={{ background: 'rgba(139,105,20,0.08)' }}>
                    {o.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#3d2b1f] text-sm">{o.title}</div>
                    <div className="text-xs text-[#7a6250] mt-0.5 leading-relaxed">{o.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ EVENTS ══════════ */}
      <section className="rounded-3xl overflow-hidden reveal" style={{ background: '#f5f0e8', border: '1px solid rgba(212,196,160,0.5)' }}>
        <div className="cross-pattern py-10 px-6 md:px-12 text-center border-b border-[#d4c4a0]/50"
          style={{ background: 'rgba(237,228,213,0.3)' }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#8B6914]/40" />
            <span className="text-[#8B6914] text-sm">📅</span>
            <div className="h-px w-12 bg-[#8B6914]/40" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#3d2b1f] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Recent Updates &amp; Events
          </h2>
          <p className="text-[#7a6250] text-sm">Join us in celebrating the art of Hindi literature</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 md:p-8">
          {state.events.map((ev, i) => (
            <article key={ev.id} className={`rounded-2xl overflow-hidden border border-[#d4c4a0]/60 hover:-translate-y-1 transition-transform duration-200 reveal delay-${(i % 3) + 1}`}
              style={{ background: 'rgba(255,252,245,0.7)' }}>
              {/* Image placeholder with category badge */}
              <div className="relative h-44 flex items-end"
                style={{ background: `linear-gradient(160deg, ${['#d4c49c','#c8b080','#bca06c'][i % 3]} 0%, #8B6914 100%)` }}>
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
                  {['📚', '🎤', '🌸'][i % 3]}
                </div>
                <span className="relative z-10 m-3 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                  style={{ background: 'rgba(139,105,20,0.85)' }}>
                  {['Poetry Slam', 'Book Reading', 'Festival'][i % 3]}
                </span>
                <div className="absolute bottom-0 inset-x-0 p-3 pt-8"
                  style={{ background: 'linear-gradient(transparent, rgba(61,43,31,0.7))' }}>
                  <h3 className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {ev.title}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[#5c3d2e] text-sm font-semibold mb-1">{ev.title} — {['काव्य संध्या', 'पुस्तक चर्चा', 'साहित्यिक सम्मेलन'][i % 3]}</p>
                <p className="text-xs text-[#7a6250] mb-3">{ev.detail}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8B6914] font-medium">
                    {new Date(ev.date).toLocaleDateString('hi-IN')}
                  </span>
                  <span className="text-xs text-[#7a6250]">{ev.registrations} registered</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ TEAM / MEMBERS ══════════ */}
      <section className="rounded-3xl overflow-hidden reveal" style={{ background: '#f5f0e8', border: '1px solid rgba(212,196,160,0.5)' }}>
        <div className="cross-pattern py-10 px-6 md:px-12 text-center border-b border-[#d4c4a0]/50"
          style={{ background: 'rgba(237,228,213,0.3)' }}>
          <h2 className="text-3xl md:text-4xl text-[#3d2b1f] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Meet Our Team
          </h2>
          <p className="text-[#7a6250] text-sm">Dedicated individuals preserving and promoting Hindi literature</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-12">
          {state.members.map((m, i) => (
            <div key={m.id} className={`flex flex-col items-center text-center reveal delay-${(i % 4) + 1}`}>
              {/* Avatar with gold ring */}
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#8B6914] flex items-center justify-center text-3xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #e8d9b8, #c8b080)', boxShadow: '0 0 0 3px rgba(139,105,20,0.2), 0 8px 24px rgba(61,43,31,0.15)' }}>
                  {['👩‍💼', '👨‍🎓', '👩‍🎤', '👨‍💻'][i % 4]}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs"
                  style={{ background: '#8B6914' }}>✓</div>
              </div>
              <h3 className="font-semibold text-[#3d2b1f] text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{m.name}</h3>
              <p className="text-[10px] text-[#8B6914] mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>{m.name}</p>
              <p className="text-xs text-[#7a6250]">{m.role}</p>
              <span className="mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-[#d4c4a0] text-[#8B6914]"
                style={{ background: 'rgba(139,105,20,0.08)' }}>
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ FORUM PREVIEW ══════════ */}
      <section className="rounded-3xl overflow-hidden reveal" style={{ background: '#f5f0e8', border: '1px solid rgba(212,196,160,0.5)' }}>
        <div className="py-8 px-6 md:px-10 border-b border-[#d4c4a0]/50">
          <h2 className="text-2xl md:text-3xl text-[#3d2b1f]" style={{ fontFamily: 'var(--font-heading)' }}>
            चर्चा मंच
          </h2>
          <p className="text-[#7a6250] text-sm mt-1">Latest discussions from our community</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 p-6">
          {state.posts.slice(0, 3).map((post, i) => (
            <article key={post.id}
              className={`p-5 rounded-2xl border border-[#d4c4a0]/60 hover:-translate-y-1 transition-transform duration-200 reveal delay-${i + 1}`}
              style={{ background: 'rgba(255,252,245,0.7)' }}>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#d4c4a0] text-[#8B6914] mb-3"
                style={{ background: 'rgba(139,105,20,0.08)' }}>
                {state.categories.find(c => c.id === post.categoryId)?.name || 'General'}
              </span>
              <h3 className="text-sm font-semibold text-[#3d2b1f] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
              <p className="text-xs text-[#7a6250] line-clamp-2 mb-3">{post.body}</p>
              <div className="flex gap-3 text-xs text-[#8B6914]">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="rounded-3xl p-10 md:p-14 text-center reveal"
        style={{
          background: 'linear-gradient(135deg, #3d2b1f 0%, #5c3d2e 50%, #8B6914 100%)',
          boxShadow: '0 16px 48px rgba(61,43,31,0.25)'
        }}>
        <div className="text-4xl mb-4">📜</div>
        <h2 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          न्यूज़लेटर
        </h2>
        <p className="text-[#d4aa5a] text-sm mb-7">नई कविताएं, कार्यक्रम और विशेष चर्चाएं सीधे inbox में पाएं।</p>
        <div className="flex gap-3 justify-center flex-wrap max-w-md mx-auto">
          <input type="email" placeholder="आपका ईमेल पता"
            className="flex-1 min-w-48 px-4 py-3 rounded-xl text-sm text-[#3d2b1f] border-none"
            style={{ background: 'rgba(245,240,232,0.95)' }} />
          <button className="px-6 py-3 rounded-xl text-sm font-semibold text-[#3d2b1f] cursor-pointer border-none relative overflow-hidden btn-shimmer transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #d4aa5a, #b8943f)', boxShadow: '0 4px 14px rgba(184,148,63,0.45)' }}>
            Subscribe
          </button>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="rounded-3xl p-6 flex items-center justify-between flex-wrap gap-4 border border-[#d4c4a0]/50"
        style={{ background: 'rgba(237,228,213,0.4)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)' }}>📖</div>
          <div>
            <div className="text-sm font-bold text-[#3d2b1f]" style={{ fontFamily: 'var(--font-heading)' }}>HLAD</div>
            <div className="text-[10px] text-[#7a6250]">© 2026 Sahitya Sabha</div>
          </div>
        </div>
        <div className="flex gap-3 text-xs text-[#7a6250]">
          {['Instagram', 'YouTube', 'X'].map(s => (
            <a key={s} href="#" className="no-underline hover:text-[#8B6914] transition-colors">{s}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}