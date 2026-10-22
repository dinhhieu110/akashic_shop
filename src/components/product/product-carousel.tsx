"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/catalog/types";

type ProductCarouselProps = {
  products: Product[];
  label: string;
  children: React.ReactNode;
};

export function ProductCarousel({
  products,
  label,
  children,
}: ProductCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setCanPrev(row.scrollLeft > 4);
    setCanNext(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    updateEdges();
    row.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      row.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  function scroll(direction: 1 | -1) {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div>
      <div className="section-head">
        <div>{children}</div>
        <div className="hidden gap-2.5 md:flex">
          <button
            type="button"
            className="icon-btn"
            aria-label="Previous products"
            onClick={() => scroll(-1)}
            disabled={!canPrev}
          >
            <ChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label="Next products"
            onClick={() => scroll(1)}
            disabled={!canNext}
          >
            <ChevronRight aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="scroll-row [--per:1.7] sm:[--per:2.6] md:[--per:3.2] lg:[--per:4]"
      >
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            className="scroll-item"
          />
        ))}
      </div>
    </div>
  );
}
