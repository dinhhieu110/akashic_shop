export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "Shop all", href: "/shop" },
  { label: "Apparel", href: "/collections/apparel" },
  { label: "Audio", href: "/collections/audio" },
  { label: "Home & Living", href: "/collections/home" },
  { label: "New in", href: "/collections/new" },
  { label: "Journal", href: "/journal" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "/collections/new" },
      { label: "Best sellers", href: "/collections/best-sellers" },
      { label: "Apparel", href: "/collections/apparel" },
      { label: "Audio", href: "/collections/audio" },
      { label: "Home & Living", href: "/collections/home" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns & exchanges", href: "/help/returns" },
      { label: "Track an order", href: "/help/track" },
      { label: "FAQ", href: "/help/faq" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const announcements = [
  "Free shipping on orders over $75",
  "30-day free returns",
  "New autumn arrivals are here",
  "Carbon-neutral delivery on every order",
];
