import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-parchment-dark to-beige/60 py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] translate-x-1/4 rounded-full bg-saffron/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <ScrollReveal>
          <div className="relative flex min-h-[280px] items-center justify-center rounded-3xl border border-white/60 bg-gradient-to-br from-parchment to-parchment-dark p-8 shadow-[0_24px_80px_rgba(42,34,28,0.08)]">
            <svg viewBox="0 0 400 320" className="w-full max-w-md opacity-90" aria-hidden>
              <defs>
                <linearGradient id="ink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a221c" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#e0782c" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="42%"
                textAnchor="middle"
                className="font-hindi"
                style={{ fontSize: 72, fill: 'url(#ink)', fontFamily: 'Noto Serif Devanagari, serif' }}
              >
                साहित्य
              </text>
              <path
                d="M40 260 Q200 200 360 260"
                stroke="#c9a227"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
              />
              <path d="M60 80 L340 80" stroke="#2a221c" strokeOpacity="0.08" strokeWidth="1" />
              <path d="M60 240 L340 240" stroke="#2a221c" strokeOpacity="0.08" strokeWidth="1" />
            </svg>
            <motion.div
              className="absolute bottom-6 left-6 rounded-xl border border-white/70 bg-white/80 px-4 py-2 font-hindi text-sm font-semibold text-saffron shadow-lg backdrop-blur-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              रचना • संस्कृति • समुदाय
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">About HLAD</p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
              Our Heritage
            </h2>
            <p className="font-body mt-6 text-base leading-relaxed text-charcoal-muted md:text-lg">
              Founded in 2010, HLAD has been a beacon for Hindi literature on campus—curating workshops, open mics,
              manuscript circles, and digital archives that honour classical voices while welcoming contemporary
              expression.
            </p>
            <p className="font-hindi mt-5 text-lg leading-relaxed text-charcoal">
              हिंदी साहित्य की सृजनात्मक परंपरा को आधुनिक दृष्टि से जोड़ना हमारा उद्देश्य है।
            </p>
            <ul className="font-body mt-8 space-y-3 text-sm text-charcoal-muted">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                Scholar-led reading circles &amp; translation labs
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Archival projects &amp; oral-history interviews
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-saffron-deep" />
                Cross-disciplinary arts collaborations
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
