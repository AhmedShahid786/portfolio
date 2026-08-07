"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";

/*
 * From chanhdai.com (MIT, (c) 2026 Chánh Đại) —
 * src/components/base/ui/tooltip.tsx. Copied whole; four edits:
 *
 * 1. Named `base-tooltip` rather than `tooltip`, because upstream keeps two
 *    tooltips and so does this repo: the radix one in `tooltip.tsx` (the
 *    contribution graph's, `asChild`) and this Base UI one (the socials row's,
 *    `render`). Upstream separates them by directory — `src/components/ui/` vs
 *    `src/components/base/ui/` — which a flat repo can't do.
 * 2. Tokens remapped to this project's palette: his `--foreground` (the popup's
 *    fill and the arrow) is `--primary` here, and `--background` keeps its name.
 *    The tooltip is deliberately inverted — white sheet, black text.
 * 3. Dropped three `data-[state=delayed-open]:*` classes. They are radix
 *    leftovers; Base UI marks an open popup with `data-open`, never
 *    `data-state`, so they never matched (verified against his live DOM).
 * 4. `TooltipProvider` keeps his `delay = 0` default. That default *is* the hover
 *    feel — Base UI's own default is 600ms — so the provider has to be an
 *    ancestor of every tooltip, or they open sluggishly. It renders no DOM.
 *
 * The enter/exit animation (`animate-in`, `fade-in-0`, `zoom-in-95`,
 * `slide-in-from-*`) comes from `tw-animate-css`, imported in globals.css, same
 * as upstream.
 */
function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "bg-primary text-background z-50 w-fit max-w-xs origin-(--transform-origin)",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 rounded-lg px-4 py-2 text-sm will-change-transform data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "data-instant:duration-0",
            "selection:bg-background selection:text-primary",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            className={cn(
              "bg-primary fill-primary data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
              "size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs",
              "data-[side=bottom]:rounded-br-sm data-[side=top]:rounded-tl-sm"
            )}
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
