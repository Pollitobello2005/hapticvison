"use client"

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl"
import { useEffect, useRef, useState, useCallback } from "react"
import "./CircularGallery.css"

/* ─── Utilities ──────────────────────────────────────────────────────────── */
function debounce<T extends (...args: unknown[]) => void>(fn: T, wait: number) {
  let t: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait) }
}

function lerp(p1: number, p2: number, t: number) { return p1 + (p2 - p1) * t }

function autoBind(instance: object) {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof (instance as any)[key] === "function") {
      ;(instance as any)[key] = (instance as any)[key].bind(instance)
    }
  })
}

function createTextTexture(
  gl: WebGLRenderingContext,
  text: string,
  font = "bold 30px monospace",
  color = "black"
) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!
  ctx.font = font
  const m = ctx.measureText(text)
  canvas.width  = Math.ceil(m.width) + 20
  canvas.height = Math.ceil(parseInt(font, 10) * 1.2) + 20
  ctx.font = font
  ctx.fillStyle = color
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl as any, { generateMipmaps: false })
  ;(texture as any).image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

/* ─── Title ──────────────────────────────────────────────────────────────── */
class Title {
  gl: any; plane: any; text: string; textColor: string; font: string; mesh: any
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }: any) {
    autoBind(this)
    this.gl = gl; this.plane = plane; this.text = text; this.textColor = textColor; this.font = font
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor)
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;void main(){vec4 c=texture2D(tMap,vUv);if(c.a<0.1)discard;gl_FragColor=c;}`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const th = this.plane.scale.y * 0.15
    this.mesh.scale.set(th * aspect, th, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - th * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

/* ─── Media ──────────────────────────────────────────────────────────────── */
class Media {
  extra = 0; x = 0; width = 0; widthTotal = 0; padding = 0; scale = 0; speed = 0
  isBefore = false; isAfter = false
  gl!: any; geometry!: any; image!: string; index!: number; length!: number
  renderer: any; scene: any; screen: any; text: string; viewport: any
  bend: number; textColor: string; borderRadius: number; font: string
  program: any; plane: any; title: any

  constructor({ geometry, gl, image, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius = 0, font }: any) {
    Object.assign(this, { geometry, gl, image, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius, font })
    this.createShader(); this.createMesh(); this.createTitle(); this.onResize()
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true })
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false,
      vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;p.z=(sin(p.x*4.0+uTime)*1.5+cos(p.y*2.0+uTime)*1.5)*(0.1+uSpeed*0.5);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);float alpha=1.0-smoothstep(-0.002,0.002,d);gl_FragColor=vec4(color.rgb,alpha);}`,
      uniforms: {
        tMap: { value: texture }, uPlaneSizes: { value: [0, 0] }, uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 }, uTime: { value: 100 * Math.random() }, uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    })
    const img = new Image(); img.crossOrigin = "anonymous"; img.src = this.image
    img.onload = () => { (texture as any).image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight] }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program })
    this.plane.setParent(this.scene)
  }

  createTitle() {
    this.title = new Title({ gl: this.gl, plane: this.plane, renderer: this.renderer, text: this.text, textColor: this.textColor, font: this.font })
  }

  update(scroll: any, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra
    const x = this.plane.position.x, H = this.viewport.width / 2
    if (this.bend === 0) { this.plane.position.y = 0; this.plane.rotation.z = 0 }
    else {
      const B = Math.abs(this.bend), R = (H * H + B * B) / (2 * B)
      const ex = Math.min(Math.abs(x), H)
      const arc = R - Math.sqrt(R * R - ex * ex)
      if (this.bend > 0) { this.plane.position.y = -arc; this.plane.rotation.z = -Math.sign(x) * Math.asin(ex / R) }
      else { this.plane.position.y = arc; this.plane.rotation.z = Math.sign(x) * Math.asin(ex / R) }
    }
    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed
    const po = this.plane.scale.x / 2, vo = this.viewport.width / 2
    this.isBefore = this.plane.position.x + po < -vo
    this.isAfter  = this.plane.position.x - po > vo
    if (direction === "right" && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false }
    if (direction === "left"  && this.isAfter)  { this.extra += this.widthTotal; this.isBefore = this.isAfter = false }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen)   this.screen   = screen
    if (viewport) { this.viewport = viewport }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width  * (700 * this.scale)) / this.screen.width
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 2; this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }

  /** Returns the normalised X position in viewport space (0 = centre). */
  get normX() {
    if (!this.viewport) return Infinity
    return Math.abs(this.plane.position.x) / (this.viewport.width / 2)
  }
}

