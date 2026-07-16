import { ArrowDown, FileText, Mail } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { profile, resume } from "@/content/site";
import { brandIcons } from "@/lib/brand-icons";

function SocialIcon({ label }: { label: string }) {
  const path = brandIcons[label];

  if (!path) return <Mail className="size-4 transition group-hover:text-mana" />;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      className="size-4 transition group-hover:text-mana"
    >
      <path d={path} />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center px-6 py-24 lg:px-12">
      {/* Vertical rail marking the hero, in the manner of a title card. */}
      <div
        aria-hidden
        className="absolute top-1/2 left-0 h-2/3 w-1 -translate-y-1/2 bg-gradient-to-b from-cursed via-geass to-mana"
      />

      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.4em] text-mana uppercase">
            Portfolio
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl leading-[0.9] tracking-wide text-white sm:text-8xl lg:text-9xl">
            <span className="block text-glow text-cursed">Michael</span>
            <span className="block text-glow text-gold">Boneta</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl border-l-2 border-geass pl-4 font-[family-name:var(--font-geist-mono)] text-sm tracking-wide text-white/90 sm:text-base">
            {profile.title}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {profile.bio}
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-gold bg-gold/15 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/25 hover:shadow-[0_0_24px_var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <FileText className="size-4" />
              {resume.label}
            </a>

            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-mana hover:bg-mana/15 hover:shadow-[0_0_20px_var(--mana)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mana"
              >
                <SocialIcon label={social.label} />
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-white/50 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mana"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
