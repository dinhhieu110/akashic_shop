import Image from "next/image";
import Link from "next/link";

import { editorial } from "@/lib/content";

export function CampaignBanner() {
  return (
    <section aria-labelledby="campaign-title" className="container-site">
      <div className="relative isolate overflow-hidden on-dark rounded-[1.375rem] bg-night px-6 py-16 text-center sm:rounded-banner sm:py-24 lg:py-32">
        <Image
          src={editorial.banner}
          alt=""
          fill
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/45" />

        <span className="eyebrow">Limited run</span>
        <h2 id="campaign-title" className="heading-display mx-auto mt-3 max-w-3xl">
          The Dusk Collection
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/80 sm:text-lg">
          Hand-poured candles, stoneware and knitwear in deep twilight tones.
          Available until the end of the season.
        </p>
        <Link href="/collections/dusk" className="btn btn-primary btn-lg mt-8">
          Explore the collection
        </Link>
      </div>
    </section>
  );
}
