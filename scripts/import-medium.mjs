// One-off importer: Medium RSS → content/blog/<slug>.json + public/blog/<slug>/*.
//
//   npm run import:medium            # skips posts that already have a JSON file
//   npm run import:medium -- --force # re-imports and overwrites them
//
// After import, the JSON files are the source of truth — edit them by hand.

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FEED = "https://medium.com/feed/@ahmedshahid786";
const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content/blog");
const PUBLIC_DIR = path.join(ROOT, "public/blog");
const force = process.argv.includes("--force");

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e) => ENTITIES[e]);
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, ""));
const tag = (xml, name) =>
  xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`))?.[1];

const slugify = (s) =>
  s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const titleCase = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// --- inline HTML → spans ---------------------------------------------------
// A span is a plain string, or { text, bold?, italic?, code?, href? }.
function toSpans(html) {
  const spans = [];
  const marks = { bold: 0, italic: 0, code: 0 };
  const hrefs = [];
  for (const part of html.split(/(<[^>]+>)/)) {
    if (!part) continue;
    const open = part.match(/^<(strong|b|em|i|code|a)\b([^>]*)>$/);
    const close = part.match(/^<\/(strong|b|em|i|code|a)>$/);
    if (open || close) {
      const name = (open ?? close)[1];
      const delta = open ? 1 : -1;
      const bump = (k) => (marks[k] = Math.max(0, marks[k] + delta));
      if (name === "strong" || name === "b") bump("bold");
      else if (name === "em" || name === "i") bump("italic");
      else if (name === "code") bump("code");
      else if (open) hrefs.push(decode(open[2].match(/href="([^"]*)"/)?.[1] ?? ""));
      else hrefs.pop();
      continue;
    }
    if (part.startsWith("<")) continue; // any other tag is dropped
    const text = decode(part);
    const span = { text };
    if (marks.bold) span.bold = true;
    if (marks.italic) span.italic = true;
    if (marks.code) span.code = true;
    if (hrefs.at(-1)) span.href = hrefs.at(-1);
    const prev = spans.at(-1);
    const sameAs = (a, b) =>
      typeof a === "object" && ["bold", "italic", "code", "href"].every((k) => a[k] === b[k]);
    if (prev && sameAs(typeof prev === "string" ? { text: prev } : prev, span)) {
      if (typeof prev === "string") spans[spans.length - 1] = prev + text;
      else prev.text += text;
    } else {
      spans.push(Object.keys(span).length === 1 ? text : span);
    }
  }
  // Trim the outer edges, then drop anything left empty.
  const textOf = (s) => (typeof s === "string" ? s : s.text);
  const setText = (i, t) =>
    typeof spans[i] === "string" ? (spans[i] = t) : (spans[i].text = t);
  if (spans.length) {
    setText(0, textOf(spans[0]).trimStart());
    setText(spans.length - 1, textOf(spans.at(-1)).trimEnd());
  }
  return spans.filter((s) => textOf(s) !== "");
}

// A heading wrapped wholly in <strong> is just a heading.
const plainSpans = (spans) => spans.map((s) => (typeof s === "string" ? s : s.text)).join("");

// --- images -----------------------------------------------------------------
function imageSize(buf) {
  if (buf.subarray(1, 4).toString() === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  if (buf.subarray(0, 3).toString() === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  throw new Error("Unsupported image format");
}

async function downloadImage(url, slug, index) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = path.extname(new URL(url).pathname) || ".png";
  const file = `${String(index).padStart(2, "0")}${ext}`;
  await mkdir(path.join(PUBLIC_DIR, slug), { recursive: true });
  await writeFile(path.join(PUBLIC_DIR, slug, file), buf);
  return { src: `/blog/${slug}/${file}`, ...imageSize(buf) };
}

// --- block HTML → blocks ------------------------------------------------------
async function toBlocks(html, slug) {
  const blocks = [];
  let imageIndex = 0;
  const re = /<(h3|h4|p|pre|blockquote|ul|ol|figure)\b[^>]*>([\s\S]*?)<\/\1>/g;
  for (const [, name, inner] of html.matchAll(re)) {
    if (name === "figure") {
      const src = inner.match(/<img[^>]*src="([^"]+)"/)?.[1];
      if (!src) continue;
      const alt = decode(inner.match(/<img[^>]*alt="([^"]*)"/)?.[1] ?? "");
      const caption = inner.match(/<figcaption>([\s\S]*?)<\/figcaption>/)?.[1];
      const image = await downloadImage(src, slug, ++imageIndex);
      blocks.push({
        type: "image",
        ...image,
        alt: alt || (caption ? stripTags(caption) : ""),
        ...(caption && { caption: stripTags(caption) }),
      });
    } else if (name === "h3" || name === "h4") {
      blocks.push({ type: "heading", level: name === "h3" ? 2 : 3, text: plainSpans(toSpans(inner)).trim() });
    } else if (name === "pre") {
      blocks.push({ type: "code", code: stripTags(inner.replace(/<br\s*\/?>/g, "\n")) });
    } else if (name === "ul" || name === "ol") {
      const items = [...inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => toSpans(m[1]));
      blocks.push({ type: "list", ordered: name === "ol", items });
    } else if (name === "blockquote") {
      // Medium emits one <blockquote> per line; merge consecutive ones.
      const prev = blocks.at(-1);
      if (prev?.type === "quote") prev.lines.push(toSpans(inner));
      else blocks.push({ type: "quote", lines: [toSpans(inner)] });
    } else {
      // A <br> inside a paragraph is a paragraph break in practice.
      for (const chunk of inner.split(/<br\s*\/?>/)) {
        const spans = toSpans(chunk);
        if (spans.length) blocks.push({ type: "paragraph", content: spans });
      }
    }
  }
  // Drop Medium-specific sign-offs ("follow for more", share asks, social links).
  const SIGN_OFF = /follow\s+(me\s+)?for\s+more|share\s+it\s+with\s+your\s+fellow|^(linkedin|github)\s*:/i;
  while (blocks.at(-1)?.type === "paragraph" && SIGN_OFF.test(plainSpans(blocks.at(-1).content))) {
    blocks.pop();
  }

  // Normalise so the post's largest heading is always an h2.
  const headings = blocks.filter((b) => b.type === "heading");
  const shift = Math.min(...headings.map((h) => h.level)) - 2;
  for (const h of headings) h.level -= shift;
  return blocks;
}

// --- main ---------------------------------------------------------------------
const xml = await (await fetch(FEED, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
await mkdir(CONTENT_DIR, { recursive: true });

for (const item of items) {
  const title = decode(tag(item, "title"));
  const slug = slugify(title);
  const file = path.join(CONTENT_DIR, `${slug}.json`);
  if (existsSync(file) && !force) {
    console.log(`skip  ${slug} (exists; --force to overwrite)`);
    continue;
  }

  const html = tag(item, "content:encoded");
  const blocks = await toBlocks(html, slug);

  // A leading image is the cover, not part of the body.
  const cover = blocks[0]?.type === "image" ? blocks.shift() : undefined;
  const firstParagraph = blocks.find((b) => b.type === "paragraph");
  const excerpt = firstParagraph ? plainSpans(firstParagraph.content).trim() : "";

  const post = {
    slug,
    title,
    excerpt: excerpt.length > 160 ? `${excerpt.slice(0, 157).trimEnd()}…` : excerpt,
    publishedAt: new Date(tag(item, "pubDate")).toISOString().slice(0, 10),
    tags: [...item.matchAll(/<category><!\[CDATA\[([^\]]*)\]\]><\/category>/g)]
      .slice(0, 3)
      .map((m) => titleCase(m[1])),
    canonicalUrl: tag(item, "link").split("?")[0],
    ...(cover && { cover: { src: cover.src, width: cover.width, height: cover.height, alt: cover.alt || title } }),
    blocks,
  };

  await writeFile(file, `${JSON.stringify(post, null, 2)}\n`);
  console.log(`wrote ${slug} (${blocks.length} blocks)`);
}
