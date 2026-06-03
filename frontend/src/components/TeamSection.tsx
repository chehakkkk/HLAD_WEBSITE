"use client";

import { motion } from "motion/react";
import { Users, MessageCircleMore, BriefcaseBusiness, Mail } from "lucide-react";
import { ImageWithFallback } from "./shared/ImageWithFallback";
import ScrollReveal from './ScrollReveal'
const team = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Founder & President",
    hi: "संस्थापक एवं अध्यक्ष",
    initials: "PS",
    bio: "Award-winning Hindi poet with 15+ years of literary experience",
    social: { twitter: "#", linkedin: "#", email: "priya@hlad.org" },
  },
  {
    id: 2,
    name: "Vikram Patel",
    role: "Literary Director",
    hi: "साहित्यिक निदेशक",
    initials: "VP",
    bio: "Published author and creative writing mentor",
    social: { twitter: "#", linkedin: "#", email: "vikram@hlad.org" },
  },
  {
    id: 3,
    name: "Ananya Desai",
    role: "Events Coordinator",
    hi: "कार्यक्रम समन्वयक",
    initials: "AD",
    bio: "Cultural enthusiast specialising in literary event management",
    social: { twitter: "#", linkedin: "#", email: "ananya@hlad.org" },
  },
  {
    id: 4,
    name: "Rohan Kumar",
    role: "Community Manager",
    hi: "समुदाय प्रबंधक",
    initials: "RK",
    bio: "Passionate about building literary communities across India",
    social: { twitter: "#", linkedin: "#", email: "rohan@hlad.org" },
  },
];

export function TeamSection() {
  return (
    <section id="team" className="section-team section-rule-top py-24 md:py-32 relative overflow-hidden">
      {/* Corner ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="corner-glow corner-glow-tl h-[400px] w-[400px] bg-saffron/[0.06]" />
        <div className="corner-glow corner-glow-br h-[360px] w-[360px] bg-gold/[0.05]" />
      </div>
      {/* Decorative lotus glyphs */}
      <div className="pointer-events-none absolute top-10 right-10 text-saffron/5 text-9xl select-none">❀</div>
      <div className="pointer-events-none absolute bottom-10 left-10 text-saffron/5 text-9xl select-none">❀</div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-saffron mb-4">
            <div className="w-8 h-px bg-saffron" />
            <Users className="w-5 h-5" />
            <div className="w-8 h-px bg-saffron" />
          </div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">People</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">Meet the Team</h2>
          <p className="font-body mx-auto mt-4 max-w-2xl text-charcoal-muted">
            A circle of editors, poets, designers, and archivists stewarding HLAD&apos;s voice with care and craft.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center rounded-3xl border border-white/70 dark:border-zinc-700/60 bg-white/75 dark:bg-zinc-800/80 p-6 text-center shadow-[0_14px_44px_rgba(42,34,28,0.07)] dark:shadow-[0_14px_44px_rgba(0,0,0,0.3)] backdrop-blur-md"
              >
                {/* Avatar — initials from v2, hover glow from v1 */}
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron/15 to-gold-soft/30 font-display text-lg font-bold text-saffron-deep ring-2 ring-saffron/20">
                  {m.initials}
                </div>

                <h3 className="font-display mt-4 text-lg font-semibold text-foreground">{m.name}</h3>
                <p className="font-body mt-1 text-sm text-muted-foreground">{m.role}</p>
                <p className="font-hindi mt-1 text-xs text-saffron">{m.hi}</p>
                <p className="font-body mt-3 text-xs text-muted-foreground leading-relaxed px-1">{m.bio}</p>

                {/* Social icons — kept from v1 */}
                <div className="flex justify-center gap-2 mt-5">
                  <a href={m.social.twitter} aria-label="Twitter"
                    className="w-8 h-8 bg-muted hover:bg-saffron rounded-full flex items-center justify-center transition-all duration-300 group/icon">
                    <MessageCircleMore className="w-3.5 h-3.5 text-foreground group-hover/icon:text-white" />
                  </a>
                  <a href={m.social.linkedin} aria-label="LinkedIn"
                    className="w-8 h-8 bg-muted hover:bg-saffron rounded-full flex items-center justify-center transition-all duration-300 group/icon">
                    <BriefcaseBusiness className="w-3.5 h-3.5 text-foreground group-hover/icon:text-white" />
                  </a>
                  <a href={`mailto:${m.social.email}`} aria-label="Email"
                    className="w-8 h-8 bg-muted hover:bg-saffron rounded-full flex items-center justify-center transition-all duration-300 group/icon">
                    <Mail className="w-3.5 h-3.5 text-foreground group-hover/icon:text-white" />
                  </a>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>        
      </div>
    </section>
  );
}