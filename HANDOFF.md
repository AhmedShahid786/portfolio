# Portfolio build — handoff notes

Working doc for the Figma → Next.js port. Last updated 2026-08-05.

**Status: all nine sections are built; the work now is hand-tweaking them.**

Phase 1 was getting the Figma frame onto the page. That's done. Phase 2 — where
we are — is detail work section by section, plus real content (§6).

Two things changed the ground rules for phase 2:

- **The Figma frame is a first-iteration prototype, not a spec.** Ahmed's own
  words: "the design was not the final word, it was a first iteration." Match its
  intent, fix its mistakes, and don't spend effort chasing its exact numbers.
- **Two reference repos are cloned beside this one** and are fair game to lift
  from: `../chanhdai.com` and `../sleek-portfolio`. See §7 for what's already
  been taken and the rules for taking more.

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

6. **Never invent an asset. This is absolute, and it covers everything** — icons,
   fonts, images, sounds, illustrations, logos, copy. The order to try is:
   1. His Figma file.
   2. **The reference repos cloned beside this one** — `../chanhdai.com` and
      `../sleek-portfolio`. If the asset is there, copy it across and keep the
      attribution (chanhdai.com is MIT, © 2026 Chánh Đại; check
      `sleek-portfolio`'s licence before copying from it).
   3. **Ask him for it.** Stop and ask — don't approximate it, don't draw a
      substitute, don't fall back to a similar icon from another set.
   Restated by Ahmed on 2026-08-05, so treat a near-miss substitute as a bug.
   **Amendment, same day:** for *brand* marks specifically, he approved
   `simple-icons` (CC0) as a source when the reference repos don't have one —
   that's the upstream chanhdai's own icon file cites, so anything from there is
   consistent with the icons already here. Still ask first; the approval was for
   the Medium mark, not a standing licence to fetch icons.
7. **Section by section**, with review between.
8. Theme toggle: **live as of 2026-08-05** — it flips `.dark`/`.light` on
   `<html>`, swaps its icon, and clicks. Still no light palette, so nothing
   changes colour yet; that is deliberate, per his instruction.
9. Real assets exported from his Figma file — not placeholders.
10. **Give yourself the permissions you need** — he doesn't want to approve
    prompts. Done in `.claude/settings.local.json` (gitignored). Figma
    read/export tools plus the usual build/screenshot shell commands are
    allowed; Figma **write** tools and `rm` / `git commit|push|reset|checkout`
    still prompt on purpose. Widen if you need to.
    Since 2026-08-05 that file also sets `permissions.defaultMode:
    "acceptEdits"`, so file edits never prompt. The `ask` list still overrides it
    for the destructive things above — that guard is deliberate, don't "simplify"
    it away by switching the mode to `bypassPermissions`.

---

## 3. What's built

| Section | Component | Notes |
|---|---|---|
| Nav | `site-nav.tsx` | sticky, full-bleed bottom rule; mark left, links right |
| — | `theme-toggle.tsx` | client; moon/sun + click sound, from chanhdai.com |
| Hero | `hero.tsx` | eyebrow, h1, tagline, availability pill, avatar |
| Socials | `socials.tsx` | icon row lifted from chanhdai.com — §7 |
| About | `about.tsx` | heading + 3 bullets with inline links |
| Projects | `projects.tsx` | 2 cards + "coming soon" placeholder |
| Experience | `experience.tsx` | native `<details>` accordion, no client JS |
| Stack | `stack.tsx` | 12 logos, `gap-px` grid rules |
| Blogs | `blogs.tsx` | 2 post cards + "Reading Now" block |
| Footer | `site-footer.tsx` | full-bleed top rule; CTA + Book a Call + wordmark |
| — | `noise-panel.tsx` | shared noise+60%-black placeholder surface |

Supporting files: `app/globals.css` (token layer), `app/layout.tsx` (Space
Grotesk + Geist Mono + Inter via `next/font/google`, KAWARA via
`next/font/local`), `app/page.tsx` — a fragment holding three things: `<SiteNav/>`,
the 753px-ish shell (`mx-auto w-full max-w-3xl border-x border-border`) with the
seven middle sections, and `<SiteFooter/>`. The nav and footer are outside the
shell deliberately; see below.

**Layout of the repo.** Flat by design — no `src/`, and `@/*` maps to the root:

```
app/        globals.css, layout.tsx, page.tsx, fonts/kawara.otf
components/ one file per section, plus theme-toggle.tsx and icons/
hooks/      use-sound, use-click-sound, use-prefers-reduced-motion
lib/sound/  the sound engine, types, and the click-soft data URI
public/     icons/, images/ (+ tech/, companies/, work/) — no fonts
```

`hooks/`, `lib/`, and `components/icons/` all arrived on 2026-08-05 with the
theme toggle and the socials row; everything in them came from chanhdai (§7).

**`globals.css` has three layers, in this order:**

1. `:root` — the raw palette. The only place colour values are written.
2. `@theme inline` — maps those onto Tailwind's namespaces so `bg-surface`,
   `text-muted`, `font-brand`, `text-2xs` exist as utilities. Fonts and font
   sizes live here too, not just colours.
3. `@utility` — hand-written utilities for treatments too fiddly to inline.
   There is currently one, `wordmark` (§6.15). This is the place for anything
   that is three coupled declarations pretending to be one idea; a component
   should not carry `-webkit-text-stroke` and a mask gradient in its class list.

**Fonts live in `app/fonts/`, not `public/`.** `next/font/local` resolves `src`
relative to the file that calls it and then fingerprints, preloads, and
self-hosts the file; anything left in `public/` is served unhashed with no
preload and needs a hand-written `@font-face`. KAWARA is exposed as
`--font-kawara` and consumed through the semantic `--font-brand` token, so
components say `font-brand` and never name the face.

**The nav and the footer live outside the shell**; everything else is inside it.
Both use the same two-element pattern, because a rule that reaches the screen
edges can't come from an element that stops at the shell:

- **outer wrapper** — full width, owns the full-bleed rule (`border-b` on the
  nav's `<header>`, `border-t` on the `<footer>`).
- **inner column** — `mx-auto max-w-3xl`, owns `border-x` so the shell's vertical
  rules run through unbroken, plus the shell-width rule on its other edge
  (`border-t` on the nav, `border-b` on the footer).

Never put the same edge on both, or the line doubles. Verified aligned to the
shell to the pixel at 380 / 640 / 1200 / 1920px, with no horizontal overflow.

**The footer's inner column width is load-bearing beyond the border.** The
wordmark is sized in `cqw` against that column, so if its width drifts from the
shell's, the wordmark silently resizes. The check after touching it: font-size
122.06px, ink 704.08px, container 718px at a 1185px viewport.

The nav specifically is three coupled pieces. Change one and check the others:

1. `<header>` — full width, `sticky top-0 z-50`, `bg-background`, `border-b`.
   Full width is what lets the bottom rule reach the screen edges; the background
   is load-bearing, since an unstyled sticky nav lets the page scroll visibly
   through it.
2. `<nav>` inside it — `mx-auto max-w-3xl` with `border-x border-t`. It re-creates
   the shell's vertical rules so they run through the nav unbroken, and carries
   `border-t` but **not** `border-b` (the header owns that; both would double it).
   Verified aligned to the shell to the pixel at 640 / 1200 / 1920px.
3. `scroll-pt-20` on `<html>` in `layout.tsx` — without it every anchor jump
   (`#about`, `#projects`, `#blogs`) parks its heading at y=0, under the pinned
   nav. 80px against a 66px nav leaves a 14px gap; if the nav's height changes,
   this has to move with it.

Because the nav sits outside the shell, `app/page.tsx` is a fragment: `<SiteNav/>`
then the `max-w-3xl border-x` shell holding everything else.

**Why not chanhdai's `screen-line-bottom`?** It's the obvious candidate — a
`left:-100vw; width:200vw` pseudo-element — and it was rejected on purpose. It
needs an `overflow-x-clip` ancestor or it adds a horizontal scrollbar, and `100vw`
counts the vertical scrollbar's width, so it overflows by exactly that much.
Tested at 1185px viewport *with* a scrollbar present: this structural version has
zero horizontal overflow, where the `vw` version would have had ~15px. If you
later want every section rule to run full-bleed (chanhdai's whole look), that
utility becomes worth the clip ancestor — for the two rules here it isn't, and
the two-element pattern above is what to copy for a third.

**The nav is the only client component.** `theme-toggle.tsx` is `"use client"`
and pulls in `hooks/` and `lib/sound/`; everything else on the page is server-
rendered with no client JS (the Experience accordion is a native `<details>`).
`/` still prerenders static — a client leaf doesn't change that. Worth keeping
that ratio in mind before reaching for a library.

**Verification:** `npx tsc --noEmit` clean, `npm run lint` clean, `npm run
build` compiles and prerenders `/` static. No horizontal overflow at 320 / 380 /
480 / 640 / 768 / 1200 / 1920px, checked by comparing
`documentElement.scrollWidth` against `clientWidth` rather than by eye — see §5.

Rendered page height is **4370px** against the design's **4368px**. Phase 1 held
this at 4361 and treated the gap as the score; that's no longer the metric — the
socials section is deliberately a different design now (§7), so overall height
will drift as sections get reworked. Keep measuring *within* a change (did this
edit move anything it shouldn't have?) rather than against the frame's total.

Assets live in `public/icons/` (8 SVGs, one of them now unused — §6.14),
`public/images/` (avatar, 2 project covers, noise, reading-now illustration,
`footer-dot-band.svg`, and the superseded wordmark), `public/images/tech/` (16
logos), `public/images/companies/`, `public/images/work/`. Fonts are **not**
here — they live in `app/fonts/`, see above.

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
- **The exported wordmark had ~52px of transparent space above its glyphs** —
  that whitespace *was* the design's gap between the button and the wordmark.
  Now that the wordmark is live text, that gap is `pt-11` (44px, which puts the
  baseline where the transparent space had it). Historical, but it explains the
  odd padding value.
- **The wordmark export was three layers, not one.** Besides the glyphs it held
  280 dot circles *and* a black top-to-bottom gradient rect ("Rectangle 146")
  drawn over the glyphs — that gradient is why the wordmark reads as a faded
  ghost rather than solid white. Anything replacing a Figma export with live text
  needs to check for compositing layers like this first; a naive swap silently
  drops them. See §6.8 for how it was split.
- **Tech logos are full-colour source art.** The design composites them
  monochrome inside project cards and experience chips — reproduced with
  `brightness-0 invert`, and left in colour in the Stack grid where the design
  shows colour. One asset per logo, two treatments.
- **The dot texture is thousands of 1.5px ellipse nodes** named "Dot" scattered
  across the frame. They're why `download_assets` in this file keeps returning
  ~15 near-identical ~6KB SVGs — filter those out; the odd-sized ones are the
  real icons. SVG export caps at 20 assets per node.
  Useful wrinkle: **a node's export includes dots that overlap its bounds**,
  which is how the footer band got its dots for free (§6.8). In the export they
  come out as `<circle cx="0.759772" cy="0.759772" r="0.759772">` with the real
  position in a per-element `transform` matrix — so grepping for `cx` values to
  find their geometry returns 280 identical hits. Read the transforms, or just
  move whole groups around and leave the coordinates alone.
- Icon exports have odd intrinsic sizes (18.5001 × 19.5002) and
  `preserveAspectRatio="none"`. Pass rounded intrinsic width/height to
  `next/image`; don't force a square box or they distort.
- `arrow-circle.svg` is a **left**-pointing iconsax arrow. CSS rotates
  clockwise: `rotate-[135deg]` → up-right (socials), `rotate-180` → right
  ("Next"). `-135deg` gives down-right.
- Blog post covers and the "coming soon" slot use the **same** 700×700 noise
  texture (verified by md5) under a `rgba(0,0,0,0.6)` wash. Without the wash it
  renders far too bright.
- **Type that has to span its container wants `cqw`, not `rem`.** The footer
  wordmark is `text-[17cqw]` inside an `@container`, which holds it at 98% of the
  container's width from 320px to 1920px — one declaration replacing what would
  otherwise be a breakpoint per size. Rule #1 forbids px for box metrics; a
  container-relative font size is the same idea applied to type. The multiplier
  is derived, not guessed: KAWARA sets "AHMED RAZA" 5.8em wide, so filling ~92%
  of the box (the design's proportion) needs 0.92 ÷ 5.8 ≈ 0.16 of the container
  per em. Recompute it that way if the string or the face ever changes.

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
  heights. ImageMagick and PIL are both installed (PIL in the **system** python3,
  not in any venv you create).

- **Measure the DOM, don't measure pixels.** Screenshot thresholding falls apart
  the moment content overlaps — dots over a wordmark, a dim hairline near the
  shell's own `border-x` — and it silently returns confident nonsense. Node 24
  has a global `WebSocket`, so a ~30-line script drives Chrome directly with no
  dependencies: spawn it with `--remote-debugging-port`, `fetch /json/list`, open
  the socket, then `Runtime.evaluate` whatever you want to know.
  `getBoundingClientRect`, `getComputedStyle`, and `canvas.measureText`
  (`actualBoundingBoxLeft/Right/Ascent`) give exact ink metrics.
  `Input.dispatchMouseEvent` produces a real user gesture, which is the only way
  to test anything gated on one — audio, for instance.
  `Emulation.setDeviceMetricsOverride` sweeps widths in one run. Working scripts
  from this session are in the session scratchpad; they're a few lines each,
  quicker to rewrite than to find.
- **Type geometry is computable, don't eyeball it.** `fontTools` in a throwaway
  venv (`python3 -m venv`, then `pip install fonttools brotli` — neither is
  preinstalled) gives `unitsPerEm`, `sCapHeight`, and per-glyph advances and
  bounds. That is how the monogram's 2.5rem and the wordmark's ~122px were
  derived from the vector exports instead of guessed, and how "is the design
  letter-spaced?" got a definitive no. `woff2_compress` is on `PATH`;
  `pyftsubset` comes with fonttools.

---

## 6. Open items for Ahmed

**Content — these need you:**

1. **The About copy is not yours.** It credits "Creator of chanhdai.com (1.8k
   stars), React Wheel Picker (24k+ weekly downloads, ▲Vercel OSS Program), and
   ZaDark (80k+ downloads, 30k+ users)". Those are Chánh Đại's projects — the
   designer left template copy in the frame. Implemented verbatim as designed,
   but shipping it would misattribute someone else's work. **Needs your real
   bio.**
2. **Every URL is a `#` placeholder** — all four socials (X, GitHub, LinkedIn,
   Medium), both project "View Live Link" buttons, both blog posts, and "Book a
   Call". The Figma frame has no links. Handles are needed too, not just URLs —
   they're what the social tooltips would show (§6.17).
3. **The follower counts are gone from the page.** "1.5K Followers", "8K
   Contributions" and "20K Follower" lived in the old socials cards; chanhdai's
   icon row that replaced them has nowhere to put a number, and Ahmed asked for
   that row. If you want the counts back they need a home of their own. "5+
   years" is still in the About copy — confirm that one is accurate.
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

8. **The dot-grid texture is implemented in the footer only.** The wordmark
   export turned out to contain 280 real dot circles (5 groups of 56, each dot
   positioned by its own `transform`), so `public/images/footer-dot-band.svg` is
   that export with the wordmark vector and its black gradient cut out — the
   dots are byte-identical to the design. **The band behind the nav is still
   missing**, and the same trick won't get it: those dots don't overlap an
   exportable vector. Either select a dot row in Figma and tile it, or reuse
   `footer-dot-band.svg` as a nav background if the spacing happens to read
   right.
9. ~~**KAWARA (Personal Use)** isn't obtainable~~ — **resolved 2026-08-05.**
   Ahmed supplied `kawara.otf`; the monogram and wordmark are live text now, and
   the metrics confirmed the design's own numbers: cap height is 0.7em, so the
   monogram is exactly 2.5rem/40px and the wordmark ~122px, both at zero
   tracking. Nothing was letter-spaced in the design.
10. **There is still no light palette.** The toggle now works — it flips
    `.dark`/`.light` on `<html>` and swaps its icon — but `.light` defines no
    values, so nothing changes colour. Waiting on light-theme values from you.
    When they land, `theme-toggle.tsx` should probably move to `next-themes`
    (what chanhdai uses) for persistence and system-preference support.
11. ~~**Nav logo drifts right of centre below ~480px**~~ — **moot as of
    2026-08-05.** The nav was rebuilt to Ahmed's spec: monogram hard left,
    `flex-1` spacer, then links, hairline divider, toggle. Nothing is centred
    any more, so there is nothing to drift.
12. On narrow screens the Islamic Desk meta row wraps so its divider lands at
    the start of a line. Cosmetic.

**Waiting on a yes/no from Ahmed:**

13. **`kawara.otf` is 1.2 MB and ships as-is** — his call, deliberately. The
    same font repackaged as WOFF2 is **34 KB** (measured, `woff2_compress`, no
    subsetting: identical glyph set and metrics, purely a container swap). It's a
    35× saving on a file that blocks two brand marks. One command if he wants it.
14. **Six SVGs in `public/` are now unused**, all superseded by live text or by
    inline icons from chanhdai: `icons/logo-ar.svg`,
    `images/wordmark-ahmed-raza.svg` (246 KB), `icons/sun.svg`, `icons/x.svg`,
    `icons/github.svg`, `icons/linkedin.svg`. Left on disk rather than deleted —
    the wordmark is the only record of the design's composited treatment, and
    `logo-ar.svg` may still be wanted for a favicon or OG image. Note
    `icons/arrow-circle.svg` **is** still used, by `blogs.tsx`.
15. **The wordmark hairline reads a touch crisper than the vector did.** Same
    spec — 1px white stroke under the same fade — but the exported SVG was scaled
    1.026× and antialiased its stroke across two pixels, dimming it. Change
    `-webkit-text-stroke` in the `wordmark` utility from `var(--primary)` to
    `var(--secondary)` to match the old softness.
16. **chanhdai's toggle icons animate on hover; ours don't.** His moon wobbles
    and his sun's rays fade in one by one, both via `motion/react`. That is the
    project's first animation library (~35 KB gzipped) on a page that currently
    ships almost no client JS, so it was left out rather than added unasked. The
    icon files are drop-in replaceable — say the word.
17. **Nothing lifted from chanhdai has its tooltip.** His theme toggle shows
    "Toggle mode `D`" and each social icon shows "X (@handle)"; both need a
    tooltip primitive (`@base-ui-components/react`), and the toggle also wants
    `react-hotkeys-hook` for the `D` shortcut. Accessible names are in place
    either way. The social tooltips are also blocked on item 2 — there are no
    handles to put in them yet.

---

## 7. Lifted from chanhdai.com

`../chanhdai.com`, MIT, © 2026 Chánh Đại. Every copied file says so at the top.
Keep that going — it is the licence condition, and it makes the provenance
obvious next time someone diffs against upstream.

| Here | Upstream | Changed? |
|---|---|---|
| `lib/sound/click-soft.ts` | `src/lib/soundcn/click-soft.ts` | verbatim |
| `lib/sound/sound-types.ts` | `src/lib/soundcn/sound-types.ts` | verbatim |
| `lib/sound/sound-engine.ts` | `src/lib/soundcn/sound-engine.ts` | dropped the unused `playSound` |
| `hooks/use-sound.ts` | `src/hooks/soundcn/use-sound.ts` | `useReducedMotion` → local hook |
| `hooks/use-click-sound.ts` | `src/hooks/soundcn/use-click-sound.ts` | verbatim |
| `components/icons/moon-icon.tsx` | `src/components/animated-icons/moon-icon.tsx` | same lucide path, static wrapper |
| `components/icons/sun-medium-icon.tsx` | `src/components/animated-icons/sun-medium-icon.tsx` | same lucide paths, static wrapper |
| `components/theme-toggle.tsx` | `src/components/theme-toggle.tsx` | local state, no tooltip/hotkey |
| `components/icons/brand-icons.tsx` | `src/components/icons.tsx` | X/GitHub/LinkedIn verbatim; Medium from `simple-icons` |
| `components/socials.tsx` | `src/features/portfolio/components/social-links.tsx` | see below |

**The pattern that made these copies cheap:** take the markup and the assets,
leave the design system behind. Three of his primitives were *not* copied, and
their look was inlined instead:

- `Panel`/`PanelContent` — his section chrome (`screen-line` borders, `border-x`,
  radix `Slot`). This page has its own section rhythm, so sections here keep
  using a `border-t` hairline and their own padding.
- `Button variant="outline" size="icon-sm"` — a base-ui component. Its look is
  four classes: `size-8 rounded-lg border border-border` plus an 18px
  (`size-4.5`) icon.
- `Tooltip` — dropped, see §6.17.
- `screen-line-top` / `screen-line-bottom` — his full-bleed hairlines. Rejected
  for the nav in favour of a structural full-width header; the reasoning is in §3
  and it's worth re-reading before reaching for them elsewhere.

What came over untouched is the logic and the assets — the sound files, the hooks,
the icon path data. What got rewritten is every bit of presentation, because this
project already has opinions there. Expect the same split for anything else
lifted from that repo.

Worth knowing:

- **The socials row is a different design from the Figma frame**, on Ahmed's
  instruction (2026-08-05). The frame had three cards with a name, a follower
  count and an up-right arrow; this is a wrapping row of icon-only buttons. The
  counts had nowhere to go — §6.3.
- **The click sound is not a file.** It's a base64 `data:audio/mpeg` URI inside
  `click-soft.ts` (Kenney, CC0) — 915 chars, decodes to 341 frames of mono
  48 kHz, 7 ms. Nothing to put in `public/`, nothing to fetch.
- **Copying from that repo cost zero new dependencies**, but only because the
  animated icons were replaced with static ones. Anything else lifted from there
  is likely to want `motion`, `next-themes`, `clsx`/`tailwind-merge` (`cn`), or
  base-ui — check before promising a clean copy.
- `usePrefersReducedMotion` uses `useSyncExternalStore`, not
  `useState` + `useEffect`: the `react-hooks/set-state-in-effect` lint rule in
  this project rejects mirroring external state into an effect.
