import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { cardArt } from "@/content/art";
import type { Show } from "@/content/site";
import { cn } from "@/lib/utils";

const accentVar: Record<Show["accent"], string> = {
  cursed: "var(--cursed)",
  geass: "var(--geass)",
  gold: "var(--gold)",
  mana: "var(--mana)",
};

/**
 * A "show" poster: title plus its about blurb.
 *
 * The poster header carries a public-domain woodblock print duotoned into the
 * card's accent — luminosity for the print, a colour overlay to tint it, then
 * the accent gradient on top so the row still reads as one system rather than
 * five unrelated pictures. Cards without a print fall back to the gradient
 * alone, which is what every card looked like before.
 */
export function ShowCard({ show, index }: { show: Show; index: number }) {
  const accent = accentVar[show.accent];
  const art = cardArt[show.id as keyof typeof cardArt] as
    | (typeof cardArt)[keyof typeof cardArt]
    | undefined;

  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className={cn(
        "group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-xl",
        // An opaque-enough substrate: the woodblock prints now run bright behind
        // these cards, and a 3% white fill left the body copy sitting directly
        // on the artwork.
        "border border-white/10 bg-void-deep/80 backdrop-blur-md",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-2 hover:border-[var(--accent)]/70",
        "hover:shadow-[0_0_0_1px_var(--accent),0_18px_50px_-12px_var(--accent)]",
        "focus-within:-translate-y-2 focus-within:border-[var(--accent)]/70",
        "sm:w-[46vw] lg:w-[24rem]",
      )}
    >
      {/* Poster art */}
      <div className="relative h-44 overflow-hidden">
        {art && (
          <>
            <Image
              src={art.src}
              alt=""
              fill
              // Real rendered widths — 384px at lg, 46vw at sm, 78vw on mobile.
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 46vw, 78vw"
              className="object-cover opacity-70 mix-blend-luminosity"
            />
            {/* Duotone: tint the luminance-only print into the card's accent. */}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-color"
              style={{ background: accent }}
            />
          </>
        )}

        {/* Accent gradient. Lighter where a print sits under it, so the artwork
            reads through instead of being painted over. */}
        <div
          className="absolute inset-0"
          style={{
            background: art
              ? `linear-gradient(135deg, color-mix(in oklch, var(--accent) 55%, transparent), color-mix(in oklch, var(--accent) 12%, transparent) 60%, transparent)`
              : `linear-gradient(135deg, color-mix(in oklch, var(--accent) 85%, transparent), color-mix(in oklch, var(--accent) 18%, transparent) 55%, transparent)`,
          }}
        />
        <div className="screentone absolute inset-0 text-black/25" />
        <div
          aria-hidden
          className="speedlines absolute inset-0 text-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Rank sigil. white/15 read fine over a flat gradient but disappeared
            once artwork went in behind it; the shadow anchors it against the
            busiest parts of the print. */}
        <span
          aria-hidden
          className="absolute -bottom-6 -left-2 font-[family-name:var(--font-display)] text-[7rem] leading-none text-white/30 [text-shadow:0_2px_18px_rgba(0,0,0,0.8)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Slash sweep on hover */}
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 opacity-0 blur-md group-hover:opacity-100"
          style={{ animation: "slash-sweep 0.9s ease-out" }}
        />

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void-deep to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
            {show.title}
          </h3>

          {(show.role || show.period) && (
            <p className="mt-1 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-wide text-white/55">
              {[show.role, show.period].filter(Boolean).join("  ·  ")}
            </p>
          )}
        </div>

        <p className="text-sm leading-relaxed text-white/75">{show.about}</p>

        {show.metric && (
          <p className="flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
            <span
              aria-hidden
              className="h-3 w-0.5 shrink-0 bg-[var(--accent)]"
            />
            {show.metric}
          </p>
        )}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {show.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-white/85"
            >
              {tag}
            </li>
          ))}
        </ul>

        {show.links.length > 0 && (
          <div className="flex gap-3 pt-1">
            {show.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
