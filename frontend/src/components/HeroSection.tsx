"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import HeroRotatingQuote from "./HeroRotatingQuote";
import MagneticButton from "./MagneticButton";
import { Feather, BookOpen } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// ─── Feather geometry ─────────────────────────────────────────────────────────
const FEATHER_VIEWBOX = { w: 320, h: 400 };
const FEATHER_TIP_SVG = { x: 88, y: 388 };
const FEATHER_TIP = {
  left: `${(FEATHER_TIP_SVG.x / FEATHER_VIEWBOX.w) * 100}%`,
  top:  `${(FEATHER_TIP_SVG.y / FEATHER_VIEWBOX.h) * 100}%`,
};

const FEATHER_MAIN =
  "M 210 40 C 160 90 130 160 118 240 C 112 285 108 320 104 360 L 96 372 L 118 352 C 140 318 168 280 198 248 C 248 198 278 150 288 98 C 292 72 288 52 270 44 C 248 34 228 36 210 40 Z";
const FEATHER_DETAIL =
  "M 210 40 C 235 55 252 78 258 108 C 262 132 255 158 238 182";
const FEATHER_QUILL = "M 104 360 L 88 388 L 122 368 Z";

const GENTLE_SWAY = {
  rotate: [0, 0.55, -0.48, 0.32, 0],
  x: [0, 1.1, -0.9, 0.35, 0],
  y: [0, -4, -6, -4, 0],
};
const SWAY_TRANSITION = { duration: 10, repeat: Infinity, ease: "easeInOut" } as const;

const FEATHER_FRAME_CLASS =
  "relative block aspect-[320/400] w-[min(78vw,320px)] max-w-full sm:w-[min(85vw,380px)] md:w-[min(92vw,440px)]";
const FEATHER_SVG_CLASS = `${FEATHER_FRAME_CLASS} h-auto`;

// ─── Literary tags ────────────────────────────────────────────────────────────
const literaryTags = [
  { label: "कविता",   top: "6%",   left: "8%",  delay: 0.05, float: 5.5 },
  { label: "साहित्य", top: "22%",  right: "4%", delay: 0.2,  float: 6.5 },
  { label: "संवाद",   bottom: "18%", left: "12%", delay: 0.35, float: 5 },
] as const;

// ─── Particle helpers ─────────────────────────────────────────────────────────
const HINDI_LETTER_POOL = ["क", "व", "स", "त", "अ", "ह", "र", "न", "म", "ल"];

const LETTER_GLOW =
  "0 1px 0 rgba(255,255,255,0.95), 0 2px 6px rgba(42,34,28,0.10), 0 0 18px rgba(252,214,160,0.60)";

const EASE_INK   = [0.12, 0.95, 0.28, 1.0] as const;
const EASE_FLOAT = [0.22, 0.68, 0.36, 1.0] as const;

