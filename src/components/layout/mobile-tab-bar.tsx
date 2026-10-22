import Link from "next/link";
import { Heart, House, LayoutGrid, Search, ShoppingBag } from "lucide-react";

const tabs = [
  { label: "Home", href: "/", icon: House },
  { label: "Shop", href: "/shop", icon: LayoutGrid },
  { label: "Search", href: "/search", icon: Search },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Cart", href: "/cart", icon: ShoppingBag, count: 2 },
];

export function MobileTabBar() {
  return (
    <nav aria-label="Quick links" className="bottom-bar lg:hidden">
      <ul className="grid h-16 grid-cols-5">
        {tabs.map(({ label, href, icon: Icon, count }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex h-full flex-col items-center justify-center gap-1 text-[0.6875rem] font-bold text-ink/55 transition-colors hover:text-accent"
            >
              <span className="relative">
                <Icon aria-hidden className="size-5" />
                {count ? (
                  <span className="count-dot absolute -top-1.5 -right-2.5">
                    {count}
                  </span>
                ) : null}
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
