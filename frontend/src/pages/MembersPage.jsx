import { useMemo, useState } from 'react'
import { useClub } from '../context/useClub'

export default function MembersPage() {
  const { state, auth, addMember, updateMember, deleteMember } = useClub()
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({ name:'', role:'', badge:'', bio:'' })
  const [editingId, setEditingId] = useState('')

  const filtered = useMemo(() =>
    state.members.filter(m => `${m.name} ${m.role} ${m.badge}`.toLowerCase().includes(query.toLowerCase()))
  , [state.members, query])

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim()) return
    editingId ? updateMember(editingId, form) : addMember(form)
    setEditingId('')
    setForm({ name:'', role:'', badge:'', bio:'' })
  }

  return (
    <div className="px-3 md:px-6 py-4 space-y-5">

      {/* Header */}
      <section className="rounded-3xl p-8 md:p-12 text-center cross-pattern"
        style={{ background: 'linear-gradient(160deg, #f5f0e8 0%, #ede4cc 100%)', border: '1px solid rgba(212,196,160,0.5)' }}>
        <h1 className="text-3xl md:text-5xl text-[#3d2b1f] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Meet Our Team
        </h1>
        <p className="text-[#7a6250] mb-6">Dedicated individuals preserving and promoting Hindi literature</p>
        <div className="max-w-sm mx-auto">
          <input type="search" placeholder="Search members..." value={query}
            onChange={e => setQuery(e.target.value)}
            className="ui-input" />
        </div>
      </section>

      {/* Member grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
        {filtered.map((m, i) => (
          <div key={m.id} className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#8B6914] flex items-center justify-center text-4xl overflow-hidden transition-transform group-hover:scale-105 duration-200"
                style={{ background: 'linear-gradient(135deg, #e8d9b8, #c8b080)', boxShadow: '0 0 0 3px rgba(139,105,20,0.2), 0 8px 24px rgba(61,43,31,0.15)' }}>
                {['👩‍💼','👨‍🎓','👩‍🎤','👨‍💻'][i % 4]}
              </div>
            </div>
            <h3 className="font-semibold text-[#3d2b1f] text-sm mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>{m.name}</h3>
            <p className="text-xs text-[#8B6914] mb-0.5 font-medium">{m.role}</p>
            <p className="text-xs text-[#7a6250] mb-2 line-clamp-2">{m.bio}</p>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-[#d4c4a0] text-[#8B6914]"
              style={{ background: 'rgba(139,105,20,0.08)' }}>{m.badge}</span>
            {auth.role === 'admin' && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setEditingId(m.id); setForm({name:m.name,role:m.role,badge:m.badge,bio:m.bio}) }}
                  className="ui-btn ui-btn--secondary !px-3 !py-2 !text-xs">Edit</button>
                <button onClick={() => deleteMember(m.id)}
                  className="ui-btn ui-btn--danger !px-3 !py-2 !text-xs">Del</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Admin form */}
      {auth.role === 'admin' && (
        <div className="rounded-3xl p-6 md:p-8 border border-[#d4c4a0]/60" style={{ background: 'rgba(255,252,245,0.8)' }}>
          <h3 className="text-lg font-semibold text-[#3d2b1f] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {editingId ? 'Update Member' : 'Add Member'}
          </h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
            {[['name','Name'],['role','Role'],['badge','Badge'],['bio','Bio']].map(([k,ph]) => (
              <input key={k} placeholder={ph} value={form[k]}
                onChange={e => setForm(p => ({...p,[k]:e.target.value}))}
                className="ui-input" />
            ))}
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit"
                className="ui-btn ui-btn--primary flex-1">
                {editingId ? 'Update' : 'Add Member'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(''); setForm({name:'',role:'',badge:'',bio:''}) }}
                  className="ui-btn ui-btn--secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  )
}