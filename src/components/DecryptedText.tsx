"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { motion } from "motion/react"

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  border: 0,
}

interface Props {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: "start" | "end" | "center"
  useOriginalCharsOnly?: boolean
  characters?: string
  className?: string
  parentClassName?: string
  encryptedClassName?: string
  animateOn?: "hover" | "view" | "inViewHover" | "click"
  clickMode?: "once" | "toggle"
  [key: string]: unknown
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  ...props
}: Props) {
  const [displayText, setDisplayText]       = useState(text)
  const [isAnimating, setIsAnimating]       = useState(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [hasAnimated, setHasAnimated]       = useState(false)
  const [isDecrypted, setIsDecrypted]       = useState(animateOn !== "click")
  const [direction, setDirection]           = useState<"forward" | "reverse">("forward")

  const containerRef  = useRef<HTMLSpanElement>(null)
  const orderRef      = useRef<number[]>([])
  const pointerRef    = useRef(0)
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null)

  const availableChars = useMemo(() =>
    useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split(""),
    [useOriginalCharsOnly, text, characters]
  )

  const shuffleText = useCallback(
    (original: string, revealed: Set<number>) =>
      original.split("").map((char, i) => {
        if (char === " ") return " "
        if (revealed.has(i)) return original[i]
        return availableChars[Math.floor(Math.random() * availableChars.length)]
      }).join(""),
    [availableChars]
  )

  const computeOrder = useCallback((len: number) => {
    if (len <= 0) return []
    if (revealDirection === "start") return Array.from({ length: len }, (_, i) => i)
    if (revealDirection === "end")   return Array.from({ length: len }, (_, i) => len - 1 - i)
    const mid = Math.floor(len / 2)
    const order: number[] = []
    let offset = 0
    while (order.length < len) {
      const idx = offset % 2 === 0 ? mid + offset / 2 : mid - Math.ceil(offset / 2)
      if (idx >= 0 && idx < len) order.push(idx)
      offset++
    }
    return order.slice(0, len)
  }, [revealDirection])

  const fillAllIndices = useCallback(() => new Set(Array.from({ length: text.length }, (_, i) => i)), [text])

  const removeRandomIndices = useCallback((set: Set<number>, count: number) => {
    const arr = Array.from(set)
    for (let i = 0; i < count && arr.length > 0; i++) arr.splice(Math.floor(Math.random() * arr.length), 1)
    return new Set(arr)
  }, [])

  const encryptInstantly = useCallback(() => {
    const empty = new Set<number>()
    setRevealedIndices(empty)
    setDisplayText(shuffleText(text, empty))
    setIsDecrypted(false)
  }, [text, shuffleText])

  const triggerDecrypt = useCallback(() => {
    if (sequential) { orderRef.current = computeOrder(text.length); pointerRef.current = 0; setRevealedIndices(new Set()) }
    else setRevealedIndices(new Set())
    setDirection("forward")
    setIsAnimating(true)
  }, [sequential, computeOrder, text.length])

  const triggerReverse = useCallback(() => {
    const full = fillAllIndices()
    if (sequential) { orderRef.current = computeOrder(text.length).reverse(); pointerRef.current = 0; setRevealedIndices(full); setDisplayText(shuffleText(text, full)) }
    else { setRevealedIndices(full); setDisplayText(shuffleText(text, full)) }
    setDirection("reverse")
    setIsAnimating(true)
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text])

  useEffect(() => {
    if (!isAnimating) return
    let iter = 0

    const getNextIndex = (revealed: Set<number>): number => {
      const len = text.length
      if (revealDirection === "start") return revealed.size
      if (revealDirection === "end")   return len - 1 - revealed.size
      const mid = Math.floor(len / 2)
      const off = Math.floor(revealed.size / 2)
      const idx = revealed.size % 2 === 0 ? mid + off : mid - off - 1
      if (idx >= 0 && idx < len && !revealed.has(idx)) return idx
      for (let i = 0; i < len; i++) if (!revealed.has(i)) return i
      return 0
    }

    intervalRef.current = setInterval(() => {
      setRevealedIndices((prev) => {
        if (sequential) {
          if (direction === "forward") {
            if (prev.size < text.length) {
              const next = new Set(prev); next.add(getNextIndex(prev))
              setDisplayText(shuffleText(text, next)); return next
            }
            clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(true); return prev
          }
          if (pointerRef.current < orderRef.current.length) {
            const next = new Set(prev); next.delete(orderRef.current[pointerRef.current++])
            setDisplayText(shuffleText(text, next))
            if (next.size === 0) { clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(false) }
            return next
          }
          clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(false); return prev
        }
        // non-sequential
        if (direction === "forward") {
          setDisplayText(shuffleText(text, prev)); iter++
          if (iter >= maxIterations) { clearInterval(intervalRef.current!); setIsAnimating(false); setDisplayText(text); setIsDecrypted(true) }
          return prev
        }
        let cur = prev.size === 0 ? fillAllIndices() : prev
        const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)))
        const next = removeRandomIndices(cur, removeCount)
        setDisplayText(shuffleText(text, next)); iter++
        if (next.size === 0 || iter >= maxIterations) {
          clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(false)
          setDisplayText(shuffleText(text, new Set())); return new Set()
        }
        return next
      })
    }, speed)

    return () => clearInterval(intervalRef.current!)
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, direction, fillAllIndices, removeRandomIndices])

  // View observer
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && !hasAnimated) { triggerDecrypt(); setHasAnimated(true) } }),
      { threshold: 0.1 }
    )
    const el = containerRef.current
    if (el) obs.observe(el)
    return () => { if (el) obs.unobserve(el) }
  }, [animateOn, hasAnimated, triggerDecrypt])

  useEffect(() => {
    if (animateOn === "click") encryptInstantly()
    else { setDisplayText(text); setIsDecrypted(true) }
    setRevealedIndices(new Set()); setDirection("forward")
  }, [animateOn, text, encryptInstantly])

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return
    setRevealedIndices(new Set()); setIsDecrypted(false); setDisplayText(text)
    setDirection("forward"); setIsAnimating(true)
  }, [isAnimating, text])

  const resetToPlainText = useCallback(() => {
    clearInterval(intervalRef.current!); setIsAnimating(false)
    setRevealedIndices(new Set()); setDisplayText(text); setIsDecrypted(true); setDirection("forward")
  }, [text])

  const handleClick = () => {
    if (animateOn !== "click") return
    if (clickMode === "once") { if (!isDecrypted) triggerDecrypt(); return }
    if (isDecrypted) triggerReverse(); else triggerDecrypt()
  }

  const animateProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : animateOn === "click"
      ? { onClick: handleClick }
      : {}

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      {...(animateProps as any)}
      {...(props as any)}
    >
      <span style={srOnly}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, i) => {
          const revealed = revealedIndices.has(i) || (!isAnimating && isDecrypted)
          return (
            <span key={i} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
