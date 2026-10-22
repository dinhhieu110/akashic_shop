import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-muted sm:text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="link hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="truncate text-ink">
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
