/**
 * Public-domain ukiyo-e used as texture behind sections.
 *
 * Every entry was verified as `is_public_domain: true` via the Art Institute of
 * Chicago open-access API before download. These are woodblock prints from the
 * 1830s–40s — the ancestor of shonen visual language — NOT stills or fan art
 * from any licensed anime. Do not add imagery from a licensed property here:
 * no such image is free to use, whatever a search result claims.
 *
 * Files live in public/art/ as JPEG and are rendered through next/image, which
 * converts them to webp/avif on the fly.
 */

export type Artwork = {
  src: string;
  /** Alt text — these are decorative, so this stays empty at the call site. */
  title: string;
  artist: string;
  date: string;
  source: string;
};

export const artworks = {
  hero: {
    src: "/art/great-wave.jpg",
    title:
      'Under the Wave off Kanagawa (Kanagawa oki nami ura), from the series "Thirty-Six Views of Mount Fuji"',
    artist: "Katsushika Hokusai",
    date: "1830/33",
    source: "https://www.artic.edu/artworks/24645",
  },
  heroStorm: {
    src: "/art/shower-below-summit.jpg",
    title:
      'Shower Below the Summit (Sanka hakuu), from the series "Thirty-Six Views of Mount Fuji"',
    artist: "Katsushika Hokusai",
    date: "c. 1830/33",
    source: "https://www.artic.edu/artworks/87008",
  },
  projects: {
    src: "/art/yoshitsune-benkei.jpg",
    title: "The Young Yoshitsune defeats Benkei at Gojo Bridge",
    artist: "Utagawa Kuniyoshi",
    date: "c. 1848",
    source: "https://www.artic.edu/artworks/49141",
  },
  experience: {
    src: "/art/nitan-shiro.jpg",
    title:
      'Snake (Mi): Nitan Shiro, from the series "Heroes for the Twelve Animals of the Zodiac (Buyu mitate junishi)"',
    artist: "Utagawa Kuniyoshi",
    date: "c. 1840",
    source: "https://www.artic.edu/artworks/11229",
  },
  skills: {
    src: "/art/demon-king.jpg",
    title: "Gamo Sadahide's Servant, Toki Motosada, Hurling a Demon King",
    artist: "Tsukioka Yoshitoshi",
    date: "1890",
    source: "https://www.artic.edu/artworks/196865",
  },
  footer: {
    src: "/art/kohada-koheiji.jpg",
    title:
      'Kohada Koheiji, from the series "One Hundred Ghost Tales (Hyaku monogatari)"',
    artist: "Katsushika Hokusai",
    date: "1831-32",
    source: "https://www.artic.edu/artworks/47398",
  },
  brawl: {
    src: "/art/zhang-shun.jpg",
    title:
      "Zhang Shun, the White Splash in the Waves, and Li Kui, the Black Whirlwind",
    artist: "Tsukioka Yoshitoshi",
    date: "September 1887",
    source: "https://www.artic.edu/artworks/53874",
  },
} satisfies Record<string, Artwork>;

/**
 * One print per show card, keyed by the show's id in site.ts.
 *
 * Matched to each card's subject loosely and by association, not literally —
 * a battle print for a game about brawling, a river crossing for the internship
 * that migrated data. Read them as mood, not as illustration.
 *
 * Deliberately disjoint from `artworks` above: a card must never carry the same
 * print as the row it sits in. Note that the collection holds several
 * impressions of the same image under different accession numbers (there are
 * three Great Waves), so these were de-duplicated by title, not just by id.
 */
export const cardArt = {
  "project-alpha": {
    src: "/art/card-poems-akahito.jpg",
    title:
      'Yamanobe no Akahito, from the series "One Hundred Poems by One Hundred Poets"',
    artist: "Utagawa Kuniyoshi",
    date: "c. 1842",
    source: "https://www.artic.edu/artworks/11232",
  },
  "project-beta": {
    src: "/art/card-genpei-battle.jpg",
    title:
      "The Utter Defeat of the Taira Clan in the Great Genpei War at Akama Bay",
    artist: "Utagawa Kuniyoshi",
    date: "c. 1845",
    source: "https://www.artic.edu/artworks/46990",
  },
  "project-gamma": {
    src: "/art/card-moon-and-smoke.jpg",
    title:
      'Moon and Smoke (Enchu no tsuki), from the series "One Hundred Aspects of the Moon"',
    artist: "Tsukioka Yoshitoshi",
    date: "1886",
    source: "https://www.artic.edu/artworks/197414",
  },
  "job-1": {
    src: "/art/card-tenryu-ferries.jpg",
    title:
      'Mitsuke: Ferries Crossing the Tenryu River, from the series "Fifty-three Stations of the Tokaido"',
    artist: "Utagawa Hiroshige",
    date: "c. 1837/42",
    source: "https://www.artic.edu/artworks/4368",
  },
  "job-2": {
    src: "/art/card-togetsu-bridge.jpg",
    title: "Togetsu Bridge at Arashiyama in Yamashiro Province",
    artist: "Katsushika Hokusai",
    date: "c. 1833/34",
    source: "https://www.artic.edu/artworks/3652",
  },
} satisfies Record<string, Artwork>;
