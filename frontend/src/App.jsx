import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import EventsSection from './components/EventsSection'
import TeamSection from './components/TeamSection'
import GallerySection from './components/GallerySection'
import TestimonialsSection from './components/TestimonialsSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'

const SECTION_IDS = ['home', 'about', 'events', 'team', 'gallery', 'testimonials', 'faq']

export default function App() {
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-18% 0px -50% 0px', threshold: [0, 0.12, 0.25] },
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar activeId={activeId} />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <TeamSection />
        <GallerySection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
