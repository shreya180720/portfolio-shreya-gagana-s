'use client';

import { useEffect, useRef, useState } from 'react';

interface Vec2 { x: number; y: number }

class P {
  pos: Vec2       = { x: 0, y: 0 }
  vel: Vec2       = { x: 0, y: 0 }
  acc: Vec2       = { x: 0, y: 0 }
  target: Vec2    = { x: 0, y: 0 }
  closeEnoughTarget = 80
  maxSpeed = 5
  maxForce = 0.08
  isKilled = false
  startColor  = { r: 255, g: 255, b: 255 }
  targetColor = { r: 255, g: 255, b: 255 }
  colorWeight    = 0
  colorBlendRate = 0.025

  move() {
    let prox = 1
    const dx   = this.target.x - this.pos.x
    const dy   = this.target.y - this.pos.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < this.closeEnoughTarget) prox = dist / this.closeEnoughTarget
    const mag = dist || 1
    const tx  = (dx / mag) * this.maxSpeed * prox
    const ty  = (dy / mag) * this.maxSpeed * prox
    const sx  = tx - this.vel.x
    const sy  = ty - this.vel.y
    const sm  = Math.sqrt(sx * sx + sy * sy) || 1
    this.acc.x += (sx / sm) * this.maxForce
    this.acc.y += (sy / sm) * this.maxForce
    this.vel.x += this.acc.x; this.vel.y += this.acc.y
    this.pos.x += this.vel.x; this.pos.y += this.vel.y
    this.acc.x = 0; this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1) this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1)
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)
    const alpha = this.isKilled ? Math.max(0, 1 - Math.min(1, this.colorWeight * 2)) : 1
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
  }

  kill(w: number, h: number) {
    if (!this.isKilled) {
      const cx = w / 2, cy = h / 2
      const rx = (Math.random() - 0.5) * w * 2
      const ry = (Math.random() - 0.5) * h * 2
      const mag = Math.sqrt(rx * rx + ry * ry) || 1
      const scale = (w + h) / 2
      this.target = { x: cx + (rx / mag) * scale, y: cy + (ry / mag) * scale }
      this.startColor = {
        r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
        g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
        b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
      }
      this.targetColor = { r: 255, g: 255, b: 255 }
      this.colorWeight = 0
      this.isKilled    = true
    }
  }
}

const CANVAS_H    = 110
const PIXEL_STEPS = 6
const BASE_FONT   = 52
const HOLD_MS     = 2800
const VAPORIZE_MS = 1300

type Phase = 'idle' | 'assembling' | 'vaporizing' | 'static'

function randomScatter(cx: number, cy: number, w: number, h: number): Vec2 {
  const rx  = (Math.random() - 0.5) * w
  const ry  = (Math.random() - 0.5) * h
  const mag = Math.sqrt(rx * rx + ry * ry) || 1
  const scale = (w + h) / 2
  return { x: cx + (rx / mag) * scale, y: cy + (ry / mag) * scale }
}

function computeFontSize(w: number, text: string): number {
  const off  = document.createElement('canvas')
  off.width  = w
  off.height = CANVAS_H
  const octx = off.getContext('2d')!
  let fs     = BASE_FONT
  octx.font  = `900 ${fs}px Poppins, sans-serif`
  const measured = octx.measureText(text).width
  if (measured > w * 0.92) fs = Math.floor(fs * (w * 0.92) / measured)
  return fs
}

