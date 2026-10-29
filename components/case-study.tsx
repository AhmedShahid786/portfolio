import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ProductBanner } from "@/components/product-banner";
import type { Product } from "@/src/data/work";

function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="screen-line-top screen-line-bottom">
      <h2 className="font-display border-border border-b px-4 py-3 text-2xl font-medium">
        {title}
      </h2>
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-muted text-sm">To be written.</p>;
  }

  return items.map((text) => (
    <p key={text} className="text-secondary leading-relaxed">
      {text}
    </p>
  ));
}

export function CaseStudy({ product }: { product: Product }) {
  return (
    <article>
      <header className="screen-line-top">
        <div className="border-border border-b px-4 py-2">
          <Link
            href="/work"
            className="text-muted hover:text-primary text-sm transition-colors"
          >
            ← All work
          </Link>
        </div>

        <ProductBanner product={product} as="h1" preload />

        {(product.company || product.period) && (
          <p className="text-muted flex flex-wrap justify-between gap-x-4 px-4 py-2 text-sm">
            <span>{product.company}</span>
            <span>{product.period}</span>
          </p>
        )}
      </header>

      <CaseStudySection title="The Goal">
        <Paragraphs items={product.goal} />
      </CaseStudySection>

      <CaseStudySection title="Tech Stack">
        {product.stack.length === 0 && (
          <p className="text-muted text-sm">To be written.</p>
        )}
        <ul className="flex flex-wrap gap-2 empty:hidden">
          {product.stack.map((tech) => (
            <li
              key={tech.name}
              className="border-border flex items-center gap-2 rounded-lg border px-2 py-1 text-sm"
            >
              {tech.src && (
                <Image
                  src={tech.src}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized={tech.src.endsWith(".svg")}
                  className="size-4 brightness-0 invert"
                />
              )}
              {tech.name}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection title="My Contribution">
        {product.contribution.length === 0 && <Paragraphs items={[]} />}
        {product.contribution.map((part, index) => (
          <div key={part.title ?? index} className="flex flex-col gap-4">
            {part.title && (
              <h3 className="font-display text-lg leading-tight font-medium">
                {part.title}
              </h3>
            )}
            <Paragraphs items={part.paragraphs} />
          </div>
        ))}
      </CaseStudySection>

      <CaseStudySection title="Impact">
        {product.impact.length === 0 ? (
          <Paragraphs items={[]} />
        ) : (
          <ul className="text-secondary flex list-disc flex-col gap-2 pl-4 leading-relaxed marker:text-muted">
            {product.impact.map((point) => (
              <li key={point.text}>
                {point.highlight && (
                  <strong className="text-primary font-medium">
                    {point.highlight}
                  </strong>
                )}
                {/* No space when the text continues with punctuation. */}
                {point.highlight && !/^[,.;:]/.test(point.text) && " "}
                {point.text}
              </li>
            ))}
          </ul>
        )}
        {product.reflection && <Paragraphs items={product.reflection} />}
      </CaseStudySection>
    </article>
  );
}
