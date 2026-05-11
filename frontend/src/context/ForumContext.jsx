import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'hlad-forum-state-v1'
const ADMIN_SESSION_KEY = 'hlad-forum-admin-session'

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

const seedPosts = [
  {
    id: 'welcome-hlad',
    title: 'साहित्यिक संवाद में आपका स्वागत है',
    body: 'यहाँ आप कविता, गद्य और भाषा पर चर्चा शुरू कर सकते हैं। सम्मानजनक संवाद बनाए रखें।',
    authorId: 'system',
    authorName: 'HLAD',
    createdAt: Date.now() - 86400000 * 2,
    likes: [],
    pinned: true,
    hidden: false,
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
  },
]

function normalizeState(raw) {
  if (!raw || typeof raw !== 'object') return { posts: seedPosts, userId: null, displayName: '' }
  return {
    posts: Array.isArray(raw.posts) ? raw.posts : seedPosts,
    userId: raw.userId || null,
    displayName: typeof raw.displayName === 'string' ? raw.displayName : '',
  }
}

export function ForumProvider({ children }) {
  const [posts, setPosts] = useState(() => normalizeState(loadJson(STORAGE_KEY, null)).posts)
  const [userId, setUserId] = useState(() => normalizeState(loadJson(STORAGE_KEY, null)).userId)
  const [displayName, setDisplayNameState] = useState(
    () => normalizeState(loadJson(STORAGE_KEY, null)).displayName,
  )
  const [adminSession, setAdminSession] = useState(() => loadJson(ADMIN_SESSION_KEY, false) === true)

  useEffect(() => {
    const state = { posts, userId, displayName }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [posts, userId, displayName])

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
    (title, body) => {
      const t = title.trim()
      const b = body.trim()
      if (!t || !b) return null
      const author = ensureUser()
      const post = {
        id: uid(),
        title: t,
        body: b,
        authorId: author,
        authorName: displayName.trim() || 'अतिथि',
        createdAt: Date.now(),
        likes: [],
        pinned: false,
        hidden: false,
        comments: [],
      }
      setPosts((prev) => [post, ...prev])
      return post.id
    },
    [displayName, ensureUser],
  )

  const updatePost = useCallback(
    (postId, title, body) => {
      const t = title.trim()
      const b = body.trim()
      if (!t || !b) return false
      const uidLocal = userId || ensureUser()
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId || p.authorId !== uidLocal) return p
          return { ...p, title: t, body: b, updatedAt: Date.now() }
        }),
      )
      return true
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
      return comment.id
    },
    [displayName, ensureUser],
  )

  const adminLogin = useCallback((password) => {
    if (password === defaultAdminPassword) {
      setAdminSession(true)
      return true
    }
    return false
  }, [])

  const adminLogout = useCallback(() => {
    setAdminSession(false)
    localStorage.removeItem(ADMIN_SESSION_KEY)
  }, [])

  const deletePost = useCallback((postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }, [])

  const deleteComment = useCallback((postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) } : p,
      ),
    )
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

  const value = useMemo(
    () => ({
      posts,
      userId,
      displayName,
      setDisplayName,
      ensureUser,
      createPost,
      updatePost,
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
    }),
    [
      posts,
      userId,
      displayName,
      setDisplayName,
      ensureUser,
      createPost,
      updatePost,
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
