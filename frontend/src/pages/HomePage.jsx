import { useEffect, useState } from 'react'

function HomePage() {
  const lines = [
    '“शब्द संस्कृति की सबसे सुंदर विरासत हैं।”',
    '“कविता मनुष्य की संवेदना का उजास है।”',
    '“साहित्य से ही समाज की आत्मा बोलती है।”',
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((value) => (value + 1) % lines.length), 2800)
    return () => clearInterval(interval)
  }, [lines.length])

  return (
    <section className="surface hero editorial">
      <div className="floating-ornaments" aria-hidden="true">
        <span>पुस्तक</span>
        <span>स्याही</span>
        <span>शब्द</span>
      </div>
      <p className="eyebrow">Hindi Literature Club</p>
      <h1>साहित्य सभा</h1>
      <p className="type-line">{lines[index]}</p>
      <p className="lead">
        एक आधुनिक सांस्कृतिक मंच जहां हिंदी साहित्य को immersive अनुभव, संवाद और
        community storytelling के साथ प्रस्तुत किया जाता है।
      </p>
      <div className="hero-actions">
        <button className="btn btn-primary" type="button">Join the Club</button>
        <button className="btn btn-secondary" type="button">Explore Literature</button>
        <button className="btn btn-secondary" type="button">Upcoming Events</button>
      </div>
      <div className="bento-grid">
        <article className="surface-sub">Weekly poetry salon</article>
        <article className="surface-sub">Curated reading rooms</article>
        <article className="surface-sub">Live author dialogues</article>
      </div>
    </section>
  )
}

export default HomePage
