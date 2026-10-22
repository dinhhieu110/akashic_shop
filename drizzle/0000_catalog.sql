CREATE TYPE "public"."product_badge" AS ENUM('new', 'sale', 'bestseller');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"product_id" integer NOT NULL,
	"url" text NOT NULL,
	"alt" text NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "product_images_product_position_key" UNIQUE("product_id","position")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"category_id" integer NOT NULL,
	"name" text NOT NULL,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"details" text[] DEFAULT '{}'::text[] NOT NULL,
	"price_cents" integer NOT NULL,
	"compare_at_price_cents" integer,
	"stock_quantity" integer DEFAULT 0 NOT NULL,
	"badge" "product_badge",
	"featured_rank" integer,
	"rating" numeric(2, 1) DEFAULT 0 NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug"),
	CONSTRAINT "products_price_cents_check" CHECK ("products"."price_cents" >= 0),
	CONSTRAINT "products_compare_at_price_check" CHECK ("products"."compare_at_price_cents" is null or "products"."compare_at_price_cents" > "products"."price_cents"),
	CONSTRAINT "products_stock_quantity_check" CHECK ("products"."stock_quantity" >= 0),
	CONSTRAINT "products_rating_check" CHECK ("products"."rating" between 0 and 5),
	CONSTRAINT "products_review_count_check" CHECK ("products"."review_count" >= 0)
);
--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "products_category_id_idx" ON "products" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "products_featured_rank_idx" ON "products" USING btree ("featured_rank");--> statement-breakpoint
CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");