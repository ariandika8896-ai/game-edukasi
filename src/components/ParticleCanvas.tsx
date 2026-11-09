import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  alpha: number
  pulseSpeed: number
  color: string
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []
    const maxParticles = 22

    const resize = () => {
      canvas.width = canvas.offsetWidth || 430
      canvas.height = canvas.offsetHeight || 764
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.72),
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15,
      alpha: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.4 ? '255, 235, 120' : '255, 255, 255',
    })

    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle())
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.015
        if (p.alpha < 0.1) p.alpha = 0.1
        if (p.alpha > 0.9) p.alpha = 0.9

        if (p.y < 0 || p.x < 0 || p.x > canvas.width) {
          Object.assign(p, createParticle(), { y: canvas.height * 0.72 })
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.shadowBlur = 6
        ctx.shadowColor = `rgba(${p.color}, 0.8)`
        ctx.fill()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}
