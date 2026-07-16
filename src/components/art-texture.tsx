import Image from "next/image";

import type { Artwork } from "@/content/art";
import { cn } from "@/lib/utils";

type ArtTextureProps = {
  art: Artwork;
  className?: string;
  /** Which edge the print bleeds in from. "full" bleeds across the whole section. */
  side?: "left" | "right" | "full";
  /** Layer opacity. Raise for prints that should read as a picture, not a wash. */
  opacity?: number;
  /** Set for above-the-fold art so it isn't lazy-loaded into the LCP window. */
  priority?: boolean;
};

/**
 * A public-domain woodblock print used as section art.
 *
 * The print is duotoned into the page's rose palette so it belongs to the page
 * rather than sitting on top of it. A gradient mask keeps it off the column
 * where the copy lives — that, rather than crushing the opacity, is what
 * protects text contrast, which is why these can run this bright.
 *
 * Decorative only: alt is empty and the layer is aria-hidden, since the artwork
 * carries no information the surrounding text doesn't already give.
 */
export function ArtTexture({
  art,
  className,
  side = "right",
  opacity = 0.42,
  priority = false,
}: ArtTextureProps) {
  // Two masks composited together. The horizontal one keeps the print off the
  // column where the copy lives; the vertical one stops it cutting off in a
  // hard seam at the section boundary — which a horizontal fade alone cannot do.
  const horizontal =
    side === "right"
      ? "linear-gradient(to left, black 35%, transparent 92%)"
      : side === "left"
        ? "linear-gradient(to right, black 35%, transparent 92%)"
        : "radial-gradient(120% 90% at 50% 50%, black 30%, transparent 94%)";

  const vertical =
    "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";

  const mask = `${horizontal}, ${vertical}`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 -z-10 overflow-hidden",
        side === "full" ? "inset-x-0" : "w-full sm:w-3/5",
        side === "right" && "right-0",
        side === "left" && "left-0",
        className,
      )}
      style={{
        opacity,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <Image
        src={art.src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 60vw"
        className="object-cover mix-blend-luminosity"
        priority={priority}
      />
      {/* Duotone: tint the luminance-only print into the rose palette. */}
      <div className="absolute inset-0 bg-gradient-to-br from-geass/60 via-cursed/40 to-gold/25 mix-blend-color" />
    </div>
  );
}
