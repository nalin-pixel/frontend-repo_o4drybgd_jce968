import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function SignUpModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const t = await res.json().catch(()=>({detail:'Error'}))
        throw new Error(t?.detail || 'Sign up failed')
      }
      const data = await res.json()
      setMessage('Account created! You can request admin verification later.')
      setForm({ name: '', email: '', password: '' })
    } catch (e) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1633] p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create account</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close">✕</button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm text-white/70">Full name</span>
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane Doe" />
          </label>
          <label className="block">
            <span className="text-sm text-white/70">Email</span>
            <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@example.com" />
          </label>
          <label className="block">
            <span className="text-sm text-white/70">Password</span>
            <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required minLength={6} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
          </label>
          {message && <div className="text-sm text-white/80">{message}</div>}
          <div className="pt-2 flex items-center gap-3">
            <button disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 disabled:opacity-60">{loading? 'Creating…' : 'Sign up'}</button>
            <button type="button" onClick={onClose} className="text-sm text-white/70 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
