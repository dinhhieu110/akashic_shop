import Image from "next/image";
import Link from "next/link";

import { editorial } from "@/lib/content";

const points = [
  {
    title: "Honest materials",
    text: "Organic cotton, solid oak, stoneware and recycled metals.",
  },
  {
    title: "Small-batch makers",
    text: "Made with family-run workshops we visit every year.",
  },
  {
    title: "Built to last",
    text: "Designed to be repaired, not replaced.",
  },
];

export function EditorialStory() {
  return (
    <section aria-labelledby="story-title" className="bg-surface">
      <div className="container-site section grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-banner sm:aspect-5/4 lg:aspect-4/5">
            <Image
              src={editorial.story}
              alt="A bright living room with a sofa, side table and floor lamp"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="card absolute right-4 -bottom-6 w-44 p-4 sm:right-8 sm:w-52 lg:-right-8">
            <span className="font-display text-4xl leading-none font-bold">
              120+
            </span>
            <p className="mt-1.5 text-xs leading-snug text-muted">
              independent makers across 14 countries
            </p>
          </div>
        </div>

        <div className="pt-4 lg:pt-0">
          <span className="eyebrow">Our approach</span>
          <h2 id="story-title" className="heading-1 mt-3">
            Fewer things, made better
          </h2>
          <p className="lede mt-5 max-w-xl">
            We started Akashic to make the objects we reach for every day a
            little more considered. Each piece is designed in-house and produced
            in small runs, so nothing sits in a warehouse for long.
          </p>

          <ol className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {points.map((point, i) => (
              <li key={point.title} className="flex gap-3.5 sm:flex-col lg:flex-row xl:flex-col">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand font-display text-sm font-bold">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold">{point.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                    {point.text}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <Link href="/about" className="btn btn-dark mt-9">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
