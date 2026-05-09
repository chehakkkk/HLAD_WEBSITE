import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [activeEvent, setActiveEvent] = useState(0)
  const [activeFaq, setActiveFaq] = useState(0)

  const events = useMemo(
    () => [
      {
        title: 'काव्य संध्या',
        date: '18 जून 2026',
        time: 'शाम 6:00 बजे',
        description:
          'मुक्त मंच पर नई और क्लासिक हिंदी कविताओं का पाठ, चर्चा और लाइव प्रतिक्रिया।',
      },
      {
        title: 'कहानी गोष्ठी',
        date: '25 जून 2026',
        time: 'शाम 5:30 बजे',
        description:
          'सदस्यों की मौलिक लघु कहानियों का पाठ, संपादन सुझाव और साहित्यिक संवाद।',
      },
      {
        title: 'लेखन कार्यशाला',
        date: '02 जुलाई 2026',
        time: 'दोपहर 3:00 बजे',
        description:
          'नए लेखकों के लिए कथानक, पात्र निर्माण और भाषा शैली पर प्रायोगिक सत्र।',
      },
    ],
    [],
  )

  const faqs = useMemo(
    () => [
      {
        question: 'क्लब में सदस्यता कैसे लें?',
        answer:
          'आप "सदस्य बनें" बटन से फॉर्म भरकर आवेदन कर सकते हैं। चयन के बाद आपको ईमेल द्वारा जानकारी मिलेगी।',
      },
      {
        question: 'क्या शुरुआती लेखक भी जुड़ सकते हैं?',
        answer:
          'बिल्कुल। हमारा उद्देश्य नए और अनुभवी दोनों लेखकों को एक मंच देना है, जहां सीखना और साझा करना साथ-साथ चले।',
      },
      {
        question: 'क्या ऑनलाइन सत्र उपलब्ध हैं?',
        answer:
          'हां, मासिक ऑनलाइन पाठ और चर्चाएं आयोजित होती हैं। पंजीकरण के बाद लिंक साझा किया जाता है।',
      },
    ],
    [],
  )

  return (
    <div className="page">
      <header className="top-nav">
        <p className="brand">हिन्दी साहित्य क्लब</p>
        <nav aria-label="मुख्य नेविगेशन">
          <a href="#about">हमारे बारे में</a>
          <a href="#events">कार्यक्रम</a>
          <a href="#library">पुस्तकालय</a>
          <a href="#contact">संपर्क</a>
        </nav>
      </header>

      <section className="hero-section surface">
        <div className="hero-content reveal">
          <p className="eyebrow">साहित्य, संवाद और सृजन का मंच</p>
          <h1>हिन्दी साहित्य क्लब में आपका स्वागत है</h1>
          <p className="lead">
            कविता, कहानी, नाटक और आलोचना के माध्यम से हिंदी साहित्य को जीवंत रखने का
            हमारा सामूहिक प्रयास।
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#events">
              कार्यक्रम देखें
            </a>
            <a className="btn btn-secondary" href="#contact">
              सदस्य बनें
            </a>
          </div>
        </div>
        <div className="hero-panel reveal delay-1">
          <h2>आज का साहित्यिक उद्धरण</h2>
          <blockquote>
            "साहित्य समाज का दर्पण ही नहीं, उसकी संवेदना का विस्तार भी है।"
          </blockquote>
          <p>- क्लब संपादकीय मंडल</p>
        </div>
      </section>

      <section id="about" className="surface split reveal">
        <div>
          <h2>हमारा उद्देश्य</h2>
          <p>
            क्लब का लक्ष्य हिंदी साहित्य के पाठकों और रचनाकारों को एक ऐसा समुदाय देना है
            जहां विचार-विमर्श, पाठ और लेखन निरंतर विकसित हो।
          </p>
        </div>
        <div className="stats-grid">
          <article>
            <strong>250+</strong>
            <span>सक्रिय सदस्य</span>
          </article>
          <article>
            <strong>48</strong>
            <span>वार्षिक कार्यक्रम</span>
          </article>
          <article>
            <strong>1200+</strong>
            <span>पुस्तक संग्रह</span>
          </article>
        </div>
      </section>

      <section id="events" className="surface reveal">
        <div className="section-head">
          <h2>आगामी कार्यक्रम</h2>
          <p>चयनित कार्यक्रम पर क्लिक करके पूरी जानकारी देखें।</p>
        </div>
        <div className="event-layout">
          <div className="event-list" role="tablist" aria-label="कार्यक्रम सूची">
            {events.map((event, index) => (
              <button
                key={event.title}
                type="button"
                className={`event-tab ${activeEvent === index ? 'is-active' : ''}`}
                onClick={() => setActiveEvent(index)}
              >
                <span>{event.title}</span>
                <small>{event.date}</small>
              </button>
            ))}
          </div>
          <article className="event-card">
            <h3>{events[activeEvent].title}</h3>
            <p>{events[activeEvent].description}</p>
            <div className="chips">
              <span>{events[activeEvent].date}</span>
              <span>{events[activeEvent].time}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="library" className="surface reveal">
        <div className="section-head">
          <h2>साहित्यिक संसाधन</h2>
          <p>नियमित पाठकों और शोधार्थियों के लिए curated सामग्री।</p>
        </div>
        <div className="resource-grid">
          <article>
            <h3>मासिक पत्रिका</h3>
            <p>क्लब सदस्यों की कविताएं, कहानियां और समीक्षा लेख।</p>
          </article>
          <article>
            <h3>ऑडियो पाठ</h3>
            <p>प्रमुख हिंदी रचनाओं का वाचन और व्याख्या संग्रह।</p>
          </article>
          <article>
            <h3>अनुसंधान नोट्स</h3>
            <p>हिंदी साहित्य के युग, लेखकों और प्रवृत्तियों पर नोट्स।</p>
          </article>
        </div>
      </section>

      <section className="surface reveal">
        <div className="section-head">
          <h2>अक्सर पूछे जाने वाले प्रश्न</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <article
              key={item.question}
              className={`faq-item ${activeFaq === index ? 'is-open' : ''}`}
            >
              <button type="button" onClick={() => setActiveFaq(index)}>
                {item.question}
              </button>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="surface reveal">
        <div className="section-head">
          <h2>सदस्य बनें</h2>
          <p>साहित्यिक गतिविधियों में भाग लेने के लिए अपना विवरण साझा करें।</p>
        </div>
        <form className="join-form">
          <label>
            नाम
            <input type="text" placeholder="अपना नाम लिखें" />
          </label>
          <label>
            ईमेल
            <input type="email" placeholder="example@email.com" />
          </label>
          <label>
            रुचि
            <select defaultValue="कविता">
              <option>कविता</option>
              <option>कहानी</option>
              <option>आलोचना</option>
              <option>नाटक</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary">
            आवेदन भेजें
          </button>
        </form>
      </section>
    </div>
  )
}

export default App
