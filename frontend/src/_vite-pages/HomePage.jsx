import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import EventsSection from '../components/EventsSection'
import TeamSection from '../components/TeamSection'
import GallerySection from '../components/GallerySection'
import TestimonialsSection from '../components/TestimonialsSection'
import ForumTeaser from '../components/home/ForumTeaser'
import FaqSection from '../components/FaqSection'
import { useNavigationSection } from '../context/NavigationContext'

const SECTION_IDS = ['home', 'about', 'events', 'team', 'gallery', 'testimonials', 'discussions', 'faq']

export default function HomePage() {
  const { setActiveSectionId } = useNavigationSection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSectionId(entry.target.id)
        })
      },
      { rootMargin: '-18% 0px -50% 0px', threshold: [0, 0.12, 0.25] },
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setActiveSectionId])

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <TeamSection />
      <GallerySection />
      <TestimonialsSection />
      <ForumTeaser />
      <FaqSection />
    </main>
  )
}
