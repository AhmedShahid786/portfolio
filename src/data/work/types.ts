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
  // Static import from `src/assets/logos/<slug>.png`.
  logo: StaticImageData;
  liveUrl?: string;
  // Shown under the name on the case study, e.g. "Saylani Welfare
  // International Trust" · "February 2025 – Present".
  company?: string;
  period?: string;
  // Case-study sections. An empty list renders the heading with a "to be
  // written" note so the page shape stays visible.
  goal: string[];
  stack: ProductTech[];
  contribution: ContributionPart[];
  impact: ImpactPoint[];
  // Closing paragraphs after the impact list.
  reflection?: string[];
};

// One sub-section of "My Contribution"; untitled when there's only one.
export type ContributionPart = { title?: string; paragraphs: string[] };

// One impact bullet; `highlight` renders bold before `text`.
export type ImpactPoint = { highlight?: string; text: string };