/* ─── App ────────────────────────────────────────────────────────────────── */
class App {
  container: HTMLElement; scroll: any; screen: any; viewport: any; raf: number = 0
  renderer: any; gl: any; camera: any; scene: any; planeGeometry: any; medias: Media[] = []
  mediasImages: any[]; scrollSpeed: number
  boundOnResize: any; boundOnWheel: any; boundOnTouchDown: any; boundOnTouchMove: any; boundOnTouchUp: any
  isDown = false; start = 0; onCheckDebounce: any
  onHoverChange: (index: number | null) => void

  constructor(
    container: HTMLElement,
    { items, bend = 3, textColor = "#ffffff", borderRadius = 0, font = "bold 30px sans-serif", scrollSpeed = 2, scrollEase = 0.05 }: any = {},
    onHoverChange: (index: number | null) => void = () => {}
  ) {
    this.container = container; this.scrollSpeed = scrollSpeed
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 }
    this.mediasImages = []
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200)
    this.onHoverChange = onHoverChange
    this.createRenderer(); this.createCamera(); this.createScene(); this.onResize()
    this.createGeometry(); this.createMedias(items, bend, textColor, borderRadius, font)
    this.update(); this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) })
    this.gl = this.renderer.gl; this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }
  createCamera() { this.camera = new Camera(this.gl); this.camera.fov = 45; this.camera.position.z = 20 }
  createScene()  { this.scene = new Transform() }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 }) }

  createMedias(items: any[], bend: number, textColor: string, borderRadius: number, font: string) {
    const defaultItems = [
      { image: "https://picsum.photos/seed/hv1/800/600", text: "Matriz Háptica" },
      { image: "https://picsum.photos/seed/hv2/800/600", text: "Sensor ToF" },
      { image: "https://picsum.photos/seed/hv3/800/600", text: "Pan & Tilt" },
      { image: "https://picsum.photos/seed/hv4/800/600", text: "IMU MPU-6050" },
      { image: "https://picsum.photos/seed/hv5/800/600", text: "Arduino Nano" },
      { image: "https://picsum.photos/seed/hv6/800/600", text: "Raspberry Pi 4" },
      { image: "https://picsum.photos/seed/hv7/800/600", text: "YOLOv8 Tiny" },
      { image: "https://picsum.photos/seed/hv8/800/600", text: "Dataset Propio" },
    ]
    const galleryItems = items?.length ? items : defaultItems
    this.mediasImages = [...galleryItems, ...galleryItems]
    this.medias = this.mediasImages.map((data, index) => new Media({
      geometry: this.planeGeometry, gl: this.gl, image: data.image, index,
      length: this.mediasImages.length, renderer: this.renderer, scene: this.scene,
      screen: this.screen, text: data.text, viewport: this.viewport,
      bend, textColor, borderRadius, font,
    }))
  }

  onTouchDown(e: any) { this.isDown = true; this.scroll.position = this.scroll.current; this.start = e.touches?.[0]?.clientX ?? e.clientX }
  onTouchMove(e: any) { if (!this.isDown) return; const x = e.touches?.[0]?.clientX ?? e.clientX; this.scroll.target = this.scroll.position + (this.start - x) * (this.scrollSpeed * 0.025) }
  onTouchUp()         { this.isDown = false; this.onCheck() }
  onWheel(e: any)     { this.scroll.target += (e.deltaY > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2; this.onCheckDebounce() }
  onCheck()           { if (!this.medias?.[0]) return; const w = this.medias[0].width; const i = Math.round(Math.abs(this.scroll.target) / w); this.scroll.target = this.scroll.target < 0 ? -(w * i) : w * i }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })
    const h = 2 * Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z
    this.viewport = { width: h * this.camera.aspect, height: h }
    this.medias?.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }))
  }

  lastHoveredIndex: number | null = null

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const dir = this.scroll.current > this.scroll.last ? "right" : "left"
    this.medias?.forEach((m) => m.update(this.scroll, dir))
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current

    // Find the media closest to centre (normX closest to 0)
    let minNorm = Infinity, centreIdx: number | null = null
    this.medias?.forEach((m, i) => {
      const n = m.normX
      if (n < minNorm) { minNorm = n; centreIdx = i }
    })
    // Only fire callback when the centred item changes
    // Map back to original items array length (duplication)
    const originalLen = this.mediasImages.length / 2
    const mapped = centreIdx !== null ? centreIdx % originalLen : null
    if (mapped !== this.lastHoveredIndex) {
      this.lastHoveredIndex = mapped
      this.onHoverChange(mapped)
    }

    this.raf = requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    this.boundOnResize    = this.onResize.bind(this)
    this.boundOnWheel     = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp   = this.onTouchUp.bind(this)
    window.addEventListener("resize",     this.boundOnResize)
    window.addEventListener("wheel",      this.boundOnWheel)
    window.addEventListener("mousedown",  this.boundOnTouchDown)
    window.addEventListener("mousemove",  this.boundOnTouchMove)
    window.addEventListener("mouseup",    this.boundOnTouchUp)
    window.addEventListener("touchstart", this.boundOnTouchDown)
    window.addEventListener("touchmove",  this.boundOnTouchMove)
    window.addEventListener("touchend",   this.boundOnTouchUp)
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener("resize",     this.boundOnResize)
    window.removeEventListener("wheel",      this.boundOnWheel)
    window.removeEventListener("mousedown",  this.boundOnTouchDown)
    window.removeEventListener("mousemove",  this.boundOnTouchMove)
    window.removeEventListener("mouseup",    this.boundOnTouchUp)
    window.removeEventListener("touchstart", this.boundOnTouchDown)
    window.removeEventListener("touchmove",  this.boundOnTouchMove)
    window.removeEventListener("touchend",   this.boundOnTouchUp)
    if (this.gl?.canvas?.parentNode) this.gl.canvas.parentNode.removeChild(this.gl.canvas)
  }
}

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface GalleryItem {
  image: string
  text: string
  /** Short description shown in the info panel below the gallery */
  description?: string
}

