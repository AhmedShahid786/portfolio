import { Fragment } from "react";

import { CaseStudyButton } from "@/components/case-study-button";
import { ProductBanner } from "@/components/product-banner";
import { SectionSeparator } from "@/components/section-separator";
import { PRODUCTS, type Product } from "@/src/data/work";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article>
      <ProductBanner product={product} preload={index === 0} />

      <div className="flex flex-col gap-6 p-4">
        {product.summary ? (
          <p className="text-secondary leading-snug">{product.summary}</p>
        ) : (
          <p className="text-muted text-sm">To be written.</p>
        )}

        <CaseStudyButton href={`/work/${product.slug}`} />
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section>
      <h1 className="sr-only">Work</h1>

      <ul>
        {PRODUCTS.map((product, index) => (
          <Fragment key={product.slug}>
            {index > 0 && (
              <li aria-hidden="true">
                <SectionSeparator />
              </li>
            )}
            <li className="screen-line-top screen-line-bottom">
              <ProductCard product={product} index={index} />
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
