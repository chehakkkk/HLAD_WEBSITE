import { useMemo, useState } from 'react'
import { useClub } from '../context/useClub'

export default function ForumPage() {
  const { state, auth, addPost, likePost, addComment, addReply, deleteComment, deletePost, addCategory, updateCategory, deleteCategory, togglePinPost } = useClub()
  const [query, setQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [postForm, setPostForm] = useState({ title:'', body:'', categoryId:'' })
  const [commentText, setCommentText] = useState({})
  const [replyText, setReplyText] = useState({})
  const [catText, setCatText] = useState('')
  const [editingCat, setEditingCat] = useState('')

  const posts = useMemo(() =>
    state.posts.filter(p => {
      const match = `${p.title} ${p.body}`.toLowerCase().includes(query.toLowerCase())
      const cat = selectedCat ? p.categoryId === selectedCat : true
      return match && cat
    }).sort((a,b) => Number(b.pinned) - Number(a.pinned))
  , [state.posts, query, selectedCat])

  return (
    <div className="px-3 md:px-6 py-4 space-y-5">

      {/* Header */}
      <section className="rounded-3xl p-8 cross-pattern"
        style={{ background: 'linear-gradient(160deg, #f5f0e8 0%, #ede4cc 100%)', border: '1px solid rgba(212,196,160,0.5)' }}>
        <h1 className="text-3xl text-[#3d2b1f] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>चर्चा मंच</h1>
        <p className="text-[#7a6250] text-sm mb-5">Discussion Forum — create posts, comments and explore categories</p>
        <div className="flex gap-3 flex-wrap">
          <input type="search" placeholder="Search discussions..." value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 min-w-48 px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70" />
          <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70">
            <option value="">All categories</option>
            {state.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </section>

      {/* Create post */}
      <div className="rounded-3xl p-6 border border-[#d4c4a0]/60" style={{ background: 'rgba(255,252,245,0.8)' }}>
        <h3 className="text-base font-semibold text-[#3d2b1f] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Create Discussion
        </h3>
        <form onSubmit={e => { e.preventDefault(); if (!postForm.title.trim()||!postForm.categoryId) return; addPost(postForm); setPostForm({title:'',body:'',categoryId:''}) }}
          className="grid sm:grid-cols-3 gap-3">
          <input placeholder="Post title" value={postForm.title}
            onChange={e => setPostForm(p => ({...p,title:e.target.value}))}
            className="px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70" />
          <select value={postForm.categoryId} onChange={e => setPostForm(p => ({...p,categoryId:e.target.value}))}
            className="px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70">
            <option value="">Choose category</option>
            {state.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input placeholder="Post content" value={postForm.body}
            onChange={e => setPostForm(p => ({...p,body:e.target.value}))}
            className="px-4 py-2.5 rounded-xl border border-[#d4c4a0] text-sm text-[#3d2b1f] bg-white/70" />
          <button type="submit"
            className="sm:col-span-3 py-2.5 rounded-xl text-white font-semibold text-sm cursor-pointer border-none"
            style={{ background: 'linear-gradient(135deg, #8B6914, #5c3d2e)' }}>
            Publish
          </button>
        </form>
      </div>

      {/* Posts */}
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map(post => (
          <article key={post.id} className="rounded-2xl p-5 border border-[#d4c4a0]/60 hover:-translate-y-0.5 transition-transform duration-200"
            style={{ background: 'rgba(255,252,245,0.8)' }}>
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs border border-[#d4c4a0] text-[#8B6914]"
                style={{ background: 'rgba(139,105,20,0.08)' }}>
                {state.categories.find(c => c.id === post.categoryId)?.name || 'General'}
              </span>
              {post.pinned && <span className="px-2.5 py-0.5 rounded-full text-xs border border-[#b8943f]/40 text-[#8B6914] bg-[#8B6914]/10">📌 Pinned</span>}
            </div>
            <h3 className="font-semibold text-[#3d2b1f] mb-2 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
            <p className="text-xs text-[#7a6250] mb-3">{post.body}</p>
            <div className="flex gap-3 text-xs mb-4">
              <button onClick={() => likePost(post.id)}
                className="text-[#8B6914] cursor-pointer border-none bg-transparent hover:scale-110 transition-transform">
                ❤️ {post.likes}
              </button>
              <span className="text-[#7a6250]">💬 {post.comments.length}</span>
              {auth.role === 'admin' && (
                <>
                  <button onClick={() => togglePinPost(post.id)} className="text-[#7a6250] cursor-pointer border-none bg-transparent hover:text-[#8B6914] text-xs">Pin</button>
                  <button onClick={() => deletePost(post.id)} className="text-red-400 cursor-pointer border-none bg-transparent text-xs">Delete</button>
                </>
              )}
            </div>
            {/* Comments */}
            <div className="space-y-2">
              {post.comments.map(cm => (
                <div key={cm.id} className="rounded-xl p-3 text-xs border border-[#d4c4a0]/40"
                  style={{ background: 'rgba(237,228,213,0.4)' }}>
                  <strong className="text-[#3d2b1f]">{cm.author}</strong>
                  <p className="text-[#5c3d2e] mt-0.5">{cm.text}</p>
                  {cm.replies.map(r => (
                    <p key={r.id} className="text-[#7a6250] mt-1 pl-3 border-l-2 border-[#8B6914]/30">↳ {r.author}: {r.text}</p>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <input placeholder="Reply..." value={replyText[cm.id]||''}
                      onChange={e => setReplyText(p => ({...p,[cm.id]:e.target.value}))}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[#d4c4a0] text-xs bg-white/70 text-[#3d2b1f]" />
                    <button onClick={() => { if (!replyText[cm.id]) return; addReply(post.id,cm.id,'Member',replyText[cm.id]); setReplyText(p => ({...p,[cm.id]:''})) }}
                      className="px-3 py-1.5 rounded-lg text-xs text-white cursor-pointer border-none"
                      style={{ background: '#8B6914' }}>Reply</button>
                    {auth.role === 'admin' && (
                      <button onClick={() => deleteComment(post.id,cm.id)} className="px-2 py-1.5 rounded-lg text-xs text-red-400 border border-red-200 cursor-pointer bg-transparent">✕</button>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <input placeholder="Write a comment..." value={commentText[post.id]||''}
                  onChange={e => setCommentText(p => ({...p,[post.id]:e.target.value}))}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#d4c4a0] text-xs bg-white/70 text-[#3d2b1f]" />
                <button onClick={() => { if (!commentText[post.id]) return; addComment(post.id,'Member',commentText[post.id]); setCommentText(p => ({...p,[post.id]:''})) }}
                  className="px-4 py-2 rounded-xl text-xs text-white cursor-pointer border-none"
                  style={{ background: '#8B6914' }}>Comment</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}