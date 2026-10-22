import "server-only";

import { asc, count, desc, eq, isNotNull, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";

import type { Category, Product } from "./types";

/**
 * Every catalog read is cached and tagged, so pages stay prerendered under
 * cacheComponents. After changing catalog data, refresh them with
 * `updateTag(CATALOG_TAG)` in a Server Action (the next read waits for fresh
 * data), or `revalidateTag(CATALOG_TAG, "max")` elsewhere (stale-while-revalidate).
 */
export const CATALOG_TAG = "catalog";

function cacheCatalog() {
  cacheTag(CATALOG_TAG);
  cacheLife("hours");
}

const productWith = {
  category: { columns: { id: true, slug: true, name: true } },
  images: { orderBy: asc(productImages.position) },
} as const;

type ProductWithRelations = NonNullable<
  Awaited<ReturnType<typeof db.query.products.findFirst<{ with: typeof productWith }>>>
>;

const toDollars = (cents: number) => cents / 100;

function toProduct(row: ProductWithRelations): Product {
  const gallery = row.images.map((image) => ({ src: image.url, alt: image.alt }));
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: toDollars(row.priceCents),
    compareAtPrice:
      row.compareAtPriceCents === null ? undefined : toDollars(row.compareAtPriceCents),
    image: gallery[0]?.src ?? "",
    hoverImage: gallery[1]?.src,
    gallery,
    badge: row.badge ?? undefined,
    rating: row.rating,
    reviewCount: row.reviewCount,
    stock: row.stockQuantity,
    summary: row.summary,
    description: row.description,
    details: row.details,
  };
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheCatalog();

  const rows = await db
    .select({
      slug: categories.slug,
      name: categories.name,
      image: categories.imageUrl,
      productCount: count(products.id),
    })
    .from(categories)
    .leftJoin(products, eq(products.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(asc(categories.position), asc(categories.id));

  return rows;
}

/** Homepage "Best sellers": featured products in rank order. */
export async function getBestSellers(): Promise<Product[]> {
  "use cache";
  cacheCatalog();

  const rows = await db.query.products.findMany({
    with: productWith,
    where: isNotNull(products.featuredRank),
    orderBy: [asc(products.featuredRank)],
  });
  return rows.map(toProduct);
}

/** Homepage "New arrivals": most recently added first. */
export async function getNewArrivals(limit = 7): Promise<Product[]> {
  "use cache";
  cacheCatalog();

  const rows = await db.query.products.findMany({
    with: productWith,
    orderBy: [desc(products.createdAt), desc(products.id)],
    limit,
  });
  return rows.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  "use cache";
  cacheCatalog();

  const row = await db.query.products.findFirst({
    with: productWith,
    where: eq(products.slug, slug),
  });
  return row ? toProduct(row) : null;
}

/** Products from the same category first, then others, excluding the product itself. */
export async function getRelatedProducts(
  productId: number,
  categoryId: number,
  limit = 4,
): Promise<Product[]> {
  "use cache";
  cacheCatalog();

  const rows = await db.query.products.findMany({
    with: productWith,
    where: ne(products.id, productId),
    orderBy: [
      sql`case when ${products.categoryId} = ${categoryId} then 0 else 1 end`,
      asc(products.id),
    ],
    limit,
  });
  return rows.map(toProduct);
}

export async function getAllProductSlugs(): Promise<string[]> {
  "use cache";
  cacheCatalog();

  const rows = await db.select({ slug: products.slug }).from(products).orderBy(asc(products.id));
  return rows.map((row) => row.slug);
}
