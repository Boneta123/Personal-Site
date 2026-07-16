"use client";

import { useEffect, useState } from "react";

import { resume } from "@/content/site";
import { cn } from "@/lib/utils";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];

/**
 * Sticky top bar. Stays transparent over the hero and picks up a backdrop
 * once the visitor scrolls past it.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && "border-b border-white/10 bg-void-deep/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <a
          href="#top"
          className="rounded-sm font-[family-name:var(--font-display)] text-xl tracking-widest text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mana"
        >
          MB
        </a>

        <nav aria-label="Sections" className="flex items-center gap-5">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-sm text-xs font-semibold tracking-[0.18em] text-white/70 uppercase transition hover:text-mana focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mana sm:text-sm"
            >
              {section.label}
            </a>
          ))}
          <a
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-gold/60 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-gold uppercase transition hover:bg-gold/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:inline-block"
          >
            {resume.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