function seededRand(seed: number, index: number, salt = 0): number {
  const n = Math.sin(seed * 9301 + index * 49297 + salt * 233) * 93280;
  return n - Math.floor(n);
}
function buildLetterBurst(seed: number) {
  const COUNT = 7;

  // Group letters into 2–3 loose "streams" so some flow in similar directions
  // creating a calligraphic trail rather than pure scatter
  const STREAMS = [
    { centerDeg: -40, spreadDeg: 22 }, // upward-right main stream
    { centerDeg:  -5, spreadDeg: 18 }, // rightward mid stream
    { centerDeg:  25, spreadDeg: 16 }, // lower-right accent stream
  ];

  return Array.from({ length: COUNT }, (_, i) => {
    const r0 = seededRand(seed, i, 0);
    const r1 = seededRand(seed, i, 1);
    const r2 = seededRand(seed, i, 2);
    const r3 = seededRand(seed, i, 3);
    const r4 = seededRand(seed, i, 4);

    // Assign to a stream — letters 0–2 → stream 0, 3–4 → stream 1, 5–6 → stream 2
    const stream = STREAMS[i < 3 ? 0 : i < 5 ? 1 : 2];
    const angleDeg = stream.centerDeg + (r0 - 0.5) * stream.spreadDeg * 2;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Travel distance: 80–220px, fully randomised, not tied to index
    const dist = 80 + r1 * 140;

    // Spawn offset: letter begins slightly off-tip already moving
    // so there is NO stationary frame — initial position ≠ (0,0)
    const spawnX =  Math.cos(angleRad) * (8 + r2 * 10);
    const spawnY = -Math.sin(angleRad) * (8 + r2 * 10);

    // Final resting position
    const endX = Math.cos(angleRad) * dist;
    const endY = -Math.sin(angleRad) * dist;

    // Strong perpendicular arc — curve peaks at ~55% of travel
    // perpendicular vector to travel direction gives the spline control point
    const perpX = -Math.sin(angleRad);
    const perpY = -Math.cos(angleRad);
    const arcStrength = (r3 - 0.5) * 55; // ±27px perpendicular bow
    const arcX = Math.cos(angleRad) * dist * 0.55 + perpX * arcStrength;
    const arcY = -Math.sin(angleRad) * dist * 0.55 + perpY * arcStrength;

    // Stagger within streams: letters in the same stream fire in quick succession
    // so they look like a continuous brush stroke, not an explosion
    const streamDelay = i < 3 ? i * 0.07 : i < 5 ? (i - 3) * 0.09 : (i - 5) * 0.11;
    const delay = streamDelay + r0 * 0.04; // tiny jitter on top

    const duration = 3.5 + r1 * 1.8 + r2 * 0.6; // 3.5–5.9s, fully randomised

    const peakScale = 0.95 + r2 * 0.18;
    const rotStart  = (r3 - 0.5) * 10;
    const rotEnd    = (r4 - 0.5) * 24;

    return {
      id:       `${seed}-${i}`,
      char:     HINDI_LETTER_POOL[(seed * 3 + i * 7) % HINDI_LETTER_POOL.length],
      spawnX,
      spawnY,
      // 3-keyframe arc — NO origin frame, starts mid-motion from frame 1
      x:       [spawnX, arcX, endX],
      y:       [spawnY, arcY, endY],
      rotate:  [rotStart, rotStart * 0.5, rotEnd],
      opacity: [0.7, 1, 0],
      scale:   [0.72, peakScale, 0.8],
      delay,
      duration,
    };
  });
}
function buildSparkles(seed: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const r0 = seededRand(seed, i, 10);
    const r1 = seededRand(seed, i, 11);
    const r2 = seededRand(seed, i, 12);

    const angle = ((i / 6) * 360 + r0 * 40) * (Math.PI / 180);
    const dist  = 18 + r1 * 28;

    return {
      id:       `${seed}-s-${i}`,
      x:        [0, Math.cos(angle) * dist * 0.5, Math.cos(angle) * dist],
      y:        [0, Math.sin(angle) * dist * 0.5, Math.sin(angle) * dist],
      size:     2 + r2 * 2.5,
      delay:    i * 0.055 + r0 * 0.04,
      duration: 1.6 + r1 * 0.6,
    };
  });
}

// ─── Particle sub-components ──────────────────────────────────────────────────
function HindiLetterBurst({ burst, reduced }: { burst: number; reduced: boolean }) {
  const particles = useMemo(() => (burst ? buildLetterBurst(burst) : []), [burst]);
  if (reduced || !burst) return null;

  return (
    <AnimatePresence mode="popLayout">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="font-hindi absolute left-0 top-0 text-xl md:text-2xl font-bold leading-none will-change-transform"
          style={{ originX: "50%", originY: "50%" }}
          // initial matches the first keyframe exactly — zero stationary time
          initial={{ opacity: p.opacity[0], x: p.spawnX, y: p.spawnY, scale: p.scale[0], rotate: p.rotate[0] }}
          animate={{ opacity: p.opacity, x: p.x, y: p.y, scale: p.scale, rotate: p.rotate }}
          exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.35, ease: "easeIn" } }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            ease:     EASE_INK,
            scale:  { duration: p.duration, delay: p.delay, ease: EASE_FLOAT },
            rotate: { duration: p.duration, delay: p.delay, ease: EASE_FLOAT },
          }}
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-xl bg-saffron/20"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.4, 0], scale: [0.7, 1.3, 1.7] }}
            transition={{ duration: p.duration * 0.6, delay: p.delay, ease: EASE_FLOAT }}
            style={{ filter: "blur(8px)" }}
          />
          <span
            className="relative z-[1] inline-block rounded-lg border border-saffron/45 bg-white/[0.93] dark:bg-zinc-800/90 px-2 py-0.5 text-[#9a4210] dark:text-saffron shadow-[0_2px_10px_rgba(42,34,28,0.10),0_4px_20px_rgba(224,120,44,0.22)] ring-1 ring-white/80 backdrop-blur-[2px]"
            style={{ textShadow: LETTER_GLOW }}
          >
            {p.char}
          </span>
        </motion.span>
      ))}
    </AnimatePresence>
  );
}

