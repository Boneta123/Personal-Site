/**
 * Every string rendered on this site originates here, transcribed from
 * michaelboneta.com and Boneta_Michael_Resume_MostUpdated.pdf. Do not invent
 * content: if a fact is not in this file, it does not belong on the page.
 *
 * Where the two sources disagree, the resume wins — it is the more recent of
 * the two. The skills list in particular comes from the resume, which does not
 * claim TypeScript or PostgreSQL.
 */

export type Social = {
  label: string;
  url: string;
};

export type Show = {
  id: string;
  title: string;
  /** The "about" blurb shown on the show card. */
  about: string;
  /** Role held, e.g. "Team Leader". */
  role?: string;
  /** Date range as written on the resume. */
  period?: string;
  /** A single quantified result, shown as a stat chip. */
  metric?: string;
  /** Metadata chips rendered under the title. */
  tags: string[];
  links: Social[];
  /** Drives the card's accent colour. */
  accent: "cursed" | "geass" | "gold" | "mana";
};

export type SkillIcon =
  | "python"
  | "openjdk"
  | "c"
  | "javascript"
  | "springboot"
  | "react"
  | "express"
  | "nodedotjs"
  | "mysql"
  | "git"
  | "docker";

export type Skill = {
  id: string;
  name: string;
  category: string;
  icon: SkillIcon;
};

export const profile = {
  name: "Michael Boneta",
  title: "Computer Science Student At Binghamton University",
  // Verbatim, with the source's "competiting" typo corrected to "competing".
  bio: "I'm a computer science student with a deep passion for full stack development and an interest in working with high-scale backend architecture. When I'm not building, you'll find me on the tennis court, competing in Brazilian Jiu-Jitsu, or snowboarding down a mountain",
  socials: [
    { label: "GitHub", url: "https://github.com/Boneta123" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/michael-boneta-0aa176389/",
    },
    // Source site linked this as a relative path, producing a broken URL.
    { label: "Email", url: "mailto:mtbonetajr@gmail.com" },
  ] satisfies Social[],
};

export const projects: Show[] = [
  {
    id: "project-alpha",
    title: "WikiPedia Word Hunt",
    about:
      "Developed a Spring Boot application using the Wikipedia Random API to create an interactive navigation game.",
    role: "Team Leader",
    period: "February 2026 — March 2026",
    tags: ["HTML/CSS", "Java", "Spring Boot", "Wikipedia API"],
    links: [
      { label: "GitHub", url: "https://github.com/Boneta123/Wiki-Word-Hunt" },
    ],
    accent: "cursed",
  },
  {
    id: "project-beta",
    title: "Brawl Selector Help",
    about:
      "A helpful tool for players of the game Brawl Stars to select and optimize their brawler selections.",
    role: "Team Leader",
    period: "April 2026 — June 2026",
    metric: "200+ API calls every 20 minutes",
    // Source site spelled Thymeleaf as "Thymleaf".
    tags: ["JavaScript", "HTML/CSS/Thymeleaf", "Spring Boot"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Boneta123/Brawl-Stars-Brawler-Select-Helper",
      },
    ],
    accent: "mana",
  },
  {
    id: "project-gamma",
    title: "Educational Asteroids Game",
    about:
      "A game testing basic math skills built in just python, using algebra and geometry to calculate the trajectory of asteroids and the player's ship.",
    role: "Team Leader",
    period: "April 2024 — June 2024",
    tags: ["Python"],
    links: [],
    accent: "gold",
  },
];

export const experience: Show[] = [
  {
    id: "job-1",
    title: "Professional Group Plans",
    about:
      "Managing insurance and benefits accounts and software development for internal tools and processes.",
    // The resume independently confirms these dates; the overlap with LI Script
    // is genuine, not a transcription slip.
    role: "Information Technology & Operations Intern",
    period: "June 2026 — August 2026",
    tags: ["Flask", "pandas", "Vertafore API", "BenefitPoint"],
    links: [],
    accent: "geass",
  },
  {
    id: "job-2",
    title: "LI Script",
    about: "Developing applications to manage and automate contact onboarding",
    role: "Information Technology Intern",
    period: "June 2026 — August 2026",
    tags: ["PowerShell", "Python", "Microsoft Graph", "Active Directory"],
    links: [],
    accent: "cursed",
  },
];

/**
 * Curated from the resume's Technical Skills section — the strongest subset
 * rather than all ~20, so the ring stays readable. Languages orbit the inner
 * ring; everything else the outer.
 */
export const skills: Skill[] = [
  { id: "skill-py", name: "Python", category: "Languages", icon: "python" },
  { id: "skill-java", name: "Java", category: "Languages", icon: "openjdk" },
  { id: "skill-c", name: "C", category: "Languages", icon: "c" },
  { id: "skill-js", name: "JavaScript", category: "Languages", icon: "javascript" },
  { id: "skill-spring", name: "Spring Boot", category: "Frameworks", icon: "springboot" },
  { id: "skill-react", name: "React", category: "Frameworks", icon: "react" },
  { id: "skill-express", name: "Express.js", category: "Frameworks", icon: "express" },
  { id: "skill-node", name: "Node", category: "Frameworks", icon: "nodedotjs" },
  { id: "skill-mysql", name: "MySQL", category: "Databases", icon: "mysql" },
  { id: "skill-git", name: "Git", category: "Tools", icon: "git" },
  { id: "skill-docker", name: "Docker", category: "Tools", icon: "docker" },
];

/** Served from /public so the Resources link can open it directly. */
export const resume = {
  href: "/Boneta_Michael_Resume_MostUpdated.pdf",
  label: "Resume",
};
