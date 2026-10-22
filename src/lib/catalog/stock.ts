import type { Product, StockStatus } from "./types";

/** At or below this many units a product shows as "low stock". */
export const LOW_STOCK_THRESHOLD = 5;

export function getStockStatus(product: Pick<Product, "stock">): StockStatus {
  if (product.stock <= 0) return "out_of_stock";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}
