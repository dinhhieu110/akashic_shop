import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBestSellers } from "@/lib/catalog/queries";
import { editorial } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export async function Hero() {
  const [featured] = await getBestSellers();

  return (
    <section className="container-site pt-3 sm:pt-5">
      <div className="relative isolate flex min-h-[min(82svh,46rem)] overflow-hidden rounded-[1.375rem] bg-night sm:rounded-banner">
        <Image
          src={editorial.hero}
          alt="A person standing beneath the Milky Way on a clear night"
          fill
          preload
          fetchPriority="high"
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="-z-10 object-cover object-[50%_40%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-night/90 via-night/35 to-night/10 md:bg-linear-to-r md:from-night/85 md:via-night/40 md:to-transparent"
        />

        <div className="flex w-full flex-col justify-end gap-8 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-16">
          <div className="on-dark max-w-2xl">
            <span className="eyebrow">The Night Edit · Autumn 2026</span>
            <h1 className="heading-display mt-3">
              Made for long nights &amp; slow mornings
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              Everyday essentials in warm materials and quiet colours. Designed
              to be lived with, built to last.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/collections/new" className="btn btn-primary btn-lg">
                Shop new arrivals
              </Link>
              <Link
                href="/journal/the-night-edit"
                className="btn btn-ghost-light btn-lg"
              >
                Read the story
              </Link>
            </div>
          </div>

          {featured && (
            <Link
              href={`/products/${featured.slug}`}
              className="group hidden w-72 shrink-0 items-center gap-4 rounded-card bg-white/10 p-3 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/15 lg:flex"
            >
              <span className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-2xs font-extrabold tracking-eyebrow text-brand uppercase">
                  Featured
                </span>
                <span className="mt-1 block truncate text-sm font-semibold">
                  {featured.name}
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-sm font-extrabold">
                  {formatPrice(featured.price)}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
