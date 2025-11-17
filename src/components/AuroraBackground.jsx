import { useEffect, useRef } from 'react'

// Animated aurora gradient using canvas for buttery-smooth color waves
export default function AuroraBackground({ className = '' }) {
  const ref = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    const colors = [
      [14, 165, 233], // sky-500
      [59, 130, 246], // blue-500
      [147, 51, 234], // purple-600
      [6, 182, 212], // cyan-500
    ]

    const blobs = Array.from({ length: 4 }).map((_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.max(w, h) * (0.35 + Math.random() * 0.25),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      c: colors[i % colors.length],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        grad.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.08)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()

        b.x += b.vx
        b.y += b.vy
        if (b.x < -b.r) b.x = w + b.r
        if (b.x > w + b.r) b.x = -b.r
        if (b.y < -b.r) b.y = h + b.r
        if (b.y > h + b.r) b.y = -b.r
      }
      raf.current = requestAnimationFrame(draw)
    }

    raf.current = requestAnimationFrame(draw)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas ref={ref} className={`absolute inset-0 w-full h-full ${className}`} style={{ filter: 'blur(30px) saturate(1.1)', opacity: 0.6 }} />
  )
}
