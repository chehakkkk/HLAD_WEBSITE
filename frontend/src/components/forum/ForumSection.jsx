import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForum } from '../../context/ForumContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function formatDate(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ts))
  } catch {
    return ''
  }
}

export default function ForumSection() {
  const reduced = usePrefersReducedMotion()
  const {
    posts,
    userId,
    displayName,
    setDisplayName,
    createPost,
    updatePost,
    toggleLike,
    addComment,
    adminSession,
    setPostHidden,
    setCommentHidden,
    deletePost,
    deleteComment,
    togglePinPost,
  } = useForum()

  const [nameDraft, setNameDraft] = useState(displayName)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [commentDrafts, setCommentDrafts] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  const sortedPosts = useMemo(() => {
    const list = adminSession ? posts : posts.filter((p) => !p.hidden)
    return [...list].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.createdAt - a.createdAt
    })
  }, [posts, adminSession])

  const saveDisplayName = () => {
    setDisplayName(nameDraft)
  }

  const submitPost = (e) => {
    e.preventDefault()
    if (!displayName.trim()) return
    createPost(title, body)
    setTitle('')
    setBody('')
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setEditTitle(p.title)
    setEditBody(p.body)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    if (!editingId) return
    updatePost(editingId, editTitle, editBody)
    setEditingId(null)
  }

  const submitComment = (postId) => {
    const text = commentDrafts[postId] || ''
    if (!displayName.trim()) return
    addComment(postId, text)
    setCommentDrafts((d) => ({ ...d, [postId]: '' }))
  }

  return (
    <section
      id="forum"
      className="relative scroll-mt-28 overflow-hidden border-t border-charcoal/10 bg-gradient-to-b from-parchment-dark via-parchment to-parchment py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 cross-pattern opacity-40" />
      <div className="pointer-events-none absolute -left-1/3 top-1/4 h-96 w-96 rounded-full bg-saffron-soft/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-80 w-80 rounded-full bg-gold-soft/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <span className="font-body inline-block rounded-full border border-saffron/25 bg-white/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-saffron shadow-sm backdrop-blur-md">
            संवाद · Discussion
          </span>
          <h2 className="font-hindi mt-4 text-3xl font-bold text-charcoal md:text-4xl">साहित्यिक मंच</h2>
          <p className="font-display mx-auto mt-3 max-w-xl text-base text-charcoal-muted md:text-lg">
            Share reflections, respond to peers, and celebrate Hindi literature together.
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 rounded-2xl border border-white/70 bg-white/65 p-5 shadow-[0_16px_50px_rgba(42,34,28,0.08)] backdrop-blur-xl md:p-6"
        >
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
            Your display name
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end">
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              className="font-hindi flex-1 rounded-xl border border-charcoal/15 bg-white/90 px-4 py-3 text-base outline-none ring-saffron/30 transition-shadow focus:ring-2"
              placeholder="जैसे: अनामिका"
              maxLength={48}
            />
            <motion.button
              type="button"
              whileTap={reduced ? undefined : { scale: 0.98 }}
              onClick={saveDisplayName}
              className="font-body shrink-0 rounded-xl bg-charcoal px-5 py-3 text-sm font-semibold text-parchment shadow-md transition-colors hover:bg-charcoal/90"
            >
              Save name
            </motion.button>
          </div>
          {!displayName.trim() && (
            <p className="font-body mt-2 text-sm text-saffron-deep">Please set a display name before posting.</p>
          )}
        </motion.div>

        <motion.form
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={submitPost}
          className="mb-12 rounded-2xl border border-saffron/20 bg-white/75 p-5 shadow-[0_20px_60px_rgba(224,120,44,0.12)] backdrop-blur-xl md:p-7"
        >
          <h3 className="font-display text-lg font-bold text-charcoal">Start a discussion</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-body mt-4 w-full rounded-xl border border-charcoal/12 bg-white/95 px-4 py-3 text-sm font-medium outline-none ring-saffron/25 focus:ring-2"
            placeholder="Title"
            maxLength={120}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="font-hindi mt-3 w-full resize-y rounded-xl border border-charcoal/12 bg-white/95 px-4 py-3 text-base leading-relaxed outline-none ring-saffron/25 focus:ring-2"
            placeholder="अपनी बात लिखें…"
          />
          <div className="mt-4 flex justify-end">
            <motion.button
              type="submit"
              disabled={!displayName.trim() || !title.trim() || !body.trim()}
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              className="font-body rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-saffron/30 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Publish post
            </motion.button>
          </div>
        </motion.form>

        <div className="space-y-5">
          <AnimatePresence initial={false}>
            {sortedPosts.map((post, index) => {
              const isOwner = userId && post.authorId === userId
              const liked = userId && post.likes.includes(userId)
              const visibleComments = adminSession
                ? post.comments
                : post.comments.filter((c) => !c.hidden)

              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className={`overflow-hidden rounded-2xl border bg-white/80 shadow-[0_12px_40px_rgba(42,34,28,0.06)] backdrop-blur-xl ${
                    post.pinned ? 'border-saffron/45 ring-1 ring-saffron/20' : 'border-white/70'
                  } ${post.hidden && adminSession ? 'ring-1 ring-charcoal/15' : ''}`}
                >
                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          {post.pinned && (
                            <span className="rounded-full bg-saffron/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-saffron-deep">
                              Pinned
                            </span>
                          )}
                          {post.hidden && adminSession && (
                            <span className="rounded-full bg-charcoal/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted">
                              Hidden from public
                            </span>
                          )}
                        </div>
                        {editingId === post.id ? (
                          <form onSubmit={saveEdit} className="mt-3 space-y-3">
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full rounded-xl border border-charcoal/15 px-3 py-2 text-sm font-semibold"
                            />
                            <textarea
                              value={editBody}
                              onChange={(e) => setEditBody(e.target.value)}
                              rows={4}
                              className="font-hindi w-full rounded-xl border border-charcoal/15 px-3 py-2 text-sm leading-relaxed"
                            />
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="rounded-lg bg-saffron px-4 py-2 text-xs font-semibold text-white"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="rounded-lg border border-charcoal/15 px-4 py-2 text-xs font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <h3 className="font-display mt-2 text-xl font-bold text-charcoal md:text-2xl">{post.title}</h3>
                            <p className="font-hindi mt-3 whitespace-pre-wrap text-base leading-relaxed text-charcoal-muted">
                              {post.body}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-charcoal/8 pt-4 text-sm text-charcoal-muted">
                      <span className="font-hindi font-semibold text-saffron">{post.authorName}</span>
                      <span>·</span>
                      <span>{formatDate(post.updatedAt || post.createdAt)}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <motion.button
                        type="button"
                        whileTap={reduced ? undefined : { scale: 0.95 }}
                        onClick={() => toggleLike(post.id)}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                          liked
                            ? 'border-saffron/40 bg-saffron/10 text-saffron-deep'
                            : 'border-charcoal/10 bg-white/80 text-charcoal hover:border-saffron/30'
                        }`}
                      >
                        <span aria-hidden>♥</span>
                        {post.likes.length}
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={reduced ? undefined : { scale: 0.97 }}
                        onClick={() => setExpandedId((id) => (id === post.id ? null : post.id))}
                        className="rounded-xl border border-charcoal/10 bg-white/80 px-4 py-2 text-sm font-semibold text-charcoal hover:border-saffron/30"
                      >
                        {expandedId === post.id ? 'Hide replies' : `Comments (${visibleComments.length})`}
                      </motion.button>
                      {isOwner && post.authorId !== 'system' && editingId !== post.id && (
                        <button
                          type="button"
                          onClick={() => startEdit(post)}
                          className="rounded-xl border border-charcoal/10 px-4 py-2 text-sm font-semibold text-charcoal hover:border-saffron/30"
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {adminSession && (
                      <div className="mt-4 flex flex-wrap gap-2 rounded-xl border border-charcoal/10 bg-beige/50 p-3">
                        <span className="w-full text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                          Admin
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePinPost(post.id)}
                          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-charcoal/10"
                        >
                          {post.pinned ? 'Unpin' : 'Pin'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostHidden(post.id, !post.hidden)}
                          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-charcoal/10"
                        >
                          {post.hidden ? 'Show post' : 'Hide post'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Delete this post and all comments?')) deletePost(post.id)
                          }}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-200"
                        >
                          Delete post
                        </button>
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {expandedId === post.id && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-charcoal/8 bg-parchment/60"
                      >
                        <div className="space-y-3 p-5 md:p-6">
                          {visibleComments.map((c) => (
                            <div
                              key={c.id}
                              className={`rounded-xl border px-4 py-3 ${
                                c.hidden && adminSession ? 'border-dashed border-charcoal/25 bg-white/60' : 'border-white/80 bg-white/85'
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-hindi text-sm font-semibold text-saffron">{c.authorName}</span>
                                <span className="text-xs text-charcoal-muted">{formatDate(c.createdAt)}</span>
                              </div>
                              <p className="font-hindi mt-2 text-sm leading-relaxed text-charcoal">{c.body}</p>
                              {c.hidden && adminSession && (
                                <p className="mt-1 text-[10px] font-semibold uppercase text-charcoal-muted">Hidden</p>
                              )}
                              {adminSession && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setCommentHidden(post.id, c.id, !c.hidden)}
                                    className="rounded-md bg-beige px-2 py-1 text-[11px] font-semibold"
                                  >
                                    {c.hidden ? 'Show comment' : 'Hide comment'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteComment(post.id, c.id)}
                                    className="rounded-md bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}

                          <div className="rounded-xl border border-charcoal/10 bg-white/90 p-4">
                            <textarea
                              value={commentDrafts[post.id] || ''}
                              onChange={(e) => setCommentDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                              rows={3}
                              className="font-hindi w-full resize-y rounded-lg border border-charcoal/10 bg-white px-3 py-2 text-sm outline-none ring-saffron/20 focus:ring-2"
                              placeholder="अपनी प्रतिक्रिया…"
                            />
                            <div className="mt-3 flex justify-end">
                              <motion.button
                                type="button"
                                disabled={!displayName.trim() || !(commentDrafts[post.id] || '').trim()}
                                whileTap={reduced ? undefined : { scale: 0.97 }}
                                onClick={() => submitComment(post.id)}
                                className="rounded-lg bg-charcoal px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
                              >
                                Add comment
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
