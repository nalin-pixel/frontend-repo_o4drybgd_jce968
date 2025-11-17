import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function SubmitTestimonialModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', role: '', company: '', rating: 5, quote: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setMessage('')
      setDone(false)
      // focus first input on open
      setTimeout(() => {
        const el = document.getElementById('submit-testimonial-name')
        el?.focus()
      }, 50)
    }
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const payload = { ...form, rating: Number(form.rating || 5) }
      const res = await fetch(`${API}/api/testimonials/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setDone(true)
      onSuccess?.()
    } catch (e) {
      setMessage(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto rounded-2xl border border-white/10 bg-[#0b1633] p-6 text-white shadow-2xl">
        {done ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Thank you!</h3>
            <p className="text-white/70 text-sm">Your testimonial was submitted and is awaiting review. Once approved, it will appear here.</p>
            <button onClick={onClose} className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add your testimonial</h3>
              <button type="button" onClick={onClose} className="text-white/60 hover:text-white">✕</button>
            </div>

            <label className="block">
              <span className="text-sm text-white/70">Name</span>
              <input id="submit-testimonial-name" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 w-full rounded-md bg-[#0f1a3d] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
            </label>

            <label className="block">
              <span className="text-sm text-white/70">Position / Role</span>
              <input value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="mt-1 w-full rounded-md bg-[#0f1a3d] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Product Manager" />
            </label>

            <label className="block">
              <span className="text-sm text-white/70">Company</span>
              <input value={form.company} onChange={e=>setForm({...form, company:e.target.value})} className="mt-1 w-full rounded-md bg-[#0f1a3d] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your company" />
            </label>

            <label className="block">
              <span className="text-sm text-white/70">Star rating</span>
              <select value={form.rating} onChange={e=>setForm({...form, rating: e.target.value})} className="mt-1 w-full rounded-md bg-[#0f1a3d] border border-white/10 px-3 py-2 text-white focus:outline-none">
                {[5,4,3,2,1,0].map(n => <option key={n} value={n}>{n} {n===1? 'star' : 'stars'}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-white/70">Message</span>
              <textarea required rows={4} value={form.quote} onChange={e=>setForm({...form, quote:e.target.value})} className="mt-1 w-full rounded-md bg-[#0f1a3d] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Share your experience" />
            </label>

            {message && <div className="text-sm text-red-300">{message}</div>}

            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={onClose} className="rounded-md bg-white/10 px-4 py-2 text-sm">Cancel</button>
              <button disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold">{loading? 'Submitting…' : 'Submit'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
