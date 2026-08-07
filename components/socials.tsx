import { SOCIAL_ICONS } from "@/components/social-icons";
import { Button } from "@/components/ui/base-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/base-tooltip";
import { SOCIAL_LINKS } from "@/src/data/socials";

/*
 * From chanhdai.com (MIT, (c) 2026 Chánh Đại) —
 * src/features/portfolio/components/social-links.tsx.
 *
 * The control is his, as it is: Base UI's Button rendered *as* an anchor
 * (`nativeButton={false}` + `render`), so it keeps button semantics — a real
 * role, keyboard press handling, the pressed scale — while still being a link.
 * Class list, sizing and hover states are his too; see components/ui/button.tsx
 * for the token remapping and components/ui/tooltip.tsx for the popup.
 *
 * The data/icon split is his as well: names and URLs in src/data/socials.ts,
 * the icon binding in components/social-icons.tsx, joined here by `name`.
 *
 * Four differences from upstream, all deliberate:
 *
 * - His `Panel`/`PanelContent` wrapper is his page chrome (a radix Slot around
 *   the screen-line borders). The wrapper is still not copied, but the borders
 *   now are — every section here carries `screen-line-top screen-line-bottom`,
 *   so this one dropped its `border-t` to avoid doubling the rule. `px-4`, which
 *   lines the icons up with the hero, stays as it was.
 * - His row has six accounts; this has the four Ahmed has named.
 * - `addQueryParams(item.href, UTM_PARAMS)` is gone. That is his analytics
 *   tagging, not ours.
 * - The tooltip says "GitHub", where his says "GitHub (ncdai)". A platform name
 *   is what Ahmed asked for, so there is no handle field to leave half-empty.
 */
export function Socials() {
  return (
    <section className="screen-line-top screen-line-bottom p-4">
      <h2 className="sr-only">Social links</h2>

      <TooltipProvider>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map(({ name, title, href }) => (
            <li key={title}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      className="text-secondary shadow-none [&_svg:not([class*='size-'])]:size-4.5"
                      variant="outline"
                      size="icon-sm"
                      nativeButton={false}
                      render={
                        <a href={href} target="_blank" rel="noopener">
                          {SOCIAL_ICONS[name]}
                          <span className="sr-only">{title}</span>
                        </a>
                      }
                    />
                  }
                />
                <TooltipContent>{title}</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </section>
  );
}
