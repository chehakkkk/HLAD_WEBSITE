import {
  AboutSection,
  EventsSection,
  FAQSection,
  Footer,
  Header,
  HeroSection,
  TeamSection,
} from "@/src/components";
import GallerySection from "@/src/components/GallerySection";
import TestimonialsSection from "@/src/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
