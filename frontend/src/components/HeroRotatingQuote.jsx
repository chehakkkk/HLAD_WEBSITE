import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from './SplitText'

const HINDI_QUOTES = [
  {
    hindi: 'निज भाषा उन्नति अहै, सब उन्नति को मूल ।',
    english: "Progress of one's own language is the root of all progress.",
  },
  {
    hindi: 'साहित्य समाज का दर्पण है।',
    english: 'Literature is the mirror of society.',
  },
  {
    hindi: 'विचारों की स्वतंत्रता ही सृजन है।',
    english: 'Freedom of thought is creation itself.',
  },
  {
    hindi: 'शब्द आत्मा की अभिव्यक्ति हैं।',
    english: 'Words are the expression of the soul.',
  },
]

const ROTATE_MS = 5500

const splitFrom = { opacity: 0, y: 30, filter: 'blur(10px)' }
const splitTo = { opacity: 1, y: 0, filter: 'blur(0px)' }

export default function HeroRotatingQuote({ reduced = false }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HINDI_QUOTES.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [reduced])

  const quote = HINDI_QUOTES[index]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/80 border-l-4 border-saffron bg-white/70 p-6 pl-6 shadow-[0_20px_60px_rgba(42,34,28,0.1)] ring-1 ring-saffron/10 backdrop-blur-xl md:pl-7">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-saffron/25 to-transparent blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-tr from-gold-soft/20 to-transparent blur-xl"
        aria-hidden
      />

      <div className="relative min-h-[3.5rem] w-full md:min-h-[4rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hindi-${index}`}
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {reduced ? (
              <p className="font-hindi text-center text-lg leading-relaxed text-charcoal md:text-left md:text-xl">
                {quote.hindi}
              </p>
            ) : (
              <SplitText
                key={`split-${index}`}
                text={quote.hindi}
                tag="p"
                className="font-hindi w-full text-lg leading-relaxed text-charcoal md:text-xl"
                splitType="chars"
                delay={40}
                duration={0.8}
                ease="power3.out"
                textAlign="center"
                animateOnMount
                from={splitFrom}
                to={splitTo}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={`en-${index}`}
          className="font-display relative mt-3 text-center text-base italic leading-relaxed text-charcoal-muted md:text-left"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          &ldquo;{quote.english}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
