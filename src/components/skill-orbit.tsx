"use client";

import { useState } from "react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { skills } from "@/content/site";
import { skillIcons } from "@/lib/skill-icons";
import type { Skill } from "@/content/site";

type SkillMarkProps = {
  skill: Skill;
  size: number;
  onActivate: (skill: Skill | null) => void;
};

function SkillMark({ skill, size, onActivate }: SkillMarkProps) {
  const { path, color } = skillIcons[skill.icon];

  return (
    <button
      type="button"
      style={{ ["--brand" as string]: color }}
      onPointerEnter={() => onActivate(skill)}
      onPointerLeave={() => onActivate(null)}
      // Keyboard users get the same reveal: the marks are the only place the
      // skill names appear, so focus has to drive the core label too.
      onFocus={() => onActivate(skill)}
      onBlur={() => onActivate(null)}
      className="group grid size-full cursor-pointer place-items-center rounded-full border border-white/10 bg-void-deep/80 backdrop-blur-sm transition duration-300 hover:scale-115 hover:border-[var(--brand)] hover:shadow-[0_0_22px_var(--brand)] focus-visible:scale-115 focus-visible:border-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={skill.name}
        fill={color}
        style={{ width: size * 0.52, height: size * 0.52 }}
        className="opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <path d={path} />
      </svg>
    </button>
  );
}

/**
 * The skills constellation: two counter-rotating rings of technology marks.
 * Languages orbit the inner ring, everything else the outer.
 *
 * Hovering or focusing a mark swaps the core label from STACK to that skill's
 * name — the marks are far too small (~52px) to carry a legible label
 * themselves, so the centre does the talking.
 */
export function SkillOrbit() {
  const [active, setActive] = useState<Skill | null>(null);

  const inner = skills.filter((s) => s.category === "Languages");
  const outer = skills.filter((s) => s.category !== "Languages");

  const accent = active ? skillIcons[active.icon].color : undefined;

  return (
    <div className="relative mx-auto grid h-[30rem] w-full max-w-3xl place-items-center sm:h-[34rem]">
      {/* Core */}
      <div className="pointer-events-none absolute z-10 grid place-items-center text-center">
        <div
          aria-hidden
          className="absolute size-32 rounded-full blur-2xl transition-colors duration-300"
          style={{
            background: `radial-gradient(circle, color-mix(in oklch, ${
              accent ?? "var(--cursed)"
            } 70%, transparent), transparent 70%)`,
          }}
        />

        {/* A dark disc so the name stays legible over the woodblock print and
            whatever happens to be orbiting behind it. */}
        <div
          aria-hidden
          className="absolute size-36 rounded-full bg-void-deep/85 backdrop-blur-sm sm:size-40"
        />

        <p
          // aria-live is deliberate: the label is the only textual output of the
          // hover, so a screen reader driving focus round the ring should hear it.
          aria-live="polite"
          className="relative max-w-[8.5rem] font-[family-name:var(--font-display)] text-2xl leading-none tracking-widest text-white text-glow transition-colors duration-200 sm:max-w-[9.5rem] sm:text-3xl"
          style={active ? { color: accent } : undefined}
        >
          {active ? active.name : "STACK"}
        </p>
      </div>

      <OrbitingCircles radius={110} duration={26} iconSize={52} path>
        {inner.map((skill) => (
          <SkillMark key={skill.id} skill={skill} size={52} onActivate={setActive} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles radius={190} duration={38} iconSize={56} reverse path>
        {outer.map((skill) => (
          <SkillMark key={skill.id} skill={skill} size={56} onActivate={setActive} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
