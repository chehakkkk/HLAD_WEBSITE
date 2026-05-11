import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const team = [
  { name: 'Ananya Sharma', role: 'President', hi: 'अध्यक्ष', initials: 'AS' },
  { name: 'Rohan Mehta', role: 'Literary Curator', hi: 'साहित्य संयोजक', initials: 'RM' },
  { name: 'Priya Nambiar', role: 'Events Lead', hi: 'कार्यक्रम प्रमुख', initials: 'PN' },
  { name: 'Kabir Joshi', role: 'Archivist', hi: 'संग्रहाध्यक्ष', initials: 'KJ' },
]

export default function TeamSection() {
  return (
    <section id="team" className="bg-gradient-to-b from-beige/50 to-parchment py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">People</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">Meet the Team</h2>
          <p className="font-body mx-auto mt-4 max-w-2xl text-charcoal-muted">
            A circle of editors, poets, designers, and archivists stewarding HLAD&apos;s voice with care and craft.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center rounded-3xl border border-white/70 bg-white/75 p-6 text-center shadow-[0_14px_44px_rgba(42,34,28,0.07)] backdrop-blur-md"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron/15 to-gold-soft/30 font-display text-lg font-bold text-saffron-deep ring-2 ring-saffron/20">
                  {m.initials}
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-charcoal">{m.name}</h3>
                <p className="font-body mt-1 text-sm text-charcoal-muted">{m.role}</p>
                <p className="font-hindi mt-1 text-xs text-saffron">{m.hi}</p>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
