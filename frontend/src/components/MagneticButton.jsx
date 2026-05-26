"use client";
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function MagneticButton({ children, className = '', href, strength = 0.22, ...rest }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduced = usePrefersReducedMotion()
  const Tag = href ? motion.a : motion.button

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const onLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      style={{ x: pos.x, y: pos.y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="inline-block"
    >
      <Tag
        href={href}
        type={href ? undefined : 'button'}
        className={className}
        whileHover={reduced ? undefined : { scale: 1.02 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        {...rest}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
