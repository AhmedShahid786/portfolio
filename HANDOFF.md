# Portfolio build — handoff notes

Working doc for the Figma → Next.js port. Last updated 2026-08-05.

**Status: all nine sections of the landing page are built.** What remains is
content (real URLs, real bio) and a few deliberate omissions, listed in §6.

---

## 1. Goal

Implement Ahmed Raza's portfolio design from Figma as a Next.js app at high
visual fidelity but with **responsive, maintainable CSS** — not a pixel
transcription.

**Source of truth (Figma):**

- File key: `95Ywb8pLwLvXC9m4JgFjSX` (file name "Ahmed")
- Main frame: node `100:23420` — "Landing Page", 1200 × 4368
- URL: `https://www.figma.com/design/95Ywb8pLwLvXC9m4JgFjSX/Ahmed?node-id=100-23420`
- Figma MCP authenticates as **Muneeb Ur Rehman** (muneebraj7861@gmail.com), a
  different account from the session user. Access works; not a problem.

---

## 2. Ahmed's instructions (these override defaults)

**Layout / CSS:**

1. **No hardcoded pixel values** for margin, padding, width, height. Use
   Tailwind's spacing scale, prefer even steps (`2`, `4`, `8`, `12`). No
   `mt-[19px]`.
2. **Structure with flexbox/grid, never fixed dimensions.** For "two items at
   both ends": a full-width flex container, `justify-between`, items sized to
   content.
3. **Percentages / fractions** when a size is genuinely needed (`w-1/5`,
   `max-w-sm`), not px.
4. **Semantic colour tokens only** — `primary`, `secondary`, `muted`, `accent`,
   `border`, `background`, `surface`. Never raw hex/rgba in a component.
5. **Theme switch must be one class** on `<html>` overriding the same variables.

His reasoning: hardcoded pixels are "a pain in the ass to make responsive."
Treat the design's absolute coordinates as *intent*, not values to copy.
Trading a few px of exactness for responsiveness is the deal he wants.

**Working style:**

6. **Don't generate or invent assets.** If a font/asset/URL isn't available,
   **say so and move on.** He'll arrange it.
7. **Section by section**, with review between.
8. Theme toggle: rendered for fidelity, **inert** (only a dark theme exists).
9. Real assets exported from his Figma file — not placeholders.
10. **Give yourself the permissions you need** — he doesn't want to approve
    prompts. Done in `.claude/settings.local.json` (gitignored). Figma
    read/export tools plus the usual build/screenshot shell commands are
    allowed; Figma **write** tools and `rm` / `git commit|push|reset|checkout`
    still prompt on purpose. Widen if you need to.

---

## 3. What's built

| Section | Component | Notes |
|---|---|---|
| Nav | `site-nav.tsx` | 3-col grid, centred monogram, inert sun toggle |
| Hero | `hero.tsx` | eyebrow, h1, tagline, availability pill, avatar |
| Socials | `socials.tsx` | 3-up, stacks on mobile |
| About | `about.tsx` | heading + 3 bullets with inline links |
| Projects | `projects.tsx` | 2 cards + "coming soon" placeholder |
| Experience | `experience.tsx` | native `<details>` accordion, no client JS |
| Stack | `stack.tsx` | 12 logos, `gap-px` grid rules |
| Blogs | `blogs.tsx` | 2 post cards + "Reading Now" block |
| Footer | `site-footer.tsx` | CTA + Book a Call + wordmark |
| — | `noise-panel.tsx` | shared noise+60%-black placeholder surface |

Supporting files: `app/globals.css` (token layer), `app/layout.tsx` (Space
Grotesk + Geist Mono + Inter via `next/font`), `app/page.tsx` (753px-ish shell:
`mx-auto w-full max-w-3xl border-x border-border`).

**Verification:** `npx tsc --noEmit` clean, `npm run lint` clean, `npm run
build` compiles and prerenders `/` static. Rendered page height **4361px** vs
the design's **4368px**. Checked at 380 / 400 / 420 / 640 / 1200px — no
horizontal overflow, everything reflows.

Assets live in `public/icons/` (8 SVGs), `public/images/` (avatar, 2 project
covers, noise, reading-now illustration, wordmark), `public/images/tech/` (16
logos), `public/images/companies/`, `public/images/work/`.

---

## 4. Learnings about this Figma file (saves real time)

- **The design is flat.** No auto-layout, no section frames. Absolutely
  positioned text, image rects, and hairline "borders" drawn as **zero-height
  vector nodes**, all directly on `100:23420`. Section structure has to be
  inferred from y-coordinates.
- **`get_metadata` on the whole frame is ~2M chars** (spills to a file).
  `get_design_context` on a mid-size node (a social cell, `100:27632`) blew the
  token cap at 130k chars. **Query small, specific nodes.** For structure, run
  Python over the spilled metadata file filtering by indent depth.
- **No Figma variables** — `get_variable_defs` returns `{}`. All colours
  hardcoded, so the token layer is hand-derived: border
  `rgba(255,255,255,0.12)`, body `rgba(255,255,255,0.8)`, muted
  `rgba(255,255,255,0.6)`, accent `#0CC54C`, ring `rgba(0,255,98,0.1)`,
  media mat `#1F1F1F`, background `#000`.
- **Fonts:** Space Grotesk (headings/nav), Geist Mono (body/labels), Inter (the
  10px pill label). `--text-2xs` (0.625rem) was added because the design's 10px
  label is below Tailwind's smallest default.
