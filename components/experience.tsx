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

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/work/${product.slug}`}
      className="group/product flex flex-col gap-2 p-4"
    >
      <Image
        src={product.banner}
        alt={`${product.name} banner`}
        placeholder="blur"
        // Same as product-banner.tsx: the exported JPEG, not a WebP re-encode.
        unoptimized
        className="h-auto w-full"
      />
      <span className="font-display group-hover/product:text-primary text-secondary text-lg font-medium transition-colors">
        {product.name}
      </span>
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

      <div className="flex flex-col gap-4 pb-4">
        {entry.summary && (
          <p className="text-secondary px-4 leading-relaxed">{entry.summary}</p>
        )}

        {entry.products.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="font-display px-4 text-lg leading-tight font-medium">
              Products
            </h4>

            {/* Striped gutters either side, same treatment as the Stack panel. */}
            <div className="diagonal-stripes">
              <ul className="border-border bg-background divide-border mx-4 divide-y border-x border-y">
                {entry.products.map((product) => (
                  <li key={product.slug}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>
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
