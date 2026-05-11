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
    <div className="px-3 md:px-6 py-4 ui-page">
      <section className="ui-surface ui-prose overflow-hidden">
        <div className="ui-split">
          <div className="ui-illustration cross-pattern flex items-end">
            <div className="p-6">
              <div className="ui-kicker mb-3">Gallery • Blog</div>
              <h1 className="ui-title text-3xl md:text-4xl mb-2">Gallery &amp; Blog</h1>
              <p className="ui-subtitle max-w-[54ch]">
                Visual memories and editorial insights in one space.
              </p>
            </div>
          </div>
          <div className="ui-panel">
            <h2 className="ui-title text-xl mb-4">Explore</h2>
            <div className="inline-actions">
              <button className={tab === 'gallery' ? 'active' : ''} type="button" onClick={() => setTab('gallery')}>
                Gallery
              </button>
              <button className={tab === 'blog' ? 'active' : ''} type="button" onClick={() => setTab('blog')}>
                Blog
              </button>
            </div>
            <div className="mt-4 text-xs text-[#7a6250]">
              Switch tabs to browse visuals or editorials.
            </div>
          </div>
        </div>
        <div className="px-5 md:px-8 py-6">
        <div className="section-head">
          <h2>Gallery & Blog</h2>
          <p className="muted">Visual memories and editorial insights in one space.</p>
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
        </div>
      </section>
    </div>
  )
}

export default GalleryBlogPage
