import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FORUM_CATEGORIES } from '../constants/hlad'
import { useForum } from '../context/ForumContext'
import { useMembers } from '../context/MembersContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function formatDate(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ts))
  } catch {
    return ''
  }
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'forum', label: 'Forum' },
  { id: 'reports', label: 'Reports' },
  { id: 'members', label: 'Members' },
  { id: 'activity', label: 'Activity' },
]

export default function AdminDashboard() {
  const reduced = usePrefersReducedMotion()
  const [tab, setTab] = useState('overview')
  const [editPost, setEditPost] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [editCategory, setEditCategory] = useState('साहित्य')

  const {
    adminSession,
    adminLogout,
    posts,
    deletePost,
    deleteComment,
    togglePinPost,
    setPostHidden,
    setCommentHidden,
    adminUpdatePost,
    dismissReport,
    activityLog,
  } = useForum()

  const { members } = useMembers()

  const stats = useMemo(() => {
    const comments = posts.reduce((n, p) => n + p.comments.length, 0)
    const hiddenPosts = posts.filter((p) => p.hidden).length
    const hiddenComments = posts.reduce((n, p) => n + p.comments.filter((c) => c.hidden).length, 0)
    const reportsOpen = posts.reduce(
      (n, p) => n + p.reports.filter((r) => !r.dismissed).length,
      0,
    )
    return { comments, hiddenPosts, hiddenComments, pinned: posts.filter((p) => p.pinned).length, reportsOpen }
  }, [posts])

  const reportRows = useMemo(() => {
    const rows = []
    posts.forEach((p) => {
      p.reports
        .filter((r) => !r.dismissed)
        .forEach((r) => {
          rows.push({ post: p, report: r })
        })
    })
    return rows.sort((a, b) => b.report.createdAt - a.report.createdAt)
  }, [posts])

  if (!adminSession) {
    return <Navigate to="/admin/login" replace />
  }

  const openEditPost = (p) => {
    setEditPost(p)
    setEditTitle(p.title)
    setEditBody(p.body)
    setEditCategory(p.category || 'साहित्य')
  }

  const saveEditPost = (e) => {
    e.preventDefault()
    if (!editPost) return
    if (!editTitle.trim() || !editBody.trim()) return
    adminUpdatePost(editPost.id, { title: editTitle.trim(), body: editBody.trim(), category: editCategory })
    setEditPost(null)
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-parchment via-parchment to-parchment-dark pb-20 pt-8">
      <div className="pointer-events-none fixed inset-0 cross-pattern opacity-25" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 border-b border-charcoal/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">Administration</p>
            <h1 className="font-display text-3xl font-bold text-charcoal">HLAD control center</h1>
            <p className="font-body mt-1 text-sm text-charcoal-muted">
              Forum moderation, reports, roster highlights, and community activity in one calm workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/forum"
              className="font-body rounded-xl border border-charcoal/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-charcoal shadow-sm backdrop-blur-sm hover:border-saffron/40"
            >
              Live forum
            </Link>
            <Link
              to="/members"
              className="font-body rounded-xl border border-charcoal/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-charcoal shadow-sm backdrop-blur-sm hover:border-saffron/40"
            >
              Members page
            </Link>
            <motion.button
              type="button"
              whileTap={reduced ? undefined : { scale: 0.98 }}
              onClick={adminLogout}
              className="font-body rounded-xl bg-charcoal px-4 py-2.5 text-sm font-semibold text-parchment shadow-md"
            >
              Log out
            </motion.button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-charcoal/8 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                tab === t.id ? 'bg-saffron text-white shadow-md shadow-saffron/30' : 'bg-white/70 text-charcoal hover:bg-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Posts', value: posts.length },
              { label: 'Comments', value: stats.comments },
              { label: 'Pinned', value: stats.pinned },
              { label: 'Hidden', value: stats.hiddenPosts + stats.hiddenComments },
              { label: 'Open reports', value: stats.reportsOpen },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">{c.label}</p>
                <p className="font-display mt-1 text-2xl font-bold text-charcoal">{c.value}</p>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-5 rounded-2xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Directory</p>
              <p className="font-display mt-1 text-2xl font-bold text-charcoal">{members.length} members</p>
              <p className="font-body mt-2 text-sm text-charcoal-muted">
                Featured profiles: {members.filter((m) => m.featured).length}. Manage roster on the Members page while
                signed in.
              </p>
            </div>
          </div>
        )}

        {tab === 'forum' && (
          <div className="mt-8 space-y-4">
            <h2 className="font-display text-xl font-bold text-charcoal">All posts &amp; threads</h2>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_12px_40px_rgba(42,34,28,0.06)] backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {post.pinned && (
                        <span className="rounded-full bg-saffron/15 px-2 py-0.5 text-[10px] font-bold uppercase text-saffron-deep">
                          Pinned
                        </span>
                      )}
                      {post.hidden && (
                        <span className="rounded-full bg-charcoal/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-charcoal-muted">
                          Hidden
                        </span>
                      )}
                      <span className="font-hindi rounded-full border border-saffron/20 bg-saffron/8 px-2 py-0.5 text-[10px] font-semibold text-saffron-deep">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-display mt-2 text-lg font-bold text-charcoal">{post.title}</h3>
                    <p className="font-hindi mt-2 line-clamp-3 text-sm text-charcoal-muted">{post.body}</p>
                    <p className="font-body mt-2 text-xs text-charcoal-muted">
                      {post.authorName} · {formatDate(post.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => openEditPost(post)}
                      className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-charcoal/10"
                    >
                      Edit content
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePinPost(post.id)}
                      className="rounded-lg bg-beige px-3 py-1.5 text-xs font-semibold"
                    >
                      {post.pinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostHidden(post.id, !post.hidden)}
                      className="rounded-lg bg-beige px-3 py-1.5 text-xs font-semibold"
                    >
                      {post.hidden ? 'Show' : 'Hide'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Delete this post and every comment?')) deletePost(post.id)
                      }}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {post.comments.length > 0 && (
                  <div className="mt-4 border-t border-charcoal/8 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Comments</p>
                    <ul className="mt-2 space-y-2">
                      {post.comments.map((c) => (
                        <li
                          key={c.id}
                          className="flex flex-col gap-2 rounded-xl border border-charcoal/8 bg-parchment/50 p-3 md:flex-row md:items-center md:justify-between"
                        >
                          <div>
                            <p className="font-hindi text-sm font-semibold text-saffron">{c.authorName}</p>
                            <p className="font-hindi text-sm text-charcoal">{c.body}</p>
                            <p className="text-[11px] text-charcoal-muted">{formatDate(c.createdAt)}</p>
                            {c.hidden && <p className="text-[10px] font-semibold uppercase text-charcoal-muted">Hidden</p>}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setCommentHidden(post.id, c.id, !c.hidden)}
                              className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-charcoal/10"
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
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'reports' && (
          <div className="mt-8 space-y-4">
            <h2 className="font-display text-xl font-bold text-charcoal">Reported content</h2>
            {reportRows.length === 0 && (
              <p className="rounded-2xl border border-white/60 bg-white/70 p-6 text-sm text-charcoal-muted backdrop-blur-md">
                No open reports. When community members flag a post, it will appear here for review.
              </p>
            )}
            {reportRows.map(({ post, report }) => (
              <div
                key={report.id}
                className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-md backdrop-blur-xl"
              >
                <p className="font-hindi text-lg font-bold text-charcoal">{post.title}</p>
                <p className="font-body mt-2 text-sm text-charcoal-muted">
                  Reported by {report.reporterName} · {formatDate(report.createdAt)}
                </p>
                <p className="font-body mt-3 rounded-xl border border-charcoal/10 bg-parchment/60 p-3 text-sm text-charcoal">
                  {report.reason}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => dismissReport(post.id, report.id)}
                    className="rounded-lg bg-beige px-3 py-2 text-xs font-semibold"
                  >
                    Dismiss report
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostHidden(post.id, true)}
                    className="rounded-lg bg-charcoal/90 px-3 py-2 text-xs font-semibold text-white"
                  >
                    Hide post
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this post entirely?')) deletePost(post.id)
                    }}
                    className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
                  >
                    Delete post
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'members' && (
          <div className="mt-8 rounded-2xl border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-md">
            <h2 className="font-display text-xl font-bold text-charcoal">Member roster</h2>
            <p className="font-body mt-2 text-sm text-charcoal-muted">
              Add, edit, feature, or remove members directly on the public directory — your admin session carries over.
            </p>
            <Link
              to="/members"
              className="font-body mt-6 inline-flex rounded-xl bg-gradient-to-r from-saffron to-saffron-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-saffron/30"
            >
              Open members page
            </Link>
            <ul className="mt-8 divide-y divide-charcoal/10">
              {members.map((m) => (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div>
                    <p className="font-hindi font-semibold text-charcoal">{m.name}</p>
                    <p className="text-xs text-charcoal-muted">
                      {m.role} · {m.category}
                      {m.featured ? ' · Featured' : ''}
                    </p>
                  </div>
                  <Link to="/members" className="text-xs font-semibold text-saffron hover:underline">
                    Manage →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'activity' && (
          <div className="mt-8 rounded-2xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-md">
            <h2 className="font-display text-xl font-bold text-charcoal">Recent activity</h2>
            <p className="font-body mt-1 text-sm text-charcoal-muted">Latest actions across forum and admin tools (this browser).</p>
            <ul className="mt-4 max-h-[480px] space-y-2 overflow-y-auto">
              {activityLog.length === 0 && <li className="text-sm text-charcoal-muted">No activity yet.</li>}
              {activityLog.map((a) => (
                <li key={a.id} className="rounded-xl border border-charcoal/8 bg-parchment/40 px-3 py-2 text-sm">
                  <span className="font-semibold text-charcoal">{a.type}</span>
                  <span className="text-charcoal-muted"> — {a.message}</span>
                  <span className="mt-1 block text-[11px] text-charcoal-muted">{formatDate(a.createdAt)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <AnimatePresence>
        {editPost && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditPost(null)}
          >
            <motion.form
              initial={reduced ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduced ? undefined : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={saveEditPost}
              className="w-full max-w-lg rounded-2xl border border-white/60 bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-bold text-charcoal">Edit post (admin)</h3>
              <label className="mt-4 block text-xs font-semibold uppercase text-charcoal-muted">
                Category
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="font-hindi mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
                >
                  {FORUM_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-3 block text-xs font-semibold uppercase text-charcoal-muted">
                Title
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm font-semibold"
                />
              </label>
              <label className="mt-3 block text-xs font-semibold uppercase text-charcoal-muted">
                Body
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  rows={6}
                  className="font-hindi mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm leading-relaxed"
                />
              </label>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setEditPost(null)} className="rounded-lg border px-4 py-2 text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-saffron px-4 py-2 text-sm font-semibold text-white">
                  Save
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
