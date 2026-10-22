import { Stars } from "@/components/ui/stars";
import { testimonials } from "@/lib/content";

export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="container-site section">
      <div className="section-head">
        <div>
          <span className="eyebrow">Reviews</span>
          <h2 id="reviews-title" className="heading-2 mt-2">
            Loved by 40,000+ customers
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl leading-none font-bold">4.8</span>
          <span>
            <Stars rating={4.8} size={16} />
            <span className="block text-xs text-muted">from 12,480 reviews</span>
          </span>
        </div>
      </div>

      <ul className="scroll-row [--per:1.15] sm:[--per:1.8] md:[--per:2.2] lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
        {testimonials.map((review) => (
          <li key={review.name} className="scroll-item lg:w-auto">
            <figure className="card flex h-full flex-col p-6 sm:p-7">
              <Stars rating={review.rating} size={16} />
              <blockquote className="mt-4 flex-1 leading-relaxed">
                “{review.body}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 font-display font-bold text-brand-700"
                >
                  {review.name.charAt(0)}
                </span>
                <span className="min-w-0 text-sm">
                  <span className="block font-bold">
                    {review.name}{" "}
                    <span className="font-normal text-muted">· {review.location}</span>
                  </span>
                  <span className="block truncate text-muted">
                    Bought {review.product}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
