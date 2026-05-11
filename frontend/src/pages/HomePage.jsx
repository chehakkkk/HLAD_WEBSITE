import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import EventsSection from '../components/EventsSection'
import GallerySection from '../components/GallerySection'
import AboutSection from '../components/AboutSection'
import TeamSection from '../components/TeamSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ForumTeaser from '../components/home/ForumTeaser'
import { useNavigationSection } from '../context/NavigationContext'

/** Sections that correspond to navbar hash targets (order matches scroll flow). */
const SECTION_IDS = ['home', 'events', 'gallery', 'about', 'team', 'testimonials', 'discussions']

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
      <EventsSection />
      <GallerySection />
      <AboutSection />
      <TeamSection />
      <TestimonialsSection />
      <ForumTeaser />
    </main>
  )
}
