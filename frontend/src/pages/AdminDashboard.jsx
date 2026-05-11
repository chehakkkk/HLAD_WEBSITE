import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForum } from '../context/ForumContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function formatDate(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ts))
  } catch {
    return ''
  }
}

export default function AdminDashboard() {
  const reduced = usePrefersReducedMotion()
  const {
    adminSession,
    adminLogout,
    posts,
    deletePost,
    deleteComment,
    togglePinPost,
    setPostHidden,
    setCommentHidden,
  } = useForum()

  const stats = useMemo(() => {
    const comments = posts.reduce((n, p) => n + p.comments.length, 0)
    const hiddenPosts = posts.filter((p) => p.hidden).length
    const hiddenComments = posts.reduce((n, p) => n + p.comments.filter((c) => c.hidden).length, 0)
    return { comments, hiddenPosts, hiddenComments, pinned: posts.filter((p) => p.pinned).length }
  }, [posts])

  if (!adminSession) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-parchment via-parchment to-parchment-dark pb-16 pt-8">
      <div className="pointer-events-none fixed inset-0 cross-pattern opacity-25" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col gap-4 border-b border-charcoal/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">Administration</p>
            <h1 className="font-display text-3xl font-bold text-charcoal">Moderation desk</h1>
            <p className="font-body mt-1 text-sm text-charcoal-muted">
              Manage discussions, visibility, and pinned highlights across the forum.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/#forum"
              className="font-body rounded-xl border border-charcoal/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-charcoal shadow-sm backdrop-blur-sm hover:border-saffron/40"
            >
              View forum
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Posts', value: posts.length },
            { label: 'Comments', value: stats.comments },
            { label: 'Pinned', value: stats.pinned },
            { label: 'Hidden items', value: stats.hiddenPosts + stats.hiddenComments },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">{card.label}</p>
              <p className="font-display mt-1 text-2xl font-bold text-charcoal">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-4">
          <h2 className="font-display text-xl font-bold text-charcoal">All posts</h2>
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
      </div>
    </div>
  )
}
