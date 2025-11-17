import { useEffect, useRef } from 'react'

// Lightweight hyperspeed/starfield effect using canvas
export default function HyperdriveBackground({ density = 140, speed = 0.9 }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const starsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    const createStars = () => {
      const cx = w / 2
      const cy = h / 2
      const maxZ = 1
      const minZ = 0.05
      starsRef.current = Array.from({ length: density }).map(() => ({
        x: (Math.random() - 0.5) * w,
        y: (Math.random() - 0.5) * h,
        z: Math.random() * (maxZ - minZ) + minZ,
      }))

      const draw = () => {
        ctx.fillStyle = 'rgba(5,11,27,0.75)'
        ctx.fillRect(0, 0, w, h)

        for (let i = 0; i < starsRef.current.length; i++) {
          const s = starsRef.current[i]
          // Project to screen
          const k = 200 / s.z
          const px = cx + s.x * k
          const py = cy + s.y * k

          // Trail length based on depth
          const len = Math.max(8, 40 * (1 - s.z))
          const angle = Math.atan2(py - cy, px - cx)
          const tx = px - Math.cos(angle) * len
          const ty = py - Math.sin(angle) * len

          const alpha = Math.min(1, 1.2 - s.z)
          const width = Math.max(1, 2.5 * (1 - s.z))

          const grad = ctx.createLinearGradient(tx, ty, px, py)
          grad.addColorStop(0, `rgba(255,255,255,0)`) 
          grad.addColorStop(1, `rgba(255,255,255,${alpha})`)
          ctx.strokeStyle = grad
          ctx.lineWidth = width
          ctx.beginPath()
          ctx.moveTo(tx, ty)
          ctx.lineTo(px, py)
          ctx.stroke()

          // Move star toward viewer
          s.z -= speed * 0.015
          if (s.z <= 0.02 || px < -100 || px > w + 100 || py < -100 || py > h + 100) {
            // reset star
            s.x = (Math.random() - 0.5) * w
            s.y = (Math.random() - 0.5) * h
            s.z = 1
          }
        }
        animationRef.current = requestAnimationFrame(draw)
      }

      cancelAnimationFrame(animationRef.current)
      animationRef.current = requestAnimationFrame(draw)
    }

    createStars()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [density, speed])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(0.3px) brightness(1.05)' }}
    />
  )
}