function buildParticles(
  canvas: HTMLCanvasElement,
  text: string,
  fontSize: number,
  particlesRef: React.MutableRefObject<P[]>,
) {
  const w = canvas.width
  const h = CANVAS_H

  const off     = document.createElement('canvas')
  off.width     = w
  off.height    = h
  const octx    = off.getContext('2d')!
  octx.clearRect(0, 0, w, h)
  octx.fillStyle    = 'white'
  octx.font         = `900 ${fontSize}px Poppins, sans-serif`
  octx.textAlign    = 'center'
  octx.textBaseline = 'middle'
  octx.fillText(text, w / 2, h / 2)

  const imageData = octx.getImageData(0, 0, w, h)
  const pixels    = imageData.data
  const particles = particlesRef.current
  let   pIdx      = 0

  const coords: number[] = []
  for (let i = 0; i < pixels.length; i += PIXEL_STEPS * 4) coords.push(i)
  for (let i = coords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[coords[i], coords[j]] = [coords[j], coords[i]]
  }

  for (const ci of coords) {
    if (pixels[ci + 3] > 0) {
      const x = (ci / 4) % w
      const y = Math.floor(ci / 4 / w)
      let p: P
      if (pIdx < particles.length) {
        p = particles[pIdx]; p.isKilled = false; pIdx++
      } else {
        p = new P()
        const sp   = randomScatter(w / 2, h / 2, w, h)
        p.pos      = { ...sp }
        p.maxSpeed = Math.random() * 5 + 3
        p.maxForce = p.maxSpeed * 0.05
        p.colorBlendRate = Math.random() * 0.025 + 0.005
        particles.push(p)
      }
      p.startColor = {
        r: Math.round(p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight),
        g: Math.round(p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight),
        b: Math.round(p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight),
      }
      p.targetColor = { r: 255, g: 255, b: 255 }
      p.colorWeight = 0
      p.target      = { x, y }
    }
  }
  for (let i = pIdx; i < particles.length; i++) particles[i].kill(w, h)
}

interface Props { text: string }

export function CinematicHeading({ text }: Props) {
  const canvasRef      = useRef<HTMLCanvasElement>(null)
  const particlesRef   = useRef<P[]>([])
  const animRef        = useRef<number>()
  const phaseRef       = useRef<Phase>('idle')
  const vaporTimerRef  = useRef<ReturnType<typeof setTimeout>>()
  const staticTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const stopTimerRef   = useRef<ReturnType<typeof setTimeout>>()

  const [showStatic,   setShowStatic]   = useState(false)
  const [canvasHidden, setCanvasHidden] = useState(false)
  const [fontSize,     setFontSize]     = useState(BASE_FONT)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function startAnimation() {
      if (!canvas || phaseRef.current !== 'idle') return
      phaseRef.current = 'assembling'

      canvas.width  = canvas.offsetWidth || window.innerWidth
      canvas.height = CANVAS_H

      const fs = computeFontSize(canvas.width, text)
      setFontSize(fs)
      buildParticles(canvas, text, fs, particlesRef)

      const loop = () => {
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i]
          p.move()
          p.draw(ctx)
          if (p.isKilled && (p.pos.x < 0 || p.pos.x > canvas.width || p.pos.y < 0 || p.pos.y > canvas.height)) {
            particlesRef.current.splice(i, 1)
          }
        }
        animRef.current = requestAnimationFrame(loop)
      }
      animRef.current = requestAnimationFrame(loop)

      vaporTimerRef.current = setTimeout(() => {
        if (!canvas) return
        phaseRef.current = 'vaporizing'
        particlesRef.current.forEach(p => p.kill(canvas.width, canvas.height))

        staticTimerRef.current = setTimeout(() => {
          phaseRef.current = 'static'
          setShowStatic(true)
          setCanvasHidden(true)

          stopTimerRef.current = setTimeout(() => {
            if (animRef.current) cancelAnimationFrame(animRef.current)
          }, 600)
        }, VAPORIZE_MS)
      }, HOLD_MS)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(canvas)

    const onResize = () => {
      if (!canvas || phaseRef.current !== 'assembling') return
      canvas.width  = canvas.offsetWidth || window.innerWidth
      canvas.height = CANVAS_H
      const fs = computeFontSize(canvas.width, text)
      setFontSize(fs)
      buildParticles(canvas, text, fs, particlesRef)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      observer.disconnect()
      if (animRef.current) cancelAnimationFrame(animRef.current)
      clearTimeout(vaporTimerRef.current)
      clearTimeout(staticTimerRef.current)
      clearTimeout(stopTimerRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [text])

  return (
    <div style={{ position: 'relative', width: '100%', height: `${CANVAS_H}px` }}>
      <canvas
        ref={canvasRef}
        style={{
          position:      'absolute',
          inset:         0,
          width:         '100%',
          height:        `${CANVAS_H}px`,
          display:       'block',
          opacity:       canvasHidden ? 0 : 1,
          transition:    'opacity 0.5s ease-out',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          opacity:        showStatic ? 1 : 0,
          transition:     'opacity 1.1s ease-in',
          pointerEvents:  'none',
        }}
      >
        <span
          className="font-poppins font-black text-white text-center"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
