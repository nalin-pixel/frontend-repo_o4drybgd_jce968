import { useEffect, useRef, useState } from 'react'

// Displays glowing key badges for currently pressed keys
export default function KeyGlowOverlay() {
  const [activeKeys, setActiveKeys] = useState({})
  const timersRef = useRef({})

  useEffect(() => {
    const onDown = (e) => {
      const key = normalizeKey(e)
      if (!key) return
      setActiveKeys(prev => ({ ...prev, [key]: Date.now() }))
      clearTimeout(timersRef.current[key])
      timersRef.current[key] = setTimeout(() => {
        setActiveKeys(prev => { const p = { ...prev }; delete p[key]; return p })
      }, 800)
    }
    const onUp = (e) => {
      const key = normalizeKey(e)
      if (!key) return
      clearTimeout(timersRef.current[key])
      timersRef.current[key] = setTimeout(() => {
        setActiveKeys(prev => { const p = { ...prev }; delete p[key]; return p })
      }, 150)
    }

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      Object.values(timersRef.current).forEach(clearTimeout)
    }
  }, [])

  const keys = Object.keys(activeKeys)
  if (keys.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex w-full justify-center">
      <div className="flex flex-wrap items-center gap-2">
        {keys.slice(0, 12).map((k) => (
          <span
            key={k}
            className="relative select-none rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.45)] ring-1 ring-cyan-400/30 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 20px rgba(34,211,238,0.45), inset 0 0 12px rgba(34,211,238,0.25)'
            }}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  )
}

function normalizeKey(e) {
  if (!e || !e.key) return ''
  const k = e.key
  if (k === ' ') return 'Space'
  if (k === 'Meta') return navigator.platform.includes('Mac') ? '⌘' : 'Win'
  if (k === 'Control') return 'Ctrl'
  if (k === 'AltGraph') return 'AltGr'
  if (k.length === 1) return k.toUpperCase()
  return k
}
