import { SOCIAL_ICONS } from "@/components/social-icons";
import { Button } from "@/components/ui/base-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/base-tooltip";
import { SOCIAL_LINKS } from "@/src/data/socials";

export function Socials() {
  return (
    <section className="screen-line-top screen-line-bottom p-4">
      <h2 className="sr-only">Social links</h2>

      <TooltipProvider>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((link) => {
            const { name, title, href } = link;
            const isMailto = href.startsWith("mailto:");
            // `handle` is absent on the mail entry, which has nothing to append.
            const handle = "handle" in link ? link.handle : undefined;

            return (
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
                          <a
                            href={href}
                            target={isMailto ? undefined : "_blank"}
                            rel={isMailto ? undefined : "noopener"}
                          >
                            {SOCIAL_ICONS[name]}
                            <span className="sr-only">{title}</span>
                          </a>
                        }
                      />
                    }
                  />
                  <TooltipContent>
                    {handle ? `${title} (@${handle})` : title}
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </TooltipProvider>
    </section>
  );
}
