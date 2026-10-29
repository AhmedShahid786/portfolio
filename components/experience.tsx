import Image from "next/image";
import Link from "next/link";

import { AccordionSummary } from "@/components/accordion-summary";
import { EXPERIENCE, type Entry } from "@/src/data/experience";
import type { Product } from "@/src/data/work/types";

function Chevron() {
  return (
    <span
      aria-hidden
      // Points down when closed, flips up when open.
      className="block size-4 shrink-0 bg-current transition-transform duration-400 group-open:rotate-180"
      style={{
        maskImage: 'url("/icons/chevron-down.svg")',
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}

// Logo with the name beside it. With the banner and Case Study button gone, the
// row itself links to the case study.
function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/work/${product.slug}`}
      className="text-secondary hover:text-primary flex items-center gap-2 transition-colors"
    >
      {/* White 40px tile; the logo sits inside at 60% (24px), scaled to fit
          since the logos aren't all square. */}
      <span className="bg-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
        <Image
          src={product.logo}
          alt=""
          sizes="1.5rem"
          className="size-6 object-contain"
        />
      </span>
      <span className="font-display text-lg font-medium">{product.name}</span>
    </Link>
  );
}

function ExperienceEntry({ entry, open }: { entry: Entry; open: boolean }) {
  return (
    <details open={open} className="group accordion">
      <AccordionSummary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-display text-lg leading-tight font-medium">
              {entry.company}
            </h3>
            {entry.mode && (
              <span className="text-muted text-sm">{entry.mode}</span>
            )}
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="text-secondary text-sm">{entry.role}</p>
            {entry.period && (
              <span className="text-muted text-sm">{entry.period}</span>
            )}
          </div>
        </div>

        <span className="text-muted">
          <Chevron />
        </span>
      </AccordionSummary>

      <div>
        {entry.summary && (
          <p className="text-secondary p-4 leading-relaxed">{entry.summary}</p>
        )}

        {entry.products.length > 0 && (
          // No top padding: the summary's p-4 above already spaces it.
          <div className="flex flex-col gap-4 px-4 pb-4">
            <h4 className="font-display text-lg leading-tight font-medium">
              Products
            </h4>

            {/* All products on one line, wrapping when they run out of room,
                split by a thin vertical line. */}
            <ul className="flex flex-wrap gap-y-4">
              {entry.products.map((product, index) => (
                <li key={product.slug} className="flex">
                  {index > 0 && (
                    <span
                      aria-hidden
                      className="bg-border mx-4 w-px self-stretch"
                    />
                  )}
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
}

export function Experience() {
  return (
    <section id="experience" className="screen-line-top screen-line-bottom">
      <h2 className="font-display border-border border-b px-4 py-3 text-3xl font-medium">
        Experience
      </h2>

      <ul className="divide-border divide-y">
        {EXPERIENCE.map((entry, index) => (
          <li key={entry.company}>
            <ExperienceEntry entry={entry} open={index === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
