"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { BookOpen, Users, Sparkles, Heart, Quote, Feather } from "lucide-react";
import { useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

/* ─── Animated counter ─────────────────────────────────────────── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 60, damping: 18 });
  const display = useTransform(smooth, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) raw.set(target);
  }, [inView, target, raw]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─── Ink-brush SVG decoration ──────────────────────────────────── */
function InkStroke({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 24" className={className} aria-hidden fill="none">
      <path
        d="M4 12 C40 4, 100 20, 130 12 S210 2, 256 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
        pathLength="1"
      />
    </svg>
  );
}

/* ─── Animated ink-wash orb – breathes in/out slowly ────────────── */
function BreathingOrb({
  className,
  color,
  duration = 7,
  delay = 0,
}: {
  className: string;
  color: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{ background: color }}
      animate={{
        scale: [1, 1.22, 0.92, 1.18, 1],
        opacity: [0.55, 0.85, 0.45, 0.78, 0.55],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.3, 0.55, 0.78, 1],
      }}
    />
  );
}

/* ─── Quote card ────────────────────────────────────────────────── */
const quotes = [
  { text: "साहित्य समाज का दर्पण है।", attr: "— प्रेमचंद" },
  { text: "कविता वो है जो दिल से निकले।", attr: "— मिर्ज़ा ग़ालिब" },
];

