// Storefront-facing catalog types. Plain serializable objects, safe to pass to
// client components. Prices are in dollars; the database stores cents.

export type Category = {
  slug: string;
  name: string;
  image: string;
  productCount: number;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductBadge = "new" | "sale" | "bestseller";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: { id: number; slug: string; name: string };
  price: number;
  compareAtPrice?: number;
  image: string;
  hoverImage?: string;
  gallery: ProductImage[];
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  stock: number;
  summary: string;
  description: string;
  details: string[];
};
