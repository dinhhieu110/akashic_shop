import { getStockStatus } from "@/lib/catalog/stock";
import type { Product } from "@/lib/catalog/types";

const styles = {
  in_stock: { dot: "bg-success", text: "text-success" },
  low_stock: { dot: "bg-accent", text: "text-accent-600" },
  out_of_stock: { dot: "bg-subtle", text: "text-muted" },
} as const;

function label(product: Pick<Product, "stock">) {
  switch (getStockStatus(product)) {
    case "in_stock":
      return "In stock";
    case "low_stock":
      return `Only ${product.stock} left`;
    case "out_of_stock":
      return "Sold out";
  }
}

type StockStatusProps = {
  product: Pick<Product, "stock">;
  /** Adds a line about shipping or restocking under the label. */
  detailed?: boolean;
  className?: string;
};

export function StockStatus({ product, detailed = false, className = "" }: StockStatusProps) {
  const status = getStockStatus(product);
  const style = styles[status];
  const note =
    status === "out_of_stock"
      ? "Restocking soon. Join the waitlist to hear first."
      : "Ships in 1–2 business days.";

  return (
    <p className={`flex items-start gap-2.5 ${className}`}>
      <span className="relative mt-[0.4em] flex size-2.5 shrink-0">
        {status === "low_stock" && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60"
          />
        )}
        <span className={`relative size-2.5 rounded-full ${style.dot}`} />
      </span>
      <span className="text-sm leading-snug">
        <span className={`font-bold ${style.text}`}>{label(product)}</span>
        {detailed && <span className="block text-muted">{note}</span>}
      </span>
    </p>
  );
}
