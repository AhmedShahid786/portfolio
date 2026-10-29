import { CaseStudyButton } from "@/components/case-study-button";
import { ProductBanner } from "@/components/product-banner";
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
    <section className="screen-line-top screen-line-bottom">
      <h1 className="sr-only">Work</h1>

      <ul className="divide-border divide-y">
        {PRODUCTS.map((product, index) => (
          <li key={product.slug}>
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}