function InkTrail({ burst, reduced }: { burst: number; reduced: boolean }) {
  if (reduced || !burst) return null;
  return (
    <motion.svg
      className="pointer-events-none absolute left-0 top-0 z-[1] h-28 w-60 overflow-visible sm:w-72"
      viewBox="0 0 260 90" fill="none" aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0.15] }}
      transition={{ duration: 3.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <linearGradient id="ink-trail-grad" x1="0%" y1="80%" x2="100%" y2="10%">
          <stop offset="0%" stopColor="rgba(224,120,44,0.6)" />
          <stop offset="70%" stopColor="rgba(244,168,98,0.25)" />
          <stop offset="100%" stopColor="rgba(244,168,98,0)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 0 4 Q 70 -4 140 -22 T 248 -52"
        stroke="url(#ink-trail-grad)" strokeWidth="2" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.svg>
  );
}

function FeatherSparkles({ burst, reduced }: { burst: number; reduced: boolean }) {
  const sparkles = useMemo(() => (burst ? buildSparkles(burst) : []), [burst]);
  if (reduced || !burst) return null;
  return (
    <AnimatePresence>
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute left-0 top-0 z-[2] rounded-full bg-gradient-to-br from-gold-soft to-saffron"
          style={{ width: s.size, height: s.size, boxShadow: "0 0 10px rgba(252,214,160,0.95),0 0 18px rgba(244,168,98,0.7)" }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0.9, 0.6, 0], scale: [0, 1.1, 0.9, 0.4], x: s.x, y: s.y }}
          transition={{ duration: s.duration, delay: s.delay, ease: EASE_INK }}
        />
      ))}
    </AnimatePresence>
  );
}

