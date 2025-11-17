import { Mail, Linkedin, Instagram } from 'lucide-react'

export default function SocialIsland() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-full bg-white/10 backdrop-blur border border-white/10 shadow-lg p-3 flex items-center gap-3 hover:shadow-[0_0_26px_rgba(255,255,255,0.25)] transition-all">
        <a href="mailto:raffialvri23@gmail.com" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Email">
          <Mail size={18} />
        </a>
        <a href="https://www.linkedin.com/in/raffi-alvriansyah-9117081a2/" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href="https://www.instagram.com/echoesofraf/?igsh=MWJ5MHhwNXkxem4xbQ%3D%3D#" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Instagram">
          <Instagram size={18} />
        </a>
      </div>
    </div>
  )
}
