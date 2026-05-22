import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { FORUM_CATEGORIES } from '../constants/hlad'

const STORAGE_KEY = 'hlad-forum-state-v1'
const ADMIN_SESSION_KEY = 'hlad-forum-admin-session'
const MAX_ACTIVITY = 220
const MAX_IMAGE_BYTES = 1_200_000

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const defaultAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'hlad-literature-admin'

const ForumContext = createContext(null)

function migratePost(p) {
  if (!p || typeof p !== 'object') return null
  const category = FORUM_CATEGORIES.includes(p.category) ? p.category : 'साहित्य'
  return {
    ...p,
    category,
    image: typeof p.image === 'string' && p.image.length ? p.image : null,
    reports: Array.isArray(p.reports) ? p.reports : [],
    likes: Array.isArray(p.likes) ? p.likes : [],
    comments: Array.isArray(p.comments) ? p.comments : [],
    pinned: Boolean(p.pinned),
    hidden: Boolean(p.hidden),
  }
}

const seedPosts = [
  migratePost({
    id: 'welcome-hlad',
    title: 'साहित्यिक संवाद में आपका स्वागत है',
    body: 'यहाँ आप कविता, गद्य और भाषा पर चर्चा शुरू कर सकते हैं। सम्मानजनक संवाद बनाए रखें।',
    authorId: 'system',
    authorName: 'HLAD',
    createdAt: Date.now() - 86400000 * 2,
    likes: [],
    pinned: true,
    hidden: false,
    category: 'साहित्य',
    image: null,
    reports: [],
    comments: [
      {
        id: 'c-welcome-1',
        authorId: 'system',
        authorName: 'HLAD',
        body: 'नए सदस्य अपना परिचय इस धागे में साझा कर सकते हैं।',
        createdAt: Date.now() - 86400000,
        hidden: false,
      },
    ],
  }),
]

function normalizeState(raw) {
  if (!raw || typeof raw !== 'object') {
    return { posts: seedPosts.map((p) => migratePost(p)), userId: null, displayName: '', activityLog: [] }
  }
  const postsRaw = Array.isArray(raw.posts) ? raw.posts : seedPosts
  const posts = postsRaw.map(migratePost).filter(Boolean)
  return {
    posts: posts.length ? posts : seedPosts.map((p) => migratePost(p)),
    userId: raw.userId || null,
    displayName: typeof raw.displayName === 'string' ? raw.displayName : '',
    activityLog: Array.isArray(raw.activityLog) ? raw.activityLog : [],
  }
}

function pushActivity(setActivityLog, entry) {
  setActivityLog((prev) =>
    [{ id: uid(), createdAt: Date.now(), ...entry }, ...prev].slice(0, MAX_ACTIVITY),
  )
}

