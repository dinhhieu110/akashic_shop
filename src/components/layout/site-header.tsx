import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { mainNav } from "@/lib/navigation";

const iconLink =
  "relative grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface hover:text-accent";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="container-site flex h-(--header-h) items-center gap-4 lg:gap-8">
        <MobileMenu links={mainNav} />

        <Logo />

        <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-7 xl:gap-9">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
          <Link href="/search" className={iconLink} aria-label="Search">
            <Search aria-hidden className="size-5" />
          </Link>
          <Link
            href="/account"
            className={`${iconLink} hidden sm:grid`}
            aria-label="Account"
          >
            <User aria-hidden className="size-5" />
          </Link>
          <Link
            href="/wishlist"
            className={`${iconLink} hidden sm:grid`}
            aria-label="Wishlist"
          >
            <Heart aria-hidden className="size-5" />
          </Link>
          <Link href="/cart" className={iconLink} aria-label="Cart, 2 items">
            <ShoppingBag aria-hidden className="size-5" />
            <span className="count-dot absolute top-0.5 right-0.5">2</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
