import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { ProductCarousel } from "@/components/product/product-carousel";
import { getNewArrivals } from "@/lib/catalog/queries";

export async function NewArrivals() {
  const newArrivals = await getNewArrivals();

  return (
    <section aria-labelledby="new-arrivals-title" className="container-site section overflow-hidden">
      <ProductCarousel products={newArrivals} label="New arrivals">
        <SectionHeading
          id="new-arrivals-title"
          eyebrow="Just landed"
          title="New arrivals"
        />
        <Link href="/collections/new" className="link mt-3 inline-block text-sm font-bold">
          View all new
        </Link>
      </ProductCarousel>
    </section>
  );
}
