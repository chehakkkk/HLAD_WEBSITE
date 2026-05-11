import { useState } from 'react'
import { motion } from 'framer-motion'
import { MEMBER_CATEGORIES } from '../../constants/hlad'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function readImageFile(file, maxBytes) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      resolve('')
      return
    }
    if (file.size > maxBytes) {
      reject(new Error('Image too large (max 900 KB).'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = () => reject(new Error('Read failed'))
    reader.readAsDataURL(file)
  })
}

const emptyForm = {
  name: '',
  role: '',
  bio: '',
  image: '',
  interests: '',
  category: 'Volunteers',
  featured: false,
  email: '',
  instagram: '',
  twitter: '',
}

function buildForm(mode, member) {
  if (mode === 'edit' && member) {
    return {
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image || '',
      interests: (member.interests || []).join(', '),
      category: member.category,
      featured: member.featured,
      email: member.social?.email || '',
      instagram: member.social?.instagram || '',
      twitter: member.social?.twitter || '',
    }
  }
  return { ...emptyForm }
}

export default function MemberEditorModal({ mode, member, onClose, onSave }) {
  const reduced = usePrefersReducedMotion()
  const [form, setForm] = useState(() => buildForm(mode, member))
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.role.trim()) {
      setErr('Name and role are required.')
      return
    }
    const interests = form.interests
      .split(/[,，]/)
      .map((s) => s.trim())
      .filter(Boolean)
    onSave({
      name: form.name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      image: form.image || '',
      interests,
      category: form.category,
      featured: form.featured,
      social: {
        email: form.email.trim(),
        instagram: form.instagram.trim(),
        twitter: form.twitter.trim(),
      },
    })
    onClose()
  }

  const onFile = async (e) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    setErr('')
    try {
      const data = await readImageFile(f, 900_000)
      setForm((s) => ({ ...s, image: data }))
    } catch (er) {
      setErr(er.message || 'Upload error')
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/45 p-4 backdrop-blur-md sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.form
        initial={reduced ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/60 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl font-bold text-charcoal">{mode === 'edit' ? 'Edit member' : 'Add member'}</h2>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            Name
            <input
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              className="font-hindi mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
              required
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            Role
            <input
              value={form.role}
              onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
              required
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            Category
            <select
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
            >
              {MEMBER_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((s) => ({ ...s, featured: e.target.checked }))}
            />
            Featured on directory
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            Bio
            <textarea
              value={form.bio}
              onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
              rows={3}
              className="font-hindi mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm leading-relaxed"
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            Literary interests (comma separated)
            <input
              value={form.interests}
              onChange={(e) => setForm((s) => ({ ...s, interests: e.target.value }))}
              className="font-hindi mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            Portrait
            <input type="file" accept="image/*" onChange={onFile} className="mt-1 block w-full text-xs" />
            {form.image && <img src={form.image} alt="" className="mt-2 h-24 w-24 rounded-xl border object-cover" />}
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted">
            Email
            <input
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted">
            Instagram
            <input
              value={form.instagram}
              onChange={(e) => setForm((s) => ({ ...s, instagram: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-charcoal-muted sm:col-span-2">
            Twitter / X
            <input
              value={form.twitter}
              onChange={(e) => setForm((s) => ({ ...s, twitter: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-charcoal/12 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-charcoal/15 px-4 py-2 text-sm font-semibold">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-saffron px-4 py-2 text-sm font-semibold text-white">
            Save
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}
