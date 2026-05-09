import { createContext, useEffect, useMemo, useState } from 'react'

export const ClubContext = createContext(null)

const seedData = {
  members: [
    { id: 'm1', name: 'श्रेयसी मिश्रा', role: 'Member of the Month', badge: 'काव्य रत्न', bio: 'आधुनिक कविता और संपादन में सक्रिय।' },
    { id: 'm2', name: 'आयुष श्रीवास्तव', role: 'Community Mentor', badge: 'कथा शिल्पी', bio: 'कहानी लेखन और चर्चा सत्र का संचालन।' },
    { id: 'm3', name: 'रीमा गुप्ता', role: 'Open Mic Host', badge: 'स्वर साधक', bio: 'कविता पाठ और मंच संचालन।' },
  ],
  categories: [
    { id: 'c1', name: 'Poetry Jam' },
    { id: 'c2', name: 'Book Talk' },
    { id: 'c3', name: 'Writing Lab' },
  ],
  posts: [
    {
      id: 'p1',
      title: 'आज की पसंदीदा कविता पंक्ति?',
      body: 'अपनी प्रिय पंक्ति साझा करें और बताएं क्यों।',
      categoryId: 'c1',
      likes: 24,
      pinned: false,
      comments: [
        {
          id: 'cm1',
          author: 'आयुष',
          text: 'निराला की पंक्तियां आज भी बहुत प्रासंगिक लगती हैं।',
          replies: [{ id: 'rp1', author: 'रीमा', text: 'सहमत, भाषा और भाव दोनों अद्भुत।' }],
        },
      ],
    },
  ],
  events: [
    { id: 'e1', title: 'काव्य संध्या', date: '2026-06-18T18:00:00', detail: 'Open mic poetry evening.', registrations: 18 },
    { id: 'e2', title: 'कहानी गोष्ठी', date: '2026-06-25T17:30:00', detail: 'Short story round table.', registrations: 11 },
  ],
  gallery: [
    { id: 'g1', title: 'Poetry Night Memories', type: 'image' },
    { id: 'g2', title: 'Author Conversation Highlights', type: 'blog' },
  ],
}

const storageKey = 'sahitya-sabha-state'
const authKey = 'sahitya-sabha-auth'

function nextId(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

export function ClubProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = window.localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : seedData
  })
  const [auth, setAuth] = useState(() => {
    const saved = window.localStorage.getItem(authKey)
    return saved ? JSON.parse(saved) : { isAuthenticated: false, role: 'guest', username: '' }
  })

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    window.localStorage.setItem(authKey, JSON.stringify(auth))
  }, [auth])

  const actions = useMemo(
    () => ({
      login: (username, password) => {
        if (username === 'admin' && password === 'admin123') {
          setAuth({ isAuthenticated: true, role: 'admin', username })
          return { ok: true }
        }
        return { ok: false, message: 'Invalid credentials' }
      },
      logout: () => setAuth({ isAuthenticated: false, role: 'guest', username: '' }),

      addMember: (payload) =>
        setState((prev) => ({
          ...prev,
          members: [{ id: nextId('m'), ...payload }, ...prev.members],
        })),
      updateMember: (id, payload) =>
        setState((prev) => ({
          ...prev,
          members: prev.members.map((member) => (member.id === id ? { ...member, ...payload } : member)),
        })),
      deleteMember: (id) =>
        setState((prev) => ({
          ...prev,
          members: prev.members.filter((member) => member.id !== id),
        })),

      addCategory: (name) =>
        setState((prev) => ({
          ...prev,
          categories: [{ id: nextId('c'), name }, ...prev.categories],
        })),
      updateCategory: (id, name) =>
        setState((prev) => ({
          ...prev,
          categories: prev.categories.map((category) => (category.id === id ? { ...category, name } : category)),
        })),
      deleteCategory: (id) =>
        setState((prev) => ({
          ...prev,
          categories: prev.categories.filter((category) => category.id !== id),
        })),

      addPost: (payload) =>
        setState((prev) => ({
          ...prev,
          posts: [{ id: nextId('p'), likes: 0, pinned: false, comments: [], ...payload }, ...prev.posts],
        })),
      likePost: (id) =>
        setState((prev) => ({
          ...prev,
          posts: prev.posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)),
        })),
      togglePinPost: (id) =>
        setState((prev) => ({
          ...prev,
          posts: prev.posts.map((post) => (post.id === id ? { ...post, pinned: !post.pinned } : post)),
        })),
      deletePost: (id) =>
        setState((prev) => ({
          ...prev,
          posts: prev.posts.filter((post) => post.id !== id),
        })),
      addComment: (postId, author, text) =>
        setState((prev) => ({
          ...prev,
          posts: prev.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [...post.comments, { id: nextId('cm'), author, text, replies: [] }],
                }
              : post,
          ),
        })),
      addReply: (postId, commentId, author, text) =>
        setState((prev) => ({
          ...prev,
          posts: prev.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment.id === commentId
                      ? {
                          ...comment,
                          replies: [...comment.replies, { id: nextId('rp'), author, text }],
                        }
                      : comment,
                  ),
                }
              : post,
          ),
        })),
      deleteComment: (postId, commentId) =>
        setState((prev) => ({
          ...prev,
          posts: prev.posts.map((post) =>
            post.id === postId
              ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
              : post,
          ),
        })),

      addEvent: (payload) =>
        setState((prev) => ({
          ...prev,
          events: [{ id: nextId('e'), registrations: 0, ...payload }, ...prev.events],
        })),
      updateEvent: (id, payload) =>
        setState((prev) => ({
          ...prev,
          events: prev.events.map((event) => (event.id === id ? { ...event, ...payload } : event)),
        })),
      deleteEvent: (id) =>
        setState((prev) => ({
          ...prev,
          events: prev.events.filter((event) => event.id !== id),
        })),
      registerEvent: (id) =>
        setState((prev) => ({
          ...prev,
          events: prev.events.map((event) =>
            event.id === id ? { ...event, registrations: event.registrations + 1 } : event,
          ),
        })),

      addGalleryItem: (payload) =>
        setState((prev) => ({
          ...prev,
          gallery: [{ id: nextId('g'), ...payload }, ...prev.gallery],
        })),
      updateGalleryItem: (id, payload) =>
        setState((prev) => ({
          ...prev,
          gallery: prev.gallery.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        })),
      deleteGalleryItem: (id) =>
        setState((prev) => ({
          ...prev,
          gallery: prev.gallery.filter((item) => item.id !== id),
        })),
    }),
    [],
  )

  return <ClubContext.Provider value={{ state, auth, ...actions }}>{children}</ClubContext.Provider>
}
