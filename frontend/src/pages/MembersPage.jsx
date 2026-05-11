import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MembersHero from '../components/members/MembersHero'
import MemberCard from '../components/members/MemberCard'
import MemberEditorModal from '../components/members/MemberEditorModal'
import { MEMBER_CATEGORIES } from '../constants/hlad'
import { useMembers } from '../context/MembersContext'
import { useForum } from '../context/ForumContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function MembersPage() {
  const reduced = usePrefersReducedMotion()
  const { members, addMember, updateMember, removeMember, setFeatured } = useMembers()
  const { adminSession } = useForum()

  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [modal, setModal] = useState({ open: false, mode: 'add', member: null })

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return members.filter((m) => {
      if (cat !== 'all' && m.category !== cat) return false
      if (!qq) return true
      const blob = [m.name, m.role, m.bio, ...(m.interests || [])].join(' ').toLowerCase()
      return blob.includes(qq)
    })
  }, [members, q, cat])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return a.name.localeCompare(b.name, 'hi')
    })
  }, [filtered])

  const openAdd = () => setModal({ open: true, mode: 'add', member: null })
  const openEdit = (member) => setModal({ open: true, mode: 'edit', member })
  const closeModal = () => setModal((m) => ({ ...m, open: false }))

  const handleSave = (payload) => {
    if (modal.mode === 'edit' && modal.member) {
      updateMember(modal.member.id, payload)
    } else {
      addMember(payload)
    }
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-parchment to-parchment-dark pb-24">
      <MembersHero />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-saffron-soft/20 blur-3xl" />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 -mt-10 rounded-3xl border border-white/65 bg-white/70 p-6 shadow-[0_24px_80px_rgba(42,34,28,0.1)] backdrop-blur-xl md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-bold text-charcoal">Member directory</h2>
              <p className="font-body mt-1 text-sm text-charcoal-muted">Search by name, role, interests, or bio.</p>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="mt-4 w-full rounded-xl border border-charcoal/12 bg-white/95 px-4 py-3 text-sm outline-none ring-saffron/25 focus:ring-2 md:max-w-md"
              />
            </div>
            {adminSession && (
              <motion.button
                type="button"
                whileTap={reduced ? undefined : { scale: 0.98 }}
                onClick={openAdd}
                className="shrink-0 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-saffron/30"
              >
                Add member
              </motion.button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <motion.button
              type="button"
              whileTap={reduced ? undefined : { scale: 0.97 }}
              onClick={() => setCat('all')}
              className={`rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-md ${
                cat === 'all' ? 'border-saffron/45 bg-saffron/12 text-saffron-deep' : 'border-white/55 bg-white/50 text-charcoal'
              }`}
            >
              All
            </motion.button>
            {MEMBER_CATEGORIES.map((c) => (
              <motion.button
                key={c}
                type="button"
                whileTap={reduced ? undefined : { scale: 0.97 }}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-md ${
                  cat === c ? 'border-saffron/45 bg-saffron/12 text-saffron-deep' : 'border-white/55 bg-white/50 text-charcoal'
                }`}
              >
                {c}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((m, index) => (
            <div key={m.id} className="relative">
              <MemberCard member={m} index={index} isAdmin={adminSession} onEdit={openEdit} />
              {adminSession && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFeatured(m.id, !m.featured)}
                    className="rounded-lg bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10"
                  >
                    {m.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Remove ${m.name} from the directory?`)) removeMember(m.id)
                    }}
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-700 ring-1 ring-red-100"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {sorted.length === 0 && (
          <p className="font-body relative z-10 mt-12 text-center text-charcoal-muted">No members match your filters.</p>
        )}

        <div className="relative z-10 mt-16 text-center">
          <Link to="/" className="font-body text-sm font-semibold text-saffron underline-offset-4 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>

      {modal.open && (
        <MemberEditorModal
          key={`${modal.mode}-${modal.member?.id || 'new'}`}
          mode={modal.mode}
          member={modal.member}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