export function ForumProvider({ children }) {
  const initial = normalizeState(loadJson(STORAGE_KEY, null))
  const [posts, setPosts] = useState(initial.posts)
  const [userId, setUserId] = useState(initial.userId)
  const [displayName, setDisplayNameState] = useState(initial.displayName)
  const [activityLog, setActivityLog] = useState(initial.activityLog)
  const [adminSession, setAdminSession] = useState(() => loadJson(ADMIN_SESSION_KEY, false) === true)

  useEffect(() => {
    const state = { posts, userId, displayName, activityLog }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [posts, userId, displayName, activityLog])

  useEffect(() => {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession))
  }, [adminSession])

  const ensureUser = useCallback(() => {
    if (userId) return userId
    const id = uid()
    setUserId(id)
    return id
  }, [userId])

  const setDisplayName = useCallback((name) => {
    setDisplayNameState(name.trim())
  }, [])

  const createPost = useCallback(
    (title, body, opts = {}) => {
      const t = title.trim()
      const b = body.trim()
      if (!t || !b) return null
      const author = ensureUser()
      const category = FORUM_CATEGORIES.includes(opts.category) ? opts.category : 'साहित्य'
      const image =
        typeof opts.image === 'string' && opts.image.length && opts.image.length < MAX_IMAGE_BYTES
          ? opts.image
          : null
      const post = migratePost({
        id: uid(),
        title: t,
        body: b,
        authorId: author,
        authorName: displayName.trim() || 'अतिथि',
        createdAt: Date.now(),
        likes: [],
        pinned: false,
        hidden: false,
        category,
        image,
        reports: [],
        comments: [],
      })
      setPosts((prev) => [post, ...prev])
      pushActivity(setActivityLog, {
        type: 'post_create',
        message: `New post: ${post.title}`,
        meta: { postId: post.id, authorId: post.authorId },
      })
      return post.id
    },
    [displayName, ensureUser],
  )

  const updatePost = useCallback(
    (postId, fields) => {
      const uidLocal = userId || ensureUser()
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId || p.authorId !== uidLocal) return p
          const next = { ...p, updatedAt: Date.now() }
          if (typeof fields.title === 'string') next.title = fields.title.trim()
          if (typeof fields.body === 'string') next.body = fields.body.trim()
          if (fields.category && FORUM_CATEGORIES.includes(fields.category)) next.category = fields.category
          if (fields.image === null) next.image = null
          else if (typeof fields.image === 'string' && fields.image.length < MAX_IMAGE_BYTES) next.image = fields.image
          if (!next.title?.trim() || !next.body?.trim()) return p
          return migratePost(next)
        }),
      )
      pushActivity(setActivityLog, {
        type: 'post_edit',
        message: 'Post updated',
        meta: { postId, authorId: uidLocal },
      })
      return true
    },
    [ensureUser, userId],
  )

  const adminUpdatePost = useCallback((postId, fields) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        const next = { ...p, updatedAt: Date.now() }
        if (typeof fields.title === 'string') next.title = fields.title.trim()
        if (typeof fields.body === 'string') next.body = fields.body.trim()
        if (fields.category && FORUM_CATEGORIES.includes(fields.category)) next.category = fields.category
        if (fields.image === null) next.image = null
        else if (typeof fields.image === 'string' && fields.image.length < MAX_IMAGE_BYTES) next.image = fields.image
        return migratePost(next)
      }),
    )
    pushActivity(setActivityLog, {
      type: 'admin_post_edit',
      message: `Admin edited post ${postId}`,
      meta: { postId },
    })
  }, [])

  const deleteOwnPost = useCallback(
    (postId) => {
      const uidLocal = userId || ensureUser()
      setPosts((prev) => prev.filter((p) => !(p.id === postId && p.authorId === uidLocal)))
      pushActivity(setActivityLog, {
        type: 'post_delete_self',
        message: `Author removed their post`,
        meta: { postId, authorId: uidLocal },
      })
    },
    [ensureUser, userId],
  )

  const toggleLike = useCallback(
    (postId) => {
      const liker = ensureUser()
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p
          const has = p.likes.includes(liker)
          return {
            ...p,
            likes: has ? p.likes.filter((x) => x !== liker) : [...p.likes, liker],
          }
        }),
      )
    },
    [ensureUser],
  )

  const addComment = useCallback(
    (postId, text) => {
      const body = text.trim()
      if (!body) return null
      const author = ensureUser()
      const comment = {
        id: uid(),
        authorId: author,
        authorName: displayName.trim() || 'अतिथि',
        body,
        createdAt: Date.now(),
        hidden: false,
      }
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)),
      )
      pushActivity(setActivityLog, {
        type: 'comment_create',
        message: `Comment on post ${postId}`,
        meta: { postId, commentId: comment.id, authorId: author },
      })
      return comment.id
    },
    [displayName, ensureUser],
  )

  const adminLogin = useCallback((password) => {
    if (password === defaultAdminPassword) {
      setAdminSession(true)
      pushActivity(setActivityLog, { type: 'admin_login', message: 'Admin signed in', meta: {} })
      return true
    }
    return false
  }, [])

  const adminLogout = useCallback(() => {
    setAdminSession(false)
    localStorage.removeItem(ADMIN_SESSION_KEY)
    pushActivity(setActivityLog, { type: 'admin_logout', message: 'Admin signed out', meta: {} })
  }, [])

  const deletePost = useCallback((postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId))
    pushActivity(setActivityLog, { type: 'admin_post_delete', message: `Deleted post ${postId}`, meta: { postId } })
  }, [])

  const deleteComment = useCallback((postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) } : p,
      ),
    )
    pushActivity(setActivityLog, {
      type: 'admin_comment_delete',
      message: `Deleted comment`,
      meta: { postId, commentId },
    })
  }, [])

  const togglePinPost = useCallback((postId) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, pinned: !p.pinned } : p)))
  }, [])

  const setPostHidden = useCallback((postId, hidden) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, hidden } : p)))
  }, [])

  const setCommentHidden = useCallback((postId, commentId, hidden) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        return {
          ...p,
          comments: p.comments.map((c) => (c.id === commentId ? { ...c, hidden } : c)),
        }
      }),
    )
  }, [])

  const reportPost = useCallback(
    (postId, reason) => {
      const r = reason.trim()
      if (!r) return false
      const reporter = ensureUser()
      const report = {
        id: uid(),
        reporterId: reporter,
        reporterName: displayName.trim() || 'अतिथि',
        reason: r,
        createdAt: Date.now(),
        dismissed: false,
      }
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, reports: [...p.reports, report] } : p)),
      )
      pushActivity(setActivityLog, {
        type: 'report',
        message: `Report filed for post ${postId}`,
        meta: { postId, reportId: report.id },
      })
      return true
    },
    [displayName, ensureUser],
  )

  const dismissReport = useCallback((postId, reportId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              reports: p.reports.map((r) => (r.id === reportId ? { ...r, dismissed: true } : r)),
            }
          : p,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({
      posts,
      userId,
      displayName,
      setDisplayName,
      ensureUser,
      createPost,
      updatePost,
      adminUpdatePost,
      deleteOwnPost,
      toggleLike,
      addComment,
      adminSession,
      adminLogin,
      adminLogout,
      deletePost,
      deleteComment,
      togglePinPost,
      setPostHidden,
      setCommentHidden,
      reportPost,
      dismissReport,
      activityLog,
    }),
    [
      posts,
      userId,
      displayName,
      setDisplayName,
      ensureUser,
      createPost,
      updatePost,
      adminUpdatePost,
      deleteOwnPost,
      toggleLike,
      addComment,
      adminSession,
      adminLogin,
      adminLogout,
      deletePost,
      deleteComment,
      togglePinPost,
      setPostHidden,
      setCommentHidden,
      reportPost,
      dismissReport,
      activityLog,
    ],
  )

  return <ForumContext.Provider value={value}>{children}</ForumContext.Provider>
}

/* eslint-disable react-refresh/only-export-components -- hook paired with provider for colocation */
export function useForum() {
  const ctx = useContext(ForumContext)
  if (!ctx) throw new Error('useForum must be used within ForumProvider')
  return ctx
}
