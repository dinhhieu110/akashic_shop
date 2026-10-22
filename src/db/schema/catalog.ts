import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const productBadge = pgEnum("product_badge", ["new", "sale", "bestseller"]);

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  position: integer("position").notNull().default(0),
  ...timestamps,
});

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    details: text("details")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    priceCents: integer("price_cents").notNull(),
    compareAtPriceCents: integer("compare_at_price_cents"),
    /** Units available to sell. One number per product: there are no variants yet. */
    stockQuantity: integer("stock_quantity").notNull().default(0),
    badge: productBadge("badge"),
    /** Position in the homepage "Best sellers" list; null = not featured. */
    featuredRank: integer("featured_rank"),
    // Denormalized until a reviews table exists.
    rating: numeric("rating", { precision: 2, scale: 1, mode: "number" }).notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    index("products_featured_rank_idx").on(table.featuredRank),
    index("products_created_at_idx").on(table.createdAt),
    check("products_price_cents_check", sql`${table.priceCents} >= 0`),
    check(
      "products_compare_at_price_check",
      sql`${table.compareAtPriceCents} is null or ${table.compareAtPriceCents} > ${table.priceCents}`,
    ),
    check("products_stock_quantity_check", sql`${table.stockQuantity} >= 0`),
    check("products_rating_check", sql`${table.rating} between 0 and 5`),
    check("products_review_count_check", sql`${table.reviewCount} >= 0`),
  ],
);

export const productImages = pgTable(
  "product_images",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: text("alt").notNull(),
    /** 0 = main image, 1 = card hover image, then the rest of the gallery. */
    position: integer("position").notNull(),
  },
  (table) => [unique("product_images_product_position_key").on(table.productId, table.position)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export type CategoryRow = typeof categories.$inferSelect;
export type NewCategoryRow = typeof categories.$inferInsert;
export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;
export type ProductImageRow = typeof productImages.$inferSelect;
export type NewProductImageRow = typeof productImages.$inferInsert;
