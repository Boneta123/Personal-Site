"use client"

import React, { useMemo } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  /** Changes the scatter without changing the count. */
  seed?: number
  className?: string
}

/**
 * Deterministic PRNG (mulberry32).
 *
 * The upstream registry component seeded its meteors from Math.random() inside
 * an effect, because unseeded randomness makes the server and client render
 * differently and hydration fails. Seeding it instead means both sides compute
 * the same layout, so the work moves into useMemo — no effect, no cascading
 * render, no hydration mismatch.
 */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  seed = 1,
  className,
}: MeteorsProps) => {
  const meteorStyles = useMemo(() => {
    const rand = mulberry32(seed)
    return [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      // Percentage rather than window.innerWidth: no window access (so this is
      // SSR-safe) and the scatter survives a resize.
      left: `${(rand() * 100).toFixed(3)}%`,
      animationDelay: (rand() * (maxDelay - minDelay) + minDelay).toFixed(3) + "s",
      animationDuration:
        Math.floor(rand() * (maxDuration - minDuration) + minDuration) + "s",
    })) as React.CSSProperties[]
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle, seed])

  return (
    <>
      {meteorStyles.map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-current shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-current to-transparent" />
        </span>
      ))}
    </>
  )
}
