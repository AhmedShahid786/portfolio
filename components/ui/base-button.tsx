"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * From chanhdai.com (MIT, (c) 2026 Chánh Đại) —
 * src/components/base/ui/button.tsx.
 *
 * The mechanism is his, verbatim: Base UI's Button primitive (so `render` can
 * swap the element while keeping button semantics) wrapped in a cva table, with
 * `className` merged last through `cn`. Named `base-button` after the library,
 * matching `base-tooltip.tsx` — upstream separates his Base UI primitives from
 * his radix ones by directory, which a flat repo can't do.
 *
 * Two edits, both forced by this project's token set:
 *
 * 1. The variant/size table is trimmed to the entries this page actually
 *    reaches — `outline` and `icon-sm`. His other seven (default, secondary,
 *    ghost, destructive, link; sm/lg/icon/icon-xs/icon-lg) resolve against
 *    tokens that don't exist here (`--primary-foreground`, `--destructive`,
 *    `--muted-foreground`), and Tailwind emits nothing for a colour utility
 *    whose token is missing — they'd have been dead class names. Adding one
 *    back is a paste from the upstream file plus its tokens.
 * 2. His colours are remapped onto this project's palette. `--input` (a
 *    translucent white veil, white/0.15) becomes `--control`; `--foreground`
 *    becomes `--primary`; the focus ring uses `--muted` since there is no
 *    `--ring`. His `dark:` prefixes are gone because `:root` here *is* the dark
 *    theme (see globals.css) — this repo has no `dark:` variant.
 *
 * Also dropped: `aria-invalid:*` (no `--destructive`, and no form here) and
 * `in-data-[slot=button-group]:rounded-lg` (no ButtonGroup).
 *
 * `rounded-[min(var(--radius-lg),10px)]` is kept as he wrote it. It computes to
 * 8px here — Tailwind's default `--radius-lg` is 0.5rem, the same value his
 * build resolves — and the cap only bites if the radius scale is ever raised.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-muted focus-visible:ring-3 focus-visible:ring-muted/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        outline:
          "border-control bg-control/30 shadow-xs hover:bg-control/50 hover:text-primary aria-expanded:bg-control/50 aria-expanded:text-primary",
      },
      size: {
        "icon-sm": "size-8 rounded-[min(var(--radius-lg),10px)]",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "icon-sm",
    },
  }
);

function Button({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
