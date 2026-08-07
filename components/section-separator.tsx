/*
 * From chanhdai.com (MIT, (c) 2026 Chánh Đại) — the local `Separator` in
 * `src/app/(app)/page.tsx`. The class list is his, verbatim, apart from
 * `border-line` → `border-border` (this palette has no `--line`).
 *
 * The striped band between sections. `stripe-divider` paints a full-bleed
 * diagonal hatch from a 200vw pseudo-element; `border-x` continues the shell's
 * vertical rules through the band. The height comes from `--separator-height`,
 * set once on the shell in `app/page.tsx` — it is a variable rather than a
 * literal because the anchor scroll offset has to account for it too.
 */
export function SectionSeparator() {
  return (
    <div className="stripe-divider border-border h-(--separator-height) w-full border-x" />
  );
}
