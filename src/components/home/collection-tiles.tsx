import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { getCategories } from "@/lib/catalog/queries";

export async function CollectionTiles() {
  const collections = await getCategories();

  return (
    <section aria-labelledby="collections-title" className="container-site section pt-4 sm:pt-6">
      <div className="section-head">
        <SectionHeading
          id="collections-title"
          eyebrow="Shop by collection"
          title="Find your favourites"
        />
        <Link href="/collections" className="link text-sm font-bold">
          All collections
        </Link>
      </div>

      <ul className="scroll-row [--per:1.35] sm:[--per:2.3] md:[--per:2.8] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {collections.map((collection) => (
          <li key={collection.slug} className="scroll-item lg:w-auto">
            <Link
              href={`/collections/${collection.slug}`}
              className="group relative block aspect-4/5 overflow-hidden rounded-tile bg-surface"
            >
              <Image
                src={collection.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 36vw, 74vw"
                className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
              />
              <span className="scrim-bottom absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 pt-16 text-white sm:p-5 sm:pt-20">
                <span>
                  <span className="block font-display text-xl leading-tight font-semibold sm:text-2xl">
                    {collection.name}
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-white/80 sm:text-sm">
                    {collection.productCount} products
                  </span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors group-hover:bg-brand">
                  <ArrowUpRight aria-hidden className="size-4.5" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
