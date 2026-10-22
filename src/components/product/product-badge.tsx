import { getStockStatus } from "@/lib/catalog/stock";
import type { Product } from "@/lib/catalog/types";

const badgeStyles = {
  new: { label: "New", className: "badge badge-success" },
  sale: { label: "Sale", className: "badge" },
  bestseller: { label: "Best seller", className: "badge badge-brand" },
  soldOut: { label: "Sold out", className: "badge badge-dark" },
} as const;

/** Sold out takes priority over the merchandising badge. */
export function ProductBadge({
  product,
  className = "",
}: {
  product: Pick<Product, "badge" | "stock">;
  className?: string;
}) {
  const key =
    getStockStatus(product) === "out_of_stock" ? "soldOut" : product.badge;
  if (!key) return null;

  const badge = badgeStyles[key];
  return <span className={`${badge.className} ${className}`}>{badge.label}</span>;
}
