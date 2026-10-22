import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { getBestSellers } from "@/lib/catalog/queries";

export async function BestSellers() {
  const bestSellers = await getBestSellers();

  return (
    <section aria-labelledby="best-sellers-title" className="container-site section pt-0">
      <div className="section-head justify-center text-center">
        <SectionHeading
          id="best-sellers-title"
          eyebrow="Most loved"
          title="Best sellers"
          description="The pieces our customers come back for, again and again."
          align="center"
        />
      </div>

      <ul className="grid-products">
        {bestSellers.map((product) => (
          <li key={product.slug} className="flex">
            <ProductCard product={product} className="w-full" />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Link
          href="/collections/best-sellers"
          className="btn btn-outline btn-lg w-full max-w-xs"
        >
          Shop all best sellers
        </Link>
      </div>
    </section>
  );
}
