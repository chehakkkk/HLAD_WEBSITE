import { useMemo, useState } from 'react'
import { useClub } from '../context/useClub'

function ForumPage() {
  const {
    state,
    auth,
    addPost,
    likePost,
    addComment,
    addReply,
    deleteComment,
    deletePost,
    addCategory,
    updateCategory,
    deleteCategory,
    togglePinPost,
  } = useClub()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [postForm, setPostForm] = useState({ title: '', body: '', categoryId: '' })
  const [commentText, setCommentText] = useState({})
  const [replyText, setReplyText] = useState({})
  const [categoryText, setCategoryText] = useState('')
  const [editingCategory, setEditingCategory] = useState('')

  const visiblePosts = useMemo(
    () =>
      state.posts
        .filter((post) => {
          const matchesSearch = `${post.title} ${post.body}`.toLowerCase().includes(query.toLowerCase())
          const matchesCategory = selectedCategory ? post.categoryId === selectedCategory : true
          return matchesSearch && matchesCategory
        })
        .sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    [state.posts, query, selectedCategory],
  )

  const handleCreatePost = (event) => {
    event.preventDefault()
    if (!postForm.title.trim() || !postForm.categoryId) return
    addPost(postForm)
    setPostForm({ title: '', body: '', categoryId: '' })
  }

  const handleCategorySubmit = () => {
    if (!categoryText.trim()) return
    if (editingCategory) {
      updateCategory(editingCategory, categoryText)
      setEditingCategory('')
    } else {
      addCategory(categoryText)
    }
    setCategoryText('')
  }

  return (
    <section className="surface">
      <div className="section-head">
        <h2>Discussion Forum</h2>
        <p>Create posts, comments, replies and browse categories.</p>
      </div>
      <div className="forum-tools">
        <input
          className="search-input"
          type="search"
          placeholder="Search discussions..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="">All categories</option>
          {state.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <form className="admin-form" onSubmit={handleCreatePost}>
        <h3>Create Discussion</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Post title"
            value={postForm.title}
            onChange={(event) => setPostForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <select
            value={postForm.categoryId}
            onChange={(event) => setPostForm((prev) => ({ ...prev, categoryId: event.target.value }))}
          >
            <option value="">Choose category</option>
            {state.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Post content"
            value={postForm.body}
            onChange={(event) => setPostForm((prev) => ({ ...prev, body: event.target.value }))}
          />
        </div>
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>

      {auth.role === 'admin' && (
        <div className="admin-form">
          <h3>Manage Categories</h3>
          <div className="inline-actions">
            <input
              type="text"
              placeholder="Category name"
              value={categoryText}
              onChange={(event) => setCategoryText(event.target.value)}
            />
            <button type="button" onClick={handleCategorySubmit}>
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
          <div className="inline-actions">
            {state.categories.map((category) => (
              <span key={category.id} className="chip">
                {category.name}
                <button type="button" onClick={() => { setEditingCategory(category.id); setCategoryText(category.name) }}>Edit</button>
                <button type="button" onClick={() => deleteCategory(category.id)}>Delete</button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card-grid">
        {visiblePosts.map((post) => (
          <article key={post.id} className="forum-card">
            <span className="chip">
              {state.categories.find((item) => item.id === post.categoryId)?.name || 'General'}
            </span>
            {post.pinned && <span className="chip pin">Pinned</span>}
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="forum-meta">
              <button type="button" className="reaction-btn" onClick={() => likePost(post.id)}>
                ❤️ {post.likes}
              </button>
              <span>💬 {post.comments.length}</span>
              {auth.role === 'admin' && (
                <>
                  <button type="button" onClick={() => togglePinPost(post.id)}>Pin</button>
                  <button type="button" onClick={() => deletePost(post.id)}>Delete</button>
                </>
              )}
            </div>
            <div className="comment-list">
              {post.comments.map((comment) => (
                <article key={comment.id} className="comment-item">
                  <strong>{comment.author}</strong>
                  <p>{comment.text}</p>
                  {comment.replies.map((reply) => (
                    <p key={reply.id} className="reply-item">
                      ↳ {reply.author}: {reply.text}
                    </p>
                  ))}
                  <div className="inline-actions">
                    <input
                      type="text"
                      placeholder="Reply..."
                      value={replyText[comment.id] || ''}
                      onChange={(event) =>
                        setReplyText((prev) => ({ ...prev, [comment.id]: event.target.value }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!replyText[comment.id]) return
                        addReply(post.id, comment.id, 'Member', replyText[comment.id])
                        setReplyText((prev) => ({ ...prev, [comment.id]: '' }))
                      }}
                    >
                      Reply
                    </button>
                    {auth.role === 'admin' && (
                      <button type="button" onClick={() => deleteComment(post.id, comment.id)}>
                        Remove
                      </button>
                    )}
                  </div>
                </article>
              ))}
              <div className="inline-actions">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post.id] || ''}
                  onChange={(event) =>
                    setCommentText((prev) => ({ ...prev, [post.id]: event.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!commentText[post.id]) return
                    addComment(post.id, 'Member', commentText[post.id])
                    setCommentText((prev) => ({ ...prev, [post.id]: '' }))
                  }}
                >
                  Comment
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ForumPage
