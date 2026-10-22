"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { ProductImage } from "@/lib/catalog/types";

type ProductGalleryProps = {
  images: ProductImage[];
  /** Overlaid on the main image, e.g. a sale or sold-out badge. */
  badge?: React.ReactNode;
  dimmed?: boolean;
};

export function ProductGallery({ images, badge, dimmed = false }: ProductGalleryProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = images.length;

  function goTo(index: number) {
    const strip = stripRef.current;
    if (!strip) return;
    const next = (index + count) % count;
    strip.scrollTo({ left: next * strip.clientWidth, behavior: "smooth" });
    setActive(next);
  }

  function onScroll() {
    const strip = stripRef.current;
    if (!strip) return;
    const index = Math.round(strip.scrollLeft / strip.clientWidth);
    if (index !== active) setActive(index);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div className="relative min-w-0 flex-1">
        <div
          ref={stripRef}
          onScroll={onScroll}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") goTo(active + 1);
            if (event.key === "ArrowLeft") goTo(active - 1);
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Product images"
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-panel bg-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="relative aspect-square w-full shrink-0 snap-center"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload={i === 0}
                fetchPriority={i === 0 ? "high" : undefined}
                sizes="(min-width: 1440px) 680px, (min-width: 1024px) 50vw, 100vw"
                className={`object-cover ${dimmed ? "opacity-70" : ""}`}
              />
            </div>
          ))}
        </div>

        {badge && <div className="pointer-events-none absolute top-4 left-4">{badge}</div>}

        {count > 1 && (
          <>
            <div className="absolute inset-x-4 top-1/2 hidden -translate-y-1/2 justify-between lg:flex">
              <button
                type="button"
                className="icon-btn"
                aria-label="Previous image"
                onClick={() => goTo(active - 1)}
              >
                <ChevronLeft aria-hidden />
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label="Next image"
                onClick={() => goTo(active + 1)}
              >
                <ChevronRight aria-hidden />
              </button>
            </div>

            <span className="absolute right-4 bottom-4 rounded-full bg-ink/75 px-2.5 py-1 text-2xs font-bold text-white tabular-nums backdrop-blur-sm">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="flex gap-2.5 lg:w-20 lg:flex-col xl:w-24" aria-label="Choose an image">
          {images.map((image, i) => (
            <li key={image.src} className="w-18 sm:w-20 lg:w-full">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 bg-surface transition-colors ${
                  i === active ? "border-ink" : "border-transparent hover:border-line-strong"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
