const milestones = [
  { year: '2017', text: 'साहित्य सभा की स्थापना और पहला खुला कविता पाठ।' },
  { year: '2019', text: 'मासिक कथा-चर्चा और युवा लेखक mentorship शुरू।' },
  { year: '2022', text: 'डिजिटल मंच और साहित्यिक archive library लॉन्च।' },
  { year: '2026', text: 'आधुनिक cultural platform के रूप में विस्तार।' },
]

function AboutPage() {
  return (
    <section className="surface">
      <div className="section-head">
        <h2>About Sahitya Sabha</h2>
        <p>Tradition, craft, and modern cultural storytelling.</p>
      </div>
      <p className="lead">
        साहित्य सभा हिंदी भाषा और साहित्य की सृजनात्मक ऊर्जा को contemporary design
        अनुभव के साथ प्रस्तुत करने वाला समुदाय है।
      </p>
      <div className="timeline-list">
        {milestones.map((item) => (
          <article key={item.year} className="timeline-item">
            <strong>{item.year}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AboutPage
