"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export interface UseScrollSequenceOptions {
  /** Element that acts as the GSAP pin/scroll trigger */
  triggerRef: React.RefObject<HTMLElement | null>
  /** Total number of frames */
  frameCount: number
  /** Pixels of scrollable height the sequence occupies */
  scrollLength?: number
  /** GSAP scrub factor (higher = more lag/smooth) */
  scrub?: number
}

export function useScrollSequence({
  triggerRef,
  frameCount,
  scrollLength = 3000,
  scrub = 1.5,
}: UseScrollSequenceOptions) {
  const frameRef = useRef({ current: 0 })
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!triggerRef.current) return

    const state = frameRef.current

    const tween = gsap.to(state, {
      current: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${scrollLength}`,
        scrub,
        pin: true,
        anticipatePin: 1,
      },
      onUpdate: () => {
        const idx = Math.round(state.current)
        setFrame(idx)
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [triggerRef, frameCount, scrollLength, scrub])

  return { frame }
}
