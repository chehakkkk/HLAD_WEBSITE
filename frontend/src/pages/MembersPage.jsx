import { useMemo, useState } from 'react'
import { useClub } from '../context/useClub'

function MembersPage() {
  const { state, auth, addMember, updateMember, deleteMember } = useClub()
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({ name: '', role: '', badge: '', bio: '' })
  const [editingId, setEditingId] = useState('')

  const filteredMembers = useMemo(
    () =>
      state.members.filter((member) =>
        `${member.name} ${member.role} ${member.badge}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [state.members, query],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return
    if (editingId) {
      updateMember(editingId, form)
      setEditingId('')
    } else {
      addMember(form)
    }
    setForm({ name: '', role: '', badge: '', bio: '' })
  }

  const beginEdit = (member) => {
    setEditingId(member.id)
    setForm({ name: member.name, role: member.role, badge: member.badge, bio: member.bio })
  }

  return (
    <section className="surface">
      <div className="section-head">
        <h2>Members Showcase</h2>
        <p>Searchable member directory, profiles and achievements.</p>
      </div>
      <input
        className="search-input"
        type="search"
        placeholder="Search members..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className="card-grid">
        {filteredMembers.map((member) => (
          <article key={member.id} className="info-card">
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <span className="chip">{member.badge}</span>
            <p>{member.bio}</p>
            {auth.role === 'admin' && (
              <div className="inline-actions">
                <button type="button" onClick={() => beginEdit(member)}>Edit</button>
                <button type="button" onClick={() => deleteMember(member.id)}>Delete</button>
              </div>
            )}
          </article>
        ))}
      </div>

      {auth.role === 'admin' && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Update Member' : 'Add Member'}</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              type="text"
              placeholder="Role"
              value={form.role}
              onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
            />
            <input
              type="text"
              placeholder="Badge"
              value={form.badge}
              onChange={(event) => setForm((prev) => ({ ...prev, badge: event.target.value }))}
            />
            <input
              type="text"
              placeholder="Bio"
              value={form.bio}
              onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
            />
          </div>
          <div className="inline-actions">
            <button className="btn btn-primary" type="submit">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId('')
                  setForm({ name: '', role: '', badge: '', bio: '' })
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  )
}

export default MembersPage
