# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # dev server (Turbopack) on http://localhost:3000
npm run build        # production build
npm run lint         # ESLint (flat config, next/core-web-vitals + next/typescript)
npm run typecheck    # tsc --noEmit

npm run auth:generate  # Better Auth CLI: write auth tables into src/db/schema/auth.ts
npm run db:generate    # drizzle-kit: SQL migrations from src/db/schema -> drizzle/ (add `-- --name <name>`)
npm run db:migrate     # apply migrations to Neon
npm run db:seed        # load the sample catalog (idempotent, upserts by slug)
npm run db:push        # push schema directly, no migration files (throwaway branches only)
npm run db:studio      # Drizzle Studio
```

No test framework is set up yet.

`DATABASE_URL` must be set in `.env` at the project root for `build`, `dev`, `db:seed` and drizzle-kit. See **Database conventions** below.

The Better Auth CLI is the `auth` package (`npx auth ...`). `@better-auth/cli` is deprecated, so don't use it. Generate a secret with `npx auth secret`.

## Stack

Next.js 16 (App Router, `src/` dir), React 19, TypeScript strict, Tailwind CSS v4, Better Auth, Drizzle ORM, Neon Postgres. Path alias `@/*` → `src/*`.

- **Tailwind v4 is configured in CSS** (`src/app/globals.css`: `@import "tailwindcss"` + `@theme`). There is no `tailwind.config.*`. Under Turbopack it is loaded through the `@tailwindcss/turbopack` loader in `next.config.ts`, not PostCSS.
- **`cacheComponents: true`** is on in `next.config.ts`. Routes are prerendered by default; any dynamic data (DB reads, `headers()`, cookies, sessions) must go inside `<Suspense>` or be cached with `"use cache"`. Check `node_modules/next/dist/docs/01-app/02-guides/` before writing data-fetching or auth-gated pages.

## Design system

All design tokens and primitives live in `src/app/globals.css`; there is no component library. Fonts (Baloo 2 for display, DM Sans for body) are loaded in `layout.tsx` via `next/font` and mapped to `font-display` / `font-sans`.

- Use the token utilities (`bg-brand`, `text-ink`, `text-muted`, `bg-surface`, `border-line`, `rounded-card`, `shadow-card`, `text-h2`, …) rather than raw hex or arbitrary values. Add new tokens to `@theme`.
- Primitives are defined with `@utility`, so they accept variants (`md:btn-lg`): `heading-*`, `eyebrow`, `lede`, `prose-body`, `link`, `link-accent`, `nav-link`, `btn` + `btn-primary|dark|outline|soft` + `btn-sm|lg|block`, `icon-btn`, `card`, `card-interactive`, `panel`, `media-frame` (zooms its image when a `group` ancestor is hovered), `badge*`, `count-dot`, `surface-night`, `container-site`, `container-prose`, `section`, `section-head`, `grid-products`, `grid-auto`, `scroll-row` + `scroll-item`, `stack`, `line-clamp-n`, `bottom-bar`, `field`, `btn-ghost-light` and `on-dark` (for content over photography), plus `animate-marquee`.
- Primitives can be tuned with CSS variables instead of new classes: `--cols` (grid-products), `--min` (grid-auto), `--per` (items per view in a scroll-row), `--stack`, `--lines`, `--eyebrow-color`; global `--gutter`, `--section-y`, `--grid-gap`.
- Multi-property `@utility` rules are emitted before single-property Tailwind utilities, so plain utilities (`size-9`, `bg-brand-50`, `pt-0`) reliably override a primitive.
- Anything `fixed` (drawers, modals) must be portalled to `document.body`: the sticky header uses `backdrop-blur`, which makes it the containing block for fixed descendants.
- Light theme only, by design. For dark bands use `surface-night`.
- Hover lifts and zooms are gated behind `(hover: hover)`, and the base layer turns motion off under `prefers-reduced-motion`.

## Storefront

- `src/app/layout.tsx` renders the site shell (announcement bar, header, footer, mobile tab bar) around every page; `src/app/page.tsx` only composes the homepage sections from `src/components/home/`.
- Components: `components/layout/` (shell), `components/home/` (homepage sections), `components/product/` (product card and carousel), `components/ui/` (small shared bits). Only `mobile-menu`, `product-carousel` and `newsletter` are client components.
- Catalog data lives in Postgres (see **Database conventions** below). Static marketing content (hero/banner images, homepage testimonials) is in `src/lib/content.ts`, nav links in `src/lib/navigation.ts`. Most links point to routes that don't exist yet (they hit `app/not-found.tsx`). Cart, wishlist and waitlist controls only give local feedback.
- Use `ProductBadge` and `StockStatus` (`components/product/`) wherever a product appears, so cards and the detail page show the same merchandising and stock states.
- `app/products/[slug]` prerenders every product via `generateStaticParams`. `ensureStatic = "navigation"` is required there: without it an unknown slug streams the shell first and `notFound()` returns status 200 instead of 404. (`dynamicParams` doesn't exist under Cache Components.)
- The product page's mobile buy bar is marked `data-buy-bar`; `<body>` adds extra bottom padding via `has-data-buy-bar:` so it never covers the footer.
- Remote images are allowed only from `images.unsplash.com` (`next.config.ts`). Use the object form of `remotePatterns`; `new URL(...)` forbids query strings, which Unsplash URLs need. Next 16 deprecates `priority` in favor of `preload`.
- `new Date()` and other non-deterministic calls in Server Components fail under `cacheComponents`.

## Database conventions

**Schema and migrations**
- Tables live in `src/db/schema/`, one file per domain (`catalog.ts`), each re-exported from `schema/index.ts`. `drizzle.config.ts` and `db/index.ts` read only that index. `schema/auth.ts` is reserved for `npm run auth:generate`, which overwrites it: never hand-edit it or put other tables there.
- Every schema change ships as a migration: `npm run db:generate -- --name <change>`, review the SQL, commit it with `drizzle/meta/`, then `npm run db:migrate`. Never edit a migration that has been applied. `db:push` is only for throwaway Neon branches.
- Keep `src/db/seed-data.ts` and `seed.ts` in step with the schema. The seed must stay idempotent (upsert by slug, replace child rows), so it can be re-run at any time.
- Ask before running `db:migrate` or `db:seed` against the database in `.env`. Don't open `.env` files; scripts load them with `--env-file` / `dotenv`.
- **`npm run build` needs a reachable, migrated and seeded database**: the homepage and `generateStaticParams` read the catalog while prerendering.

**Modeling**
- Integer identity primary keys; public URLs use a unique `slug`.
- Money is integer cents (`*_cents`), converted to dollars only when mapping to storefront types.
- Enforce invariants in the database with `check` constraints (non-negative stock and prices, sale price above price, rating range) and explicit `onDelete` on every foreign key.
- Give new tables `created_at`/`updated_at` (timestamptz) via the `timestamps` helper in `schema/catalog.ts`. Move it to a shared schema file once a second schema file needs it.
- No variants or reviews yet: stock is the single `products.stock_quantity` column and `rating`/`review_count` are denormalized columns. Replace them when those features are built, rather than working around them.

**Reading and writing data**
- Read only through `server-only` query modules (`src/lib/catalog/queries.ts`). Every read is a `"use cache"` function with `cacheTag(CATALOG_TAG)` and `cacheLife`, which keeps pages prerendered under `cacheComponents`.
- Queries return the storefront types in `src/lib/catalog/types.ts`, never raw rows. Client components may import only `types.ts` and `stock.ts`, never `queries.ts` or `@/db`.
- After any write, invalidate the tag: `updateTag(CATALOG_TAG)` in a Server Action (next read is fresh), otherwise `revalidateTag(CATALOG_TAG, "max")`. The one-argument `revalidateTag` is deprecated.
- Keep `fetchOptions: { cache: "no-store" }` in `src/db/index.ts`. The Neon HTTP driver queries over `fetch`, and without this Next caches query responses untagged: they survive rebuilds and ignore tag revalidation.
- The neon-http driver has no interactive transactions. Use `db.batch([...])` for atomic multi-statement writes, or switch to `drizzle-orm/neon-serverless` if a real transaction is needed.

## Architecture

Server logic is the catalog queries and the auth pipeline, with imports going one way: `app`/`components` → `lib` → `db`.

- `src/db/index.ts` exports the single `db` instance (`drizzle-orm/neon-http`). The whole schema index is passed in, so exported tables become available as `db.query.<table>`.
- Better Auth's tables (`user`, `session`, `account`, `verification`) don't exist yet: run `npm run auth:generate`, export `./auth` from the schema index, then generate and migrate before any auth request will work.
- `src/lib/auth.ts` holds the server-side `auth` instance: `drizzleAdapter(db, { provider: "pg" })` plus the `nextCookies()` plugin, which lets Server Actions set auth cookies. No sign-in methods are enabled yet. It reads `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` from env implicitly. After changing plugins or options that affect the DB, re-run `auth:generate` and then `db:generate`.
- `src/app/api/auth/[...all]/route.ts` mounts Better Auth's handler for all of `/api/auth/*` via `toNextJsHandler(auth)`.
- `src/lib/auth-client.ts` holds the browser `authClient` (`better-auth/react`), which calls `/api/auth` on the same origin. Use it in client components; on the server use `auth.api.*` (e.g. `auth.api.getSession({ headers: await headers() })`).

No middleware/proxy, route protection, or env validation layer exists yet.
