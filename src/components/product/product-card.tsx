import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { ProductBadge } from "@/components/product/product-badge";
import { Stars } from "@/components/ui/stars";
import { getStockStatus } from "@/lib/catalog/stock";
import type { Product } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const status = getStockStatus(product);
  const sizes = "(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw";

  return (
    <article
      className={`group card card-interactive flex flex-col ${className}`}
    >
      <div className="relative">
        <Link href={href} className="media-frame block" tabIndex={-1}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes}
            className={status === "out_of_stock" ? "opacity-60 grayscale-[0.4]" : ""}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              sizes={sizes}
              className="opacity-0 lg:group-hover:opacity-100"
            />
          )}
        </Link>

        <ProductBadge product={product} className="absolute top-3 left-3" />

        <button
          type="button"
          aria-label={`Save ${product.name} to wishlist`}
          className="icon-btn absolute top-2.5 right-2.5 size-9 sm:top-3 sm:right-3"
        >
          <Heart aria-hidden />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} size={13} />
          <span className="text-xs text-muted">({product.reviewCount})</span>
        </div>

        <h3 className="font-sans text-sm leading-snug font-semibold sm:text-[0.9375rem]">
          <Link
            href={href}
            className="line-clamp-n transition-colors hover:text-accent"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-auto flex flex-wrap items-baseline gap-x-2">
          <span className="text-[0.9375rem] font-extrabold">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          {status === "low_stock" && (
            <span className="ml-auto text-xs font-bold text-accent-600">
              Only {product.stock} left
            </span>
          )}
        </p>

        {status === "out_of_stock" ? (
          <button type="button" className="btn btn-soft btn-sm btn-block mt-1" disabled>
            Sold out
          </button>
        ) : (
          <button type="button" className="btn btn-primary btn-sm btn-block mt-1">
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}
