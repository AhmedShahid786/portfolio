export type Post = {
  title: string;
  tags: string[];
  excerpt: string;
  href: string;
};

export type Reading = {
  title: string;
  author: string;
  blurb: string;
};

// TODO: real post URLs — the Figma frame has no links.
export const POSTS = [
  {
    title: "How I accomplished nothing I wanted to by 14.",
    tags: ["Life", "Career", "Experience"],
    excerpt:
      "Navigating the Treacherous Waters of Adolescence: Tales of Triumph and Tribulation",
    href: "#",
  },
  {
    title: "You shouldn’t become a designer.",
    tags: ["Career", "Design", "Life"],
    excerpt:
      "Is a Career in Design Right for You? Key Considerations Before You Commit",
    href: "#",
  },
] satisfies Post[];

/** The single "Reading Now" slot under the post grid. */
export const READING = {
  title: "Steal Like an Artist",
  author: "By Austin Kleon",
  blurb:
    "Steal Like an Artist is a guide to finding your creative voice by embracing influence and remixing ideas from others.",
} satisfies Reading;
