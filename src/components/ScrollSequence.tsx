"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { preloadImages } from "@/lib/preloadImages"

gsap.registerPlugin(ScrollTrigger)

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface Sequence {
  folder: string
  frameCount: number
  label: string
}

export interface Chapter {
  /** Scroll progress (0–1) at which this chapter activates */
  from: number
  eyebrow?: string
  title: string
  description: string
  specs?: { icon: string; text: string }[]
}

interface Props {
  sequences: Sequence[]
  chapters: Chapter[]
  scrollLength?: number
  scrub?: number
  width?: number
  height?: number
  className?: string
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ScrollSequence({
  sequences,
  chapters,
  scrollLength = 6000,
  scrub = 0.3,
  width = 1920,
  height = 1080,
  className = "",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady]           = useState(false)
  const [chapterIdx, setChapterIdx]     = useState(0)
  const [visible, setVisible]           = useState(true)
  const prevChapterRef = useRef(0)

  const imageBanks = useRef<HTMLImageElement[][]>([])

  /* ─── Load & GSAP ─────────────────────────────────────────────────────── */
  useEffect(() => {
    let isMounted = true
    const canvas  = canvasRef.current!
    const ctx     = canvas.getContext("2d")!

    const totalFrames = sequences.reduce((s, q) => s + q.frameCount, 0)
    let totalLoaded   = 0

    Promise.all(
      sequences.map((seq, idx) =>
        preloadImages(seq.folder, seq.frameCount, () => {
          totalLoaded++
          if (isMounted) setLoadProgress(Math.round((totalLoaded / totalFrames) * 100))
        }).then((imgs) => { imageBanks.current[idx] = imgs })
      )
    ).then(() => {
      if (!isMounted) return
      setIsReady(true)

      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const firstImg = imageBanks.current[0]?.[0]
      if (firstImg?.complete) ctx.drawImage(firstImg, 0, 0, width, height)

      const state = { progress: 0 }

      gsap.to(state, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub,
          pin: true,
          anticipatePin: 1,
        },
        onUpdate: () => {
          const p = state.progress

          /* ── Canvas frame ── */
          const seqIndex = Math.min(Math.floor(p * sequences.length), sequences.length - 1)
          const seqProg  = (p * sequences.length) % 1 || (seqIndex === sequences.length - 1 ? 1 : 0)
          const frameIdx = Math.min(
            Math.round(seqProg * (sequences[seqIndex].frameCount - 1)),
            sequences[seqIndex].frameCount - 1
          )
          const img = imageBanks.current[seqIndex]?.[frameIdx]
          if (img?.complete && img.naturalWidth > 0) {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, width, height)
          }

          /* ── Active chapter — last one whose `from` ≤ progress ── */
          let newIdx = 0
          for (let i = 0; i < chapters.length; i++) {
            if (p >= chapters[i].from) newIdx = i
          }

          if (newIdx !== prevChapterRef.current) {
            prevChapterRef.current = newIdx
            if (isMounted) {
              setVisible(false)
              setTimeout(() => {
                setChapterIdx(newIdx)
                setVisible(true)
              }, 200)
            }
          }
        },
      })
    })

    return () => {
      isMounted = false
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const active = chapters[chapterIdx]

  /* ─── JSX ────────────────────────────────────────────────────────────── */
  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-screen bg-transparent overflow-hidden ${className}`}
    >
      {/* Loading overlay */}
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20">
          <p className="text-gray-400 text-sm mb-4 tracking-widest uppercase">
            Cargando secuencia
          </p>
          <div className="w-64 h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-gray-400 mt-3 text-xs tabular-nums">{loadProgress}%</p>
        </div>
      )}

      {/* Centered columns container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-7xl flex h-full">
          {/* Left — canvas column */}
          <div className="h-full flex items-center" style={{ width: "44%" }}>
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className="w-full h-auto object-contain"
              style={{ mixBlendMode: "multiply", filter: "brightness(1.08)", transform: "translateX(-40px)" }}
            />
          </div>

          {/* Right — description panel */}
          <div className="h-full flex flex-col justify-center px-10 pr-20" style={{ width: "56%" }}>
        {/* Progress bar — thin horizontal line */}
        <div className="mb-10 w-full max-w-md">
          <div className="h-px bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full transition-all duration-500"
              style={{ width: `${((chapterIdx + 1) / chapters.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-300 mt-2 tabular-nums tracking-widest">
            {String(chapterIdx + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </p>
        </div>

        {/* Animated text block */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(16px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {active.eyebrow && (
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-indigo-500 mb-3">
              {active.eyebrow}
            </p>
          )}

          <h2
            className="font-bold text-gray-900 leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
          >
            {active.title}
          </h2>

          <div className="w-10 h-0.5 bg-indigo-300 mb-6 rounded-full" />

          <p className="text-gray-500 text-xl leading-relaxed max-w-xs mb-8">
            {active.description}
          </p>

          {active.specs && active.specs.length > 0 && (
            <ul className="flex flex-col gap-4">
              {active.specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600 text-base font-medium">
                  <span className="text-2xl leading-none">{spec.icon}</span>
                  <span>{spec.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}
