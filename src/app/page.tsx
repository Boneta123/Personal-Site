import { AuraBackdrop } from "@/components/aura-backdrop";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ShowRow } from "@/components/show-row";
import { SkillOrbit } from "@/components/skill-orbit";
import { SiteNav } from "@/components/site-nav";
import { experience, profile, projects, resume } from "@/content/site";

export default function Home() {
  return (
    <>
      <AuraBackdrop />
      <SiteNav />

      <main className="flex-1">
        <Hero />

        <ShowRow
          id="projects"
          kicker="Now streaming"
          heading="Projects"
          shows={projects}
        />

        <ShowRow
          id="experience"
          kicker="Currently airing"
          heading="Experience"
          shows={experience}
        />

        <section id="skills" className="scroll-mt-24 py-16">
          <div className="mb-2 px-6 text-center lg:px-12">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">
                The arsenal
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-4xl tracking-wide text-white sm:text-5xl">
                Skills
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SkillOrbit />
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-12 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-white/60">{profile.title}</p>
          </div>

          <nav aria-label="Resources and profiles" className="flex flex-wrap gap-4">
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-sm font-semibold text-gold underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {resume.label}
            </a>
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="rounded-sm text-sm font-semibold text-white/75 underline-offset-4 transition hover:text-mana hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mana"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
