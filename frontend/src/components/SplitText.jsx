"use client";
/**
 * SplitText – Framer Motion implementation.
 * Drop-in replacement for the GSAP SplitText version.
 * Accepts the same props used by HeroRotatingQuote.
 */
import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function SplitText({
  text = '',
  tag = 'p',
  className = '',
  delay = 40,
  duration = 0.8,
  ease = 'easeOut',
  from = { opacity: 0, y: 20, filter: 'blur(8px)' },
  to   = { opacity: 1, y: 0,  filter: 'blur(0px)' },
  textAlign = 'left',
  animateOnMount = false,
}) {
  const chars = useMemo(() => {
    const segmenter = new Intl.Segmenter("hi", { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), s => s.segment)
  }, [text])

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  }

  const charVariant = {
    hidden: from,
    visible: {
      ...to,
      transition: { duration, ease },
    },
  }

  const Tag = tag
  const style = {
    textAlign,
    display: textAlign === 'left' || textAlign === 'right' ? 'block' : 'inline-block',
    width:   textAlign === 'left' || textAlign === 'right' ? '100%' : undefined,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate={animateOnMount ? 'visible' : undefined}
      whileInView={animateOnMount ? undefined : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
    >
      <Tag className={`split-parent ${className}`} style={style}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={charVariant}
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </Tag>
    </motion.span>
  )
}
