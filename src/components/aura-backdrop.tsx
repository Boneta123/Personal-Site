/**
 * Layered page backdrop: a drifting gradient mesh under a manga screentone
 * wash.
 *
 * The mesh is built from radial gradients rather than blurred elements. Large
 * `filter: blur()` surfaces have to be re-rasterised every frame once they
 * move, which froze the renderer outright; gradients are soft by nature and
 * animate as a cheap composited transform.
 */
export function AuraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void-deep" />

      <div
        className="absolute -inset-1/4 will-change-transform"
        style={{
          backgroundImage: [
            "radial-gradient(40vmax 40vmax at 16% 10%, color-mix(in oklch, var(--cursed) 85%, transparent), transparent 68%)",
            "radial-gradient(36vmax 36vmax at 86% 30%, color-mix(in oklch, var(--geass) 72%, transparent), transparent 68%)",
            "radial-gradient(38vmax 38vmax at 36% 86%, color-mix(in oklch, var(--mana) 62%, transparent), transparent 68%)",
            "radial-gradient(30vmax 30vmax at 70% 76%, color-mix(in oklch, var(--gold) 45%, transparent), transparent 70%)",
          ].join(","),
          animation: "aura-drift 20s ease-in-out infinite alternate",
        }}
      />

      <div className="screentone absolute inset-0 text-white/[0.06]" />

      {/* Holds body copy above the mesh at AA contrast without flattening it. */}
      <div className="absolute inset-0 bg-void-deep/45" />
    </div>
  );
}
