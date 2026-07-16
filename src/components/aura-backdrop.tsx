import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Meteors } from "@/components/ui/meteors";

/**
 * Page backdrop: a flickering ember grid with meteors streaking over it, under
 * a warm gradient wash.
 *
 * The grid is canvas-drawn rather than a blurred DOM layer — large animated
 * `filter: blur()` surfaces have to be re-rasterised every frame, which is the
 * expensive way to get the same softness a gradient gives for free.
 *
 * Contains no purple: the wash runs crimson → orange → amber with a cyan
 * counterpoint. See the palette note in globals.css before changing any hue.
 */
export function AuraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void-deep" />

      {/* Ember grid — reads as animated screentone. */}
      <FlickeringGrid
        className="absolute inset-0 size-full"
        squareSize={3}
        gridGap={7}
        flickerChance={0.28}
        color="rgb(255, 74, 138)"
        maxOpacity={0.2}
      />

      {/* Rose wash. Gradients are soft by nature, so no blur filter is needed.
          Held back from the previous strength so it tints the woodblock prints
          rather than washing them out. */}
      <div
        className="absolute -inset-1/4 will-change-transform"
        style={{
          backgroundImage: [
            "radial-gradient(40vmax 40vmax at 16% 10%, color-mix(in oklch, var(--geass) 62%, transparent), transparent 68%)",
            "radial-gradient(36vmax 36vmax at 86% 26%, color-mix(in oklch, var(--cursed) 55%, transparent), transparent 68%)",
            "radial-gradient(34vmax 34vmax at 74% 84%, color-mix(in oklch, var(--gold) 38%, transparent), transparent 70%)",
            "radial-gradient(32vmax 32vmax at 26% 88%, color-mix(in oklch, var(--mana) 34%, transparent), transparent 70%)",
          ].join(","),
          animation: "aura-drift 20s ease-in-out infinite alternate",
        }}
      />

      {/* bg-current/from-current pick this up — embers, not the registry's grey. */}
      <Meteors
        number={14}
        minDelay={0.4}
        maxDelay={3}
        minDuration={4}
        maxDuration={11}
        angle={215}
        className="text-cursed"
      />

      <div className="screentone absolute inset-0 text-white/[0.05]" />

      {/* Holds body copy above the mesh at AA contrast without flattening it. */}
      <div className="absolute inset-0 bg-void-deep/50" />
    </div>
  );
}
