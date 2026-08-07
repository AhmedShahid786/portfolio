import {
  GitHubIcon,
  LinkedInIcon,
  MediumIcon,
  XIcon,
} from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/base-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/base-tooltip";

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
 * Four differences from upstream, all deliberate:
 *
 * - His `Panel`/`PanelContent` wrapper is his page chrome (full-bleed
 *   screen-line borders, a radix Slot). This page has its own section rhythm, so
 *   the `border-t` hairline and `px-4` — which line the icons up with the hero —
 *   stay as they were.
 * - His row has six accounts; this has the four Ahmed has named.
 * - `addQueryParams(item.href, UTM_PARAMS)` is gone. That is his analytics
 *   tagging, not ours.
 * - The tooltip says "GitHub", where his says "GitHub (ncdai)". A platform name
 *   is what Ahmed asked for, so there is no handle field to leave half-empty.
 *
 * TODO: three of the four hrefs are still `#` — the Figma frame carries no
 * links and Ahmed has only supplied GitHub. Follower counts from the old card
 * design are gone for good; this row is an icon and a tooltip, nothing else.
 */
const SOCIAL_LINKS = [
  { title: "X", href: "#", Icon: XIcon },
  { title: "GitHub", href: "https://github.com/ahmedshahid786", Icon: GitHubIcon },
  { title: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { title: "Medium", href: "#", Icon: MediumIcon },
];

export function Socials() {
  return (
    <section className="border-border border-t px-4 py-4">
      <h2 className="sr-only">Social links</h2>

      <TooltipProvider>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map(({ title, href, Icon }) => (
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
                          <Icon />
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