function FeatherParticleLayer({ burst, reduced, interacting }: { burst: number; reduced: boolean; interacting: boolean }) {
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible" style={{ isolation: "isolate" }} aria-hidden>
      <div className={FEATHER_FRAME_CLASS}>
        <AnimatePresence>
          {interacting && (
            <motion.div
              key="feather-pulse"
              className="absolute z-[55] h-12 w-12 rounded-full bg-gradient-to-br from-saffron/30 via-gold-soft/15 to-transparent blur-lg"
              style={{ left: FEATHER_TIP.left, top: FEATHER_TIP.top, transform: "translate(-50%,-50%)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.35, 0], scale: [0.8, 1.08, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
        <div className="absolute z-[60] h-0 w-0 overflow-visible" style={{ left: FEATHER_TIP.left, top: FEATHER_TIP.top }} aria-hidden>
          <InkTrail burst={burst} reduced={reduced} />
          <FeatherSparkles burst={burst} reduced={reduced} />
          <div className="relative z-[70]">
            <HindiLetterBurst burst={burst} reduced={reduced} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Feather SVG ──────────────────────────────────────────────────────────────
function LiterarySymbol({ mx, my, reduced, burst, onFeatherClick, interacting }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mx: any; my: any; reduced: boolean; burst: number; onFeatherClick: () => void; interacting: boolean;
}) {
  const rid = useId().replace(/:/g, "");
  const gradId = `lit-grad-${rid}`;
  const glowId  = `lit-glow-${rid}`;

  const innerX = useTransform(mx, [0, 1], reduced ? [0, 0] : [-8, 8]);
  const innerY = useTransform(my, [0, 1], reduced ? [0, 0] : [-6, 6]);
  const tilt   = useTransform(mx, [0, 1], reduced ? [0, 0] : [-2, 2]);
  const featherMotionStyle = { x: innerX, y: innerY, rotate: tilt, transformOrigin: `${FEATHER_TIP.left} ${FEATHER_TIP.top}` };

  return (
    <div className="relative z-[2] flex h-full min-h-[220px] w-full items-center justify-center overflow-visible sm:min-h-[260px] md:min-h-[420px]">
      <motion.div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute h-[min(112%,560px)] w-[min(112%,560px)] rounded-full"
          style={{ background: "radial-gradient(ellipse at 50% 45%,rgba(252,214,160,0.55) 0%,rgba(244,168,98,0.28) 38%,rgba(224,120,44,0.08) 58%,transparent 72%)" }}
          animate={reduced ? undefined : { scale: [1, 1.04, 1], opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center">
        <motion.button
          type="button"
          aria-label="Interact with the literary feather — releases glowing Hindi letters"
          onClick={onFeatherClick}
          disabled={reduced}
          className="group relative flex cursor-pointer items-center justify-center overflow-visible border-0 bg-transparent p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron disabled:cursor-default md:hover:drop-shadow-[0_0_28px_rgba(244,168,98,0.35)]"
        >
          <motion.div className="relative flex items-center justify-center" style={featherMotionStyle}
            animate={reduced ? undefined : GENTLE_SWAY} transition={SWAY_TRANSITION}
          >
            <svg viewBox="0 0 320 400" className={FEATHER_SVG_CLASS} fill="none" aria-hidden>
              <defs>
                <linearGradient id={`ghost-${rid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c45f18" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#e0782c" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fcd6a0" />
                  <stop offset="35%" stopColor="#f4a862" />
                  <stop offset="65%" stopColor="#e0782c" />
                  <stop offset="100%" stopColor="#a84a10" />
                  <animateTransform attributeName="gradientTransform" type="rotate" from="0 160 200" to="360 160 200" dur="18s" repeatCount="indefinite" />
                </linearGradient>
                <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g opacity="0.22" stroke={`url(#ghost-${rid})`} strokeWidth="1.25">
                <path d="M 160 36 L 278 118 L 236 268 L 160 352 L 84 268 L 42 118 Z" />
                <path d="M 160 52 L 258 124 L 222 256 L 160 324 L 98 256 L 62 124 Z" />
              </g>
              <motion.path d={FEATHER_MAIN} transform="translate(4,6)" stroke="rgba(224,120,44,0.2)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"
                animate={reduced ? undefined : { strokeDashoffset: [120, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} strokeDasharray="14 18" />
              <path d="M 160 28 C 228 96 268 168 272 232 C 276 292 248 338 200 364" stroke="rgba(92,83,76,0.12)" strokeWidth="1.5" strokeDasharray="6 10" fill="none" />
              <path d="M 160 48 C 214 108 248 174 252 236" stroke="rgba(224,120,44,0.15)" strokeWidth="1.25" strokeDasharray="4 8" fill="none" />
              <path d={FEATHER_MAIN} stroke={`url(#${gradId})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.04)"
                style={{ filter: `url(#${glowId}) drop-shadow(0 0 22px rgba(244,168,98,0.55)) drop-shadow(0 18px 40px rgba(224,120,44,0.28))` }} />
              <motion.path d={FEATHER_MAIN} stroke={`url(#${gradId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55"
                animate={reduced ? undefined : { strokeDashoffset: [0, -80] }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }} strokeDasharray="10 22" />
              <path d={FEATHER_DETAIL} stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
              <path d={FEATHER_QUILL} fill="#e0782c" opacity="0.92" />
              <circle cx={FEATHER_TIP_SVG.x} cy={FEATHER_TIP_SVG.y} r="1.5" fill="#f4a862" opacity="0" aria-hidden />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      <motion.div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-visible"
        style={featherMotionStyle} animate={reduced ? undefined : GENTLE_SWAY} transition={SWAY_TRANSITION} aria-hidden
      >
        <FeatherParticleLayer burst={burst} reduced={reduced} interacting={interacting} />
      </motion.div>
    </div>
  );
}

// ─── Ambient particles ────────────────────────────────────────────────────────
function PaperMotes({ reduced }: { reduced: boolean }) {
  const items = useMemo(() =>
    Array.from({ length: 22 }).map((_, i) => ({
      id: i, left: `${6 + ((i * 19) % 88)}%`, top: `${8 + ((i * 27) % 82)}%`,
      delay: (i % 6) * 0.22, w: 4 + (i % 4) * 2, h: 3 + (i % 3),
      rot: -20 + (i % 9) * 5, duration: 12 + (i % 7),
    })), []);
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {items.map((p) => (
        <motion.span key={p.id}
          className="absolute rounded-[1px] border border-saffron/20 bg-gradient-to-br from-white/55 to-white/20 shadow-sm"
          style={{ left: p.left, top: p.top, width: p.w, height: p.h, rotate: p.rot }}
          animate={{ y: [0, -36, 0], x: [0, 10, 0], opacity: [0.08, 0.35, 0.08], rotate: [p.rot, p.rot + 8, p.rot] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function PaperFragments({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {[1, 2, 3, 4].map((i) => (
        <motion.div key={i}
          className="absolute rounded-sm border border-saffron/[0.18] bg-gradient-to-br from-white/55 to-white/25 shadow-md backdrop-blur-[3px]"
          style={{ width: 28 + i * 10, height: 18 + i * 5, left: `${12 + i * 18}%`, bottom: `${6 + i * 5}%`, rotate: -8 + i * 6 }}
          animate={{ y: [0, -14, 0], rotate: [-8 + i * 6, -2 + i * 6, -8 + i * 6], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 8 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
        />
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function HeroSection() {
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const interactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const [burst, setBurst] = useState(0);
  const [interacting, setInteracting] = useState(false);

  const onFeatherClick = useCallback(() => {
    if (reduced) return;
    setBurst((n) => n + 1);
    setInteracting(true);
    if (interactTimerRef.current) clearTimeout(interactTimerRef.current);
    interactTimerRef.current = setTimeout(() => setInteracting(false), 950);
  }, [reduced]);

  const mx = useSpring(0.5, { stiffness: 70, damping: 30 });
  const my = useSpring(0.5, { stiffness: 70, damping: 30 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current || reduced) return;
    const r = heroRef.current.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    mx.set(x); my.set(y); setCursor({ x, y });
  }, [mx, my, reduced]);

  const onLeave = useCallback(() => {
    mx.set(0.5); my.set(0.5); setCursor({ x: 0.5, y: 0.5 });
  }, [mx, my]);

  const parallaxX = useTransform(mx, [0, 1], reduced ? [0, 0] : [-10, 10]);
  const parallaxY = useTransform(my, [0, 1], reduced ? [0, 0] : [-8, 8]);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-parchment via-parchment to-[var(--hero-to)] pt-28 pb-16 md:pt-32"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-1/4 top-0 h-[80%] w-[70%] rounded-full bg-gradient-to-br from-saffron-soft/25 via-transparent to-transparent blur-3xl"
          animate={reduced ? undefined : { x: [0, 24, 0], y: [0, 16, 0], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[85%] w-[65%] rounded-full bg-gradient-to-tl from-saffron/20 via-gold-soft/15 to-transparent blur-3xl"
          animate={reduced ? undefined : { x: [0, -20, 0], y: [0, -12, 0], opacity: [0.3, 0.48, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Cursor radial glow */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{ background: `radial-gradient(680px circle at ${cursor.x * 100}% ${cursor.y * 100}%,rgba(244,168,98,0.16),transparent 55%)` }}
        />
      )}

      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]">
        <div className="absolute left-[5%]   top-[20%]   h-72 w-72 rounded-full border border-charcoal" />
        <div className="absolute right-[8%]  top-[12%]   h-96 w-96 rounded-full border border-charcoal" />
        <div className="absolute bottom-[10%] left-[30%] h-48 w-48 rounded-full border border-charcoal" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.12]">
        <div className="h-[min(70vh,620px)] w-[min(88vw,520px)]  rotate-6 rounded-3xl border border-charcoal" />
        <div className="absolute h-[min(65vh,560px)] w-[min(82vw,480px)] -rotate-3 rounded-3xl border border-charcoal" />
      </div>

      {/* Content grid */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 pb-4 sm:gap-7 md:grid md:grid-cols-2 md:items-center md:gap-6 md:px-6 md:pb-0 lg:gap-10">

        {/* Right: feather illustration */}
        <motion.div
          className="order-1 relative flex w-full min-h-[220px] max-w-sm items-center justify-center overflow-visible sm:min-h-[260px] sm:max-w-md md:order-2 md:max-w-none md:min-h-[520px]"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-[min(80%,360px)] w-[min(80%,360px)] rounded-full bg-gradient-to-br from-saffron/25 via-gold-soft/8 to-transparent blur-2xl md:h-[min(90%,480px)] md:w-[min(90%,480px)]" />
          </div>

          <div className="pointer-events-none absolute inset-0 z-[1]">
            <PaperMotes reduced={reduced} />
            <PaperFragments reduced={reduced} />
          </div>

          {literaryTags.map((t) => (
            <motion.div key={t.label}
              className="font-hindi pointer-events-none absolute z-[3] hidden md:block"
              style={{ top: (t as {top?: string}).top, right: (t as {right?: string}).right, bottom: (t as {bottom?: string}).bottom, left: (t as {left?: string}).left }}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: [0, -t.float, 0], filter: "blur(0px)" }}
              transition={{
                opacity: { delay: 0.45 + t.delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 6 + t.delay * 3, repeat: Infinity, ease: "easeInOut", delay: t.delay + 0.5 },
              }}
            >
              <div className="rounded-2xl border border-white/55 dark:border-saffron/20 bg-white/35 dark:bg-zinc-800/60 px-4 py-2.5 text-sm font-semibold text-saffron-deep dark:text-saffron shadow-[0_12px_40px_rgba(224,120,44,0.15)] backdrop-blur-xl ring-1 ring-saffron/15">
                {t.label}
              </div>
            </motion.div>
          ))}

          <LiterarySymbol mx={mx} my={my} reduced={reduced} burst={burst} onFeatherClick={onFeatherClick} interacting={interacting} />

          {/* Scroll indicator */}
          <motion.button
            type="button"
            className="font-body absolute -bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 border-0 bg-transparent text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal-muted md:bottom-0"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Scroll
            <span className="flex h-9 w-6 items-start justify-center rounded-full border border-charcoal/20 bg-white/50 dark:bg-zinc-700/50 p-1 backdrop-blur-sm">
              <span className="mt-1 block h-1.5 w-1 rounded-full bg-saffron" />
            </span>
          </motion.button>
        </motion.div>

        {/* Left: text content */}
        <motion.div
          className="order-2 flex w-full max-w-xl flex-col items-center justify-center text-center md:order-1 md:max-w-none md:items-start md:text-left"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
          }}
        >
                   

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className="font-display text-[clamp(2.8rem,8vw,4.5rem)] font-bold leading-none tracking-tight text-saffron"
          >
            HLAD
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } }}
            className="font-display mx-auto mt-4 max-w-md text-lg font-medium leading-snug text-charcoal md:mx-0 md:text-xl"
          >
            Hindi Literature &amp; Debating Club
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } }}
            className="relative mx-auto mt-6 w-full max-w-lg md:mx-0 md:mt-8"
          >
            <HeroRotatingQuote reduced={reduced} />
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-6 flex flex-wrap justify-center gap-4 md:mt-8 md:justify-start"
          >
            <motion.div whileHover={reduced ? undefined : { y: -1 }} whileTap={reduced ? undefined : { scale: 0.99 }}>
              <a
                href="#events"
                className="font-body inline-flex items-center gap-2 rounded-xl border-2 border-charcoal/85 bg-white/80 dark:bg-zinc-800/80 px-7 py-3.5 text-sm font-semibold text-charcoal dark:text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-saffron hover:text-saffron"
              >
                Explore Events
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
