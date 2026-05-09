import { useState } from 'react'

const threads = [
  { title: 'आज की पसंदीदा कविता पंक्ति?', tag: 'Poetry Jam', comments: 82, reactions: 214 },
  { title: 'प्रेमचंद की कहानियों का सामाजिक प्रभाव', tag: 'Book Talk', comments: 56, reactions: 167 },
  { title: 'मुक्त छंद vs छंदबद्ध: आपकी राय?', tag: 'Writing Lab', comments: 39, reactions: 122 },
]

function ForumPage() {
  const [liked, setLiked] = useState({})

  return (
    <section className="surface">
      <div className="section-head">
        <h2>Discussion Forum</h2>
        <p>Modern thread cards with interactive reactions.</p>
      </div>
      <div className="card-grid">
        {threads.map((thread) => (
          <article key={thread.title} className="forum-card">
            <span className="chip">{thread.tag}</span>
            <h3>{thread.title}</h3>
            <div className="forum-meta">
              <span>💬 {thread.comments}</span>
              <button
                type="button"
                className={`reaction-btn ${liked[thread.title] ? 'active' : ''}`}
                onClick={() =>
                  setLiked((prev) => ({
                    ...prev,
                    [thread.title]: !prev[thread.title],
                  }))
                }
              >
                ❤️ {thread.reactions + (liked[thread.title] ? 1 : 0)}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ForumPage
