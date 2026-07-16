import { ArrowUpRight } from "lucide-react";

import type { Show } from "@/content/site";
import { cn } from "@/lib/utils";

const accentVar: Record<Show["accent"], string> = {
  cursed: "var(--cursed)",
  geass: "var(--geass)",
  gold: "var(--gold)",
  mana: "var(--mana)",
};

/**
 * A "show" poster: title plus its about blurb. The art is generated from the
 * card's own accent — gradient, screentone and a sigil built from the title's
 * initial — so no external or licensed imagery is needed.
 */
export function ShowCard({ show, index }: { show: Show; index: number }) {
  const accent = accentVar[show.accent];

  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className={cn(
        "group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-xl",
        "border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-2 hover:border-[var(--accent)]/70",
        "hover:shadow-[0_0_0_1px_var(--accent),0_18px_50px_-12px_var(--accent)]",
        "focus-within:-translate-y-2 focus-within:border-[var(--accent)]/70",
        "sm:w-[46vw] lg:w-[24rem]",
      )}
    >
      {/* Poster art */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, color-mix(in oklch, var(--accent) 85%, transparent), color-mix(in oklch, var(--accent) 18%, transparent) 55%, transparent)`,
          }}
        />
        <div className="screentone absolute inset-0 text-black/25" />
        <div
          aria-hidden
          className="speedlines absolute inset-0 text-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Rank sigil */}
        <span
          aria-hidden
          className="absolute -bottom-6 -left-2 font-[family-name:var(--font-display)] text-[7rem] leading-none text-white/15"
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
          <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
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
