import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { ProductBadge } from "@/components/product/product-badge";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { StockStatus } from "@/components/product/stock-status";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Disclosure } from "@/components/ui/disclosure";
import { Stars } from "@/components/ui/stars";
import { getAllProductSlugs, getProduct, getRelatedProducts } from "@/lib/catalog/queries";
import { getStockStatus } from "@/lib/catalog/stock";
import { formatPrice } from "@/lib/format";

// Render the whole page before responding, so an unknown slug's notFound()
// can still set a 404 status instead of streaming a 200 shell first.
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Akashic Shop`,
    description: product.summary,
    openGraph: {
      title: product.name,
      description: product.summary,
      images: [{ url: product.image, width: 1000, height: 1000 }],
    },
  };
}

const assurances = [
  { icon: Truck, text: "Free shipping over $75" },
  { icon: RotateCcw, text: "Free 30-day returns" },
  { icon: ShieldCheck, text: "2-year warranty" },
];

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const collection = product.category;
  const related = await getRelatedProducts(product.id, product.category.id);
  const status = getStockStatus(product);
  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.gallery.map((image) => image.src),
    category: collection?.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability:
        status === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : status === "low_stock"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="container-site pt-5 pb-4 sm:pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            ...(collection
              ? [{ label: collection.name, href: `/collections/${collection.slug}` }]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      <section
        aria-labelledby="product-title"
        className="container-site grid grid-cols-[minmax(0,1fr)] gap-8 pb-(--section-y) lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20"
      >
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <ProductGallery
            images={product.gallery}
            dimmed={status === "out_of_stock"}
            badge={<ProductBadge product={product} />}
          />
        </div>

        <div>
          {collection && (
            <Link href={`/collections/${collection.slug}`} className="eyebrow link">
              {collection.name}
            </Link>
          )}
          <h1 id="product-title" className="heading-2 mt-2">
            {product.name}
          </h1>

          <a href="#product-info" className="mt-3 inline-flex items-center gap-2 text-sm">
            <Stars rating={product.rating} size={15} />
            <span className="font-bold">{product.rating}</span>
            <span className="text-muted underline-offset-2 hover:underline">
              {product.reviewCount} reviews
            </span>
          </a>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="font-display text-3xl leading-none font-bold sm:text-4xl">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-muted line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="badge">Save {formatPrice(savings)}</span>
              </>
            )}
          </div>
          <p className="mt-1.5 text-xs text-muted">Taxes included. Shipping calculated at checkout.</p>

          <p className="lede mt-5">{product.summary}</p>

          <div className="divider my-6" />

          <StockStatus product={product} detailed className="mb-5" />

          <PurchasePanel name={product.name} price={product.price} stock={product.stock} />

          <ul className="mt-6 grid gap-3 rounded-card bg-surface p-4 sm:grid-cols-3 sm:gap-2 sm:p-3">
            {assurances.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2.5 text-sm font-semibold sm:flex-col sm:gap-1.5 sm:text-center sm:text-xs"
              >
                <Icon aria-hidden className="size-5 shrink-0 text-brand-700" />
                {text}
              </li>
            ))}
          </ul>

          <div id="product-info" className="mt-8 border-t border-line">
            <Disclosure title="Description" name="product-info" defaultOpen>
              <p>{product.description}</p>
            </Disclosure>
            <Disclosure title="Details & materials" name="product-info">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-600">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Disclosure>
            <Disclosure title="Shipping & returns" name="product-info">
              <p>
                Orders ship within 1–2 business days from our warehouse. Standard
                delivery takes 3–5 days and is free on orders over $75. Not quite
                right? Return unused items within 30 days for a full refund.
              </p>
            </Disclosure>
            <Disclosure title={`Reviews (${product.reviewCount})`} name="product-info">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl leading-none font-bold">
                  {product.rating}
                </span>
                <span>
                  <Stars rating={product.rating} size={15} />
                  <span className="block text-xs text-muted">
                    Based on {product.reviewCount} verified reviews
                  </span>
                </span>
              </div>
            </Disclosure>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-site">
          <div className="section border-t border-line pb-0">
            <div className="section-head">
              <SectionHeading
                id="related-title"
                eyebrow="Pairs well with"
                title="You may also like"
              />
              {collection && (
                <Link
                  href={`/collections/${collection.slug}`}
                  className="link text-sm font-bold"
                >
                  Shop {collection.name}
                </Link>
              )}
            </div>
            <ul className="grid-products">
              {related.map((item) => (
                <li key={item.slug} className="flex">
                  <ProductCard product={item} className="w-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
