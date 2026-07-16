import { ArtTexture } from "@/components/art-texture";
import { AuraBackdrop } from "@/components/aura-backdrop";
import GlitchText from "@/components/GlitchText";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ShowRow } from "@/components/show-row";
import { SkillOrbit } from "@/components/skill-orbit";
import { SiteNav } from "@/components/site-nav";
import { BlurFade } from "@/components/ui/blur-fade";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { artworks } from "@/content/art";
import { experience, profile, projects, resume } from "@/content/site";

export default function Home() {
  return (
    <>
      <AuraBackdrop />
      <ScrollProgress className="h-0.5" />
      <SiteNav />

      <main className="flex-1">
        <Hero />

        <ShowRow
          id="projects"
          kicker="Now streaming"
          heading="Projects"
          shows={projects}
          art={artworks.projects}
          artRight={artworks.brawl}
        />

        <ShowRow
          id="experience"
          kicker="Currently airing"
          heading="Experience"
          shows={experience}
          art={artworks.experience}
        />

        <section id="skills" className="relative scroll-mt-24 overflow-hidden py-16">
          <ArtTexture art={artworks.skills} side="full" opacity={0.34} />
          {/* Scrim. Unlike the other sections, this print runs full-bleed
              underneath the heading, so the mask can't hold it clear of the
              copy — this guarantees the substrate instead. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-void-deep/90 via-void-deep/60 to-transparent"
          />
          <div className="mb-2 px-6 text-center lg:px-12">
            <BlurFade inView delay={0.05}>
              {/* Small labels run over the prints; anything under white/90 drops
                  below AA against the brightest paper in the artwork. */}
              <p className="text-xs font-semibold tracking-[0.28em] text-white/90 uppercase">
                The arsenal
              </p>
            </BlurFade>
            <BlurFade inView delay={0.12}>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
                <GlitchText>Skills</GlitchText>
              </h2>
            </BlurFade>
          </div>
          <Reveal delay={0.1}>
            <SkillOrbit />
          </Reveal>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-white/10 px-6 py-12 lg:px-12">
        <ArtTexture art={artworks.footer} side="right" opacity={0.34} />
        {/* Scrim: the footer copy spans the full width, including under the
            print's right-hand bleed. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-void-deep/90 via-void-deep/75 to-void-deep/45"
        />

        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-white/90">{profile.title}</p>
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
                className="rounded-sm text-sm font-semibold text-white/90 underline-offset-4 transition hover:text-mana hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mana"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="mx-auto mt-8 max-w-5xl text-xs leading-relaxed text-white/90">
          Section textures are public-domain woodblock prints from the{" "}
          <a
            href="https://www.artic.edu/collection?is_public_domain=1"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/70"
          >
            Art Institute of Chicago
          </a>{" "}
          open-access collection:{" "}
          {Object.values(artworks)
            .map((a) => `${a.artist}, ${a.date}`)
            .join(" · ")}
          .
        </p>
      </footer>
    </>
  );
}
