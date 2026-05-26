"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const events = [
  {
    id: 1,
    title: "काव्य संध्या",
    subtitle: "Kavya Sandhya – Poetry Evening",
    date: "March 15, 2026",
    time: "6:00 PM – 9:00 PM",
    location: "Main Auditorium",
    description: "An evening dedicated to classical and contemporary Hindi poetry with performances by renowned poets.",
    tag: "Poetry Slam",
    gradient: "from-saffron-soft/40 to-saffron/30",
  },
  {
    id: 2,
    title: "पुस्तक चर्चा",
    subtitle: "Pustak Charcha – Book Club",
    date: "March 22, 2026",
    time: "4:00 PM – 6:00 PM",
    location: "Library Hall",
    description: "Deep dive into Premchand's timeless classics and their relevance in modern times.",
    tag: "Book Reading",
    gradient: "from-gold-soft/50 to-beige",
  },
  {
    id: 3,
    title: "साहित्यिक सम्मेलन",
    subtitle: "Sahityik Sammelan – Literary Festival",
    date: "April 5, 2026",
    time: "10:00 AM – 5:00 PM",
    location: "Cultural Center",
    description: "Annual literature festival featuring panel discussions, workshops, and book launches.",
    tag: "Festival",
    gradient: "from-parchment-dark to-saffron-soft/25",
  },
  {
    id: 4,
    title: "कलम से दिल तक",
    subtitle: "Kalam se Dil Tak – Open Mic",
    date: "March 29, 2026",
    time: "7:00 PM – 10:00 PM",
    location: "Cafe Adab",
    description: "Share your original poetry, stories, and creative works in an intimate setting.",
    tag: "Open Mic",
    gradient: "from-saffron/20 to-gold-soft/40",
  },
];

export function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -420 : 420,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="events" className="bg-parchment py-24 md:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232F2F2F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-saffron mb-4">
            <div className="w-8 h-px bg-saffron" />
            <Calendar className="w-5 h-5" />
            <div className="w-8 h-px bg-saffron" />
          </div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Calendar</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">
            Recent Updates & Events
          </h2>
          <p className="font-body mx-auto mt-4 max-w-2xl text-charcoal-muted">
            Immersive evenings where language, music, and memory meet—crafted for readers, writers, and curious newcomers alike.
          </p>
        </ScrollReveal>

        {/* Scroll buttons (md+) */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <span className="text-charcoal rotate-180 inline-block">→</span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <span className="text-charcoal">→</span>
          </button>

          {/* Horizontally scrollable cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((ev, i) => (
              <ScrollReveal key={ev.id} delay={i * 0.06} className="flex-shrink-0 w-[320px] md:w-[360px] snap-start">
                <motion.article
                  whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 dark:border-zinc-700/70 bg-white/70 dark:bg-zinc-800/80 shadow-[0_16px_50px_rgba(42,34,28,0.08)] backdrop-blur-md"
                >
                  {/* Gradient header */}
                  <div className={`h-36 bg-gradient-to-br ${ev.gradient} relative overflow-hidden flex items-end p-5`}>
                    <span className="font-body absolute left-4 top-4 rounded-full bg-white/90 dark:bg-zinc-800/90 px-3 py-1 text-xs font-semibold text-saffron shadow-sm">
                      {ev.tag}
                    </span>
                    <h3 className="font-hindi text-3xl font-semibold text-charcoal drop-shadow-sm">
                      {ev.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-display text-sm italic text-charcoal-muted mb-4">{ev.subtitle}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-charcoal-muted text-xs">
                        <Calendar className="w-3.5 h-3.5 text-saffron" />
                        <span className="font-body">{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal-muted text-xs">
                        <Clock className="w-3.5 h-3.5 text-saffron" />
                        <span className="font-body">{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal-muted text-xs">
                        <MapPin className="w-3.5 h-3.5 text-saffron" />
                        <span className="font-body">{ev.location}</span>
                      </div>
                    </div>

                    <p className="font-body text-sm text-charcoal-muted line-clamp-3 mb-5">
                      {ev.description}
                    </p>

                    <motion.a
                      href="#events"
                      className="font-body mt-auto inline-flex items-center text-sm font-semibold text-charcoal dark:text-foreground no-underline group-hover:text-saffron transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Reserve seat →
                    </motion.a>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        #events [style*="scrollbar"] ::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}