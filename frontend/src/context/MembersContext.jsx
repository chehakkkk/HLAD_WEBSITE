"use client";
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MEMBER_CATEGORIES } from '../constants/hlad'

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

const seedMembers = [
  {
    id: 'm-seed-1',
    name: 'डॉ. अनन्या शर्मा',
    role: 'President',
    bio: 'नियोजित भाषा कार्यक्रमों की अगुवाई और साहित्यिक संवाद को समृद्ध करना।',
    image: '',
    interests: ['आधुनिक कविता', 'अनुवाद', 'संवाद'],
    social: { email: 'ananya@example.edu', instagram: '', twitter: '' },
    category: 'Core Team',
    featured: true,
  },
  {
    id: 'm-seed-2',
    name: 'रोहन वर्मा',
    role: 'Lead Writer',
    bio: 'गद्य और निबंध पर कार्यशालाएँ; पुस्तक चर्चा सत्रों के संयोजक।',
    image: '',
    interests: ['निबंध', 'पुस्तक चर्चा'],
    social: { email: '', instagram: '@rohanwrites', twitter: '' },
    category: 'Writers',
    featured: true,
  },
  {
    id: 'm-seed-3',
    name: 'मीरा कृष्णन',
    role: 'Poet-in-Residence',
    bio: 'छायावाद से समकालीन ध्वनियों तक — काव्य पाठ और मंच संचालन।',
    image: '',
    interests: ['छायावाद', 'मुक्त छंद'],
    social: { email: 'meera@example.edu', instagram: '', twitter: '' },
    category: 'Poets',
    featured: false,
  },
  {
    id: 'm-seed-4',
    name: 'अर्जुन पाटिल',
    role: 'Volunteer Coordinator',
    bio: 'कार्यक्रम लॉजिस्टिक्स, स्वागत डेस्क, और सदस्य ऑनबोर्डिंग।',
    image: '',
    interests: ['कार्यक्रम', 'समुदाय'],
    social: { email: '', instagram: '', twitter: '' },
    category: 'Volunteers',
    featured: false,
  },
  {
    id: 'm-seed-5',
    name: 'स्नेहा रेड्डी',
    role: 'Alumni Mentor',
    bio: 'स्नातक नेटवर्क से जुड़े मार्गदर्शन सत्र और करियर संवाद।',
    image: '',
    interests: ['संवाद', 'मार्गदर्शन'],
    social: { email: 'sneha@example.com', instagram: '@sneha.r', twitter: '' },
    category: 'Alumni',
    featured: false,
  },
]

function normalizeMember(m) {
  if (!m || typeof m !== 'object') return null
  return {
    id: m.id || uid(),
    name: String(m.name || '').trim() || 'Member',
    role: String(m.role || '').trim() || 'Member',
    bio: String(m.bio || '').trim(),
    image: typeof m.image === 'string' ? m.image : '',
    interests: Array.isArray(m.interests) ? m.interests.map(String) : [],
    social: {
      email: String(m.social?.email || ''),
      instagram: String(m.social?.instagram || ''),
      twitter: String(m.social?.twitter || ''),
    },
    category: MEMBER_CATEGORIES.includes(m.category) ? m.category : 'Volunteers',
    featured: Boolean(m.featured),
  }
}

const MembersContext = createContext(null)

export function MembersProvider({ children }) {
  const [members, setMembers] = useState(() => [...seedMembers])

  const addMember = useCallback((payload) => {
    const m = normalizeMember({ ...payload, id: uid() })
    if (!m) return null
    setMembers((prev) => [...prev, m])
    return m.id
  }, [])

  const updateMember = useCallback((id, payload) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m
        const merged = {
          ...m,
          ...payload,
          id,
          social: { ...m.social, ...(payload.social || {}) },
        }
        return normalizeMember(merged) || m
      }),
    )
  }, [])

  const removeMember = useCallback((id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const setFeatured = useCallback((id, featured) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, featured: Boolean(featured) } : m)))
  }, [])

  const value = useMemo(
    () => ({ members, addMember, updateMember, removeMember, setFeatured }),
    [members, addMember, updateMember, removeMember, setFeatured],
  )

  return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
}

export function useMembers() {
  const ctx = useContext(MembersContext)
  if (!ctx) throw new Error('useMembers must be used within MembersProvider')
  return ctx
}