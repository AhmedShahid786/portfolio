import type { StaticImageData } from "next/image";

// `src` is optional: tech without a logo in public/images/tech renders as text.
export type ProductTech = { name: string; src?: string };

export type Product = {
  slug: string;
  name: string;
  summary: string;
  // Static import from `src/assets/banners/<slug>.jpg` — not a `/public` path —
  // so next/image gets the intrinsic size (no layout shift), a blur
  // placeholder, and a content-hashed URL that can be cached forever.
  banner: StaticImageData;
  liveUrl?: string;
  // Case-study sections. Each is a list of paragraphs; an empty list renders
  // the heading with a "to be written" note so the page shape stays visible.
  goal: string[];
  stack: ProductTech[];
  contribution: string[];
  impact: string[];
};
