import { useState } from 'react'
import { Mail, Linkedin, Instagram } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="relative bg-[#050b1b] text-white py-20">
      {/* torn lights */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flicker" />
        <div className="absolute bottom-3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flicker-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Contact</h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-10">
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
              <label className="text-sm text-white/70">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-1 w-full rounded-md bg-[#0b1633] border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell me about your project" />
            </div>
            <button type="submit" className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all">
              {sent ? 'Thanks! I will get back to you.' : 'Send message'}
            </button>
          </form>

          <div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all">
              <div className="text-white/80">Prefer direct contact?</div>
              <div className="mt-4 flex items-center gap-4">
                <a href="mailto:raffialvri23@gmail.com" className="inline-flex items-center gap-2 text-white/80 hover:text-white"><Mail size={18}/> Email</a>
                <a href="https://www.linkedin.com/in/raffi-alvriansyah-9117081a2/" target="_blank" className="inline-flex items-center gap-2 text-white/80 hover:text-white"><Linkedin size={18}/> LinkedIn</a>
                <a href="https://www.instagram.com/echoesofraf/?igsh=MWJ5MHhwNXkxem4xbQ%3D%3D#" target="_blank" className="inline-flex items-center gap-2 text-white/80 hover:text-white"><Instagram size={18}/> Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes flicker { 0%, 100% { opacity: .9 } 50% { opacity: .4 } } .animate-flicker { animation: flicker 6.5s ease-in-out infinite; } .animate-flicker-delayed { animation: flicker 7.5s ease-in-out infinite; }`}</style>
    </section>
  )
}
