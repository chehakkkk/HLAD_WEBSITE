import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ForumDecor from '../components/forum/ForumDecor'
import { useForum } from '../context/ForumContext'
import { FORUM_CATEGORIES } from '../constants/hlad'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function formatDate(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ts))
  } catch {
    return ''
  }
}

function scorePost(p) {
  return p.likes.length + p.comments.filter((c) => !c.hidden).length * 2
}

function readImageFile(file, maxBytes) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      resolve(null)
      return
    }
    if (file.size > maxBytes) {
      reject(new Error('Image is too large. Please choose a file under 1 MB.'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null)
    reader.onerror = () => reject(new Error('Could not read image.'))
    reader.readAsDataURL(file)
  })
}

export default function ForumPage() {
  const reduced = usePrefersReducedMotion()
  const {
    posts,
    userId,
    displayName,
    setDisplayName,
    createPost,
    updatePost,
    deleteOwnPost,
    toggleLike,
    addComment,
    adminSession,
    setPostHidden,
    setCommentHidden,
    deletePost,
    deleteComment,
    togglePinPost,
    reportPost,
  } = useForum()

  const [nameDraft, setNameDraft] = useState(displayName)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [newCategory, setNewCategory] = useState('साहित्य')
  const [imageData, setImageData] = useState(null)
  const [imageErr, setImageErr] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [commentDrafts, setCommentDrafts] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [editCategory, setEditCategory] = useState('साहित्य')
  const [editImage, setEditImage] = useState(null)
  const [reportOpen, setReportOpen] = useState(null)
  const [reportText, setReportText] = useState('')

  const visiblePosts = useMemo(() => {
    const list = adminSession ? posts : posts.filter((p) => !p.hidden)
    const qq = q.trim().toLowerCase()
    return list.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false
      if (!qq) return true
      return (
        p.title.toLowerCase().includes(qq) ||
        p.body.toLowerCase().includes(qq) ||
        p.authorName.toLowerCase().includes(qq)
      )
    })
  }, [posts, adminSession, q, cat])

  const sortedMain = useMemo(() => {
    return [...visiblePosts].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.createdAt - a.createdAt
    })
  }, [visiblePosts])

  const trending = useMemo(() => {
    const list = adminSession ? posts : posts.filter((p) => !p.hidden)
    return [...list].sort((a, b) => scorePost(b) - scorePost(a)).slice(0, 5)
  }, [posts, adminSession])

  const saveDisplayName = () => setDisplayName(nameDraft)

  const onPickImage = async (e) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    setImageErr('')
    try {
      const data = await readImageFile(f, 1_000_000)
      setImageData(data)
    } catch (err) {
      setImageErr(err.message || 'Upload failed')
    }
  }

  const submitPost = (e) => {
    e.preventDefault()
    if (!displayName.trim()) return
    createPost(title, body, { category: newCategory, image: imageData })
    setTitle('')
    setBody('')
    setImageData(null)
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setEditTitle(p.title)
    setEditBody(p.body)
    setEditCategory(p.category || 'साहित्य')
    setEditImage(p.image || null)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    if (!editingId) return
    updatePost(editingId, { title: editTitle, body: editBody, category: editCategory, image: editImage })
    setEditingId(null)
  }

  const submitComment = (postId) => {
    const text = commentDrafts[postId] || ''
    if (!displayName.trim()) return
    addComment(postId, text)
    setCommentDrafts((d) => ({ ...d, [postId]: '' }))
  }

  const submitReport = (postId) => {
    if (!reportText.trim()) return
    reportPost(postId, reportText)
    setReportOpen(null)
    setReportText('')
  }

  return (
    <div className="relative min-h-[100svh] scroll-mt-28 bg-gradient-to-b from-parchment via-parchment to-parchment-dark pb-24 pt-28 md:pt-32">
      <ForumDecor />

      <div className="relative z-10 mx-auto max-w-6xl gap-10 px-4 md:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <Link
              to="/"
              className="font-body text-sm font-semibold text-charcoal-muted underline-offset-4 hover:text-saffron hover:underline"
            >
              ← Back to home
            </Link>
            <div className="mt-6 rounded-3xl border border-white/60 bg-white/55 p-8 shadow-[0_24px_80px_rgba(42,34,28,0.1)] backdrop-blur-2xl md:p-10">
              <span className="font-body inline-block rounded-full border border-saffron/25 bg-white/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-saffron">
                साहित्यिक मंच · Forum
              </span>
              <h1 className="font-hindi mt-4 text-4xl font-bold text-charcoal md:text-5xl">संवाद स्थल</h1>
              <p className="font-display mt-3 max-w-2xl text-lg text-charcoal-muted">
                A modern space for Hindi literary dialogue — categories, imagery, and gentle motion in the HLAD voice.
              </p>
            </div>
          </motion.div>

          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/65 bg-white/60 p-5 shadow-lg backdrop-blur-xl md:flex-row md:items-end">
            <div className="min-w-0 flex-1">
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                Display name
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  className="font-hindi w-full rounded-xl border border-charcoal/12 bg-white/95 px-4 py-2.5 text-sm outline-none ring-saffron/25 focus:ring-2"
                  placeholder="आपका नाम"
                  maxLength={48}
                />
                <motion.button
                  type="button"
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  onClick={saveDisplayName}
                  className="font-body shrink-0 rounded-xl bg-charcoal px-4 py-2.5 text-xs font-semibold text-parchment"
                >
                  Save
                </motion.button>
              </div>
              {!displayName.trim() && (
                <p className="mt-2 text-xs font-medium text-saffron-deep">Set your name to post or comment.</p>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 md:max-w-sm">
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                Search
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="rounded-xl border border-charcoal/12 bg-white/95 px-4 py-2.5 text-sm outline-none ring-saffron/20 focus:ring-2"
                placeholder="Search posts…"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <motion.button
              key="all"
              type="button"
              whileTap={reduced ? undefined : { scale: 0.97 }}
              onClick={() => setCat('all')}
              className={`rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-md transition-colors ${
                cat === 'all'
                  ? 'border-saffron/50 bg-saffron/15 text-saffron-deep'
                  : 'border-white/50 bg-white/45 text-charcoal hover:border-saffron/35'
              }`}
            >
              सभी · All
            </motion.button>
            {FORUM_CATEGORIES.map((c) => (
              <motion.button
                key={c}
                type="button"
                whileTap={reduced ? undefined : { scale: 0.97 }}
                onClick={() => setCat(c)}
                className={`font-hindi rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-md transition-colors ${
                  cat === c
                    ? 'border-saffron/50 bg-saffron/15 text-saffron-deep'
                    : 'border-white/50 bg-white/45 text-charcoal hover:border-saffron/35'
                }`}
              >
                {c}
              </motion.button>
            ))}
          </div>

          <motion.form
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={submitPost}
            className="mb-12 rounded-2xl border border-saffron/25 bg-white/70 p-6 shadow-[0_20px_70px_rgba(224,120,44,0.14)] backdrop-blur-xl md:p-8"
          >
            <h2 className="font-display text-xl font-bold text-charcoal">Compose</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase text-charcoal-muted">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="font-hindi mt-2 w-full rounded-xl border border-charcoal/12 bg-white px-3 py-2.5 text-sm outline-none ring-saffron/20 focus:ring-2"
                >
                  {FORUM_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-charcoal-muted">Cover image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPickImage}
                  className="mt-2 block w-full text-xs text-charcoal-muted file:mr-3 file:rounded-lg file:border-0 file:bg-saffron/15 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-saffron-deep"
                />
                {imageErr && <p className="mt-1 text-xs text-red-600">{imageErr}</p>}
              </div>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-body mt-4 w-full rounded-xl border border-charcoal/12 bg-white px-4 py-3 text-sm font-semibold outline-none ring-saffron/20 focus:ring-2"
              placeholder="Title"
              maxLength={140}
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="font-hindi mt-3 w-full rounded-xl border border-charcoal/12 bg-white px-4 py-3 text-base leading-relaxed outline-none ring-saffron/25 focus:ring-2 [&::placeholder]:font-body"
              placeholder="Write in Hindi or English…"
            />
            {imageData && (
              <div className="relative mt-4 overflow-hidden rounded-xl border border-charcoal/10">
                <img src={imageData} alt="" className="max-h-64 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageData(null)}
                  className="absolute right-2 top-2 rounded-lg bg-charcoal/80 px-2 py-1 text-xs font-semibold text-white"
                >
                  Remove image
                </button>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <motion.button
                type="submit"
                disabled={!displayName.trim() || !title.trim() || !body.trim()}
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className="rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-saffron/35 disabled:opacity-40"
              >
                Publish
              </motion.button>
            </div>
          </motion.form>

          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {sortedMain.map((post, index) => {
                const isOwner = userId && post.authorId === userId
                const liked = userId && post.likes.includes(userId)
                const visibleComments = adminSession
                  ? post.comments
                  : post.comments.filter((c) => !c.hidden)

                return (
                  <motion.article
                    id={`post-${post.id}`}
                    key={post.id}
                    layout
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, delay: index * 0.02, ease: [0.16, 1, 0.3, 1] }}
                    className={`overflow-hidden rounded-2xl border bg-white/78 shadow-[0_16px_50px_rgba(42,34,28,0.08)] backdrop-blur-xl ${
                      post.pinned ? 'border-saffron/45 ring-1 ring-saffron/25' : 'border-white/70'
                    }`}
                  >
                    {post.image && (
                      <div className="relative max-h-72 w-full overflow-hidden border-b border-white/50">
                        <img src={post.image} alt="" className="h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/25 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        {post.pinned && (
                          <span className="rounded-full bg-saffron/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-saffron-deep">
                            Pinned
                          </span>
                        )}
                        <span className="font-hindi rounded-full border border-saffron/20 bg-saffron/8 px-3 py-0.5 text-[11px] font-semibold text-saffron-deep">
                          {post.category}
                        </span>
                        {post.hidden && adminSession && (
                          <span className="rounded-full bg-charcoal/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-charcoal-muted">
                            Hidden
                          </span>
                        )}
                      </div>

                      {editingId === post.id ? (
                        <form onSubmit={saveEdit} className="mt-4 space-y-3">
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="font-hindi w-full rounded-xl border border-charcoal/12 bg-white px-3 py-2 text-sm"
                          >
                            {FORUM_CATEGORIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm font-semibold"
                          />
                          <textarea
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            rows={5}
                            className="font-hindi w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm leading-relaxed"
                          />
                          {editImage && (
                            <img src={editImage} alt="" className="max-h-40 rounded-lg border object-cover" />
                          )}
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="submit"
                              className="rounded-lg bg-saffron px-4 py-2 text-xs font-semibold text-white"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditImage(null)}
                              className="rounded-lg border border-charcoal/15 px-4 py-2 text-xs font-semibold"
                            >
                              Remove image
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
                          <h2 className="font-display mt-3 text-2xl font-bold text-charcoal md:text-[1.65rem]">
                            {post.title}
                          </h2>
                          <p className="font-hindi mt-3 whitespace-pre-wrap text-base leading-relaxed text-charcoal md:text-[1.05rem]">
                            {post.body}
                          </p>
                        </>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-charcoal/8 pt-4 text-sm text-charcoal-muted">
                        <span className="font-hindi font-semibold text-saffron">{post.authorName}</span>
                        <span>·</span>
                        <span>{formatDate(post.updatedAt || post.createdAt)}</span>
                        <span>·</span>
                        <span>
                          {post.likes.length} likes · {visibleComments.length} comments
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <motion.button
                          type="button"
                          whileTap={reduced ? undefined : { scale: 0.96 }}
                          onClick={() => toggleLike(post.id)}
                          className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                            liked
                              ? 'border-saffron/45 bg-saffron/12 text-saffron-deep'
                              : 'border-charcoal/10 bg-white text-charcoal hover:border-saffron/35'
                          }`}
                        >
                          ♥ {post.likes.length}
                        </motion.button>
                        <motion.button
                          type="button"
                          whileTap={reduced ? undefined : { scale: 0.97 }}
                          onClick={() => setExpandedId((id) => (id === post.id ? null : post.id))}
                          className="rounded-xl border border-charcoal/10 bg-white px-4 py-2 text-sm font-semibold text-charcoal hover:border-saffron/35"
                        >
                          {expandedId === post.id ? 'Hide thread' : 'Open thread'}
                        </motion.button>
                        {isOwner && post.authorId !== 'system' && editingId !== post.id && (
                          <>
                            <button
                              type="button"
                              onClick={() => startEdit(post)}
                              className="rounded-xl border border-charcoal/10 px-4 py-2 text-sm font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('Delete your post permanently?')) deleteOwnPost(post.id)
                              }}
                              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        {!adminSession && (
                          <button
                            type="button"
                            onClick={() => {
                              setReportOpen(post.id)
                              setReportText('')
                            }}
                            className="rounded-xl border border-charcoal/10 px-4 py-2 text-sm font-semibold text-charcoal-muted hover:border-saffron/35"
                          >
                            Report
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
                            {post.hidden ? 'Show' : 'Hide'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Delete post?')) deletePost(post.id)
                            }}
                            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-100"
                          >
                            Delete
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
                          className="border-t border-charcoal/8 bg-gradient-to-b from-parchment/80 to-white/60"
                        >
                          <div className="space-y-3 p-6">
                            {visibleComments.map((c) => (
                              <div
                                key={c.id}
                                className={`rounded-xl border px-4 py-3 ${
                                  c.hidden && adminSession ? 'border-dashed border-charcoal/25 bg-white/70' : 'border-white/80 bg-white/90'
                                }`}
                              >
                                <div className="flex flex-wrap justify-between gap-2">
                                  <span className="font-hindi text-sm font-semibold text-saffron">{c.authorName}</span>
                                  <span className="text-xs text-charcoal-muted">{formatDate(c.createdAt)}</span>
                                </div>
                                <p className="font-hindi mt-2 text-sm leading-relaxed text-charcoal">{c.body}</p>
                                {adminSession && (
                                  <div className="mt-2 flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setCommentHidden(post.id, c.id, !c.hidden)}
                                      className="rounded-md bg-beige px-2 py-1 text-[11px] font-semibold"
                                    >
                                      {c.hidden ? 'Show' : 'Hide'}
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
                            <div className="rounded-xl border border-charcoal/10 bg-white/95 p-4">
                              <textarea
                                value={commentDrafts[post.id] || ''}
                                onChange={(e) => setCommentDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                                rows={3}
                                className="font-hindi w-full rounded-lg border border-charcoal/10 px-3 py-2 text-sm outline-none ring-saffron/20 focus:ring-2"
                                placeholder="प्रतिक्रिया लिखें…"
                              />
                              <div className="mt-3 flex justify-end">
                                <motion.button
                                  type="button"
                                  disabled={!displayName.trim() || !(commentDrafts[post.id] || '').trim()}
                                  whileTap={reduced ? undefined : { scale: 0.97 }}
                                  onClick={() => submitComment(post.id)}
                                  className="rounded-lg bg-charcoal px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
                                >
                                  Comment
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

        <aside className="mt-12 space-y-6 lg:sticky lg:top-28 lg:mt-0">
          <div className="rounded-2xl border border-white/65 bg-white/70 p-5 shadow-lg backdrop-blur-xl">
            <h3 className="font-display text-lg font-bold text-charcoal">Trending</h3>
            <p className="font-body mt-1 text-xs text-charcoal-muted">By engagement (likes + discussion)</p>
            <ul className="mt-4 space-y-3">
              {trending.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedId(p.id)
                      document.getElementById(`post-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="w-full rounded-xl border border-transparent bg-white/60 px-3 py-2 text-left transition-colors hover:border-saffron/30"
                  >
                    <span className="text-[10px] font-bold text-saffron">#{i + 1}</span>
                    <span className="font-hindi mt-1 line-clamp-2 block text-sm font-semibold text-charcoal">{p.title}</span>
                    <span className="text-[11px] text-charcoal-muted">
                      {p.category} · {scorePost(p)} pts
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {reportOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/40 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReportOpen(null)}
          >
            <motion.div
              initial={reduced ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: 16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md rounded-2xl border border-white/60 bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-bold text-charcoal">Report content</h3>
              <p className="font-body mt-2 text-sm text-charcoal-muted">
                Moderators review every report. Please describe what feels inappropriate.
              </p>
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows={4}
                className="font-body mt-4 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm outline-none ring-saffron/25 focus:ring-2"
                placeholder="Reason…"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportOpen(null)}
                  className="rounded-lg border border-charcoal/15 px-4 py-2 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => submitReport(reportOpen)}
                  className="rounded-lg bg-saffron px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                  disabled={!reportText.trim()}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
