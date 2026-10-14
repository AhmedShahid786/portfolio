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
          className="h-auto w-full"
        />
      </div>

      <Heading className="border-border font-display border-y px-4 py-2 text-2xl font-medium">
        {product.name}
      </Heading>
    </>
  );
}
