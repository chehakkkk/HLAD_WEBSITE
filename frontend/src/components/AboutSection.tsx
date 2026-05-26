"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Sparkles, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-parchment-dark to-beige/60 py-24 md:py-32">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] translate-x-1/4 rounded-full bg-saffron/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-primary/20" />
      <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/20" />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <div className="w-8 h-px bg-primary" />
            <BookOpen className="w-6 h-6" />
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">About HLAD</h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Where tradition meets contemporary expression
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column — Visual card from v2 */}
          <ScrollReveal>
            <div className="relative flex min-h-[280px] items-center justify-center rounded-3xl border border-white/60 dark:border-zinc-700/60 bg-gradient-to-br from-parchment to-parchment-dark p-8 shadow-[0_24px_80px_rgba(42,34,28,0.08)]">
              <svg viewBox="0 0 400 320" className="w-full max-w-md opacity-90" aria-hidden>
                <defs>
                  <linearGradient id="ink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#8a7060" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#e0782c" stopOpacity="0.35" />
                  </linearGradient>
                </defs>
                <text
                  x="50%"
                  y="42%"
                  textAnchor="middle"
                  style={{ fontSize: 72, fill: "url(#ink)", fontFamily: "Noto Serif Devanagari, serif" }}
                >
                  साहित्य
                </text>
                <path d="M40 260 Q200 200 360 260" stroke="#c9a227" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path d="M60 80 L340 80" stroke="#2a221c" strokeOpacity="0.08" strokeWidth="1" />
                <path d="M60 240 L340 240" stroke="#2a221c" strokeOpacity="0.08" strokeWidth="1" />
              </svg>
              <motion.div
                className="absolute bottom-6 left-6 rounded-xl border border-white/70 dark:border-zinc-700/70 bg-white/80 dark:bg-zinc-800/80 px-4 py-2 font-hindi text-sm font-semibold text-saffron shadow-lg backdrop-blur-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                रचना • संस्कृति • समुदाय
              </motion.div>
            </div>

            {/* Stats from v1 */}
            <div className="mt-6 bg-secondary text-secondary-foreground p-8 rounded-2xl shadow-lg">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl md:text-4xl mb-2 font-display">500+</div>
                  <div className="text-sm text-secondary-foreground/80">Members</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl mb-2 font-display">100+</div>
                  <div className="text-sm text-secondary-foreground/80">Events</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl mb-2 font-display">50+</div>
                  <div className="text-sm text-secondary-foreground/80">Publications</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column — v2 text + v1 offerings */}
          <ScrollReveal delay={0.08}>
            <div className="space-y-8">
              {/* Heritage text from v2 */}
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">About HLAD</p>
                <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
                  Our Heritage
                </h3>
                <p className="font-body mt-6 text-base leading-relaxed text-charcoal-muted md:text-lg">
                  Founded in 2020, HLAD has been a beacon for Hindi literature enthusiasts—curating workshops, open
                  mics, manuscript circles, and digital archives that honour classical voices while welcoming
                  contemporary expression.
                </p>
                <p className="font-hindi mt-5 text-lg leading-relaxed text-charcoal">
                  हिंदी साहित्य की सृजनात्मक परंपरा को आधुनिक दृष्टि से जोड़ना हमारा उद्देश्य है।
                </p>
              </div>

              {/* What We Offer from v1 */}
              <div className="bg-card p-8 rounded-2xl shadow-lg border border-primary/20">
                <h3 className="text-xl font-display text-foreground mb-6">What We Offer</h3>
                <div className="space-y-5">
                  {[
                    { icon: BookOpen, title: "Literary Workshops", desc: "Master the art of Hindi poetry and prose with expert guidance" },
                    { icon: Users, title: "Community Events", desc: "Connect with fellow literature enthusiasts at our regular meetups" },
                    { icon: Sparkles, title: "Poetry Slams", desc: "Showcase your talent in our vibrant open-mic sessions" },
                    { icon: Heart, title: "Cultural Preservation", desc: "Archiving and celebrating the timeless works of Hindi masters" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-display text-foreground mb-1">{title}</h4>
                        <p className="text-sm text-muted-foreground font-body">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}