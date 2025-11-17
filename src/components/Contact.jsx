import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''
const RESUME_URL = import.meta.env.VITE_RESUME_URL || '/resume.pdf'

const categories = [
  'product design',
  'graphic design',
  'photography',
  'digital marketing',
  'cybersecurity',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', category: categories[0] })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.detail || 'Failed to send message')
      }
      setSent(true)
      setForm({ name: '', email: '', message: '', category: categories[0] })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative bg-[#050b1b] text-white py-20">
      {/* torn lights */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker" />
        <div className="absolute bottom-3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flicker-delayed" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold">Contact</h2>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          {/* Direct contact panel */}
          <aside className="lg:col-span-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-xl font-semibold">Prefer direct contact?</h3>
            <p className="mt-2 text-sm text-white/70">Reach me instantly via any of these.</p>
            <div className="mt-4 space-y-3">
              <a href="mailto:raffi@example.com" className="block rounded-md border border-white/10 bg-[#0b1633] px-4 py-2 hover:border-white/40 hover:bg-[#10204a] transition-colors">Email</a>
              <a href="https://www.linkedin.com/in/raffi" target="_blank" rel="noreferrer" className="block rounded-md border border-white/10 bg-[#0b1633] px-4 py-2 hover:border-white/40 hover:bg-[#10204a] transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/raffi" target="_blank" rel="noreferrer" className="block rounded-md border border-white/10 bg-[#0b1633] px-4 py-2 hover:border-white/40 hover:bg-[#10204a] transition-colors">Instagram</a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="block rounded-md border border-white/10 bg-blue-600/90 px-4 py-2 text-white hover:bg-blue-600 transition-colors">Resume</a>
            </div>
          </aside>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-white/70">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="text-sm text-white/70">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell me about your project" />
              </div>

              {error && (
                <div className="mt-4 text-sm text-red-400">{error}</div>
              )}

              <button type="submit" disabled={loading} className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Sending...' : sent ? 'Thanks! I will get back to you.' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`@keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } } .animate-flicker { animation: flicker 6.5s ease-in-out infinite; } .animate-flicker-delayed { animation: flicker 7.5s ease-in-out infinite; }`}</style>
    </section>
  )
}
