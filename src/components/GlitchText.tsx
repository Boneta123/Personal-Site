import type { CSSProperties, FC } from "react";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  /** When true the split only appears under the cursor. */
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  "--after-duration": string;
  "--before-duration": string;
  "--after-shadow": string;
  "--before-shadow": string;
}

/**
 * Chromatic-split glitch, adapted from the @react-bits registry component.
 *
 * Three changes from the shipped version, all load-bearing here:
 *
 * 1. The pseudo-element background is TRANSPARENT. Upstream hardcodes
 *    `bg-[#120F17]` to occlude the original glyphs — that colour is hue 262,
 *    i.e. purple, and it would also stamp opaque rectangles over the woodblock
 *    prints this text sits on. Transparent turns the effect into true ghosting,
 *    which is what chromatic aberration should look like anyway.
 * 2. No typography of its own. Upstream hardcodes size, weight and `text-white`;
 *    here the parent owns all of that, so the hero's two-tone colouring and the
 *    mincho display face survive.
 * 3. Text stays selectable. Upstream sets `select-none` and `cursor-pointer` on
 *    something that is not interactive.
 *
 * The keyframes live in globals.css — upstream ships them as a commented-out
 * Tailwind v3 config block, which this v4 project would silently ignore,
 * leaving the effect inert.
 */
const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = true,
  className = "",
}) => {
  const inlineStyles: CustomCSSProperties = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    // Crimson/cyan rather than the classic red/magenta — magenta sits in the
    // forbidden purple arc.
    "--after-shadow": enableShadows ? "-4px 0 var(--geass)" : "none",
    "--before-shadow": enableShadows ? "4px 0 var(--mana)" : "none",
  };

  const base = "relative inline-block";

  const pseudo = !enableOnHover
    ? "after:content-[attr(data-text)] after:absolute after:top-0 after:left-[6px] after:text-inherit after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after " +
      "before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-6px] before:text-inherit before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before"
    : "after:content-[''] after:absolute after:top-0 after:left-[6px] after:text-inherit after:overflow-hidden after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-6px] before:text-inherit before:overflow-hidden before:opacity-0 " +
      "hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after " +
      "hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before";

  return (
    <span style={inlineStyles} data-text={children} className={cn(base, pseudo, className)}>
      {children}
    </span>
  );
};

export default GlitchText;
