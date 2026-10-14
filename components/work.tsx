import Image from "next/image";
import Link from "next/link";

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

        <Link
          href={`/work/${product.slug}`}
          className="border-border hover:border-secondary flex items-center gap-2 self-end rounded-lg border px-4 py-2 text-sm transition-colors"
        >
          View Case Study
          <Image
            src="/icons/arrow-circle.svg"
            alt=""
            width={14}
            height={14}
            unoptimized
            className="rotate-180"
          />
        </Link>
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
