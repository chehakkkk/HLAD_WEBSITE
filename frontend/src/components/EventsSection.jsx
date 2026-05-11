import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const events = [
  {
    title: 'काव्य संध्या',
    subtitle: 'Poetry Night Under the Stars',
    date: '18 Oct 2026',
    tag: 'Open mic',
    gradient: 'from-saffron-soft/40 to-saffron/30',
  },
  {
    title: 'पाण्डुलिपि संवाद',
    subtitle: 'Manuscript & Marginalia Salon',
    date: '02 Nov 2026',
    tag: 'Workshop',
    gradient: 'from-gold-soft/50 to-beige',
  },
  {
    title: 'अनुवाद लैब',
    subtitle: 'Translation Studio Intensive',
    date: '20 Nov 2026',
    tag: 'Lab',
    gradient: 'from-parchment-dark to-saffron-soft/25',
  },
]

export default function EventsSection() {
  return (
    <section id="events" className="bg-parchment py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Calendar</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">Upcoming Events</h2>
          <p className="font-body mx-auto mt-4 max-w-2xl text-charcoal-muted">
            Immersive evenings where language, music, and memory meet—crafted for readers, writers, and curious newcomers alike.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {events.map((ev, i) => (
            <ScrollReveal key={ev.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_16px_50px_rgba(42,34,28,0.08)] backdrop-blur-md"
              >
                <div className={`h-36 bg-gradient-to-br ${ev.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-30 mix-blend-multiply cross-pattern" />
                  <span className="font-body absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-saffron shadow-sm">
                    {ev.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-hindi text-xl font-semibold text-charcoal">{ev.title}</h3>
                  <p className="font-display mt-1 text-sm italic text-charcoal-muted">{ev.subtitle}</p>
                  <p className="font-body mt-4 text-xs font-semibold uppercase tracking-widest text-saffron">{ev.date}</p>
                  <motion.a
                    href="#events"
                    className="font-body mt-6 inline-flex items-center text-sm font-semibold text-charcoal no-underline group-hover:text-saffron"
                    whileHover={{ x: 4 }}
                  >
                    Reserve seat →
                  </motion.a>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
