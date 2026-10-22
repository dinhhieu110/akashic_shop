"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section aria-labelledby="newsletter-title" className="container-site">
      <div className="panel grid items-center gap-8 bg-brand-50 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow">Newsletter</span>
          <h2 id="newsletter-title" className="heading-2 mt-2">
            Get 10% off your first order
          </h2>
          <p className="lede mt-3">
            New drops, early access and the occasional good read. No spam,
            unsubscribe anytime.
          </p>
        </div>

        {submitted ? (
          <p
            role="status"
            className="flex items-center gap-3 rounded-field bg-canvas p-4 font-semibold"
          >
            <span className="grid size-8 place-items-center rounded-full bg-success text-white">
              <Check aria-hidden className="size-4.5" />
            </span>
            You’re on the list. Check your inbox for your code.
          </p>
        ) : (
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="field sm:flex-1"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
