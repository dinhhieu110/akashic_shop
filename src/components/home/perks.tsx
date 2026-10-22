import { Leaf, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const perks = [
  { icon: Truck, title: "Free shipping", text: "On every order over $75" },
  { icon: RotateCcw, title: "30-day returns", text: "Free and no questions asked" },
  { icon: ShieldCheck, title: "2-year warranty", text: "On all audio and watches" },
  { icon: Leaf, title: "Carbon neutral", text: "Offset delivery, every time" },
];

export function Perks() {
  return (
    <section aria-label="Why shop with us" className="container-site section-tight">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-8">
        {perks.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 sm:gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 sm:size-12">
              <Icon aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold sm:text-[0.9375rem]">
                {title}
              </span>
              <span className="block text-xs leading-snug text-muted sm:text-sm">
                {text}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
