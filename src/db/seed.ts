// Loads the sample catalog. Safe to re-run: rows are upserted by slug and each
// product's images are replaced. Run with `npm run db:seed`.
import { getTableColumns, inArray, sql, type Table } from "drizzle-orm";

import { db } from "./index";
import { categories, productImages, products, type NewProductRow } from "./schema";
import {
  featuredSlugs,
  galleryFor,
  newArrivalSlugs,
  seedCategories,
  seedProducts,
} from "./seed-data";

const DAY = 24 * 60 * 60 * 1000;
const toCents = (dollars: number) => Math.round(dollars * 100);

// "New arrivals" are ordered by created_at, so give them the most recent
// dates (newest first) and everything else older ones.
function createdAtFor(slug: string, index: number) {
  const newIndex = newArrivalSlugs.indexOf(slug);
  const base = Date.UTC(2026, 9, 20);
  return new Date(newIndex >= 0 ? base - newIndex * DAY : base - (60 + index) * DAY);
}

/** On conflict, copy every column from the incoming row except those in `skip`. */
function excludedSet<T extends Table>(table: T, skip: (keyof T["_"]["columns"])[]) {
  return Object.fromEntries(
    Object.entries(getTableColumns(table))
      .filter(([key]) => !skip.includes(key))
      .map(([key, column]) => [key, sql.raw(`excluded."${column.name}"`)]),
  );
}

async function main() {
  const categoryRows = await db
    .insert(categories)
    .values(
      seedCategories.map((category, position) => ({
        slug: category.slug,
        name: category.name,
        imageUrl: category.image,
        position,
      })),
    )
    .onConflictDoUpdate({
      target: categories.slug,
      set: { ...excludedSet(categories, ["id", "slug", "createdAt"]), updatedAt: new Date() },
    })
    .returning({ id: categories.id, slug: categories.slug });

  const categoryId = new Map(categoryRows.map((row) => [row.slug, row.id]));

  const productValues: NewProductRow[] = seedProducts.map((product, index) => {
    const id = categoryId.get(product.category);
    if (!id) throw new Error(`Unknown category "${product.category}" for ${product.slug}`);
    const rank = featuredSlugs.indexOf(product.slug);
    return {
      slug: product.slug,
      categoryId: id,
      name: product.name,
      summary: product.summary,
      description: product.description,
      details: product.details,
      priceCents: toCents(product.price),
      compareAtPriceCents: product.compareAtPrice ? toCents(product.compareAtPrice) : null,
      stockQuantity: product.stock,
      badge: product.badge ?? null,
      featuredRank: rank >= 0 ? rank + 1 : null,
      rating: product.rating,
      reviewCount: product.reviewCount,
      createdAt: createdAtFor(product.slug, index),
    };
  });

  const productRows = await db
    .insert(products)
    .values(productValues)
    .onConflictDoUpdate({
      target: products.slug,
      set: { ...excludedSet(products, ["id", "slug"]), updatedAt: new Date() },
    })
    .returning({ id: products.id, slug: products.slug });

  const productId = new Map(productRows.map((row) => [row.slug, row.id]));
  const imageValues = seedProducts.flatMap((product) =>
    galleryFor(product).map((image, position) => ({
      productId: productId.get(product.slug)!,
      url: image.url,
      alt: image.alt,
      position,
    })),
  );

  // neon-http has no interactive transactions; batch runs both statements atomically.
  await db.batch([
    db.delete(productImages).where(inArray(productImages.productId, [...productId.values()])),
    db.insert(productImages).values(imageValues),
  ]);

  console.log(
    `Seeded ${categoryRows.length} categories, ${productRows.length} products, ${imageValues.length} images.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
