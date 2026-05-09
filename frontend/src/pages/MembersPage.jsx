import { useState } from 'react'

const members = [
  { name: 'श्रेयसी मिश्रा', role: 'Member of the Month', badge: 'काव्य रत्न' },
  { name: 'आयुष श्रीवास्तव', role: 'Community Mentor', badge: 'कथा शिल्पी' },
  { name: 'रीमा गुप्ता', role: 'Open Mic Host', badge: 'स्वर साधक' },
  { name: 'विवेक त्रिपाठी', role: 'Research Contributor', badge: 'साहित्य शोधक' },
]

function MembersPage() {
  const [memberIndex, setMemberIndex] = useState(0)

  return (
    <section className="surface">
      <div className="section-head">
        <h2>Members Showcase</h2>
        <p>Interactive profiles, badges and achievements.</p>
      </div>
      <div className="split-grid">
        <article className="member-card">
          <h3>{members[memberIndex].name}</h3>
          <p>{members[memberIndex].role}</p>
          <span>{members[memberIndex].badge}</span>
          <div className="inline-actions">
            <button type="button" onClick={() => setMemberIndex((value) => (value - 1 + members.length) % members.length)}>
              Prev
            </button>
            <button type="button" onClick={() => setMemberIndex((value) => (value + 1) % members.length)}>
              Next
            </button>
          </div>
        </article>
        <div className="card-grid">
          {members.map((member) => (
            <article key={member.name} className="info-card">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MembersPage
