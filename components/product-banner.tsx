import Image from "next/image";
import type { ElementType } from "react";

import type { Product } from "@/src/data/work";

export function ProductBanner({
  product,
  as: Heading = "h3",
  preload = false,
}: {
  product: Product;
  as?: ElementType;
  preload?: boolean;
}) {
  return (
    <>
      <div className="p-4">
        <Image
          data-cursor-wall
          src={product.banner}
          alt={`${product.name} banner`}
          placeholder="blur"
          preload={preload}
          // Serve the exported JPEG as-is: Next's WebP re-encode visibly
          // pixelates these banners. Still content-hashed and long-cached.
          unoptimized
          className="h-auto w-full rounded-2xl"
        />
      </div>

      <div className="border-border flex items-center justify-between gap-4 border-y px-4 py-2">
        <Heading className="font-display text-2xl font-medium">
          {product.name}
        </Heading>

        {product.liveUrl && (
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${product.name}`}
            className="text-secondary hover:text-primary flex shrink-0 items-center p-1.5 transition-colors"
          >
            {/* Masked so the icon takes the text colour and its hover change. */}
            <span
              aria-hidden
              className="block size-5 bg-current"
              style={{
                maskImage: 'url("/icons/export-arrow.svg")',
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            />
          </a>
        )}
      </div>
    </>
  );
}