interface Props {
  items?: GalleryItem[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  scrollSpeed?: number
  scrollEase?: number
}

/* ─── React Component ────────────────────────────────────────────────────── */
export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 28px sans-serif",
  scrollSpeed = 2,
  scrollEase = 0.05,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Resolve the effective items list (same logic as App.createMedias)
  const effectiveItems: GalleryItem[] = items?.length
    ? items
    : [
        { image: "https://picsum.photos/seed/hv1/800/600", text: "Matriz Háptica" },
        { image: "https://picsum.photos/seed/hv2/800/600", text: "Sensor ToF" },
        { image: "https://picsum.photos/seed/hv3/800/600", text: "Pan & Tilt" },
        { image: "https://picsum.photos/seed/hv4/800/600", text: "IMU MPU-6050" },
        { image: "https://picsum.photos/seed/hv5/800/600", text: "Arduino Nano" },
        { image: "https://picsum.photos/seed/hv6/800/600", text: "Raspberry Pi 4" },
        { image: "https://picsum.photos/seed/hv7/800/600", text: "YOLOv8 Tiny" },
        { image: "https://picsum.photos/seed/hv8/800/600", text: "Dataset Propio" },
      ]

  const handleHoverChange = useCallback((index: number | null) => {
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const app = new App(
      containerRef.current,
      { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase },
      handleHoverChange
    )
    return () => app.destroy()
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, handleHoverChange])

  const activeItem = activeIndex !== null ? effectiveItems[activeIndex] : null

  return (
    <div className="circular-gallery-wrapper">
      {/* WebGL canvas */}
      <div className="circular-gallery" ref={containerRef} />

      {/* Info panel */}
      <div className={`cg-info-panel${activeItem ? " cg-info-panel--visible" : ""}`}>
        {activeItem && (
          <>
            <span className="cg-info-panel__tag">{activeItem.text}</span>
            {activeItem.description && (
              <p className="cg-info-panel__desc">{activeItem.description}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
