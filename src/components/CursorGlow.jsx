import { useEffect, useRef } from 'react'

export default function CursorGlow({ color = '255,255,255', size = 240, intensity = 0.08 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [size])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[5] mix-blend-screen"
      style={{ width: size, height: size, filter: 'blur(40px)' }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${color}, ${intensity}) 0%, rgba(${color}, 0) 60%)`,
        }}
      />
    </div>
  )
}
