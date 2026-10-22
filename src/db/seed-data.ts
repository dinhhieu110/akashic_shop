// Sample catalog loaded by `npm run db:seed`. Prices here are in dollars;
// the seed converts them to cents.

export type SeedCategory = {
  slug: string;
  name: string;
  image: string;
};

export type SeedProduct = {
  slug: string;
  name: string;
  /** Category slug. */
  category: string;
  price: number;
  compareAtPrice?: number;
  /** Unsplash photo id for the main image. */
  photo: string;
  /** Optional second photo, shown on card hover and in the gallery. */
  hoverPhoto?: string;
  badge?: "new" | "sale" | "bestseller";
  rating: number;
  reviewCount: number;
  stock: number;
  summary: string;
  description: string;
  details: string[];
};

export function unsplash(id: string, w: number, h: number, extra = "") {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80${extra}`;
}

/** Gallery rows: main photo, optional alternate photo, zoomed detail crop. */
export function galleryFor(product: SeedProduct) {
  const large = (id: string) => unsplash(id, 1600, 1600);
  return [
    { url: large(product.photo), alt: product.name },
    ...(product.hoverPhoto
      ? [
          {
            url: large(product.hoverPhoto),
            alt: `${product.name}, alternate view`,
          },
        ]
      : []),
    {
      url: unsplash(
        product.photo,
        1600,
        1600,
        "&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      ),
      alt: `${product.name}, close-up detail`,
    },
  ];
}

const defineProduct = (product: SeedProduct) => product;

export const seedCategories: SeedCategory[] = [
  {
    slug: "apparel",
    name: "Apparel",
    image: unsplash("1490481651871-ab68de25d43d", 900, 1100),
  },
  {
    slug: "audio",
    name: "Audio",
    image: unsplash("1505740420928-5e560c06d30e", 900, 1100),
  },
  {
    slug: "home",
    name: "Home & Living",
    image: unsplash("1556228453-efd6c1ff04f6", 900, 1100),
  },
  {
    slug: "carry",
    name: "Bags & Carry",
    image: unsplash("1553062407-98eeb64c6a62", 900, 1100),
  },
];

export const seedProducts: SeedProduct[] = [
  defineProduct({
    slug: "orbit-over-ear-headphones",
    name: "Orbit Over-Ear Headphones",
    category: "audio",
    price: 189,
    compareAtPrice: 229,
    photo: "1505740420928-5e560c06d30e",
    hoverPhoto: "1583394838336-acd977736f90",
    badge: "sale",
    rating: 4.8,
    reviewCount: 312,
    stock: 48,
    summary:
      "Closed-back wireless headphones with adaptive noise cancelling and 40 hours of battery.",
    description:
      "Orbit pairs warm, detailed sound with cushions you can wear all day. Adaptive noise cancelling tunes itself to your surroundings, and a quick 10-minute charge gives you five hours of listening.",
    details: [
      "40 mm dynamic drivers",
      "Adaptive active noise cancelling",
      "Up to 40 hours of battery, USB-C fast charging",
      "Bluetooth 5.3 with multipoint pairing",
      "Memory-foam ear cushions in protein leather",
      "Weight: 265 g",
    ],
  }),
  defineProduct({
    slug: "meridian-minimal-watch",
    name: "Meridian Minimal Watch",
    category: "carry",
    price: 145,
    photo: "1523275335684-37898b6baf30",
    badge: "bestseller",
    rating: 4.9,
    reviewCount: 208,
    stock: 3,
    summary:
      "A clean 38 mm dial on a soft silicone strap, water resistant to 50 metres.",
    description:
      "Meridian strips the watch back to what matters: a crisp dial, a slim brushed-steel case and a strap you forget you're wearing. Japanese quartz movement keeps it accurate for years.",
    details: [
      "38 mm brushed stainless steel case",
      "Japanese quartz movement",
      "Sapphire-coated mineral crystal",
      "Water resistant to 5 ATM (50 m)",
      "Quick-release 20 mm silicone strap",
    ],
  }),
  defineProduct({
    slug: "comet-organic-cotton-tee",
    name: "Comet Organic Cotton Tee",
    category: "apparel",
    price: 32,
    photo: "1521572163474-6864f9cf17ab",
    rating: 4.7,
    reviewCount: 541,
    stock: 120,
    summary:
      "Our everyday crew neck in heavyweight organic cotton, cut for a relaxed fit.",
    description:
      "Comet is the tee we wear most. A dense 220 gsm jersey holds its shape wash after wash, and the slightly dropped shoulder gives it an easy, modern drape.",
    details: [
      "100% GOTS-certified organic cotton",
      "220 gsm heavyweight jersey",
      "Relaxed fit with dropped shoulder",
      "Pre-shrunk, garment washed",
      "Machine wash cold",
    ],
  }),
  defineProduct({
    slug: "drift-everyday-daypack",
    name: "Drift Everyday Daypack",
    category: "carry",
    price: 98,
    photo: "1553062407-98eeb64c6a62",
    hoverPhoto: "1622560480605-d83c853bc5c3",
    rating: 4.8,
    reviewCount: 176,
    stock: 34,
    summary:
      "A 20 L daypack with a padded laptop sleeve and weatherproof recycled shell.",
    description:
      "Drift carries a full workday without looking like it. The recycled nylon shell shrugs off rain, the back panel breathes, and a hidden pocket keeps your passport and keys close.",
    details: [
      "20 L capacity",
      "Padded sleeve fits laptops up to 16 inches",
      "Water-resistant recycled nylon shell",
      "Luggage pass-through strap",
      "Lifetime warranty on zips and seams",
    ],
  }),
  defineProduct({
    slug: "ember-soy-candle",
    name: "Ember Soy Candle, Amber & Cedar",
    category: "home",
    price: 28,
    photo: "1602874801007-bd458bb1b8b6",
    hoverPhoto: "1603006905003-be475563bc59",
    badge: "bestseller",
    rating: 4.9,
    reviewCount: 892,
    stock: 64,
    summary:
      "Hand-poured soy wax with notes of amber, cedarwood and a little smoke.",
    description:
      "Ember is poured by hand in small batches and burns clean for up to 50 hours. The cotton wick crackles softly, and the glass vessel makes a good pen pot once it's done.",
    details: [
      "220 g natural soy wax blend",
      "Lead-free cotton wick",
      "Approx. 50 hours burn time",
      "Notes: amber, cedarwood, smoked vanilla",
      "Reusable recycled-glass vessel",
    ],
  }),
  defineProduct({
    slug: "haze-lounge-joggers",
    name: "Haze Lounge Joggers",
    category: "apparel",
    price: 74,
    photo: "1594633312681-425c7b97ccd1",
    rating: 4.6,
    reviewCount: 129,
    stock: 22,
    summary: "Lightweight woven joggers with patch pockets and gathered cuffs.",
    description:
      "Haze is cut from a fluid woven fabric that drapes rather than clings, so it works as well for a long flight as a slow weekend. Elasticated cuffs and an easy waist keep the shape relaxed but neat.",
    details: [
      "Lightweight woven Tencel blend",
      "Elasticated waist and gathered cuffs",
      "Front patch pockets",
      "Relaxed fit, tapered leg",
      "Machine wash cold, hang dry",
    ],
  }),
  defineProduct({
    slug: "tide-stoneware-plate-set",
    name: "Tide Stoneware Plate Set",
    category: "home",
    price: 86,
    compareAtPrice: 110,
    photo: "1578749556568-bc2c40e68b61",
    badge: "sale",
    rating: 4.7,
    reviewCount: 94,
    stock: 11,
    summary: "Four reactive-glaze dinner plates, each one slightly different.",
    description:
      "Tide plates are thrown and glazed in a small family studio. The reactive glaze pools differently on every piece, so no two settings are quite the same.",
    details: [
      "Set of 4 dinner plates, 27 cm",
      "High-fired stoneware",
      "Reactive ocean glaze",
      "Dishwasher and microwave safe",
    ],
  }),
  defineProduct({
    slug: "kraft-market-tote",
    name: "Kraft Market Tote",
    category: "carry",
    price: 24,
    photo: "1544816155-12df9643f363",
    rating: 4.5,
    reviewCount: 63,
    stock: 0,
    summary:
      "A washable paper tote that looks like kraft and wears like canvas.",
    description:
      "Made from washable paper fibre, the Kraft tote is surprisingly tough, gets softer with use and folds flat into a coat pocket.",
    details: [
      "Washable paper fibre",
      "Holds up to 12 kg",
      "Reinforced handles",
      "38 × 42 × 12 cm",
    ],
  }),
  defineProduct({
    slug: "dune-ceramic-cup-trio",
    name: "Dune Ceramic Cup Trio",
    category: "home",
    price: 42,
    photo: "1610701596007-11502861dcfa",
    badge: "new",
    rating: 4.8,
    reviewCount: 21,
    stock: 18,
    summary: "Three handleless cups in speckled sand glaze.",
    description:
      "Dune cups sit comfortably in two hands for slow coffee or tea. Each is dipped by hand, leaving a raw clay foot and a soft speckled finish.",
    details: [
      "Set of 3 cups, 220 ml each",
      "Speckled stoneware with raw foot",
      "Dishwasher safe",
    ],
  }),
  defineProduct({
    slug: "halo-studio-headphones",
    name: "Halo Studio Headphones",
    category: "audio",
    price: 159,
    photo: "1484704849700-f032a568e944",
    badge: "new",
    rating: 4.7,
    reviewCount: 38,
    stock: 27,
    summary: "Wired studio headphones with a flat, honest response.",
    description:
      "Halo is tuned for mixing and critical listening, with a flat response that shows you exactly what's in the track. Replaceable pads and cable keep it going for years.",
    details: [
      "50 mm neodymium drivers",
      "Frequency response 5 Hz – 35 kHz",
      "Detachable 3 m coiled cable",
      "Replaceable velour ear pads",
    ],
  }),
  defineProduct({
    slug: "sage-suede-oxford",
    name: "Sage Suede Oxford",
    category: "apparel",
    price: 135,
    photo: "1560343090-f0409e92791a",
    badge: "new",
    rating: 4.6,
    reviewCount: 17,
    stock: 4,
    summary: "A soft suede oxford on a light crepe sole.",
    description:
      "Sage brings a quiet colour to a classic shape. Soft Italian suede is lined in leather and set on a natural crepe sole that cushions every step.",
    details: [
      "Italian suede upper, leather lining",
      "Natural crepe rubber sole",
      "Blake-stitched construction",
      "Runs true to size",
    ],
  }),
  defineProduct({
    slug: "cove-woven-handbag",
    name: "Cove Woven Handbag",
    category: "carry",
    price: 118,
    photo: "1590874103328-eac38a683ce7",
    badge: "new",
    rating: 4.9,
    reviewCount: 12,
    stock: 2,
    summary: "A structured woven bag with a leather flap and top handle.",
    description:
      "Cove is woven by hand from rattan and finished with a vegetable-tanned leather flap that deepens in colour over time.",
    details: [
      "Hand-woven rattan body",
      "Vegetable-tanned leather flap and handle",
      "Cotton-lined interior with slip pocket",
      "26 × 20 × 10 cm",
    ],
  }),
  defineProduct({
    slug: "loft-oak-step-stool",
    name: "Loft Oak Step Stool",
    category: "home",
    price: 89,
    photo: "1503602642458-232111445657",
    rating: 4.8,
    reviewCount: 45,
    stock: 9,
    summary: "A solid oak stool that doubles as a side table.",
    description:
      "Loft is joined, not screwed, from FSC-certified oak and finished with a hard-wearing natural oil. Use it to reach the top shelf or as a side table by the bed.",
    details: [
      "Solid FSC-certified oak",
      "Natural hard-wax oil finish",
      "Seat height 45 cm",
      "Supports up to 150 kg",
    ],
  }),
  defineProduct({
    slug: "fringe-knit-poncho",
    name: "Fringe Knit Poncho",
    category: "apparel",
    price: 68,
    photo: "1434389677669-e08b4cac3105",
    badge: "new",
    rating: 4.7,
    reviewCount: 29,
    stock: 0,
    summary: "An open-knit cotton poncho with a soft fringed hem.",
    description:
      "Fringe layers easily over a tee or dress. The open stitch keeps it light enough for late-summer evenings, and the fringe hem adds a little movement.",
    details: [
      "100% organic cotton",
      "Open-knit construction",
      "One size, relaxed fit",
      "Hand wash cold",
    ],
  }),
  defineProduct({
    slug: "grove-botanical-face-oil",
    name: "Grove Botanical Face Oil",
    category: "home",
    price: 38,
    photo: "1612817288484-6f916006741a",
    rating: 4.8,
    reviewCount: 57,
    stock: 40,
    summary: "A lightweight blend of rosehip, jojoba and squalane.",
    description:
      "Grove sinks in quickly and leaves skin soft, never greasy. Cold-pressed oils are blended in small batches and bottled in UV-protective glass.",
    details: [
      "30 ml in amber glass",
      "Rosehip, jojoba and plant squalane",
      "Fragrance free, vegan",
      "Suitable for all skin types",
    ],
  }),
];

/** Homepage "Best sellers", in order. Stored as products.featured_rank. */
export const featuredSlugs = [
  "orbit-over-ear-headphones",
  "meridian-minimal-watch",
  "comet-organic-cotton-tee",
  "drift-everyday-daypack",
  "ember-soy-candle",
  "haze-lounge-joggers",
  "tide-stoneware-plate-set",
  "kraft-market-tote",
];

/** Homepage "New arrivals", newest first. The seed gives these the most recent created_at. */
export const newArrivalSlugs = [
  "dune-ceramic-cup-trio",
  "halo-studio-headphones",
  "sage-suede-oxford",
  "cove-woven-handbag",
  "loft-oak-step-stool",
  "fringe-knit-poncho",
  "grove-botanical-face-oil",
];
