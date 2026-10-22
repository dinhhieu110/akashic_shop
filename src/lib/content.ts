// Static marketing content for the homepage. Not catalog data, so it stays in code.

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  body: string;
  product: string;
};

function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const editorial = {
  hero: unsplash("1444703686981-a3abbc4d4fe3", 2400, 1400),
  story: unsplash("1524758631624-e2822e304c36", 1400, 1600),
  banner: unsplash("1419242902214-272b3f66ee7a", 2400, 1000),
};

export const testimonials: Testimonial[] = [
  {
    name: "Maya R.",
    location: "Portland, OR",
    rating: 5,
    body: "The headphones feel far more expensive than they are. Packaging was beautiful and they arrived two days early.",
    product: "Orbit Over-Ear Headphones",
  },
  {
    name: "Jonas K.",
    location: "Austin, TX",
    rating: 5,
    body: "I've reordered the Ember candle four times now. It fills the whole apartment without being overpowering.",
    product: "Ember Soy Candle",
  },
  {
    name: "Priya S.",
    location: "Toronto, ON",
    rating: 4,
    body: "Great daypack with smart pockets. The laptop sleeve fits my 15-inch with room to spare. Love the colour.",
    product: "Drift Everyday Daypack",
  },
];
