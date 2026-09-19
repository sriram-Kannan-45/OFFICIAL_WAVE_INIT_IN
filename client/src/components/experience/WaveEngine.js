/**
 * WaveEngine — lightweight custom 3D canvas engine for WAVE INIT.
 * Particle wave field, neural node constellation, depth projection,
 * scroll-driven camera, mouse parallax. No dependencies.
 */
export default class WaveEngine {
  constructor(canvas, opts = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.opts = Object.assign(
      {
        color: '34, 197, 94',
        density: 1, // multiplier, lower on mobile
        waveAmp: 42,
        waveLen: 0.011,
        speed: 0.6,
        showNodes: true,
        showWave: true,
        fog: 1400,
      },
      opts
    )
    this.scroll = 0        // 0..1 global page progress
    this.sectionProgress = 0
    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    this.time = 0
    this.running = false
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this._resize = this.resize.bind(this)
    this._loop = this.loop.bind(this)
    window.addEventListener('resize', this._resize)
    window.addEventListener('mousemove', (e) => {
      this.mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      this.mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    })
    this.resize()
  }

  resize() {
    const w = this.canvas.clientWidth
    const h = this.canvas.clientHeight
    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.w = w
    this.h = h
    this.initParticles()
  }

  initParticles() {
    const count = Math.floor(((this.w * this.h) / 14000) * this.opts.density)
    this.particles = []
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),          // depth 0(near)..1(far)
        s: Math.random() * 1.6 + 0.4,
        tw: Math.random() * Math.PI * 2,
      })
    }
    // neural constellation nodes
    this.nodes = []
    const n = Math.floor(26 * this.opts.density)
    for (let i = 0; i < n; i++) {
      this.nodes.push({
        x: Math.random(),
        y: Math.random() * 0.55,
        z: Math.random(),
        s: Math.random() * 2 + 1,
      })
    }
    this.nodeLinks = []
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x
        const dy = this.nodes[i].y - this.nodes[j].y
        if (Math.hypot(dx, dy) < 0.16) this.nodeLinks.push([i, j])
      }
    }
  }

  setScroll(progress) {
    this.scroll = Math.max(0, Math.min(1, progress))
  }

  start() {
    if (this.running) return
    this.running = true
    this._raf = requestAnimationFrame(this._loop)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this._raf)
  }

  destroy() {
    this.stop()
    window.removeEventListener('resize', this._resize)
  }

  project(nx, ny, z, camZ) {
    // simple perspective: camZ zooms in as scroll advances
    const d = 1 / (1 + (z + camZ) * 0.9)
    const cx = this.w / 2 + (this.mouse.x * 24) / (1 + z)
    const cy = this.h / 2 + (this.mouse.y * 16) / (1 + z)
    return {
      x: cx + (nx - 0.5) * this.w * 1.4 * d,
      y: cy + (ny - 0.5) * this.h * 1.4 * d,
      d,
    }
  }

  loop() {
    if (!this.running) return
    const { ctx, w, h } = this
    this.time += 0.016 * this.opts.speed
    // smooth mouse
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.05
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.05

    ctx.clearRect(0, 0, w, h)
    const camZ = this.scroll * 1.6 // camera dollies forward with scroll
    const fade = 1 - this.scroll * 0.6

    // --- particle field (parallax layers) ---
    if (this.particles) {
      for (const p of this.particles) {
        p.tw += 0.03
        const drift = Math.sin(this.time * 0.5 + p.tw) * 0.008
        const pr = this.project(p.x + drift, p.y + Math.sin(this.time + p.z * 6) * 0.01, p.z, camZ)
        if (pr.y < -40 || pr.y > h + 40) continue
        const alpha = (0.25 + p.z * 0.5) * fade * (0.6 + 0.4 * Math.sin(p.tw))
        ctx.fillStyle = `rgba(${this.opts.color}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(pr.x, pr.y, p.s * pr.d, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // --- neural constellation ---
    if (this.opts.showNodes && this.nodes) {
      ctx.lineWidth = 0.6
      for (const [a, b] of this.nodeLinks) {
        const pa = this.project(this.nodes[a].x, this.nodes[a].y, this.nodes[a].z, camZ)
        const pb = this.project(this.nodes[b].x, this.nodes[b].y, this.nodes[b].z, camZ)
        ctx.strokeStyle = `rgba(${this.opts.color}, ${(0.10 * fade).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
      }
      for (const n of this.nodes) {
        const pr = this.project(n.x, n.y, n.z, camZ)
        ctx.fillStyle = `rgba(${this.opts.color}, ${(0.5 * fade).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(pr.x, pr.y, n.s * pr.d, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // --- digital wave lines ---
    if (this.opts.showWave) {
      for (let l = 0; l < 3; l++) {
        ctx.beginPath()
        const baseY = h * (0.62 + l * 0.09) + this.mouse.y * (8 + l * 6)
        for (let x = 0; x <= w; x += 6) {
          const y =
            baseY +
            Math.sin(x * this.opts.waveLen + this.time * (1 + l * 0.3) + l * 2) * this.opts.waveAmp * (1 - l * 0.25) +
            Math.sin(x * 0.004 - this.time * 0.8) * 10
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const a = (0.5 - l * 0.13) * fade
        ctx.strokeStyle = `rgba(${this.opts.color}, ${a.toFixed(3)})`
        ctx.lineWidth = l === 0 ? 1.8 : 1
        ctx.stroke()
        // glow pass
        ctx.strokeStyle = `rgba(${this.opts.color}, ${(a * 0.3).toFixed(3)})`
        ctx.lineWidth = 6
        ctx.stroke()
      }
    }

    this._raf = requestAnimationFrame(this._loop)
  }
}