/* ─── Main Component ────────────────────────────────────────────── */
export function AboutSection() {
  return (
    <section
      id="about"
      className="section-about section-rule-top relative overflow-hidden py-28 md:py-36"
    >
      {/* ── Animated corner atmosphere – breathing ink-wash orbs ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Primary saffron bloom – top-right, slow breath */}
        <BreathingOrb
          className="h-[500px] w-[500px] -right-32 -top-32"
          color="rgba(255,153,51,0.10)"
          duration={8}
          delay={0}
        />
        {/* Secondary amber – bottom-left, offset phase */}
        <BreathingOrb
          className="h-[380px] w-[380px] -left-24 -bottom-24"
          color="rgba(196,95,24,0.08)"
          duration={9}
          delay={2.5}
        />
        {/* Tertiary gold mid-accent, drifts slightly */}
        <motion.div
          className="absolute right-[18%] top-[38%] h-[180px] w-[180px] rounded-full blur-[70px]"
          style={{ background: "rgba(201,162,39,0.06)" }}
          animate={{ x: [0, 14, -8, 14, 0], y: [0, -10, 6, -8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Faint ruled-paper lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-b border-primary/[0.035]"
            style={{ top: `${80 + i * 96}px` }}
          />
        ))}

        {/* Corner ornaments */}
        <div className="absolute bottom-0 left-0 w-28 h-28 border-b-2 border-l-2 border-primary/20 rounded-bl-3xl" />
        <div className="absolute top-0 right-0 w-28 h-28 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl" />

        {/* Scattered Devanagari glyphs */}
        {["क", "ख", "ग", "घ", "ङ"].map((glyph, i) => (
          <span
            key={glyph}
            className="absolute font-hindi text-6xl text-primary/[0.04] select-none"
            style={{
              top: `${10 + i * 18}%`,
              left: `${5 + i * 18}%`,
              transform: `rotate(${-15 + i * 8}deg)`,
            }}
          >
            {glyph}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 text-saffron mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-saffron" />
            <Feather className="w-5 h-5" />
            <span className="font-hindi text-sm tracking-widest uppercase">परिचय</span>
            <Feather className="w-5 h-5 scale-x-[-1]" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-saffron" />
          </div>

          <h2 className="text-5xl md:text-6xl font-display text-foreground mb-3 tracking-tight">
            About <span className="text-primary italic">HLAD</span>
          </h2>

          <InkStroke className="w-48 text-saffron mx-auto my-4" />

          <p className="text-lg font-body text-muted-foreground max-w-xl mx-auto">
            Where tradition meets contemporary expression
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">

          {/* ══ Left column ══════════════════════════════════════════ */}
          <ScrollReveal>
            <div className="space-y-6">
            {/* What We Offer — enhanced cards */}
              <div className="rounded-2xl border border-primary/20 bg-card shadow-lg overflow-hidden">
                <div className="px-7 pt-7 pb-4 border-b border-primary/10">
                  <h3 className="text-xl font-display text-foreground">What We Offer</h3>
                  <p className="text-xs font-hindi text-saffron mt-0.5">हमारी सेवाएँ</p>
                </div>

                <div className="divide-y divide-primary/8">
                  {[
                    {
                      icon: BookOpen,
                      title: "Literary Workshops",
                      hindi: "साहित्यिक कार्यशालाएँ",
                      desc: "Master the art of Hindi poetry and prose with expert guidance.",
                      accent: "from-amber-500/10 to-saffron/5",
                    },
                    {
                      icon: Users,
                      title: "Community Events",
                      hindi: "सामुदायिक कार्यक्रम",
                      desc: "Connect with fellow literature enthusiasts at our regular meetups.",
                      accent: "from-primary/10 to-primary/5",
                    },
                    {
                      icon: Sparkles,
                      title: "Poetry Slams",
                      hindi: "काव्य प्रतियोगिताएँ",
                      desc: "Showcase your talent in our vibrant open-mic sessions.",
                      accent: "from-saffron/10 to-amber-400/5",
                    },
                    {
                      icon: Heart,
                      title: "Cultural Preservation",
                      hindi: "सांस्कृतिक संरक्षण",
                      desc: "Archiving and celebrating the timeless works of Hindi masters.",
                      accent: "from-rose-400/10 to-primary/5",
                    },
                  ].map(({ icon: Icon, title, hindi, desc, accent }, i) => (
                    <motion.div
                      key={title}
                      className="group flex gap-4 px-7 py-5 hover:bg-primary/[0.03] transition-colors duration-200"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.45 }}
                    >
                      <div
                        className={`flex-shrink-0 w-11 h-11 bg-gradient-to-br ${accent} rounded-xl flex items-center justify-center border border-primary/10 group-hover:scale-105 transition-transform duration-200`}
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-base font-display text-foreground">{title}</h4>
                          <span className="text-xs font-hindi text-saffron/70 hidden sm:inline">{hindi}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-body mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Animated stats bar */}
              <div className="bg-secondary text-secondary-foreground rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-3 divide-x divide-white/10">
                  {[
                    { value: 500, suffix: "+", label: "Members", hindiLabel: "सदस्य" },
                    { value: 100, suffix: "+", label: "Events", hindiLabel: "कार्यक्रम" },
                    { value: 50,  suffix: "+", label: "Publications", hindiLabel: "प्रकाशन" },
                  ].map(({ value, suffix, label, hindiLabel }, i) => (
                    <motion.div
                      key={label}
                      className="flex flex-col items-center py-7 px-4 text-center group"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                      <div className="text-3xl md:text-4xl font-display text-saffron mb-0.5">
                        <AnimatedNumber target={value} suffix={suffix} />
                      </div>
                      <div className="text-sm font-body text-secondary-foreground/80">{label}</div>
                      <div className="text-xs font-hindi text-secondary-foreground/50 mt-0.5">{hindiLabel}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress-bar accent */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-saffron/0 via-saffron/60 to-saffron/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              
            </div>
          </ScrollReveal>

          {/* ══ Right column ═════════════════════════════════════════ */}
          <ScrollReveal delay={0.08}>
            <div className="space-y-8">

              {/* Heritage narrative */}
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-saffron">
                  Our Story
                </p>
                <h3 className="font-display mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-charcoal">
                  Our Heritage
                </h3>
                <InkStroke className="w-32 text-saffron mt-2 mb-5" />

                <p className="font-body text-base md:text-lg leading-relaxed text-charcoal-muted">
                  Founded in 2020, HLAD has been a beacon for Hindi literature enthusiasts—curating workshops,
                  open mics, manuscript circles, and digital archives that honour classical voices while welcoming
                  contemporary expression.
                </p>
                <p className="font-hindi mt-5 text-lg leading-relaxed text-charcoal/80">
                  हिंदी साहित्य की सृजनात्मक परंपरा को आधुनिक दृष्टि से जोड़ना हमारा उद्देश्य है।
                </p>
              </div>
              
              {/* Hero visual card */}
              <div className="relative flex min-h-[300px] items-center justify-center rounded-3xl border border-white/60 bg-gradient-to-br from-parchment to-parchment-dark p-8 shadow-[0_32px_80px_rgba(42,34,28,0.12)] overflow-hidden">
                {/* Subtle paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#2a221c_0px,#2a221c_1px,transparent_1px,transparent_8px)]" />
                {/* Main image */}
                <img
                  src="/aboutus.jpg"
                  alt="HLAD"
                  className="relative w-full h-full object-cover rounded-2xl"
                />

                {/*
                <svg viewBox="0 0 440 300" className="relative w-full max-w-md" aria-hidden>
                  <defs>
                    <linearGradient id="inkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8a7060" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#e0782c" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c9a227" stopOpacity="0" />
                      <stop offset="50%" stopColor="#c9a227" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Main Devanagari word *
                  <text
                    x="50%" y="44%"
                    textAnchor="middle"
                    style={{ fontSize: 80, fill: "url(#inkGrad)", fontFamily: "Noto Serif Devanagari, serif" }}
                  >
                    साहित्य
                  </text>

                  {/* Subtitle *
                  <text
                    x="50%" y="65%"
                    textAnchor="middle"
                    style={{ fontSize: 22, fill: "#8a7060", fontFamily: "Noto Serif Devanagari, serif", opacity: 0.6 }}
                  >
                    Hindi Literature & Debating Club
                  </text>

                  {/* Decorative ruled lines *
                  <line x1="60" y1="90" x2="380" y2="90" stroke="url(#lineGrad)" strokeWidth="1" />
                  <line x1="60" y1="240" x2="380" y2="240" stroke="url(#lineGrad)" strokeWidth="1" />

                  {/* Ornamental curves *
                  <path d="M60 265 Q220 210 380 265" stroke="#c9a227" strokeWidth="1.5" fill="none" opacity="0.45" />
                  <path d="M80 270 Q220 222 360 270" stroke="#c9a227" strokeWidth="0.8" fill="none" opacity="0.2" />

                  {/* Dot accents *
                  <circle cx="60" cy="90" r="3" fill="#c9a227" opacity="0.5" />
                  <circle cx="380" cy="90" r="3" fill="#c9a227" opacity="0.5" />
                  <circle cx="60" cy="240" r="3" fill="#c9a227" opacity="0.5" />
                  <circle cx="380" cy="240" r="3" fill="#c9a227" opacity="0.5" />
                </svg>
*/}
                {/* Floating tag */}
                <motion.div
                  className="absolute bottom-6 left-6 rounded-xl border border-white/70 bg-white/80 px-4 py-2 font-hindi text-sm font-semibold text-saffron shadow-lg backdrop-blur-md"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  रचना • संस्कृति • समुदाय
                </motion.div>

                {/* Year badge */}
                <motion.div
                  className="absolute top-5 right-5 rounded-full border border-primary/30 bg-parchment/90 px-3 py-1 text-xs font-body font-medium text-primary/70 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Est. 2020
                </motion.div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}