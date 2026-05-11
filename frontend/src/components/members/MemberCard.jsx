import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function initials(name) {
  const parts = name.trim().split(/\s+/)
  const a = parts[0]?.[0] || ''
  const b = parts[1]?.[0] || parts[0]?.[1] || ''
  return (a + b).toUpperCase()
}

export default function MemberCard({ member, index, onEdit, isAdmin }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.article
      layout
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/75 shadow-[0_16px_50px_rgba(42,34,28,0.08)] backdrop-blur-xl transition-shadow hover:shadow-[0_22px_60px_rgba(224,120,44,0.12)] ${
        member.featured ? 'border-saffron/45 ring-1 ring-saffron/25' : 'border-white/70'
      }`}
    >
      {member.featured && (
        <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-saffron to-saffron-deep px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
          Featured
        </div>
      )}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-beige to-parchment-dark">
        {member.image ? (
          <img src={member.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-saffron/25 via-white/40 to-gold-soft/30">
            <span className="font-display text-4xl font-bold text-saffron-deep">{initials(member.name)}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-white/85">{member.role}</p>
          <h2 className="font-hindi text-xl font-bold text-white md:text-2xl">{member.name}</h2>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-body text-[11px] font-bold uppercase tracking-wider text-saffron">{member.category}</p>
        <p className="font-hindi mt-3 flex-1 text-sm leading-relaxed text-charcoal-muted">{member.bio}</p>
        {member.interests?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {member.interests.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-hindi rounded-full border border-saffron/20 bg-saffron/8 px-2.5 py-0.5 text-[11px] font-medium text-saffron-deep"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-charcoal/8 pt-4 text-xs">
          {member.social?.email && (
            <a href={`mailto:${member.social.email}`} className="font-body font-semibold text-charcoal hover:text-saffron">
              Email
            </a>
          )}
          {member.social?.instagram && (
            <span className="font-body text-charcoal-muted">{member.social.instagram}</span>
          )}
          {member.social?.twitter && (
            <span className="font-body text-charcoal-muted">{member.social.twitter}</span>
          )}
        </div>
        {isAdmin && (
          <button
            type="button"
            onClick={() => onEdit?.(member)}
            className="font-body mt-4 w-full rounded-xl border border-charcoal/12 bg-white/90 py-2 text-xs font-semibold text-charcoal transition-colors hover:border-saffron hover:text-saffron"
          >
            Edit in roster
          </button>
        )}
      </div>
    </motion.article>
  )
}
