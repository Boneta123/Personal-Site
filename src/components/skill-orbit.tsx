import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { skills } from "@/content/site";
import { skillIcons } from "@/lib/skill-icons";
import type { Skill } from "@/content/site";

function SkillMark({ skill, size }: { skill: Skill; size: number }) {
  const { path, color } = skillIcons[skill.icon];

  return (
    <div
      title={skill.name}
      style={{ ["--brand" as string]: color }}
      className="group grid size-full place-items-center rounded-full border border-white/10 bg-void-deep/80 backdrop-blur-sm transition duration-300 hover:scale-115 hover:border-[var(--brand)] hover:shadow-[0_0_22px_var(--brand)]"
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={skill.name}
        fill={color}
        style={{ width: size * 0.52, height: size * 0.52 }}
        className="opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      >
        <path d={path} />
      </svg>
    </div>
  );
}

/**
 * The skills constellation: two counter-rotating rings of technology marks.
 * Languages orbit the inner ring, everything else the outer.
 */
export function SkillOrbit() {
  const inner = skills.filter((s) => s.category === "Languages");
  const outer = skills.filter((s) => s.category !== "Languages");

  return (
    <div className="relative mx-auto grid h-[30rem] w-full max-w-3xl place-items-center sm:h-[34rem]">
      {/* Core */}
      <div className="pointer-events-none absolute grid place-items-center text-center">
        <div
          aria-hidden
          className="absolute size-32 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--cursed) 70%, transparent), transparent 70%)",
          }}
        />
        <p className="relative font-[family-name:var(--font-display)] text-3xl tracking-widest text-white text-glow sm:text-4xl">
          STACK
        </p>
      </div>

      <OrbitingCircles radius={110} duration={26} iconSize={52} path>
        {inner.map((skill) => (
          <SkillMark key={skill.id} skill={skill} size={52} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles radius={190} duration={38} iconSize={56} reverse path>
        {outer.map((skill) => (
          <SkillMark key={skill.id} skill={skill} size={56} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
