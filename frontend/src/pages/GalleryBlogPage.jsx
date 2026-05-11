import { useState } from 'react'

const galleryItems = ['Poetry Night', 'Manuscript Showcase', 'Author Meet', 'Open Mic Evening']
const blogs = [
  'हिंदी कविता में संवेदना और प्रतिरोध की भूमिका',
  'क्लासिक साहित्य को युवा पाठकों तक कैसे लाएं',
  'लेखन अनुशासन: रोजाना 30 मिनट का प्रभाव',
]

function GalleryBlogPage() {
  const [tab, setTab] = useState('gallery')

  return (
    <div className="px-3 md:px-6 py-4">
      <section className="surface ui-prose">
        <div className="section-head">
          <h2>Gallery & Blog</h2>
          <p className="muted">Visual memories and editorial insights in one space.</p>
        </div>
        <div className="inline-actions">
          <button className={tab === 'gallery' ? 'active' : ''} type="button" onClick={() => setTab('gallery')}>
            Gallery
          </button>
          <button className={tab === 'blog' ? 'active' : ''} type="button" onClick={() => setTab('blog')}>
            Blog
          </button>
        </div>
        {tab === 'gallery' ? (
          <div className="card-grid">
            {galleryItems.map((item) => (
              <article key={item} className="media-card">
                <div className="media-placeholder" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-grid">
            {blogs.map((blog) => (
              <article key={blog} className="info-card">
                <h3>{blog}</h3>
                <p>Read editorial notes and cultural perspectives from our writers.</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default GalleryBlogPage
