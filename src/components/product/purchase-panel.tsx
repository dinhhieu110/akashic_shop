"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Heart, Minus, Plus } from "lucide-react";

import { formatPrice } from "@/lib/format";

type PurchasePanelProps = {
  name: string;
  price: number;
  stock: number;
};

const MAX_PER_ORDER = 10;

// Cart and wishlist aren't wired up yet; these controls only give local feedback.
export function PurchasePanel({ name, price, stock }: PurchasePanelProps) {
  const soldOut = stock <= 0;
  const max = Math.min(stock, MAX_PER_ORDER);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const actionRef = useRef<HTMLDivElement>(null);

  // Show the mobile buy bar once the main button has scrolled above the
  // viewport. A position check on scroll (not IntersectionObserver) also
  // catches jumps straight past the button, e.g. anchors or scroll restoration.
  useEffect(() => {
    const target = actionRef.current;
    if (!target) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setShowStickyBar(target.getBoundingClientRect().bottom < 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2400);
    return () => clearTimeout(timer);
  }, [added]);

  const addToCart = () => setAdded(true);

  const primaryAction = soldOut ? (
    <button
      type="button"
      className="btn btn-dark btn-lg min-w-0 flex-1 text-center whitespace-normal"
      onClick={() => setWaitlisted(true)}
      disabled={waitlisted}
    >
      {waitlisted ? "You're on the list" : "Notify me when available"}
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-primary btn-lg min-w-0 flex-1 whitespace-normal"
      onClick={addToCart}
    >
      {added ? (
        <>
          <Check aria-hidden className="size-4.5" /> Added to cart
        </>
      ) : (
        <>Add to cart · {formatPrice(price * quantity)}</>
      )}
    </button>
  );

  return (
    <>
      <div ref={actionRef} className="stack [--stack:0.75rem]">
        {!soldOut && (
          <div className="flex items-center gap-4">
            <span id="quantity-label" className="text-sm font-bold">
              Quantity
            </span>
            <div
              role="group"
              aria-labelledby="quantity-label"
              className="inline-flex items-center rounded-full border-2 border-line"
            >
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full transition-colors hover:bg-surface disabled:opacity-35"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus aria-hidden className="size-4" />
              </button>
              <output aria-live="polite" className="w-8 text-center font-bold tabular-nums">
                {quantity}
              </output>
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full transition-colors hover:bg-surface disabled:opacity-35"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(max, q + 1))}
                disabled={quantity >= max}
              >
                <Plus aria-hidden className="size-4" />
              </button>
            </div>
            {quantity >= max && max < MAX_PER_ORDER && (
              <span className="text-xs text-muted">Max available</span>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {primaryAction}
          <button
            type="button"
            className={`icon-btn size-13 ${saved ? "border-accent bg-accent-50 text-accent" : ""}`}
            aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
            aria-pressed={saved}
            onClick={() => setSaved((s) => !s)}
          >
            <Heart aria-hidden className={saved ? "fill-current" : ""} />
          </button>
        </div>

        <p role="status" className="sr-only">
          {added ? `${quantity} × ${name} added to cart` : ""}
          {waitlisted ? `We'll email you when ${name} is back in stock` : ""}
        </p>
      </div>

      {/* Mobile buy bar, sits directly above the tab bar. */}
      <div
        data-buy-bar
        aria-hidden={!showStickyBar}
        inert={!showStickyBar}
        className={`fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 border-t border-line bg-canvas/95 shadow-bar backdrop-blur-md transition-transform duration-300 ease-out-soft lg:hidden ${
          showStickyBar ? "translate-y-0" : "translate-y-[calc(100%+4rem)]"
        }`}
      >
        <div className="container-site flex items-center gap-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="text-sm font-extrabold">{formatPrice(price)}</p>
          </div>
          {soldOut ? (
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={() => setWaitlisted(true)}
              disabled={waitlisted}
            >
              {waitlisted ? "On the list" : "Notify me"}
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn-sm" onClick={addToCart}>
              {added ? "Added" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