- **Exported SVGs carry junk.** Both `logo-ar.svg` and the footer wordmark came
  back with a `#1E1E1E` rect *and* a 1200×4368 black rect baked in. Strip them
  or they render as boxes. **Always read an exported SVG before using it.**
- **The exported wordmark has ~52px of transparent space above its glyphs** —
  that whitespace *is* the design's gap between the button and the wordmark.
  Don't add padding on top of it.
- **Tech logos are full-colour source art.** The design composites them
  monochrome inside project cards and experience chips — reproduced with
  `brightness-0 invert`, and left in colour in the Stack grid where the design
  shows colour. One asset per logo, two treatments.
- **The dot texture is thousands of 1.5px ellipse nodes** named "Dot" scattered
  across the frame. They're why `download_assets` in this file keeps returning
  ~15 near-identical ~6KB SVGs — filter those out; the odd-sized ones are the
  real icons. SVG export caps at 20 assets per node.
  Useful wrinkle: **a node's export includes dots that overlap its bounds**,
  which is how the footer wordmark got its dots for free.
- Icon exports have odd intrinsic sizes (18.5001 × 19.5002) and
  `preserveAspectRatio="none"`. Pass rounded intrinsic width/height to
  `next/image`; don't force a square box or they distort.
- `arrow-circle.svg` is a **left**-pointing iconsax arrow. CSS rotates
  clockwise: `rotate-[135deg]` → up-right (socials), `rotate-180` → right
  ("Next"). `-135deg` gives down-right.
- Blog post covers and the "coming soon" slot use the **same** 700×700 noise
  texture (verified by md5) under a `rgba(0,0,0,0.6)` wash. Without the wash it
  renders far too bright.

## 5. Environment notes

- Next **16.3.0**, React 19.2.8, Tailwind **v4**, TypeScript, App Router.
- `AGENTS.md` requires reading `node_modules/next/dist/docs/` before writing
  code. Already read: layouts-and-pages, css, fonts. `LayoutProps<"/">` is the
  Next 16 route-props helper and is global (no import).
- Dev server: `npm run dev` on :3000. It does **not** survive the laptop
  closing, and the scratchpad is wiped between sessions — the design reference
  (`full.png`) has to be re-fetched with `get_screenshot` on `100:23420` at
  `maxDimension: 4368`.
- Verification loop that worked well:
  ```bash
  google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1200,4600 \
    --screenshot=built.png http://localhost:3000
  ```
  Then compare **text glyph bands** (rows where any pixel exceeds a brightness
  threshold, grouped into runs) between design and build with PIL — that's how
  the hero was matched to ~1px. Detecting rows where >700 of 740 columns are lit
  finds the section border lines, which is the fastest way to compare section
  heights. ImageMagick and PIL are both installed.

---

## 6. Open items for Ahmed

**Content — these need you:**

1. **The About copy is not yours.** It credits "Creator of chanhdai.com (1.8k
   stars), React Wheel Picker (24k+ weekly downloads, ▲Vercel OSS Program), and
   ZaDark (80k+ downloads, 30k+ users)". Those are Chánh Đại's projects — the
   designer left template copy in the frame. Implemented verbatim as designed,
   but shipping it would misattribute someone else's work. **Needs your real
   bio.**
2. **Every URL is a `#` placeholder** — socials, both project "View Live Link"
   buttons, both blog posts, and "Book a Call". The Figma frame has no links.
3. **Metrics are hardcoded from the design** — "1.5K Followers", "8K
   Contributions", "20K Follower", "5+ years". Confirm they're accurate.
4. **Spelling is inconsistent in the design** and reproduced as-is: the
   Islamic Desk paragraph says "Seerat ki Duniya / Nahw Ki Duniya / Surf Ki
   Duniya" while the project tiles below say "Seerat Ki Dunya / Nahw Ki Dunya /
   Sarf Ki Dunya". Note "Surf" vs "Sarf".

**Design bugs I reproduced rather than silently fixed:**

5. **Islamic Desk chips use the wrong icons.** "CICD" shows the **Laravel**
   mark and "Next JS" shows the **Node.js** mark. (The Saylani Tech row uses
   the correct GitHub Actions mark for CICD.) Say the word and I'll swap them.
6. **Saylani Tech has a chevron in the design but no expanded content.** I
   render it without a chevron, since a control that expands nothing is broken
   UX. Give me the description + projects for that role and it becomes a real
   accordion row like Islamic Desk.
7. **Blog post covers are noise placeholders in the design** — there's no real
   cover art in the file.

**Deliberate omissions:**

8. **The dot-grid texture is not implemented** (faint dotted bands behind the
   nav and above the footer CTA). Geometry isn't cleanly recoverable — rotation
   isn't exposed in metadata and SVG export truncates at 20 of ~50. Options:
   select a single dot row in Figma so it can be exported and tiled, or a CSS
   `radial-gradient` — but that's an approximation, so it was left out per
   instruction #6. The wordmark's own dots came through in its export.
9. **KAWARA (Personal Use)** for the `AR` monogram and the footer wordmark isn't
   obtainable; both use vectors exported from your file. Swaps back to text if
   you license it.
10. **Theme toggle is inert** and there is no light palette — the `.light` hook
    is documented in `globals.css`, waiting on light-theme values from you.
11. **Nav logo drifts slightly right of centre below ~480px** (link row
    overflows its `1fr` track). Nothing clips. A real fix means a mobile nav
    pattern the design doesn't specify.
12. On narrow screens the Islamic Desk meta row wraps so its divider lands at
    the start of a line. Cosmetic.
