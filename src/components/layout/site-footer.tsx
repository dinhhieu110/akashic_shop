import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { footerNav } from "@/lib/navigation";

const social = ["Instagram", "TikTok", "Pinterest", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="surface-night mt-(--section-y) text-white/70">
      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12 lg:py-20">
        <div className="stack col-span-2 max-w-xs [--stack:1.25rem] md:col-span-3 lg:col-span-1">
          <Logo inverted />
          <p className="text-sm leading-relaxed">
            Thoughtfully made goods for the way you live, from morning coffee
            to late nights under the stars.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white">
            {social.map((name) => (
              <li key={name}>
                <a href="#" className="link">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 font-sans text-xs font-extrabold tracking-eyebrow text-brand uppercase">
              {group.title}
            </h2>
            <ul className="stack text-sm [--stack:0.75rem]">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© Akashic Shop. Sample storefront.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/legal/privacy" className="link hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="link hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/accessibility" className="link hover:text-white">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
