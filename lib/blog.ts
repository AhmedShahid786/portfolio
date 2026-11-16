import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// Blog posts live as one JSON file each in content/blog/. They're read at build
// time only — every /blog/[slug] page is prerendered to static HTML.

/** Inline text: a plain string, or a string with formatting. */
export type Span =
  | string
  | { text: string; bold?: boolean; italic?: boolean; code?: boolean; href?: string };

export type Image = { src: string; width: number; height: number; alt: string };

export type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; content: Span[] }
  | ({ type: "image"; caption?: string } & Image)
  | { type: "code"; code: string; language?: string }
  | { type: "list"; ordered: boolean; items: Span[][] }
  | { type: "quote"; lines: Span[][] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  tags: string[];
  /** Where the post was first published, if anywhere. */
  canonicalUrl?: string;
  cover?: Image;
  blocks: Block[];
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function readPost(file: string): Post {
  const post = JSON.parse(
    readFileSync(path.join(CONTENT_DIR, file), "utf8"),
  ) as Post;
  const expected = path.basename(file, ".json");
  if (post.slug !== expected) {
    throw new Error(`content/blog/${file}: slug "${post.slug}" ≠ filename "${expected}"`);
  }
  return post;
}

/** All posts, newest first. */
export function getPosts(): Post[] {
  return readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map(readPost)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}
