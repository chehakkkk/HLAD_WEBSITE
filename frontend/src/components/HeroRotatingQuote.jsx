import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DecryptedText from './DecryptedText'

const HINDI_QUOTES = [
  {
    hindi: 'निज भाषा उन्नति अहै, सब उन्नति को मूल ।',
    english: 'Progress of one\'s own language is the root of all progress.',
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

      <div className="relative min-h-[3.25rem] md:min-h-[3.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hindi-${index}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-hindi text-lg leading-relaxed text-charcoal md:text-xl">
              {reduced ? (
                quote.hindi
              ) : (
                <DecryptedText
                  key={`decrypt-${index}`}
                  text={quote.hindi}
                  animateOn="view"
                  sequential
                  revealDirection="center"
                  speed={40}
                  maxIterations={15}
                  useOriginalCharsOnly
                  parentClassName="block w-full"
                  className="text-charcoal"
                  encryptedClassName="text-saffron/35"
                />
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={`en-${index}`}
          className="font-display relative mt-3 text-base italic leading-relaxed text-charcoal-muted"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        >
          &ldquo;{quote.english}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
