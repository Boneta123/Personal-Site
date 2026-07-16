"use client"

import { motion, useScroll, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        // Registry default was a purple gradient; re-based on the site's fire
        // ramp so the default can't reintroduce purple at a future call site.
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-geass via-cursed to-gold",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}
