"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ShowCard } from "@/components/show-card";
import type { Show } from "@/content/site";

type ShowRowProps = {
  id: string;
  heading: string;
  kicker: string;
  shows: Show[];
};

/**
 * A Crunchyroll-style browsing row: a horizontally scrollable rail of show
 * cards with arrow controls that appear only when there is somewhere to go.
 */
export function ShowRow({ id, heading, kicker, shows }: ShowRowProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 1);
    setAtEnd(rail.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const nudge = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="mb-5 flex items-end justify-between gap-4 px-6 lg:px-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">
            {kicker}
          </p>
          <h2 className="relative mt-1 font-[family-name:var(--font-display)] text-4xl tracking-wide text-white sm:text-5xl">
            {heading}
            <span
              aria-hidden
              className="speedlines absolute top-1/2 -right-4 h-8 w-24 -translate-y-1/2 text-white/15"
            />
          </h2>
        </div>

        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label={`Scroll ${heading} left`}
            className="grid size-9 place-items-center rounded-full border border-white/15 text-white transition hover:border-white/50 hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label={`Scroll ${heading} right`}
            className="grid size-9 place-items-center rounded-full border border-white/15 text-white transition hover:border-white/50 hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={sync}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pt-2 pb-6 lg:px-12"
      >
        {shows.map((show, i) => (
          <ShowCard key={show.id} show={show} index={i} />
        ))}
      </div>
    </section>
  );
}
