"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

interface Props {
  eyebrow?: string
  title: string
  body?: string
  /** Use dark text (for white backgrounds) */
  dark?: boolean
  start?: string
  align?: "left" | "center" | "right"
  className?: string
}

export default function SectionText({
  eyebrow,
  title,
  body,
  dark = false,
  start = "top 80%",
  align = "center",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll("[data-animate]")
    gsap.from(els, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    })
  })

  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center"

  const eyebrowColor = dark ? "text-gray-400" : "text-white/50"
  const titleColor   = dark ? "text-gray-900"  : "text-white"
  const bodyColor    = dark ? "text-gray-500"  : "text-white/60"

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-4 max-w-3xl px-6 ${alignClass} ${className}`}
    >
      {eyebrow && (
        <span
          data-animate
          className={`text-xs font-semibold tracking-[0.25em] uppercase ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        data-animate
        className={`text-4xl md:text-6xl font-bold leading-tight ${titleColor}`}
      >
        {title}
      </h2>
      {body && (
        <p data-animate className={`text-lg leading-relaxed ${bodyColor}`}>
          {body}
        </p>
      )}
    </div>
  )
}
