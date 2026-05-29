import {
  AboutSection,
  EventsSection,
  FAQSection,
  Footer,
  Navbar,
  HeroSection,
  TeamSection,
} from "@/src/components";
import GallerySection from "@/src/components/GallerySection";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <TeamSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
